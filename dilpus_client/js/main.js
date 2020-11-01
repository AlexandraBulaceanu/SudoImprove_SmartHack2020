// Elements
const nameElement = document.getElementById('userNameOrEmail')
const addProduct = document.getElementById('addItProduct')
const addProductForm = document.getElementById('addProductForm')

// Constants
const BASE_URL = 'http://localhost:8080'

// ---- Functions ----
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// Geting UID from indexedDB
var uid = 'guest'
var mail = 'mail' 
var objectStore
const request = window.indexedDB.open('firebaseLocalStorageDb')

request.onerror = function (event) {
    console.err('Event fething indexDB', event)
};

// Getting uid and mail
var isAdmin = null
request.onsuccess = function (dbEvent) {
    const db = request.result;
    const transaction = db.transaction(['firebaseLocalStorage'])
    objectStore = transaction.objectStore('firebaseLocalStorage')
    if ('getAll' in objectStore) {
        objectStore.getAll().onsuccess = function (getAllEvent) {
            // event.target.result = a list of elements
            // .value is the hole user object
            uid = event.target.result[event.target.result.length - 1].value.uid
            mail = event.target.result[event.target.result.length - 1].value.email

            nameElement.innerHTML = mail
        };
    }
};

function turnOnStar(star_id){
    document.getElementById(star_id).classList.add('checked')
    document.getElementById(star_id).classList.remove('unchecked')
}

function turnOffStar(star_id) {
    document.getElementById(star_id).classList.remove('checked')
    document.getElementById(star_id).classList.add('unchecked')
}

// Rating logic
var stars = ['one', 'two', 'three', 'four', 'five']
var rating = 1
var dict = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5
}

const star1 = document.getElementById('one')
const star2 = document.getElementById('two')
const star3 = document.getElementById('three')
const star4 = document.getElementById('four')
const star5 = document.getElementById('five')

stars.forEach(function (element) {
    document.getElementById(element).addEventListener('click', (event) => {
        rating = dict[element]
        for (var i = 1; i <= dict[element]; i++) turnOnStar(stars[i-1])
        for (var i = dict[element] + 1; i <= 5; i++) turnOffStar(stars[i - 1])
    })
})

addProduct.addEventListener('click', (event) => {
    const formData = new FormData(addProductForm)

    fetch(BASE_URL + '/products', {
        method: 'POST',
        body: JSON.stringify({
            product_name: formData.get('product-name'),
            producer: formData.get('producer-name'),
            rating: rating,
            shop: formData.get('shop'),
            price: formData.get('price'),
            category: formData.get('category')
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
        })
})

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             return position;
//             console.log(position.coords.latitude)
//             console.log(position.coords.longitude)
//         }, error => {
//             switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                     x.innerHTML = "User denied the request for Geolocation."
//                     break;
//                 case error.POSITION_UNAVAILABLE:
//                     x.innerHTML = "Location information is unavailable."
//                     break;
//                 case error.TIMEOUT:
//                     x.innerHTML = "The request to get user location timed out."
//                     break;
//                 case error.UNKNOWN_ERROR:
//                     x.innerHTML = "An unknown error occurred."
//                     break;
//             }
//         })
//     }
// }

// function showPosition(position) {
//     var latlon = position.coords.latitude + "," + position.coords.longitude;

//     var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=\"+latlon+\"&zoom=14&size=400x300&sensor=false&key=API_KEY";

//     document.getElementById("THE_ID").innerHTML = "<img src='" + img_url + "'>";
// }