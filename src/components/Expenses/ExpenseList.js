import ExpenseItem from "./ExpenseItem";


const ExpenseList = (props) => {

    if (props.items.length === 0) {
        return <h3>No expenses yet!</h3>
    }

    return (<ul>
        {props.items.map(item => <ExpenseItem key={item.id} {...item} />)}
    </ul>);

}

export default ExpenseList;

