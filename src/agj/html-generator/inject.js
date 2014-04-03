
define( function (require) {
	'use strict';

	var parameters = require('../function/parameters');
	var toEl = require('./to-el');

	function inject(fn) {
		var tags = parameters(fn).map(toEl);
		return fn.apply(null, tags);
	}

	return inject;

});
