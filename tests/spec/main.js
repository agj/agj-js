
requirejs.config({
	baseUrl: './spec/',
	paths: {
		'lib': '../lib',
		'agj': '../../src/agj',
		'rsvp': '../lib/rsvp',
		signals: '../lib/signals',
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

require(['agj/utils/requireSequentially', 'jasmineBoot'], function (requireSequentially, jasmine) {
	'use strict';

	// console.log(blanket);
	// blanket.setFilter(['../src/agj/']);

	requireSequentially(
		'array',
		'function',
		'number',
		'object',
		'string',

		'is',
		'random',

		// 'extend', // need to rethink how these are tested, or maybe just throw this away, as it's not proven very useful.

		'domGenerator',
		'tween'

	).then(window.onload);

});
