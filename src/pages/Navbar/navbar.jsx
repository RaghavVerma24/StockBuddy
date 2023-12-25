import React, { useState } from 'react';
import "./style.css";
import Profile from '../../assets/profile.svg';
import { Navigate } from 'react-router-dom';

const navbar = () => {
  const [page, setPage] = useState(0)

  // if (page) {
  //   return <Navigate to="/stocks"/>
  // }

  return (
    <div className="bg-white p-5 inline-block w-screen font-body">
         <div className="not-italic font-bold text-2xl leading-8 flex items-center text-gray-700 float-left ml-12">
            StockBuddy
        </div>
        
        <div className="float-left ml-12 leading-6 flex items-center">
            <div className="not-italic font-bold text-lg leading-8 flex items-center text-indigo-700 ml-48 no-underline" onClick={() => {
              setPage(0)
            }}>
              Algo Trading
            </div>
            <div className="border rotate-0 h-5 mx-5 my-0 border-solid border-[#A9ACBB]">
                
            </div>
            <div className="not-italic font-medium text-lg leading-8 flex items-center text-gray-500" onClick={() => {
              setPage(1)
            }}>
              Stocks                
            </div>
        </div>
        <div className="flex items-center leading-8 absolute right-0 -mt-2 mr-12">
          <img src={Profile} alt="React Logo" />
        </div>
    </div>
  )
}

export default navbar