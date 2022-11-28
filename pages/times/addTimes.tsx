import { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import TimeInput from '../../components/TimeInput';
import { AuthContext } from '../../firebase/context';
import { DateToString } from '../../helper/dateToString';

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
`;

const TimeInputWrapper = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const AddTimePage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>(user.displayName || '');
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>('18:00');
  const [endTime, setEndTime] = useState<`${string}:${string}`>('23:45');

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

  return (
    <Wrapper>
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
        </TimeInputWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;
