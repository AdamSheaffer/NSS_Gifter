import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch("/api/post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const searchPosts = (term) => {
    return fetch(`/api/post/search?q=${term}`)
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
  };

  const addPost = (post) => {
    const token = localStorage.getItem("token");

    return fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
  };

  const leaveComment = (postId, message) => {
    const comment = { postId, message };
    const token = localStorage.getItem("token");

    return fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    }).then(getAllPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        addPost,
        getPost,
        searchPosts,
        leaveComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
