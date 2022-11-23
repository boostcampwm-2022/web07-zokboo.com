import { useState } from 'react';

type Return = [boolean, () => void];

const useToggle = (initialState: boolean): Return => {
  const [toggle, setToggle] = useState(initialState);

  const onToggle = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, onToggle];
};
export default useToggle;
