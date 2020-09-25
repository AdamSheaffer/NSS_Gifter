import React from "react";
import { Feed } from "semantic-ui-react";

const PostComments = ({ comments }) => {
  return (
    <Feed size="small">
      {comments.map((c) => (
        <Feed.Event
          key={c.id}
          image={c.userProfile.imageUrl}
          content={c.message}
        />
      ))}
    </Feed>
  );
};

export default PostComments;
