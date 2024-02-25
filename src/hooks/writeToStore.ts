import { Store } from "tauri-plugin-store-api";
import { useVerifiedUser } from "./useVerifiedUser";

export const writeToStore = async (key: string, value: any): Promise<void> => {
    const user = useVerifiedUser();

    // Construct a unique storage key based on the user and the provided key
    const storageKey = `${user.email}-${user.appId}-${key}`;
    const store = new Store(".settings.json");
    await store.load();
    const stringValue = JSON.stringify(value); // Convert value to a JSON string
    await store.set(storageKey, stringValue);
    await store.save();
};