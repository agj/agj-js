
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var constructProto = require('./utils/utils').constructProto;

	var proto = constructProto(
		Function.prototype,
		null,
		require('../function'),
		{
			len: function () {
				return this.length;
			}
		}
	);

	return extend.register({
		approve: is.fn,
		proto: proto
	});
	
});
