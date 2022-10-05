import { HTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  variant: 'label' | 'normal' | 'headline';
  color?: string;
  marginBottom?: string;
};

type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
  variant: 'small' | 'normal';
  href: string;
};

const StyledLabel = styled.p`
  font-size: 0.7rem;
  color: ${({ color }: Partial<Props>) => (color ? color : 'white')};
  margin-bottom: ${({ marginBottom }: Partial<Props>) =>
    marginBottom ? marginBottom : '0.2rem'};
`;

const StyledText = styled.p`
  font-size: 1rem;
  color: ${({ color }: Partial<Props>) => (color ? color : 'white')};
  margin-bottom: ${({ marginBottom }: Partial<Props>) =>
    marginBottom ? marginBottom : '0.2rem'};
`;

const StyledHeadline = styled.h1`
  font-size: 2rem;
  color: ${({ color }: Partial<Props>) => (color ? color : 'white')};
  margin-bottom: ${({ marginBottom }: Partial<Props>) =>
    marginBottom ? marginBottom : '0.2rem'};
`;

const StyledLink = styled.a<LinkProps>`
  color: white;
  font-size: ${({ variant }: LinkProps) =>
    variant == 'small' ? '0.7rem' : '1rem'};
`;

const Text = ({ variant, color, children, ...props }: Props): JSX.Element => {
  return (
    <>
      {variant == 'label' && (
        <StyledLabel color={color} {...props}>
          {children}
        </StyledLabel>
      )}
      {variant == 'normal' && (
        <StyledText color={color} {...props}>
          {children}
        </StyledText>
      )}
      {variant == 'headline' && (
        <StyledHeadline color={color} {...props}>
          {children}
        </StyledHeadline>
      )}
    </>
  );
};

const Link = ({ variant, href, children }: LinkProps): JSX.Element => {
  return (
    <StyledLink variant={variant} href={href}>
      {children}
    </StyledLink>
  );
};

export { Text, Link };
