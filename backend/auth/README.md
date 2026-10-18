# 🔐 OTP Authentication API (TypeScript + Express + MongoDB)

This is the **backend API** for the eCommerce project.  
It handles **user authentication via mobile OTP (One-Time Password)** using **TypeScript**, **Express**, and **MongoDB**.

---

## 🚀 Features

- ✅ Passwordless login & signup via mobile number  
- 📱 SMS verification using [sms.ir](https://sms.ir) API  
- 🔒 Secure JWT-based authentication (Access & Refresh tokens)  
- 🧾 Refresh tokens stored safely as hashed values in MongoDB  
- 🕒 OTP code and token expiration handling  
- 🧩 Modular TypeScript architecture for easy scalability  
- 🧰 Works in both Development and Production environments  

---

## 📁 Project Structure

api/
├── controllers/
│ └── authController.ts # Authentication logic (OTP, JWT)
├── services/
│ ├── tokenService.ts # Token generation & validation
│ └── smsService.ts # SMS sending via sms.ir API
├── models/
│ └── User.ts # MongoDB User schema
├── utils/
│ └── generateCode.ts # OTP code generator
├── routes/
│ └── authRoutes.ts # Auth endpoints
├── middleware/
│ └── validatePhone.ts # Mobile number validation middleware
├── lib/
│ └── db.ts # MongoDB connection handler
├── index.ts # Application entry point
└── .env # Environment configuration file

2️⃣ Create a .env file

Example configuration:

PORT=8000
MONGO_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development

CODE_EXPIRY_MINUTES=2

JWT_SECRET=my_super_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_DAYS=30

# SMS.ir Configuration
SMS_API_KEY=your_sms_ir_api_key
SMS_TEMPLATE_ID=123456

Run the Project
Development
npm run dev

Build for Production
npm run build

Run Compiled Version
npm start

🧾 API Endpoints
🔹 Send Verification Code

POST /api/auth/send-code

Request Body:

{
  "mobile": "09123456789"
}


Response:

{
  "message": "Verification code sent successfully",
  "sandbox": true,
  "debugCode": "83920"
}

🔹 Verify Code

POST /api/auth/verify-code

Request Body:

{
  "mobile": "09123456789",
  "code": "83920"
}


Response:

{
  "message": "User verified successfully",
  "accessToken": "<jwt_token>",
  "refreshToken": "<long_refresh_token>",
  "expiresIn": "15m"
}

🧱 User Model (MongoDB)
interface RefreshToken {
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface IUser {
  mobile: string;
  verified: boolean;
  code?: string;
  codeExpiresAt?: Date;
  refreshTokens?: RefreshToken[];
}

🔑 Token System

Access Token:
Short-lived token used for API authentication.

Refresh Token:
Stored securely in the database as a hash; used to generate new access tokens.

🧰 Available Scripts
Command	Description
npm run dev	Run the project with Nodemon + ts-node
npm run build	Compile TypeScript to JavaScript
npm start	Run the compiled (production) version
🧪 Quick Test with cURL
curl -X POST http://localhost:8000/api/auth/send-code \
  -H "Content-Type: application/json" \
  -d '{"mobile": "09123456789"}'


Then verify with:

curl -X POST http://localhost:8000/api/auth/verify-code \
  -H "Content-Type: application/json" \
  -d '{"mobile": "09123456789", "code": "123456"}'



S C:\WINDOWS\system32> Invoke-RestMethod -Uri "http://localhost:5000/api/auth/verify-code" `
>>   -Method POST `
>>   -ContentType "application/json" `
>>   -Body '{"mobile":"09123456789","code":"1499"}'
>> ^C
PS C:\WINDOWS\system32> Invoke-RestMethod -Uri "http://localhost:8000/api/auth/verify-code" `
>>   -Method POST `
>>   -ContentType "application/json" `
>>   -Body '{"mobile":"09123456789","code":"149924"}'
>>

message                    accessToken
-------                    -----------
User verified successfully eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTA4NWIwODNkYjgwODU2NWUyMDA4NTIiLCJtb2JpbGUiOiIwOTEyMzQ1...


🧩 Developer

👤 Daian Web
📧 info@daianweb.com

🌐 https://daianweb.com

🧾 License

MIT © 2025 Dayan Web
Free to use, modify, and distribute.

---

Would you like me to include **badges** (like “Node.js”, “Express”, “TypeScript”, “MongoDB”, “License”) at the top of this README to make it more GitHub-professional?

in the future i create 
lastUsedAt اضافه کنی
✔ deviceName parse کنی
✔ suspicious session detection