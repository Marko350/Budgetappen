import React from "react";
import { Accordion, Card, Form, Row, Col, Button } from "react-bootstrap"
import useData from "../hooks/useData"
import { BeatLoader } from 'react-spinners'

const Budget = () => {
    const incomeData = useData("income");
    const expensesData = useData("expenses");
    const objectiveData = useData('objective');

    console.log("This is objectiveData", objectiveData);

    const budget = () => {
        let totalAmount = 0;
        let totalIncome = 0;
        let totalExpenses = 0;
        let totalDepozit = 0;
        if (incomeData.data) {
            incomeData.data.map((income) => {
                totalIncome += Number(income.amount);
            })
        }

        if (expensesData.data) {
            expensesData.data.map((expenses) => {
                totalExpenses += Number(expenses.amount);
            })
        }

        if (objectiveData.data) {
            objectiveData.data.map((objective) => {
                totalDepozit += Number(objective.depozit);
            })
        }

        totalAmount = totalIncome - totalExpenses;

        totalAmount = totalAmount - totalDepozit;

        return totalAmount.toLocaleString(navigator.language, {
            style: "currency",
            currency: "SEK",
        });
    }

    return ( 
        <Card className="p-3 mb-5 budget-card">
            <h2>Budget:  
            <span>
                { incomeData.data && expensesData.data ? budget() :  <BeatLoader color={"#fff"} size={20} />}
            </span>
            </h2>

        </Card>
    );
}
 
export default Budget;