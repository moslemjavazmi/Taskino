# backend/User/Dockerfile.dev
FROM node:20-alpine
WORKDIR /app

# کپی package.json اول برای استفاده از کش
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8100

# توجه: از CMD استفاده کنید نه ENTRYPOINT
CMD ["npm", "run", "dev"]