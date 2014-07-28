
define( function (require) {
	'use strict';
	
	var some = require('agj/object/some');
	
	describe("object/some", function () {

		it("returns true only if at least one value in object satisfies the passed predicate function", function () {
			var predicate = function (v) {
				return v < 10;
			};
			expect( some({ a: 1, b: 25, c: 7 }, predicate) ).toBe( true );
			expect( some({ a: 11, b: 25, c: 70 }, predicate) ).toBe( false );
		});


		it("passes current value, current key, and object to the predicate function", function () {
			var object = { a: 1, b: 5, c: 7 };
			some(object, function (value, key, obj) {
				expect( [1, 5, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
			});
		});

		it("accepts a 'this' context object for the predicate function as a third argument", function () {
			var context = {};
			some({ a: 1 }, function () {
				expect( this ).toBe( context );
			}, context);
		});

	});

});
