import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AuthActionEnum, User, UserRegistration } from "../../types";
import { UserContext } from "../Context/UserContext";

export const RegisterModal = ({
  setAuthAction,
}: {
  setAuthAction: React.Dispatch<React.SetStateAction<AuthActionEnum>>;
}) => {
  const [show, setShow] = useState(true);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [disableRegisterButton, setDisableRegisterButton] = useState(false);

  const setUser = useContext(UserContext)?.setUser;

  const emptyUser: UserRegistration = {
    name: "",
    surname: "",
    email: "",
    age: 18,
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [tmpUser, setTmpUser] = useState<UserRegistration>(emptyUser);

  //Handles modal closing
  const handleClose = () => setShow(false);

  //Changes tmpUser state based on the changed field on the form
  const handleFormPropertyChange = (propertyName: string, property: string) => {
    setTmpUser({ ...tmpUser, [propertyName]: property });
  };

  const tryRegister = async () => {
    const requestJson: User = tmpUser;

    //Call to the api to create a new User
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
        import.meta.env.VITE_API_ENDPOINT + "/users/create",
        options
      );
      //If the login attempt is succesful
      //the User will be set for the application
      if (!response.ok) {
        return false;
      }
      //const user = await response.json();
      if (!setUser) {
        return false;
      }
      setUser(tmpUser as User);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleRegisterClick = async () => {
    setDisableRegisterButton(true);

    //Checks if provided empty data
    if (
      tmpUser.email === "" ||
      tmpUser.name === "" ||
      tmpUser.surname === "" ||
      tmpUser.password === "" ||
      tmpUser.username === ""
    ) {
      setRegisterError("You can't provide empty data");
      setDisableRegisterButton(false);
      return;
    }

    //Checks if password and confirm password are equals
    if (tmpUser.password !== tmpUser.confirmPassword) {
      setRegisterError(
        "Passwords are different, please check the provided information"
      );
      setDisableRegisterButton(false);
      return;
    }

    //Tries to register and set the user object
    //if the login attempt is successful
    if (await tryRegister()) {
      handleClose();
      return;
    }
    setDisableRegisterButton(false);
    setRegisterError("An error occurred during registration.");
  };

  return (
    <Modal show={show} bg="secondary">
      <Modal.Header>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registerError && <Alert variant="danger">{registerError}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type name here"
                  id="name"
                  onChange={(e) =>
                    handleFormPropertyChange("name", e.target.value)
                  }
                  value={tmpUser.name}
                  autoFocus
                />
              </Col>
              <Col>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  id="surname"
                  placeholder="Type surname here"
                  onChange={(e) =>
                    handleFormPropertyChange("surname", e.target.value)
                  }
                  value={tmpUser.surname}
                  autoFocus
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col xs={9}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="Type username here"
                  onChange={(e) =>
                    handleFormPropertyChange("username", e.target.value)
                  }
                  value={tmpUser.username}
                  autoFocus
                />
              </Col>
              <Col xs={3}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  id="age"
                  onChange={(e) =>
                    handleFormPropertyChange("age", e.target.value)
                  }
                  min={18}
                  value={tmpUser.age}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLogin.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) =>
                handleFormPropertyChange("email", e.target.value)
              }
              value={tmpUser.email}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLogin.Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                handleFormPropertyChange("password", e.target.value)
              }
              value={tmpUser.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLogin.ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) =>
                handleFormPropertyChange("confirmPassword", e.target.value)
              }
              value={tmpUser.confirmPassword}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setAuthAction(AuthActionEnum.login)}
          className="me-auto"
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleRegisterClick}
          disabled={disableRegisterButton}
        >
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
