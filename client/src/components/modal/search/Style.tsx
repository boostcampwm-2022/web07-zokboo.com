import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';

export const SearchModalContainer = styled.div`
  height: 100%;
`;

export const SearchModalInputBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;

  input {
    height: 30px;
    width: calc(100% - 60px);
  }

  button {
    border: 1px solid ${colors.primary};
    background: none;

    width: 50px;
    height: 30px;

    border-radius: 5px;

    font-size: ${fonts.size.sm};
    color: ${colors.primary};

    cursor: pointer;
    transition: all 0.5s;

    :hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }
`;

export const SearchModalList = styled.ul`
  height: calc(100% - 40px);
  overflow-y: auto;

  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SearchModalItem = styled.li`
  width: 100%;
  height: 50px;

  background-color: ${colors.secondary};
`;
