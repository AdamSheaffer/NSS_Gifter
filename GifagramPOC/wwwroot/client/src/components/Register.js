import React, { useState, useContext } from "react";
import { Grid, Form, TextArea, Button } from "semantic-ui-react";
import { UserContext } from "../providers/UserProvider";
import { useHistory } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const submit = (e) => {
    e.preventDefault();

    register({
      email,
      password,
      name,
      bio,
    }).then(() => history.push("/"));
  };

  return (
    <Grid columns={3} centered>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
            <Form.Group widths="equal">
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
            </Form.Group>
            <TextArea
              placeholder="Bio (optional)"
              onChange={(e) => setBio(e.target.value)}
            />
          </Form>
          <Button color="purple" onClick={submit} style={{ marginTop: "15px" }}>
            SUBMIT
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
