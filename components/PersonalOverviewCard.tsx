import Link from 'next/link';
import styled from 'styled-components';
import DeleteIcon from './icons/deleteIcon';
import EditIcon from './icons/editIcon';
import { Text } from './text';

type Props = {
  concert: string;
  href?: string;
  isDashboard?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

type IconProps = {
  left?: boolean;
};

const Wrapper = styled.a`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  max-width: 20rem;
  width: 100%;
  background-color: #212121;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px white;
  margin-bottom: 1rem;
  cursor: ${({ isDashboard }: Partial<Props>) =>
    isDashboard ? 'inherit' : 'pointer'};

  :hover {
    background-color: ${({ isDashboard }: Partial<Props>) =>
      isDashboard ? 'none' : 'green'};
  }
`;

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  grid-column: ${({ left }: IconProps) => (left ? '3/4' : '1/2')};
  grid-row: 1/2;
  height: 30px;
  width: 30px;
  top: 5px;
  justify-self: ${({ left }: IconProps) => (left ? 'end' : 'none')};
  margin-bottom: 0.5rem;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
  grid-column: 1/4;
  grid-row: 2/3;
  margin-top: 0.5rem;
`;

const PersonalOverviewCard = ({
  concert,
  href,
  isDashboard,
  onDelete,
  onEdit,
}: Props): JSX.Element => {
  const date = concert.split('-').pop();
  const concertName = concert.substring(0, concert.indexOf('-'));
  return (
    <>
      {isDashboard ? (
        <Wrapper as="div" isDashboard>
          <IconWrapper left onClick={onDelete} title="Personalplan löschen">
            <DeleteIcon />
          </IconWrapper>
          <IconWrapper onClick={onEdit} title="Personalplan bearbeiten">
            <EditIcon />
          </IconWrapper>
          <Text
            variant="normal"
            style={{
              gridColumn: '2/3',
              paddingLeft: '0.7rem',
              paddingRight: '0.7rem',
            }}
          >
            {concertName}
          </Text>
          <Line />
          <Text variant="normal" style={{ gridRow: '3/4', gridColumn: '2/3' }}>
            {date}
          </Text>
        </Wrapper>
      ) : (
        <Link href={href ? href : ''}>
          <Wrapper>
            <Text variant="normal">{concertName}</Text>
            <Text variant="normal">{date}</Text>
          </Wrapper>
        </Link>
      )}
    </>
  );
};

export default PersonalOverviewCard;
