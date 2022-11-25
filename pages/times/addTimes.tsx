import { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import TimeInput from '../../components/TimeInput';
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

const AddTimePage = (): JSX.Element => {
  const today = DateToString({ today: true });
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<`${string}:${string}`>('18:00');

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
        <TimeInput defaultValue={startTime} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default AddTimePage;
