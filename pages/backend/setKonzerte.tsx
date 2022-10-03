import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import AddBandForm, { BandProps } from '../../components/addBandForms';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { Text } from '../../components/text';
import { db } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const Concerts = (): JSX.Element => {
  const [date, setDate] = useState<string>('2022-10-01');
  const [bands, setBands] = useState<BandProps[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

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
        const startTimeClone = [...bands];
        startTimeClone[index].startTime = value;
        setBands(startTimeClone);
        break;

      case 'endtime':
        const endTimeClone = [...bands];
        endTimeClone[index].endTime = value;
        setBands(endTimeClone);
        break;

      case 'pause':
        const pauseClone = [...bands];
        pauseClone[index].pause = +value;
        setBands(pauseClone);
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

  const addNewConcert = () => {
    if (!bands.length) {
      setModalMessage('Ein Konzert ohne eine Band? Das bringt nichts');
      setModal(true);
      return;
    }

    const workRef = collection(db, 'concerts');
    addDoc(workRef, { date: date, bands: bands })
      .then(() => {
        setModalMessage('Konzert wurde gespeichert!');
        setModal(true);
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        {modalMessage}
      </Modal>
      <Text variant="headline">Neues Konzert anlegen</Text>
      <Input
        type="date"
        label="Datum"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {BandForm}
      <Button
        label="+ Band hinzufügen"
        onClick={handleAddBand}
        style={{ width: '50%', marginBottom: '2rem', justifySelf: 'center' }}
      />
      <Button label="Konzert Speichern" onClick={addNewConcert} />
    </Wrapper>
  );
};

export default Concerts;
