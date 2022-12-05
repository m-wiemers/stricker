import styled from 'styled-components';
import ActionButton from './ActionButton';
import Dropdown from './dropdown';
import Input from './Input';
import { Stations } from '../helper/stations';

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
  grid-template-columns: repeat(3, max-content);
  column-gap: 0.5rem;
  max-width: 340px;
  margin-bottom: 1rem;
`;

const WorkerInput = ({
  name,
  station,
  onStationChange,
  onClick,
  id,
}: Props): JSX.Element => {
  return (
    <Wrapper id={id}>
      <Input readOnly type="text" label="Name" value={name} />
      <Dropdown
        label="Standart-Einsatzort"
        list={Stations}
        selected={station}
        onSelect={() => onStationChange(event, id)}
      />
      <ActionButton onClick={() => onClick(id)} />
    </Wrapper>
  );
};

export default WorkerInput;
