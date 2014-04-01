
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
			that = that[method].apply(that, o.args);
			var exp = expect( that && is.set(that.value) ? that.value : that );
			if (o.loose) exp.toEqual( o.result );
			else         exp.toBe( o.result );
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

			var pass = util.pass();
			var passDefault = util.pass(
				function () { return { args: [testFn] }; }
			);
			var checkWith = function (checker) {
				return passDefault().checkWith(checker);
			};

			describe("allows using library defined function", function () {
				var testing = merge(require('reusable/function-functions'), {
					fixArity:  [
					            pass( λ('a + b'), 1 ).checkWith( λ('_("ari", "ty")') ).get( 'ariundefined' ),
					            pass( testFn, 2 ).checkWith( λ('_.length') ).get( 2 ),
					            pass( testFn, 7 ).checkWith( λ('_.length') ).get( 7 ),
					],
					maybe: [
					            pass( λ('/2'), λ('_ -> !isNaN(_)') ).checkWith( λ('_(undefined)') ).get( undefined ),
					            pass( λ('/2'), λ('_ -> !isNaN(_)') ).checkWith( λ('_(10)') ).get( 5 ),
					],
					promoteArg: [
					            pass( testFn, 1 ).checkWith( λ('_(10, 2)') ).get( 0.2 ),
					            pass( λ('"" + a + b + c'), 2 ).checkWith( λ('_("OK")') ).get( 'undefinedundefinedOK' ),
					],
					promoteArgSolid: [
					            pass( testFn, 1 ).checkWith( λ('_(10, 2)') ).get( 0.2 ),
					            pass( λ('"" + a + b + c'), 2 ).checkWith( λ('_("OK")') ).get( 'OKundefinedundefined' ),
					],
				});
				util.checkMethods(testing,
					function (method, o) {
						var that = xt(o.args.shift());
						that = that[method].apply(that, o.args);
						var exp = expect( o.checker(that && is.set(that.value) ? that.value : that) );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);

				it("loop", function () {
					var result = xt(function (i, e, s) {
						expect(i).toBe(0);
						expect(e).toBe(Infinity);
						expect(s).toBe(0);
						// console.log(i, e, s);
						return 'hi';
					}).loop();
					expect(result.value).toBe('hi');

					var sum = 0;
					result = xt(function (i, e, s) {
						console.log(i, e, s);
						sum += i;
						expect(e).toBe(5);
						expect(s).toBe(0);
					}).loop(5);
					expect(sum).toBe(10);
					expect(result).toBe(undefined);

					sum = 0;
					result = xt(function (i, e, s) {
						// console.log(i, e, s);
						sum += i;
						expect(e).toBe(100);
						expect(s).toBe(5);
						if (i === 7) return 0;
					}).loop(5, 100);
					expect(sum).toBe(18);
					expect(result.value).toBe(0);

					sum = 0;
					xt(function (i, e, s) {
						// console.log(i, e, s);
						sum += i;
						expect(e).toBe(1);
						expect(s).toBe(5);
					}).loop(5, 1);
					expect(sum).toBe(14);
				});

				it("memoize", function () {
					var testFn = λ('*2');
					var memoized = xt(testFn).memoize().value;
					expect( testFn(6) ).toBe( memoized(6) );
					expect( memoized(6) ).toBe( memoized(6) );
					expect( memoized(6) ).not.toBe( memoized(5) );
				});

				it("returnThis", function () {
					var obj = { test: xt(testFn).returnThis().value };
					expect( obj.test(2, 2) ).toBe(obj);
				});

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/function')) ).toBe( size(testing) + 3 );
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
					expect( size(require('agj/number')) ).toBe( size(testing) );
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
