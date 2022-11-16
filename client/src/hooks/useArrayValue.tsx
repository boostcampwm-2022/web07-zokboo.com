import { useState } from 'react';

type Return<Type> = [Type, (value: number) => void];

function useArrayValue<Type>(array: Type[]): Return<Type> {
  const [state, setState] = useState<number>(0);

  const onChange = (value: number) => {
    setState(value);
  };

  return [array[state], onChange];
}

export default useArrayValue;
