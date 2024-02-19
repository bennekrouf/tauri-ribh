import { useChapters } from '../hooks/useFetchSourates';
import './SourateBox.css'; // Assuming styles are moved to this CSS file
import { Sourate } from '../models/Sourate';

const sourateColor = (chapterNo: number, sourates: Sourate[]) => sourates?.find(c => c.no === chapterNo)?.background_color
const sourateName = (chapterNo:number, sourates: Sourate[]) => sourates?.find(c => c.no === chapterNo)?.sourate

const SourateBox: React.FC<{
    chapterNo: number,
    count_ayat?: number, 
    additionalStyles?: object;
  }> = ({ chapterNo, count_ayat, additionalStyles }) => {
  const { sourates, isSourateLoading } = useChapters();

  if (isSourateLoading) {
    return null; // or a loading indicator
  }

  return (
    <div
      className="columnContainer leftColumn"
      style={{ backgroundColor: sourateColor(chapterNo, sourates), ...additionalStyles }}
    >
      <div className="column" style={{ backgroundColor: 'black' }}>
        <span className="columnText">
          {sourateName(chapterNo, sourates)}
          {count_ayat !== undefined ? ` (${count_ayat})` : ''}
        </span>
      </div>
    </div>
  );
};

export default SourateBox;
