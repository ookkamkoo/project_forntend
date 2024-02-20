FROM node:20.11-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]