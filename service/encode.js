const crypto = require("crypto");

const SECRET = process.env.SIGNATURE_SECRET;

// ─────────────────────────────────────────────
// Create deterministic signature
// ─────────────────────────────────────────────
exports.signature = async (text) => {
  if (typeof text !== "string") {
    throw new TypeError("text must be a string");
  }

  return crypto
    .createHmac("sha256", SECRET)
    .update(text, "utf8")
    .digest("base64url");
};



//bohUq2KbHj2K4NBY519pQKDI9JOyAWZrRUwGZiSgwjY
//bohUq2KbHj2K4NBY519pQKDI9JOyAWZrRUwGZiSgwjY