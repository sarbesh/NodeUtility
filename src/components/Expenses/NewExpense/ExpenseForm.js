import React,{useState} from "react";
import "./ExpenseForm.css";

function ExpenseForm(props){
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('')

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setAmount(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setExpenseDate(event.target.value);
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            id : Math.floor(Math.random() * 100) + 4,
            title: title,
            amount: amount,
            date: new Date(expenseDate),
        }
        props.onSubmitExpense(expenseData);

        setAmount(0);
        setTitle('');
        setExpenseDate(new Date().toISOString().split('T')[0]);
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="new_expense_add_form">
                <div>
                    <label>Title: </label>
                    <input className="new_expense_form_title" type='text' onChange={titleChangeHandler} value={title}/>
                </div>
                <div>
                    <label>Amount: </label>
                    <input className="new_expense_form_amount" type='number' min='0.01' step='0.01' onChange={amountChangeHandler} value={amount}/>
                </div>
                <div>
                    <label>Date: </label>
                    <input className="new_expense_form_date" type='date' max={new Date().toISOString().split('T')[0]} onChange={dateChangeHandler} value={expenseDate} />
                </div>
            </div>
            <div className="new_expense_form_button">
                <button type='submit' className="new_expense_form_submit_button">Add Expense</button>
                <button type='button' onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    );

}

export default ExpenseForm;