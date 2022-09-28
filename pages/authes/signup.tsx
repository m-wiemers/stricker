import { pseudoRandomBytes } from 'crypto';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { auth } from '../../firebase';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 0.5rem;
`;

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [secondPw, setSecondPw] = useState<string>('');
  const [firstError, setFirstError] = useState<string>('');

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredentials: any) => {
        const user = userCredentials.user;
        user?.sendEmailVerification();
        {
          user &&
            alert(
              `Danke! Bitte Bestätige deine Email-Adresse mit der Email, die wir dir gesendet haben an: ${user.email}`
            );
        }
      })
      .catch((error: any) => alert(error.message));
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
      <p>Konto erstellen</p>
      <Input
        type="text"
        label="E-Mail-Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="passwort"
        label="Passwort"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onBlur={checkValidate}
        error={firstError !== ''}
        errorMessage={firstError}
      />
      <Input
        type="passwort"
        label="Passwort wiederholen"
        value={secondPw}
        onChange={(e) => setSecondPw(e.target.value)}
      />
      <Button
        label="Anmelden"
        onClick={handleSignup}
        disabled={pw !== secondPw || pw.length <= 6}
      />
    </Wrapper>
  );
};

export default SignUpPage;
