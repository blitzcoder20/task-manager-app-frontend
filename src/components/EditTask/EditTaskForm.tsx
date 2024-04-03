import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AssigneeSelector } from "./AssigneeSelector";
import { useContext, useState } from "react";
import { AssigneesUsers, Task } from "../../types";
import { useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import { SelectedTaskContext } from "../Context/SelectedTaskContext";

const EditTaskForm = () => {

  //TODO correctly assign author retreiving it from session variable


  const emptyTask={
    author: '',
    created_at: '',
    deadline: '',
    title: '',
    description: '',
    assigned_to: [],
    author_id:undefined,
    id:undefined
  }

  const editTask = useContext(SelectedTaskContext)?.selectedTask??emptyTask;

  const [error,setError] = useState(false);

  const [tempTask,setTempTask] = useState<Task>(editTask)
  const [assignees, setAssignees] = useState<Array<AssigneesUsers>>(tempTask.assigned_to);


  const navigate=useNavigate();

  const createTask = () => {
    //Construction of task object
    const task: Task = {
      id:tempTask.id??undefined,
      title: tempTask.title,
      description: tempTask.description,
      author: "antoespo",
      author_id:3,
      assigned_to: assignees,
      deadline: tempTask.deadline,
    };

    //Call to api to make a new task
    const options = {
      method: task.id? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };
    console.log(task);

    const actionEndPoint= task.id? 'edit':'create'
    console.log(actionEndPoint)
    fetch(import.meta.env.VITE_API_ENDPOINT+"/tasks/"+actionEndPoint, options)
      .then((response) => {
        if(response.ok){
          navigate('/');
          return;
        }
        console.log(response);
        setError(true);
      })
      .catch((error) => {
        // Gestisci l'errore
        console.error(error.message);
      });
  };

  const basicFieldsValidation = () : boolean => {
      //TRUE means all fields are valid
      //False otherwise
      if(tempTask.title.trim() === "" || tempTask.description.trim() === ""){
        return false;
      }

      //Checks if date is a valid date
      const date = new Date(tempTask.deadline);
      if(isNaN(date.getTime())){
        return false;
      }

      return true;
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formAddTaskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          onChange={(e) => setTempTask({...tempTask,title: e.target.value})}
          value={tempTask.title}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setTempTask({...tempTask,deadline: e.target.value})}
          value={tempTask.deadline}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          value={tempTask.description}
          onChange={(e) => setTempTask({...tempTask,description: e.target.value})}
        />
      </Form.Group>

      <AssigneeSelector assignees={assignees} setAssignees={setAssignees} />

      <Button
        variant="primary"
        type="button"
        onClick={createTask}
        disabled={!basicFieldsValidation()}
      >
        Confirm
      </Button>
      {error &&  
      <Alert key={'danger'} variant={'danger'}>
          An error occurred while attempting to create the task
      </Alert>}
    </Form>

  );
};

export default EditTaskForm;
