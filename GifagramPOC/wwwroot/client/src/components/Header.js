import React, { useContext } from "react";
import { useHistory, matchPath, useLocation } from "react-router-dom";
import {
  Menu,
  Icon,
  Header as Heading,
  Popup,
  Dropdown,
  Image,
} from "semantic-ui-react";
import { UserContext } from "../providers/UserProvider";

const Header = () => {
  const { getCurrentUser, logout } = useContext(UserContext);
  const user = getCurrentUser();
  const history = useHistory();
  const { pathname } = useLocation();

  const isActive = (path) => {
    return !!matchPath(pathname, { path, exact: true });
  };

  return (
    <div className="ui container" style={{ padding: "60px" }}>
      <Heading textAlign="center" as="h1" icon color="teal">
        <Icon name="comment alternate" color="purple" />
        GiFTER
        <Heading.Subheader>
          <em>Almost</em> as good as Giphy or Instagram...
        </Heading.Subheader>
      </Heading>
      <Menu>
        <Popup
          content="Feed"
          trigger={
            <Menu.Item
              name="feed"
              active={isActive("/")}
              onClick={() => history.push("/")}
            >
              <Icon color="teal" name="newspaper outline" size="big" />
            </Menu.Item>
          }
        />
        <Popup
          content="New Post"
          trigger={
            <Menu.Item
              name="new"
              active={isActive("/posts/add")}
              onClick={() => history.push("/posts/add")}
            >
              <Icon color="teal" name="camera retro" size="big" />
            </Menu.Item>
          }
        />
        {!!user && (
          <Menu.Menu position="right">
            <Image
              src={user.imageUrl}
              avatar
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
            <Dropdown item text={user.name}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
        {!user && (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={isActive("/login")}
              onClick={() => history.push("/login")}
            >
              Login
            </Menu.Item>
            <Menu.Item
              name="register"
              active={isActive("/register")}
              color="teal"
              onClick={() => history.push("/register")}
            >
              Register
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    </div>
  );
};

export default Header;
