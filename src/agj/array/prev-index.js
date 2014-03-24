
define( function (require) {
	'use strict';

	var nextOrPrevIndex = require('./next-or-prev-index');

	function prevIndex(arr, index, dontWrapAround) {
		return nextOrPrevIndex(arr, index, false, dontWrapAround);
	}

	return prevIndex;
	
});
