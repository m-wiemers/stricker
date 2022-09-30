import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
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
  const [workers, setWorkers] = useState<Worker[]>();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

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
    console.log('Ja, na dran...');
    const workersRef = doc(db, 'workers', id);
    deleteDoc(workersRef).then(() => setModal(true));
  };

  const handleUpdateStation = (event: any, id: string) => {
    const newStation = event.target.value;
    const workersRef = doc(db, 'workers', id);
    updateDoc(workersRef, { station: newStation }).then(() =>
      console.log('yes')
    );
  };

  const mappedWorkers = workers?.map((el) => (
    <Worker
      key={el.id}
      id={el.id}
      name={el.name}
      station={el.station}
      onStationChange={(event) => handleUpdateStation(event, el.id)}
      onClick={() => handleDelete(el.id)}
    />
  ));

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        Mitarbeiter gelöscht
      </Modal>
      <AddWorkerModal open={addModal} onCloseModal={() => setAddModal(false)} />
      {mappedWorkers}
      <Button
        label="Neuen Mitarbeiter hinzufügen"
        onClick={() => setAddModal(true)}
      />
    </Wrapper>
  );
};

export default Personal;
