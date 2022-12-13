import { AiFillEyeInvisible } from '@react-icons/all-files/ai/AiFillEyeInvisible';
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';

interface ToggleVisibleProps {
  id: string;
  state: boolean;
  setState: (value: React.SetStateAction<boolean>) => void;
}

const ToggleVisible = ({ id, state, setState }: ToggleVisibleProps) => {
  return (
    <div role="presentation" id={id} onClick={() => setState((prev) => !prev)}>
      {state ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
    </div>
  );
};

export default ToggleVisible;
