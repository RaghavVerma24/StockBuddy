import React, { useEffect, useState } from 'react';
import { DefaultApi } from 'finnhub-ts';
import { VictoryPie, VictoryLabel } from 'victory';

const Result = (props) => {
  const initialRatings = {
    buy: 0,
    strongBuy: 0,
    sell: 0,
    hold: 0,
  };

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
      { x: 'Buy', y: ratings.buy },
      { x: 'Strong Buy', y: ratings.strongBuy },
      { x: 'Sell', y: ratings.sell },
      { x: 'Hold', y: ratings.hold },
    ]);
  }, [ratings]);

  return (
    <div className="ml-6 w-[24%] bg-white rounded-lg">
      <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={animatedData}
          innerRadius={100}
          colorScale={['#4CAF50', '#8BC34A', '#F44336', '#FFC107']}
          labels={({ datum }) => `${datum.x}: ${Math.round(datum.y)}`}
          labelRadius={120}
          style={{ labels: { fill: 'black', fontSize: 16, fontWeight: 'bold' } }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        return {
                          style: { ...props.style, strokeWidth: 3, stroke: 'white' },
                        };
                      },
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'data',
                      mutation: () => null,
                    },
                  ];
                },
              },
            },
          ]}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          text="Analyst Ratings"
          style={{ fontSize: 24, fontWeight: 'bold' }}
        />
      </svg>
    </div>
  );
};

export default Result;
