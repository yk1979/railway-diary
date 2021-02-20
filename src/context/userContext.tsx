import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

import firebase from "../../firebase";
import { User } from "../types";

type AuthUserContextType = {
  authUser: User | null;
  loadingUser: boolean;
};

const AuthUserContext = createContext<AuthUserContextType>({
  authUser: null,
  loadingUser: false,
});

type Props = {
  children: React.ReactNode;
};

const AuthUserContextComponent: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUserContextType["authUser"]>(
    null
  );
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setAuthUser({
            id: user.uid,
            name: user.displayName || "unknown",
            photoUrl: user.photoURL || "",
          });
        } else {
          setAuthUser(null);
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
    <AuthUserContext.Provider value={{ authUser, loadingUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextComponent;

export const useAuthUser = (): AuthUserContextType =>
  useContext(AuthUserContext);
