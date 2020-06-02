import React from "react"
import { PieChart } from 'react-minimal-pie-chart';

const colorOptions = [
  '#6F694E', '#65D0B2', '#D8F546', '#FF724B', '#D6523E', 
  '#9782C6', '#F68F39', '#E5F055', '#A34EB5', '#E76624'
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