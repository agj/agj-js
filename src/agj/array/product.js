
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	function product(lists, callback) {
		iterate([], lists, callback);
	}

	function iterate(selected, remaining, callback) {
		var next = remaining.length > 1 ? remaining.slice(1) : null;
		return remaining[0].some( function (item) {
			var current = selected.concat([item]);
			if (next) return iterate(current, next, callback);
			return callback.apply(null, current);
		});
	}

	return product;

});
