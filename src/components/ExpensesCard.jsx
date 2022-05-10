import React from "react";
import useExpenses from '../hooks/useExpenses';
import ExpensesDetailCard from "./ExpensesDetailCard";

const ExpensesCard = ( { id } ) => {
    const expensesQuery = useExpenses(id);

    return ( 
        <>
        { expensesQuery.data && expensesQuery.data.map((expense, index) => (
            <div key={index} >
                <ExpensesDetailCard expense={expense} />
                <hr></hr>
            </div>
        )) }
        </>
    );
}
 
export default ExpensesCard;