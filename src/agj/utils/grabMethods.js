
define(function (require) {
	'use strict';

	var is = require('../is');
	var toID = require('../to').id;
	var toArray = require('./toArray');

	var forbiddenMethods = ['constructor', 'prototype'];

	function grabMethods(obj) {
		return process(obj, toID);
	}
	grabMethods.andBindToArg = andBindToArg;
	grabMethods.andProcess = andProcess;

	function andBindToArg(obj) {
		return process(obj, thisToArg);
	}

	function andProcess(obj, methodProcessor) {
		return process(obj, methodProcessor);
	}

	function process(obj, methodProcessor) {
		var r = {};
		if (Object.hasOwnProperty('getOwnPropertyNames')) {
			Object.getOwnPropertyNames(obj).forEach( function (key) {
				if (is.fn(obj[key]) && key.charAt(0) !== '_' && forbiddenMethods.indexOf(key) === -1) {
					r[key] = methodProcessor(obj[key]);
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

	return grabMethods;

});
