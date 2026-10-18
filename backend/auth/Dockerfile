# backend/auth/Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# پورت پیش‌فرض اپ (مثلاً 8000)
EXPOSE 8000

CMD ["npm", "run", "dev"]