import Container from 'react-bootstrap/Container'
import TaskManagerNavbar from './components/TaskManagerNavbar'
import './assets/css/custom.scss'
import { Row } from 'react-bootstrap'
import { link} from './types';



const links:Array<link> = [
  {name:"Homepage",href:"#tasks"},
  {name:"Add Task",href:"#add-task"}
];


function App() {
  return (
    <Container fluid>
      <Row><TaskManagerNavbar links={links}></TaskManagerNavbar></Row>
    </Container>
  )
}

export default App
