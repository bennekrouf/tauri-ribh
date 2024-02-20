import { supabase } from './hooks/supabaseClient';

interface User {
  email: string;
  data: number;
}

export async function insertDataIntoSupabase(data: User): Promise<void> {
  try {
    const { data: insertData, error } = await supabase
      .from('example_table')
      .insert([data]);

    if (error) {
      console.error('Error inserting data:', error.message);
      throw error;
    }

    console.log('Data inserted successfully:', insertData);
  } catch (error) {
    console.error('Insertion failed:', error);
  }
}

// Usage example
const exampleData: User = {
  email: 'mb@mayorana.ch',
  data: 100
};

insertDataIntoSupabase(exampleData)
  .then(() => console.log('Data insertion successful'))
  .catch((error) => console.error('Data insertion failed', error));
