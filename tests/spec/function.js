
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
					.becauseIt("takes three arguments (predicate, elseValue, fn) and produce a function which checks its passed argument against the predicate, which if returns truthy, passes it to fn and returns its result"),
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
				if (o.checker) result = o.checker(result);
				var exp = expect( result );
				if (o.loose) exp.toEqual( o.result );
				else         exp.toBe( o.result );
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
