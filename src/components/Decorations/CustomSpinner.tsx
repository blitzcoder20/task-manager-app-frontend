import { Button, Spinner } from "react-bootstrap";

export const CustomSpinner= ()=>{
    return(<Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          className="mt-3"
          role="status"
          aria-hidden="true"
        />
        Loading...
        <span className="visually-hidden">Loading...</span>
      </Button>);
}