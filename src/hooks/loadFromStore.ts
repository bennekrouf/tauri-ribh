import { Store } from "tauri-plugin-store-api";
import { UserContextType } from "../UserContext";
import { Logger } from 'mayo-logger';

export const loadFromStore = async (user: UserContextType['user'], defaultVal?: any): Promise<any> => {
  try {
    const storageKey = `${user.email}-${user.appId}`;
    Logger.info(`Loading data from store with key: ${storageKey}`, null, { tag: 'loadFromStore' });

    const store = new Store(".settings.json");
    await store.load();
    
    const value = await store.get(storageKey).catch(() => defaultVal);
    Logger.info(`Data loaded from store with key: ${storageKey}`, value, { tag: 'loadFromStore' });

    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch (error) {
    Logger.error(`Error loading data from store: ${error}`, error, { tag: 'loadFromStore' });
    throw error;
  }
};
