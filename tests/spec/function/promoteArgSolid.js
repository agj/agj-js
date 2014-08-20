
define( function (require) {
	'use strict';

	var promoteArgSolid = require('agj/function/promoteArgSolid');

	describe("function/promoteArgSolid", function () {

		function divide(a, b) {
			return a / b;
		}
		function concatenate(a, b, c) {
			return '' + a + b + c;
		}

		it("takes an index number and a function, and returns an equivalent function for which the parameter at the index is promoted to the first parameter; will condense arguments if fewer than expected are passed", function () {
			expect( promoteArgSolid(1, divide)(10, 2) ).toBe( 0.2 );
			expect( promoteArgSolid(2, concatenate)('OK') ).toBe( 'OKundefinedundefined' );
		});

	});

});
