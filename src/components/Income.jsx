import React from 'react';
import { Card } from "react-bootstrap";
import IncomeCard from "./IncomeCard"
import useData from "../hooks/useData"
import { BeatLoader } from 'react-spinners'
import IncomeDetailCard from './IncomeDetailCard';

const Income = () => {
    const dataQuery = useData("income");

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

    return ( 
        <>
            <Card className="p-3 card">
                <h1 className="pb-4">Income</h1>
                <div className="income-container">
                { dataQuery.data && dataQuery.data.map((income, index) => (
                    <div key={index} >
                        <IncomeDetailCard income= { income } />
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