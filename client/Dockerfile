# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies in the container
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Build the app for production
RUN npm run build

# Use an Nginx image to serve the app
FROM nginx:1.21.3-alpine

# Copy the build output from the previous stage to the Nginx image
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 in the container
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
