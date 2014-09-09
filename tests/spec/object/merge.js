
define( function (require) {
	'use strict';
	
	var merge = require('agj/object/merge');
	
	describe("object/merge", function () {

		it("returns a new object containing all the passed objects' properties, always favoring the rightmost arguments", function () {
			var obj1 = { a: 1, b: 2 };
			var obj2 = { b: 3, c: 4 };
			var obj3 = { c: 5, d: 6 };
			var obj4 = { d: 7, e: 8 };

			var result = merge();

			expect( result ).toEqual( {} );

			result = merge(obj1);

			expect( result ).toEqual( { a: 1, b: 2 } );
			expect( result ).not.toBe( obj1 );

			result = merge(obj1, obj2);

			expect( result ).toEqual( { a: 1, b: 3, c: 4 } );
			expect( result ).not.toBe( obj1 );
			expect( result ).not.toBe( obj2 );

			result = merge(obj1, obj2, obj3, obj4);

			expect( result ).toEqual( { a: 1, b: 3, c: 5, d: 7, e: 8 } );
			expect( result ).not.toBe( obj1 );
			expect( result ).not.toBe( obj2 );
			expect( result ).not.toBe( obj3 );
			expect( result ).not.toBe( obj4 );
			
		});

	});

});
