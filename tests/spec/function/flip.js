
define( function (require) {
	'use strict';
	
	var flip = require('agj/function/flip');
	
	describe("function/flip", function () {

		function divide(a, b) {
			return a / b;
		}
		function concat3(a, b, c) {
			return '' + a + b + c;
		}
		function identity(a) {
			return a;
		}

		it("takes a function and returns a new function with the order of parameters reversed", function () {
			expect( flip(divide)(10, 2) ).toBe( 0.2 );
			expect( flip(concat3)('a', 'b', 'c') ).toBe( 'cba' );
			expect( flip(identity)(10) ).toBe( 10 );
		});

		it("can force a certain arity by passing it as an argument", function () {
			expect( flip(2, concat3)('a', 'b', 'c') ).toBe( 'baundefined' );
			expect( flip(concat3, 2)('a', 'b', 'c') ).toBe( 'baundefined' );
		});

		it("curries itself if only an arity value is passed", function () {
			expect( flip(2)(concat3)('a', 'b', 'c') ).toBe( 'baundefined' );
		});

	});

});
