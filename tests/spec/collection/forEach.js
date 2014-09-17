
define( function (require) {
	'use strict';
	
	var forEach = require('agj/collection/forEach');
	
	describe("collection/forEach", function () {

		it("executes the passed callback function for each value in collection, passing it current value, current key, and object", function () {
			var object = { a: 1, b: 5, c: 7 };
			var array = [1, 5, 7];
			var called = 0;

			forEach(object, function (value, key, obj) {
				expect( [1, 5, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( obj ).toBe( object );
				called++;
			});

			expect( called ).toBe( 3 );

			called = 0;

			forEach(array, function (value, key, obj) {
				expect( [1, 5, 7] ).toContain( value );
				expect( [0, 1, 2] ).toContain( key );
				expect( obj ).toBe( array );
				called++;
			});

			expect( called ).toBe( 3 );
		});

		it("returns the same passed object", function () {
			var original = { a: 1, b: 25, c: 7 };
			var returned = forEach(original, function () { });

			expect( original ).toBe( returned );
		});

	});

});
