
define( function (require) {
	'use strict';
	
	var within = require('agj/array/within');
	
	describe("array/within", function () {

		it("returns a boolean value indicating whether an item is within an array or not; flipped version of 'has'", function () {
			expect( within(['a', 'b', 'c'], 'a') ).toBe( true );
			expect( within(['a', 'b', 'c'], 100) ).toBe( false );
		});

		it("is auto-partially applied", function () {
			expect( within(['a', 'b', 'c'])('a') ).toBe( true );
			expect( within(['a', 'b', 'c'])(100) ).toBe( false );
		});

	});

});
