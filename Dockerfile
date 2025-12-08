# ============================================
# Stage 1: Build the React application
# ============================================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy all source files including .env.production
COPY . .

# Build the application for production
# Vite will read .env.production automatically
RUN npm run build:prod

# ============================================
# Stage 2: Serve with Nginx
# ============================================
FROM nginx:alpine AS production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
