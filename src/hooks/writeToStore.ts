import { Store } from "tauri-plugin-store-api";
import { useUser } from "../UserContext";

export const writeToStore = async (value: Object): Promise<void> => {
    const userContext = useUser();
    if (!userContext) throw new Error("User context is not available");
    const { user } = userContext; // Now safe to destructure

    const storageKey = `${user.email}-${user.appId}`;
    const store = new Store(".settings.json");
    await store.load();
    const stringValue = JSON.stringify(value); // Convert object to string
    await store.set(storageKey, stringValue);
    await store.save();
};
