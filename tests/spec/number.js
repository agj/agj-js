
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var number = require('agj/number');
	var is = require('agj/is');

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
			var objFilter = require('agj/object/filter');
			expect( size(objFilter(number, is.fn)) ).toBe( size(testing) );
		});
	});

});
