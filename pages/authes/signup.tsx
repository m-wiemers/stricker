import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
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
  justify-items: center;
  row-gap: 0.5rem;
`;

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [secondPw, setSecondPw] = useState<string>('');
  const [firstError, setFirstError] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((cred) => {
        sendEmailVerification(cred.user);
        setModalMessage(
          'Prima! Das hat geklappt! Bitte bestätige deinen Zugang in der Email, die wir die gesendet haben'
        );
        setModal(true);
      })
      .catch((err) => {
        if (err.message.includes('auth/email-already-in-use'))
          setModalMessage('Die E-Mail scheint schon in verwendung zu sein...');
        setModal(true);
      });
  };

  const handleModalClick = () => {
    setModal(false);
    router.push('/');
  };

  const checkValidate = () => {
    if (pw.length < 6) {
      setFirstError('mindestens 6 Zeichen');
    }
    if (pw.length >= 6) {
      setFirstError('');
    }
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={handleModalClick}>
        {modalMessage}
      </Modal>
      <Text variant="headline">Konto erstellen</Text>
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
        onBlur={checkValidate}
        error={firstError !== ''}
        errorMessage={firstError}
      />
      <Input
        type="password"
        label="Passwort wiederholen"
        value={secondPw}
        onChange={(e) => setSecondPw(e.target.value)}
      />
      <Button
        label="Anmelden"
        onClick={handleSignup}
        disabled={pw !== secondPw || pw.length <= 6}
        style={{ width: '10rem' }}
      />
      <CustomLink variant="small" href="login">
        Schon ein Konto? Einloggen
      </CustomLink>
    </Wrapper>
  );
};

export default SignUpPage;
