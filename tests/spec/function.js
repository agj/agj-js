
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var fnFunctions = require('reusable/function-functions');
	var λ = require('lib/lambda-functional.js');
	var merge = require('agj/object/merge');

	var fn = require('agj/function');

	describe("Function utility", function () {
		var testFn = λ('a / b');
		var declarator = util.declarator();
		var pass = declarator.pass;
		
		var testing = merge(fnFunctions, {
			fixArity: [
				pass( 1, λ('a + b') )
					.checkWith( λ('_("ari", "ty")') )
					.get( 'ariundefined' )
					.becauseIt("can limit passed arguments to just 1, leaving the rest undefined"),
				pass( 2, testFn )
					.checkWith( λ('_.length') )
					.get( 2 )
					.becauseIt("can convert functions to an arity of 2 as observable via its length property"),
				pass( 7, testFn )
					.checkWith( λ('_.length') )
					.get( 7 )
					.becauseIt("can convert functions to an arity of 7 as observable via its length property"),
			],
			maybe: [
				pass( λ('!isNaN(_)'), 'default', λ('/2') )
					.checkWith( λ('_(10)') )
					.get( 5 )
					.becauseIt("takes three arguments (predicate, elseValue, fn) and produces a function which checks its passed argument against the predicate, which if returns truthy, passes it to fn and returns its result"),
				pass( λ('!isNaN(_)'), 'default', λ('/2') )
					.checkWith( λ('_("not a number")') )
					.get( 'default' )
					.becauseIt("produces a function which returns the elseValue if the predicate returns falsy for the passed value"),
				pass( λ('!isNaN(_)') )
					.checkWith( function (_) {
						var maybed = _('default')(λ('/2'));
						return maybed('not a number');
					})
					.get( 'default' )
					.becauseIt("can receive one argument at a time thanks to auto-currying"),
				pass( λ('!isNaN(_)'), 'default' )
					.checkWith( function (_) {
						var maybed = _(λ('/2'));
						return maybed('not a number');
					})
					.get( 'default' )
					.becauseIt("can receive two first and one later"),
				pass( λ('!isNaN(_)') )
					.checkWith( function (_) {
						var maybed = _('default', λ('/2'));
						return maybed('not a number');
					})
					.get( 'default' )
					.becauseIt("can receive one first and two later"),
				pass( λ('!isNaN(_)'), λ('/2') )
					.checkWith( λ('_("not a number")') )
					.get( undefined )
					.becauseIt("will take two function arguments passed together and not curry itself, because the elseValue is optional"),
				pass( λ('!isNaN(_)') )
					.checkWith( function (_) {
						var maybed = _(λ('/2'));
						return maybed('not a number');
					})
					.get( undefined )
					.becauseIt("will take one function argument, and then another, and not curry itself further, because the elseValue is optional"),
				pass( λ('!isNaN(_)'), testFn, λ('/2') )
					.checkWith( λ('_("not a number")') )
					.get( testFn )
					.becauseIt("can take the three arguments together, if a function type elseValue is needed"),
				pass( λ('!isNaN(_)') )
					.checkWith( function (_) {
						var maybed = _(testFn, λ('/2'));
						return maybed('not a number');
					})
					.get( testFn )
					.becauseIt("can take the first argument, and then two function arguments together, if a function type elseValue is needed"),
			],
			promoteArg: [
				pass( 1, testFn )
					.checkWith( λ('_(10, 2)') )
					.get( 0.2 )
					.becauseIt(""),
				pass( 2, λ('"" + a + b + c') )
					.checkWith( λ('_("OK")') )
					.get( 'undefinedundefinedOK' )
					.becauseIt(""),
			],
			promoteArgSolid: [
				pass( 1, testFn )
					.checkWith( λ('_(10, 2)') )
					.get( 0.2 )
					.becauseIt(""),
				pass( 2, λ('"" + a + b + c') )
					.checkWith( λ('_("OK")') )
					.get( 'OKundefinedundefined' )
					.becauseIt(""),
			],
		});

		util.checkMethods(testing,
			function (method, o) {
				var result = fn[method].apply(fn, o.args);
				while (o) {
					var res = result;
					if (o.checker) res = o.checker(res);
					var exp = expect( res );
					if (o.loose) exp.toEqual( o.result );
					else         exp.toBe( o.result );
					o = o.next;
				}
			}
		);

		describe("loop", function () {
			it("passes index, endIndex, and startIndex values to the supplied function", function () {
				fn.loop( function (i, e, s) {
					expect(i).toBe(0);
					expect(e).toBe(Infinity);
					expect(s).toBe(0);
					return true;
				});
			});

			it("calls the passed function until it returns a non-undefined value, and returns that", function () {
				var iter;
				var result = fn.loop( function (i, e, s) {
					iter = i;
					return 'hi';
				});
				expect(iter).toBe(0);
				expect(result).toBe('hi');
			});

			it("optionally accepts an endIndex argument, up to which (but not including) it will iterate", function () {
				var sum = 0;
				var result = fn.loop(5, function (i, e, s) {
					sum += i;
					expect(e).toBe(5);
					expect(s).toBe(0);
				});
				expect(sum).toBe(10);
				expect(result).toBe(undefined);
			});

			it("optionally accepts a set of startIndex and endIndex values, between which it will iterate", function () {
				var sum = 0;
				var result = fn.loop(5, 100, function (i, e, s) {
					sum += i;
					expect(e).toBe(100);
					expect(s).toBe(5);
					if (i === 7) return 0;
				});
				expect(sum).toBe(18);
				expect(result).toBe(0);
			});

			it("can take a higher start value for a decreasing iterator", function () {
				var calc = 120;
				fn.loop(5, 1, function (i, e, s) {
					calc /= i;
					expect(e).toBe(1);
					expect(s).toBe(5);
				});
				expect(calc).toBe(1);
			});
		});

		describe("memoize", function () {
			var testFn = λ('*2');
			var memoized = fn.memoize(testFn);
			it("only makes a memoized version of a function, so the output for the same input should be the same for the original and the memoized functions", function () {
				expect( testFn(6) ).toBe( memoized(6) );
			});
			it("produces a memoized function whose output should be the same each time it's called with the same input", function () {
				expect( memoized(6) ).toBe( memoized(6) );
			});
			it("produces a memoized function whose output should differ for different inputs, if the original function has that property", function () {
				expect( testFn(6) ).not.toBe( testFn(5) );
				expect( memoized(6) ).not.toBe( memoized(5) );
			});
		});

		describe("returnArg", function () {
			it("takes the value 0 and a function, and returns a function that when called executes the original function, but returns the first argument passed to it", function () {
				var arr = [];
				var _ = fn.returnArg(0, function () {
					return arr[0] = 'hi';
				});
				expect( _(50, 100, 3) ).toBe( 50 );
				expect( arr ).toEqual( ['hi'] );
			});
			it("takes the value 2 and a function, and returns a function that when called executes the original function, but returns the third argument passed to it", function () {
				var arr = [];
				var _ = fn.returnArg(2, function () {
					return arr[0] = 'hi';
				});
				expect( _(50, 100, 3) ).toBe( 3 );
				expect( arr ).toEqual( ['hi'] );
			});
			it("takes optionally just a function, and returns a function that when called executes the original function, but returns the first argument passed to it", function () {
				var arr = [];
				var _ = fn.returnArg( function () {
					return arr[0] = 'hi';
				});
				expect( _(50, 100, 3) ).toBe( 50 );
				expect( arr ).toEqual( ['hi'] );
			});
		});

		describe("returnThis", function () {
			it("takes a function and forces it to return the value of 'this'", function () {
				var objA = { test: testFn };
				var objB = { test: fn.returnThis(testFn) };
				expect( objA.test(2, 2) ).toBe(1);
				expect( objB.test(2, 2) ).toBe(objB);
			});
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(fn) ).toBe( size(testing) + 4 );
		});
	});

});
