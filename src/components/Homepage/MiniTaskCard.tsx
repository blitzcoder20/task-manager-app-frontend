import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MiniTaskCardProps } from '../../types';

const MiniTaskCard = (task : MiniTaskCardProps)=>{
    return (
        <Card className="text-center mini-task-card">
        <Card.Header>{task.author}</Card.Header>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>
            {task.description}
          </Card.Text>
          <Card.Text>
            {task.assigned_to?.map(assignee => <p>{assignee}, </p>)}
          </Card.Text>
          <Button variant="primary">Done</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{task.created_at}-{task.deadline}</Card.Footer>
      </Card>
    )
}

export default MiniTaskCard;