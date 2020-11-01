// Elements
const nameElement = document.getElementById('userNameOrEmail')
const addProduct = document.getElementById('addItProduct')
const addProductForm = document.getElementById('addProductForm')
const productList = document.getElementById('listaProduse')

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

function turnOnStar(star_id) {
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
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5
}

const star1 = document.getElementById('one')
const star2 = document.getElementById('two')
const star3 = document.getElementById('three')
const star4 = document.getElementById('four')
const star5 = document.getElementById('five')

stars.forEach(function (element) {
    document.getElementById(element).addEventListener('click', (event) => {
        rating = dict[element]
        for (var i = 1; i <= dict[element]; i++) turnOnStar(stars[i - 1])
        for (var i = dict[element] + 1; i <= 5; i++) turnOffStar(stars[i - 1])
    })
})

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

var products

function showDetails(prod, rating, shop, category) {
    const str = '<p>Producer: {0}</p><p>Rating: {1}</p><p>Shop Name: {2}</p><p>Category: {3}</p>'.format(prod, rating, shop, category)
    document.getElementById('viewProductModalBody').innerHTML = str
}

addProduct.addEventListener('click', (event) => {
    const formData = new FormData(addProductForm)

    fetch(BASE_URL + '/products', {
        method: 'POST',
        body: JSON.stringify({
            product_name: formData.get('product-name'),
            image_url: '',
            producer: formData.get('producer-name'),
            rating: rating,
            shop: formData.get('shop'),
            // price: formData.get('price'),
            // quantity: formData.get('quantity'),
            category: formData.get('category'),
            added_at: Date.now()
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            addProductForm.reset()
            getProducts()
        })
})

function getProducts() {
    fetch(BASE_URL + '/products').then(res => res.json()).then(products => {
        products.reverse()
        productList.innerHTML = ''
        products.forEach(product => {
            var htmlText = '<div class="card-body" style="display: flex; justify-content: space-between;"> <h4 class="font-weight-bold" style="margin: auto 0 auto 0;">' + product.product_name + '</h4> <div class="product-buttons"> <a href="#" class="btn btn-success btn-circle btn-lg" data-toggle="modal" data-target="#viewProductModal"> <i class="fas fa-check"></i> </a> <a href="#" class="btn btn-danger btn-circle btn-lg"> <i class="fas fa-trash"></i> </a> </div></div>'
            

            productList.innerHTML += htmlText

            // var div1 = document.createElement('div')
            // div1.class = 'modal fade'
            // div1.id = viewProductModal
            // div1.tabindex = '-1' 
            // div1.role = 'dialog'
            // div1.setAttribute('aria-labelledby', 'exampleModalLabel')
            // div1.setAttribute('aria-hidden', 'true')

            // var div2 = document.createElement('div')
            // div2.class = 'modal-dialog'
            // div2.role = 'document'
            
            // var div3 = document.createElement('div')
            // div3.class = 'modal-content'

            // var div4 = document.createElement('div')
            // div4.class = 'modal-header'

            // var h = document.createElement('h5')
            // h.class = 'modal-title'
            // h.id = 'exampleModalLabel'
            // h.innerHTML = 'Add to a shoping list'

            // var button = document.createElement('button')
            // button.class = 'close'
            // button.type = 'button'
            // button.setAttribute('data-dismiss', 'modal')
            // button.setAttribute('aria-label', 'Close')

            // var span = document.createElement('span')
            // span.setAttribute('aria-hidden', 'true')
            // span.innerHTML = 'x'

            // // --------------------

            // var divvv1 = document.createElement('div')
            // divvv1.id = 'viewProductModalBody'
            // divvv1.class = 'modal-body'


            // var divvv2 = document.createElement('div')
            // divvv2.class = 'modal-footer'

            // var button2 = document.createElement('button')
            // button2.class = 'btn btn-secondary'
            // button2.type = 'button'
            // button2.setAttribute('data-dismiss', 'modal')
            // button2.innerHTML = 'Cancel'

            // var a = document.createElement('a')
            // a.href = '#'
            // a.class = 'btn btn-success btn-icon-split'

            // var span2 = document.createElement('span')
            // span.class = 'icon text-white-50'

            // var i = document.createElement('i')
            // i.class = 'fas fa-check'

            // var span3 = document.createElement('span')
            // span3.id = 'addProductToShoppingList'
            // span3.class = 'text'
            // span3.innerHTML = 'Add it to shoping list'

            // span2.innerHTML = i
            // a.innerHTML = span2

            // divvv2.innerHTML = button2
            // divvv2.innerHTML += a

            // button.innerHTML = span
            // div4.innerHTML = h
            // div4.innerHTML += button

            // div3.innerHTML = div4
            // div2.innerHTML = div3
            // div1.innerHTML = div2
        })
    })
}

getProducts()

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