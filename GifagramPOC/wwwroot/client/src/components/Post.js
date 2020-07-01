import React from "react";
import { Card, Image } from "semantic-ui-react";
import formatDistance from "date-fns/formatDistance";

const Post = ({ post }) => {
  return (
    <div style={{ width: "500px" }}>
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
        </Card.Content>
      </Card>
    </div>
  );
};

export default Post;
