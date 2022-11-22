import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HiArrowCircleDown } from 'react-icons/hi';
import { MdArrowDropDown } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import dropdownArrow from '../../images/dropdown-arrow.svg';
import { colors } from '../../styles/theme';

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
const DropdownStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 150px;
  border: 1px solid #afb8c1;
  border-radius: 8px;
  > * {
    border: none;
    background: ${colors.white};
    padding: 8px 8px 8px 16px;
    font-size: 14px;
    text-align: left;
    :hover {
      background: #d0d7de;
    }
  }
`;
type DropdownContainerProps = {
  title: JSX.Element;
  // eslint-disable-next-line react/require-default-props
  arrowType?: string;
  // eslint-disable-next-line react/require-default-props
  iconSize?: number;
  children: JSX.Element[];
};

const DropdownContainer = ({ title, arrowType = '2', iconSize = 20, children }: DropdownContainerProps) => {
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
        {arrowType === '1' && <HiArrowCircleDown size={iconSize} />}
        {arrowType === '2' && <MdArrowDropDown size={iconSize} />}
        {arrowType === '3' && <RiArrowDropDownLine size={iconSize} />}
      </DropdownTitleContainer>
      {isToggled && <DropdownStyled> {children}</DropdownStyled>}
    </DropButton>
  );
};

export default DropdownContainer;
