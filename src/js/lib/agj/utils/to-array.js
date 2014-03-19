
define( function () {
	'use strict';

	function toArray(object) {
		return Array.prototype.slice.call(object, 0);
	}

	return toArray;

});
