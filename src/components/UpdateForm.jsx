import React, { useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap"
import useUpdate from "../hooks/useUpdate";
import { serverTimestamp } from "firebase/firestore"

const ExpenseForm = ( { data, close, collection, updateFunction } ) => {
    const update = useUpdate( data.id, collection )
    const amountUpdateRef = useRef();
    const nameUpdateRef = useRef();

    const updateAmount = (e) => {
        e.preventDefault();

        updateFunction(data, update.mutate, nameUpdateRef, amountUpdateRef, serverTimestamp);

        close();
        amountUpdateRef.current.value = "";
        nameUpdateRef.current.value = "";
    }

    console.log("This is data", data);

    return ( 
        <Form onSubmit={updateAmount}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            { data ?
                <>
                <Row className="mt-4">
                    <Col>
                        <Form.Control type="text" ref={nameUpdateRef} placeholder={data.name} required />
                    </Col>
                    <Col>
                        <Form.Control type="number" ref={amountUpdateRef} placeholder={data.amount ? data.amount : "0,00 kr"} required />
                    </Col>
                </Row>
                <Button className="mt-4 me-4" variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={close} className="mt-4" variant="danger" type="submit">
                    Cancel
                </Button>
                </>
            : null }
            </Form.Group>  
        </Form>
    );
}
 
export default ExpenseForm;