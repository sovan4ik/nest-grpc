FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY ../proto ./proto

RUN npm run build

ENV PRODUCER_URL=producer:50051
CMD ["node", "dist/main.js"]
