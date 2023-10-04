from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import time
import json

app = Flask(__name__)
CORS(app)

# Data API Route
@app.route("/data")
def data(ticker="AAPL",starting="2023-01-01",end="2023-02-01"): 
    time.sleep(1)
    data = yf.download(ticker, starting, end)
    data = parseJson(data)
    return {"data" : data}

@app.route("/send", methods=["POST"])
def send():
    form = request.get_json() 
    return data(form['title'], form['start'], form['end'])

def parseJson(stock_data):
    stock_data['Timestamps'] = [f"{i}" for i in range(len(stock_data))]
    grouped = stock_data.groupby("Timestamps")
    nested_json = {}
    for date, group in grouped:
        nested_json[date] = group[['Open', 'High', 'Low', 'Close', 'Adj Close']].to_dict(orient='records')
    return nested_json

if __name__ == "__main__":
    app.run(host="localhost", debug=True)

