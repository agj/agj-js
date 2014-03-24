
define( function (require) {
	'use strict';

	var nextOrPrevIndex = require('./next-or-prev-index');

	function prevIndexTo(arr, item, dontWrapAround) {
		return nextOrPrevIndex(arr, arr.indexOf(item), false, dontWrapAround);
	}

	return prevIndexTo;
	
});
