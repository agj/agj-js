
define( function (require) {
	'use strict';
	
	var flip = require('agj/function/flip');
	
	describe("function/flip", function () {

		function divide2(a, b) {
			return a / b;
		}
		function divide3(a, b, c) {
			return a / b / c;
		}
		function identity(a) {
			return a;
		}

		it("takes a function and returns a new function with the order of parameters reversed", function () {
			expect( flip(divide2)(10, 2) ).toBe( 0.2 );
			expect( flip(divide3)(10, 2, 5) ).toBe( 0.25 );
			expect( flip(identity)(10) ).toBe( 10 );
		});

	});

});
