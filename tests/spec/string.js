
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var string = require('agj/string');

	describe("String utility", function () {
		var pass = util.pass();

		var testing = require('reusable/string-functions');

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
