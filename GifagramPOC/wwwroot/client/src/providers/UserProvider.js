import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const getCurrentUser = () => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  };

  const login = async (email, pw) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, pw);

    const token = await user.getIdToken();
    const profile = await getUser(user.uid);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(profile));
    setIsLoggedIn(true);
  };

  const register = async (profile) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(profile.email, profile.password);

    profile.fbUid = user.uid;
    const token = await user.getIdToken();
    const newProfile = await saveUser(profile);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(newProfile));
    setIsLoggedIn(true);
  };

  const logout = () => {
    firebase.auth().signOut();
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const getAuthHeaderValue = () => `Bearer ${localStorage.getItem("token")}`;

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
