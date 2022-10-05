import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Text } from './text';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type: HTMLInputTypeAttribute;
  error?: boolean;
  errorMessage?: string;
};

const StyledInput = styled.input`
  border: 2px solid;
  border-color: ${({ error }: Props) => (error ? 'red' : 'white')};
  padding: 0.5rem;
  border-radius: 10px;
  color: white;
  box-shadow: 2px 2px 10px white;
  width: ${({ type }: Props) => type == 'number' && '3rem'};
  margin-bottom: 0.5rem;

  ::-webkit-calendar-picker-indicator {
    background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png)
      center/80% no-repeat;
    color: white;
    cursor: pointer;
  }

  ::placeholder {
    color: var(--placeholder-color);
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

const Wrapper = styled.div`
  text-align: start;
  background-color: transparent;
  justify-self: center;
`;

const Input = ({
  label,
  error,
  errorMessage,
  ...props
}: Props): JSX.Element => {
  return (
    <Wrapper>
      {label && (
        <Text style={{ marginBottom: '0.2rem' }} variant="label">
          {label}
        </Text>
      )}
      <StyledInput {...props} error={error} />
      {error && (
        <Text variant="label" color="red" style={{ marginTop: '0.5rem' }}>
          {errorMessage}
        </Text>
      )}
    </Wrapper>
  );
};

export default Input;
