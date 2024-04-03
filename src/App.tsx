import Container from "react-bootstrap/Container";
import TaskManagerNavbar from "./components/TaskManagerNavbar";
import "./assets/css/custom.scss";
import { Row } from "react-bootstrap";
import { Link, Task } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowAllTask from "./components/Homepage/ShowAllTask";
import EditTask from "./components/EditTask/EditTask";
import { useState } from "react";
import { SelectedTaskContext } from "./components/Context/SelectedTaskContext";
/*import { useEffect, useState } from "react";
import { Login } from "./components/LoginModal";
import EditTask from "./components/editTask/editTask";*/

const links: Array<Link> = [
  { name: "Homepage", href: "/" },
  { name: "Add Task", href: "/edit-task" },
];

function App() {
  /*const [user,setUser] = useState<Task | null>({
    "id": 1,
    "created_at": "2024-03-29T23:00:00.000Z",
    "deadline": "2030-12-11T23:00:00.000Z",
    "title": "update db",
    "description": "you have to update db",
    "author": "gioros"
  });

  //Saves the logged user to the session storage 
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]); 
  */

  //const [user, setUser] = useState<User | null>(null);

  const [selectedTask,setSelectedTask]=useState<null | Task>(null); 


  return (
    <>
      {/*!user && <Login setUser={setUser}/>*/}
      {(
        <Router>
          <Container fluid>
            <Row>
              <TaskManagerNavbar links={links}></TaskManagerNavbar>
            </Row>
          </Container>
          <SelectedTaskContext.Provider value={{selectedTask,setSelectedTask}}>
            <Routes>
              <Route path="/" element={<ShowAllTask />} />
              <Route path="/edit-task" element={<EditTask />} />
            </Routes>
          </SelectedTaskContext.Provider>
        </Router>
      )}
    </>
  );
}

export default App;
