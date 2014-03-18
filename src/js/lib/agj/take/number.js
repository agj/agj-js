

define(['../core', '../take'], function (agj, take) {
	'use strict';

	// var agj = requir e('agj/core');
	// var register = requir e('agj/take').register;
	var register = take.register;


	function degToRad(num) {
		return num * Math.TAU / 360;
	}
	function radToDeg(num) {
		return num * 360 / Math.TAU;
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

	var module = {
		degToRad: degToRad,
		radToDeg: radToDeg,
		toBase:   toBase,
		toHex:    toHex,
		logBase:  logBase
	};

	register({
		applies: agj.is.number,
		does: module
	});

	return module;

	// return function () {
	// 	agj.mixin(Number.prototype, {
	// 		degToRad: function () { // Number
	// 			return this * Math.TAU / 360;
	// 		},
	// 		radToDeg: function () { // Number
	// 			return this * 360 / Math.TAU;
	// 		},

	// 		toBase: function (base, pad) { // String
	// 			var result = this.toString(base);
	// 			if (!isNaN(pad)) {
	// 				while (result.length < pad) {
	// 					result = '0' + result;
	// 				}
	// 			}
	// 			return result;
	// 		},

	// 		toHex: function (pad) { // String
	// 			return this.toBase(16, pad);
	// 		},

	// 		logBase: function (base) {
	// 			return Math.log(this) / Math.log(base);
	// 		}
	// 	});
	// };

});