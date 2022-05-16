import React, { useState, useRef } from 'react';
import { Accordion, Card, Form, Row, Col, Button, ListGroup, ProgressBar } from "react-bootstrap";
import ObjectiveCard from "./ObjectiveCard"
import useData from '../hooks/useData';
import Buttons from "./Buttons"
import UpdateForm from "./UpdateForm"
import { serverTimestamp } from "firebase/firestore"

const Objective = () => {
    const [ amount, setAmount ] = useState(true);
    const dataQuery = useData('objective');

    const handleClick = () => {
        setAmount(!amount);
    }

    const totalProcent = (income) => {
        let procent = (income.depozit / income.cost) * 100;
        let rounded = Math.round(procent * 10) / 10;
        return rounded;
    }

    const moneyTransition = (income) => {
        return Number(income).toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        })
    }

    const updateValue = (data, mutate, nameRef, amountRef) => {
        mutate({
            created: data.created,
            updated: serverTimestamp(),
            name: data.name,
            cost: data.cost,
            owner: data.owner,
            depozit: parseFloat(data.depozit) + parseFloat(amountRef.current.value),
        })
    }

    return ( 
        <>
            <Card className="p-3 card">
                <h1 className="mb-4">Objective</h1>
                <Accordion className="pb-4">
                    { dataQuery.data && dataQuery.data.map((objective, index) => (
                        <Accordion.Item key={index} eventKey={index++}>
                            <Accordion.Header>{objective.name}</Accordion.Header>
                            <Accordion.Body>
                                <ProgressBar variant="primary" min={0} max={objective.cost} now={objective.depozit} label={`${totalProcent(objective)}%`} />
                                <div className="objective-numbers">
                                    <span>{moneyTransition(objective.depozit)} / </span>
                                    <span>{moneyTransition(objective.cost)}</span>
                                </div>

                                { amount ? 
                                    <Button onClick={handleClick} className="mt-4">
                                        Add amount
                                    </Button>
                                    : 
                                    <UpdateForm data={objective} close={handleClick} collection="objective" updateFunction={updateValue}  />
                                }

                                <hr />
                                <Col className="mt-4">
                                    <Buttons id={ objective.id } name="Delete objective" collectionName="objective" />
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                    )) }
                </Accordion>
                <ObjectiveCard />
            </Card>
        </>
     );
}
 
export default Objective;