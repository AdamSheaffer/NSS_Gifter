import React, { useContext, useEffect } from "react";
import { Grid, Input } from "semantic-ui-react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  const { posts, getAllPosts, searchPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  const search = (term) => {
    if (!term) {
      getAllPosts();
      return;
    }
    searchPosts(term);
  };

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <Grid.Column>
          <Input
            fluid
            size="big"
            icon="search"
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
          />
        </Grid.Column>
      </Grid.Row>
      {posts.map((post) => (
        <Grid.Row centered key={post.id}>
          <Grid.Column>
            <Post post={post} />
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default PostList;
