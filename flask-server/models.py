import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
import shutil
from time import time
import datetime

def LinearRegression(data):
    stock_data = data

    stock_data['Date'] = pd.to_datetime(stock_data['Date'])
    
    print(f'Dataframe contains stock prices between {stock_data.Date.min()} {stock_data.Date.max()}')
    print(f'Total days = {(stock_data.Date.max() - stock_data.Date.min()).days} days')

    
    #Building the linear regression model
    from sklearn.model_selection import train_test_split

    #For model evaluation
    from sklearn.metrics import mean_squared_error as mse
    from sklearn.metrics import r2_score

    #Split data into train and test sets
    X = np.array(stock_data.index).reshape(-1,1)
    Y = stock_data['Close']
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3, train_size=0.7)

    X_train = X_train.astype(np.float64)
    X_test = X_test.astype(np.float64)

    from sklearn.linear_model import LinearRegression

    #Creating a linear model
    lm = LinearRegression()
    lm.fit(X_train, Y_train)

    prediction = lm.predict(X_train)
    #Calculate model score
    # scores = f'''
    # {'Metric'.ljust(10)}{'Train'.center(20)}{'Test'.center(20)}
    # {'r2_score'.ljust(10)}{r2_score(Y_train, prediction)}\t{r2_score(Y_test, lm.predict(X_test))}
    # {'MSE'.ljust(10)}{mse(Y_train, prediction)}\t{mse(Y_test, lm.predict(X_test))}
    # '''
    # print(scores)

    print("LINEAR REGRESSION: ", prediction)

def ARIMA(data):
    stock_data = data

    stock_data['Date'] = pd.to_datetime(stock_data['Date'])
    
    print(f'Dataframe contains stock prices between {stock_data.Date.min()} {stock_data.Date.max()}')
    print(f'Total days = {(stock_data.Date.max() - stock_data.Date.min()).days} days')

    from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
    from statsmodels.tsa.arima.model import ARIMA

    prices = stock_data['Close']

    returns = prices.pct_change().dropna()
    # plot_acf(returns)
    # plot_pacf(returns, method='ywm', nlags=5)

    model = ARIMA(prices, order=(7,0,6)) #Find best arima param for p,d,q
    fitted = model.fit()
    print(fitted.summary())

    next_day_price = fitted.forecast (20, alpha=0.05)
    print(next_day_price)

def trading_days(num_days):
    import pandas_market_calendars as mcal
    from datetime import datetime, timedelta

    market = mcal.get_calendar('XNYS') # For the New York Stock Exchange (NYSE)
    today = datetime.now()

    trading_days = []
    current_date = today

    while len(trading_days) < num_days:
        schedule = market.schedule(start_date=current_date + timedelta(days=1), end_date=current_date + pd.DateOffset(days=num_days) + timedelta(days=1)) 
        trading_days.extend(schedule.index.strftime('%Y-%m-%d'))
        current_date += pd.DateOffset(days=num_days)

    trading_days = trading_days[:num_days]
    return trading_days
    

