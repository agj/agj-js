
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var constructProto = require('./utils/utils').constructProto;

	var proto = constructProto(
		Array.prototype,
		['pop', 'push', 'reverse', 'shift', 'splice', 'unshift'],
		require('../array'),
		{
			len: function () {
				return this.length;
			},
			get: function (index) {
				return this[index];
			},
			set: function (index, value) {
				this[index] = value;
				return this;
			}
		}
	);

	return extend.register({
		approve: is.array,
		proto: proto
	});
	
});
