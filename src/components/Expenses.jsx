import React, { useState, useRef } from 'react'
import { Accordion, Card, Form, Row, Col, Button } from "react-bootstrap"
import useCreate from '../hooks/useCreate';
import useData from '../hooks/useData';
import ExpenseForm from './ExpenseForm';
import ExpensesCard from './ExpensesCard';
import Buttons from './Buttons';
import UpdateForm from "./UpdateForm"
import { serverTimestamp } from "firebase/firestore"
import { BeatLoader } from 'react-spinners'

const Expenses = () => {
    const [ product, setProduct ] = useState(false);
    const [ categories, setCategories ] = useState(false);
    const [ update, setUpdate ] = useState(false);
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

    const showUpdate = () => {
        setUpdate(!update);
    }

    const addValue = () => {
        setProduct(!product);
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

    const updateValue = (data, mutate, ref) => {
        mutate({
            created: data.created,
            updated: serverTimestamp(),
            name: ref.current.value,
            owner: data.owner,
        })
    }

    return (
    <Card className="p-3 card">
        <h1 className="mb-4">Expenses</h1>
        <Accordion>
        { dataQuery.data && dataQuery.data.map((category, index) => (
            <Accordion.Item key={index} eventKey={index++}>
                <Accordion.Header>{category.name}</Accordion.Header>
                    <Accordion.Body>
                    <ExpensesCard id={category.id} />

                    { product ? 
                        <ExpenseForm
                            id={ category.id }
                            close={ addValue }
                            primary="Submit"
                            secondary="Cancel"
                        />
                        :   <>
                        { !update ? 
                            <>
                                <Col className="mb-4">
                                    <Button onClick={ addValue } className="mt-2" variant="primary" type="submit">
                                        Add expense
                                    </Button>
                                </Col>
                                <Col className="mb-4">
                                    <Buttons id={ category.id } name="Delete category" collectionName="categories" />
                                </Col>
                                <Col className="mb-4">
                                    <Button onClick={ showUpdate } className="mt-2" variant="dark" type="submit">
                                        Change category name
                                    </Button>
                                </Col>
                            </> : 
                             <UpdateForm data={category} close={showUpdate} collection="categories" updateFunction={updateValue} />
                        }
                            </> 
                    }
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
                    <Button onClick={ () => window.location.reload(false) } variant="info">Get total expenses</Button>
                </Col>
            </Row>}
            <h2 className="mt-4">Total expenses: 
                <span> { dataExpenseQuery.data ? totalExpenses() : <BeatLoader color={"#fff"} size={20} /> }</span>
            </h2>
    </Card>
    )
}

export default Expenses;