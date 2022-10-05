import Link from 'next/link';
import styled from 'styled-components';
import { Text } from './text';

type Props = {
  concert: string;
  href: string;
};

const Wrapper = styled.a`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 20rem;
  background-color: #212121;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px white;
  margin-bottom: 1rem;
  cursor: pointer;

  :hover {
    background-color: green;
  }
`;

const PersonalOverviewCard = ({ concert, href }: Props): JSX.Element => {
  const date = concert.split('-').pop();
  const concertName = concert.substring(0, concert.indexOf('-'));
  return (
    <Link href={href}>
      <Wrapper>
        <Text variant="normal">{concertName}</Text>
        <Text variant="normal">{date}</Text>
      </Wrapper>
    </Link>
  );
};

export default PersonalOverviewCard;
