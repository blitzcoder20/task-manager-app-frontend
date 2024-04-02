import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AssigneeSelector } from "./AssigneeSelector";
import { useState } from "react";
import { AssigneesUsers, Task } from "../../types";
import { useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";

const AddTaskForm = () => {

  //TODO correctly assign author retreiving it from session variable

  const [assignees, setAssignees] = useState<Array<AssigneesUsers>>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error,setError] = useState(false);

  const navigate=useNavigate();

  const createTask = () => {
    //Construction of task object
    const task: Task = {
      title: title,
      description: description,
      author: "antoespo",
      assigned_to: assignees.map((a) => a.username),
      deadline: deadline,
    };

    //Call to api to make a new task
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    console.log(task);

    fetch(import.meta.env.VITE_API_ENDPOINT+"/tasks/create", options)
      .then((response) => {
        if(response.ok){
          navigate('/');
          return;
        }
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
      if(title.trim() === "" || description.trim() === ""){
        return false;
      }

      //Checks if date is a valid date
      const date = new Date(deadline);
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
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setDeadline(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
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

export default AddTaskForm;
