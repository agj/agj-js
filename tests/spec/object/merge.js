
define( function (require) {
	'use strict';
	
	var merge = require('agj/object/merge');
	
	describe("object/merge", function () {

		it("test assertion", function () {
			expect(true).toBe(false);
		});

		it("returns a new object containing two objects own key/values, favoring the right argument's", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = merge(obj1, obj2);
			
			expect( result ).toEqual( { a: 1, b: 3, c: 4 } );
			expect( result ).not.toBe( obj1 );
			expect( result ).not.toBe( obj2 );
		});

	});

});
