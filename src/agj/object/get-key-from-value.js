
define( function (require) {
	'use strict';

	function getKeyFromValue(obj, value) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key))
				continue;
			if (obj[key] === value) {
				return key;
			}
		}
		return null;
	}

	return getKeyFromValue;

});
