
define( function (require) {
	'use strict';
	
	var adopt = require('agj/object/adopt');
	
	describe("object/adopt", function () {

		it("adopts all properties of the left argument object and adds it to the right argument object, returning the latter; flipped version of extend", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = adopt(obj1, obj2);
			
			expect( result ).toEqual( { a: 1, b: 2, c: 4 } );
			expect( result ).toBe( obj2 );
		});

		it("is partially applied automatically", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = adopt(obj1)(obj2);
			
			expect( result ).toEqual( { a: 1, b: 2, c: 4 } );
			expect( result ).toBe( obj2 );
		});

	});

});
