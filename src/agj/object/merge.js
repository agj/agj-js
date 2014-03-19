
define(['../core'], function (agj) {
	'use strict';

	return function merge(obj, obj2) {
		var r = {};
		Object.keys(obj ).forEach( function (key) { r[key] = obj[key];  });
		Object.keys(obj2).forEach( function (key) { r[key] = obj2[key]; });
		return r;
	};

});
