//get data:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function display(data) {
    $('#products').empty();
    data.forEach((data) => {
        var product = `<div class="card">
    <img loading="lazy" class="card-img-top" src="${data.image}"
        alt="${data.name} image">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="price">${data.price}/=</p>
    </div>
    <button class="buy" id="${data.id}" onclick="addToCart(this.id)">
        <a>Add to cart</a>
    </button>
</div>`;
        document.querySelector('#products').innerHTML += product;
    });

}

function displayProductCarousel(data) {
    $('#ProductCarousel').empty();
    // console.log(data);
    data.forEach((data) => {
        var product = `<div class="card">
                    <img loading="lazy" class="card-img-top" src="${data.image}"
                        alt="${data.name} image">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="price">${data.price}/=</p>
                    </div>
                    <button class="buy" id="${data.id}" onclick="addToCart(this.id)">
        <a>Add to cart</a>
    </button>
                </div>`;
        document.querySelector('#ProductCarousel').innerHTML += product;
    });
}

var newObject = [];

async function getData() {
    let myPromise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'https://toys-dfc40-default-rtdb.firebaseio.com/products.json');
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Object.keys(JSON.parse(xhr.responseText)).forEach(function (key) {
                    // console.log(JSON.parse(xhr.responseText)[key]);
                    // document.querySelector('#products').innerHTML += display(JSON.parse(xhr.responseText)[key]);
                    newObject.push(JSON.parse(xhr.responseText)[key]);
                    // display(JSON.parse(xhr.responseText)[key]);
                })
                resolve(newObject);
            } else {
                reject("database not found");
            }
        };
        xhr.send();
    });
    // data = localStorage.setItem('products', JSON.stringify(data));
    localStorage.setItem('products', JSON.stringify(await myPromise));
    display(await myPromise);
}

ProductCarousel();
getData();

// async function localData() {
//     await getData();
//     console.log(JSON.parse(localStorage.getItem("products")) || []);
// }

function ProductCarousel() {
    let data = JSON.parse(localStorage.getItem("products")) || [];
    if (data.length > 0) {
        let sortedData = data.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
        let firstTenData = sortedData.slice(0, 10);
        displayProductCarousel(firstTenData);
    }
}

// catedory:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function clicked(category) {
    // alert(category);
    let data = JSON.parse(localStorage.getItem("products")) || [];
    let filteredData = data.filter(item => item.category === category);
    display(filteredData);
    location.hash = "#products";
    document.querySelector(`#products`).scrollIntoView({ behavior: 'smooth' });
}


//search:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    let data = JSON.parse(localStorage.getItem("products")) || [];
    display(searchJSON(data, inputValue));
    location.hash = "#products";
    document.querySelector(`#products`).scrollIntoView({ behavior: 'smooth' });
});

function searchJSON(data, searchTerm, filter = {}) {
    return data
        .filter(item => {
            for (const [key, value] of Object.entries(item)) {
                if (
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return true;
                } else if (typeof value === "object") {
                    return searchJSON(value, searchTerm, filter);
                }
            }
            return false;
        })
        .filter(item => {
            if (Object.keys(filter).length === 0) return true; // check if filter object is passed
            for (const [key, values] of Object.entries(filter)) {
                if (!values.includes(item[key])) {
                    return false;
                }
            }
            return true;
        });
}

// const firebaseConfig = {
//     apiKey: "AIzaSyB96p2w4nMX_atUqXQ4GsjwyHtgwQPwv8k",
//     authDomain: "toys-dfc40.firebaseapp.com",
//     projectId: "toys-dfc40",
//     storageBucket: "toys-dfc40.appspot.com",
//     messagingSenderId: "731040380978",
//     appId: "1:731040380978:web:fa68867aa439464160242b",
//     measurementId: "G-NHV8CQ7BF1"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // START db_get_reference
// var db = firebase.database();
// // START db_get_reference
// var storage = firebase.storage();


// async function getProduct() {
//     $('#products').empty();
//     let newObject = [];
//     try {
//         const snapshot = await firebase.database().ref("products").orderByChild("date").once('value');
//         if (snapshot.exists()) {
//             snapshot.forEach(childSnapshot => {
//                 let data = {
//                     name: childSnapshot.val().name,
//                     price: childSnapshot.val().price,
//                     image: childSnapshot.val().image,
//                     category: childSnapshot.val().category
//                 }
//                 newObject.push(data);
//                 display(data);
//             });
//         } else {
//             console.log("No data available");
//         }
//     } catch (error) {
//         // An error happened.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorMessage);
//     }
//     return newObject;
// }




//navbar:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
    $("#navbar-placeholder").load("./components/nav.html");
});

//footer:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
    $("#footer-placeholder").load("./components/footer.html");
});

// carousel:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(".carousel").swipe({

    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');

    },
    allowPageScroll: "vertical"

});


$(".featured-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    dots: false,
    lazyLoad: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    margin: 10,
    // autoWidth: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: true
        }
    }
});


// cart :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

let cart = [];

// function addToCart(item) {
//     cart.push(item);
//     localStorage.setItem("cart", JSON.stringify(cart));
// }
async function addToCart(item) {
    let myPromise = new Promise(function (resolve) {
        let req = new XMLHttpRequest();
        req.open('get', `https://toys-dfc40-default-rtdb.firebaseio.com/products/${item}.json`);
        req.onload = function () {
            if (req.readyState === 4 && req.status === 200) {
                // console.log(req.responseText);
                // console.log(JSON.parse(req.responseText));
                // console.log(req.response);
                resolve(JSON.parse(req.responseText));
            } else {
                resolve("file not found");
            }
        };
        req.send();
    });
    cart.push(await myPromise);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(item) {
    let index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function getTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
}

function getCart() {
    display(cart);
    // return cart;
}


//retrieving data from local storage
let storedCart = JSON.parse(localStorage.getItem("cart")) || [];
if (storedCart.length > 0) {
    cart = storedCart;
}

// filter එකයි cart එකයි ඉතුරුයි.