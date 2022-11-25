import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  onClick: () => void;
};

const Wrapper = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  align-content: space-around;
  padding: 3px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const BurgerLine = styled.div`
  height: 5px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;

const BurgerButton = ({ onClick }: Props): JSX.Element => {
  return (
    <Wrapper onClick={onClick}>
      <BurgerLine />
      <BurgerLine />
      <BurgerLine />
    </Wrapper>
  );
};

export default BurgerButton;
