import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function ConvertDate(inputDate) {
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

const ShowChart = (props) => {
  const [array, setArray] = useState([]);
  const [dateAndTimeArray, setDateAndTimeArray] = useState([]);

  useEffect(() => {
    const newArray = [];
    const newDateAndTimeArray = [];

    try {
      for(let i = 0; i < Object.keys(props.data["data"]).length; i++) {
        newArray.push(props.data["data"][i.toString()][0]['Adj Close']);
        newDateAndTimeArray.push(ConvertDate(props.data["data"][i.toString()][0]['Date']));
      }
    } catch(error) {
      console.error(error);
    }

    try {
      if (props.model.data.data) {
        for(let i = 0; i < props.model.data.data["Adj Close"].length; i++) {
          newArray.push(parseFloat(parseFloat(props.model.data.data["Adj Close"][i]).toFixed(2)));
          newDateAndTimeArray.push(ConvertDate(props.model.data.data['Date'][i]));
        }
      }
    } catch(error) {
      console.error(error);
    }

    setArray(newArray);
    setDateAndTimeArray(newDateAndTimeArray);
  }, [props.data, props.model]);


  const options = {
    title: {
      text: props.data.ticker
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
        rotation: 0.1,
        align: 'left',
        enabled: true,
        style: {
          fontSize: '8px'
        }
      },
      categories: dateAndTimeArray,
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d %H:%M',
      shared: true
    },
    series: [{
      name: 'Price',
      data: array
    }]
  };

  return (
    <div className="w-[48%]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />  
    </div>
  );
};

export default ShowChart;
