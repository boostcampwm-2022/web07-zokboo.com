import styled from 'styled-components';

const CommonButton = styled.button`
  background: none;
  border: 1.5px solid ${(props) => props.color};
  border-radius: 8px;
  color: ${(props) => props.color};

  padding: 4px 12px;

  :hover {
    background: #ebebeb;
    opacity: 0.8;
  }

  :active {
    opacity: 0.5;
  }
`;

interface CommonButtonProps {
  buttonText: string;
  handleButton?: () => void;
  buttonColor?: string;
}

const CommonButtonComponent: React.FC<CommonButtonProps> = ({
  buttonText: text,
  handleButton: handle,
  buttonColor: color,
}: CommonButtonProps) => {
  return (
    <CommonButton onClick={handle} color={color}>
      {text}
    </CommonButton>
  );
};

CommonButtonComponent.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleButton: () => {},
  buttonColor: '#EE842C',
};

export default CommonButtonComponent;
