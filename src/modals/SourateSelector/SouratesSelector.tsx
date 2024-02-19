import React from 'react';
import SourateBox from '../../components/SourateBox';
import './SouratesSelector.css';
import { Sourate } from '../../models/Sourate';

interface SouratesSelectorProps {
  handleLabelPress: (sourate: {no: number | undefined}) => Promise<void>;
  sourates: Sourate[];
}

const SouratesSelector: React.FC<SouratesSelectorProps> = ({handleLabelPress, sourates,}) => (
  <div className="scroll-view">
    <div className="container">
      {sourates?.map((sourate, index) => (
        <button
          key={index}
          className="touchable-opacity"
          onClick={() => handleLabelPress(sourate)}
        >
          <SourateBox chapterNo={sourate.no} count_ayat={sourate.count_ayat} />
        </button>
      ))}
    </div>
  </div>
);

export default SouratesSelector;
