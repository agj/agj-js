
define( function (require) {
	'use strict';
	
	var has = require('agj/array/has');
	
	describe("array/has", function () {

		it("returns a boolean value indicating whether an array has an item or not; flipped version of 'within'", function () {
			expect( has('a', ['a', 'b', 'c']) ).toBe( true );
			expect( has(100, ['a', 'b', 'c']) ).toBe( false );
		});

		it("is auto-partially applied", function () {
			expect( has('a')(['a', 'b', 'c']) ).toBe( true );
			expect( has(100)(['a', 'b', 'c']) ).toBe( false );
		});

	});

});
