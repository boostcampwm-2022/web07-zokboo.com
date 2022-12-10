import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { media } from '../../styles/theme';

export const GoToLogin = styled(Link)`
  float: left;
`;

export const ModalTitle = styled.div``;

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

  ${media.mobileWidth} {
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
  title: string;
}
const ModalContainer = ({ children, title }: ModalContainerProps): JSX.Element => {
  return (
    <ModalContainerStyled>
      <Modal>
        <GoToLogin to="/login">
          <FiArrowLeft size={20} />
        </GoToLogin>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </Modal>
    </ModalContainerStyled>
  );
};

export default ModalContainer;
