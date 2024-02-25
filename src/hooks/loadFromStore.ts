import { Store } from "tauri-plugin-store-api";
import { Logger } from 'mayo-logger';
import { useVerifiedUser } from "./useVerifiedUser";

export const loadFromStore = async (key?: string): Promise<any> => {
  const user = useVerifiedUser();
  try {
    // If a specific key is provided, use it; otherwise, use the full user key
    const storageKey = key ? `${user.email}-${user.appId}-${key}` : `${user.email}-${user.appId}`;
    Logger.info(`Loading data from store with key: ${storageKey}`, null, { tag: 'loadFromStore' });

    const store = new Store(".settings.json");
    await store.load();
    
    let value;
    if (key) {
      // Try to load specific data for the given key
      value = await store.get(storageKey).catch(() => null);
    } else {
      // Load the entire user object if no specific key is provided
      const allData = await store.get(`${user.email}-${user.appId}`).catch(() => null);
      value = allData; // Use the entire data object as the value
    }

    Logger.info(`Data loaded from store with key: ${storageKey}`, value, { tag: 'loadFromStore' });

    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch (error) {
    Logger.error(`Error loading data from store: ${error}`, error, { tag: 'loadFromStore' });
    throw error;
  }
};
