import React, {useState} from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css"

const NewExpense = (props) => {

    const [showForm, setShowForm] = useState(false);

    const addExpenseHandler = (data) => {
        // console.log("adding NewExpense expense", data);
        props.onAddExpense(data);
        setShowForm(false);
    }

    const startEditingHandler = () => {
        setShowForm(true);
    }

    const stopEditingHandler = () => {
        setShowForm(false);
    }

    return (
        <div className='new_expense_form'>
            {!showForm && <button onClick={startEditingHandler}>Add Expense</button>}
            {showForm && <ExpenseForm onSubmitExpense={addExpenseHandler} onCancel={stopEditingHandler} />}
        </div>
    )
}

export default NewExpense;