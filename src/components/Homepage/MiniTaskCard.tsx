import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MiniTaskCardProps } from "../../types";
import { useContext } from "react";
import { SelectedTaskContext } from "../Context/SelectedTaskContext";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../utils/utils";
import { UserContext } from "../Context/UserContext";
import { Badge, Container } from "react-bootstrap";

const MiniTaskCard = (task: MiniTaskCardProps) => {
  const selTaskCont = useContext(SelectedTaskContext);
  const navigate = useNavigate();
  const currUser = useContext(UserContext);

  const handleEditClick = () => {
    selTaskCont?.setSelectedTask(task);
    navigate("/edit-task");
  };

  const handleDeleteTask = () => {
    //Preparing delete option headers
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }};


    //Delete request to the api
    fetch(import.meta.env.VITE_API_ENDPOINT + "/tasks/delete/"+task.id,options).then(response=>{
      if(response.ok){
        if(task.tasksState.tasks){
          const newTasks= task.tasksState.tasks.filter((t)=>t.id!==task.id);
          task.tasksState.setTasks(newTasks);
        }
        selTaskCont?.setSelectedTask(null);           
      }
    })
  }

  return (
    <Card  className="text-center mini-task-card" >
      <Card.Header>{task.author}</Card.Header>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text className="overflow-auto mini-task-card-description">{task.description}</Card.Text>
        <Card.Text>
          {task.assigned_to?.map((assignee) => (
            <Badge key={assignee.id} className="me-1" bg="secondary">
            {assignee.username}
          </Badge>
          ))}
        </Card.Text>
        {currUser?.user?.username === task.author && (
          <Container>
          <Button
            variant="primary"
            className="me-2" 
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button 
            variant="primary" 
            onClick={handleDeleteTask}>
              Done
          </Button>
        </Container>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        {dateFormatter(task.created_at, "dd/mm/yyyy")} -{" "}
        {dateFormatter(task.deadline, "dd/mm/yyyy")}
      </Card.Footer>
    </Card>
  );
};

export default MiniTaskCard;
