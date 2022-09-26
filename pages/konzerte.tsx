import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const Concerts = (): JSX.Element => {
  const [date, setDate] = useState<string>();
  const [startHour, setStartHour] = useState<number>();

  return (
    <>
      <Input
        type="date"
        label="Datum"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        placeholder="10"
        type="number"
        label="Std."
        value={startHour}
        onChange={(e) => setStartHour(+e.target.value)}
      />
      <Button label="Speichern" onClick={() => console.log('hey')} />
    </>
  );
};

export default Concerts;
