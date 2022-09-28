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

const writeWorker = (name) => {
  firebase.database().ref('workers/').set({ name: name });
};

const addWorker = (id, name) => {
  firebase
    .database()
    .ref('workers/' + name)
    .set(id);
};

addWorker(5342, 'Micha');

export { app, auth, writeWorker };
