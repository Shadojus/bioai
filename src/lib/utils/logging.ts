// src/lib/utils/logging.ts

/**
 * Log informational messages to the console
 * @param message - The message to log
 * @param data - Additional data for context
 */
export function logInfo(message: string, data?: any) {
  console.log(`[INFO] ${message}`, data || "");
}

/**
 * Log error messages to the console
 * @param message - The error message to log
 * @param error - Additional error context
 */
export function logError(message: string, error?: any) {
  console.error(`[ERROR] ${message}`, error || "");
}

/**
 * Log warning messages to the console
 * @param message - The warning message to log
 * @param data - Additional warning context
 */
export function logWarning(message: string, data?: any) {
  console.warn(`[WARNING] ${message}`, data || "");
}
