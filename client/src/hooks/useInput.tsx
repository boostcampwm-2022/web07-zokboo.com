import { useState } from 'react';

type Return = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

const useInput = (initialValue: string): Return => {
  const [text, setText] = useState<string>(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return [text, onChange, onReset];
};

export default useInput;
