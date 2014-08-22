
define( function (require) {
	'use strict';
	
	var logBase = require('agj/number/logBase');
	
	describe("number/logBase", function () {

		it("returns a number to the logarithm of a given base", function () {
			expect( logBase(100, 10) ).toBe( 2 );
		});

		it("partially applies itself if only a single number is passed, which it takes as the base", function () {
			var log10 = logBase(10);
			expect( log10(100) ).toBe( 2 );
		});

	});

});
