(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var init = require('./init').init;
var process = require('./process').process;
var show = require('./show');

init();
process();
show();

},{"./init":3,"./process":4,"./show":5}],2:[function(require,module,exports){
var data = [
  {
    logo: './image/apple_logo.jpg',
    type: 'electronics',
    name: 'Apple',
  },
  {
    logo: './image/att_logo.jpg',
    type: 'service',
    name: 'AT&T',
  },
  {
    logo: './image/bmw_logo.jpg',
    type: 'cars',
    name: 'BMW',
  },
  {
    logo: './image/mercedes_benz_logo.jpg',
    type: 'cars',
    name: 'Mercedes Benz',
  },
  {
    logo: './image/nike_logo.jpg',
    type: 'clothes',
    name: 'Nike',
  },
  {
    logo: './image/porsche_logo.jpg',
    type: 'cars',
    name: 'Porsche',
  },
  {
    logo: './image/nissan_logo.jpg',
    type: 'cars',
    name: 'Nissan',
  },
  {
    logo: './image/mcdonalds_logo.jpg',
    type: 'food',
    name: 'McDonalds',
  },
  {
    logo: './image/microsoft_logo.png',
    type: 'electronics',
    name: 'Microsoft',
  },
  {
    logo: './image/honda_logo.jpg',
    type: 'cars',
    name: 'Honda',
  },
  {
    logo: './image/comcast_logo.jpg',
    type: 'tv',
    name: 'Comcast',
  },
  {
    logo: './image/directv_logo.jpg',
    type: 'tv',
    name: 'Direct TV',
  },
  {
    logo: './image/cvs_logo.png',
    type: 'retail',
    name: 'CVS',
  },
  {
    logo: './image/walgreens_logo.jpg',
    type: 'retail',
    name: 'Walgreens',
  },
  {
    logo: './image/hyundai_logo.jpg',
    type: 'cars',
    name: 'Hyundai',
  },
  {
    logo: './image/sony_logo.jpg',
    type: 'electronics',
    name: 'Sony',
  },
  {
    logo: './image/samsung_logo.jpg',
    type: 'electronics',
    name: 'Samsung',
  },
  {
    logo: './image/capital_one_logo.jpg',
    type: 'bank',
    name: 'Capital One',
  },
  {
    logo: './image/chase_logo.jpg',
    type: 'bank',
    name: 'Chase',
  },
  {
    logo: './image/citi_logo.jpg',
    type: 'bank',
    name: 'CitiBank',
  },
  {
    logo: './image/exxonmobil_logo.jpg',
    type: 'gas',
    name: 'Exxon Mobil',
  },
  {
    logo: './image/toyota_logo.jpg',
    type: 'cars',
    name: 'Toyota',
  },
  {
    logo: './image/walmart_logo.jpg',
    type: 'retail',
    name: 'Walmart',
  },
  {
    logo: './image/verizon_logo.jpg',
    type: 'service',
    name: 'Verizon',
  },
  {
    logo: './image/wells_fargo_logo.jpg',
    type: 'bank',
    name: 'Wells Fargo',
  },
  {
    logo: './image/shell_logo.jpg',
    type: 'gas',
    name: 'Shell',
  },
  {
    logo: './image/sam_s_club_logo.jpg',
    type: 'wholesale',
    name: 'Sams Club',
  },
  {
    logo: './image/costco_logo.jpg',
    type: 'wholesale',
    name: 'Costco',
  },
  {
    logo: './image/h_m_logo.jpg',
    type: 'clothes',
    name: 'H&M',
  },
  {
    logo: './image/bp_logo.jpg',
    type: 'gas',
    name: 'BP',
  },
  {
    logo: './image/subway_logo.jpg',
    type: 'food',
    name: 'Subway',
  },
  {
    logo: './image/adidas_logo.jpg',
    type: 'clothes',
    name: 'Adidas'
  }
];

module.exports = data;
},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./data.js":2,"./utils":6}],5:[function(require,module,exports){
module.exports = function show() {
	var db = firebase.database();

	var render = function(data) {
		var group = _.sample(data);
		$(".comparison-renders").remove();
		_.forEach(group, function(competitors, i) {
			var companies = Object.keys(competitors);
			var firstCoVal = competitors[companies[0]] || 0;
			var secondCoVal = competitors[companies[1]] || 0;
			var id = _.kebabCase(['brands', companies[0], companies[1]].join(''));

			$("<div>").attr('id', id).attr('class', 'comparison-renders').appendTo("#results");
			$("<h4>").text(companies[0] + ': ' + firstCoVal).appendTo("#" + id);
			$("<h4>").text(companies[1] + ': ' + secondCoVal).appendTo("#" + id);

		});
	};

	db.ref('/').once('value').then(function(snapshot) {
		render(snapshot.val());
	});
};

},{}],6:[function(require,module,exports){
var generateAssociatedData = function(data) {
  var sortedData = {};
  _.map(data, function(obj, i) {
    sortedData[obj.type] = new Array();
  });
  _.forEach(data, function(obj, i) {
    if (sortedData[obj.type]) {
      sortedData[obj.type].push(obj);
    }
  });
  return sortedData;
};

var randomType = function(obj) {
  var keys = Object.keys(obj)
  return obj[keys[keys.length * Math.random() << 0]];
};

var populate = function(associatedData) {
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


module.exports = {
	generateAssociatedData,
	randomType,
  populate
}

},{}]},{},[1]);
