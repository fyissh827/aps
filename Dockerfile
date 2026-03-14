# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production --legacy-peer-deps

# Copy project files
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Copy built app
COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]