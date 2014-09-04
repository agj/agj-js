
define( function (require) {
	'use strict';
	
	var partialRight = require('agj/function/partialRight');
	
	describe("function/partialRight", function () {

		function concatenate(a, b, c) {
			return a + ' ' +  b + ' ' + c;
		}

		it("takes a function and an array of arguments, and returns a new function of the original, partially applied with the rightmost arguments", function () {
			expect( partialRight(concatenate, ['a'])('b', 'c') ).toBe( 'b c a' );
			expect( partialRight(concatenate, ['a', 'b'])('c') ).toBe( 'c a b' );
			expect( partialRight(concatenate, ['a', 'b', 'c'])() ).toBe( 'a b c' );
			expect( partialRight(concatenate, [])('a', 'b', 'c') ).toBe( 'a b c' );

			expect( partialRight(concatenate, ['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(concatenate, ['a', 'b'])() ).toBe( 'undefined a b' );
		});

		it("optionally takes a forced arity value", function () {
			expect( partialRight(4, concatenate, ['a'])('b', 'c') ).toBe( 'b c undefined' );
			expect( partialRight(3, concatenate, ['a'])('b', 'c') ).toBe( 'b c a' );
			expect( partialRight(2, concatenate, ['a'])('b', 'c') ).toBe( 'b a undefined' );
			expect( partialRight(1, concatenate, ['a'])('b', 'c') ).toBe( 'a undefined undefined' );
			expect( partialRight(0, concatenate, ['a'])('b', 'c') ).toBe( 'undefined undefined undefined' );
		});

		it("arguments can be passed in any order", function () {
			expect( partialRight(concatenate, ['a'])('b', 'c') ).toBe( 'b c a' );
			expect( partialRight(['a'], concatenate)('b', 'c') ).toBe( 'b c a' );

			expect( partialRight(3, concatenate, ['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(3, ['a'], concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(concatenate, 3, ['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(concatenate, ['a'], 3)('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'], 3, concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'], concatenate, 3)('b') ).toBe( 'b undefined a' );
		});

		it("gets partially-applied automatically", function () {
			expect( partialRight(concatenate)(['a'])('b', 'c') ).toBe( 'b c a' );
			expect( partialRight(['a'])(concatenate)('b', 'c') ).toBe( 'b c a' );

			expect( partialRight(3)(concatenate, ['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(3)(['a'], concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'])(3, concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'])(concatenate, 3)('b') ).toBe( 'b undefined a' );

			expect( partialRight(3, concatenate)(['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(3, ['a'])(concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(concatenate, 3)(['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'], 3)(concatenate)('b') ).toBe( 'b undefined a' );

			expect( partialRight(3)(concatenate)(['a'])('b') ).toBe( 'b undefined a' );
			expect( partialRight(3)(['a'])(concatenate)('b') ).toBe( 'b undefined a' );
			expect( partialRight(['a'])(3)(concatenate)('b') ).toBe( 'b undefined a' );
		});

		it("will however not take an arity after taking a function", function () {
			expect( function () { partialRight(concatenate)(3)(['a'])('b'); } ).toThrow();
			expect( function () { partialRight(concatenate)(['a'])(3)('b'); } ).toThrow();
			expect( function () { partialRight(concatenate)(3, ['a'])('b'); } ).toThrow();
			expect( function () { partialRight(concatenate, ['a'])(3)('b'); } ).toThrow();
			expect( function () { partialRight(['a'], concatenate)(3)('b'); } ).toThrow();
		});

	});

});
