
define( function (require) {
	'use strict';

	var take = require('agj/take');

	var is = require('agj/is');
	var util = require('util/util');
	var merge = require('agj/object/merge');
	var λ = require('lib/lambda-functional.js');


	describe("Take function:", function () {

		describe("Basic operation", function () {
			var obj;
			var module = {
				approve: function (obj) {
					return obj && obj.isCorrect === true;
				},
				does: {
					convertToOK: function () { return 'ok'; },
					identity: function (a) { return a; }
				}
			};

			beforeEach( function () {
				obj = { isCorrect: true };
			});

			it("allows registration of new modules", function () {
				take.register(module);
			});

			it("offers an interface to use that module's functions as methods...", function () {
				take(obj).convertToOK();
			});

			it("...recovering the result with the 'value' property...", function () {
				expect( take(obj).convertToOK().value ).toBe('ok');
			});

			it("...or using the '()' function calling notation...", function () {
				var result = take(obj).convertToOK();
				expect( result() ).toBe('ok');
				expect( result.value === result() ).toBe(true);
			});

			it("allows chaining methods", function () {
				expect( take(obj).identity().convertToOK().value ).toBe('ok');
			});
		});

		describe("Array module", function () {
			require('agj/take/array');
			var arr;

			beforeEach( function () {
				arr = ['10', '1', '100'];
			});

			describe("allows using library defined function", function () {
				util.checkMethods(require('reusable/array-functions'),
					function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);

				it("getRandom", function () {
					expect( arr ).toContain( take(arr).getRandom().value );
				});

				it("shuffle", function () {
					var shuffled = take(arr).shuffle().value;
					expect( shuffled ).toBe(arr);
					expect( shuffled.length ).toBe(3);
					expect( shuffled ).toContain('1');
					expect( shuffled ).toContain('10');
					expect( shuffled ).toContain('100');
				});
			});

			it("allows using native prototype functions", function () {
				expect(
					take(arr).map( function (v) { return parseInt(v, 10); } ).value
				).toEqual([10, 1, 100]);
			});

			it("fixes mutator methods to return the mutated array when it makes sense to", function () {
				expect(
					take(arr).unshift('inserted').pop().reverse().shift().value
				).toEqual(['10', 'inserted']);
			});

			describe("adds chained property accessor", function () {
				var pass = util.pass( function () {
					return { args: [['one', 'two', 'three']] };
				});
				util.checkMethods(
					{
						get: pass(2).get('three'),
						set: pass(2, 'changed').get(['one', 'two', 'changed']),
						len: pass().get(3)
					}, function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});
		});

		describe("Function module", function () {
			require('agj/take/function');

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
					maybe: [
					           pass( testFn, λ('_ -> !isNaN(_)'), 'default' ).checkWith( λ('_(0, 0)') ).get( 'default' ),
					           pass( testFn, λ('_ -> !isNaN(_)'), 'default' ).checkWith( λ('_(10, 2)') ).get( 5 )
					],
					fixArity:  pass( λ('a + b'), 1 ).checkWith( λ('_("ari", "ty")') ).get( 'ariundefined' )
				});
				util.checkMethods(testing,
					function (method, o) {
						var that = take(o.args.shift());
						var result = that[method].apply(that, o.args).value;
						var exp = expect( o.checker(result) );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);

				it("returnThis", function () {
					var obj = { test: take(testFn).returnThis().value };
					expect( obj.test(2, 2) ).toBe(obj);
				});

				it("all functions tested", function () {
					var size = require('agj/object/size');
					expect( size(require('agj/function')) ).toBe( size(testing) + 1 );
				});
			});

			it("allows using native prototype functions", function () {
				expect( take(testFn).apply(null, [10, 2]).value ).toEqual(5);
			});
		});

		describe("Number module", function () {
			require('agj/take/number');

			describe("allows using library defined function", function () {
				util.checkMethods(require('reusable/number-functions'),
					function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});

			it("allows using native prototype functions", function () {
				expect( take(0.1234).toFixed(2).value ).toEqual('0.12');
			});
		});

		describe("Object module", function () {
			require('agj/take/object');
			var obj;

			beforeEach( function () {
				obj = { first: 'Ale', last: 'Grilli' };
			});

			describe("allows using library defined function", function () {
				util.checkMethods(require('reusable/object-functions'),
					function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});

			it("allows using native prototype functions", function () {
				expect( take(obj).hasOwnProperty('first').value ).toBe(true);
				expect( take(obj).hasOwnProperty('nonexistant').value ).toBe(false);
			});

			it("allows using native static functions", function () {
				expect( take(obj).keys().value ).toEqual(['first', 'last']);
			});
		});

		describe("String module", function () {
			require('agj/take/string');

			describe("allows using library defined function", function () {
				util.checkMethods(require('reusable/string-functions'),
					function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});

			it("allows using native prototype functions", function () {
				expect( take('hello').slice(1, 3).value ).toEqual('el');
			});

			describe("adds chained property accessor", function () {
				var pass = util.pass( function () {
					return { args: ['testing'] };
				});
				util.checkMethods(
					{
						len: pass().get(7)
					}, function (method, o) {
						var that = take(o.args.shift());
						var exp = expect( that[method].apply(that, o.args).value );
						if (o.loose) exp.toEqual( o.result );
						else         exp.toBe( o.result );
					}
				);
			});
		});

		describe("Module inter-operation", function () {
			var obj;

			beforeEach( function () {
				obj = { first: 'Ale', last: 'Grilli' };
			});

			it("allows chaining even as values change to different types", function () {
				expect(
					take(obj).values().last().first(5).toLowerCase().value
				).toBe('grill');
			});
		});
	});
	
});
