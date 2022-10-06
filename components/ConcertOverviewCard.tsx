import styled from 'styled-components';
import { formatDate } from '../helper/formatter';
import { Text } from './text';

type Props = {
  date: string;
  concertName: string;
  startTime: string;
  endTime: string;
  bands: string[];
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
  justify-self: center;

  :hover {
    background-color: green;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
  grid-column: 1/3;
`;

const ConcertOverviewCard = ({
  date,
  concertName,
  startTime,
  endTime,
  bands,
  href,
}: Props): JSX.Element => {
  const formateDate = formatDate(date);

  const bandOutput = bands.map((band) => (
    <Text variant="label" key={band} style={{ alignSelf: 'center' }}>
      {band}
    </Text>
  ));

  return (
    <Wrapper href={href}>
      <Text variant="normal" style={{ gridColumn: '1/3' }}>
        Datum: {formateDate}
      </Text>
      <Text variant="normal" style={{ gridColumn: '1/3' }}>
        {concertName}
      </Text>
      <Line />
      <Text variant="label">Start: {startTime}</Text>
      <Text variant="label">Ende: {endTime}</Text>
      <Line />
      {bandOutput}
    </Wrapper>
  );
};

export default ConcertOverviewCard;
