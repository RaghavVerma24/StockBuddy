# Use the official Node.js image as the base image
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY . .

# Command to start the React app
CMD ["npm", "run", "dev"]
