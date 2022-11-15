import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dropdownArrow from '../images/dropdown-arrow.svg';
import CommonDropdown from './CommonDropdown';

const Dropdown = styled.div``;

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

type CommonDropdownContainerProps = {
  title: JSX.Element;
};

// title을 어떻게 받는게 효율적일까요..? 일단 img도 오고 string도 올수 있겠다 생각해서 element로 처리해봤습니다
const CommonDropdownContainer: React.FC<CommonDropdownContainerProps> = ({
  title: _title,
}: CommonDropdownContainerProps) => {
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
    <Dropdown
      ref={detailsRef}
      onClick={(e) => {
        setIsToggled((prev) => !prev);
      }}
    >
      <DropdownTitleContainer>
        <DropdownTitle>{_title}</DropdownTitle>
        <DropdownArrow src={dropdownArrow} alt="" />
      </DropdownTitleContainer>

      {isToggled ? <CommonDropdown /> : null}
    </Dropdown>
  );
};

export default CommonDropdownContainer;
