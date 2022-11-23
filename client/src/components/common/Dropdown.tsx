import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  text: string;
  handleClick: () => void;
}
const Dropdown = ({ text, handleClick }: DropdownProps) => {
  return <input type="button" value={text} onClick={handleClick} />;
};

export default Dropdown;
