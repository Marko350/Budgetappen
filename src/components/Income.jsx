import React, { useState } from 'react';
import { Accordion, Card, Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import Buttons from "./Buttons";
import IncomeCard from "./IncomeCard"
import useData from "../hooks/useData"
import UpdateForm from "../components/UpdateForm"
import { BeatLoader } from 'react-spinners'

const Income = () => {
    const dataQuery = useData("income");
    const [ update, setUpdate ] = useState(false);

    const updateClick = () => {
        setUpdate(!update);
    }

    const moneyTransition = (income) => {
        return Number(income.amount).toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        })
    }

    const totalIncome = () => {
        let totalAmount = 0;
        if(dataQuery.data) {
            dataQuery.data.map((income) => {
                totalAmount += Number(income.amount);
            })
        }
        return totalAmount.toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        });
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

    return ( 
        <>
            <Card className="p-3 card">
                <h1 className="pb-4">Income</h1>
                <div className="income-container">
                { dataQuery.data && dataQuery.data.map((income, index) => (
                    <div key={index} >
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
                    </div>
                )) }
                </div>
                <IncomeCard />
                <h2 className="pt-4">Total income: 
                    <span> { dataQuery.data ? totalIncome() : <BeatLoader color={"#fff"} size={20} /> }</span>
                </h2>
            </Card>
        </>
     );
}
 
export default Income;