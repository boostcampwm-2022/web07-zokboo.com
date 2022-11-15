import styled from 'styled-components';

const DashBoardItemMain = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  background-color: blue;

  z-index: 2;
`;

const DashBoardItemSub = styled.div<{ bgColor: string }>`
  position: absolute;

  background-color: ${(props) => props.bgColor};

  width: 100%;
  height: 100%;

  transition: all 1s;
`;

const DashBoardItemContainer = styled.div`
  position: relative;

  width: 100px;
  height: 120px;

  cursor: pointer;

  background-color: yellow;

  :hover :nth-child(1) {
    transform: translate(25px, -20px) rotate(30deg);
  }

  :hover :nth-child(2) {
    transform: translate(-25px, -20px) rotate(-30deg);
  }
`;

const DashBoardItem = () => {
  return (
    <DashBoardItemContainer>
      <DashBoardItemSub bgColor="pink">문제집1</DashBoardItemSub>
      <DashBoardItemSub bgColor="green">문제집2</DashBoardItemSub>
      <DashBoardItemMain>문제집</DashBoardItemMain>
    </DashBoardItemContainer>
  );
};

export default DashBoardItem;
