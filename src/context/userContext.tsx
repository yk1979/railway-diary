import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

import firebase from "../../firebase";
import { UserState } from "../redux/modules/user";

type UserContextType = { user: UserState; loadingUser: boolean };

const UserContext = createContext<UserContextType>({
  user: null,
  loadingUser: false,
});

type Props = {
  children: React.ReactNode;
};

const UserContextComponent: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserState>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (currentUser) => {
        try {
          if (currentUser) {
            setUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              picture: currentUser.photoURL || "",
            });
          } else {
            setUser(null);
          }
        } catch (err) {
          throw new Error(err);
        } finally {
          setLoadingUser(false);
        }
      });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;

export const useUser = (): UserContextType => useContext(UserContext);
