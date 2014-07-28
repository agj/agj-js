
define( function (require) {
	'use strict';
	
	var isEmpty = require('agj/object/isEmpty');
	
	describe("object/isEmpty", function () {

		it("returns true only if the passed object has no own assigned keys", function () {
			var proto = { keyInProto: 'a' };

			expect( isEmpty({}) ).toBe( true );
			expect( isEmpty({ a: 10 }) ).toBe( false );
			expect( isEmpty(Object.create(proto)) ).toBe( true );
		});

	});

});
