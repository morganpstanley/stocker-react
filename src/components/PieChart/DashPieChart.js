import React from "react"
import { PieChart } from 'react-minimal-pie-chart';
import './DashPieChart.css'

const colorOptions = [
  '#fff100', '#ff8c00', '#e81123', '#ec008c', '#68217a',
  '#00188f', '#00bcf2', '#00b294', '#009e49', '#bad80a'
]

const defaultLabelStyle = {
  fontSize: '8px',
};

const DashPieChart = ({stocks}) => {

    const data = () => {

      let total = 0;
      
      stocks.forEach(stock => {
        total += stock.amountOfShares * stock.c
      })

      const returnArray = stocks.map((stock, i)=> {
        return(
          { title: stock.ts, value: (stock.amountOfShares * stock.c) / total * 100, color: colorOptions[i]}
        )
      })

      return (
        returnArray
      )
    }

    return (
        <div className="dashboard-part" id="pie-chart">
           <PieChart
            data={data()}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              ...defaultLabelStyle,
            }}
            radius={42}
      labelPosition={112}
            />
       </div>
    )
}

export default DashPieChart