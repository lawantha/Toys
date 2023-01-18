//get data:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function display(data, cat) {
    const catt = cat;
    console.log(data.catt);
    var product = `<div class="card">
    <img loading="lazy" class="card-img-top" src="${data.image}"
        alt="${data.name} image">
    <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="price">${data.price}/=</p>
    </div>
    <button class="buy">
        <a>Add to cart</a>
    </button>
</div>`;
    document.querySelector('#products').innerHTML += product;
}

var dt;
function getData(category) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            Object.keys(JSON.parse(xhr.responseText)).forEach(function (key) {
                console.log(JSON.parse(xhr.responseText)[key]);
                // document.querySelector('#products').innerHTML += display(JSON.parse(xhr.responseText)[key]);
                dt += (JSON.parse(xhr.responseText)[key].name);
                display(JSON.parse(xhr.responseText)[key], '');
            });
        }
    }

    xhr.open('get', 'https://toys-dfc40-default-rtdb.firebaseio.com/products.json');
    xhr.send();
}

getData('');


//navbar:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
    $("#navbar-placeholder").load("./components/nav.html");
});

//footer:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function () {
    $("#footer-placeholder").load("./components/footer.html");
});


//search:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    alert(inputValue);
});


// catedory:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function clicked(clicked_id) {
    // alert(clicked_id);
    console.log(dt);
}

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
