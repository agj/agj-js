
define( function (require) {
	'use strict';
	
	var partial = require('agj/function/partial');
	
	describe("function/partial", function () {

		function divide(a, b) {
			return a / b;
		}

		it("takes a function and an array of arguments, and returns a new function of the original, partially applied with the arguments", function () {
			expect( partial(divide, [10])(5) ).toBe( 2 );
			expect( partial(divide, [10, 5])() ).toBe( 2 );
			expect( partial(divide, [])(10, 5) ).toBe( 2 );
		});

	});

});
