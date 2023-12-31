import React, { useState, useEffect } from 'react';
import axios from 'axios';

const form = (props) => {
  let today = new Date()
  let pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);
  
  let endDateString = today.toISOString().split('T')[0]
  let pastDateString = pastDate.toISOString().split('T')[0];

  const [title, setTitle] = useState("AAPL");
  const [start, setStart] = useState(pastDateString);
  const [end, setEnd] = useState(endDateString);

  const handleButtonClick = () => {
  };
  
  const sendData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://stockbuddy.onrender.com/api/v1/send', {
        "title" : title,
        "start" : start,
        "end" : end 
      });

      props.onSubmit(response.data)

    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    setTitle(title);
    setStart(start);
    setEnd(end);
  }

  useEffect(() => {
    // Function to run on page reload
    const handlePageReload = async () => {
      try {
        const response = await axios.post('https://stockbuddy.onrender.com/api/v1/send', {
          "title" : title,
          "start" : start,
          "end" : end 
        });
  
        props.onSubmit(response.data)
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    };

    handlePageReload();

    window.addEventListener('beforeunload', handlePageReload);

    return () => {
      window.removeEventListener('beforeunload', handlePageReload);
    };
  }, []);

  return (
    <div className="mr-6 min-w-[12%] max-w-[12%]">
      <form onSubmit = {sendData} encType="multipart/form-data">
      <div className="mb-6">
        <label
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Ticker
        </label>
        <input
          type="text"
          id="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="date"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Start Date
        </label>
        <input
          type="date"
          id="date"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={start}
          onChange={event => setStart(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="date"s
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          End Date
        </label>
        <input
          type="date"
          id="date"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={end}
          onChange={event => setEnd(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="text-white mt-4 bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleButtonClick}        
      >
        Search
      </button>
    </form>
  </div>
  )
}

export default form