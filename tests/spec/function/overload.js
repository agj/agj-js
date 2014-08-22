
define( function (require) {
	'use strict';
	
	var overload = require('agj/function/overload');
	
	describe("function/overload", function () {

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

		function timesTwo(a) {
			return a * 2;
		}

		it("allows changing a function's functionality if the arguments passed match a set of predicates", function () {
			var overloaded = overload(execute, [isNum], executeWithNum);
			overloaded = overload(overloaded, [isFn], executeWithFn);
			overloaded = overload(overloaded, [isFn, isNum], executeWithFnNum);

			expect( overloaded(2, timesTwo) ).toBe( 4 );
			expect( overloaded(2)(timesTwo) ).toBe( 4 );
			expect( overloaded(timesTwo)(2) ).toBe( 4 );
			expect( overloaded(timesTwo, 2) ).toBe( 4 );
		});

		it("also supports a 'case-like' syntax for setting several possibilities at once", function () {
			var overloaded = overload(
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

		it("also supports overload.rest as a pseudo-predicate to signify that more arguments could be passed and still match", function () {
			var overloadedWithoutRest = overload(
				[[isNum, isFn], execute],
				[[isFn, isNum], executeWithFnNum]
			);
			var overloadedWithRest = overload(
				[[isNum, isFn, overload.rest], execute],
				[[isFn, isNum, overload.rest], executeWithFnNum]
			);

			expect( overloadedWithoutRest(2, timesTwo, 'extra', 'arguments') ).toBe( undefined );
			expect( overloadedWithoutRest(timesTwo, 2, 'extra', 'arguments') ).toBe( undefined );
			expect( overloadedWithRest(2, timesTwo, 'extra', 'arguments') ).toBe( 4 );
			expect( overloadedWithRest(timesTwo, 2, 'extra', 'arguments') ).toBe( 4 );
		});

	});

});
