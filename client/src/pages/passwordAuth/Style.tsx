import styled from 'styled-components';
import { Button, Input } from '../../styles/common';
import { colors, fonts, media } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 440px;

  padding: 50px 20px;

  background-color: ${colors.gray1};
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${media.mobileLength} {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const LogoBox = styled.div`
  width: 50px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${fonts.size.xxl};

  strong {
    color: ${colors.primary};
  }
`;

export const AuthButton = styled(Button)<{ disabled: boolean }>`
  width: 150px;
  height: 50px;

  ${(props) =>
    !props.disabled &&
    `:hover {

  }`}
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  width: 80%;
`;

export const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin: 10px 0 0;
`;

export const AuthInput = styled(Input)`
  width: calc(100% - 30px);
  height: 40px;

  padding: 0 10px;
  border-radius: 10px;
`;

export const InputAlert = styled.p<{ isShow: boolean }>`
  opacity: ${(props) => (props.isShow ? `1` : `0`)};

  color: ${colors.error};
  font-size: ${fonts.size.xs};

  width: 100%;

  margin: 0 0 10px;
`;
