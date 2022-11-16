import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dropdownArrow from '../images/dropdown-arrow.svg';
import Dropdown from './Dropdown';

const DropButton = styled.div``;

const DropdownTitleContainer = styled.summary`
  display: flex;
  flex-direction: row;
  gap: 4px;

  ::marker {
    display: none;
    content: '';
  }
`;

const DropdownTitle = styled.div``;

const DropdownArrow = styled.img`
  width: 14px;
`;

type DropdownContainerProps = {
  title: JSX.Element;
};

// title을 어떻게 받는게 효율적일까요..? 일단 img도 오고 string도 올수 있겠다 생각해서 element로 처리해봤습니다
const DropdownContainer = ({ title }: DropdownContainerProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const detailsRef: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (detailsRef.current && !detailsRef.current.contains(e.target)) {
        setIsToggled(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropButton
      ref={detailsRef}
      onClick={() => {
        setIsToggled((prev) => !prev);
      }}
    >
      <DropdownTitleContainer>
        <DropdownTitle>{title}</DropdownTitle>
        <DropdownArrow src={dropdownArrow} alt="" />
      </DropdownTitleContainer>

      {isToggled ? <Dropdown /> : null}
    </DropButton>
  );
};

export default DropdownContainer;
