import React, { useState } from "react"
import UpdateForm from "./UpdateForm"
import Buttons from "./Buttons";
import { Button, ListGroup } from "react-bootstrap";

const IncomeDetailCard = ( { income } ) => {
    const [ update, setUpdate ] = useState(false);

    const updateClick = () => {
        setUpdate(!update);
    }

    const updateValue = (data, mutate, nameRef, amountRef, timeStamp) => {

        mutate({
            created: data.created,
            updated: timeStamp(),
            name: nameRef.current.value,
            owner: data.owner,
            amount: parseFloat(amountRef.current.value),
        })
    }

    const moneyTransition = (income) => {
        return Number(income.amount).toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        })
    }

    return ( 
        <>
        <ListGroup className="pb-2" horizontal>

        {
            update ?
            <UpdateForm data={income} close={updateClick} collection="income" updateFunction={updateValue} />
            : 
            <>
            <ListGroup.Item>{income.name}</ListGroup.Item>
            <ListGroup.Item>{moneyTransition(income)}</ListGroup.Item>
            </>
        }

        </ListGroup>

        {
            !update ?
            <>
            <Buttons id={income.id} name="Delete income" collectionName="income"/>
            <Button onClick={updateClick} className="ms-4" variant="dark" type="submit">Change</Button>
            </> : null 
        }
        
        <hr></hr>
        </>
     );
}
 
export default IncomeDetailCard;