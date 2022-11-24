import { useState } from 'react';

type ArrayText = [number, string];
interface Return {
  state: ArrayText[];
  values: string[];
  change: (updateKey: number, data: string) => void;
  add: (defaultData?: string) => void;
  erase: (eraseKey: number) => void;
  reset: () => void;
}

const useArrayText = (): Return => {
  const [state, setState] = useState<ArrayText[]>([]);

  const reset = () => {
    setState([]);
  };

  const add = (defaultData = '') => {
    const lastKey = state[state.length - 1] ? state[state.length - 1][0] + 1 : 0;

    setState((prev) => [...prev, [lastKey, defaultData]]);
  };

  const erase = (eraseKey: number) => {
    const updateState = state.filter(([key, _]) => key !== eraseKey);

    setState(updateState);
  };

  const change = (updateKey: number, data: string) => {
    const updateState = state.map((arrayText) => {
      const [key, _] = arrayText;
      return key === updateKey ? ([key, data] as ArrayText) : arrayText;
    });

    setState(updateState);
  };

  const values = state.map(([_, data]) => data);

  return { state, values, change, add, erase, reset };
};

export default useArrayText;
