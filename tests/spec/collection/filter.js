
define( function (require) {
	'use strict';
	
	var filter = require('agj/collection/filter');
	
	describe("collection/filter", function () {

		var lessThan10, greaterThan100, object, array;

		beforeEach( function () {
			lessThan10 = function (v) {
				return v < 10;
			};
			greaterThan100 = function (v) {
				return v > 100;
			};
			object = { a: 1, b: 20, c: 7 };
			array = [1, 20, 7];
		});

		it("returns a new collection containing only the values for which the passed predicate function returned true", function () {
			expect( filter(object, greaterThan100) ).toEqual( { } );
			expect( filter(object, lessThan10) ).toEqual( { a: 1, c: 7 } );
			expect( filter(array, greaterThan100) ).toEqual( [] );
			expect( filter(array, lessThan10) ).toEqual( [1, 7] );
		});

		it("passes current value, current key, and object to the predicate function", function () {
			var called = 0;

			filter(object, function (value, key, obj) {
				expect( [1, 20, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
				called++;
			});

			expect( called ).toBe( 3 );
		});

		it("takes the collection and the predicate in any order", function () {
			expect( filter(object, lessThan10) ).toEqual( { a: 1, c: 7 } );
			expect( filter(lessThan10, object) ).toEqual( { a: 1, c: 7 } );
		});

		it("is auto-curried", function () {
			expect( filter(object)(lessThan10) ).toEqual( { a: 1, c: 7 } );
			expect( filter(lessThan10)(object) ).toEqual( { a: 1, c: 7 } );
		});

	});

});
