import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Dropdown from '../../../components/dropdown';
import Modal from '../../../components/modal';
import { Stations } from '../../../helper/stations';
import { Text } from '../../../components/text';
import { WorkTimes } from '../../../components/worktimes';
import { getWorkers, Worker } from '../../../helper/firebase/getWorkers';
import {
  getPlanById,
  PersonalPlanProps,
} from '../../../helper/firebase/getPlan';
import { updatePersonalPlanToFB } from '../../../helper/firebase/writePersonalPlan';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getId = (): string => {
    const { id } = context.query;
    if (typeof id == 'string') {
      return id;
    } else {
      return 'no data';
    }
  };

  const data = await getPlanById({ id: getId() });

  const workers = await getWorkers({ unshift: true });

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
  const [concert, setConcert] = useState<PersonalPlanProps>(data);
  const [personal, setPersonal] = useState(concert.personal);
  const thisId = router.asPath.split('/').pop();
  const [modal, setModal] = useState<boolean>(false);

  console.log(concert);

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
    if (thisId) {
      updatePersonalPlanToFB({
        id: thisId,
        newConcert: concert,
        handleThen: () => setModal(true),
      });
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
              personal.find((per) => per.station === station)?.startTime ||
              '13:00'
            }
            onSelect={(e) =>
              handleChangeWorker(e.target.value, station, 'startTime')
            }
          />
          <Dropdown
            label="von"
            list={WorkTimes}
            selected={
              personal.find((per) => per.station === station)?.endTime ||
              '18:00'
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
