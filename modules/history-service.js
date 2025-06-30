import { CONFIG } from "./config.js";
import { logger } from "./logger.js"; // optional, if you have logger

export class HistoryService {
  constructor() {
    this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY;
    this.maxItems = CONFIG.MAX_HISTORY_ITEMS;
  }

  addLocation(weatherData) {
    const {
      name: city,
      sys: { country },
      coord: { lat, lon },
    } = weatherData;
    const timestamp = Date.now();

    const newEntry = { city, country, timestamp, coordinates: { lat, lon } };

    // 1) Load existing history
    const history = this._loadFromStorage();

    // 2) Dedupe: find existing index
    const idx = history.findIndex(
      (item) => item.city.toLowerCase() === city.toLowerCase()
    );

    if (idx !== -1) {
      // move existing to front
      const [existing] = history.splice(idx, 1);
      history.unshift(existing);
      logger?.info("History: moved existing entry to top", { city });
    } else {
      // add new at front
      history.unshift(newEntry);
      logger?.info("History: added new entry", newEntry);
    }

    // 3) Enforce maxItems
    if (history.length > this.maxItems) {
      history.splice(this.maxItems);
      logger?.debug(`History trimmed to max ${this.maxItems} items`);
    }

    // 4) Persist
    this._saveToStorage(history);
  }

  getHistory() {
    return this._loadFromStorage();
  }

  removeLocation(city) {
    const history = this._loadFromStorage();
    const filtered = history.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    );
    this._saveToStorage(filtered);
    logger?.info("History: removed entry", { city });
  }

  clearHistory() {
    try {
      localStorage.removeItem(this.storageKey);
      logger?.info("History: cleared all entries");
    } catch (err) {
      logger?.error("Failed to clear history", err);
    }
  }

  // ——— Internal: read & write ———

  _loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      logger?.error("Failed to parse history JSON, resetting", err);
      return [];
    }
  }

  _saveToStorage(historyArray) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(historyArray));
    } catch (err) {
      // likely QUOTA_EXCEEDED_ERR
      logger?.error("Failed to save history to localStorage", err);
    }
  }
}

// Export singleton
export const historyService = new HistoryService();
