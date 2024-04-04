import { useContext, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";
import { AuthActionEnum } from "../../types";

export const LoginModal = ({
  setAuthAction,
}: {
  setAuthAction: React.Dispatch<React.SetStateAction<AuthActionEnum>>;
}) => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const setUser = useContext(UserContext)?.setUser;

  //Handles modal closing
  const handleClose = () => setShow(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  //Tries to login and set the user object 
  //if the login attempt is successful
  const tryLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const requestJson = { email: email, password: password };

    //Call to api to make a login request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_ENDPOINT + "/users/authenticate",
        options
      );
      //If the login attempt is succesful
      //the User will be set for the application
      if (!response.ok) {
        return false;
      }
      const user = await response.json();
      if (!setUser) {
        return false;
      }
      setUser(user);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleLogInClick = async () => {
    if (await tryLogin(email, password)) {
      handleClose();
      return;
    }
    setLoginError(true);
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginError && (
          <Alert variant="danger">
            Login failed, please check the provided information
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formLogin.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={onEmailChange}
              value={email}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLogin.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={onPasswordChange}
              value={password}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setAuthAction(AuthActionEnum.register);
          }}
        >
          Register
        </Button>
        <Button variant="primary" onClick={handleLogInClick}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
