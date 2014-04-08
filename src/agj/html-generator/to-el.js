/**
 * Returns a function that will generate elements for the specified tag.
 * It is memoized for improved performance.
 */
define( function (require) {
	'use strict';

	var is = require('../is');
	var anyEl = require('./any-el');
	var toArray = require('../utils/to-array');
	var memoize = require('../function/memoize');

	var toEl = memoize( function toEl(tag) {
		return function () {
			var id = '';
			var first = arguments[0];
			var i = 0;
			if (is.string(first) && (first[0] === '#' || first[0] === '.')) {
				id = first;
				i++;
			}
			return anyEl.apply(null, [tag + id].concat(toArray(arguments, i)));
		};
	});

	return toEl;

});
