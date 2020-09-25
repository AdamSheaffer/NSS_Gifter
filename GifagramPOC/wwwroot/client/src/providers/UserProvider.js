import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  console.log(firebase.auth().currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const getCurrentUser = () => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  };

  const login = async (email, pw) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, pw);

    const profile = await getUser(user.uid);

    localStorage.setItem("user", JSON.stringify(profile));
  };

  const register = async (profile) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(profile.email, profile.password);

    profile.firebaseId = user.uid;
    const newProfile = await saveUser(profile);

    localStorage.setItem("user", JSON.stringify(newProfile));
  };

  const logout = () => {
    firebase.auth().signOut();
    localStorage.clear();
  };

  const getAuthHeaderValue = () => firebase.auth().currentUser.getIdToken(true);

  const saveUser = (profile) => {
    return fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    }).then((res) => res.json());
  };

  const getUser = (firebaseUid) => {
    return fetch(`/api/user?fbuid=${firebaseUid}`).then((res) => res.json());
  };

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((u) => {
      console.log(u);
      setIsLoggedIn(!!u);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        getCurrentUser,
        register,
        login,
        logout,
        isLoggedIn,
        getAuthHeaderValue,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
