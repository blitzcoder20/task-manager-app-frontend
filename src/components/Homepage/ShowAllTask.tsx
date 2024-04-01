import { useEffect, useState } from "react";
import { Task } from "../../types";
import MiniTaskCard from "./MiniTaskCard";
import { Col, Container, Row } from "react-bootstrap";

const ShowAllTask = () => {
  const [tasks, setTasks] = useState<Array<Task> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <Container>
      <Row>
        {error && <h3>Error occurred while retrieving tasks</h3>}
        {!error &&
          tasks &&
          tasks.map((task) => (
            <Col className="m-1" xs={12} sm={6} md={4} lg={3} key={task.id} >
              <MiniTaskCard
                author={task.author}
                deadline={task.deadline}
                created_at={task.created_at}
                title={task.title}
                description={task.description}
                assigned_to={task.assigned_to}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default ShowAllTask;
