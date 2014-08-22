
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');
	var isFn = require('../is').fn;
	var last = require('../array/last');

	function overload(target, rule, over) {
		if (isFn(target)) {
			return function overloaded() {
				if (arguments.length !== rule.length) return target.apply(this, arguments);
				var i = rule.length;
				while (--i >= 0) {
					if (!rule[i](arguments[i])) return target.apply(this, arguments);
				}
				return over.apply(this, arguments);
			};
		}

		var current = last(arguments);
		var list = isFn(current) ? toArray(arguments, 0, -1) : toArray(arguments);
		if (!isFn(current)) current = function () {};

		var i = list.length;
		while (--i >= 0) {
			current = overload(current, list[i][0], list[i][1]);
		}

		return current;
	}

	return overload;

});
