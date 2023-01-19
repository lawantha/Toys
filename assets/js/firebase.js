const firebaseConfig = {
    apiKey: "AIzaSyB96p2w4nMX_atUqXQ4GsjwyHtgwQPwv8k",
    authDomain: "toys-dfc40.firebaseapp.com",
    projectId: "toys-dfc40",
    storageBucket: "toys-dfc40.appspot.com",
    messagingSenderId: "731040380978",
    appId: "1:731040380978:web:fa68867aa439464160242b",
    measurementId: "G-NHV8CQ7BF1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// START db_get_reference
var db = firebase.database();
// START db_get_reference
var storage = firebase.storage();

