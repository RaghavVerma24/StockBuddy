import React, { useState, useEffect } from 'react'   
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

export default function performance() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch("https://stockbuddy.onrender.com/api/v1/latest").then(response => 
      response.json().then(data => {
        let stockData = [];

        for (let i = 0; i < data.length; i++) {
            stockData.push(Object.values(data[i]))
        }
        setStock(stockData);
      })
    );
  }, [])
  
  function createData(id, ticker, volume, price, week, month, year, today) {
    return { id, ticker, volume, price, week, month, year, today };
  }
  
  const columns = [
    {
      width: 120,
      label: 'Ticker',
      dataKey: 'ticker',
    },
    {
      width: 120,
      label: 'Volume',
      dataKey: 'volume',
      numeric: true,
    },
    {
      width: 120,
      label: 'Price',
      dataKey: 'price',
      numeric: true,
    },
    {
      width: 120,
      label: '7D',
      dataKey: 'week',
      numeric: true,
    },
    {
      width: 120,
      label: '30D',
      dataKey: 'month',
      numeric: true,
    },
    {
      width: 120,
      label: '1Y',
      dataKey: 'year',
      numeric: true,
    },
    {
      width: 120,
      label: 'Today',
      dataKey: 'today',
      numeric: true,
    },
  ];
  
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const rows = Array.from({ length: stock.length }, (_, index) => {
    return createData(index, ...stock[index]);
  });

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width, color: "#A9ACBB", fontStyle: 'normal', fontWeight: 500, fontSize: '18px'}}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  
  
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
            style={{ color: "#4C506B", fontStyle: 'normal', fontWeight: 400, fontSize: '16px'}}
  
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
  
  const theme = createTheme({
    typography: {
      fontFamily: [
        'DM Sans',
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <div className="my-5 min-w-[calc(60%+1.5rem)] max-w-[calc(60%+1.5rem)] mt-6">
      <table className="w-full divide-y divide-gray-200 rounded-lg">
        <thead className="bg-blue-700">
          <tr>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Symbol</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Volume</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Last Price</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Week Change</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Month Change</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Year Change</th>
            <th className="px-3 py-3 text-left text-s font-medium text-white tracking-wider">Change (%)</th>
          </tr>
        </thead>
      </table>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full divide-y divide-gray-200 rounded-lg">
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.map((stockItem, index) => {
              const weekChangePercent = ((stockItem[2] - stockItem[3]) / stockItem[3]) * 100;
              const monthChangePercent = ((stockItem[2] - stockItem[4]) / stockItem[4]) * 100;
              const yearChangePercent = ((stockItem[2] - stockItem[5]) / stockItem[5]) * 100;

              return (
                <tr key={index}>
                  <td className="px-3 py-4 text-left whitespace-nowrap">{stockItem[0]}</td>
                  <td className="px-3 py-4 text-left whitespace-nowrap">{stockItem[1]}</td>
                  <td className="px-3 py-4 text-left whitespace-nowrap">{stockItem[2]}</td>
                  <td className={`px-3 py-4 text-left whitespace-nowrap ${weekChangePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {stockItem[3]} ({weekChangePercent.toFixed(2)}%)
                  </td>
                  <td className={`px-3 py-4 text-left whitespace-nowrap ${monthChangePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {stockItem[4]} ({monthChangePercent.toFixed(2)}%)
                  </td>
                  <td className={`px-3 py-4 text-left whitespace-nowrap ${yearChangePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {stockItem[5]} ({yearChangePercent.toFixed(2)}%)
                  </td>
                  <td className={`px-3 py-4 text-left whitespace-nowrap ${stockItem[6] < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {stockItem[6]}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}