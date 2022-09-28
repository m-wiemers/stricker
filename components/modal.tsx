import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Button from './Button';

type Props = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  onClick: () => void;
  buttonLabel?: string;
};

const Wrapper = styled.div`
  position: absolute;
  justify-self: center;
  display: ${({ open }: Partial<Props>) => (open ? 'block' : 'none')};
  height: max-content;
  width: max-content;
  padding: 0.5rem;
  row-gap: 1rem;
  border-radius: 10px;
  border: 2px solid green;
  box-shadow: 4px 4px 8px green;
`;

const InnerWrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 1.5rem;
  min-width: 15rem;
  background-color: #555555;
  border-radius: 10px;
  margin-bottom: 0.7rem;
`;

const Modal = ({
  open,
  onClick,
  buttonLabel,
  children,
}: Props): JSX.Element => {
  return (
    <>
      <Wrapper open={open}>
        <InnerWrapper>{children}</InnerWrapper>
        <Button label={buttonLabel ? buttonLabel : 'OK'} onClick={onClick} />
      </Wrapper>
    </>
  );
};

export default Modal;
