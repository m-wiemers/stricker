import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import DeleteIcon from './icons/deleteIcon';

type Props = HTMLAttributes<HTMLDivElement> & {
  onClick: () => void;
};

const Wrapper = styled.button`
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
`;

const ActionButton = ({ onClick }: Props): JSX.Element => {
  return (
    <Wrapper onClick={onClick}>
      <DeleteIcon />
    </Wrapper>
  );
};

export default ActionButton;
