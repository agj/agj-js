
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	var pipeContainer = {
		pipe: require('./pipe')
	};

	function compose() {
		return toArray(arguments).reduceRight( function (fa, fb) { return fa.pipe(fb); }, pipeContainer);
	}

	return compose;

});
