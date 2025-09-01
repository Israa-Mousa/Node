import express from "express";
import "dotenv/config";

const app = express();

// لتقدر تقرأ JSON من body الطلبات
app.use(express.json());

// نقطة اختبار GET
app.get("/", (_req, res) => {
  res.json({ ok: true, message: "Express + TS server is running 🎉" });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
