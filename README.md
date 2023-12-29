
# Stock Price Prediction Platform

A stock price prediction platform built using Flask, React, and Python, providing users with up-to-date predictions and analysis with statistical and deep learning models like ARIMA, Regression, LSTM, and CNN.

![image](https://github.com/RaghavVerma24/StockBuddy/assets/59304737/1564b7c8-cc26-4278-a5b4-e20297e270c1)

## Technologies Used

- **Flask**: Micro web framework for building web applications in Python.
- **React**: JavaScript library for building user interfaces.
- **Python**: Programming language used for backend logic and machine learning models.
- **TensorFlow, Keras, Scikit-learn**: Libraries for implementing machine learning models.
- **Pandas**: For effective data preprocessing and analysis.
- **Docker**: Containerization for deployment.
- **AWS**: Cloud hosting and scaling.

![Flask](https://img.icons8.com/color/48/000000/flask.png) 
![React](https://img.icons8.com/color/48/000000/react-native.png)
![Python](https://img.icons8.com/color/48/000000/python.png) 
![Tailwind CSS](https://img.icons8.com/color/48/000000/tailwindcss.png)
![Tensorflow](https://img.icons8.com/color/48/000000/tensorflow.png)
![Pandas](https://img.icons8.com/color/48/000000/pandas.png)
![Docker](https://img.icons8.com/color/48/000000/docker.png)
![AWS](https://img.icons8.com/color/48/000000/amazon-web-services.png)

## Features

- Real-time stock trend predictions leveraging ARIMA, GARCH, LSTM, and CNN models.
- Machine learning models developed with TensorFlow, Keras, and Scikit-learn for stock trend analysis.
- Pandas for efficient data preprocessing, enabling handling and analysis of vast financial data.
- Docker for streamlined deployment and scaling on AWS, ensuring reliable handling of user demand.

## Installation

To start or clone the project, follow these steps:
### Docker Compose Setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your/repository.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd project-directory
    ```

3. **Start the Application:**
    ```bash
    docker-compose up
    ```

4. **Access the Application:**
    Open a browser and visit the appropriate URL to view the app.

Ensure the ports are correctly exposed and mapped within the `docker-compose.yml` file according to your application's requirements. This setup uses Docker Compose to orchestrate the containerized services.

### Regular Setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/RaghavVerma24/StockBuddy.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd StockBuddy
    ```

3. **Install Dependencies:**
    - **Backend (Flask - Python):**
        ```bash
        cd flask-server
        pip install -r requirements.txt
        ```

    - **Frontend (React):**
        ```bash
        npm install
        ```

5. **Start the Servers:**
    - **Backend (Flask):**
        ```bash
        cd flask-server
        python server.py
        ```

    - **Frontend (React/Vite):**
        ```bash
        npm run dev
        ```

## Contributing

Feel free to contribute to this project by submitting a pull request adhering to the project's coding standards and practices.

## License

This project is open-source and available under the [MIT License](https://github.com/YourUsername/StockPricePredictionPlatform/LICENSE).
