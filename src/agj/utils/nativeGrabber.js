
define(function (require) {
	'use strict';

	var isFn = require('../is').fn;
	var toArray = require('./toArray');

	function fromPrototype(obj) {
		return fromAny(obj, true);
	}

	function fromGlobal(obj) {
		return fromAny(obj, false);
	}

	var forbiddenMethods = ['constructor', 'prototype'];
	function fromAny(obj, convertThis) {
		var r = {};
		if (Object.hasOwnProperty('getOwnPropertyNames')) {
			Object.getOwnPropertyNames(obj).forEach( function (key) {
				if (isFn(obj[key]) && key.charAt(0) !== '_' && forbiddenMethods.indexOf(key) === -1) {
					r[key] = convertThis ? thisToArg(obj[key]) : obj[key];
				}
			});
		}
		return r;
	}

	function thisToArg(fn) {
		return function (thisArg) {
			return fn.apply(thisArg, toArray(arguments, 1));
		};
	}

	var module = {
		fromPrototype: fromPrototype,
		fromGlobal: fromGlobal
	};

	return module;

});
