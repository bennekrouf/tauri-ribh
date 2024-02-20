import { Store } from "tauri-plugin-store-api";
import { useUser } from "../UserContext";

export const loadFromStore = async (defaultVal?: any): Promise<any> => {
    const userContext = useUser();
    if (!userContext) throw new Error("User context is not available");
    const { user } = userContext;
    const storageKey = `${user.email}-${user.appId}`;

    const store = new Store(".settings.json");
    await store.load();
    const value = await store.get(storageKey).catch(() => defaultVal);
    return typeof value === 'string' ? JSON.parse(value) : value;
  };
  
