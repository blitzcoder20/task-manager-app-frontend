import Container from "react-bootstrap/Container";
import TaskManagerNavbar from "./components/TaskManagerNavbar";
import "./assets/css/custom.scss";
import { Row } from "react-bootstrap";
import { Link } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./components/AddTask/AddTask";
import ShowAllTask from "./components/Homepage/ShowAllTask";

const links: Array<Link> = [
  { name: "Homepage", href: "/" },
  { name: "Add Task", href: "/add-task" },
];

function App() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <TaskManagerNavbar links={links}></TaskManagerNavbar>
        </Row>
      </Container>
      <Routes>
        <Route path="/" element={<ShowAllTask />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
