
define( function (require) {
	'use strict';
	
	var get2D = require('agj/array/get2D');
	
	describe("array/get2D", function () {

		it("gets items from a 1D array treating it as if it contained values aligned to rows and columns, by passing total columns, then row and column index", function () {
			var array = [
				'aa', 'ab', 'ac',
				'ba', 'bb', 'bc',
				'ca', 'cb', 'cc',
			];
			expect( get2D(array, 3, 0, 0) ).toBe( 'aa' );
			expect( get2D(array, 3, 2, 0) ).toBe( 'ac' );
			expect( get2D(array, 3, 0, 2) ).toBe( 'ca' );
			expect( get2D(array, 3, 2, 2) ).toBe( 'cc' );
			expect( get2D(array, 3, 1, 1) ).toBe( 'bb' );
		});

	});

});
