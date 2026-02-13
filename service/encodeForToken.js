const crypto = require("crypto");

const algorithm = "aes-256-cbc";



const secretKey = crypto
  .createHash("sha256")
  .update(String(process.env.SIGNATURE_SECRET))
  .digest("base64")
  .substr(0, 32);

// Encode (Encrypt)
function encode(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

// Decode (Decrypt)
function decode(encryptedText) {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encrypted = parts[1];

  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// Export both
exports.encode = encode;
exports.decode = decode;
