
define( function (require) {
	'use strict';
	
	var prevIndexTo = require('agj/array/prevIndexTo');
	
	describe("array/prevIndexTo", function () {

		it("retrieves the preceding index corresponding to a certain item, in the passed array", function () {
			expect( prevIndexTo(['a', 'b', 'c', 'd'], 'c') ).toBe( 1 );
		});

		it("will wrap around to the last index when the start is reached, unless 'true' is passed as the third argument", function () {
			expect( prevIndexTo(['a', 'b', 'c', 'd'], 'a') ).toBe( 3 );
			expect( prevIndexTo(['a', 'b', 'c', 'd'], 'a', true) ).toBe( -1 );
		});

		it("if an item is repeated, it will always use the first ocurrence as reference", function () {
			expect( prevIndexTo(['a', 'b', 'b', 'b'], 'b') ).toBe( 0 );
		});

	});

});
