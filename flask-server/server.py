from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import time
import json
import csv

app = Flask(__name__)
CORS(app)

# Data API Route
@app.route("/data")
def data(ticker="AAPL",starting="2023-01-01",ending="2023-02-01"): 
    # time.sleep(1)
    data = yf.download(ticker, starting, ending)
    data["Date"] = data.index
    data["Adj Close"] = data["Adj Close"].round(2)
    appendCsv(ticker, data)
    data = parseJson(data)
    return {"data" : data}

@app.route("/send", methods=["POST"])
def send():
    form = request.get_json() 
    return data(form['title'], form['start'], form['end'])

def appendCsv(ticker, data):
    csv_file_path=f"./notebooks/csv/{ticker}.csv"
    data.to_csv(csv_file_path, index=False)


def parseJson(stock_data):
    stock_data['Timestamps'] = [f"{i}" for i in range(len(stock_data))]
    grouped = stock_data.groupby("Timestamps")
    nested_json = {}
    for date, group in grouped:
        nested_json[date] = group[['Open', 'High', 'Low', 'Close', 'Adj Close', "Date"]].to_dict(orient='records')
    return nested_json

if __name__ == "__main__":
    app.run(host="localhost", debug=True)

