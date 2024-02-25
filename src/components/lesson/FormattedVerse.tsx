import React from 'react';
import { UngroupedText } from '../../models/UngroupedText';

function FormattedVerse({ ungroupedText, isOpposite }: {ungroupedText: UngroupedText, isOpposite: boolean}) {
  const discriminantStyle = isOpposite ? styles.differentTextWrong : styles.differentTextRight;
  console.log("FormattedVerse ungroupedText :", ungroupedText);
  
  return (
    <div style={styles.verseStyle}>
      <span>{ungroupedText?.pre}</span>
      <span style={discriminantStyle}>{ungroupedText?.discriminant}</span>
      <span>{ungroupedText?.post}</span>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
    commonText: {
    color: 'blue',
  },
  differentTextRight: {
    color: '#0dc40d',
    fontWeight: 'bold',
  },
  differentTextWrong: {
    color: 'red',
  },
  verseStyle: {
    fontSize: '20px',
    fontFamily: 'ScheherazadeNew-Regular',
    textAlign: 'right',
  },
};

export default FormattedVerse;
