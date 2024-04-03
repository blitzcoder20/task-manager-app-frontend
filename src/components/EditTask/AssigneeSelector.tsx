import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AssigneesUsers, User } from "../../types";

export const AssigneeSelector = ({
  assignees,
  setAssignees,
}: {
  assignees: Array<AssigneesUsers>;
  setAssignees: React.Dispatch<React.SetStateAction<AssigneesUsers[]>>;
}) => {

  const [users, setUsers] = useState<Array<User> | null>(null);
  const [currSelectedId, setCurrSelectedId] = useState(1);

  //Retrieves all the possible users that can be assigned
  useEffect(() => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/users")
      .then((response) => response.json())
      .then((data) => {
        let fetchedUsers = data as Array<User>;

        //Filters already assigned users
        fetchedUsers= fetchedUsers.filter((user=>{
          for(const assignee of assignees){
            if(user.id == assignee.id){
              return false;
            }
          }
          return true;
        }))

        setUsers(fetchedUsers);
      });
  }, []);

  const changeCurrSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrSelectedId(parseInt(event.target.value));
  };

  const handleAddAssignee = () => {
    //Finds the username from selected id
    const username = users?.find(
      (user) => user.id === currSelectedId
    )?.username;
    if (!username) {
      return;
    }

    //Adds the new assignee
    const newAssignee: AssigneesUsers = {
      id: currSelectedId,
      username: username,
    };
    setAssignees([...assignees, newAssignee]);

    //Updates the possible avaiable users to select
    const filteredUsers = users.filter((user) => {
      if (user.id == currSelectedId) {
        return false;
      }
      return true;
    });
    setUsers(filteredUsers);
    if (filteredUsers.length > 0) {
      setCurrSelectedId(filteredUsers[0].id);
    }

  };

  return (
    <Form.Group className="mb-3" controlId="addTaskFormAssignee">
      <Form.Label>Assignees</Form.Label>
      {users && users?.length > 0 && (
        <Row>
          <Col>
            <Form.Select
              aria-label="Add assignee select"
              value={currSelectedId}
              onChange={changeCurrSelected}
              className="mb-2"
            >
              {users?.map((user) => {
                return <option value={user.id}>{user.username}</option>;
              })}
            </Form.Select>
          </Col>
          <Col>
            <Button onClick={handleAddAssignee}>Add</Button>
          </Col>
        </Row>
      )}
      <Row>
        {assignees.map((assignee) => {
          return (
            <Col key={assignee.id}>
              <Form.Label className="assignees-label">
                {assignee.username}
              </Form.Label>
            </Col>
          );
        })}
      </Row>
    </Form.Group>
  );
};
