import styled from 'styled-components';

export const ChipWithImageStyle = styled.div`
  position: relative;
  padding: 0 21px 0 21px;
  max-width: 190px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(216, 216, 216, 0.36);
  cursor: pointer;
  display: flex;
  :hover > .onHover {
    display: flex;
  }
`;

export const OnHoverElement = styled.div`
  height: 100%;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  display: none;
  align-items: 'center';
  background-color: rgba(0, 13, 55, 0.75);
`;
