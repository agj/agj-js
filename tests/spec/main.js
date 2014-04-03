
requirejs.config({
	baseUrl: './spec/',
	paths: {
		'lib': '../lib',
		'agj': '../../src/agj',
		'rsvp': '../lib/rsvp'
	}
});

require(['agj/extensions/rsvp'], function (promiseUtil) {
	'use strict';

	promiseUtil.requireSequentially(
		'array',
		'function',
		'number',
		'object',
		'string',

		'is',

		'extend',

		'html-generator'

	).then(window.onload);

});
