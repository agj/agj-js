
define( function (require) {
	'use strict';
	
	var set2D = require('agj/array/set2D');
	
	describe("array/set2D", function () {

		it("inserts items into a 1D array treating it as if it contained values aligned to rows and columns, by passing total columns, then row and column index, and finally the item to insert", function () {
			var array = [
				'aa', 'ab', 'ac',
				'ba', 'bb', 'bc',
				'ca', 'cb', 'cc',
			];

			set2D(array, 3, 1, 1, 'changed');

			expect( array ).toEqual( [
				'aa', 'ab',      'ac',
				'ba', 'changed', 'bc',
				'ca', 'cb',      'cc',
			] );
		});

	});

});
