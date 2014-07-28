
define( function (require) {
	'use strict';
	
	var filter = require('agj/object/filter');
	
	describe("object/filter", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("returns an object containing only the key+values for which the passed predicate function returned true", function () {
			var predicate = function (v) {
				return v < 10;
			};
			expect( filter({ a: 1, b: 25, c: 7 }, predicate) ).toEqual( { a: 1, c: 7 } );
			expect( filter({ a: 10, b: 25, c: 70 }, predicate) ).toEqual( { } );
		});

		it("always returns a new object", function () {
			var predicate = function (v) {
				return true;
			};
			var original = { a: 1, b: 25, c: 7 };
			var copy = filter(original, predicate);

			expect( original ).toEqual( copy );
			expect( original ).not.toBe( copy );
		});

		it("passes current value, current key, and object to the predicate function", function () {
			var object = { a: 1, b: 5, c: 7 };
			filter(object, function (value, key, obj) {
				expect( ['1', '5', '7'] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
			});
		});

		it("accepts a 'this' context object for the predicate function as a third argument", function () {
			var context = {};
			filter({ a: 1 }, function () {
				expect( this ).toBe( context );
			}, context);
		});

	});

});
