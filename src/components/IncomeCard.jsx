import React, { useState, useRef } from "react";
import useCreate from "../hooks/useCreate";
import { Form, Button, Row, Col } from "react-bootstrap"

const Income = () => {
    const [ income, setIncome ] = useState(false);
    const incomeNameRef = useRef()
    const incomeAmountRef = useRef()
    const { createIncome } = useCreate();

    const handleButton = () => {
        setIncome(!income);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createIncome(incomeNameRef.current.value, incomeAmountRef.current.value);
        setIncome(!income);

        incomeNameRef.current.value = "";
        incomeAmountRef.current.value = "";
    }

    return ( 
        <>
            { income ? 
                <Form onSubmit={ handleSubmit } className="pt-4" >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Row>
                            <Col>
                                <Form.Control type="text" ref={incomeNameRef} placeholder="Name" required />
                            </Col>
                            <Col>
                                <Form.Control type="number" ref={incomeAmountRef} placeholder="Amount" required />
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
                        <Button onClick={ handleButton } variant="primary">Add income</Button>
                    </Col>
                </Row>}
        </>
    );
}
 
export default Income;