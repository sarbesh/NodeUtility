import React from 'react';
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

/**
 * 
 * @param {Object} props.props 
 * @param {String} props.props.title
 * @param {Number} props.props.price 
 * @param {Date} props.props.date
 * @returns 
 */
function ExpenseItem({ title, amount, date }) {
    return (
        <li>
            <div className='expense-item'>
                <ExpenseDate date={date} />
                <div className='expense-item__description'>
                    <h2>{title}</h2>
                    <div className='expense-item__price'>₹{amount}</div>
                </div>
            </div>
        </li>
    );
}

export default ExpenseItem;