
define( function (require) {
	'use strict';
	
	var map = require('agj/object/map');
	
	describe("object/map", function () {

		it("runs a callback function for the each key/value of the passed object, and returns a new object consisting of the the return values for each key", function () {
			var callback = function (v) {
				return v * 10;
			};
			expect( map({ a: 1, b: 25, c: 7 }, callback) ).toEqual( { a: 10, b: 250, c: 70 } );
		});

		it("passes current value, current key, and object to the callback function", function () {
			var object = { a: 1, b: 5, c: 7 };
			map(object, function (value, key, obj) {
				expect( [1, 5, 7] ).toContain( value );
				expect( ['a', 'b', 'c'] ).toContain( key );
				expect( object ).toBe( obj );
			});
		});

		it("accepts a 'this' context object for the callback function as a third argument", function () {
			var context = {};
			map({ a: 1 }, function () {
				expect( this ).toBe( context );
			}, context);
		});

	});

});
