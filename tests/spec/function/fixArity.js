
define( function (require) {
	'use strict';
	
	var fixArity = require('agj/function/fixArity');
	
	describe("function/fixArity", function () {

		function concatenate(a, b) {
			return '' + a + b;
		}
		function divide(a, b) {
			return a / b;
		}

		it("takes a number and a function, and returns a new funciton with an arity matching the first argument", function () {
			expect( concatenate('left', 'right') ).toBe( 'leftright' );
			expect( fixArity(0, concatenate)('left', 'right') ).toBe( 'undefinedundefined' );
			expect( fixArity(1, concatenate)('left', 'right') ).toBe( 'leftundefined' );
			expect( fixArity(2, concatenate)('left', 'right') ).toBe( 'leftright' );
			expect( fixArity(2, function () {}).length ).toBe( 2 );
			expect( fixArity(7, function () {}).length ).toBe( 7 );
		});

		it("it is curried if only the arity is passed", function () {
			expect( fixArity(0)(concatenate)('left', 'right') ).toBe( 'undefinedundefined' );
			expect( fixArity(1)(concatenate)('left', 'right') ).toBe( 'leftundefined' );
			expect( fixArity(2)(concatenate)('left', 'right') ).toBe( 'leftright' );
		});

	});

});
