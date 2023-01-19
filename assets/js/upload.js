
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// https://console.firebase.google.com/u/0/project/toys-dfc40/database/toys-dfc40-default-rtdb/data/~2F

window.onload = function () {
    leaderBoard();
    abc();
};

document.addEventListener("DOMContentLoaded", function () {
    abc();
});

function upload() {

    var name = document.getElementById("name");
    var price = document.getElementById("price");
    var image = document.getElementById("image");

    //START auth signup with email and password
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            var userId = firebase.auth().currentUser.uid;

            // START db write new user data
            firebase.database().ref('users/' + userId).set({
                username: username.value,
                email: email.value,
                score: 0,
                img: 'https://firebasestorage.googleapis.com/v0/b/mathswin-c1317.appspot.com/o/images%2Fuser.png?alt=media&token=35202115-9f1e-4746-9024-9dd8bbc79bbd'
            }).catch((error) => {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
            // END db write new user data

            // call upload image function to upload profile picture
            // if user not selected a profile picture then it upload a default picture 
            if (profilepic != null || profilepic == 'undefined') {
                uploadimg(userId);
            }
            alert("Signed up successfully");
            // Sleep for the number of seconds until the upload image function compile
            sleep(4000).then(() => {
                window.location.href = "login.php";
            });
        }).catch((error) => {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    //END signup with email and password

}

function addData() {
    console.log('clicked');
    // var myRef = firebase.database().ref().push();
    // var key = myRef.key();
    var newProductKey = firebase.database().ref().child('products').push().key;
    var name = document.getElementById("pname");
    var price = document.getElementById("price");
    var image = document.getElementById("image");
    var category = document.getElementById("category");
    var date = new Date().toLocaleDateString();
    var keywords = document.getElementById("keywords");

    var newData = {
        id: newProductKey,
        name: name.value,
        category: category.value,
        price: price.value,
        image: 'https://firebasestorage.googleapis.com/v0/b/toys-dfc40.appspot.com/o/images%2FNo-Image-Placeholder.png?alt=media&token=50b9f39a-3bc5-46e8-9eba-0df8cbb372dd',
        date: date,
        keywords: keywords
    }
    console.log(newProductKey);
    firebase.database().ref('products/' + newProductKey).set(newData);

    uploadimg(newProductKey);

    // var postData = {
    //     author: username,
    //     uid: uid,
    //     body: body,
    //     title: title,
    //     starCount: 0,
    //     authorPic: picture
    //   };

    // // Get a key for a new Post.
    // var newPostKey = firebase.database().ref().child('products').push().key;

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    // updates['/posts/' + newPostKey] = newData;
    // updates['/user-posts/' + id + '/' + newPostKey] = newData;

    // console.log(firebase.database().ref().update(updates));

    // return firebase.database().ref().update(updates);

}

//upload images function
function uploadimg(uid) {

    var image = document.getElementById("image").files[0];
    // metadata [getting the type of the file]
    const metadata = {
        'contentType': image.type
    };

    // START storage on complete
    firebase.storage().ref().child('images/' + uid).put(image, metadata)
        .then((snapshot) => {
            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            console.log('File metadata:', snapshot.metadata);

            // Obtain a download URL for the file.
            snapshot.ref.getDownloadURL().then((url) => {
                console.log('File available at', url);

                db.ref('products/' + uid).update({
                    image: url
                }).catch((error) => {
                    // An error happened.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                });

                // store profile picture url to cookies
                // var imgURL = url.replace('https://firebasestorage.googleapis.com/v0/b/mathswin-c1317.appspot.com/o/images%2F', ' ')
                // document.cookie = "propic=" + imgURL;

            });
        }).catch((error) => {
            // An error happened.
            console.error('Upload failed', error);
        });
    // END storage on complete.
    var bool = 'true';
}


function leaderBoard() {
    $('#printlist').empty();
    // Obtain user data(user name, score, profile picture url) from the database in ascending order by score
    try {
        db.ref("products").orderByChild("price").on("child_added", snapshot => {
            if (snapshot.exists()) {
                var score = (snapshot.val() && snapshot.val().price);
                var userName = (snapshot.val() && snapshot.val().name);
                var imgURL = (snapshot.val() && snapshot.val().image);

                console.log(score);
                console.log(userName);
                console.log(imgURL);
                //make leader board using little jquery code
                var edata = '';

                edata += '<li class="list-group-item d-flex justify-content-between">';
                edata += '<img class="prof img-circle" src="' + imgURL + '" alt="">';
                edata += userName;
                edata += '<span class="badge badge-primary badge-pill">' + score + '</span>';
                edata += '</li>';
                // use prepend to show data in revers order
                $('#printlist').prepend(edata);
            } else {
                console.log("No data available");
            }
        })
    } catch (error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }
    console.log('scores');
}

function abc() {
    console.log('cmcaslkjcnascnac')
}

abc();