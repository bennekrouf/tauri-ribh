import { useState, useEffect } from 'react';

import loadFromSupa from './loadFromSupa';

import { Logger } from 'mayo-logger';

import { getBestIndex } from '../utils/getBestIndex';
import { UserState } from '../models/UserState';
import { loadFromStore } from './loadFromStore';
import { writeToStore } from './writeToStore';

export const useFetchUser = <T extends UserState>(initialState: T): [T, (data: T) => Promise<any>, boolean] => {
  const [userSettings, setUserSettings] = useState<T>(initialState);
  const [isLoading, setLoading] = useState(false);
  const user= { email: "mohamed.bennekrouf@gmail.com"};

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let savedState: T | null = await loadFromStore(user.email);
        if(!savedState) {
          savedState = (await loadFromSupa() as unknown) as T;
        }
        console.log(`Saved usersettings : ${JSON.stringify(savedState)}`);

        if (savedState?.ranges?.length) {
          Logger.info('Fetching currentIndex from storage', { tag: 'Lesson' });
          savedState.currentIndex = await getBestIndex(savedState?.ranges, 'currentIndex');
          savedState.selectedChapter = await getBestIndex(savedState?.ranges, 'selectedChapter');
          await updateUserSettings({...savedState});
        } else {
          await updateUserSettings({...initialState, ok: true});
        }
      } catch (error) {
        console.error('Failed to fetch the data from storage', error);
        setUserSettings(initialState);
      } finally {
        setLoading(false);
      }
    };
    if(!user) return;
    loadData();
  }, [user]);

  const updateUserSettings = async (data: T) => {
    if (JSON.stringify(data) === JSON.stringify(userSettings)) {
      // Data is the same as current usersettings, no need to update
      return;
    }

    try {
      if (data?.ranges?.length) {
        data.currentIndex = await getBestIndex(data?.ranges, 'currentIndex');
        data.selectedChapter = await getBestIndex(data?.ranges, 'selectedChapter');
      }
      writeToStore(data);
      // syncAsyncStorageToFirestore();
      setUserSettings(data);
    } catch (error) {
      console.error('Failed to save the data to storage', error);
    }
  };

  return [userSettings, updateUserSettings, isLoading];
};
