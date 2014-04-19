
define( function (require) {
	'use strict';

	var to = require('../to');
	var is = require('../is');
	var sequence = require('../function/sequence');

	var get = to.prop;
	var call = to.call;

	function setElseDo(v, els, fn) {
		if (is.set(v)) return fn(v);
		return els;
	}

	var splitTrimAndFilter = sequence(get(1), call('split', [',']), call('map', [call('trim')]), call('filter', [to.id]));

	function parameters(fn) {
		return setElseDo(fn.toString().match(/^function \w*\s?\(([^\)\/]*)/), [], splitTrimAndFilter);
	}

	return parameters;

});
