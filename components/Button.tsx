import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const StyledButton = styled.button`
  background-color: green;
  padding: 0.5rem;
  border: 2px solid white;
  box-shadow: 2px 2px 10px white;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  :hover {
    border-color: grey;
  }
`;

const Button = ({ label, ...props }: Props): JSX.Element => {
  return <StyledButton {...props}>{label}</StyledButton>;
};

export default Button;
