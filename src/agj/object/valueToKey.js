
define( function (require) {
	'use strict';

	function keyToValue(obj, value) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key))
				continue;
			if (obj[key] === value) {
				return key;
			}
		}
		return null;
	}

	return keyToValue;

});
