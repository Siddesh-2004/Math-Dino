import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersisted(key, initial) {
  const [val, setVal] = useState(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(key).then(s => {
      if (s != null) setVal(JSON.parse(s));
      setLoaded(true);
    });
  }, [key]);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(key, JSON.stringify(val));
  }, [val, loaded, key]);

  return [val, setVal];
}