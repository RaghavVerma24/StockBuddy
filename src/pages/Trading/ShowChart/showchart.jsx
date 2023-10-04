import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class showchart extends React.Component {   
  render() {
    let array = []
    try {
      for(let i=0; i<Object.keys(this.props.data["data"]).length; i++) {
          array.push(this.props.data["data"][i.toString()][0]['Adj Close'])
      }
    } catch {

    }
    console.log(array)
    const options = {
      title: {
        text: 'My chart'
      },
      series: [{
        data: array
      }]
    }
    
    return (
      <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
    )
  }
}

export default showchart