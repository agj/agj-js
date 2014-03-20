
define( function (require) {

	var take = require('agj/take');

	var is = require('agj/is');


	describe("Take", function () {

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
				var methods = {
					clone: [null, ['10', '1', '100'], true],
					first: [null, '10'],
					last: [null, '100'],
					// getRandom - Test below
					// overlaps - Test below
					getDifference: [ [['10', '100']], ['1'], true ],
					subtract: [ [['100']], ['10', '1'], true ],
					getIntersection: [ [['10', '100']], ['10', '100'], true ],
					remove: [ ['1'], ['10', '100'], true ],
					// shuffle - Test below

					get2D: [ [2, 0, 1], '100' ],
					// set2D - Test below

					nextTo: [ ['1'], '100' ],
					prevTo: [ ['1'], '10' ],
					nextIndex: [ [2], 0 ],
					prevIndex: [ [0], 2 ],
					nextIndexTo: [ ['1'], 2 ],
					prevIndexTo: [ ['1'], 0 ]
				};

				function check(obj, method, args, value, loose) {
					var that = take(obj);
					expect( that[method].apply(that, args).value )[loose ? 'toEqual' : 'toBe'](value);
				}
				Object.keys(methods).forEach( function (methodName) {
					var args = methods[methodName];
					it(methodName, function () {
						check(arr, methodName, args[0], args[1], args[2]);
					});
				});

				it("getRandom", function () {
					expect( arr ).toContain( take(arr).getRandom().value );
				});

				it("overlaps", function () {
					expect( take(arr).overlaps(['nope', 'no', '100', 'not this one']).value ).toBe(true);
					expect( take(arr).overlaps(['nope', 'no', 'not this one']).value ).toBe(false);
				});

				it("shuffle", function () {
					var shuffled = take(arr).shuffle().value;
					expect( shuffled ).toBe(arr);
					expect( shuffled.length ).toBe(3);
					expect( shuffled ).toContain('1');
					expect( shuffled ).toContain('10');
					expect( shuffled ).toContain('100');
				});

				it("set2D", function () {
					expect( take(arr).set2D(2, 0, 1, 'new').value[2] ).toBe('new');
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

			describe("adds chained property reading/writing", function () {
				it("get", function () {
					expect( take(arr).get(2).value ).toBe('100');
				});
				it("set", function () {
					expect( take(arr).set(1, 'inserted').value ).toEqual(['10', 'inserted', '100']);
				});
				it("len", function () {
					expect( take(arr).len().value ).toBe(3);
				});
			});
		});

		describe("Function module", function () {
			require('agj/take/function');
			var func;

			beforeEach( function () {
				func = function (a, b) { return a / b; };
			});

			it("allows using library defined functions", function () {
				expect( func(10, 2) ).toBe(5);
				expect( take(func).flip().value(2, 10) ).toBe(5);
			});

			it("allows using native prototype functions", function () {
				expect( take(func).apply(null, [10, 2]).value ).toEqual(5);
			});
		});

		describe("Number module", function () {
			require('agj/take/number');

			it("allows using library defined functions", function () {
				expect( take(10).toHex(2).value ).toBe('0a');
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

			it("allows using library defined functions", function () {
				expect( take(obj).values().value ).toEqual(['Ale', 'Grilli']);
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

			it("allows using library defined functions", function () {
				expect( take('hello').first(4).value ).toBe('hell');
			});

			it("allows using native prototype functions", function () {
				expect( take('hello').slice(1, 3).value ).toEqual('el');
			});

			it("adds chained length property reading", function () {
				expect( take('cinco').len().value ).toBe(5);
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
