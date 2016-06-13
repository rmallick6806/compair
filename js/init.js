var init = function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZF-kcVUR4l8B-IRGgxMxHUO870hpHRtc",
    authDomain: "compair-60214.firebaseapp.com",
    databaseURL: "https://compair-60214.firebaseio.com",
    storageBucket: "compair-60214.appspot.com",
  };
  firebase.initializeApp(config);

  Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)]
  }
};

module.exports = {
	init
}
