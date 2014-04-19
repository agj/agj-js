
define( function (require) {
	'use strict';

	var is = require('agj/is');
	var util = require('util/util');
	var merge = require('agj/object/merge');
	var λ = require('lib/lambda-functional.js');

	var xt = require('agj/extend/string')
		.register(require('agj/extend/number'))
		.register(require('agj/extend/array'))
		.register(require('agj/extend/object'))
		.register(require('agj/extend/function'));


	describe("Extend function:", function () {

		var standardChecker = function (method, o) {
			var that = xt(o.args.shift());
			var result = that[method].apply(that, o.args);
			while (o) {
				var res = result;
				if (o.checker) res = o.checker(res && is.set(res.value) ? res.value : res);
				var exp = expect( res && is.set(res.value) ? res.value : res );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
				o = o.next;
			}
		};

		describe("allows wrapping a primitive", function () {
			describe("string, which still", function () {
				it("is instance of String", function () {
					expect( xt('some string') instanceof String ).toBe(true);
				});
				it("coerces into its primitive value", function () {
					expect( xt('some string') == 'some string' ).toBe(true);
					expect( xt('aaa') < 'zzz' ).toBe(true);
					expect( xt('some string').valueOf() ).toBe('some string');
					expect( xt('some string') + ' concatenated' ).toBe('some string concatenated');
				});
			});
			describe("number, which still", function () {
				it("is instance of Number", function () {
					expect( xt(10) instanceof Number ).toBe(true);
				});
				it("coerces into its primitive value", function () {
					expect( xt(10) == 10 ).toBe(true);
					expect( xt(-10) < 10 ).toBe(true);
					expect( xt(10).valueOf() ).toBe(10);
					expect( xt(10) + 5 ).toBe(15);
				});
			});
		});

		describe("allows wrapping a native", function () {
			it("which remains an instance of its type", function () {
				expect( xt([]) instanceof Array ).toBe(true);
				expect( xt({}) instanceof Object ).toBe(true);
				expect( xt(function () {}) instanceof Function ).toBe(true);
			});
			it("which coerces adequately to string", function () {
				expect( xt([1,2,3]) + '' ).toBe('1,2,3');
			});
			it("which keeps its native value accessible via the 'value' property", function () {
				var arr = [1,2,3];
				var obj = { yeah: 'hey' };
				expect( xt(arr).value ).toBe(arr);
				expect( xt(obj).value ).toBe(obj);
			});

			describe("which however", function () {
				it("doesn't coerce to value", function () {
					expect( xt([1,2,3]) ).not.toEqual([1,2,3]);
					expect( [1,2,3].concat(xt([4,5,6]))[3].value ).toEqual([4,5,6]);
				});
				it("is not recognized of the type, in the case of arrays", function () {
					expect( Array.isArray(xt([])) ).toBe(false);
				});
				it("does not allow access to properties directly", function () {
					expect( xt(['one', 'two'])[0] ).toBe(undefined);
					expect( xt({ 'one': 1, 'two': 2})['two'] ).toBe(undefined);
				});
				it("doesn't coerce to value", function () {
					expect( xt([1,2,3]) ).not.toEqual([1,2,3]);
					expect( [1,2,3].concat(xt([4,5,6])) ).not.toEqual([1,2,3,4,5,6]);
				});
			});

			describe("object (literal), which", function () {
				it("makes static methods available as well", function () {
					expect( xt({ yeah: 'hey' }).keys().value ).toEqual(['yeah']);
				});
			});
		});

		describe("Array module", function () {
			describe("allows using library defined extension", function () {
				var testing = require('reusable/array-functions');
				util.checkMethods(testing, standardChecker);

				it("getRandom", function () {
					var arr = ['a', 'b', 'c'];
					expect( arr ).toContain( xt(arr).getRandom().value );
				});

				it("shuffle", function () {
					var arr = ['a', 'b', 'c'];
					var shuffled = xt(arr).shuffle().value;
					expect( shuffled ).toBe(arr);
					expect( shuffled.length ).toBe(3);
					expect( shuffled ).toContain('a');
					expect( shuffled ).toContain('b');
					expect( shuffled ).toContain('c');
				});

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/array')) ).toBe( size(testing) + 2 );
				});
			});

			it("allows using native prototype functions", function () {
				expect(
					xt(['1', '2', '3']).map(λ('parseInt(_, 10)')).value
				).toEqual([1, 2, 3]);
			});

			it("fixes mutator methods to return the mutated array when it makes sense to", function () {
				expect(
					xt(['a', 'b', 'c']).unshift('inserted').pop().reverse().shift().value
				).toEqual(['a', 'inserted']);
			});

			describe("adds chained property accessor", function () {
				var pass = util.pass( function () {
					return { args: [['one', 'two', 'three']] };
				});
				util.checkMethods(
					{
						get: pass(2).get('three'),
						set: pass(2, 'changed').get(['one', 'two', 'changed']),
					}, function (method, o) {
						var that = xt(o.args.shift());
						that = that[method].apply(that, o.args);
						var exp = expect( that && is.set(that.value) ? that.value : that );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});

			describe("allows direct access to property", function () {
				it("length", function () {
					expect( xt(['a', 'b', 'c']).length == 3 ).toBe(true);
				});
			});
		});

		describe("Function module", function () {
			var testFn = λ('a / b');

			var pass = util.declarator().pass;
			var taking = util.declarator( function () {
				var r = {};
				r.taking = function (v) {
					this.args = this.args || [];
					this.args.unshift(v);
					return this;
				};
				return r;
			}).taking;
			var declaratorDefault = util.declarator(
				function () { return { args: [testFn] }; }
			);
			var passDefault = declaratorDefault.pass;
			var checkWith = declaratorDefault.checkWith;

			describe("allows using library defined function", function () {
				var testing = merge(require('reusable/function-functions'), {
					fixArity:  [
						taking( λ('a + b') )
							.pass( 1 )
							.checkWith( λ('_("ari", "ty")') )
							.get( 'ariundefined' )
							.becauseIt("can limit passed arguments to just 1, leaving the rest undefined"),
						taking( testFn )
							.pass( 2 )
							.checkWith( λ('_.length') )
							.get( 2 )
							.becauseIt("can convert functions to an arity of 2 as observable via its length property"),
						taking( testFn)
							.pass( 7 )
							.checkWith( λ('_.length') )
							.get( 7 )
							.becauseIt("can convert functions to an arity of 7 as observable via its length property"),
					],
					maybe: [
						taking( λ('/2') )
							.pass( λ('!isNaN(_)'), 'default' )
							.checkWith( λ('_(10)') )
							.get( 5 )
							.becauseIt("takes two arguments (predicate, elseValue) and produces a function which checks its passed argument against the predicate, which if returns truthy, passes it to fn and returns its result"),
						taking( λ('/2') )
							.pass( λ('!isNaN(_)'), 'default' )
							.checkWith( λ('_("not a number")') )
							.get( 'default' )
							.becauseIt("produces a function which returns the elseValue if the predicate returns falsy for the passed value"),
						taking( λ('/2') )
							.pass( λ('!isNaN(_)') )
							.checkWith( λ('_(10)') )
							.get( 5 )
							.becauseIt("allows omitting the elseValue"),
						taking( λ('/2') )
							.pass( λ('!isNaN(_)') )
							.checkWith( λ('_("not a number")') )
							.get( undefined )
							.becauseIt("allows omitting the elseValue, so the produced function returns undefined if the value fails the predicate"),
					],
					promoteArg: [
						taking( testFn )
							.pass( 1 )
							.checkWith( λ('_(10, 2)') )
							.get( 0.2 ),
						taking( λ('"" + a + b + c') )
							.pass( 2 )
							.checkWith( λ('_("OK")') )
							.get( 'undefinedundefinedOK' ),
					],
					promoteArgSolid: [
						taking( testFn )
							.pass( 1 )
							.checkWith( λ('_(10, 2)') )
							.get( 0.2 ),
						taking( λ('"" + a + b + c') )
							.pass( 2 )
							.checkWith( λ('_("OK")') )
							.get( 'OKundefinedundefined' ),
					],
				});
				util.checkMethods(testing,
					function (method, o) {
						var that = xt(o.args.shift());
						var result = that[method].apply(that, o.args);
						while (o) {
							var res = result;
							if (o.checker) res = o.checker(res && is.set(res.value) ? res.value : res);
							var exp = expect( res && is.set(res.value) ? res.value : res );
							if (o.loose) exp.toEqual( o.result );
							else         exp.toBe( o.result );
							o = o.next;
						}
					}
				);

				describe("iterate", function () {
					it("passes index, endIndex, and startIndex values to the supplied function", function () {
						xt( function (i, e, s) {
							expect(i).toBe(0);
							expect(e).toBe(Infinity);
							expect(s).toBe(0);
							return true;
						}).iterate();
					});

					it("calls the passed function until it returns a non-undefined value, and returns that", function () {
						var iter;
						var result = xt( function (i, e, s) {
							iter = i;
							return 'hi';
						}).iterate();
						expect(iter).toBe(0);
						expect(result == 'hi').toBe(true);
					});

					it("optionally accepts an endIndex argument, up to which (but not including) it will iterate", function () {
						var sum = 0;
						var result = xt( function (i, e, s) {
							sum += i;
							expect(e).toBe(5);
							expect(s).toBe(0);
						}).iterate(5);
						expect(sum).toBe(10);
						expect(result).toBe(undefined);
					});

					it("optionally accepts a set of startIndex and endIndex values, between which it will iterate", function () {
						var sum = 0;
						var result = xt( function (i, e, s) {
							sum += i;
							expect(e).toBe(100);
							expect(s).toBe(5);
							if (i === 7) return 0;
						}).iterate(5, 100);
						expect(sum).toBe(18);
						expect(result == 0).toBe(true);
					});

					it("can take a higher start value for a decreasing iterator", function () {
						var calc = 120;
						xt( function (i, e, s) {
							calc /= i;
							expect(e).toBe(1);
							expect(s).toBe(5);
						}).iterate(5, 1);
						expect(calc).toBe(1);
					});
				});

				describe("memoize", function () {
					var testFn = λ('*2');
					var memoized = xt(testFn).memoize().value;
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
						var _ = xt(function () {
							return arr[0] = 'hi';
						}).returnArg(0).value;
						expect( _(50, 100, 3) ).toBe( 50 );
						expect( arr ).toEqual( ['hi'] );
					});
					it("takes the value 2 and a function, and returns a function that when called executes the original function, but returns the third argument passed to it", function () {
						var arr = [];
						var _ = xt(function () {
							return arr[0] = 'hi';
						}).returnArg(2).value;
						expect( _(50, 100, 3) ).toBe( 3 );
						expect( arr ).toEqual( ['hi'] );
					});
					it("takes optionally just a function, and returns a function that when called executes the original function, but returns the first argument passed to it", function () {
						var arr = [];
						var _ = xt(function () {
							return arr[0] = 'hi';
						}).returnArg().value;
						expect( _(50, 100, 3) ).toBe( 50 );
						expect( arr ).toEqual( ['hi'] );
					});
				});

				describe("returnThis", function () {
					it("takes a function and forces it to return the value of 'this'", function () {
						var objA = { test: testFn };
						var objB = { test: xt(testFn).returnThis().value };
						expect( objA.test(2, 2) ).toBe(1);
						expect( objB.test(2, 2) ).toBe(objB);
					});
				});

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/function')) ).toBe( size(testing) + 4 );
				});
			});

			it("allows using native prototype functions", function () {
				expect( xt(testFn).apply(null, [10, 2]).value ).toBe(5);
			});

			describe("allows direct access to property", function () {
				it("length", function () {
					expect( testFn.length == 2 ).toBe(true);
				});
			});
		});

		describe("Number module", function () {
			describe("allows using library defined extension", function () {
				var testing = require('reusable/number-functions');
				util.checkMethods(testing, standardChecker);

				it("all functions tested", function () {
					var size = require('agj/object/size');
					var objFilter = require('agj/object/filter');
					expect( size(objFilter(require('agj/number'), is.fn)) ).toBe( size(testing) );
				});
			});

			it("allows using native prototype functions", function () {
				expect( xt(0.1234).toFixed(2).value ).toBe('0.12');
			});
		});

		describe("Object module", function () {
			describe("allows using library defined extension", function () {
				var testing = require('reusable/object-functions');
				util.checkMethods(testing, standardChecker);

				it("forEach", function () {
					var r = '';
					xt({ one: 1, two: '2', three: 'three' }).forEach(function (v) {
						r += v;
					});
					expect( r ).toBe( '12three' );
				});

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/object')) ).toBe( size(testing) + 1 );
				});
			});

			it("allows using native prototype functions", function () {
				var obj = { first: 'Ale', last: 'Grilli' };
				expect( xt(obj).hasOwnProperty('first') ).toBe(true);
				expect( xt(obj).hasOwnProperty('nonexistant') ).toBe(false);
			});

			it("makes static methods available as well", function () {
				var obj = { first: 'Ale', last: 'Grilli' };
				expect( xt(obj).keys().value ).toEqual(['first', 'last']);
			});

			describe("adds chained property accessor", function () {
				var pass = util.pass( function () {
					return { args: [{ a: 'one', b: 'two', c: 'three' }] };
				});
				util.checkMethods(
					{
						get: pass('c').get('three'),
						set: pass('c', 'changed').get({ a: 'one', b: 'two', c: 'changed' }),
					},
					standardChecker
				);
			});
		});

		describe("String module", function () {
			describe("allows using library defined extension", function () {
				var testing = require('reusable/string-functions');
				util.checkMethods(testing, standardChecker);

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/string')) ).toBe( size(testing) );
				});
			});

			it("allows using native prototype functions", function () {
				expect( xt('hello').slice(1, 3).value ).toBe('el');
			});

			describe("allows direct access to property", function () {
				it("length", function () {
					expect( 'cinco'.length == 5 ).toBe(true);
				});
			});
		});

		it("allows naturally stringing return values", function () {
			expect( xt([1,2,3]).concat([4,5,6]).slice(1, 4).value ).toEqual([2,3,4]);
			expect( xt(['1', '2', '3']).reduce(λ('*')) == 6 ).toBe(true);
			expect( xt({ 'a': 2, 'b': 4, 'c': 8 }).keys().push('c').join('').charAt(2).length + 1 ).toBe(2);
		});

	});
	
});
