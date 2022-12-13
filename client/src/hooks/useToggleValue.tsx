import useToggle from './useToggle';

interface Value<Type> {
  falseValue: Type;
  trueValue: Type;
}

interface Return<Type> {
  value: Type;
  toggle: boolean;
  onToggle: () => void;
}

function useToggleValue<Type>(initialState: boolean, { falseValue, trueValue }: Value<Type>): Return<Type> {
  const [toggle, onToggle] = useToggle(initialState);

  const getToggleValue = () => {
    if (toggle) return trueValue;
    return falseValue;
  };

  const value = getToggleValue();

  return { value, toggle, onToggle };
}

export default useToggleValue;
