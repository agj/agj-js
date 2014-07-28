
define( function (require) {
	'use strict';

	var autoCurry = require('../function/autoCurry');

	function lateProp(obj, prop) {
		return function () {
			return obj[prop];
		};
	}

	return autoCurry(lateProp);
	
});
