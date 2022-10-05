import { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    label: string;
  };

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  color?: string;
};

const StyledButton = styled.button`
  background-color: ${({ disabled, color }: ButtonProps) =>
    disabled ? 'grey' : color ? color : 'green'};
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

const Button = ({ label, disabled, color, ...props }: Props): JSX.Element => {
  return (
    <StyledButton disabled={disabled} color={color} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
