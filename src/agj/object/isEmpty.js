
define( function (require) {
	'use strict';

	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}

	return isEmpty;

});
