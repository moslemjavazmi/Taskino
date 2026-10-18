
// user/services/smsService.ts

import fetch from "node-fetch";

export const sendVerificationSMS = async (mobile: string, code: string) => {
  // 🧪 DEV MODE
  if (process.env.NODE_ENV !== "production") {
    console.log("📱 [DEV SMS]", { mobile, code });
    return;
  }

  const apiKey = process.env.SMS_API_KEY;
  const templateId = process.env.SMS_TEMPLATE_ID;

  // ✅ Runtime validation (بسیار مهم)
  if (!apiKey || !templateId) {
    throw new Error("SMS service env variables are not set");
  }

  await fetch("https://api.sms.ir/v1/send/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey, // ✅ حالا قطعاً string است
    },
    body: JSON.stringify({
      mobile,
      templateId: Number(templateId),
      parameters: [{ name: "Code", value: code }],
    }),
  });
};
