
define( function (require) {
	'use strict';
	
	var remove = require('agj/array/remove');
	
	describe("array/remove", function () {

		it("creates an array consisting of the passed array with any instances of an item removed", function () {
			var array = ['a', 'b', 'c', 'd'];
			var removed = remove(array, 'b');

			expect( removed ).toEqual( ['a', 'c', 'd'] );
			expect( removed ).not.toBe( array );
		});

	});

});
