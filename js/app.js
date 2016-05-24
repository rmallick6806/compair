var data = require('./data.js');
var generateAssociatedData = require('./utils').generateAssociatedData;
var randomType = require('./utils').randomType;
var Firebase = require("firebase");

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)]
}

var associatedData = generateAssociatedData(data);
var type;
var productOne;
var productTwo;
var pairedResult = {};
var dbRef = new Firebase("https://compareapp.firebaseio.com/");
var dataRef = dbRef.child("compareData");
//dataRef.push({pairedResult});

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

var record = function(el) {
  var chosen = el.childNodes[1].name;
  var loser = (chosen === productOne.name) ? productTwo.name : productOne.name;
	var listedObj;
	var typeArr;
  var typeRef;
	var pairedBrandObj;
  var store;

  if (dbRef.child(type) !== null) {
    typeRef = dbRef.child(type);

    typeRef.once("value", function(data) {
      store = data.val();
      console.log(chosen, productOne.name, chosen === productOne.name, chosen === productTwo.name);
      if (store && store[type]) {
        typeRef.set({
          [productOne.name]: (chosen === productOne.name) ? 1 : 0,
          [productTwo.name]: (chosen === productTwo.name) ? 1 : 0,
          brands: [productOne.name, productTwo.name].sort()
        });
      } else {
        typeRef.set({
          [productOne.name]: (chosen === productOne.name) ? 1 : 0,
          [productTwo.name]: (chosen === productTwo.name) ? 1 : 0,
          brands: [productOne.name, productTwo.name].sort()
        });
      }
    });
  }

	if (!pairedResult[type]) {
		typeArr = pairedResult[type] = new Array();
		pairedResult[type].push({
			[productOne.name]: (chosen === productOne.name) ? 1 : 0,
			[productTwo.name]: (chosen === productTwo.name) ? 1 : 0,
			brands: [productOne.name, productTwo.name].sort()
		});
	} else if (pairedResult[type]) {
		pairedBrandObj = _.find(pairedResult[type], ['brands', [productOne.name, productTwo.name].sort()]);
		if (!_.isEmpty(pairedBrandObj)) {
			pairedBrandObj[productOne.name] = (chosen === productOne.name) ? pairedBrandObj[productOne.name] + 1 : pairedBrandObj[productOne.name];
			pairedBrandObj[productTwo.name] = (chosen === productTwo.name) ? pairedBrandObj[productTwo.name] + 1 : pairedBrandObj[productTwo.name];
		} else {
			pairedResult[type].push({
				[productOne.name]: (chosen === productOne.name) ? 1 : 0,
				[productTwo.name]: (chosen === productTwo.name) ? 1 : 0,
				brands: [productOne.name, productTwo.name].sort()
			});
		}
	}

  $("img").remove()
	$("<h4>").text(chosen).appendTo("#results");
  populate();
}

populate();
document.getElementById("firstComparison").addEventListener("click", function() {record(this);}, false);
document.getElementById("secondComparison").addEventListener("click", function() {record(this);}, false);
