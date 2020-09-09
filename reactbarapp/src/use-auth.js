import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "@firebase/app";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

//useAuth hook from https://usehooks.com/useAuth/ adapted to this project

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
      setUser(response.user);
      return response.user;
    });
  };

  const updateProfile = (username) => {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.updateProfile({
        displayName: username
      }).then(response => {
        setUser(response);
        return firebase.auth().currentUser;
      }).catch(function (error) {
        console.error(error);
      });
    };
  }

  const signout = () => {
    return firebase.auth().signOut().then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    updateProfile,
    signout,
  };
}