import styled from 'styled-components';
import Link from 'next/link';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import Button from './Button';
import { CustomLink, Text } from './text';
import { useEffect } from 'react';

type Props = {
  menuPoints: MenuPoint[];
};

type MenuPoint = {
  linkName: string;
  href: string;
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  justify-items: center;
  border-bottom: solid 3px white;

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const MenuPoint = styled.a`
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

const SUPERUSER = process.env.NEXT_PUBLIC_SUPERUSER1;

const Menu = ({ menuPoints }: Props): JSX.Element => {
  const router = useRouter();
  const isSuperUser = auth.currentUser?.email === SUPERUSER;

  const handleSignout = () => {
    auth.signOut();
    router.push('/signedoutpage');
  };

  const points = menuPoints.map((el: MenuPoint, key: number) => (
    <Link key={key} href={el.href}>
      <MenuPoint>{el.linkName}</MenuPoint>
    </Link>
  ));

  return (
    <Container>
      {points}
      {isSuperUser && (
        <Link href={'/dashboard'}>
          <MenuPoint>Dashboard</MenuPoint>
        </Link>
      )}
      <Button
        label="Logout"
        onClick={handleSignout}
        style={{ gridColumn: '6', gridColumnEnd: 'end' }}
      />
    </Container>
  );
};

export default Menu;
