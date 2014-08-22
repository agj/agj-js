
define( function (require) {
	'use strict';
	
	var mapToObject = require('agj/array/mapToObject');
	
	describe("array/mapToObject", function () {

		it("creates an object with an array's values as its keys and return values from a callback as its values", function () {
			var array = ['a', 'b', 'c', 'd'];
			var called = 0;

			function callback(item, index, arr) {
				called++;
				expect( ['a', 'b', 'c', 'd'] ).toContain( item );
				expect( [0, 1, 2, 3] ).toContain( index );
				expect( arr ).toBe( array );

				return 'r' + item;
			}

			expect( mapToObject(array, callback) ).toEqual( { a: 'ra', b: 'rb', c: 'rc', d: 'rd' } );
			expect( called ).toBe( 4 );
		});

	});

});
