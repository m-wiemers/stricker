import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Dropdown from '../../../components/dropdown';
import Modal from '../../../components/modal';
import { Stations } from '../../../components/stations';
import { Text } from '../../../components/text';
import { WorkTimes } from '../../../components/worktimes';
import { db } from '../../../firebase';
import { PersonPlan } from './addPlan';

type Props = {
  concert: string;
  personal: {
    name: string;
    station: string;
    startTime: string;
    endTime: string;
  }[];
};

type Worker = {
  id: string;
  name: string;
  station: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getId = (): string => {
    const { id } = context.query;
    if (typeof id == 'string') {
      return id;
    } else {
      return 'no data';
    }
  };

  const personalPlanRef = await doc(db, 'personalPlan', getId());
  const data = await getDoc(personalPlanRef)
    .then((plan) => {
      return plan.data();
    })
    .catch((err) => console.error(err.message));

  const workRef = await collection(db, 'workers');
  const workers = await getDocs(workRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      array.unshift({ name: 'Keine Angabe' });
      return array;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      data,
      workers,
    },
  };
};

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  align-items: center;
  border-bottom: 2px solid white;
  margin-bottom: 1rem;
`;

const TimeWrapper = styled.div`
  grid-column: 2/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
`;

const PersonalPlanEdit = ({
  data,
  workers,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  const personalList: Worker[] = workers;
  const [concert, setConcert] = useState<Props>(data);
  const [personal, setPersonal] = useState<PersonPlan[]>(concert.personal);
  const thisId = router.asPath.split('/').pop();
  const [modal, setModal] = useState<boolean>(false);

  const handleChangeWorker = (
    value: string,
    station: string,
    target: string
  ) => {
    const personalClone = [...personal];
    let person = personalClone.find((per) => per.station === station);
    switch (target) {
      case 'name':
        if (person) {
          person.name = value || 'Keine Angabe';
        }
        break;
      case 'startTime':
        if (person) {
          person.startTime = value || 'Ende';
        }
        break;
      case 'endTime':
        if (person) {
          person.endTime = value || 'Ende';
        }
        break;
    }
    setPersonal(personalClone);
  };

  const handleUpdate = () => {
    setConcert({ ...concert, personal: personal });
    console.log(concert);
    if (thisId) {
      const planRef = doc(db, 'personalPlan', thisId);
      updateDoc(planRef, concert)
        .then(() => {
          setModal(true);
        })
        .catch((err) => console.error(err.message));
    }
  };

  const filteredStation = Stations.filter(
    (station) => station !== 'Kein Einsatzort'
  );

  const stationList = filteredStation.map((station, index) => {
    return (
      <InputWrapper key={index}>
        <Text variant="normal" color="blue">
          {station}
        </Text>
        <Dropdown
          label="Mitarbeiter"
          list={personalList.map((per) => per.name)}
          selected={
            personal.find((personal) => personal.station == station)?.name ||
            'Keine Angabe'
          }
          onSelect={(e) => handleChangeWorker(e.target.value, station, 'name')}
        />
        <TimeWrapper>
          <Dropdown
            label="von"
            list={WorkTimes}
            selected={
              personal.find((per) => per.station === station)?.startTime || ''
            }
            onSelect={(e) =>
              handleChangeWorker(e.target.value, station, 'startTime')
            }
          />
          <Dropdown
            label="von"
            list={WorkTimes}
            selected={
              personal.find((per) => per.station === station)?.endTime || ''
            }
            onSelect={(e) =>
              handleChangeWorker(e.target.value, station, 'endTime')
            }
          />
        </TimeWrapper>
      </InputWrapper>
    );
  });

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        Updates gespeichert
      </Modal>
      <Button
        style={{ width: '10rem', justifySelf: 'end' }}
        label="Updates Speichern"
        onClick={handleUpdate}
      />
      <Text style={{ marginBottom: '1rem' }} variant="headline">
        {concert.concert}
      </Text>
      {stationList}
      <Button label="Updates Speichern" onClick={handleUpdate} />
    </Wrapper>
  );
};

export default PersonalPlanEdit;
