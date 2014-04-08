
define( function (require) {
	'use strict';

	var TAU = require('./TAU');

	function radToDeg(num) {
		return num * 360 / TAU;
	}

	return radToDeg;

});
