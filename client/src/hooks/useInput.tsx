import { useState } from 'react';

type Return = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean, () => void];

const maxTextInput = 30;

const useInput = (initialValue: string, verification?: RegExp): Return => {
  const [text, setText] = useState<string>(initialValue);

  const isCorrectInput = verification !== undefined ? text.match(verification) !== null : true;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (e.target.value.length > maxTextInput) {
      setText((prev) => prev.substr(0, maxTextInput));
    }
  };

  const onReset = () => {
    setText('');
  };

  return [text, onChange, isCorrectInput, onReset];
};

export default useInput;
