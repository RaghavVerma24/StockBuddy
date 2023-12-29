import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush, Legend, CartesianGrid, ResponsiveContainer, Bar } from 'recharts';

function ConvertDate(inputDate) {
  const date = new Date(inputDate);
  return date.toISOString().split('T')[0];
}

const NewChart = (props) => {
  const [values, setValues] = useState([]);
  const [dates, setDates] = useState([]);
  const [modelValues, setModelValues] = useState([]);
  const [modelDates, setModelDates] = useState([]);

  const [combinedChartData, setCombinedChartData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const values = [];
    const dates = [];
    const modelValues = [];
    const modelDates = [];

    try {
      for (let i = 0; i < Object.keys(props.data["data"]).length; i++) {
        values.push(props.data["data"][i.toString()][0]['Adj Close']);
        dates.push(ConvertDate(props.data["data"][i.toString()][0]['Date']));
      }
    } catch (error) {
      console.error(error);
    }

    try {
      if (props.model.data.data) {
        for (let i = 0; i < props.model.data.data["Adj Close"].length; i++) {
          modelValues.push(parseFloat(parseFloat(props.model.data.data["Adj Close"][i]).toFixed(2)));
          modelDates.push(ConvertDate(props.model.data.data['Date'][i]));
        }
      }
    } catch (error) {
      console.error(error);
    }

    setValues(values);
    setDates(dates);
    setModelValues(modelValues);
    setModelDates(modelDates);
  }, [props.data, props.model]);

  useEffect(() => {
    const min = Math.min(...values);
    const max = Math.max(...values);

    setMinValue(Math.floor(min)); // Round down for minimum
    setMaxValue(Math.ceil(max)); // Round up for maximum
  }, [values]);
  
  useEffect(() => {
    if (values.length > 0) {
      const chartData = values.map((price, index) => ({
        date: dates[index],
        price: price.toFixed(2),
      }));
  
      const newLineData = modelValues.map((price, index) => ({
        date: modelDates[index],
        newLineData: price.toFixed(2),
      }));
  
      newLineData.unshift({
        date: dates[dates.length - 1],
        newLineData: values[values.length - 1].toFixed(2), 
      });

      const combinedChartData = [];
  
      chartData.forEach(({ date, price }) => {
        const newLineDataItem = newLineData.find((item) => item.date === date);
  
        if (newLineDataItem) {
          combinedChartData.push({
            date,
            price,
            newLineData: newLineDataItem.newLineData,
          });
        } else {
          combinedChartData.push({ date, price, newLineData: null });
        }
      });
  
      newLineData.forEach(({ date, newLineData: value }) => {
        const exists = combinedChartData.some((item) => item.date === date);
        if (!exists) {
          combinedChartData.push({ date, price: null, newLineData: value });
        }
      });
  
      // Sort combinedChartData based on date, if needed
      combinedChartData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setCombinedChartData(combinedChartData);
    }
  }, [values, dates, modelValues, modelDates]);
  

  const renderChartLines = () => {
    return (
      <>
        <Line
            type="linear"
            dataKey="price"
            stroke="#8884d8"
            name="Current Price"
            yAxisId="left"
            dot={false}
            connectNulls 
            dotLine={{ strokeWidth: 2, stroke: '#8884d8', fill: '#8884d8' }}
          /> 
        {props.model ? 
          <Line
            type="linear"
            dataKey="newLineData"
            stroke="#82ca9d"
            yAxisId="left"
            name="Predicted Price"
            dot={false}
            dotLine={{ strokeWidth: 2, stroke: '#82ca9d', fill: '#82ca9d' }}
            connectNulls 
          />
        : ""}
      </>
    );
  };

  return (
    <div className="min-w-[48%] max-w-[48%]">
      <div className="flex justify-center items-center">
        <div className="not-italic font-bold text-xl leading-8 flex items-center text-indigo-700 text-center no-underline">Current Stock Price {'>'} {props.data.ticker}</div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={600}
          height={400}
          data={combinedChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            yAxisId="left"
            domain={[minValue, maxValue]}
            tickFormatter={(value) => Math.round(value)}
          />
          <Tooltip />
          <Legend />
          {renderChartLines()}
          <Bar dataKey="volume" fill="#82ca9d" yAxisId="right" />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewChart;
