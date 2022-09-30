import { useState } from 'react';
import AddWorkerModal from '../components/AddWorkerModal';
import { Text } from '../components/text';

const Workers = (): JSX.Element => {
  const [workers, setWorkers] = useState({});

  return (
    <>
      <Text variant="normal">hey</Text>
      <AddWorkerModal open={false} />
    </>
  );
};

export default Workers;
