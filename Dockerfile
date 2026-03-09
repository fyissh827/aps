# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --production --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Copy node_modules and app from builder
COPY --from=builder /app /app

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]