
define( function (require) {
	'use strict';

	function shuffle(arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			var r = Math.floor(Math.random() * (i + 1));
			var temp = arr[i];
			arr[i] = arr[r];
			arr[r] = temp;
		}
		return arr;
	}

	return shuffle;
	
});
