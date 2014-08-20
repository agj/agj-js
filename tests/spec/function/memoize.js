
define( function (require) {
	'use strict';
	
	var memoize = require('agj/function/memoize');
	
	describe("function/memoize", function () {

		function timesTwo(a) {
			return a * 2;
		}

		var memoized = memoize(timesTwo);

		it("only makes a memoized version of a function, so the output for the same input should be the same for the original and the memoized functions", function () {
			expect( timesTwo(6) ).toBe( memoized(6) );
		});

		it("produces a memoized function whose output should be the same each time it's called with the same input", function () {
			expect( memoized(6) ).toBe( memoized(6) );
		});
		
		it("produces a memoized function whose output should differ for different inputs, if the original function has that property", function () {
			expect( timesTwo(6) ).not.toBe( timesTwo(5) );
			expect( memoized(6) ).not.toBe( memoized(5) );
		});

	});

});
