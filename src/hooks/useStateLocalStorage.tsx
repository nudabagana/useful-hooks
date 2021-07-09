import * as React from 'react';
import { useState } from 'react';

function useStateWithLocalStorage<T = any>(
  key: string,
  defaultValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStateWithLocalStorage;
