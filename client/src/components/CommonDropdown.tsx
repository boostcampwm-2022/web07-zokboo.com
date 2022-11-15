import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  width: 150px;

  border: 1px solid #afb8c1;
  border-radius: 8px;
`;
const DropdownItem = styled.button`
  border: none;
  background: none;
  padding: 8px 8px 8px 16px;

  font-size: 14px;
  text-align: left;

  :hover {
    opacity: 0.7;
    background: #d0d7de;
  }
`;

// 버튼이름과 버튼핸들러는 어떻게 가져올 수 있을까요? 전 도저히 생각이 안나네요ㅠ
const CommonDropdown = () => {
  return (
    <Dropdown>
      <DropdownItem>aa11</DropdownItem>
      <DropdownItem>bb</DropdownItem>
      <DropdownItem>cc</DropdownItem>
    </Dropdown>
  );
};

export default CommonDropdown;
