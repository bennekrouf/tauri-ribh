import { createClient } from "@supabase/supabase-js";

import * as config from '../supabaseConfig.json';
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: "Tafsil",
    storage: window.localStorage,
    flowType: "pkce",
  },
});
