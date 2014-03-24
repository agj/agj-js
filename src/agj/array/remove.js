
define( function (require) {
	'use strict';

	var toArray = require('../utils/to-array');

	function remove(arr) {
		var items = toArray(arguments, 1);
		items.forEach( function (item) {
			var i;
			while (i = arr.indexOf(item), i !== -1) {
				arr.splice(i, 1);
			}
		});
		return arr;
	}

	return remove;
	
});
