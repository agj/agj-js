
define( function (require) {
	'use strict';

	var pipeContainer = {
		pipe: require('./pipe')
	};

	function compose() {
		return toArray(arguments).reduceRight( function (fa, fb) { return fa.pipe(fb); }, pipeContainer);
	}

	return compose;

});
