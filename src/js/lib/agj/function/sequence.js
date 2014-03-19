
define( function (require) {
	'use strict';

	var pipeContainer = {
		pipe: require('./pipe')
	};

	function sequence() {
		return toArray(arguments).reduce( function (fa, fb) { return fa.pipe(fb); }, pipeContainer);
	}

	return sequence;

});
