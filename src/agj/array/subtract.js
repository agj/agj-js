
define( function (require) {
	'use strict';

	function subtract(arr, array) {
		for (var i = arr.length - 1; i >= 0; i--) {
			if (array.indexOf(arr[i]) >= 0)
				arr.splice(i, 1);
		}
		return arr;
	}

	return subtract;
	
});
