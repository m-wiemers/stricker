import Link from 'next/link';
import styled from 'styled-components';
import { formatDate } from '../helper/formatter';
import DeleteIcon from './icons/deleteIcon';
import EditIcon from './icons/editIcon';
import { Text } from './text';

type Props = {
  date: string;
  concertName: string;
  startTime: string;
  endTime: string;
  bands: string[];
  href?: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

type IconProps = {
  left?: boolean;
};

const Wrapper = styled.a`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 20rem;
  background-color: #212121;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px white;
  margin-bottom: 1rem;
  justify-self: center;
  position: relative;
  cursor: pointer;

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

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  grid-column: ${({ left }: IconProps) => (left ? '2/3' : '1/2')};
  height: 30px;
  width: 30px;
  top: 5px;
  position: absolute;
  justify-self: ${({ left }: IconProps) => (left ? 'end' : 'none')};
`;

const ConcertOverviewCard = ({
  date,
  concertName,
  startTime,
  endTime,
  bands,
  href,
  onDelete,
  onEdit,
}: Props): JSX.Element => {
  const formateDate = formatDate(date);

  const bandOutput = bands.map((band) => (
    <Text variant="label" key={band} style={{ alignSelf: 'center' }}>
      {band}
    </Text>
  ));

  return (
    <>
      {href ? (
        <Link href={href}>
          <Wrapper>
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
        </Link>
      ) : (
        <Wrapper as="div">
          <IconWrapper left onClick={onDelete} title="Konzert löschen">
            <DeleteIcon />
          </IconWrapper>
          <IconWrapper onClick={onEdit} title="Konzert bearbeiten">
            <EditIcon />
          </IconWrapper>
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
      )}
    </>
  );
};

export default ConcertOverviewCard;
