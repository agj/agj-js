
define( function (require) {
	'use strict';

	function last(arr, amount) {
		if (isNaN(amount)) return arr[arr.length - 1];
		if (amount === 0) return [];
		return arr.slice(-amount);
	}

	return last;
	
});
