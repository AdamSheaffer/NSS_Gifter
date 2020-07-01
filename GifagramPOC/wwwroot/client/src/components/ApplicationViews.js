import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";
import Register from "./Register";
import Login from "./Login";
import { UserContext } from "../providers/UserProvider";

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact>
        <PostList />
      </Route>

      <Route path="/posts/add">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>

      <Route path="/posts/:id">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;
