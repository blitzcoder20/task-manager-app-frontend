import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { User } from "../types";

export const Login = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError,setLoginError] = useState(false);

  const handleClose = () => setShow(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

    //Login try and set the user object if the login attempt
    //is successful
  const tryLogin = async (email: string, password: string): Promise<boolean> => {
    const requestJson = { email: email, password: password };
    
    //Call to api to make a login request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
    };

    try{
      const response= await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/authenticate", options);
      //If the login attempt is succesful
      //the User will be set for the application
      if(!response.ok){
        setLoginError(true);
        return false;
      }
      const user= (await response.json());
      setUser(user);
      return true;
    }
    catch(err){
      return false;
    }
  };

  const handleLogInClick = async() => {
    if (await tryLogin(email, password)) {
      handleClose();
    }
  };

  return (
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loginError && <Alert variant="danger">Login failed, please check the provided information</Alert>}
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
          <Button variant="primary" onClick={handleLogInClick}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
