
define( function (require) {
	'use strict';

	var nextOrPrevIndex = require('./next-or-prev-index');

	function nextTo(arr, item, dontWrapAround) {
		var index = nextOrPrevIndex(arr, arr.indexOf(item), true, dontWrapAround);
		if (index >= 0)
			return arr[index];
		return agj.undefined;
	}

	return nextTo;
	
});
