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
