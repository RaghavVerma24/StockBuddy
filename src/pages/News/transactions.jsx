import React, { useState, useEffect } from 'react';

const Transactions = (props) => {
    const [data, setData] = useState(props.data);
    const [transaction, setTransaction] = useState(props.transaction);

    useEffect(() => {
        setData(props.data); // Update the data when props.data changes
    }, [props.data]);

    useEffect(() => {
        setTransaction(props.transaction); // Update the data when props.data changes
    }, [props.transaction]);

    return (
        <div className='min-w-[16%] max-w-[16%] mt-6 ml-6'>
            <div className="bg-white rounded-lg p-5">
                <div className="flex items-center">
                    <img src="src\assets\transactions.png" alt='Transactions' className='w-16' />
                    <div className="ml-auto font-dm-sans font-bold text-2xl leading-[23px] flex items-center text-gray-700">
                        {data}
                    </div>
                </div>
                <div className="mt-6 font-dm-sans font-semibold text-[19.3548px] leading-[25px] flex items-center text-gray-500">
                    Total models generated
                </div>
            </div>
            <div className="mt-6 bg-white rounded-lg p-5">
                <div className="font-dm-sans font-semibold text-lg leading-5 flex items-center text-gray-500 mb-5">
                    Previous Model
                </div>  
                <div className="flex flex-row">
                    <div className="">
                        <div className="font-dm-sans font-medium text-xl leading-6 flex items-center text-blue-700">
                            {transaction.ticker}
                        </div>
                        <div className="font-dm-sans font-normal text-[18px] leading-5 flex items-center text-gray-400 mt-3">
                            {transaction.time}
                        </div>
                    </div>

                    <div className="ml-auto">
                        <div className="flex flex-row justify-end">
                            <div className="font-dm-sans font-medium text-2xl leading-6 items-center text-gray-700">
                                ${transaction.price}
                            </div>
                            <div className={`text-xl leading-6 items-center ${transaction.change > 0 ? 'text-[#63C89B]' : 'text-[#EB5757]'} ml-2`}>
                                {transaction.change}%
                            </div>
                        </div>
                        <div className="font-dm-sans font-normal text-[18px] leading-5 flex items-center text-gray-700 mt-3 ">
                            {transaction.modal}
                        </div>  
                    </div>
                    </div>

            </div>
        </div>
    )
}

export default Transactions;
