import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type Props = HTMLAttributes<HTMLDivElement> & {
  variant: 'label' | 'normal' | 'headline';
  color?: string;
  marginBottom?: string;
};

type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
  variant: 'small' | 'normal';
  color?: string;
  href: string;
  colorOnHover?: string;
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
  background-color: transparent;
  color: ${({ color }: Partial<Props>) => (color ? color : 'white')};
  margin-bottom: ${({ marginBottom }: Partial<Props>) =>
    marginBottom ? marginBottom : '0.2rem'};
`;

const StyledLink = styled.a<Partial<LinkProps>>`
  color: ${({ color }) => (color ? color : 'white')};
  cursor: pointer;
  font-size: ${({ variant }) => (variant == 'small' ? '0.7rem' : '1rem')};

  :hover {
    background-color: ${({ colorOnHover }) =>
      colorOnHover ? colorOnHover : 'none'};
  }
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

const CustomLink = ({
  variant,
  href,
  color,
  children,
  colorOnHover,
}: LinkProps): JSX.Element => {
  return (
    <Link href={href}>
      <StyledLink color={color} variant={variant} colorOnHover={colorOnHover}>
        {children}
      </StyledLink>
    </Link>
  );
};

export { Text, CustomLink };
