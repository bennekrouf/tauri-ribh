import { Logger } from 'mayo-logger';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';

export async function loadChapters(ranges: string[]) {
  try {
    const indices = getIndicesByName(ranges);
    Logger.info(`Indices: ${JSON.stringify(indices)}`, null, { tag: 'loadChapters' });

    const chapterRanges = convertIndicesToRanges(indices);
    Logger.info(`Chapter Ranges: ${JSON.stringify(chapterRanges)}`, null, { tag: 'loadChapters' });

    const url = `https://test.similar.mayorana.ch/chapters?ranges=${chapterRanges.join(',')}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }

    const sourates = await response.json();
    Logger.info(`Successfully fetched and/or retrieved sourate data from cache/API.`, null, { tag: 'loadChapters' });

    return sourates.filter((c:any) => c);
  } catch (error) {
    Logger.error(`Issue accessing or processing API data.`, error, { tag: 'loadChapters' });
    throw error;
  }
}
