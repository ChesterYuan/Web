FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Use tini as init process to handle signals properly
RUN apk add --no-cache tini

CMD ["node", "server.js"]
