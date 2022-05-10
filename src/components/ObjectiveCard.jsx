import React, { useState, useRef } from "react";
import useCreate from "../hooks/useCreate";
import { Form, Button, Row, Col } from "react-bootstrap"

const Objective = () => {
    const [ objective, setObjective ] = useState(false);
    const objectiveNameRef = useRef()
    const objectiveCostRef = useRef()
    const { createObjective } = useCreate();

    const handleButton = () => {
        setObjective(!objective);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createObjective(objectiveNameRef.current.value, objectiveCostRef.current.value);
        setObjective(!objective);

        objectiveNameRef.current.value = "";
        objectiveCostRef.current.value = "";
    }

    return ( 
        <>
            { objective ? 
                <Form onSubmit={ handleSubmit } className="pt-4" >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Row>
                            <Col>
                                <Form.Control type="text" ref={objectiveNameRef} placeholder="Objective" required />
                            </Col>
                            <Col>
                                <Form.Control type="number" ref={objectiveCostRef} placeholder="Cost" required />
                            </Col>
                        </Row>
                        <Button className="mt-4 me-4" variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={ handleButton } className="mt-4" variant="danger" type="submit">
                            Cancel
                        </Button>
                    </Form.Group>  
                </Form> : 
                <Row className="pt-4">
                    <Col xs={10}>
                        <Button onClick={ handleButton } variant="primary">Add objective</Button>
                    </Col>
                </Row>}
        </>
    );
}
 
export default Objective;