import { useState } from 'react';

interface Props<Type> {
  falseValue: Type;
  trueValue: Type;
  initialState: boolean;
}

type Return<Type> = [Type, () => void];

function useToggleValue<Type>({ falseValue, trueValue, initialState }: Props<Type>): Return<Type> {
  const [state, setState] = useState<boolean>(initialState);

  const onChange = () => {
    setState((prev) => !prev);
  };

  const getToggleValue = () => {
    if (state) return trueValue;
    return falseValue;
  };

  const value = getToggleValue();

  return [value, onChange];
}

export default useToggleValue;
