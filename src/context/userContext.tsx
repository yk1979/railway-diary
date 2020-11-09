import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

import firebase from "../../firebase";
import { UserState } from "../redux/modules/user";

// TODO fix any
const UserContext = createContext<UserState>(null);

type Props = {
  children: React.ReactNode;
};

const UserContextComponent: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserState>(null);
  useEffect(() => {
    const unsubscriber = firebase
      .auth()
      .onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            name: currentUser.displayName,
            picture: currentUser.photoURL || "",
          });
        } else {
          setUser(null);
        }
      });
    return unsubscriber();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextComponent;

export const useUser = (): UserState => useContext(UserContext);
