
define( function (require) {
	'use strict';
	
	var variadic = require('agj/function/variadic');
	
	describe("function/variadic", function () {

		it("takes a function and returns a new one that gets all remaining arguments passed to it as an array in its last parameter", function () {
			var variadicized1 = variadic( function (rest) {
				expect( rest ).toEqual( [1, 2, 3] );
				return true;
			});
			var variadicized2 = variadic( function (a, rest) {
				expect( a ).toBe( 1 );
				expect( rest ).toEqual( [2, 3] );
				return true;
			});
			var variadicized3 = variadic( function (a, b, rest) {
				expect( a ).toBe( 1 );
				expect( b ).toBe( 2 );
				expect( rest ).toEqual( [3] );
				return true;
			});
			var variadicized4 = variadic( function (a, b, c, rest) {
				expect( a ).toBe( 1 );
				expect( b ).toBe( 2 );
				expect( c ).toBe( 3 );
				expect( rest ).toEqual( [] );
				return true;
			});

			expect( variadicized1(1, 2, 3) ).toBe( true );
			expect( variadicized2(1, 2, 3) ).toBe( true );
			expect( variadicized3(1, 2, 3) ).toBe( true );
			expect( variadicized4(1, 2, 3) ).toBe( true );
		});

	});

});
