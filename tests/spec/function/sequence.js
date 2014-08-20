
define( function (require) {
	'use strict';
	
	var sequence = require('agj/function/sequence');
	
	describe("function/sequence", function () {

		function minusOne(a) {
			return a - 1;
		}
		function timesTwo(a) {
			return a * 2;
		}
		function byTen(a) {
			return a / 10;
		}

		it("returns a function that is the result of passing the return values of each passed function to the next, from leftmost to rightmost, and returning that result", function () {
			expect( sequence(timesTwo, minusOne)(100) ).toBe( 199 );
			expect( sequence(byTen, timesTwo, minusOne)(100) ).toBe( 19 );
		});

	});

});
