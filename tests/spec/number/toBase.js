
define( function (require) {
	'use strict';
	
	var toBase = require('agj/number/toBase');
	
	describe("number/toBase", function () {

		it("returns a string representation of a number in a given base", function () {
			expect( toBase(10, 16) ).toBe( 'a' );
		});

		it("optionally takes an extra argument to get the string padded to a number of minimum digits", function () {
			expect( toBase(10, 16, 3) ).toBe( '00a' );
		});

		it("partially applies itself if you pass a single number, which it takes as the base", function () {
			var toOct = toBase(8);
			expect( toOct(10) ).toBe( '12' );
		});

	});

});
