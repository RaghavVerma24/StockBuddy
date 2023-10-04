import React, { useState, useEffect } from 'react'   
import Navbar from '../Navbar/navbar';
import Form from './Form/form';
import ShowChart from './ShowChart/showchart'

const trading = () => {
  const [data, setData] = useState([{}]);
  const [formdata, setFormdata] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/data").then(response => 
      response.json().then(data => {
        setData(data);
        console.log(data["data"])
      })
    );
  }, [])
  const retrieveData = (formData) => {
    console.log("Data", formData);
    setFormdata(formData);
  };

  return (
    <>
      <Navbar/>
      <div className="mx-10 my-5 w-3/5 flex flex-row h-2/4">
        <Form onSubmit={retrieveData}/>
        <ShowChart data={formdata}/>
      </div>
    </>
  )
}

export default trading