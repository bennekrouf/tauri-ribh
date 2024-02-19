import {useState}  from 'react';
import SwipeableViews from 'react-swipeable-views';
import useCurrentScreen from '../hooks/useCurrentScreen';

interface ScrollableSwipablePageProps {
    selectedChapter: number;
    lesson: any;
    isLoading: boolean;
    error: any;
  }

  const Lesson: React.FC<ScrollableSwipablePageProps> = ({ selectedChapter, lesson, isLoading, error }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  useCurrentScreen();
  
  // if (isLoading) {
  //   return (
  //     <View style={styles.centeredContainer}>
  //       <Image source={require('../../../assets/mayologo.jpg')} style={styles.logo} />
  //     </View>
  //   );
  // }

  return (
    <div>
      <div style={styles.tabs}>
        {lesson?.map((content, index) => (
          <div
            key={index}
            style={{ ...styles.tab, ...(activeIndex === index && styles.activeTab) }}
            onClick={() => setActiveIndex(index)}
          >
            Tab {index + 1}
          </div>
        ))}
      </div>
      <SwipeableViews index={activeIndex} onChangeIndex={setActiveIndex}>
        {lesson?.map((content, index) => (
          <div key={index} style={styles.tabContent}>
            Content for Tab {index + 1}
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default Lesson;

const styles: { [key: string]: React.CSSProperties } = {
    tabs: {
      display: 'flex',
      overflowX: 'auto',
      borderBottom: '1px solid #ccc',
    },
    tab: {
      padding: '10px',
      cursor: 'pointer',
    },
    activeTab: {
      borderBottom: '2px solid blue',
    },
    tabContent: {
      padding: 20,
    },
  };
