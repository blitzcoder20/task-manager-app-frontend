import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "../types";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { Form, NavDropdown } from "react-bootstrap";
import { FilterSearchContext } from "./Context/FilterSearchContext";

const TaskManagerNavbar = ({ links }: { links: Array<Link> }) => {

  const userContext = useContext(UserContext);
  const filterSearchContext = useContext(FilterSearchContext)

  const logOut = () => {
    userContext?.setUser(null);
  };

  const handleFilterSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    filterSearchContext?.setFilterSearch(event.target.value);
  }

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
          <Form className="d-flex">
            <Form.Control
              onChange={handleFilterSearch}
              value={filterSearchContext?.filterSearch??""}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
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
