import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { miniTaskCardProps } from '../types';

const MiniTaskCard = (task : miniTaskCardProps)=>{
    return (
        <Card className="text-center mini-task-card">
        <Card.Header>{task.author}</Card.Header>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>
            {task.description}
          </Card.Text>
          <Button variant="primary">Done</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{task.expiration_date}</Card.Footer>
      </Card>
    )
}

export default MiniTaskCard;