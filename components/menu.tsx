import styled from 'styled-components';
import Link from 'next/link';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import Button from './Button';
import BurgerButton from './BurgerButton';
import { useState } from 'react';

type Props = {
  menuPoints: MenuPointProps[];
  user?: boolean;
  superUser?: boolean;
};

type ShowProps = {
  isOpen: boolean;
};

type MenuPointProps = {
  linkName: string;
  href: string;
};

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: end;
  padding-right: 0.5rem;
  border-bottom: solid 3px white;
`;

const Container = styled.div`
  border-bottom: solid 3px white;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 768px) {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-items: center;
  }

  @media only screen and (max-width: 767px) {
    display: ${({ isOpen }: ShowProps) => (isOpen ? 'flex' : 'none')};
    align-items: center;
  }
`;

const MenuPointWrapper = styled.a`
  width: max-content;
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  :hover {
    background-color: blue;
    border-radius: 10px;
  }
`;

const Menu = ({ menuPoints, user, superUser }: Props): JSX.Element => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleSignout = () => {
    auth.signOut();
    router.push('/authes/signedoutpage');
  };

  const points = menuPoints.map((el: MenuPointProps, key: number) => (
    <Link key={key} href={el.href}>
      <MenuPointWrapper>{el.linkName}</MenuPointWrapper>
    </Link>
  ));

  return (
    <>
      <Wrapper>
        <BurgerButton onClick={() => setOpenMenu(!openMenu)} />
      </Wrapper>
      <Container isOpen={openMenu}>
        {points}
        {superUser && !router.pathname.includes('dashboard') && (
          <Link href={'/dashboard'}>
            <MenuPointWrapper>Dashboard</MenuPointWrapper>
          </Link>
        )}
        {user && (
          <Button
            label="Logout"
            onClick={handleSignout}
            style={{ gridColumn: '6', gridColumnEnd: 'end' }}
          />
        )}
      </Container>
    </>
  );
};

export default Menu;
