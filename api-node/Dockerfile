FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 4002

CMD ["node", "src/index.js"]

