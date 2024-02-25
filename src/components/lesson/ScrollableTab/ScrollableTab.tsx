import React from 'react';

import LessonContent from './LessonContent';
import { ScrollableTabProps } from '../../../models/ScrollableTabProps';

const ScrollableTab: React.FC<ScrollableTabProps> = ({ content }) => {
  return (
    <div style={styles.view}>
      <LessonContent
        verses={content.verses}
        key="verseList"
        similars={content.similars}
        opposites={content.opposites}
      />
    </div>
  );
};

export default React.memo(ScrollableTab);

const styles: { [key: string]: React.CSSProperties } = {
  view: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.3)', // Simulate elevation with box shadow
    flex: 1,
    padding: 0,
  },
};
