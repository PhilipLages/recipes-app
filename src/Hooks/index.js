import { useEffect, useState } from 'react';

function useStorage(key, initialState) {
  const [state, setState] = useState(() => {
    const localState = localStorage.getItem(key);

    return JSON.parse(localState) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
}

export default useStorage;
