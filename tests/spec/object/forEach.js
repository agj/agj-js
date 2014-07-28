
define( function (require) {
	'use strict';
	
	var forEach = require('agj/object/forEach');
	
	describe("object/forEach", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("executes the passed callback function for each value in object, passing it current value, current key, and object", function () {
			var sum = 0;
			var object = { a: 1, b: 5, c: 7 };
			forEach(object, function (value, key, obj) {
				expect( ['1', '5', '7'] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
				sum += value;
			});
			expect( sum ).toBe( 13 );
		});

		it("accepts a 'this' context object for the callback function as a third argument", function () {
			var context = {};
			forEach({ a: 1 }, function () {
				expect( this ).toBe( context );
			}, context);
		});

		it("returns the same passed object", function () {
			var original = { a: 1, b: 25, c: 7 };
			var returned = forEach(original, function () { });

			expect( original ).toBe( returned );
		});

	});

});
