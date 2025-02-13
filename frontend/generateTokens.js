import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateTokens(numTokens) {
  for (let i = 0; i < numTokens; i++) {
    const token = crypto.randomUUID(); // Generate unique token

    const { error } = await supabase.from("entry_tokens").insert([{ token }]);
    if (error) {
      console.error("Error inserting token:", error.message);
    } else {
      console.log(`Token ${token} inserted successfully.`);
    }
  }
}

generateTokens(100); // Change 100 to the number of tokens you need
