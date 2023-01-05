import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyD_LiOs2HQLTqINAmTZSL8d5xy8myPucHY",
    authDomain: "test005-aae8f.firebaseapp.com",
    projectId: "test005-aae8f",
    storageBucket: "test005-aae8f.appspot.com",
    messagingSenderId: "703387294230",
    appId: "1:703387294230:web:78120c44075c18455b3337",
    measurementId: "G-P2E6530VSP"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}