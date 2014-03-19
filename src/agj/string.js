
define( function (require) {
	'use strict';

	var agj = require('./core');


	function first(str, amount) {
		if (isNaN(amount)) amount = 1;
		return str.slice(0, amount);
	}
	function last(str, amount) {
		if (isNaN(amount)) amount = 1;
		return str.slice(-amount);
	}
	function startsWith(str, start) {
		return first(str, start.length) === start;
	}
	function endsWith(str, end) {
		return last(str, end.length) === end;
	}

	return {
		first: first,
		last: last,
		startsWith: startsWith,
		endsWith: endsWith
	};

});
