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
import { LessonListProps } from './models/LessonListProps';
// import SwipeableViews from 'react-swipeable-views';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const PingTestPage = () => {
  const [data, setData] = useState<LessonListProps[] | null>(null);
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
        const jsonData: LessonListProps[] = await response.json();
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
    // fetchSupa();
  }, []);

  // return (
  //   <div>
  //     {data ? (
  //       <MainVerses lessonLists={data} />
  //       ) : (
  //       <h2>Loading...</h2>
  //     )}
  //   </div>
  // );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChangeIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
    >
      <Slider>
        <Slide index={0}>I am the first Slide.</Slide>
        <Slide index={1}>I am the second Slide.</Slide>
        <Slide index={2}>I am the third Slide.</Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default PingTestPage;