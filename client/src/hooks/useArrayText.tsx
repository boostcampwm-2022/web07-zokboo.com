import { useState } from 'react';

type ArrayText = [number, string];
interface Return {
  state: ArrayText[];
  values: string[];
  change: (updateKey: number, data: string) => void;
  add: (defaultData?: string) => void;
  set: (values: string[]) => void;
  erase: (eraseKey: number) => void;
  reset: () => void;
  search: (searchKey: number) => string;
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

  const set = (values: string[]) => {
    const updateList: ArrayText[] = [];

    for (let i = 0; i < values.length; i += 1) {
      const value = values[i];
      updateList.push([i, value]);
    }

    setState((prev) => [...prev, ...updateList]);
  };

  const erase = (eraseKey: number) => {
    const updateState = state.filter(([key]) => key !== eraseKey);

    setState(updateState);
  };

  const change = (updateKey: number, data: string) => {
    const updateState = state.map((arrayText) => {
      const [key] = arrayText;
      return key === updateKey ? ([key, data] as ArrayText) : arrayText;
    });

    setState(updateState);
  };

  const search = (searchKey: number) => {
    const data = state.filter(([key]) => key === searchKey);

    return data.length !== 0 ? data[0][1] : ``;
  };

  const values = state.map((data) => data[1]);

  return { state, values, change, add, set, erase, reset, search };
};

export default useArrayText;
