
define( function (require) {
	'use strict';
	
	var map = require('agj/collection/map');
	
	describe("collection/map", function () {

		var times10, object, array;

		beforeEach( function () {
			times10 = function (v) {
				return v * 10;
			};
			object = { a: 1, b: 25, c: 7 };
			array = [1, 25, 7];
		});

		it("runs a transform function for each value of the passed object, and returns a new object consisting of the the return values for each key", function () {
			expect( map(object, times10) ).toEqual( { a: 10, b: 250, c: 70 } );
			expect( map(array, times10) ).toEqual( [10, 250, 70] );
		});

		it("passes current value, current key, and object to the transform function", function () {
			var called = 0;

			map(object, function (value, key, obj) {
				expect( [1, 25, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( obj ).toBe( object );
				called++;
			});

			expect( called ).toBe( 3 );
		});

		it("takes the collection and the transform function in any order", function () {
			expect( map(object, times10) ).toEqual( { a: 10, b: 250, c: 70 } );
			expect( map(times10, object) ).toEqual( { a: 10, b: 250, c: 70 } );
		});

		it("is auto-curried", function () {
			expect( map(object)(times10) ).toEqual( { a: 10, b: 250, c: 70 } );
			expect( map(times10)(object) ).toEqual( { a: 10, b: 250, c: 70 } );
		});

	});

});
