
define( function (require) {
	'use strict';

	function last(arr, amount) {
		if (isNaN(amount)) amount = 1;
		if (amount === 1) return arr[arr.length - 1];
		return arr.slice(-amount);
	}

	return last;
	
});
