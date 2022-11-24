import { useEffect, useRef } from 'react';
import useToggle from '../../../hooks/useToggle';
import { Container, DropdownItem, DropdownList, Selector } from './Style';
import Direction from './Types';

interface Props {
  title: JSX.Element;
  values: string[];
  direction: Direction;
}

const DropDown = ({ title, values, direction }: Props) => {
  const [isToggle, handleToggle] = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (isToggle) {
        const dropdown = dropdownRef.current;
        const isElement = target instanceof HTMLElement;

        if (dropdown && isElement && !dropdownRef.current.contains(target)) {
          handleToggle();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToggle]);
  return (
    <Container ref={dropdownRef} onClick={handleToggle}>
      <Selector>{title}</Selector>
      {isToggle && (
        <DropdownList direction={direction}>
          {values.map((value) => (
            <DropdownItem key={value}>{value}</DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default DropDown;
