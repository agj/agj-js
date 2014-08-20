
define( function (require) {
	'use strict';
	
	var parameters = require('agj/function/parameters');
	
	describe("function/parameters", function () {

		it("takes a function and returns an array of the names of its parameters", function () {
			expect( parameters(function (first, theSecond, a_third) { }) ).toEqual( ['first', 'theSecond', 'a_third'] );
			expect( parameters(function () { }) ).toEqual( [] );
		});

	});

});
