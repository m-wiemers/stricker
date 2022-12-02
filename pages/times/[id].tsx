import { collection, getDocs, query, where } from 'firebase/firestore';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { Text } from '../../components/text';
import TimeInput from '../../components/TimeInput';
import { Times } from '../../components/TimesCard';
import { db } from '../../firebase';
import { AuthContext } from '../../firebase/context';
import getTimeBetween from '../../helper/getTimeBetween';
import { updateTimesToFB } from '../../helper/writeToFB';

export async function getServerSideProps(context: any) {
  const { user, id } = context.query;

  const timesRef = collection(db, 'users', user, 'times');
  const q = query(timesRef, where('__name__', '==', id));
  const currentTimes = await getDocs(q)
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
      currentTimes,
    },
  };
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  max-width: 420px;
  min-width: 420px;
  border: 2px solid white;
  border-radius: 10px;
  display: grid;
  justify-content: center;
  padding: 0.5rem;
`;

const TimeInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
`;

const TimeEdit = ({
  currentTimes,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const day: Times = currentTimes[0];
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(day.date);
  const [startTime, setStartTime] = useState<`${string}:${string}`>(
    day.startTime
  );
  const [endTime, setEndTime] = useState<`${string}:${string}`>(day.endTime);
  const [duration, setDuration] = useState<string>(day.duration);
  const [modal, setModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(day.submitted);
  const [mustSubmitted, setMustSubmitted] = useState<boolean>(day.paid);
  const [paid, setPaid] = useState<boolean>(day.paid);

  useEffect(() => {
    if (paid) {
      setSubmitted(true);
      setMustSubmitted(true);
    } else {
      setMustSubmitted(false);
    }
  }, [paid]);

  useEffect(() => {
    setDuration(getTimeBetween({ endTime, startTime, date }));
  }, [startTime, endTime, date]);

  const handleModalClose = () => {
    setModal(false);
    router.push(`/times?user=${user.uid}`);
  };

  const handleChange = (value: string, target: string, time: string) => {
    if (target === 'hour') {
      if (time == 'start') {
        setStartTime(`${value}:${startTime.split(':').pop()}`);
      }
      if (time == 'end') {
        setEndTime(`${value}:${endTime.split(':').pop()}`);
      }
    }

    if (target === 'minute') {
      if (time === 'start') {
        setStartTime(`${startTime.slice(0, 2)}:${value}`);
      }
      if (time === 'end') {
        setEndTime(`${endTime.slice(0, 2)}:${value}`);
      }
    }
  };

  const handleUpdate = () => {
    updateTimesToFB({
      userId: user.uid,
      docId: day.id,
      date,
      startTime,
      endTime,
      duration,
      submitted,
      paid,
      handleThen: () => setModal(true),
    });
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={handleModalClose}>
        Zeiten gespeichert
      </Modal>
      <InnerWrapper>
        <Input
          type="text"
          label="Name"
          placeholder="Arnold"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TimeInputWrapper>
          <TimeInput
            label="Start"
            value={startTime}
            handleChange={(val, target) => handleChange(val, target, 'start')}
          />
          <TimeInput
            label="Ende"
            value={endTime}
            handleChange={(val, target) => handleChange(val, target, 'end')}
          />
          <Input
            type="checkbox"
            label="Eingereicht"
            checked={submitted}
            onChange={() => setSubmitted(!submitted)}
            disabled={mustSubmitted}
          />
          <Input
            type="checkbox"
            label="Ausgezahlt"
            checked={paid}
            onChange={() => setPaid(!paid)}
          />
        </TimeInputWrapper>
        <Text variant="normal">Du hast {duration} h gearbeitet</Text>
        <Button label="Speichern" onClick={handleUpdate} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default TimeEdit;
