import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { useFetchUser } from '../../hooks/useFetchUser';
import { initialState } from '../../models/UserState';
import useCurrentScreen from '../../hooks/useCurrentScreen';

// Import your logo image
import mayologo from '../../../assets/mayologo.jpg';
import ScrollableTab from './ScrollableTab/ScrollableTab';

interface ScrollableSwipablePageProps {
  selectedChapter: number;
  lesson?: any[];
  isLoading: boolean;
  error: any;
}

import { useEffect, useState } from 'react';

const Lesson: React.FC<ScrollableSwipablePageProps> = ({
  selectedChapter,
  lesson,
  isLoading,
}) => {
  useCurrentScreen();
  const [userState, setUserState] = useFetchUser(initialState);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!selectedChapter) return;
    setUserState({ ...userState, selectedChapter, currentIndex: currentSlide });
  }, [currentSlide]); // Effect reacts to currentSlide changes

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index); // Update currentSlide state
  };

  if (isLoading) {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={1}
        visibleSlides={1}
        infinite={false}
        dragEnabled={false}
        isIntrinsicHeight
      >
        <Slider>
          <Slide index={0}>
            <img src={mayologo} alt="Mayo Logo" style={styles.logo} />
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={lesson?.length | 0}
      visibleSlides={1}
      infinite
      dragEnabled={false}
      isIntrinsicHeight
    >
      <Slider>
        {lesson?.map((content: any, index: number) => (
          <Slide index={index} key={index} onClick={() => handleSlideChange(index)}>
            <ScrollableTab content={content} />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};

export default Lesson;

const styles: { [key: string]: React.CSSProperties } = {
  logo: {
    width: '100%', // Adjust according to your logo size requirements
    height: 'auto', // Ensures aspect ratio is maintained
  },
};

