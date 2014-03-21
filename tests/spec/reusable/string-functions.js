
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var string = require('agj/string');

	var pass = util.pass();

	return {
		first:        pass('first', 2).get('fi'),
		last:         pass('last', 2).get('st'),
		startsWith: [
		              pass('starts', 'star').get(true),
		              pass('starts', 'no').get(false)
		],
		endsWith: [
		              pass('ends', 'ds').get(true),
		              pass('ends', 'no').get(false)
		]
	};

});
