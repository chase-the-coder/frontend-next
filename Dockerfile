# Use an official node runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app


ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .  

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]