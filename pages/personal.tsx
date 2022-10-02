import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddWorkerModal from '../components/AddWorkerModal';
import Button from '../components/Button';
import Modal from '../components/modal';
import Worker from '../components/Worker';
import { db } from '../firebase';

type Worker = {
  id: string;
  name: string;
  station: string;
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const Personal = (): JSX.Element => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [newWorkers, setNewWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    const readData = async () => {
      const workRef = await collection(db, 'workers');
      await getDocs(workRef)
        .then((snapshot) => {
          const array: any = [];
          snapshot.docs.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
          });
          setWorkers(array);
          return array;
        })
        .catch((err) => console.log(err));
    };
    readData();
  }, []);

  const handleDelete = (id: string) => {
    const workersRef = doc(db, 'workers', id);
    deleteDoc(workersRef).then(() => {
      setModalMessage('Mitarbeiter gelöscht'), setModal(true);
    });
  };

  const handleUpdateStation = (event: any, index: number, id: string) => {
    const newStation = event.target.value;
    const workerClone = [...workers];
    workerClone[index].station = newStation;

    setWorkers(workerClone);
    if (!newWorkers.includes(workerClone[index])) {
      setNewWorkers(workerClone);
    }
  };

  const handleUpdateFirebase = () => {
    console.log(newWorkers);
    newWorkers.forEach((worker) => {
      const newWorker = workers.find((el) => el.id == worker.id);
      if (newWorker) {
        const workersRef = doc(db, 'workers', newWorker.id);
        updateDoc(workersRef, { station: newWorker.station })
          .then(() => {
            setModalMessage('Updates gespeichert');
            setModal(true);
          })
          .catch((err) => console.error(err.message));
      }
    });
  };

  const mappedWorkers = workers?.map((el, index) => (
    <Worker
      key={el.id}
      id={el.id}
      name={el.name}
      station={el.station}
      onStationChange={(event) => handleUpdateStation(event, index, el.id)}
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
      />
      <Button label="Updates speichern" onClick={handleUpdateFirebase} />
    </Wrapper>
  );
};

export default Personal;
