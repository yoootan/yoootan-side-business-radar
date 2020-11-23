import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueFire)

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCCQSChW64PqQ9Kq6rGEqmoxELHt1dDSOM",
    authDomain: "side-business-radar.firebaseapp.com",
    databaseURL: "https://side-business-radar.firebaseio.com",
    projectId: "side-business-radar",
    storageBucket: "side-business-radar.appspot.com",
    messagingSenderId: "89073779892",
    appId: "1:89073779892:web:85ea9ccd458ffd7d1743e1",
    measurementId: "G-GZYZJ3QQLF"


});

export const db = firebaseApp.firestore();