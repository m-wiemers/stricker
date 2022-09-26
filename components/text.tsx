import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  type: 'label' | 'normal';
  text: string;
};

const StyledLabel = styled.p`
  font-size: 0.7rem;
`;

const Text = ({ type, text, ...props }: Props): JSX.Element => {
  return <>{type == 'label' && <StyledLabel {...props}>{text}</StyledLabel>}</>;
};

export default Text;
