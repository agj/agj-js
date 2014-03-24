
define( function (require) {
	'use strict';

	var nextOrPrevIndex = require('./next-or-prev-index');

	function nextIndex(arr, index, dontWrapAround) {
		return nextOrPrevIndex(arr, index, true, dontWrapAround);
	}

	return nextIndex;
	
});
