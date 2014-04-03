
define(function (require) {
	'use strict';

	function warn() {
		if (console) {
			if (console.warn)
				console.warn.apply(console, toArray(arguments));
			else if (console.log)
				console.log.apply(console, toArray(arguments));
		}
	};

	return warn;

});
