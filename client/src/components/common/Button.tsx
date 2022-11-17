import styled from 'styled-components';

const Button = styled.button<{ width?: string; height?: string; buttonColor?: string }>`
  background: none;
  border: 1.5px solid ${(props) => props.buttonColor};
  border-radius: 8px;

  color: ${(props) => (props.color ? props.color : '#EE842C')};
  ${(props) => props.width && `width: ${props.width}`};
  ${(props) => props.width && `height: ${props.height}`};

  padding: 4px 12px;

  :hover {
    background: #ebebeb;
    opacity: 0.8;
  }

  :active {
    opacity: 0.5;
  }
`;

interface ButtonProps {
  buttonText: string;
  buttonWidth?: string;
  buttonHeight?: string;
  handleButton?: () => void;
  buttonColor?: string;
}

const ButtonComponent = ({ buttonText, handleButton, buttonColor, buttonWidth, buttonHeight }: ButtonProps) => {
  return (
    <Button onClick={handleButton} width={buttonWidth} height={buttonHeight} buttonColor={buttonColor}>
      {buttonText}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  handleButton: () => {
    /** */
  },
  buttonWidth: '',
  buttonHeight: '',
  buttonColor: '',
};

export default ButtonComponent;
