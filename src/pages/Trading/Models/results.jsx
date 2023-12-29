import React, { useEffect, useState } from 'react';
import { DefaultApi } from 'finnhub-ts';
import { VictoryPie, VictoryLabel } from 'victory';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const Result = (props) => {
  const initialRatings = {
    buy: 0,
    strongBuy: 0,
    sell: 0,
    hold: 0,
  };
  const COLORS = ['#199ca5', '#999999', '#912767'];
  const relevantKeys = ['Buy', 'Hold', 'Sell'];
  const [ratings, setRatings] = useState(initialRatings);
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const finnhubClient = new DefaultApi({
      apiKey,
      isJsonMime: (input) => {
        try {
          JSON.parse(input);
          return true;
        } catch (error) {}
        return false;
      },
    });

    const fetchRatings = async () => {
      try {
        const response = await finnhubClient.recommendationTrends(props.data);
        setRatings(response.data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRatings();
  }, [props.data]);

  useEffect(() => {
    setAnimatedData([
      { name: 'Buy', value: ratings.buy },
      { name: 'Sell', value: ratings.sell },
      { name: 'Hold', value: ratings.hold },
    ]);
  }, [ratings]);

  const totalRatings = animatedData.length > 0 ? animatedData.reduce((acc, entry) => acc + entry.value, 0) : 0;
  const majorityRating = animatedData.length > 0 ? animatedData.reduce((max, entry) =>
    entry.value > max.value ? entry : max
  ) : { name: '', value: 0 };

  const getMajorityColor = (majorityName) => {
    switch (majorityName) {
      case 'Buy':
        return COLORS[0];
      case 'Sell':
        return COLORS[1];
      case 'Hold':
        return COLORS[2];
      default:
        return COLORS[0];
    }
  };

  return (
    <div className="ml-6 min-w-[21%] max-w-[21%] bg-white rounded-lg relative flex flex-col items-center">
      <span className="text-2xl font-bold mt-8" style={{ color: getMajorityColor(majorityRating.name) }}>Rating: {majorityRating.name}</span>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-5xl font-bold">{totalRatings}</span>
        <br />
        <span className="text-3xl">Ratings</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={animatedData}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {animatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center">
        {relevantKeys.map((key) => (
          <div key={key} className="flex items-center mr-8 text-xl font-semibold" style={{ color: getMajorityColor(key) }}>
            <div className={`w-4 h-4 mr-2`} style={{ backgroundColor: getMajorityColor(key), borderRadius: '2px' }}></div>
            <span>{ratings[key.toLowerCase()]}</span>
            <span className="ml-1">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );   
};

export default Result;
