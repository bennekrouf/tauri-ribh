import { UngroupedText } from "./models/UngroupedText";

interface FormattedVerseProps {
  ungroupedText: UngroupedText;
  isOpposite: boolean;
}


const FormattedVerse: React.FC<FormattedVerseProps> = ({ ungroupedText, isOpposite }) => {
  console.log("ungroupedText :", ungroupedText);
    const discriminantStyle = isOpposite ? "differentTextWrong" : "differentTextRight";
  
    return (
      <div style={styles.verseStyle}>
        {/* {ungroupedText?.pre} */}
        <span style={styles[discriminantStyle]}>
          {/* {ungroupedText.discriminant} */}
        </span>
        {/* {ungroupedText.post} */}
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
  