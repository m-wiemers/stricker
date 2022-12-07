import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import { Text } from '../../components/text';
import { AuthContext } from '../../firebase/context';
import { getProfileById, Profile } from '../../helper/firebase/getProfile';
import { updateFBProfile } from '../../helper/firebase/updateProfile';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  display: grid;
  justify-content: center;
  border: 2px solid white;
  border-radius: 10px;
  padding: 0.5rem;
  box-shadow: 2px 2px 4px white;
`;

const ProfilePage = (): JSX.Element => {
  const { user, updateUserName } = useContext(AuthContext);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof user.uid !== undefined) {
      getProfileById({ id: user.uid }).then(setProfile);
    }
  }, [user]);

  if (!profile) {
    return (
      <Wrapper>
        <Text variant="headline">Loading...</Text>
      </Wrapper>
    );
  }

  const handleChange = (value: string, target: string) => {
    if (target === 'hourlyWage') {
      setProfile((olds) => ({ ...olds, ...{ hourlyWage: value } }));
    }
    if (target === 'userName') {
      setProfile((olds) => ({ ...olds, ...{ userName: value } }));
    }
  };

  const handleSubmit = () => {
    updateFBProfile({
      user: user,
      id: user.uid,
      userName: profile.userName,
      hourlyWage: profile.hourlyWage,
      handleThen: () => {
        setModal(true), updateUserName(profile.userName);
      },
    });
  };

  const handleModalClose = () => {
    setModal(false);
    router.push('/home');
  };

  return (
    <Wrapper>
      <Modal open={modal} onClick={handleModalClose}>
        Updates gespeichert
      </Modal>
      <Text variant="headline">Profil bearbeiten</Text>
      <InnerWrapper>
        <Input
          type="text"
          label="Nutzername"
          value={profile.userName}
          onChange={(e) => handleChange(e.target.value, 'userName')}
        />
        <Input
          type="number"
          label="Stundenlohn"
          style={{ width: '10rem', marginBottom: '1rem' }}
          value={profile.hourlyWage}
          onChange={(e) => handleChange(e.target.value, 'hourlyWage')}
        />
        <Button label="Speichern" onClick={handleSubmit} />
      </InnerWrapper>
    </Wrapper>
  );
};

export default ProfilePage;
