import { useEffect, useState } from "react";
import { Task } from "../../types";
import MiniTaskCard from "./MiniTaskCard";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { CustomSpinner } from "../Decorations/CustomSpinner";

const ShowAllTask = () => {
  const [tasks, setTasks] = useState<Array<Task> | null>(null);
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(true);

  //Fetches all the tasks
  useEffect(() => {
    fetch(import.meta.env.VITE_API_ENDPOINT+"/tasks")
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
      .finally(()=>{
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-2">
      <Row>
        {loading && <CustomSpinner/>}

        {!loading && tasks?.length  === 0 && <Alert key={'primary'} variant={'primary'}>No tasks avaiable</Alert>}
        {error && <Alert key={'danger'} variant={'danger'}>Error occurred while retrieving tasks</Alert>}
        {!error &&
          tasks &&
          tasks.map((task) => (
            <Col className="m-1" xs={12} sm={6} md={4} lg={3} key={task.id} >
              <MiniTaskCard
                id={task.id??undefined}
                author={task.author}
                deadline={task.deadline}
                created_at={task.created_at??'null'}
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
