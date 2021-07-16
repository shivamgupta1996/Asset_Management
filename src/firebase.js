import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBMY5levS0aLYcSwhx-03YamIq5p7BnLdw",
    authDomain: "asset-management-system-96443.firebaseapp.com",
    projectId: "asset-management-system-96443",
    storageBucket: "asset-management-system-96443.appspot.com",
    messagingSenderId: "779124622979",
    appId: "1:779124622979:web:b8221fdd333bf8d2c43db6",
    measurementId: "G-ED55WBP03X",
    databaseURL: "https://asset-management-system-96443-default-rtdb.firebaseio.com/"
  };

export const firebaseApp = firebase.initializeApp(config);
export const requestRef = firebase.database().ref('Requests');
export const assetRef = firebase.database().ref('Assets');
