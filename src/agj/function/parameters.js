
define( function (require) {
	'use strict';

	var to = require('../core').to;
	var is = require('../is');

	function iff(v, els, fn) {
		if (is.set(v)) return fn(v);
		return els;
	}

	function parameters(fn) {
		return iff(fn.toString().match(/^function \w*\s?\(([^\)]*)\) /), [], function (m) {
			return m[1].split(',').map(to.call('trim'));
		});
	}

	return parameters;

});
