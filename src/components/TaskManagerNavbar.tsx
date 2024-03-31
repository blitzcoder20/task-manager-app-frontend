import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { link } from '../types';


const TaskManagerNavbar = ({links}:{links:Array<link>})=>{

   
    return(
        <Navbar expand="sm"  bg="primary" data-bs-theme="dark" style={{margin:0}}>
            <Container>
                <Navbar.Toggle aria-controls="task-manager-navbar" />
                <Navbar.Collapse id="task-manager-navbar">
                    <Nav className="me-auto">
                        {links.map(link => {
                            return <Nav.Link href={link.href}>{link.name}</Nav.Link>
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TaskManagerNavbar;