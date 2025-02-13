import QRCode from "qrcode";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateQRCode(token) {
  const url = `http://localhost:5173/enter?token=${token}`;

  if (!fs.existsSync("qrcodes")) {
    fs.mkdirSync("qrcodes");
  }

  try {
    await QRCode.toFile(`qrcodes/${token}.png`, url);
    console.log(`QR Code generated for token: ${token}`);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

async function generateAllQRCodes() {
  const { data: tokens, error } = await supabase
    .from("entry_tokens")
    .select("token");

  if (error) {
    console.error("Error fetching tokens:", error.message);
    return;
  }

  for (const entry of tokens) {
    await generateQRCode(entry.token);
  }

  console.log("All QR codes generated successfully!");
}

generateAllQRCodes();
