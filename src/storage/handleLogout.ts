import { Logger } from 'mayo-logger';
import { supabase } from "../hooks/supabaseClient";
import { syncStorage } from './syncStorage';
import { flushStorage } from '../hooks/flushStorage';
export const handleLogout = async () => {
    try {
      Logger.info('Initiating logout sequence...', null, { tag: 'HomeScreen:handleLogout' });
  
      Logger.info('Synchronizing store to Firestore...', null, { tag: 'HomeScreen:handleLogout' });
      await syncStorage();
  
      Logger.info('Flushing data from store...', null, { tag: 'HomeScreen:handleLogout' });
      await flushStorage();
  
      Logger.info('Performing logout...', null, { tag: 'HomeScreen:handleLogout' });
      supabase.auth.signOut();
    } catch (error) {
      Logger.error('Error during logout.', error, { tag: 'HomeScreen:handleLogout' });
    }
  }