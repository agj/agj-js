
define( function (require) {
	'use strict';

	var agj = require('./core');
	var merge = require('./object/merge');


	function values(obj) {
		var result = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) result.push(obj[key]);
		}
		return result;
	}

	function getKeyFromValue(obj, value) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key))
				continue;
			if (obj[key] === value) {
				return key;
			}
		}
		return null;
	}

	function isEmpty(obj) {
		for (var key in obj) {
			if (!obj.hasOwnProperty(key)) continue;
			return false;
		}
		return true;
	}

	function size(obj) {
		return Object.keys(obj).length;
	}

	return {
		merge: merge,
		values: values,
		getKeyFromValue: getKeyFromValue,
		isEmpty: isEmpty,
		size: size
	};

});
