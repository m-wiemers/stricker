import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

export type BandProps = {
  bandName: string;
  startTime?: string;
  endTime?: string;
  pause?: number;
};

type BandVoids = {
  onChangeBandName: (e: any) => void;
  onChangeStartTime?: (e: any) => void;
  onChangeEndTime?: (e: any) => void;
  onChangePause?: (e: any) => void;
  onDeleteBand: (index: number) => void;
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const AddBandForm = ({
  bandName,
  onChangeBandName,
  startTime,
  onChangeStartTime,
  endTime,
  onChangeEndTime,
  pause,
  onChangePause,
  onDeleteBand,
}: BandProps & BandVoids): JSX.Element => {
  const [isPause, setIsPause] = useState<boolean>(false);

  return (
    <Wrapper>
      <Input
        type="text"
        label="Bandname"
        placeholder="Julian`s Schlagertrupp"
        value={bandName}
        onChange={onChangeBandName}
      />
      <Input
        type="text"
        label="Uhrzeit von"
        placeholder="18:00"
        value={startTime}
        onChange={onChangeStartTime}
      />
      <Input
        type="text"
        label="bis"
        placeholder="19:00"
        value={endTime}
        onChange={onChangeEndTime}
      />
      <Input
        type="checkbox"
        label="Pause danach?"
        checked={isPause}
        onChange={() => setIsPause(!isPause)}
      />
      {isPause && (
        <Input
          type="number"
          label="Minuten"
          placeholder="15"
          value={pause}
          onChange={onChangePause}
        />
      )}
      <Button label="Band löschen" onClick={onDeleteBand} />
    </Wrapper>
  );
};

export default AddBandForm;
