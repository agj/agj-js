
define( function (require) {
	'use strict';

	var toArray = require('../utils/toArray');

	var pipeContainer = {
		pipe: require('./pipe')
	};

	function sequence() {
		return toArray(arguments).reduce( function (fa, fb) { return fa.pipe(fb); }, pipeContainer);
	}

	return sequence;

});
