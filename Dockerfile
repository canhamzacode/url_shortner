# Use a Node.js 20.18.0 base image
FROM node:20.18.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the source code into the container
COPY src /app/src

# Expose the port that the app will run on
EXPOSE 8000

# Start the application
CMD ["yarn", "dev"]
