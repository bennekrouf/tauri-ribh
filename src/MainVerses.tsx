import FormattedVerse from './FormattedVerse';
import { LessonListProps } from './models/LessonListProps';
import { Verse } from './models/Verse';

interface LessonList {
  lessonLists: LessonListProps[];
}

const MainVerses: React.FC<LessonList> = ({ lessonLists }) => {
  console.log("Kalima passed :", Object.keys(lessonLists[0]));
  return (
    <div>
      {lessonLists.map((lessonList:LessonListProps, lessonListIndex:number) => (
        <div key={lessonListIndex}>
          <h2 style={styles.headerStyle}>{lessonList.kalima}</h2>
          <div style={styles.versesContainer}>
            {lessonList.verses?.map((verse: Verse, index: number) => (
              <div key={index} style={styles.card}>
                <FormattedVerse isOpposite={false} ungroupedText={verse.ungrouped_text} />
                <div style={styles.ayahContainer}>
                  <span style={styles.ayahText}>[{verse.verse_no}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
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
