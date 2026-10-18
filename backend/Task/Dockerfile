# backend/task-service/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 8006

CMD ["node", "dist/index.js"]
