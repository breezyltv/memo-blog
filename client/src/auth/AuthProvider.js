import React, { useEffect, useState } from "react";
import firebase from "../config/firebaseconfig";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  useEffect(() => {
    setLoadingAuth(true);
    firebase.auth().onAuthStateChanged(user => {
      setLoadingAuth(false);
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
