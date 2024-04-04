import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AssigneeSelector } from "./AssigneeSelector";
import { useContext, useState } from "react";
import { AssigneesUsers, Task } from "../../types";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { SelectedTaskContext } from "../Context/SelectedTaskContext";
import { dateFormatter } from "../utils/utils";
import { UserContext } from "../Context/UserContext";

const EditTaskForm = () => {
  const emptyTask = {
    author: "",
    created_at: "",
    deadline: "",
    title: "",
    description: "",
    assigned_to: [],
    author_id: undefined,
    id: undefined,
  };

  const currUser = useContext(UserContext);

  const editTask = useContext(SelectedTaskContext)?.selectedTask ?? emptyTask;

  const [error, setError] = useState(false);

  const [tempTask, setTempTask] = useState<Task>(editTask);
  const [assignees, setAssignees] = useState<Array<AssigneesUsers>>(
    tempTask.assigned_to
  );

  const navigate = useNavigate();

  const createTask = () => {
    //Construction of task object
    const task: Task = {
      id: tempTask.id ?? undefined,
      title: tempTask.title,
      description: tempTask.description,
      author: currUser!.user!.username,
      author_id: currUser!.user!.id,
      assigned_to: assignees,
      deadline: tempTask.deadline,
    };

    //Call to api to make a new task
    const options = {
      method: task.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };

    const actionEndPoint = task.id ? "edit" : "create";
    fetch(
      import.meta.env.VITE_API_ENDPOINT + "/tasks/" + actionEndPoint,
      options
    )
      .then((response) => {
        if (response.ok) {
          navigate("/");
          return;
        }
        setError(true);
      })
      .catch(() => {
        setError(true);
      });
  };

  const basicFieldsValidation = (): boolean => {
    //TRUE means all fields are valid
    //False otherwise
    if (tempTask.title.trim() === "" || tempTask.description.trim() === "") {
      return false;
    }

    //Checks if date is a valid date
    const date = new Date(tempTask.deadline);
    if (isNaN(date.getTime())) {
      return false;
    }

    return true;
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formAddTaskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          onChange={(e) => setTempTask({ ...tempTask, title: e.target.value })}
          value={tempTask.title}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDeadline">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          data-date-format="dd/mm/yyyy"
          onChange={(e) => {
            setTempTask({ ...tempTask, deadline: e.target.value });
          }}
          value={dateFormatter(tempTask.deadline, "yyyy-mm-dd")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter task description"
          value={tempTask.description}
          onChange={(e) =>
            setTempTask({ ...tempTask, description: e.target.value })
          }
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
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          An error occurred while attempting to create the task
        </Alert>
      )}
    </Form>
  );
};

export default EditTaskForm;
