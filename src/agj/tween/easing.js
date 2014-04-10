
define( function (require) {
	'use strict';

	var TAU = require('../number/TAU');

	return {
		linear: function (p) {
			return p;
		},
		easeInQuad: function (p) {
			return p * p;
		},
		easeOutSine: function (p) {
			return Math.sin(p * (TAU / 4));
		}
	};

});
