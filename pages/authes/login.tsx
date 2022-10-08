import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { CustomLink, Text } from '../../components/text';
import { auth } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  row-gap: 1rem;
  justify-content: center;
  text-align: center;
`;

const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  useEffect(() => {
    auth.currentUser?.emailVerified && router.push('/home');
  }, []);

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, pw).then((cred) => {
      if (cred.user.emailVerified) {
        router.push('/home');
      }
      if (!cred.user.emailVerified) {
        sendEmailVerification(cred.user);
        setModal(true);
      }
    });
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        Scheinbar wurde deine E-Mail-Adresse noch nicht bestätigt. Wir haben dir
        erneut eine E-Mail gesendet
      </Modal>
      <>
        <Text variant="headline">Anmelden</Text>
        <Input
          type="text"
          label="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Passwort"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <Button
          label="Anmelden"
          onClick={handleSignin}
          disabled={pw.length <= 0 || email.length <= 0}
          style={{ width: '10rem', justifySelf: 'center' }}
        />
        <CustomLink variant="small" href="forgotPassword">
          Passwort vergessen
        </CustomLink>
      </>
    </Wrapper>
  );
};

export default LoginPage;
