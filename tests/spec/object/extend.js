
define( function (require) {
	'use strict';
	
	var extend = require('agj/object/extend');
	
	describe("object/extend", function () {

		it("extends the left argument object with the properties of the right argument object, returning the former; flipped version of adopt", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = extend(obj1, obj2);
			
			expect( result ).toEqual( { a: 1, b: 3, c: 4 } );
			expect( result ).toBe( obj1 );
		});

		it("is partially applied automatically", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = extend(obj1)(obj2);
			
			expect( result ).toEqual( { a: 1, b: 3, c: 4 } );
			expect( result ).toBe( obj1 );
		});

	});

});
