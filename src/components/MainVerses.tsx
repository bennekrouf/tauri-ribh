import React from 'react';
import FormattedVerse from './FormattedVerse';
import { VerseListProps } from '../models/VerseListProps';

const MainVerses: React.FC<VerseListProps> = ({verses}) => (
    <div style={styles.versesContainer}>
    {verses.map(({ ungrouped_text, verse_no }, index) => (
      <div key={index} style={styles.card}>
        <div style={styles.cardContent}>
          <FormattedVerse isOpposite={false} ungroupedText={ungrouped_text} />
          <div style={styles.ayahContainer}>
            <span style={styles.ayahText}>[{verse_no}]</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
    card: {
    width: '100%', // Set the card width to almost full screen width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the card
    backgroundColor: 'white',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)', // Similar to elevation in React Native
  },
  cardContent: {
    padding: '10px',
  },
  ayahText: {
    fontSize: '12px',
    lineHeight: '20px',
  },
  ayahContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  versesContainer: {
    margin: '10px',
    padding: '10px',
  },
};

export default MainVerses;
