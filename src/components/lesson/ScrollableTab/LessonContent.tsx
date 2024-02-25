import { Verse } from '../../../models/Verse';
import MainVerses from './MainVerses';
import SimilarVerses from './SimilarVerses';

interface LessonContentProps {
  verses: Verse[],
  similars: Verse[],
  opposites: Verse[]
}

const LessonContent: React.FC<LessonContentProps> = ({ verses, similars, opposites }) => (
  <div style={styles.container}>
    {verses.length > 0 && (
      <MainVerses key="mainVerses" verses={verses} isOpposite={false} />
    )}
    {similars.length > 0 && (
      <SimilarVerses key="similars" verses={similars} isOpposite={!opposites.length} />
    )}
    {opposites.length > 0 && (
      <SimilarVerses key="opposites" verses={opposites} isOpposite={true} />
    )}
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flexGrow: 1,
    width: '100%',
  },
};

export default LessonContent;
