
define( function (require) {
	'use strict';
	
	var every = require('agj/collection/every');
	
	describe("collection/every", function () {

		var lessThan10, lessThan5, object, array;

		beforeEach( function () {
			lessThan10 = function (v) {
				return v < 10;
			};
			lessThan5 = function (v) {
				return v < 5;
			};
			object = { a: 1, b: 5, c: 7 };
			array = [1, 5, 7];
		});

		it("returns true only if every value in the collection satisfies the passed predicate function", function () {
			expect( every(object, lessThan10) ).toBe( true );
			expect( every(array, lessThan10) ).toBe( true );

			expect( every(object, lessThan5) ).toBe( false );
			expect( every(array, lessThan5) ).toBe( false );
		});

		it("passes current value, current key, and object to the predicate function", function () {
			var called = 0;

			every(object, function (value, key, obj) {
				expect( [1, 5, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
				called++;
				return true;
			});

			expect( called ).toBe( 3 );
		});

		it("takes the collection and the predicate in any order", function () {
			expect( every(object, lessThan10) ).toBe( true );
			expect( every(lessThan10, object) ).toBe( true );
		});

		it("is auto-curried", function () {
			expect( every(object)(lessThan10) ).toBe( true );
			expect( every(lessThan10)(object) ).toBe( true );
		});

	});

});
