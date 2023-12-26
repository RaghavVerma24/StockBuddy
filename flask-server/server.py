from flask import Flask, request, jsonify
from flask_cors import CORS
from models import LinearRegression, ARIMA
from run_notebook import execute_notebook_with_variables
from historical_data import get_latest_stock_data
from datetime import datetime, timedelta
import yfinance as yf
import pandas as pd
import time
import json
import csv
import requests
import os

app = Flask(__name__)
CORS(app)

# Data API Route
@app.route('/data', methods=['GET', 'POST'])
def data(ticker="AAPL",starting=None,ending=None): 
    time.sleep(1)
    if ending is None:
        ending = datetime.now().strftime("%Y-%m-%d")

    # Calculate the starting date as 30 days before today
    if starting is None:
        starting_date = datetime.now() - timedelta(days=30)
        starting = starting_date.strftime("%Y-%m-%d")

    data = yf.download(ticker, starting, ending)
    data["Date"] = data.index
    data["Adj Close"] = data["Adj Close"].round(2)

    today_close = data["Adj Close"][len(data)-1]
    yesterday_close = data["Adj Close"][len(data)-2]

    data = parseJson(data)
    return {"data" : data, "ticker" : ticker, "start" : starting, "end": ending, "time" : datetime.now().strftime('%I:%M %p'), "price" : today_close, "change" : ((today_close - yesterday_close)/yesterday_close * 100).round(2), "modal" : "Regression"}

@app.route("/model", methods=["POST"])
def model(): 
    form = request.get_json()   # Access JSON data sent in the request body
    data = form['data']
    ticker = form['ticker']
    starting = form['start']
    ending = form['end']
    type = form['type']
    duration = form['duration']

    data_list = []
    for key, value in data.items():
        data_list.extend(value)
    data = pd.DataFrame(data_list)

    today_close = data["Adj Close"][len(data)-1]
    yesterday_close = data["Adj Close"][len(data)-2]

    path = storeCsv(data, ticker, starting, ending)

    if (type == "Regression"):
        data = execute_notebook_with_variables('regression_prediction.ipynb', {"file_path": path, "ticker": ticker, "duration": duration})
    elif (type == "ARIMA"):
        data = execute_notebook_with_variables('arima_prediction.ipynb', {"file_path": path, "ticker": ticker, "duration": duration})
    elif (type == "LSTM"):
        data = execute_notebook_with_variables('lstm_prediction.ipynb', {"file_path": path, "ticker": ticker, "duration": duration})

    removeCsv(path)
    return {"data" : data, "ticker" : ticker, "start" : starting, "end": ending, "time" : datetime.now().strftime('%I:%M %p'), "price" : today_close, "change" : ((today_close - yesterday_close)/yesterday_close * 100).round(2), "modal" : type}

@app.route("/send", methods=["POST"])
def send():
    form = request.get_json() 
    return data(form['title'], form['start'], form['end'])

@app.route("/latest")
def latest():
    data = get_latest_stock_data()
    json_data = data.to_json(orient='records')  
    return json_data

def parseJson(stock_data):
    stock_data['Timestamps'] = [f"{i}" for i in range(len(stock_data))]
    grouped = stock_data.groupby("Timestamps")
    nested_json = {}
    for date, group in grouped:
        nested_json[date] = group[['Open', 'High', 'Low', 'Close', 'Adj Close', "Date"]].to_dict(orient='records')
    return nested_json

def storeCsv(stock_data, ticker, starting, ending):
    directory = 'csv'
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    csv_file_path = f"./{directory}/{ticker}_{''.join(filter(str.isdigit, starting))}_{''.join(filter(str.isdigit, ending))}.csv"

    stock_data.to_csv(csv_file_path, mode='a', index=False, columns=stock_data.columns.tolist())

    return csv_file_path

def removeCsv(file_name):
    if os.path.exists(file_name):
        os.remove(file_name)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)