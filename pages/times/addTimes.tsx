import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { Text } from '../../components/text';
import TimeInput from '../../components/TimeInput';
import { AuthContext } from '../../firebase/context';
import { DateToString } from '../../helper/dateToString';
import getTimeBetween from '../../helper/getTimeBetween';
import {
  addTimesToFB,
  updateTimesToFB,
} from '../../helper/firebase/writeTimes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getTimesById, TimeProps } from '../../helper/firebase/getTimes';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, user } = context.query;

  let currentTimes = null;
  if (typeof id == 'string' && typeof user == 'string') {
    currentTimes = await getTimesById({ userId: user, id: id });
  }

  return {
    props: {
      currentTimes,
    },
  };
};

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

const AddTimePage = ({
  currentTimes,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const day: TimeProps | null = currentTimes ? currentTimes.times : null;
  const id = currentTimes ? currentTimes.id : null;
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(day ? day.date : today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>(
    day ? day.startTime : '18:00'
  );
  const [endTime, setEndTime] = useState<`${string}:${string}`>(
    day ? day.endTime : '23:45'
  );
  const [duration, setDuration] = useState<string>(day ? day.duration : '');
  const [modal, setModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(
    day ? day.submitted : false
  );
  const [mustSubmitted, setMustSubmitted] = useState<boolean>(
    day ? day.paid : false
  );
  const [paid, setPaid] = useState<boolean>(day ? day.paid : false);

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

  const handleSubmit = () => {
    if (day)
      updateTimesToFB({
        userId: user.uid,
        docId: id,
        date,
        startTime,
        endTime,
        duration,
        submitted,
        paid,
        handleThen: () => setModal(true),
      });
    if (!day)
      addTimesToFB({
        userId: user.uid,
        date,
        startTime,
        endTime,
        duration,
        submitted,
        paid,
        handleThen: () => setModal(true),
      });
  };

  const handleModalClose = () => {
    if (day) {
      router.push(`/times?user=${user.uid}`);
    } else {
      setModal(false);
      setDate(today);
      setStartTime('18:00');
      setEndTime('23:45');
      setSubmitted(false);
      setPaid(false);
    }
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
          readOnly
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
        <Button
          label={day ? 'Update Speichern' : 'Speichern'}
          onClick={handleSubmit}
        />
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;
