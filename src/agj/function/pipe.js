
define( function () {
	'use strict';


	function pipe(fn) {
		var prev = this;
		function piped() {
			if (typeof prev === 'function')
				return fn(prev.apply(null, arguments));
			else
				return fn.apply(null, arguments);
		}
		piped.pipe = piped.to = pipe;
		return piped;
	}


	return pipe;

});
