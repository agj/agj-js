
define( function (require) {
	'use strict';

	var agj = require('./core');
	var autoCurry = require('./function/auto-curry');

	var isArray = require('./is/array');


	var toString = Object.prototype.toString.call.bind(Object.prototype.toString);

	function set(object) {
		return object !== undef && object !== null && (typeof object !== 'number' || !isNaN(object));
	}

	function undef(object) {
		return object === void 0;
	}

	function boolean(object) {
		return typeof object === 'boolean';
	}

	function number(object) {
		return toString(object) === '[object Number]';
	}

	function string(object) {
		return toString(object) === '[object String]';
	}

	function fn(object) {
		return typeof object === 'function';
	}

	function date(object) {
		return toString(object) === '[object Date]';
	}

	function objectLiteral(object) {
		return object && typeof object === 'object' && Object.getPrototypeOf(object) === Object.prototype;
	}

	var instanceOf = autoCurry(function instanceOf(type, object) { return object instanceof type; });

	var equal          = autoCurry(function equal(a, b) { return b === a; });

	var greater        = autoCurry(function greater(a, b) { return b >   a; });

	var greaterOrEqual = autoCurry(function greaterOrEqual(a, b) { return b >=  a; });

	var less           = autoCurry(function less(a, b) { return b <   a; });

	var lessOrEqual    = autoCurry(function lessOrEqual(a, b) { return b <=  a; });


	return {
		array: isArray,
		
		set: set,
		undefined: undef,
		boolean: boolean,
		number: number,
		string: string,
		fn: fn,
		date: date,
		objectLiteral: objectLiteral,
		instanceOf: instanceOf,

		equal: equal,
		greater: greater,
		greaterOrEqual: greaterOrEqual,
		less: less,
		lessOrEqual: lessOrEqual,
		eq: equal,
		gt: greater,
		gte: greaterOrEqual,
		lt: less,
		lte: lessOrEqual
	};

});
