import { Logger } from 'mayo-logger';
import { loadFromStore } from '../hooks/loadFromStore';
import loadFromSupa from '../hooks/loadFromSupa';

export const currentStorage = async () => {
    try {
        let current = await loadFromStore();
        
        if(!current) {
            Logger.info('currentStorage: No data in store, loading from Firebase.');
            current = await loadFromSupa();
        }

        return current || {};       
    } catch (error) {
        Logger.error('currentStorage Error:', error);
        throw error;        
    }
};
