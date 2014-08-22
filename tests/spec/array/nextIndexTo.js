
define( function (require) {
	'use strict';
	
	var nextIndexTo = require('agj/array/nextIndexTo');
	
	describe("array/nextIndexTo", function () {

		it("retrieves the following index corresponding to a certain item, in the passed array", function () {
			expect( nextIndexTo(['a', 'b', 'c', 'd'], 'b') ).toBe( 2 );
		});

		it("will wrap around to 0 when the end is reached, unless 'true' is passed as the third argument", function () {
			expect( nextIndexTo(['a', 'b', 'c', 'd'], 'd') ).toBe( 0 );
			expect( nextIndexTo(['a', 'b', 'c', 'd'], 'd', true) ).toBe( -1 );
		});

		it("if an item is repeated, it will always use the last ocurrence as reference", function () {
			expect( nextIndexTo(['a', 'a', 'a', 'b'], 'a') ).toBe( 3 );
		});

	});

});
