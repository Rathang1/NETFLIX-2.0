import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRBVqY-_DzOHtSMSrK6iAnN1yZyg7w2Ac",
    authDomain: "netflix-clone-6b066.firebaseapp.com",
    projectId: "netflix-clone-6b066",
    storageBucket: "netflix-clone-6b066.appspot.com",
    messagingSenderId: "561451384634",
    appId: "1:561451384634:web:1d7d4066c9113337b4da03"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth};
  export default db; 