# backend/Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Copy production env into container
COPY .env.production .env

EXPOSE 4000
CMD ["node", "src/server.js"]

