// src/lib/logger.ts
export function log(
  level: "info" | "warn" | "error",
  message: string,
  data?: any,
) {
  console.log(
    JSON.stringify({
      level,
      message,
      data,
      service: "search-service",
      timestamp: new Date().toISOString(),
    }),
  );
}
