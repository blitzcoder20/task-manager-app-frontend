import Container from "react-bootstrap/Container";
import TaskManagerNavbar from "./components/TaskManagerNavbar";
import { Row } from "react-bootstrap";
import { Link, Task, User } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowAllTask from "./components/Homepage/ShowAllTask";
import EditTask from "./components/EditTask/EditTask";
import { SelectedTaskContext } from "./components/Context/SelectedTaskContext";
import { useEffect, useState } from "react";
import { Login } from "./components/LoginModal";
import { UserContext } from "./components/Context/UserContext";
import { FilterSearchContext } from "./components/Context/FilterSearchContext";

const links: Array<Link> = [
  { name: "Homepage", href: "/" },
  { name: "Add Task", href: "/edit-task" },
];

function App() {
  const getUserFromStorage = (): User | null => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser) as User;
  };

  const [user, setUser] = useState<User | null>(getUserFromStorage());

  //Saves the logged user to the session storage
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const [selectedTask, setSelectedTask] = useState<null | Task>(null);

  const [filterSearch, setFilterSearch] = useState("");

  return (
    <>
      {!user && <Login setUser={setUser} />}
      {user && (
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <FilterSearchContext.Provider
              value={{ filterSearch, setFilterSearch }}
            >
              <Container fluid>
                <Row>
                  <TaskManagerNavbar links={links}></TaskManagerNavbar>
                </Row>
              </Container>
              <SelectedTaskContext.Provider
                value={{ selectedTask, setSelectedTask }}
              >
                <Routes>
                  <Route path="/" element={<ShowAllTask />} />
                  <Route path="/edit-task" element={<EditTask />} />
                </Routes>
              </SelectedTaskContext.Provider>
            </FilterSearchContext.Provider>
          </Router>
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;
