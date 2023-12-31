# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /flask-server

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN python3 -m pip install ipykernel
RUN python3 -m ipykernel install --user

COPY server.py .
COPY models.py .
COPY historical_data.py .
COPY run_notebook.py .

COPY notebooks/arima_prediction.ipynb notebooks/
COPY notebooks/lstm_prediction.ipynb notebooks/
COPY notebooks/regression_prediction.ipynb notebooks/

# Command to run the Flask application
CMD ["python", "server.py"]
