import { useState } from 'react';
import useToggle from './useToggle';

interface Props<Type> {
  falseValue: Type;
  trueValue: Type;
  initialState: boolean;
}

type Return<Type> = [Type, () => void];

function useToggleValue<Type>({ falseValue, trueValue, initialState }: Props<Type>): Return<Type> {
  const [toggle, onToggle] = useToggle(initialState);

  const getToggleValue = () => {
    if (toggle) return trueValue;
    return falseValue;
  };

  const value = getToggleValue();

  return [value, onToggle];
}

export default useToggleValue;
