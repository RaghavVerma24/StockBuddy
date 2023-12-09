from nbconvert.preprocessors import ExecutePreprocessor
from nbformat import read, NO_CONVERT
from models import trading_days
import nbformat
import os

def execute_notebook_with_variables(notebook_path, variables):
    with open("./notebooks/" + notebook_path) as f:
        nb = read(f, NO_CONVERT)

    # Inject variables into the notebook cells
    for cell in nb['cells']:
        if cell.cell_type == 'code':
            for var_name, var_value in variables.items():
                cell.source = cell.source.replace(var_name, repr(var_value))

    execute_processor = ExecutePreprocessor(timeout=-1, kernel_name='python3') 

    executed, _ = execute_processor.preprocess(nb, {})
    
    executed_str = nbformat.writes(executed)

    # Save the executed notebook
    with open(notebook_path, 'w', encoding='utf-8') as f:
        f.write(executed_str)

    with open('data_file.txt', 'r') as file:
        data = file.read().split(',')

    try:
        os.remove('data_file.txt')
        print("'data_file.txt' has been successfully deleted.")
    except FileNotFoundError:
        print("'data_file.txt' does not exist.")
    except Exception as e:
        print(f"An error occurred while deleting 'data_file.txt': {e}")

    try:
        os.remove('regression_prediction.ipynb')
        print("'regression_prediction.ipynb' has been successfully deleted.")
    except FileNotFoundError:
        print("'regression_prediction.ipynb' does not exist.")
    except Exception as e:
        print(f"An error occurred while deleting 'regression_prediction.ipynb': {e}")

    try:
        os.remove('arima_prediction.ipynb')
        print("'arima_prediction.ipynb' has been successfully deleted.")
    except FileNotFoundError:
        print("'arima_prediction.ipynb' does not exist.")
    except Exception as e:
        print(f"An error occurred while deleting 'arima_prediction.ipynb': {e}")

    try:
        os.remove('lstm_prediction.ipynb')
        print("'lstm_prediction.ipynb' has been successfully deleted.")
    except FileNotFoundError:
        print("'lstm_prediction.ipynb' does not exist.")
    except Exception as e:
        print(f"An error occurred while deleting 'lstm_prediction.ipynb': {e}")

    return {"Adj Close" : data, "Date": trading_days(len(data))}
