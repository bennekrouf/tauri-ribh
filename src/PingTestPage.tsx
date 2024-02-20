// const response = await fetch('http://test.abjad.mayorana.ch/ping');
// const response = await fetch('http://test.abjad.mayorana.ch/knowledge-entries?level=2');
// const response = await fetch('http://test.similar.mayorana.ch/chapters?ranges=2-34');
import { useState, useEffect } from 'react';
import MainVerses from './MainVerses';
// import { Verse } from './models/Verse';
// import { supabase } from "./hooks/supabaseClient";
import { useUser } from './UserContext';
import { loadFromStore } from './hooks/loadFromStore';
import loadFromSupa from './hooks/loadFromSupa';

const PingTestPage = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [stats, setStats] = useState<any[] | null>(null);

  const userContext = useUser();
  if (!userContext) throw new Error("User context is not available");
  const { user } = userContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://test.similar.mayorana.ch/similars/90?ranges=90-114');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: any[] = await response.json();
        // console.log('Ping response:', JSON.stringify(jsonData));
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching ping:', error);
      }
    };

    if(user) fetchData();
  }, []);

  useEffect(() => {
    const fetchSupa = async () => {
      // const data1 = await loadFromStore(user);
      const data2 = await loadFromSupa(user);

      // console.log("Data Store: ", JSON.stringify(data1));
      console.log("Data Supa: ", JSON.stringify(data2));
      // console.log("Error : ", error);
      setStats(data2);
    1};
    // if(!stats?.length) fetchSupa();
    fetchSupa();
  }, []);

  return (
    <div>
      {data ? (
        <MainVerses similars={data} kalima={data[0]?.kalima} />
        ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default PingTestPage;