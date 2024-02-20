# Build stage
FROM node:20.11-alpine as build

# Set the working directory for the build stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY frontend/package*.json ./

# Install app dependencies
RUN npm install

# Build the Nuxt.js application
RUN npm run build

# Production stage
FROM node:20.11-alpine as production

# Set the working directory for the production stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY frontend/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the build stage
COPY --from=build /usr/src/app .

# Expose port 3000
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start"]