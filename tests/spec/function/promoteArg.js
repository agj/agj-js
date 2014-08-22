
define( function (require) {
	'use strict';

	var promoteArg = require('agj/function/promoteArg');

	describe("function/promoteArg", function () {

		function divide(a, b) {
			return a / b;
		}
		function concatenate(a, b, c) {
			return '' + a + b + c;
		}

		it("takes an index number and a function, and returns an equivalent function for which the parameter at the index is promoted to the first parameter", function () {
			expect( promoteArg(1, divide)(10, 2) ).toBe( 0.2 );
			expect( promoteArg(2, concatenate)('OK') ).toBe( 'undefinedundefinedOK' );
		});

		it("curries itself if only an index number is passed", function () {
			expect( promoteArg(1)(divide)(10, 2) ).toBe( 0.2 );
			expect( promoteArg(2)(concatenate)('OK') ).toBe( 'undefinedundefinedOK' );
		});

	});

});
