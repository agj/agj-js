
define( function (require) {
	'use strict';

	var isArray = require('../is').array;

	function flatten(arr, deep) {
		return arr.reduce(deep ? processDeep : processShallow, []);
	}

	function processShallow(a, b) {
		return a.concat(b);
	}
	function processDeep(a, b) {
		return a.concat(isArray(b) ? flatten(b, true) : b);
	}

	return flatten;
	
});
