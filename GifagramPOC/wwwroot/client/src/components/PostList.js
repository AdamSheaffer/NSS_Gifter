import React, { useContext, useEffect, useMemo } from "react";
import { Grid, Input } from "semantic-ui-react";
import debounce from "lodash/debounce";
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

  const debounceSearch = useMemo(() => debounce(search, 250));

  return (
    <Grid columns={3} doubling>
      <Grid.Row centered>
        <Grid.Column>
          <Input
            style={{ width: "100%" }}
            fluid
            size="big"
            icon="search"
            placeholder="Search..."
            type="text"
            onChange={(e) => debounceSearch(e.target.value)}
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
