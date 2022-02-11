import { Container, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import {React, Component} from 'react';
import SaveIcon from '@mui/icons-material/Save';
import API from '../../utils/api';
import withRouter from '../../utils/withRouter';

class InvestmentAdd extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            type: '',
            fy: '',
            date: '',
            plan: '',
            issuer: '',
            number: 0,
            first_year: 0,
            onward: 0,
            pay_term: 0,
            policy_term: 0,
            returns: 0,
            comments: '',
            error: {},
            invest_type: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    componentDidMount = async () => {
        API.get("invest_type")
        .then(res => {
            this.setState({invest_type: res.data})
            this.setState({type: res.data[0]})
        })
        .catch(err => {
            this.setState({error: err});
        })
    }

    handleChange = (event) => {
        // console.log(event.target.name+" "+event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const investment = {
            id: this.state.id,
            type: this.state.type,
            fy: this.state.fy,
            date: this.state.date,
            plan: this.state.plan,
            issuer: this.state.issuer,
            number: this.state.number,
            first_year: this.state.first_year,
            onward: this.state.onward,
            pay_term: this.state.pay_term,
            policy_term: this.state.policy_term,
            returns: this.state.returns,
            comments: this.state.comments
        };

        await API({
            url : "investments",
            method: "POST",
            data: investment
        })
        .then(res => {
            this.setState.id = res.data.id;
            console.log(res.data);
            this.props.navigate("/investment");
        })
        .catch(err => {
            this.setState.error = err;
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Box component="form" sx={{
                            '& > :not(style)': { m: 1, width: '500', maxWidth: '100%' },
                        }}
                        noValidate
                        autoComplete="off">
                        <InputLabel id="type">Type</InputLabel>
                        <Select id="invest-type" 
                            label="Type"
                            labelId="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}  
                            variant="filled" >
                            {this.state.invest_type.map((option,idx) => (
                                <MenuItem key={idx} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField id="invest-fy" name="fy" value={this.state.name} label="FY" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-date" name="date" value={this.state.date} label="Date" type="date" variant="filled" onChange={this.handleChange} />
                        <TextField id="invest-plan" name="plan" value={this.state.plan} label="Plan" variant="filled" onChange={this.handleChange} />
                        <TextField id="invest-issuer" name="issuer" value={this.state.issuer} label="Issuer" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-number" name="number" value={this.state.number} label="Policy/Folio" type="number" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-first" name="first_year" value={this.state.first_year} label="First Payment" type="number" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-onward" name="onward" value={this.state.onward} label="Onwards" type="number" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-payterm" name="pay_term" value={this.state.pay_term} label="Pay Term" type="number" variant="filled" onChange={this.handleChange} />
                        <TextField id="invest-policyterm" name="policy_term" value={this.state.policy_term} label="Total Term" type="number" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-returns" name="returns" value={this.state.returns} label="Returns" type="number" variant="filled" onChange={this.handleChange}/>
                        <TextField id="invest-comment" name="comments" value={this.state.comments} fullWidth label="Comment" multiline placeholder="Comments" variant="filled" onChange={this.handleChange}/>
                        <SaveIcon type="submit" value="Submit" onClick={this.handleSubmit}/>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default withRouter(InvestmentAdd);