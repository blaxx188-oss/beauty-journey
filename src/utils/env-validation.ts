/**
 * Environment Validation — Ensures all required environment variables are present.
 */

import { logger } from "./logger";

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_APP_URL",
  "PAYMOB_API_KEY",
  "PAYMOB_HMAC_SECRET",
  "PAYMOB_INTEGRATION_ID",
  "PAYMOB_IFRAME_ID",
] as const;

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter(
    (envVar) => !process.env[envVar]
  );

  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables: ${missing.join(", ")}`;
    
    if (process.env.NODE_ENV === "production") {
      logger.error(errorMsg);
      // In production, we might want to throw an error to prevent the app from starting
      // throw new Error(errorMsg);
    } else {
      logger.warn(errorMsg);
    }
    return false;
  }

  logger.info("Environment variables validated successfully.");
  return true;
}
