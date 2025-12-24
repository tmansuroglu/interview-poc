export const COOKIE_NAME = "next-auth.session-token";

const secretKey = process.env.SESSION_SECRET;

export const encodedKey = new TextEncoder().encode(secretKey);
