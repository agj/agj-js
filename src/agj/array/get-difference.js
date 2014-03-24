
define( function (require) {
	'use strict';

	function getDifference(arr, array) {
		return arr.filter(function (item) {
			return array.indexOf(item) === -1;
		});
	}

	return getDifference;
	
});
