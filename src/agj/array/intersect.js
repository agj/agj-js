
define( function (require) {
	'use strict';

	function intersect(arr, array) {
		return arr.filter(function (item) {
			return array.indexOf(item) >= 0;
		});
	}

	return intersect;
	
});
