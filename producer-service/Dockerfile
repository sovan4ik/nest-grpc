FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY ../proto ./proto

RUN npm run build

EXPOSE 50051 3000
CMD ["node", "dist/main.js"]

 