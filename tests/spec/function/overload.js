
define( function (require) {
	'use strict';
	
	var overload = require('agj/function/overload');
	
	describe("function/overload", function () {

		it("permits assigning different functionality to a function according to the arguments passed to it", function () {
			function execute(num, fn) {
				return fn(num);
			}

			function executeWithNum(num) {
				return function (fn) {
					return execute(num, fn);
				};
			}
			function executeWithFn(fn) {
				return function (num) {
					return execute(num, fn);
				};
			}
			function executeWithFnNum(fn, num) {
				return execute(num, fn);
			}

			function isNum(a) { return typeof a === 'number'; }
			function isFn(a)  { return typeof a === 'function'; }

			var overloaded = overload(execute, [isNum], executeWithNum);
			overloaded = overload(overloaded, [isFn], executeWithFn);
			overloaded = overload(overloaded, [isFn, isNum], executeWithFnNum);

			function timesTwo(a) {
				return a * 2;
			}

			expect( overloaded(2, timesTwo) ).toBe( 4 );
			expect( overloaded(2)(timesTwo) ).toBe( 4 );
			expect( overloaded(timesTwo)(2) ).toBe( 4 );
			expect( overloaded(timesTwo, 2) ).toBe( 4 );

			overloaded = overload(
				[[isNum, isFn], execute],
				[[isFn, isNum], executeWithFnNum],
				[[isNum],       executeWithNum],
				[[isFn],        executeWithFn]
			);

			expect( overloaded(2, timesTwo) ).toBe( 4 );
			expect( overloaded(2)(timesTwo) ).toBe( 4 );
			expect( overloaded(timesTwo)(2) ).toBe( 4 );
			expect( overloaded(timesTwo, 2) ).toBe( 4 );
			expect( overloaded('wrong') ).toBe( undefined );

			function def() {
				return 'nope';
			}

			overloaded = overload(
				[[isNum, isFn], execute],
				[[isFn, isNum], executeWithFnNum],
				[[isNum],       executeWithNum],
				[[isFn],        executeWithFn],
				def
			);

			expect( overloaded(2, timesTwo) ).toBe( 4 );
			expect( overloaded(2)(timesTwo) ).toBe( 4 );
			expect( overloaded(timesTwo)(2) ).toBe( 4 );
			expect( overloaded(timesTwo, 2) ).toBe( 4 );
			expect( overloaded('wrong') ).toBe( 'nope' );
		});

	});

});
