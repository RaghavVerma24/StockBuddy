import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function convertDate(inputDate) {
  // Parse the input date string
  const parsedDate = new Date(inputDate);

  // Define month names array
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Extract the month, day, and time components
  const month = monthNames[parsedDate.getMonth()];
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  // Format the date in the desired output format
  const outputDate = `${month}-${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return outputDate;
}

class showchart extends React.Component {   
  render() {
    let array = []
    let dateAndTimeArray = []
    try {
      for(let i=0; i<Object.keys(this.props.data["data"]).length; i++) {
          array.push(this.props.data["data"][i.toString()][0]['Adj Close'])
          dateAndTimeArray.push(convertDate(this.props.data["data"][i.toString()][0]['Date']))
      }
    } catch {

    }
    console.log(dateAndTimeArray)
    const options = {
      title: {
        text: 'My chart'
      },
    //   xAxis: {
    //     tickInterval: 1,
    //     labels: {
    //         enabled: true,
    //         formatter: function() { return this.props.data["data"][this.value][0]["Date"]},
    //     }
    //  },
      xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'justify'
        },
        startOnTick: true,
        showFirstLabel: true,
        endOnTick: true,
        showLastLabel: true,
        categories: dateAndTimeArray,  
        labels: {
            rotation: 0.1,
            align: 'left',
            enabled: true
        },
        style: {
            fontSize: '8px'
        }
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M',
        shared: true
      },
      series: [{
        name: 'Price',
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