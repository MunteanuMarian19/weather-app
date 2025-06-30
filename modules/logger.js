import { CONFIG } from "./config.js";

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

export class Logger {
  constructor() {
    this.logs = [];
    // Determine numeric threshold once
    this.enabled = CONFIG.LOGGING.ENABLED;
    this.threshold = LEVELS[CONFIG.LOGGING.LEVEL] ?? LEVELS.info;
    this.maxLogs = CONFIG.LOGGING.MAX_LOGS;
  }

  debug(message, data = null) {
    this._log("debug", message, data);
  }

  info(message, data = null) {
    this._log("info", message, data);
  }

  warn(message, data = null) {
    this._log("warn", message, data);
  }

  error(message, error = null) {
    this._log("error", message, error);
  }

  _log(level, message, data) {
    if (!this.enabled) return;
    const lvl = LEVELS[level];
    if (lvl < this.threshold) return;

    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      data,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  getLogs() {
    // return a copy so callers can’t mutate internal array
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(asJson = true) {
    if (asJson) {
      try {
        return JSON.stringify(this.logs, null, 2);
      } catch {
        // fallback to stringifying each entry shallowly
        return this.logs
          .map(
            (e) =>
              `[${e.timestamp}] [${e.level}] ${e.message} ${String(e.data)}`
          )
          .join("\n");
      }
    } else {
      // Plain-text fallback
      return this.logs
        .map(
          (e) => `[${e.timestamp}] [${e.level}] ${e.message} ${String(e.data)}`
        )
        .join("\n");
    }
  }
}

// singleton
export const logger = new Logger();
