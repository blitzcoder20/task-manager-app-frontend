import { useContext, useEffect, useState } from "react";
import { Task } from "../../types";
import MiniTaskCard from "./MiniTaskCard";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { CustomSpinner } from "../Decorations/CustomSpinner";
import { FilterSearchContext } from "../Context/FilterSearchContext";

const ShowAllTask = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasksToShow, setTasksToShow] = useState<Array<Task>>([]);

  const filterSearchContext = useContext(FilterSearchContext);

  //This function filters action based on filterSearch value
  //Active filters are on title and description
  useEffect(() => {
    const toSearch = filterSearchContext?.filterSearch;
    if (!toSearch) {
      setTasksToShow(tasks);
      return;
    }
    //Filters tasks by title and by description
    //then combines them
    const filteredTitles = tasks.filter((t) => t.title.includes(toSearch));
    const filteredDescription = tasks.filter((t) =>
      t.description.includes(toSearch)
    );
    const filteredTasks = [
      ...new Set([...filteredTitles, ...filteredDescription]),
    ];
    setTasksToShow(filteredTasks);
  }, [filterSearchContext?.filterSearch, tasks]);

  //Fetches all the tasks
  useEffect(() => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/tasks")
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-2">
      {loading && <CustomSpinner />}

      {!loading && tasks?.length === 0 && (
        <Alert key={"primary"} variant={"primary"}>
          No tasks avaiable
        </Alert>
      )}
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          Error occurred while retrieving tasks
        </Alert>
      )}
      <Row>
        {!error &&
          tasks &&
          tasksToShow.map((task) => (
            <Col sm={6} md={4} lg={3} key={task.id} className="mb-3">
              <MiniTaskCard
                id={task.id ?? undefined}
                author={task.author}
                deadline={task.deadline}
                created_at={task.created_at ?? "null"}
                title={task.title}
                description={task.description}
                assigned_to={task.assigned_to}
                tasksState={{ tasks, setTasks }}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ShowAllTask;
