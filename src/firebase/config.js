import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBJVUZwD4RhMhjXTyVwTYiyYm27DbQCMjU",
  authDomain: "music-playlist-a6ee0.firebaseapp.com",
  projectId: "music-playlist-a6ee0",
  storageBucket: "music-playlist-a6ee0.appspot.com",
  messagingSenderId: "659211680554",
  appId: "1:659211680554:web:6240606bd609fdc5af3c53"
};

firebase.initializeApp(firebaseConfig)

const authService = firebase.auth()
const firestoreService = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { authService, firestoreService, timestamp }