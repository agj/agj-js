
define( function (require) {
	'use strict';

	var to = require('../to');
	var is = require('../is');

	function setElseDo(v, els, fn) {
		if (is.set(v)) return fn(v);
		return els;
	}

	function parameters(fn) {
		return setElseDo(fn.toString().match(/^function \w*\s?\(([^\)\/]*)/), [], function (m) {
			return m[1].split(',').map(to.call('trim'));
		}).filter( function(p) { return is.set(p) && p.length; });
	}

	return parameters;

});
