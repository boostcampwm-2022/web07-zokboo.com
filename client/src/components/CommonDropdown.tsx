import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
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

type CommonDropdownProps = {
  wrapperRef: React.MutableRefObject<null>;
};

// dropdown 안에는 context로 가져오는걸로? 아니면 props두번써야함.
const CommonDropdown: React.FC<CommonDropdownProps> = ({ wrapperRef: ref }: CommonDropdownProps) => {
  // 드롭다운 바깥클릭 핸들러
  //   useEffect(() => {
  //     const handleOutsideClick = (e: any) => {
  //       if (ref.current && !ref.current.contains(e.target)) {
  //         alert('You clicked outside of me!');
  //       }
  //     };

  //     document.addEventListener('mousedown', handleOutsideClick);
  //     return () => {
  //       document.removeEventListener('mousedown', handleOutsideClick);
  //     };
  //   }, [ref]);
  return (
    <Dropdown>
      <DropdownItem>aa</DropdownItem>
      <DropdownItem>bb</DropdownItem>
      <DropdownItem>cc</DropdownItem>
    </Dropdown>
  );
};

export default CommonDropdown;
