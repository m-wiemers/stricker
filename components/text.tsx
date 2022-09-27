import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  type: 'label' | 'normal';
  text?: string;
  color?: string;
};

const StyledLabel = styled.p`
  font-size: 0.7rem;
  color: ${({ color }: Partial<Props>) => (color ? color : 'white')};
`;

const Text = ({ type, text, color, ...props }: Props): JSX.Element => {
  return (
    <>
      {type == 'label' && (
        <StyledLabel color={color} {...props}>
          {text}
        </StyledLabel>
      )}
    </>
  );
};

export default Text;
