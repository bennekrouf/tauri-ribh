import SourateBox from "../../SourateBox";
import FormattedVerse from "../FormattedVerse";

const SimilarVerses = ({ verses, isOpposite }) => {
  return (
    <div style={styles.similarsContainer}>
      {verses.map(({ ungrouped_text, verse_no, chapter_no }, index) => (
        <div key={index} style={styles.similarWrapper}>
          {/* Similar Header */}
          <div style={styles.similarsHeader}>
            {/* Right column */}
            <SourateBox chapterNo={chapter_no} />

            {/* Left column */}
            <div style={styles.columnContainer}>
              <div style={styles.columnNumber}>
                <span style={styles.columnTextNumber}>{`${verse_no}:${chapter_no}`}</span>
              </div>
            </div>
          </div>

          {/* Similar Content */}
          <div style={styles.similarsContent}>
            <FormattedVerse ungroupedText={ungrouped_text} isOpposite={isOpposite} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarVerses;

const styles: { [key: string]: React.CSSProperties } = {
  similarsContainer: {
    margin: 10,
    padding: 10,
    border: '0.5px solid gray',
    borderRadius: 5,
    marginBottom: 50,
    marginRight: 20,
    marginLeft: 20,
  },
  similarWrapper: {
    marginBottom: 2,
    padding: 2,
  },
  similarsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  columnContainer: {
    width: '20%', // Set fixed width for the columns
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5,
  },
  columnNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.3px solid',
    borderRadius: 2,
    padding: '0 5px',
  },
  columnTextNumber: {
    fontSize: 12,
    lineHeight: '12px', // New Line
    textAlign: 'right',
  },
  similarsContent: {
    padding: 10,
    fontSize: 30,
    fontFamily: 'ScheherazadeNew-Regular',
    paddingBottom: 40,
  },
};
