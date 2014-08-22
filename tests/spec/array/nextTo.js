
define( function (require) {
	'use strict';
	
	var nextTo = require('agj/array/nextTo');
	
	describe("array/nextTo", function () {

		it("retrieves the item following a certain item, in the passed array", function () {
			expect( nextTo(['a', 'b', 'c', 'd'], 'b') ).toBe( 'c' );
		});

		it("will wrap around to the first when the end is reached, unless 'true' is passed as the third argument", function () {
			expect( nextTo(['a', 'b', 'c', 'd'], 'd') ).toBe( 'a' );
			expect( nextTo(['a', 'b', 'c', 'd'], 'd', true) ).toBe( undefined );
		});

		it("if an item is repeated, it will always use the last ocurrence as reference", function () {
			expect( nextTo(['a', 'a', 'a', 'b'], 'a') ).toBe( 'b' );
		});

	});

});
