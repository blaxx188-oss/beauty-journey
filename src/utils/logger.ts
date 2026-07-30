/**
 * Logger Utility — Centralized logging architecture for the Beauty Journey platform.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  context?: string;
}

const IS_DEV = process.env.NODE_ENV === "development";

class Logger {
  private static instance: Logger;
  private context: string = "App";

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setContext(context: string): void {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      context: this.context,
    };
  }

  private print(entry: LogEntry): void {
    if (!IS_DEV && entry.level === "debug") return;

    const styles = {
      info: "color: #3b82f6; font-weight: bold;",
      warn: "color: #f59e0b; font-weight: bold;",
      error: "color: #ef4444; font-weight: bold;",
      debug: "color: #6b7280; font-weight: bold;",
    };

    const consoleMethod = entry.level === "debug" ? "log" : entry.level;
    
    console[consoleMethod](
      `%c[${entry.level.toUpperCase()}] %c[${entry.context}] %c${entry.message}`,
      styles[entry.level],
      "color: inherit; font-weight: bold;",
      "color: inherit; font-weight: normal;",
      entry.data || ""
    );

    // In production, you would send errors to a service like Sentry or LogRocket
    if (!IS_DEV && entry.level === "error") {
      this.sendToRemote(entry);
    }
  }

  private async sendToRemote(entry: LogEntry): Promise<void> {
    // Placeholder for remote logging service integration
    // try {
    //   await fetch('/api/logs', { method: 'POST', body: JSON.stringify(entry) });
    // } catch (e) {}
  }

  public info(message: string, data?: any): void {
    this.print(this.formatMessage("info", message, data));
  }

  public warn(message: string, data?: any): void {
    this.print(this.formatMessage("warn", message, data));
  }

  public error(message: string, data?: any): void {
    this.print(this.formatMessage("error", message, data));
  }

  public debug(message: string, data?: any): void {
    this.print(this.formatMessage("debug", message, data));
  }
}

export const logger = Logger.getInstance();
export default logger;
