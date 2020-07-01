import React, { useState, useContext } from "react";
import { Grid, Form, Button, Message } from "semantic-ui-react";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const [hasError, setHasError] = useState();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch((err) => setHasError(true));
  };

  return (
    <Grid columns={5} centered>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Input
              fluid
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Form.Input
              fluid
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <Button
              color="purple"
              onClick={submit}
              style={{ marginTop: "15px" }}
            >
              SUBMIT
            </Button>
          </Form>
          {hasError && (
            <Grid.Column style={{ marginTop: "20px" }}>
              <Message color="red">Invalid email or password</Message>
            </Grid.Column>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
