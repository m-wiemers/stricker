import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/modal';
import { CustomLink, Text } from '../components/text';
import { auth } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 1rem;
  text-align: center;
`;

const InnerWrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.7rem;
`;

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [userIsVerified, setUserIsVerified] = useState<boolean>();
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, pw).then((cred) => {
      if (cred.user.emailVerified) {
        setUserIsVerified(true);
      }
      if (!cred.user.emailVerified) {
        setModalMessage(
          'Deine Email-Adresse wurde noch nicht bestätigt. Wir senden dir die Email gleich erneut'
        );
        sendEmailVerification(cred.user);
        setModal(true);
      }
    });
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={() => setModal(false)}>
        {modalMessage}
      </Modal>
      {!userIsVerified ? (
        <>
          <Text variant="headline">WILLKOMMEN</Text>
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
          />
          <CustomLink variant="small" href="authes/forgotPassword">
            Passwort vergessen
          </CustomLink>
        </>
      ) : (
        <>
          <p>Du bist angemeldet mit der E-Mail-Adresse {}</p>
          <InnerWrapper>
            <Button
              label="Zum Personalplan"
              onClick={() => router.push('personal')}
            />
            <Button label="Logout" onClick={() => auth.signOut()} />
          </InnerWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
