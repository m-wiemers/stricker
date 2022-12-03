import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import AddBandForm from '../../../components/addBandForms';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Modal from '../../../components/modal';
import { Text } from '../../../components/text';
import { getConcertById } from '../../../helper/firebase/getConcert';
import { updateConcertToFB } from '../../../helper/firebase/writeConcert';
import { ConcertProps } from '../../concerts';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getId = (): string => {
    const { id } = context.query;
    if (typeof id == 'string') {
      return id;
    } else {
      return 'no data';
    }
  };

  const data = await getConcertById({ id: getId() });

  return {
    props: {
      data,
    },
  };
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

const BandsWrapper = styled.div`
  width: 350px;
`;

const ConcertDetailPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  const thisId = router.asPath.split('/').pop();
  const [concert, setConcert] = useState<ConcertProps>(data);
  const [modal, setModal] = useState<boolean>(false);

  const handleChangeBandProps = (
    value: string,
    target: string,
    index: number
  ) => {
    if (concert) {
      const clone = { ...concert };
      switch (target) {
        case 'bandName':
          clone.bands[index].bandName = value;
          setConcert(clone);
          break;
        case 'endTime':
          clone.bands[index].endTime = value;
          setConcert(clone);
          break;
        case 'startTime':
          clone.bands[index].startTime = value;
          setConcert(clone);
          break;
        case 'pause':
          clone.bands[index].pause = +value;
          setConcert(clone);
          break;
      }
    }
  };

  const handleChangeConcert = (value: string, target: string) => {
    if (concert) {
      const clone = { ...concert };
      switch (target) {
        case 'name':
          clone.concertName = value;
          setConcert(clone);
          break;
        case 'date':
          clone.date = value;
          setConcert(clone);
          break;
      }
    }
  };

  const handleDeleteBand = (index: number) => {
    if (concert) {
      const bandClone = { ...concert };
      bandClone.bands.splice(index, 1);
      setConcert(bandClone);
    }
  };

  const handleNewBand = () => {
    if (concert) {
      const bandClone = { ...concert };
      bandClone.bands.push({
        bandName: '',
        startTime: '',
        endTime: '',
        pause: 0,
      });
      setConcert(bandClone);
    }
  };

  const handleUpdateFirebase = () => {
    if (thisId) {
      updateConcertToFB({
        id: thisId,
        date: concert.date,
        concertName: concert.concertName,
        bands: concert.bands,
        handleThen: () => setModal(true),
      });
    }
  };

  const mappedBands = concert?.bands.map((band, index) => {
    return (
      <AddBandForm
        key={index}
        bandName={band.bandName}
        startTime={band.startTime}
        endTime={band.endTime}
        pause={band.pause}
        onChangeBandName={(e) =>
          handleChangeBandProps(e.target.value, 'bandName', index)
        }
        onChangeEndTime={(e) =>
          handleChangeBandProps(e.target.value, 'endTime', index)
        }
        onChangePause={(e) =>
          handleChangeBandProps(e.target.value, 'pause', index)
        }
        onChangeStartTime={(e) =>
          handleChangeBandProps(e.target.value, 'startTime', index)
        }
        onDeleteBand={() => handleDeleteBand(index)}
      />
    );
  });

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        Updates gepeichert
      </Modal>
      <Text variant="headline">Konzert bearbeiten</Text>
      <Input
        label="Konzertname"
        type="text"
        value={concert?.concertName}
        onChange={(e) => handleChangeConcert(e.target.value, 'name')}
      />
      <Input
        label="datum"
        type="date"
        value={concert?.date}
        onChange={(e) => handleChangeConcert(e.target.value, 'date')}
      />
      <BandsWrapper>{mappedBands}</BandsWrapper>
      <Button
        label="Neue Band hinzufügen"
        onClick={handleNewBand}
        style={{ marginBottom: '1rem', width: '50%', justifySelf: 'center' }}
      />
      <Button label="Updates speichern" onClick={handleUpdateFirebase} />
    </Wrapper>
  );
};

export default ConcertDetailPage;
