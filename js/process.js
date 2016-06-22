var process = function() {
	var data = require('./data.js');
	var generateAssociatedData = require('./utils').generateAssociatedData;
	var randomType = require('./utils').randomType;

	var associatedData = generateAssociatedData(data);
	var type;
	var productOne;
	var productTwo;
	var pairedResult = {};
	var db = firebase.database();

	var populate = function() {
	  type = randomType(associatedData)[0].type;
	  productOne = associatedData[type].randomElement();
	  productTwo = associatedData[type].randomElement();
	  var reFind = function() {
	    if (productOne.name === productTwo.name) {
	      type = randomType(associatedData)[0].type;
	      productOne = associatedData[type].randomElement();
	      productTwo = associatedData[type].randomElement();
	      reFind();
	    } else {
	      return;
	    }
	  }
	  reFind();
	  $("<img>").attr("src", productOne.logo).attr("name", productOne.name).appendTo("#firstComparison");
	  $("<img>").attr("src", productTwo.logo).attr("name", productTwo.name).appendTo("#secondComparison");
	}

	var record = function(el, skip) {
		if (!skip) {
			var chosen = el.childNodes[1].name;
			var loser = (chosen === productOne.name) ? productTwo.name : productOne.name;
			function transactData(db, chosen, loser) {
				var sortArr = [chosen, loser].sort();
				var comparisonRef = db.ref(type + '/' + sortArr[0] + '-' + sortArr[1] + '/' + chosen);
				comparisonRef.transaction(function(rank) {
					return rank + 1;
				}, function(error, committed, snapshot) {
					if (error) {
						console.log('Transaction failed abnormally!', error);
					}
					console.log('Chosen: ', chosen, snapshot.val(), 'and loser: ', loser);
				});
			}
			transactData(db, chosen, loser);
		}
	  $("img").remove()
		//$("<h4>").text(chosen).appendTo("#results");
	  populate();
	}

	populate();
	document.getElementById("firstComparison").addEventListener("click", function() {record(this);}, false);
	document.getElementById("secondComparison").addEventListener("click", function() {record(this);}, false);
	document.getElementById("notSure").addEventListener("click", function() {record(this, true);}, false);
}

module.exports = {
	process
}
