
define( function (require) {
	'use strict';
	
	var integer = require('agj/random/integer');
	
	describe("random/integer", function () {

		it("returns a random integer up to the passed number, not including it", function () {
			expect( integer(1) ).toBe( 0 );
			expect( integer(0) ).toBe( 0 );
			expect( integer(100) < 100 ).toBe( true );
			expect( integer(100) >= 0 ).toBe( true );
		});

		it("accepts two arguments for a range not starting with 0", function () {
			expect( integer(3, 4) ).toBe( 3 );
		});

		it("still returns integers for floating point arguments", function () {
			var r = integer(2.5);
			expect( r ).toBe( Math.floor(r) );
		});
	});

});
