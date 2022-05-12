import React, { useState } from "react";
import useExpenses from '../hooks/useExpenses';
import ExpensesDetailCard from "./ExpensesDetailCard";
import UpdateForm from "./UpdateForm"
import Buttons from './Buttons';
import ExpenseForm from './ExpenseForm';
import { Col, Button } from "react-bootstrap"


const ExpensesCard = ( { data } ) => {
    const expensesQuery = useExpenses(data.id);
    const [ update, setUpdate ] = useState(false);
    const [ product, setProduct ] = useState(false);

    const showUpdate = () => {
        setUpdate(!update);
    }

    const addValue = () => {
        setProduct(!product);
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
        <>
        { expensesQuery.data && expensesQuery.data.map((expense, index) => (
            <div key={index} >
                <ExpensesDetailCard expense={expense} />
                <hr></hr>
            </div>
        )) }
        { product ? 
            <ExpenseForm
                id={ data.id }
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

                    { expensesQuery.data && expensesQuery.data.length ? null :
                        <Col className="mb-4">
                            <Buttons id={ data.id } name="Delete category" collectionName="categories" />
                        </Col>
                    }

                    <Col className="mb-4">
                        <Button onClick={ showUpdate } className="mt-2" variant="dark" type="submit">
                            Change category name
                        </Button>
                    </Col>
                </> : 
                <UpdateForm data={data} close={showUpdate} collection="categories" updateFunction={updateValue} />
            }
                </> 
        }
        </>
    );
}
 
export default ExpensesCard;