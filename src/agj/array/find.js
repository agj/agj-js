
define( function (require) {
	'use strict';

	var findIndex = require('./findIndex');

	function find(arr, predicate, thisArg) {
		var index = findIndex(arr, predicate, thisArg);
		if (index !== -1) return arr[index];
		return void 0;
	}

	return find;
	
});
