
define( function (require) {
	'use strict';
	
	var pipe = require('agj/function/pipe');
	
	describe("function/pipe", function () {

		function divide(a, b) {
			return a / b;
		}
		function timesTwo(a) {
			return a * 2;
		}
		function minusOne(a) {
			return a - 1;
		}

		it("takes a function and returns an equivalent function with pipe() and to() methods that allow it to sequence results into other functions indefinitely", function () {
			var piped1 = pipe(divide).to(timesTwo).to(minusOne);
			expect( piped1(100, 50) ).toBe( 3 );
			var piped2 = pipe(divide).pipe(timesTwo).pipe(minusOne);
			expect( piped2(100, 50) ).toBe( 3 );
		});

	});

});
