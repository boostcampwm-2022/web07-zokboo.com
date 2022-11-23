import styled from 'styled-components';
import { colors, device, fonts } from '../../styles/theme';

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: 440px;

  border: 1.5px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background: #fcfcfc;

  padding: 12px;

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 12px 0px;
`;

export const InputTitle = styled.div`
  font-size: 12px;
`;

export const InputBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
`;

export const InputBox = styled.input<{ isCorrect?: boolean }>`
  padding: 12px;
  margin: 4px 0px;

  width: 100%;

  border: 1px solid ${(props) => (props.isCorrect ? '#d7d7d7' : `${colors.error}`)};
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;

export const InputAlert = styled.div`
  font-size: ${fonts.size.xxs};
  color: ${colors.error};
  margin: 0px 10px;
`;

export const Button = styled.input<{ disabled: boolean }>`
  background: none;
  color: ${colors.white};
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  background: ${(props) => (props.disabled ? colors.secondary : colors.primary)};

  padding: 8px;

  :active {
    opacity: 0.7;
  }
`;
