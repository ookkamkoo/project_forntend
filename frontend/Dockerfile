# Use an official Node.js runtime as a parent image
FROM node:20.11-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY frontend .

# Build the Nuxt.js application
RUN npm run build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built application from the build stage
COPY --from=build /usr/src/app .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run","start"]


# # local
# FROM node:20.11-alpine as build

# # Create app directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json files
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Bundle app source
# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "start"]


# # push
# FROM node:20.11-alpine as build

# # Create app directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json files
# COPY frontend/package*.json ./

# # Install app dependencies
# RUN npm install

# # Bundle app source
# COPY frontend .

# EXPOSE 8080
# CMD ["npm", "run", "start"]