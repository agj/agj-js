
define( function (require) {
	'use strict';
	
	var not = require('agj/function/not');
	
	describe("function/not", function () {

		function isHi(a) {
			return a === 'hi';
		}
		function identity(a) {
			return a;
		}

		it("takes a function and returns a new function that returns the boolean opposite for any given value compared to the original function", function () {
			expect( not(isHi)('hi') ).toBe( false );
			expect( not(isHi)('ay') ).toBe( true );
		});

		it("coerces values as boolean", function () {
			expect( not(identity)('string') ).toBe( false );
		});

	});

});
