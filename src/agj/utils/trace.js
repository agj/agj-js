
define(function (require) {
	'use strict';

	function trace() {
		if (console && console.log)
			console.log.apply(console, toArray(arguments));
	};

	return trace;

});
