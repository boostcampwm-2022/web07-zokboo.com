import useToggle from './useToggle';

interface Value<Type> {
  falseValue: Type;
  trueValue: Type;
}

type Return<Type> = [Type, () => void];

function useToggleValue<Type>(initialState: boolean, { falseValue, trueValue }: Value<Type>): Return<Type> {
  const [toggle, onToggle] = useToggle(initialState);

  const getToggleValue = () => {
    if (toggle) return trueValue;
    return falseValue;
  };

  const value = getToggleValue();

  return [value, onToggle];
}

export default useToggleValue;
