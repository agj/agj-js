
define( function (require) {
	'use strict';


	var tau = Math.PI * 2;

	function degToRad(num) {
		return num * tau / 360;
	}
	function radToDeg(num) {
		return num * 360 / tau;
	}
	function toBase(num, base, pad) {
		var result = num.toString(base);
		if (!isNaN(pad)) {
			while (result.length < pad) {
				result = '0' + result;
			}
		}
		return result;
	}
	function toHex(num, pad) {
		return toBase(num, 16, pad);
	}
	function logBase(num, base) {
		return Math.log(num) / Math.log(base);
	}

	return {
		degToRad: degToRad,
		radToDeg: radToDeg,
		toBase:   toBase,
		toHex:    toHex,
		logBase:  logBase
	};

});