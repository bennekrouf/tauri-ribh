import { Store } from "tauri-plugin-store-api";
import { useVerifiedUser } from "./useVerifiedUser";

export const flushStorage = async (): Promise<void> => {
    const user = useVerifiedUser();
    const store = new Store(".settings.json");
    await store.load();

    // Iterate over all keys in the store
    const keys = await store.keys();
    for (const key of keys) {
        // Check if the key belongs to the current user
        if (key.startsWith(`${user.email}-${user.appId}-`)) {
            // Remove the key from the store
            await store.delete(key);
        }
    }

    // Save the changes
    await store.save();
};
