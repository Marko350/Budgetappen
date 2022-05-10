import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import useExpenses from '../hooks/useExpenses';
import Buttons from "./Buttons";
import UpdateForm from "./UpdateForm"
import { serverTimestamp } from "firebase/firestore"

const ExpensesCard = ( { id } ) => {
    const expensesQuery = useExpenses(id);
    const [ update, setUpdate ] = useState(false);

    const moneyTransition = (expense) => {
        return Number(expense.amount).toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        })
    }

    const updateClick = () => {
        setUpdate(!update);
    }

    const updateValue = (data, mutate, nameRef, amountRef) => {
        mutate({
            created: data.created,
            category: data.category,
            updated: serverTimestamp(),
            name: nameRef.current.value,
            owner: data.owner,
            amount: parseFloat(amountRef.current.value),
        })
    }

    return ( 
        <>
        { expensesQuery.data && expensesQuery.data.map((expense, index) => (
            <div key={index} >
                <ListGroup className="pb-2" horizontal>
                    <ListGroup.Item>{expense.name}</ListGroup.Item>
                    <ListGroup.Item>{moneyTransition(expense)}</ListGroup.Item>
                </ListGroup>
                { update ? <UpdateForm data={expense} close={updateClick} collection="expenses" updateFunction={updateValue} /> :
                    <>
                    <Buttons id={expense.id} name="Delete expense" collectionName="expenses"/>
                    <Button onClick={updateClick} className="ms-4" variant="dark" type="submit">Change</Button>
                    </>
                }
                <hr></hr>
            </div>
        )) }
        </>
    );
}
 
export default ExpensesCard;