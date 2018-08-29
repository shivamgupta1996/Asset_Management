import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAfaNXvqqWiKhdqRylLzVhE5jJe1g_-6zo",
    authDomain: "assetmanagement-b614f.firebaseapp.com",
    databaseURL: "https://assetmanagement-b614f.firebaseio.com",
    projectId: "assetmanagement-b614f",
    storageBucket: "",
    messagingSenderId: "801934827459"
  };

export const firebaseApp = firebase.initializeApp(config);
export const requestRef = firebase.database().ref('Requests');
export const assetRef = firebase.database().ref('Assets');
