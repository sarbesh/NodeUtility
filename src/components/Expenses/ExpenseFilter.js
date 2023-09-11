import React from "react";
import "./ExpenseFilter.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * 
 * @param {Object} props
 * @param {Array<String>} props.props
 *  
 * @returns 
 */
function ExpenseFilter(props) {

    const yearSelectHandler = (event) => {
        props.onSelectYear(event.target.value);;
    }

    return (
        <div className="expenses-filter" >
            <FormControl sx={{ m: 1, minWidth: 80 }} className="expense_filter_form" autoWidth>
                <InputLabel id='expense_filter_select_label'>Year</InputLabel>
                <Select labelId="expense_filter_select_label" label="Year" id="expense_year_select" onChange={yearSelectHandler} defaultValue={'all'} value={props.selectedYear}>
                    <MenuItem value="all">All</MenuItem> {/* Add the "All" option */}
                    {Array.from(props.expenseYearSet).map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

export default ExpenseFilter;