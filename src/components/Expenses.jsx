import React, { useState, useRef } from 'react'
import { Accordion, Card, Form, Row, Col, Button } from "react-bootstrap"
import useCreate from '../hooks/useCreate';
import useData from '../hooks/useData';
import ExpensesCard from './ExpensesCard';
import { serverTimestamp } from "firebase/firestore"
import { BeatLoader } from 'react-spinners'

const Expenses = () => {
    const [ categories, setCategories ] = useState(false);
    const categoryRef = useRef();
    const { createCategory } = useCreate();
    const dataQuery = useData("categories");
    const dataExpenseQuery = useData("expenses");

    const totalExpenses = () => {
        let totalAmount = 0;
        if(dataExpenseQuery.data) {
            dataExpenseQuery.data.map((expenses) => {
                totalAmount += Number(expenses.amount);
            })
        }
        return totalAmount.toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        });
    }



    const addCategory = () => {
        setCategories(!categories);
    }

    const handleCategory = (e) => {
        e.preventDefault();
        if(categoryRef.current.value == "") return
        createCategory(categoryRef.current.value);
        setCategories(!categories);

        categoryRef.current.value = "";
    }



    return (
    <Card className="p-3 card">
        <h1 className="mb-4">Expenses</h1>
        <Accordion>
        { dataQuery.data && dataQuery.data.map((category, index) => (
            <Accordion.Item key={index} eventKey={index++}>
                <Accordion.Header>{category.name}</Accordion.Header>
                    <Accordion.Body>
                    <ExpensesCard data={ category } />
                    </Accordion.Body>
            </Accordion.Item>
        )) }
        </Accordion>

        { categories ? 
            <Form onSubmit={ handleCategory } className="pt-4" >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" ref={categoryRef} placeholder="Category" required />
                    <Button className="mt-4 me-4" variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button onClick={ addCategory } className="mt-4" variant="danger" type="submit">
                        Cancel
                    </Button>
                </Form.Group>  
            </Form> : 
            <Row className="pt-4">
                <Col className="expenses-buttons">
                    <Button className="me-4" onClick={ addCategory } variant="primary">Add category</Button>
                </Col>
            </Row>}
            <h2 className="mt-4">Total expenses: 
                <span> { dataExpenseQuery.data ? totalExpenses() : <BeatLoader color={"#fff"} size={20} /> }</span>
            </h2>
    </Card>
    )
}

export default Expenses;