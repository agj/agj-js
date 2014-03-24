
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
			maybe: [
				pass( λ('_ -> !isNaN(_)'), 'default', testFun ).checkWith( λ('_(0, 0)') ).get( 'default' ),
				pass( λ('_ -> !isNaN(_)'), 'default', testFun ).checkWith( λ('_(10, 2)') ).get( 5 )
			],
			fixArity:  [
				pass( 1, λ('a + b') ).checkWith( λ('_("ari", "ty")') ).get( 'ariundefined' ),
				pass( 2, testFun ).checkWith( λ('_.length') ).get( 2 ),
				pass( 7, testFun ).checkWith( λ('_.length') ).get( 7 )
			]
		});

		util.checkMethods(testing,
			function (method, o) {
				var result = fn[method].apply(fn, o.args);
				expect( o.checker(result) ).toBe( o.result );
			}
		);

		it("returnThis", function () {
			var obj = { test: fn.returnThis(testFun) };
			expect( obj.test(2, 2) ).toBe(obj);
		});

		it("all functions tested", function () {
			var size = require('agj/object/size');
			expect( size(fn) ).toBe( size(testing) + 1 );
		});
	});

});
