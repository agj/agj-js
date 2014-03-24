
define( function (require) {
	'use strict';

	var isFn = require('../../is').fn;
	var toArray = require('../../utils/to-array');
	var mergeInto = require('../../object/merge-into');
	var objectMap = require('../../object/map');
	var returnThis = require('../../function/return-this');

	var forbiddenMethods = ['constructor', 'prototype'];

	function constructProto(source, returnThisList, utilFunctions, extra) {
		var result = Object.create(source);

		Object.getOwnPropertyNames(source).forEach( function (name) {
			if (isFn(source[name]) && name.charAt(0) !== '_' && forbiddenMethods.indexOf(name) === -1) {
				result[name] = source[name];
			}
		});

		if (returnThisList) {
			returnThisList.forEach( function (key) {
				if (key in result) result[key] = returnThis(result[key]);
			});
		}

		if (utilFunctions) {
			mergeInto(result, objectMap(utilFunctions, function (name) {
				return argToThis(utilFunctions[name]);
			}));
		}

		if (extra) mergeInto(result, extra);

		return result;
	}

	function argToThis(fn) {
		return function () {
			return fn.apply(null, [this].concat(toArray(arguments)));
		};
	}

	return {
		constructProto: constructProto,
		argToThis: argToThis
	};
	
});
