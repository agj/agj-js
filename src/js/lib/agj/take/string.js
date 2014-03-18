

define(['../core', '../take'], function (agj, take) {
	'use strict';

	var register = take.register;


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

	var module = {
		first: first,
		last: last,
		startsWith: startsWith,
		endsWith: endsWith
	};

	register({
		applies: agj.is.string,
		does: module
	});

	return module;

});
