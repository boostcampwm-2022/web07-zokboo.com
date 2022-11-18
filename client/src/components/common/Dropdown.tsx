import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DropdownStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  width: 150px;

  border: 1px solid #afb8c1;
  border-radius: 8px;

  > * {
    border: none;
    background: none;
    padding: 8px 8px 8px 16px;

    font-size: 14px;
    text-align: left;

    :hover {
      opacity: 0.7;
      background: #d0d7de;
    }
  }
`;

interface DropdownProps {
  children: JSX.Element[];
}
const Dropdown = ({ children }: DropdownProps) => {
  return <DropdownStyled>{children.map((x, i) => x)}</DropdownStyled>;
};

export default Dropdown;
