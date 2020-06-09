import React, { Component } from 'react';
import AddStockForm from '../../components/AddStockForm/AddStockForm';
import UserInvestments from '../../components/UserInvestments/UserInvestments'
import DashPieChart from '../../components/PieChart/DashPieChart'

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