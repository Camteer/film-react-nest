FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm i

COPY . .

RUN npm run build