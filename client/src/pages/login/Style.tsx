import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, device, fonts } from '../../styles/theme';

export const Modal = styled.div`
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

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

export const ModalBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const InputBox = styled.input`
  width: 200px;
  padding: 12px;
  margin: 12px 0px;

  border: 1px solid #d7d7d7;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;
export const LoginButton = styled.input`
  background: none;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  border-radius: 8px;

  padding: 8px;
  width: 224px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }
`;
export const MoreButtons = styled.div`
  margin: 12px;
`;

export const RedirectButton = styled(Link)`
  background: none;
  border: none;
  text-decoration: underline;

  color: ${colors.gray2};

  font-size: ${fonts.size.xs};

  margin: 0px 4px;

  :hover {
    opacity: 0.7;
  }
`;

export const SSOTitle = styled.div`
  margin: 12px;

  color: ${colors.gray3};
  font-size: 14px;
`;

export const SSOButtons = styled.div`
  img {
    margin: 12px 12px;
  }
`;

export const SSOIcon = styled.img`
  width: 48px;
`;
