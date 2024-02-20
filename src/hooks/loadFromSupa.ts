import { supabase } from "./supabaseClient";
import { useUser } from "../UserContext";

async function loadFromSupa() {
    const userContext = useUser();
    if (!userContext) throw new Error("User context is not available");
    const { user } = userContext;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', user.email);

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        return null; // Return null or an appropriate error message
    }
}

export default loadFromSupa;
