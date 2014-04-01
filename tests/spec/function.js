
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var fnFunctions = require('reusable/function-functions');
	var λ = require('lib/lambda-functional.js');
	var merge = require('agj/object/merge');

	var fn = require('agj/function');

	describe("Function utility", function () {
		var testFun = λ('a / b');
		var pass = util.pass();
		
		var testing = merge(fnFunctions, {
			fixArity:  [
			            pass( 1, λ('a + b') ).checkWith( λ('_("ari", "ty")') ).get( 'ariundefined' ),
			            pass( 2, testFun ).checkWith( λ('_.length') ).get( 2 ),
			            pass( 7, testFun ).checkWith( λ('_.length') ).get( 7 ),
			],
			maybe: [
			            pass( λ('_ -> !isNaN(_)'), λ('/2') ).checkWith( λ('_(undefined)') ).get( undefined ),
			            pass( λ('_ -> !isNaN(_)'), λ('/2') ).checkWith( λ('_(10)') ).get( 5 ),
			],
			promoteArg: pass(1, testFun).checkWith( λ('_(10, 2)') ).get( 0.2 ),
		});

		util.checkMethods(testing,
			function (method, o) {
				var result = fn[method].apply(fn, o.args);
				expect( o.checker(result) ).toBe( o.result );
			}
		);

		it("memoize", function () {
			var testFn = λ('*2');
			var memoized = fn.memoize(testFn);
			expect( testFn(6) ).toBe( memoized(6) );
			expect( memoized(6) ).toBe( memoized(6) );
			expect( memoized(6) ).not.toBe( memoized(5) );
		});

		it("returnThis", function () {
			var obj = { test: fn.returnThis(testFun) };
			expect( obj.test(2, 2) ).toBe(obj);
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(fn) ).toBe( size(testing) + 2 );
		});
	});

});
