import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Dropdown from '../../components/dropdown';
import Modal from '../../components/modal';
import { Stations } from '../../components/stations';
import { Text } from '../../components/text';
import { WorkTimes } from '../../components/worktimes';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';
import { formatDate } from '../../helper/formatter';
import { ConcertProps } from '../concerts';

type Worker = {
  id: string;
  name: string;
  station: string;
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.5rem;
  width: 100%;
`;

const StationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid white;
`;

const Station = styled.p`
  width: 100%;
  font-weight: bold;
  color: blue;
  grid-column: 1/3;
  align-self: end;
`;

type PersonPlan = {
  name: string;
  station: string;
  startTime: string;
  endTime: string;
};

export async function getStaticProps() {
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

  const concertRef = await collection(db, 'concerts');
  const concertList = await getDocs(concertRef)
    .then((snapshot) => {
      const array: any = [];
      snapshot.docs.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      return array;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      workers,
      concertList,
    },
  };
}

const PersonalPlan = ({ workers, concertList }: any): JSX.Element => {
  const [selectedConcert, setSelectedConcert] = useState<string>('');
  const [personal, setPersonal] = useState<PersonPlan[]>([]);
  const concerts: ConcertProps[] = concertList;
  const personalList: Worker[] = workers;
  const [modal, setModal] = useState(false);
  const { user } = useContext(AuthContext);

  const concertDateList = concerts.map((concert) => {
    return `${concert.concertName} - ${formatDate(concert.date)}`;
  });

  useEffect(() => {
    setSelectedConcert(concertDateList[0]);
    const newList: PersonPlan[] = [];
    Stations.forEach((station) => {
      const name = personalList.find(
        (person) => person.station === station
      )?.name;
      if (name) {
        const newObject = {
          name: name,
          station: station,
          startTime: '18:00',
          endTime: 'Ende',
        };
        newList.push(newObject);
      } else {
        const newObject = {
          name: 'Keine Angabe',
          station: station,
          startTime: '18:00',
          endTime: 'Ende',
        };
        newList.push(newObject);
      }
      setPersonal(newList);
    });
  }, []);

  const handleChangeWorker = (value: string, station: string) => {
    const personalClone = [...personal];
    let person = personalClone.find((per) => per.station === station);
    if (person) {
      person.name = value;
    }
    setPersonal(personalClone);
  };

  const handleChangeStartTime = (value: string, station: string) => {
    const startTimeClone = [...personal];
    let person = startTimeClone.find((obj) => obj.station === station);
    if (person) {
      person.startTime = value;
    }
    setPersonal(startTimeClone);
  };

  const handleChangeEndTime = (value: string, station: string) => {
    const clone = [...personal];
    let person = clone.find((obj) => obj.station === station);
    if (person) {
      person.endTime = value;
    }
    setPersonal(clone);
  };

  const filteredStation = Stations.filter(
    (station) => station !== 'Kein Einsatzort'
  );

  const stationList = filteredStation.map((station, index) => {
    return (
      <StationWrapper key={index}>
        <Station>{station}</Station>
        <div style={{ gridColumn: '3/5' }}>
          <Dropdown
            label="Mitarbeiter"
            list={personalList.map((per) => per.name)}
            selected={
              personal.find((person) => person.station == station)?.name ||
              'Keine Angabe'
            }
            onSelect={(e) => handleChangeWorker(e.target.value, station)}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumn: '3/5',
          }}
        >
          <Dropdown
            label="von"
            list={WorkTimes}
            selected={
              personal.find((person) => person.station == station)?.startTime ||
              '18:00'
            }
            onSelect={(e) => handleChangeStartTime(e.target.value, station)}
            width="5rem"
          />
          <Dropdown
            label="bis"
            list={WorkTimes}
            selected={
              personal.find((person) => person.station == station)?.endTime ||
              'Ende'
            }
            onSelect={(e) => handleChangeEndTime(e.target.value, station)}
            width="5rem"
          />
        </div>
      </StationWrapper>
    );
  });

  const handleSubmit = () => {
    const filteredPersonal = personal.filter(
      (person) => person.name !== 'Keine Angabe'
    );
    const clone = [...filteredPersonal];
    clone.forEach((person) => {
      if (!person.startTime) {
        person.startTime = '18:00';
      }
      if (!person.endTime) {
        person.endTime = 'Ende';
      }
    });
    const workRef = collection(db, 'personalPlan');
    addDoc(workRef, { concert: selectedConcert, personal: clone })
      .then(() => setModal(true))
      .catch((err) => console.error(err.message));
  };

  return (
    <Wrapper>
      {user ? (
        <>
          <Text variant="headline">Personalplan erstellen</Text>
          <Dropdown
            label="Konzert auswählen"
            list={concertDateList}
            selected={selectedConcert}
            onSelect={(e) => setSelectedConcert(e.target.value)}
          />
          {stationList}
          <Modal open={modal} onClick={() => setModal(false)}>
            Personalplan wurde angelegt
          </Modal>
          <Button
            label="Personalplan speichern"
            style={{ width: '12rem' }}
            onClick={handleSubmit}
          />
        </>
      ) : (
        <Text variant="normal">Du bist nicht angemeldet</Text>
      )}
    </Wrapper>
  );
};

export default PersonalPlan;
