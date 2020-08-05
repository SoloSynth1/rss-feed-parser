FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/keys/service_account.json

CMD [ "node", "index.js" ]