import { useState } from 'react';

type Return = [
  string,
  (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  boolean,
  () => void,
];

const MAX_TEXT_INPUT_SIZE = 30;

const useInput = (initialValue: string, verification?: RegExp): Return => {
  const [text, setText] = useState<string>(initialValue);

  const isCorrectInput = verification !== undefined ? text.match(verification) !== null : true;

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length > MAX_TEXT_INPUT_SIZE) {
      setText((prev) => prev.substr(0, MAX_TEXT_INPUT_SIZE));
    }
  };

  const onReset = () => {
    setText('');
  };

  return [text, onChange, isCorrectInput, onReset];
};

export default useInput;
