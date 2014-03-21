
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var object = require('agj/object');

	var pass = util.pass( function () {
		return { args: [{ one: 1, two: '2', three: 'three' }] };
	});
	var passOnly = util.pass();
	var get = function (result) { return pass().get(result); };

	return {
		values: get([1, '2', 'three']),
		getKeyFromValue: pass('2').get('two'),
		isEmpty: [
			get(false),
			passOnly({}).get(true)
		],
		size: get(3)
	};

});
