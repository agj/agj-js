
define( function (require) {
	'use strict';

	function first(arr, amount) {
		if (isNaN(amount)) return arr[0];
		return arr.slice(0, amount);
	}

	return first;
	
});
