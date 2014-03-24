
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var number = require('agj/number');

	describe("Number utility", function () {
		var testing = require('reusable/number-functions');

		util.checkMethods(testing,
			function (method, o) {
				var exp = expect( number[method].apply(null, o.args) );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
			}
		);

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(number) ).toBe( size(testing) );
		});
	});

});
