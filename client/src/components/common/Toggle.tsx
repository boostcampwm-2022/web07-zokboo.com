import styled from 'styled-components';
import { colors } from '../../styles/theme';

const ToggleButton = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  border: 1px solid ${colors.primary};
  border-radius: 60px;

  cursor: pointer;

  ::before {
    content: '';

    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);

    width: 50%;
    height: 100%;

    padding: 1px;

    border: 1px solid ${colors.secondary};
    background-color: ${colors.primary};
    border-radius: 50%;

    transition: all 0.3s;
  }
`;

const ToggleContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  input {
    display: none;
  }

  input[type='checkbox']:checked + ${ToggleButton} {
    ::before {
      content: '';

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateY(-50%);

      width: 50%;
      height: 100%;

      padding: 1px;

      border: 1px solid ${colors.secondary};
      background-color: ${colors.primary};
      border-radius: 50%;

      transition: all 0.3s;
    }
  }
`;

interface Props {
  setToggle: () => void;
}

const Toggle = ({ setToggle }: Props) => {
  return (
    <ToggleContainer>
      <label htmlFor="toggle">
        <input type="checkbox" id="toggle" onChange={setToggle} />
        <ToggleButton />
      </label>
    </ToggleContainer>
  );
};

export default Toggle;
