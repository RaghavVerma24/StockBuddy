import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

stocks = ["AAPL", "MSFT", "AMZN", "NVDA", "GOOGL", "META", "GOOG", "TSLA", "UNH", "LLY", "JPM", "XOM", "V", "AVGO", "JNJ", "PG", "MA", "HD", "ADBE"]


def get_date_from_duration(stock, duration):
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=duration)

    return stock.history(start=start_date, end=end_date)['Close']

# Function to get stock data
def get_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period='1d')  # Adjust period as needed
        volume = data['Volume'].iloc[-1]  # Volume for the latest trading day
        price = data['Close'].iloc[-1]  # Price at the end of the trading day

        # Fetching historical data for 7 days, 30 days, 1 year
        hist_7d = get_date_from_duration(stock, 7)
        hist_30d = get_date_from_duration(stock, 30)
        hist_1y = get_date_from_duration(stock, 365)

        # Calculate today's change as a percentage
        today_open = data['Open'].iloc[-1]
        today_change = ((price - today_open) / today_open) * 100

        return {
            'Ticker': ticker,
            'Volume': volume,
            'Price': round(price, 2),
            '7D': round(hist_7d[0], 2),  # Value of stock at the end of 7 days
            '30D': round(hist_30d[0], 2),  # Value of stock at the end of 30 days
            '1Y': round(hist_1y[0], 2),  # Value of stock at the end of 1 year
            'Today Change': round(today_change, 2)  # Round to 2 decimal places for percentage
        }
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}")
        return None

def get_latest_stock_data():
    # Fetching data for all stocks
    stock_data = []
    for stock in stocks:
        data = get_stock_data(stock)
        if data:
            stock_data.append(data)

    # Creating DataFrame
    df = pd.DataFrame(stock_data)

    # Sort by volume and return top 10 stocks
    top_10_stocks = df.sort_values(by='Volume', ascending=False).head(10)
    return top_10_stocks
