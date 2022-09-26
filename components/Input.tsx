import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';
import Text from './text';

type Props = HTMLAttributes<HTMLInputElement> & {
  type: string;
  label?: string;
};

const StyledInput = styled.input`
  border: 2px solid white;
  padding: 0.5rem;
  border-radius: 10px;
  color: white;
  box-shadow: 2px 2px 10px white;
  width: 3rem;

  ::placeholder {
    color: var(--placeholder-color);
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
`;

const Input = ({ type, label, ...props }: Props): JSX.Element => {
  return (
    <>
      <Text
        style={{ marginBottom: '0.2rem' }}
        type="label"
        text={label ? label : ''}
      />
      <StyledInput {...props} type={type} />
    </>
  );
};

export default Input;
