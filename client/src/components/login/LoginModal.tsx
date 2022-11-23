import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/theme';

export const ModalContainerStyled = styled.div`
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

  padding: 20px;

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

export const Modal = styled.div`
  width: 80%;
`;

interface ModalContainerProps {
  children: JSX.Element[];
}
const ModalContainer = ({ children }: ModalContainerProps): JSX.Element => {
  return (
    <ModalContainerStyled>
      <Modal>{children}</Modal>
    </ModalContainerStyled>
  );
};

export default ModalContainer;
