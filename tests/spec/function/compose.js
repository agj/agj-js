
define( function (require) {
	'use strict';
	
	var compose = require('agj/function/compose');
	
	describe("function/compose", function () {

		function minusOne(a) {
			return a - 1;
		}
		function timesTwo(a) {
			return a * 2;
		}
		function byTen(a) {
			return a / 10;
		}

		it("returns a function that is the result of passing the return values of each passed function to the next, from rightmost to leftmost, and returning that result", function () {
			expect( compose(minusOne, timesTwo)(100) ).toBe( 199 );
			expect( compose(minusOne, timesTwo, byTen)(100) ).toBe( 19 );
		});

	});

});
