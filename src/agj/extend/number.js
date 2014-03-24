
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var constructProto = require('./utils/utils').constructProto;

	var proto = constructProto(
		Number.prototype,
		null,
		require('../number')
	);

	return extend.register({
		approve: is.number,
		proto: proto
	});
	
});
