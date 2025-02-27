# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY /nestjs-backend/package.json /nestjs-backend/package-lock.json ./
# RUN cd /nestjs-backend
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
