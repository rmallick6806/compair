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
