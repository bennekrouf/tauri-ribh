import { Logger } from 'mayo-logger';
import { loadFromStore } from '../hooks/loadFromStore';
import { writeToStore } from '../hooks/writeToStore';
import { insertDataIntoSupabase } from '../insertData';

const LAST_SYNC_DATE_KEY = 'LAST_SYNC_DATE';

const FORCE_SYNC = process.env.FORCE_SYNC === 'true';

export const syncStorage = async () => {
    try {
        const answerStats = await loadFromStore('stats');
        Logger.info(`Attempting to write to store with data: ${JSON.stringify(answerStats)}`);
        // await writeToStore('stats', {answerStats});

        const lastSyncDate = await loadFromStore(LAST_SYNC_DATE_KEY);
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format 'YYYY-MM-DD'

        if (lastSyncDate !== currentDate || FORCE_SYNC) {
            Logger.info("Synchronizing store data to supa...");
            await insertDataIntoSupabase(answerStats);
            
            // Update the last sync date in store
            await writeToStore(LAST_SYNC_DATE_KEY, currentDate);
        } else {
            Logger.info("Skipping Firestore synchronization since it already happened today.");
        }
    } catch (error) {
        Logger.error("Error in syncStorage function:", error);
        throw error;
    }
};
