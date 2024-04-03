import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MiniTaskCardProps } from '../../types';
import { useContext } from 'react';
import { SelectedTaskContext } from '../Context/SelectedTaskContext';
import { useNavigate } from 'react-router-dom';
import { dateFormatter } from '../utils/utils';

const MiniTaskCard = (task : MiniTaskCardProps)=>{

  //TODO MIGLIORARE LO STILE DELLA MINITASKCARD
  const selTaskCont = useContext(SelectedTaskContext);
  const navigate=useNavigate();

  const handleEditClick = ()=>{
      selTaskCont?.setSelectedTask(task);
      navigate('/edit-task');
  }

    return (
        <Card className="text-center mini-task-card">
        <Card.Header>{task.author}</Card.Header>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>
            {task.description}
          </Card.Text>
          <Card.Text>
            {task.assigned_to?.map(assignee => <p>{assignee.username}, </p>)}
          </Card.Text>
          <Button variant="primary" className="mr-3" onClick={handleEditClick}>Edit</Button>
          <Button variant="primary">Done</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{dateFormatter(task.created_at,"dd/mm/yyyy")} - {dateFormatter(task.deadline,"dd/mm/yyyy")}</Card.Footer>
      </Card>
    )
}

export default MiniTaskCard;