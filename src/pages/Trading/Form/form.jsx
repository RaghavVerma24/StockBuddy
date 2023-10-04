import React, { useState } from 'react';
import axios from 'axios';

const form = (props) => {
  let date = new Date().toISOString().split('T')[0]

  const [title, setTitle] = useState("AAPL");
  const [start, setStart] = useState(date);
  const [end, setEnd] = useState(date);

  const sendData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send', {
        "title" : title,
        "start" : start,
        "end" : end 
      });

      props.onSubmit(response.data)
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
    setTitle('');
    setStart('');
    setEnd('');
  }

  return (
    <div className="mr-6 w-2/5 ">
      <form onSubmit = {sendData} encType="multipart/form-data">
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ticker
        </label>
        <input
          type="text"
          id="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Start Date
        </label>
        <input
          type="date"
          id="date"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={start}
          onChange={event => setStart(event.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="date"s
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          End Date
        </label>
        <input
          type="date"
          id="date"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          value={end}
          onChange={event => setEnd(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </form>
  </div>
  )
}

export default form