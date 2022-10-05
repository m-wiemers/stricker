import styled from 'styled-components';
import Link from 'next/link';

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

const Menu = ({ menuPoints }: Props): JSX.Element => {
  const points = menuPoints.map((el: MenuPoint, key: number) => (
    <Link key={key} href={el.href}>
      <MenuPoint>{el.linkName}</MenuPoint>
    </Link>
  ));

  return <Container>{points}</Container>;
};

export default Menu;
