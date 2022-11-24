import styled from 'styled-components';
import { colors, media } from '../../styles/theme';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export const ModalInner = styled.div`
  position: relative;
  z-index: 2;

  width: 40%;
  height: 600px;

  padding: 50px 20px 20px 20px;

  border-radius: 10px;
  background-color: ${colors.offWhite};

  ${media.tablet} {
    width: 100%;
    height: 80vh;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  cursor: pointer;

  background: none;
  border: none;
`;

export const ModalBackground = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);
`;
