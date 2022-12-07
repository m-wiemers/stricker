import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getProfileById } from '../helper/firebase/getProfile';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const userId = auth.currentUser?.uid;

  const updateUserName = (value) => {
    setUserName(value);
  };

  useEffect(() => {
    if (userId) {
      getProfileById({ id: userId }).then((snap) => setUserName(snap.userName));
    }
  }, [userId]);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userName, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
