
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var string = require('agj/string');

	var pass = util.declarator().pass;

	return {
		contains: [
			pass('cucumber', 'umb')
				.get(true)
				.becauseIt("returns true if the passed search string is contained by the string"),
			pass('cucumber', 'blah')
				.get(false)
				.becauseIt("returns false if the passed search string is not contained by the string"),
			pass('anullate', null)
				.get(true)
				.becauseIt("coerces values into strings"),
		],
		first: [
			pass('first', 2)
				.get('fi')
				.becauseIt("gets the first two characters of a string larger than that"),
			pass('first', 10)
				.get('first')
				.becauseIt("gets the whole string when it's smaller"),
			pass('first')
				.get('f')
				.becauseIt("gets the first character if no length is specified"),
		],
		endsWith: [
			pass('ends', 'ds').get(true),
			pass('ends', 'no').get(false),
		],
		last: [
			pass('last', 2)
				.get('st')
				.becauseIt(""),
		],
		padRight: [
			pass('my', 5, '!')
				.get('my!!!')
				.becauseIt("fills the string on the left to the specified length with the passed character"),
			pass('my', 5)
				.get('my   ')
				.becauseIt("fills it with spaces if no padding character is passed"),
			pass('oh my!', 5, '?')
				.get('oh my!')
				.becauseIt("returns the original string if it is already larger than the passed length"),
			pass('oh my', 5, '?')
				.get('oh my')
				.becauseIt("returns the original string if it is the same length as the passed length"),
		],
		padLeft: [
			pass('my', 5, '.')
				.get('...my')
				.becauseIt("fills the string on the right to the specified length with the passed character"),
			pass('my', 5)
				.get('   my')
				.becauseIt("fills it with spaces if no padding character is passed"),
			pass('oh my!', 5, '.')
				.get('oh my!')
				.becauseIt("returns the original string if it is already larger than the passed length"),
			pass('oh my', 5, '.')
				.get('oh my')
				.becauseIt("returns the original string if it is the same length as the passed length"),
		],
		startsWith: [
			pass('starts', 'star').get(true),
			pass('starts', 'no').get(false),
		],
	};

});
