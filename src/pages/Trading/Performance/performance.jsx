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
    fetch("http://localhost:5000/latest").then(response => 
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
    <div className="my-5 h-[25rem] w-3/4">
      <ThemeProvider theme={theme}>
        <Paper style={{ height: '40vh', width: '100%' }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </ThemeProvider>
    </div>
  );
}