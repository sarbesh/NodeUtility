import React from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css'
import API from '../../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import InvestmentAdd from './InvestmentAdd';
import { Box, Divider, SpeedDialIcon } from '@mui/material';
import { RemoveRedEye} from '@mui/icons-material';

export default class Investment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            investments: [],
            error: {},
            delid: {}
        };
        this.componentDidMount=this.componentDidMount.bind(this);
        this.deleteEntry=this.deleteEntry.bind(this);
    }

    componentDidMount(){
        API.get("investments")
        .then(res => {
            const investment = res.data;
            this.setState({investments: investment});
        }).catch((err) => {
            this.setState({error: err});
        })
    }

    deleteEntry = (idx,event) => {
        var investments = this.state.investments;
        var id = investments.splice(idx,1)[0].id;
        // console.log(id);
        API.delete(`investments/${id}`)
        .then(res => {
            if(res.status===200){
                this.setState({investments: investments})
            }
        })
        .catch(err => {
            this.setState({error: err});
        })
    }

    render(){
        return (
            <div>
                <NavLink to="/investment/add">
                    <AddIcon fontSize="large">Add Investment</AddIcon>
                </NavLink>
                <TableContainer component={Paper}>
                    <Table aria-label="Investments">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>FY</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Issuer</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Maturity</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.investments.map((investment,idx) => (
                                <TableRow key={investment.id}>
                                    <TableCell className="text-capitalize">{investment.type}</TableCell>
                                    <TableCell>{investment.fy}</TableCell>
                                    <TableCell>{investment.date}</TableCell>
                                    <TableCell className="text-capitalize">{investment.issuer}</TableCell>
                                    <TableCell>{investment.number}</TableCell>
                                    <TableCell>{investment.invest_amount}</TableCell>
                                    <TableCell>{investment.maturity}</TableCell>
                                    <TableCell>{investment.comments}</TableCell>
                                    <TableCell>
                                        <Box>
                                            <DeleteIcon onClick={ (e) => this.deleteEntry(idx,e)}/>
                                            <EditIcon />
                                            <RemoveRedEye />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
