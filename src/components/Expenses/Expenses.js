import React, { useEffect, useState } from 'react';
import ExpenseItem from "./ExpenseItem";
import './Expenses.css'
import NewExpense from './NewExpense/NewExpense';
import ExpenseFilter from './ExpenseFilter';
import ExpenseChart from './ExpensesChart';
import { Card } from '@mui/material';
import ExpenseList from './ExpenseList';

/**
 * @param {Object} props
 * @param {Array} props.expenses
 * @param {String} props.expenses[].title
 * @param {Number} props.expenses[].amount 
 * @param {Date} props.expenses[].date
 * @returns 
 */
function Expenses(props) {
    const expenses = [{ "id": 1, "title": "exp1", "amount": 123, "date": new Date("2023, 3, 6") }, { "id": 2, "title": "exp2", "amount": 124, "date": new Date("2023, 3, 6") }, { "id": 3, "title": "exp3", "amount": 125, "date": new Date("2023, 3, 7") }, { "id": 4, "title": "exp4", "amount": 125, "date": new Date("2019, 2, 14") }];

    let [expenseList, setExpenseList] = useState(expenses);
    let [expenseYearSet, setExpenseYearSet] = useState(new Set(['2023', '2022', '2021', '2020', '2019']));
    let [filteredYearExpenseList, setFilteredYearExpenseList] = useState(expenses);
    let [selectedExpenseYear, setSelectedExpenseYear] = useState('all');

    const addExpenseYears = () => {
        expenseList.forEach(x => {
            expenseYearSet.add(x.date.getFullYear().toString());
        });
        // console.log("expenseYearSet: ",expenseYearSet);
    }

    useEffect(() => {
        if (selectedExpenseYear) {
            filterExpenseOnSelectedYear();
        }
        addExpenseYears();
        filterExpenseOnSelectedYear();
    }, [expenseList, selectedExpenseYear, selectedExpenseYear]);

    const addExpenseHandler = (data) => {
        setExpenseList((prevExpenses) => {
            // console.log("setExpenseList", data)
            return [data, ...prevExpenses];
        });
        setExpenseYearSet((prevSet) => {
            prevSet.add(data.date.getFullYear().toString())
            return prevSet;
        });
        filterExpenseOnSelectedYear();
    }

    const yearFilterHandler = (data) => {
        setSelectedExpenseYear(data);
    }


    const filterExpenseOnSelectedYear = () => {
        let filtered = [];
        // console.log("called filterExpenseOnSelectedYear with", selectedExpenseYear)
        if (selectedExpenseYear === 'all') {
            // console.log("filterExpenseOnSelectedYear expenseList ", expenseList)
            filtered = expenseList;
        } else {
            filtered = expenseList.filter(x => x.date.getFullYear().toString() === selectedExpenseYear.toString());
        }
        setFilteredYearExpenseList(filtered);
    }

    return (
        <Card className='expenses'>
            <NewExpense onAddExpense={addExpenseHandler} />
            <ExpenseFilter expenseYearSet={expenseYearSet} onSelectYear={yearFilterHandler} selectedYear={selectedExpenseYear} />
            <ExpenseChart expenses={filteredYearExpenseList} />
            <ExpenseList items={filteredYearExpenseList} />
        </Card>
    );
}

export default Expenses;