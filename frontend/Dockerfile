FROM node:20-alpine AS builder

WORKDIR /frontend

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
