import { Container, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { React, Component, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { local } from '../../utils/api';
import withRouter from '../../utils/withRouter';

class InvestmentAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            investment: {
                id: 0,
                type: '',
                fy: '',
                date: new Date().toISOString().slice(0, 10),
                maturity: '',
                issuer: '',
                number: 0,
                invest_amount: 0,
                interest_rate: 0,
                comments: '',
                metadata: {
                    plan: '',
                    premium: 0,
                    invest_period: 0,
                    investment_period: 0,
                    returns: 0,
                    interest_rate: 0
                }
            },
            error: {},
            invest_type: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleMetaChange = this.handleMetaChange.bind(this);
    }

    componentDidMount = async () => {
        local.get("invest_type")
            .then(res => {
                this.setState({ invest_type: res.data });
                this.setData("type", res.data[0], false);
            })
            .catch(err => {
                this.setState({ error: err });
            });

        if (this.props && this.props.investment && this.props.investments.id) {
            this.setState({ investment: this.props.investment })
        }
    }

    handleChange = (event) => {
        this.setData(event.target.name, event.target.value, false);
    }

    handleMetaChange = (event) => {
        this.setData(event.target.name, event.target.value, true);
    }

    handleMaturity = (event) => {
        this.handleMetaChange(event);
        this.setData("maturity", this.addYear(this.state.investment.date, event.target.value).toISOString().slice(0, 10), false);
    }

    setData(data, value, is_meta) {
        // console.log("data: "+data+", value: "+value+", meta: "+is_meta);
        if (!is_meta) {
            this.setState({ investment: { ...this.state.investment, [data]: value } });
        } else {
            this.setState((prevState) => ({
                ...prevState,
                investment: {
                    ...prevState.investment,
                    metadata: {
                        ...prevState.investment.metadata,
                        [data]: value
                    }
                }
            }));
        }
    }

    addYear(date, years) {
        const md = new Date(date);
        md.setFullYear(date.getFullYear() + parseInt(years));
        return md;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const investment = this.state.investment;

        if (investment && !investment.maturity) {
            investment.maturity = (this.addYear(investment.date, investment.metadata.investment_period).toISOString().slice(0, 10));
        }

        console.log(investment);
        // const investment = {
        //     id: this.state.id,
        //     type: this.state.type,
        //     fy: this.state.fy,
        //     date: this.state.date,
        //     plan: this.state.plan,
        //     issuer: this.state.issuer,
        //     number: this.state.number,
        //     first_year: this.state.first_year,
        //     onward: this.state.onward,
        //     pay_term: this.state.pay_term,
        //     policy_term: this.state.policy_term,
        //     returns: this.state.returns,
        //     comments: this.state.comments
        // };

        await local({
            url: "investments",
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
                    <Grid component="form" sx={{
                        '& > :not(style)': { m: 1, width: '500', maxWidth: '100%' },
                    }}
                        noValidate
                        autoComplete="off"
                        container spacing={2}>
                        <Grid xs={12} sm={4} md={3} item>
                            <Grid item>
                                <InputLabel id="type">Type</InputLabel>
                                <Select id="invest-type"
                                    label="Type"
                                    labelId="type"
                                    name="type"
                                    value={this.state.investment.type}
                                    onChange={this.handleChange}
                                    variant="filled" >
                                    {this.state.invest_type.map((option, idx) => (
                                        <MenuItem key={idx} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <TextField id="invest-fy" name="fy" value={this.state.investment.name} label="FY" variant="filled" onChange={this.handleChange} />
                            <TextField id="invest-date" name="date" value={this.state.investment.date} label="Invested On" type="date" variant="filled" onChange={this.handleChange} />
                        </Grid>
                        <Grid xs={12} sm={4} md={3} item>
                            <TextField id="invest-issuer" name="issuer" value={this.state.investment.issuer} label="Issuer" variant="filled" onChange={this.handleChange} />
                            <TextField id="invest-number" name="number" value={this.state.investment.number} label="Policy/Folio" type="number" variant="filled" onChange={this.handleChange} />
                            <TextField id="invest-first" name="invest_amount" value={this.state.investment.invest_amount} label="Investment Amount" type="number" variant="filled" onChange={this.handleChange} />
                            <TextField id="maturity-date" name="maturity" value={this.state.investment.maturity} label="Maturity On" type="date" variant="filled" onChange={this.handleChange} />
                        </Grid>
                        <Grid xs={12} sm={4} md={3} item>
                            <TextField id="invest-plan" name="plan" value={this.state.investment.metadata.plan} label="Plan" variant="filled" onChange={this.handleMetaChange} />
                            <TextField id="invest-onward" name="premium" value={this.state.investment.metadata.premium} label="Premium" type="number" variant="filled" onChange={this.handleMetaChange} />
                            <TextField id="invest-payterm" name="invest_period" value={this.state.investment.metadata.invest_period} label="Invest Pay Period" type="number" variant="filled" onChange={this.handleMetaChange} />
                            <TextField id="invest-policyterm" name="investment_period" value={this.state.investment.metadata.investment_period} label="Total Investment Period" type="number" variant="filled" onChange={this.handleMetaChange} />
                            <TextField id="invest-returns" name="returns" value={this.state.investment.metadata.returns} label="Returns" type="number" variant="filled" onChange={this.handleMetaChange} />
                        </Grid>
                        <TextField id="invest-comment" name="comments" value={this.state.investment.comments} fullWidth label="Comment" multiline placeholder="Comments" variant="filled" onChange={this.handleChange} />
                        <SaveIcon type="submit" value="Submit" onClick={this.handleSubmit} />
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(InvestmentAdd);