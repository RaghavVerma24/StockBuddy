import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush, Legend, CartesianGrid, ResponsiveContainer, Bar } from 'recharts';

function ConvertDate(inputDate) {
    const date = new Date(inputDate);
    return date.toISOString().split('T')[0];
  }

const newChart = (props) => {
    const [array, setArray] = useState([]);
    const [dateAndTimeArray, setDateAndTimeArray] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
  
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
        
    useEffect(() => {
        const min = Math.min(...array);
        const max = Math.max(...array);

        setMinValue(Math.floor(min)); // Round down for minimum
        setMaxValue(Math.ceil(max)); // Round up for maximum
    }, [array]);

    const chartData = array.map((price, index) => ({
        date: dateAndTimeArray[index],
        price: price.toFixed(2) // If you want to round the price to 2 decimal places
      }));

    return (
        <div className="w-[48%]">
            <div class="flex justify-center items-center">
            <div className="not-italic font-bold text-xl leading-8 flex items-center text-indigo-700 text-center no-underline">Current Stock Price {'>'} {props.data.ticker}</div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={600}
                height={400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left"
                    domain={[minValue, maxValue]}
                    tickFormatter={(value) => Math.round(value)}/>
                <Tooltip />
                <Legend />
                <Line
                    type="linear"
                    dataKey="price"
                    stroke="#8884d8"
                    yAxisId="left"
                    dot={false}
                    dotLine={{ strokeWidth: 2, stroke: '#8884d8', fill: '#8884d8' }}
                />
                <Bar dataKey="volume" fill="#82ca9d" yAxisId="right" />
                <Brush dataKey="date" height={30} stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default newChart;
