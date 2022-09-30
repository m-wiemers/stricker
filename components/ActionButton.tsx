import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import UpdateUser from './icons/UpdateUser';

type Props = HTMLAttributes<HTMLDivElement> & {
  type: 'plus' | 'minus';
  onClick: () => void;
};

const Wrapper = styled.button`
  cursor: pointer;
  border: 2px solid white;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
`;

const Inner = styled.p`
  font-size: 1rem;
`;

const ActionButton = ({ type, onClick }: Props): JSX.Element => {
  const types = type == 'plus' ? '+' : '-';

  return (
    <Wrapper onClick={onClick}>
      <Inner>{types}</Inner>
    </Wrapper>
  );
};

export default ActionButton;
