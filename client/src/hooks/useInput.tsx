import { useState } from 'react';

interface Return {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  correct: boolean;
  reset: () => void;
}

const useInput = (initialValue: string, verification?: RegExp): Return => {
  const [text, setText] = useState<string>(initialValue);

  const correct = verification !== undefined ? text.match(verification) !== null : true;

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const reset = () => {
    setText('');
  };

  return { text, onChange, correct, reset };
};

export default useInput;
