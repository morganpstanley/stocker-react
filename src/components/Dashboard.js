import React, { Component } from 'react';
import AddStockForm from './AddStockForm';
import UserInvestments from './UserInvestments'
import DashPieChart from './DashPieChart'

class Dashboard extends Component {


    render() {
        return(
            <div id="dashboard">
                <AddStockForm />
                <DashPieChart stocks={this.props.stocks}/>
                <UserInvestments />
            </div>
        )
    }
}

export default Dashboard