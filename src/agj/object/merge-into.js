
define( function (require) {
	'use strict';

	return function mergeInto(objTarget, objSource) {
		Object.keys(objSource).forEach( function (key) { objTarget[key] = objSource[key]; });
		return objTarget;
	};

});
