
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var string = require('agj/string');
	var merge = require('agj/object/merge');

	describe("String utility", function () {
		var declarator = util.declarator();
		var pass = declarator.pass;

		var testing = merge(require('reusable/string-functions'), {
			concat: [
				pass('a', 'b', 'c', 'd')
					.get('abcd')
					.becauseIt("returns all the passed strings concatenated"),
				pass()
					.get('')
					.becauseIt("returns an empty string if nothing is passed"),
				pass('a', null, 'b', undefined, 'c')
					.get('abc')
					.becauseIt("turns null and undefined values into empty strings"),
				pass(true, false, 10)
					.get('truefalse10')
					.becauseIt("coerces passed values into strings"),
			]
		});

		util.checkMethods(testing,
			function (method, o) {
				var exp = expect( string[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(string) ).toBe( size(testing) );
		});
	});

});
