import React from 'react';
import { nse } from '../../utils/api';

export default class AllStocks extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            stocksRsp: {},
            stocks: []
        }
    }
    
    componentDidMount(){
        nse.get('content/equities/EQUITY_L.csv',{crossDomain : true})
        .then(res => {
            this.setState({stocksRsp: res.body})
        }).catch((err) => {
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                {this.state.stocks.map((stock,idx) => (
                    <div>
                        {JSON.stringify(stock)}
                    </div>
                ))}
            </div>
        )
    }
}