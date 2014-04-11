
define( function (require) {
	'use strict';

	function findIndex(arr, predicate, thisArg) {
		var i = -1;
		var len = arr.length;
		while (i++, i < len) {
			if (predicate.call(thisArg, arr[i], i, arr)) return i;
		}
		return -1;
	}

	return findIndex;
	
});
