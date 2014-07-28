
define( function (require) {
	'use strict';
	
	var mergeInto = require('agj/object/mergeInto');
	
	describe("object/mergeInto", function () {

		it("merges the right argument object's own properties into the first argument object, returning the latter", function () {
			var obj1 = { a: 1, b: 2};
			var obj2 = { b: 3, c: 4};
			var result = mergeInto(obj1, obj2);
			
			expect( result ).toEqual( { a: 1, b: 3, c: 4 } );
			expect( result ).toBe( obj1 );
		});

	});

});
