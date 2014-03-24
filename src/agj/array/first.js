
define( function (require) {
	'use strict';

	function first(arr, amount) {
		if (isNaN(amount)) amount = 1;
		if (amount === 1) return arr[0];
		return arr.slice(0, amount);
	}

	return first;
	
});
