import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ID,
};

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth(app);

const writeWorker = (name, station) => {
  firebase
    .database()
    .ref('workers/' + name)
    .set({ name: name, station: station });
};

const loadWorkers = () => {
  const dpRef = firebase.database().ref();
  dpRef
    .child('workers')
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((err) => console.error(err));
};

export { app, auth, writeWorker, loadWorkers };
