// const response = await fetch('http://test.abjad.mayorana.ch/ping');
// const response = await fetch('http://test.abjad.mayorana.ch/knowledge-entries?level=2');
// const response = await fetch('http://test.similar.mayorana.ch/chapters?ranges=2-34');
import { useState, useEffect } from 'react';
import MainVerses from './MainVerses';
// import { Verse } from './models/Verse';
import { supabase } from "./hooks/supabaseClient";

const PingTestPage = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [stats, setStats] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://test.similar.mayorana.ch/similars/2?ranges=2-34');
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

    // fetchData();
  }, []);

  useEffect(() => {
    const fetchSupa = async () => {
      let { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("email", 'mohamed.bennekrouf@gmail.com')
      // .();
      console.log("Data : ", JSON.stringify(data));
      // console.log("Error : ", error);
      setStats(data);
    };
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