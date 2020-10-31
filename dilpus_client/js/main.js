// Elements
const nameElement = document.getElementById('userNameOrEmail')

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