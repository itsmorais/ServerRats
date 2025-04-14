import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// Simular __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      const logDirectory = path.join(__dirname, "../../logs");

      Logger.instance = winston.createLogger({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            ),
          }),
          new winston.transports.File({
            filename: path.join(logDirectory, "error.log"),
            level: "error",
          }),
          new winston.transports.File({
            filename: path.join(logDirectory, "warn.log"),
            level: "warn",
          }),
          new winston.transports.File({
            filename: path.join(logDirectory, "info.log"),
            level: "info",
          }),
        ],
      });
    }

    return Logger.instance;
  }
}

export default Logger.getInstance();
