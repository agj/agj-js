
define( function (require) {
	'use strict';

	function sample(arr) {
		var len = arr.length;
		if (len <= 0) return agj.undefined;
		return arr[Math.floor(Math.random() * len)];
	}

	return sample;
	
});
