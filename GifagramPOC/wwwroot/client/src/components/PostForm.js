import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Grid, TextArea, Button } from "semantic-ui-react";
import { PostContext } from "../providers/PostProvider";

const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const [userProfileId, setUserProfileId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const submit = (e) => {
    const post = {
      imageUrl,
      title,
      caption,
      userProfileId,
    };

    addPost(post).then((p) => {
      // Navigate the user back to the home route
      history.push("/");
    });
  };

  return (
    <Grid centered columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Input
              fluid
              placeholder="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Form.Input
              fluid
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              placeholder="Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button
              color="purple"
              onClick={submit}
              style={{ marginTop: "15px" }}
            >
              SUBMIT
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PostForm;
