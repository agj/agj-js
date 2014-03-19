
define( function () {
	'use strict';

	var array = Array.isArray ? Array.isArray : function (object) {
		return toString(object) === '[object Array]';
	};

	return array;

});
