# ----------------- serve ----------------------
# Use Node.js Alpine image as the base image for the build stage
FROM node:20.11-alpine as build
# Set the working directory inside the container
WORKDIR /usr/src/app
    # Copy package.json and package-lock.json files to the working directory
    COPY frontend/package*.json ./
# Install app dependencies
RUN npm install
# Copy the rest of your application code into the container's working directory
COPY frontend .
# Build the Nuxt.js application
RUN npm run build
# Stage for serving the built application
FROM node:20.11-alpine
# Set the working directory
WORKDIR /usr/src/app
# Copy the built application from the build stage
COPY --from=build /usr/src/app .
# Expose the port your app runs on
EXPOSE 3000
# Define the command to run your app
CMD ["npm", "run", "start"]