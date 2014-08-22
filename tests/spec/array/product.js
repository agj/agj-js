
define( function (require) {
	'use strict';
	
	var product = require('agj/array/product');
	
	describe("array/product", function () {

		it("allows for iteration over the cartesian product of a number of arrays", function () {
			var called = 0;
			product([[1, 2, 3]], function (number) {
				called++;
				expect( [1, 2, 3] ).toContain( number );
			});
			expect( called ).toBe( 3 );

			called = 0;
			product([[1, 2, 3], ['a', 'b', 'c']], function (number, letter) {
				called++;
				expect( [1, 2, 3] ).toContain( number );
				expect( ['a', 'b', 'c'] ).toContain( letter );
			});
			expect( called ).toBe( 9 );

			called = 0;
			product([[1, 2, 3], ['a', 'b', 'c'], ['い', 'ろ', 'は']], function (number, letter, hiragana) {
				called++;
				expect( [1, 2, 3] ).toContain( number );
				expect( ['a', 'b', 'c'] ).toContain( letter );
				expect( ['い', 'ろ', 'は'] ).toContain( hiragana );
			});
			expect( called ).toBe( 27 );

			called = 0;
			product([[1, 2], ['a', 'b'], ['い', 'ろ'], ['イ', 'ロ']], function (number, letter, hiragana, katakana) {
				called++;
				expect( [1, 2] ).toContain( number );
				expect( ['a', 'b'] ).toContain( letter );
				expect( ['い', 'ろ'] ).toContain( hiragana );
				expect( ['イ', 'ロ'] ).toContain( katakana );
			});
			expect( called ).toBe( 16 );
		});

		it("allows iteration breaking by returning a truthy value from the callback function", function () {
			var called = 0;
			product([[1, 2, 3], ['a', 'b', 'c']], function (number, letter) {
				called++;
				expect( number ).toBe( 1 );
				expect( letter ).toBe( 'a' );
				return true;
			});
			expect( called ).toBe( 1 );
		});

		it("creates and returns array of the cartesian product if no callback function is passed", function () {
			expect(
				product([[1, 2, 3], ['a', 'b', 'c'], ['い', 'ろ', 'は']])
			).toEqual(
				[
					[1, 'a', 'い'],
					[1, 'a', 'ろ'],
					[1, 'a', 'は'],
					[1, 'b', 'い'],
					[1, 'b', 'ろ'],
					[1, 'b', 'は'],
					[1, 'c', 'い'],
					[1, 'c', 'ろ'],
					[1, 'c', 'は'],
					[2, 'a', 'い'],
					[2, 'a', 'ろ'],
					[2, 'a', 'は'],
					[2, 'b', 'い'],
					[2, 'b', 'ろ'],
					[2, 'b', 'は'],
					[2, 'c', 'い'],
					[2, 'c', 'ろ'],
					[2, 'c', 'は'],
					[3, 'a', 'い'],
					[3, 'a', 'ろ'],
					[3, 'a', 'は'],
					[3, 'b', 'い'],
					[3, 'b', 'ろ'],
					[3, 'b', 'は'],
					[3, 'c', 'い'],
					[3, 'c', 'ろ'],
					[3, 'c', 'は'],
				]
			);
		});

	});

});
