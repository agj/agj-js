
define( function (require) {
	'use strict';

	var is = require('../is');
	var extend = require('../extend');
	var extendUtils = require('./utils/utils');
	var constructProto = extendUtils.constructProto;
	var argToThis = extendUtils.argToThis;
	var mergeInto = require('../object/merge-into');

	var proto = {};

	var forbiddenMethods = ['constructor', 'prototype'];
	Object.getOwnPropertyNames(Object).forEach( function (name) {
		if (is.fn(Object[name]) && name.charAt(0) !== '_' && forbiddenMethods.indexOf(name) === -1) {
			proto[name] = argToThis(Object[name]);
		}
	});

	mergeInto(proto, constructProto(
		Object.prototype,
		null,
		require('../object'),
		{
			get: function (obj, key) {
				return obj[key];
			},
			set: function (obj, key, value) {
				obj[key] = value;
				return obj;
			}
		}
	));

	return extend.register({
		approve: is.objectLiteral,
		proto: proto
	});
	
});
