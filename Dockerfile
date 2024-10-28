FROM node:alpine

# Set working directory inside the container
WORKDIR /usr/src

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the source code into the container
COPY . .

# Start the application
CMD ["yarn", "dev"]
