import React from 'react';
import './ExpenseDate.css'

/**
 * 
 * @param {Object} props 
 * @param {Date} props.date
 * @returns 
 */
function ExpenseDate(props){
    // console.log("props: "+JSON.stringify(props));
    let year = props.date.getFullYear();
    let month = props.date.toLocaleDateString('en-US',{month: "long"});
    let date = props.date.toLocaleDateString('en-US', {day: '2-digit'});
    return (
        <div className='expense-date'>
            <div className='expense-date__year'>{year}</div>
            <div className='expense-date__month'>{month}</div>
            <div className='expense-date__day'>{date}</div>
        </div>
    );
}

export default ExpenseDate;