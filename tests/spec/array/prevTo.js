
define( function (require) {
	'use strict';
	
	var prevTo = require('agj/array/prevTo');
	
	describe("array/prevTo", function () {

		it("retrieves the item preceding a certain item, in the passed array", function () {
			expect( prevTo(['a', 'b', 'c', 'd'], 'c') ).toBe( 'b' );
		});

		it("will wrap around to the last when the start is reached, unless 'true' is passed as the third argument", function () {
			expect( prevTo(['a', 'b', 'c', 'd'], 'a') ).toBe( 'd' );
			expect( prevTo(['a', 'b', 'c', 'd'], 'a', true) ).toBe( undefined );
		});

		it("if an item is repeated, it will always use the first ocurrence as reference", function () {
			expect( prevTo(['a', 'b', 'b', 'b'], 'b') ).toBe( 'a' );
		});

	});

});
