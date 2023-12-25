import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Models(props) {
    const [selectedModel, setSelectedModel] = useState('');
    const [amount, setAmount] = useState(1);
    const [lastTransaction, setLastTransaction] = useState([{}]);

    const handleModelSelection = (model) => {
        setSelectedModel(model);
    };

    const handleGenerate = async () => {
        setAmount(amount + 1);
        props.passChildData(amount);
        try {
            if (selectedModel) {
                const response = await axios.post('http://localhost:5000/model', {
                    data: props.data.data,
                    ticker: props.data.ticker,
                    start: props.data.start,
                    end: props.data.end,
                    type: selectedModel,
                });
                // Handle response if needed
                props.setLastTransaction(response.data);
                props.passModelData(response);
            }
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg p-5 ml-6">
            <div className="container mx-auto">
                <div className="flex flex-col space-y-4 items-center">
                    <div className="font-dm-sans font-semibold text-xl leading-5 flex items-center text-gray-500 mb-4">Generate ML Models</div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                        className={`border-[3px] rounded-lg py-2 px-4 text-lg ${
                            selectedModel === 'Regression'
                              ? 'border-blue-700'
                              : 'bg-white'
                          }`}
                        onClick={() => handleModelSelection('Regression')}
                        >
                        Regression
                        </button>
                        <button
                        className={`border-[3px] rounded-lg py-2 px-4 text-lg ${
                            selectedModel === 'ARIMA'
                              ? 'border-blue-700'
                              : 'bg-white'
                          }`}
                        onClick={() => handleModelSelection('ARIMA')}
                        >
                        ARIMA
                        </button>
                        <button
                        className={`border-[3px] rounded-lg py-2 px-4 text-lg ${
                            selectedModel === 'LSTM'
                              ? 'border-blue-700'
                              : 'bg-white'
                          }`}
                        onClick={() => handleModelSelection('LSTM')}
                        >
                        LSTM
                        </button>
                        <button
                        className={`border-[3px] rounded-lg py-2 px-4 text-lg ${
                            selectedModel === 'CNN'
                              ? 'border-blue-700'
                              : 'bg-white'
                          }`}
                        onClick={() => handleModelSelection('CNN')}
                        >
                        CNN
                        </button>
                    </div>
                    <button
                        className="text-white mt-4 bg-blue-700 w-full hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleGenerate}
                        disabled={!selectedModel}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Models