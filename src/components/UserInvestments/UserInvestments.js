import React from "react"
import './UserInvestments.css'

const UserInvestments = ({stocks}) => {

    const currentValue = stocks.reduce((a, b) => {
        return a + (b.amountOfShares * b.c)
    }, 0)
    
    const previousCloseValue = stocks.reduce((a, b) => {
        return a + (b.amountOfShares * b.pc)
    }, 0)

    const percentChange = ((currentValue - previousCloseValue) * 100 / previousCloseValue).toFixed(2)

    return (
       <div className="dashboard-part" id="user-investments">
           <h3 id="portfolio-value-title"> PORTFOLIO VALUE </h3>
           <span id="portfolio-value-value">${currentValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
           <span id="percent-change-today-title"> Change Today: </span>
           <span id="percent-change-today-value">{percentChange}%</span>
           <span id="percent-change-overall-title"> Change Overall: </span>
           <span id="percent-change-overall-value"> 10.00% </span>
       </div>
    )
}

export default UserInvestments