import styled from 'styled-components';
import ActionButton from './ActionButton';
import Dropdown from './dropdown';
import Input from './Input';
import { Stations } from './stations';

type Props = {
  name: string;
  station: string;
  id: string;
  onStationChange: (event: any, id: string) => void;
  onClick: (id: string) => void;
};

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, max-content);
  column-gap: 0.5rem;
  max-width: 340px;
  margin-bottom: 1rem;
`;

const Worker = ({
  name,
  station,
  onStationChange,
  onClick,
  id,
}: Props): JSX.Element => {
  return (
    <Wrapper id={id}>
      <Input readOnly type="text" value={name} />
      <Dropdown
        list={Stations}
        selected={station}
        onSelect={() => onStationChange(event, id)}
      />
      <ActionButton type="minus" onClick={() => onClick(id)} />
    </Wrapper>
  );
};

export default Worker;
