import { Logger } from 'mayo-logger'; 
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';
import { checkAndRemoveOldData } from './checkAndRemoveOldData';
import { LessonListProps } from '../models/LessonListProps';

export async function loadLessons(chapterNo = 59, ranges: string[]) : Promise<LessonListProps[]|any>{
  checkAndRemoveOldData();
  try {
    const indices = getIndicesByName(ranges);
    let lessons: any[];



    const url = `${process.env.DOMAIN}/similars/${chapterNo}?ranges=${convertIndicesToRanges(indices)}`;
    // const url = `https://test.similar.mayorana.ch/similars/${chapterNo}?ranges=${convertIndicesToRanges(indices)}`;
    // lessons = await fetch(url);
    const response = await fetch(url);
    lessons = await response.json();

    if (lessons) {
      Logger.info(`Successfully fetched and/or retrieved lesson data from cache/API.`, { chapterNo }, { tag: 'loadLessons' });
      return lessons.filter(s => s);
    } else {
      throw new Error('No lessons data available.');
    }

  } catch (error) {
    const errorMessage = `Lesson API call failed for sourate ${chapterNo} using endpoint: ${Config.DOMAIN}/similars/${chapterNo}`;
    Logger.error(errorMessage, error, { tag: 'loadLessons' });
    Logger.info(`Ensure you've set the correct environment file or try running 'yarn dev' or 'ENVFILE=.env.local yarn ios' or 'android'`, null, { tag: 'loadLessons' });

    return error;
  }
}
