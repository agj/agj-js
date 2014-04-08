
define( function (require) {
	'use strict';

	var TAU = require('./TAU');

	function degToRad(num) {
		return num * TAU / 360;
	}

	return degToRad;

});