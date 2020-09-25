import React, { useContext, useState, useMemo } from "react";
import { Card, Image, Input, Form } from "semantic-ui-react";
import formatDistance from "date-fns/formatDistance";
import { UserContext } from "../providers/UserProvider";
import { PostContext } from "../providers/PostProvider";
import PostComments from "./PostComments";

const Post = ({ post }) => {
  const [comment, setComment] = useState();
  const { isLoggedIn, getCurrentUser } = useContext(UserContext);
  const { leaveComment } = useContext(PostContext);

  const user = useMemo(getCurrentUser);

  const submitComment = (e) =>
    leaveComment(post.id, comment).then(e.target.reset());

  return (
    <div style={{ width: "100%" }}>
      <Card fluid>
        <Card.Content style={{ paddingBottom: 0 }}>
          <Image
            floated="right"
            circular
            size="mini"
            src={post.userProfile.imageUrl}
          />
          <Card.Header>{post.userProfile.name}</Card.Header>
        </Card.Content>
        <Image src={post.imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>
            <span className="date">
              {formatDistance(new Date(post.dateCreated), new Date(), {
                addSuffix: true,
              })}
            </span>
          </Card.Meta>
          <Card.Description>{post.caption}</Card.Description>
          <PostComments comments={post.comments} />
        </Card.Content>
        {isLoggedIn && (
          <Card.Content extra>
            <Form onSubmit={submitComment}>
              <Input
                label={
                  <div>
                    <Image src={user.imageUrl} avatar inline />
                  </div>
                }
                labelPosition="left"
                fluid
                transparent
                type="text"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment"
              />
            </Form>
          </Card.Content>
        )}
      </Card>
    </div>
  );
};

export default Post;
