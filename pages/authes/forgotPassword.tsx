import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { CustomLink, Text } from '../../components/text';
import { auth } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 1rem;
  text-align: center;
`;

const ForgotPassword = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const modalMessage = `Wir haben dir eine E-Mail an ${email} gesendet`;

  const handlePasswortReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => setOpenModal(true))
      .catch((err) => console.log(err.message));

    setTimeout(() => router.push('/authes/login'), 5000);
  };

  return (
    <Wrapper>
      <Modal open={openModal} onClick={() => setOpenModal(false)}>
        {modalMessage}
      </Modal>
      <Text variant="normal" marginBottom="1.5rem">
        Passwort vergessen?
      </Text>
      <Input
        label="E-Mail-Adresse"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        label="Absenden"
        disabled={email.length <= 0}
        onClick={handlePasswortReset}
      />
      <CustomLink variant="small" href={'/authes/login'}>
        zurück zur Anmeldung
      </CustomLink>
    </Wrapper>
  );
};

export default ForgotPassword;
