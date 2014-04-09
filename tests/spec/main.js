
requirejs.config({
	baseUrl: './spec/',
	paths: {
		'lib': '../lib',
		'agj': '../../src/agj',
		'rsvp': '../lib/rsvp',
		jasmine: '../lib/jasmine-2.0.0/jasmine',
		jasmineHtml: '../lib/jasmine-2.0.0/jasmine-html',
		jasmineBoot: '../lib/jasmine-2.0.0/boot',
		// blanket: '../lib/blanket_jasmine',
	},
	shim: {
		jasmine: {
			exports: 'jasmine',
		},
		jasmineHtml: {
			deps: ['jasmine'],
			exports: 'jasmine',
		},
		jasmineBoot: {
			deps: ['jasmine', 'jasmineHtml'],
			exports: 'jasmine',
		},
		// blanket: {
		// 	deps: ['jasmineBoot'],
		// 	exports: 'blanket',
		// },
	},
});

require(['agj/extensions/rsvp', 'jasmineBoot'], function (promiseUtil, jasmine) {
	'use strict';

	// console.log(blanket);
	// blanket.setFilter(['../src/agj/']);

	promiseUtil.requireSequentially(
		'array',
		'function',
		'number',
		'object',
		'string',

		'is',

		'extend',

		'domGenerator'

	).then(window.onload);

});
