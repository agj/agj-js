
define( function (require) {

	var array = require('agj/array');

	var is = require('agj/is');


	function check(obj, method, args, value, loose) {
		if (!args) args = [];
		expect( array[method].apply(null, [obj].concat(args)) )[loose ? 'toEqual' : 'toBe'](value);
	}
	function checkMethods(objGetter, methods) {
		Object.keys(methods).forEach( function (methodName) {
			var args = methods[methodName];
			it(methodName, function () {
				check(objGetter(), methodName, args[0], args[1], args[2]);
			});
		});
	}

	describe("Array features function", function () {
		var arr;

		beforeEach( function () {
			arr = ['10', '1', '100'];
		});

		checkMethods( function () { return arr; }, {
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
		});

		it("getRandom", function () {
			expect( arr ).toContain( array.getRandom(arr) );
		});

		it("overlaps", function () {
			expect( array.overlaps(arr, ['nope', 'no', '100', 'not this one']) ).toBe(true);
			expect( array.overlaps(arr, ['nope', 'no', 'not this one']) ).toBe(false);
		});

		it("shuffle", function () {
			var shuffled = array.shuffle(arr);
			expect( shuffled ).toBe(arr);
			expect( shuffled.length ).toBe(3);
			expect( shuffled ).toContain('1');
			expect( shuffled ).toContain('10');
			expect( shuffled ).toContain('100');
		});

		it("set2D", function () {
			expect( array.set2D(arr, 2, 0, 1, 'new')[2] ).toBe('new');
		});
	});

});
