import { deleteDoc, doc } from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import AddWorkerModal from '../../components/AddWorkerModal';
import Button from '../../components/Button';
import Modal from '../../components/modal';
import WorkerInput from '../../components/WorkerInput';
import { db } from '../../firebase';
import { getWorkers, Worker } from '../../helper/firebase/getWorkers';
import { updateWorkerToFB } from '../../helper/firebase/writeWorkers';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialWorkers = await getWorkers({});

  return {
    props: {
      initialWorkers,
    },
  };
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const Personal = ({
  initialWorkers,
}: InferGetServerSidePropsType<Worker[]>): JSX.Element => {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [newWorkers, setNewWorkers] = useState<Worker[]>([]);

  const handleDelete = (id: string) => {
    const workersRef = doc(db, 'workers', id);
    deleteDoc(workersRef).then(() => {
      setModalMessage('Mitarbeiter gelöscht'), setModal(true);
    });
  };

  const handleUpdateStation = (event: any, index: number) => {
    const newStation = event.target.value;
    const workerClone = [...workers];
    workerClone[index].station = newStation;

    setWorkers(workerClone);
    if (!newWorkers.includes(workerClone[index])) {
      setNewWorkers(workerClone);
    }
  };

  const handleUpdateFirebase = () => {
    updateWorkerToFB({
      newWorkers,
      initialWorkers: workers,
      handleThen: () => {
        setModalMessage('Updates gespeichert');
        setModal(true);
      },
    });
  };

  const mappedWorkers = workers.map((el, index) => (
    <WorkerInput
      key={el.id}
      id={el.id}
      name={el.name}
      station={el.station}
      onStationChange={(event) => handleUpdateStation(event, index)}
      onClick={() => handleDelete(el.id)}
    />
  ));

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        {modalMessage}
      </Modal>
      <AddWorkerModal open={addModal} onCloseModal={() => setAddModal(false)} />
      {mappedWorkers}
      <Button
        label="Neuen Mitarbeiter hinzufügen"
        onClick={() => setAddModal(true)}
        style={{ marginBottom: '1rem' }}
      />
      <Button label="Updates speichern" onClick={handleUpdateFirebase} />
    </Wrapper>
  );
};

export default Personal;
