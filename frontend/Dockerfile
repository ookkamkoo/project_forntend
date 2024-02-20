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


# push
FROM node:20.11-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY frontend/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY frontend .

EXPOSE 8080
CMD ["npm", "run", "start"]