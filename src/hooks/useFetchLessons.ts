import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';
import { useFetchUser } from './useFetchUser';
import { loadLessons } from '../api/loadLessons';
import { RootStackParamList } from '../models/RootStackParamList';
import { initialState } from '../models/UserState';
import { useVerifiedUser } from './useVerifiedUser';
import { LessonListProps } from '../models/LessonListProps';

const useFetchLessons = (selectedChapter: number) => {
  const [lesson, setLesson] = useState<LessonListProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RootStackParamList["ErrorScreen"] | null>(null);
  const [userState, setUserState, loading] = useFetchUser(initialState);
  const user = useVerifiedUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedChapter || !user || !userState) {
          // Exit early if selectedChapter or user is not set
          return;
        }
        setIsLoading(true);
        Logger.info('Fetching lessons', { selectedChapter }, { tag: 'LessonsFetch' });

        const lessons: LessonListProps[] = await loadLessons(selectedChapter, userState?.ranges);
        setLesson(lessons);

        // Log lessons (Statements) with missing verses if needed
        lessons.forEach((lesson: LessonListProps) => {
          if (!lesson.verses) {
            Logger.warn('Lesson without verse', { lessonKalima: lesson.kalima }, { tag: 'LessonsFetch' });
          }
        });

      } catch (err) {
        const errorMessage = 'Error occurred during lessons fetching.';
        setError({ errorMessage });
        Logger.error(errorMessage, err, { tag: 'LessonsFetch' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedChapter, user, userState]);

  return { lesson, isLoading, error };
};

export default useFetchLessons;
