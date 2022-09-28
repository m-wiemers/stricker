import { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Modal from './modal';
import { writeWorker } from '../firebase';
import Dropdown from './dropdown';
import { Stations } from './stations';

type Props = {
  open: boolean;
};

const Wrapper = styled.div`
  display: grid;
  row-gap: 1rem;
  background-color: transparent;
`;

const StyledAddButton = styled.button`
  width: 100%;
  color: white;
  font-size: 2rem;
  border: none;
  justify-self: center;
  border-radius: 20px;
`;

const AddWorkerModal = ({ open }: Props): JSX.Element => {
  const [newWorker, setNewWorker] = useState<string>('');
  const [station, setStation] = useState<string>('');

  const handleAddWorker = () => {
    writeWorker(newWorker, station);
  };

  return (
    <Modal open={open} onClick={() => {}} buttonLabel="Fertig">
      <Wrapper>
        <Input
          type="text"
          label="neuer Mitarbeiter"
          value={newWorker}
          onChange={(e) => setNewWorker(e.target.value)}
        />
        <Dropdown
          list={Stations}
          label="Einsatzort"
          selected={station}
          onSelect={(e) => setStation(e.target.value)}
        />
        <StyledAddButton onClick={handleAddWorker}>+</StyledAddButton>
      </Wrapper>
    </Modal>
  );
};

export default AddWorkerModal;
