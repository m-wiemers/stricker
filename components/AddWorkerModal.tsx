import { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Modal from './modal';
import Dropdown from './dropdown';
import { Stations } from '../helper/stations';
import { Text } from './text';
import { addWorkerToFB } from '../helper/firebase/writeWorkers';

type Props = {
  open: boolean;
  onCloseModal: () => void;
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

const AddWorkerModal = ({ open, onCloseModal }: Props): JSX.Element => {
  const [newWorker, setNewWorker] = useState<string>('');
  const [station, setStation] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleWriteMessage = () => {
    setMessage(`Prima! ${newWorker} wurde hinzugefügt!`),
      setNewWorker(''),
      setStation('Kein Einsatzort');
  };

  const addNewWorker = () => {
    addWorkerToFB({
      name: newWorker,
      station: station,
      handleThen: handleWriteMessage,
    });
  };

  return (
    <Modal open={open} onClick={onCloseModal} buttonLabel="Fertig">
      <Wrapper>
        <Input
          style={{ width: '100%' }}
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
        <StyledAddButton onClick={addNewWorker}>+</StyledAddButton>
        <Text variant="label">{message}</Text>
      </Wrapper>
    </Modal>
  );
};

export default AddWorkerModal;
