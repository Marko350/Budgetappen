import React, { useRef } from "react";
import useCreate from "../hooks/useCreate";
import { Form, Row, Col, Button } from "react-bootstrap"

const ExpenseForm = ( { id, close, primary, secondary } ) => {
    const { createExpense } = useCreate();
    const expenseNameRef = useRef();
    const expenseMoneyRef = useRef();

    const handleExpense = (e) => {
        e.preventDefault();
        if(expenseNameRef.current.value == "" || expenseMoneyRef.current.value == "") return
        createExpense(expenseNameRef.current.value, expenseMoneyRef.current.value, id);

        expenseNameRef.current.value = "";
        expenseMoneyRef.current.value = "";
    }

    return ( 
    <Form onSubmit={handleExpense}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Row>
                <Col className="p-0">
                    <Form.Control type="text" ref={expenseNameRef} placeholder="Description" required />
                </Col>
                <Col className="p-0">
                    <Form.Control type="number" ref={expenseMoneyRef} placeholder="Amount" required/>
                </Col>
                <Button className="mt-4" variant="primary" type="submit">
                    { primary }
                </Button>
                <Button onClick={close} className="mt-3" variant="danger" type="submit">
                    { secondary }
                </Button>
            </Row>
        </Form.Group>  
    </Form> 
    );
}
 
export default ExpenseForm;