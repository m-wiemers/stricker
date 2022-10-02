import { useState } from 'react';
import styled from 'styled-components';
import AddBandForm, { BandProps } from '../../components/addBandForms';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Text } from '../../components/text';

type concertProps = {
  date: string;
  bands: [
    {
      name: string;
      startTime: string;
      endTime: string;
      pause?: {
        isPause: boolean;
        minutes: number;
      };
    }
  ];
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const Concerts = (): JSX.Element => {
  const [date, setDate] = useState<string>('2022-10-01');
  const [bands, setBands] = useState<BandProps[]>([]);

  const handleAddBand = () => {
    setBands([
      ...bands,
      { bandName: '', startTime: '', endTime: '', pause: 0 },
    ]);
  };

  const handleDeleteBand = (index: number) => {
    const bandClone = [...bands];
    bandClone.splice(index, 1);
    setBands(bandClone);
  };

  const handleChange = (value: string, fildName: string, index: number) => {
    switch (fildName) {
      case 'bandname':
        const bandNameClone = [...bands];
        bandNameClone[index].bandName = value;
        setBands(bandNameClone);
        break;

      case 'starttime':
        const clone = [...bands];
        clone[index].startTime = value;
        setBands(clone);
        break;
    }
  };

  const BandForm = bands.map((el, index) => (
    <AddBandForm
      key={index}
      bandName={el.bandName}
      startTime={el.startTime}
      endTime={el.endTime}
      onChangeBandName={(e) => handleChange(e.target.value, 'bandname', index)}
      onChangeStartTime={(e) =>
        handleChange(e.target.value, 'starttime', index)
      }
      onChangeEndTime={(e) => handleChange(e.target.value, 'endtime', index)}
      onChangePause={(e) => handleChange(e.target.value, 'pause', index)}
      onDeleteBand={() => handleDeleteBand(index)}
    />
  ));

  return (
    <Wrapper>
      <Text variant="headline">Neues Konzert anlegen</Text>
      <Input
        type="date"
        label="Datum"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {BandForm}
      <Button label="Band hinzufügen" onClick={handleAddBand} />
      <Button label="Konzert Speichern" onClick={() => console.log(bands)} />
    </Wrapper>
  );
};

export default Concerts;
