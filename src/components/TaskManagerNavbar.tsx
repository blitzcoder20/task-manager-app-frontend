import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "../types";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { NavDropdown } from "react-bootstrap";

const TaskManagerNavbar = ({ links }: { links: Array<Link> }) => {
  const userContext = useContext(UserContext);

  const logOut = () => {
    userContext?.setUser(null);
  };

  return (
    <Navbar expand="sm" bg="primary" data-bs-theme="dark" style={{ margin: 0 }}>
      <Container>
        <Navbar.Toggle aria-controls="task-manager-navbar" />
        <Navbar.Collapse id="task-manager-navbar">
          <Nav className="me-auto">
            {links.map((link) => {
              return (
                <Nav.Link eventKey={link.name} key={link.name} href={link.href}>
                  {link.name}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
            <NavDropdown
              title={"Welcome " + userContext?.user?.username}
              id="nav-user-dropdown"
              className="justify-content-end"
            >
              <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TaskManagerNavbar;
