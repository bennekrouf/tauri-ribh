// import Text from 'react';
import FormattedVerse from './FormattedVerse';
import { Verse } from './models/Verse';

interface MainVersesProps {
  similars: any[];
  kalima: string;
}

const MainVerses: React.FC<MainVersesProps> = ({ similars, kalima }) => {
  console.log("Kalima passed :", JSON.stringify(similars));
  return (
    <div style={styles.versesContainer}>
      <h2 style={styles.headerStyle}>{kalima}</h2>
        {similars?.map((similar:any, index:number) => ( 
          <div key={index} style={styles.card}>
            <FormattedVerse isOpposite={false} ungroupedText={similar} />
            <div style={styles.ayahContainer}>
              <span style={styles.ayahText}>[{similar.verse_no}]</span>
            </div>
          </div>
        ))}
    </div>
  )
};

const styles: { [key: string]: React.CSSProperties } = {
  headerStyle: {
    textAlign: 'center', 
    marginBottom: '20px',
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: '10px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  ayahText: {
    fontSize: '12px',
  },
  ayahContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  versesContainer: {
    margin: '10px',
    padding: '10px',
  },
};

export default MainVerses;
