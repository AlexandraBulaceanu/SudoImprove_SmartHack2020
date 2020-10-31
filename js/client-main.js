// ----- SETUP -----
console.log("dilpus's up!");
//geting the firebase user from the local storage !!! NOT WORKING !! :(

// ----- CONSTANTS -----
const BASE_URL = 'http://localhost:8080' 	    // local host
// const BASE_URL = 'https://950a6583fed7.ngrok.io' 	// ngrok app URL
// const BASE_URL = 'http://34.107.45.244:8080'		// GCP VM Instance Link
// const BASE_URL = 'http://deer.troglobyte.cc:8080'   // Domeniul lui Valentin

// ----- HTML Views -----
const form = document.getElementById('post_form');
const postsElement = document.querySelector('.posts-container');

// Navigation Bar Buttons
const admin_button = document.getElementById('admin_button');
const chat_button = document.getElementById('chat_button');
const points_button = document.getElementById('points_button');
const logout_button = document.getElementById('logout_button');

// Comments Modal Constants
const modal_header = document.querySelector('#post-modal-content .modal-header') 	// used to set th
const modal_body = document.querySelector('#post-modal-content .modal-body') 	// used to set/display comments
const comment_form = document.getElementById('comment_form');
const comment_send_button = document.getElementById('comment_send_button')

// ----- Functions -----

// Checking if guest
function isGuest(message = '') {
	if (uid === 'guest' || uid == undefined) {
		if (message.length > 0) showSnack(message);
		return true;
	}
	return false;
}

function showHide(show, hide) {
	if (show) show.style.display = null;
	if (hide) hide.style.display = 'none';
}

const snackbar = document.getElementById('snackbar');
function showSnack(message, seconds = 3) {
	snackbar.textContent = message;
	snackbar.className = 'show';
	setTimeout(function () {
		snackbar.className = snackbar.className.replace('show', '');
	}, 1000 * seconds);
}

// Geting UID from indexedDB
var uid = 'guest'
var objectStore
const request = window.indexedDB.open('firebaseLocalStorageDb')
request.onerror = function (event) {
	console.err('Event fething indexDB', event)
};

request.onsuccess = function (dbEvent) {
	const db = request.result;
	const transaction = db.transaction(['firebaseLocalStorage'])
	objectStore = transaction.objectStore('firebaseLocalStorage')
	if ('getAll' in objectStore) {
		objectStore.getAll().onsuccess = function (getAllEvent) {
			// event.target.result = a list of elements
			// .value is the hole user object
			uid = event.target.result[event.target.result.length - 1].value.uid
		};
	}
};