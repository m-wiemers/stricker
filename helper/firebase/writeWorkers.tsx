import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Worker } from './getWorkers';

type Props = {
  name: string;
  station: string;
  handleThen?: () => void;
};

const addWorkerToFB = ({ name, station, handleThen }: Props) => {
  const workRef = collection(db, 'workers');
  addDoc(workRef, { name, station })
    .then(handleThen)
    .catch((err) => console.error(err.message));
};

type UpdateWorkersProps = {
  newWorkers: Worker[];
  initialWorkers: Worker[];
  handleThen?: () => void;
};

const updateWorkerToFB = ({
  newWorkers,
  initialWorkers,
  handleThen,
}: UpdateWorkersProps) => {
  newWorkers.forEach((worker) => {
    const newWorker = initialWorkers.find((el) => el.id == worker.id);
    if (newWorker) {
      const workersRef = doc(db, 'workers', newWorker.id);
      updateDoc(workersRef, { station: newWorker.station })
        .then(handleThen)
        .catch((err) => console.error(err.message));
    }
  });
};

export { addWorkerToFB, updateWorkerToFB };
