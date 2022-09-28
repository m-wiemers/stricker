import styled from 'styled-components';

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
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  border-bottom: solid 3px white;
`;

const MenuPoint = styled.a`
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  font-weight: bold;

  :hover {
    background-color: red;
  }
`;

const Menu = ({ menuPoints }: Props): JSX.Element => {
  const points = menuPoints.map((el: MenuPoint, key: number) => (
    <MenuPoint key={key} href={el.href}>
      {el.linkName}
    </MenuPoint>
  ));

  return <Container>{points}</Container>;
};

export default Menu;
