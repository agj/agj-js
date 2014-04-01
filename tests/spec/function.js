
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var fnFunctions = require('reusable/function-functions');
	var λ = require('lib/lambda-functional.js');
	var merge = require('agj/object/merge');

	var fn = require('agj/function');

	describe("Function utility", function () {
		var testFn = λ('a / b');
		var pass = util.pass();
		
		var testing = merge(fnFunctions, {
			fixArity:  [
			            pass( 1, λ('a + b') ).checkWith( λ('_("ari", "ty")') ).get( 'ariundefined' ),
			            pass( 2, testFn ).checkWith( λ('_.length') ).get( 2 ),
			            pass( 7, testFn ).checkWith( λ('_.length') ).get( 7 ),
			],
			maybe: [
			            pass( λ('_ -> !isNaN(_)'), λ('/2') ).checkWith( λ('_(undefined)') ).get( undefined ),
			            pass( λ('_ -> !isNaN(_)'), λ('/2') ).checkWith( λ('_(10)') ).get( 5 ),
			],
			promoteArg: [
			            pass( 1, testFn ).checkWith( λ('_(10, 2)') ).get( 0.2 ),
			            pass( 2, λ('"" + a + b + c') ).checkWith( λ('_("OK")') ).get( 'undefinedundefinedOK' ),
			],
			promoteArgSolid: [
			            pass( 1, testFn ).checkWith( λ('_(10, 2)') ).get( 0.2 ),
			            pass( 2, λ('"" + a + b + c') ).checkWith( λ('_("OK")') ).get( 'OKundefinedundefined' ),
			],
		});

		util.checkMethods(testing,
			function (method, o) {
				var result = fn[method].apply(fn, o.args);
				expect( o.checker(result) ).toBe( o.result );
			}
		);

		it("loop", function () {
			var result = fn.loop( function (i, e, s) {
				expect(i).toBe(0);
				expect(e).toBe(Infinity);
				expect(s).toBe(0);
				return 'hi';
			});
			expect(result).toBe('hi');

			var sum = 0;
			result = fn.loop(5, function (i, e, s) {
				sum += i;
				expect(e).toBe(5);
				expect(s).toBe(0);
			});
			expect(sum).toBe(10);
			expect(result).toBe(undefined);

			sum = 0;
			result = fn.loop(5, 100, function (i, e, s) {
				sum += i;
				expect(e).toBe(100);
				expect(s).toBe(5);
				if (i === 7) return 0;
			});
			expect(sum).toBe(18);
			expect(result).toBe(0);

			sum = 0;
			fn.loop(5, 1, function (i, e, s) {
				sum += i;
				expect(e).toBe(1);
				expect(s).toBe(5);
			});
			expect(sum).toBe(14);
		});

		it("memoize", function () {
			var testFn = λ('*2');
			var memoized = fn.memoize(testFn);
			expect( testFn(6) ).toBe( memoized(6) );
			expect( memoized(6) ).toBe( memoized(6) );
			expect( memoized(6) ).not.toBe( memoized(5) );
		});

		it("returnThis", function () {
			var obj = { test: fn.returnThis(testFn) };
			expect( obj.test(2, 2) ).toBe(obj);
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(fn) ).toBe( size(testing) + 3 );
		});
	});

});
