
define( function (require) {
	'use strict';
	
	var some = require('agj/collection/some');
	
	describe("collection/some", function () {

		var greaterThan10, greaterThan1000, object, array;

		beforeEach( function () {
			greaterThan10 = function (v) {
				return v > 10;
			};
			greaterThan1000 = function (v) {
				return v > 1000;
			};
			object = { a: 1, b: 10, c: 100 };
			array = [1, 10, 100];
		});

		it("returns true only if at least one value in the collection satisfies the passed predicate function", function () {
			expect( some(object, greaterThan10) ).toBe( true );
			expect( some(array, greaterThan10) ).toBe( true );

			expect( some(object, greaterThan1000) ).toBe( false );
			expect( some(array, greaterThan1000) ).toBe( false );
		});

		it("passes current value, current key, and object to the predicate function", function () {
			var called = 0;

			some(object, function (value, key, obj) {
				expect( [1, 10, 100] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( obj ).toBe( object );
				called++;
			});

			expect( called ).toBe( 3 );
		});

		it("takes the collection and the predicate in any order", function () {
			expect( some(object, greaterThan10) ).toBe( true );
			expect( some(greaterThan10, object) ).toBe( true );
		});

		it("is auto-curried", function () {
			expect( some(object)(greaterThan10) ).toBe( true );
			expect( some(greaterThan10)(object) ).toBe( true );
		});

	});

});
