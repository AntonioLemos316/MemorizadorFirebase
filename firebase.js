import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCipACQT6hYYOdatJJR6xdscJlgJfBvHW8",
    authDomain: "memorizador-632ce.firebaseapp.com",
    projectId: "memorizador-632ce",
    storageBucket: "memorizador-632ce.appspot.com",
    messagingSenderId: "914772108932",
    appId: "1:914772108932:web:d3625065609a083a3304d1"
  };

if(!firebase.apps.length){
    console.log(`Conectando...${firebase.apps.length}`)
    firebase.initializeApp(firebaseConfig)
    console.log(`Ok conectado!${firebase.apps.length}`)
}

export default firebase