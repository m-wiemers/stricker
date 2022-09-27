import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    label: string;
  };

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

const StyledButton = styled.button`
  background-color: ${({ disabled }: ButtonProps) =>
    disabled ? 'grey' : 'green'};
  padding: 0.5rem;
  border: 2px solid white;
  box-shadow: 2px 2px 10px white;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  :hover {
    border-color: ${({ disabled }: ButtonProps) =>
      disabled ? 'inherit' : 'grey'};
    cursor: ${({ disabled }: ButtonProps) =>
      disabled ? 'not-allowed' : 'pointer'};
  }
`;

const Button = ({ label, disabled, ...props }: Props): JSX.Element => {
  return (
    <StyledButton disabled={disabled} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
