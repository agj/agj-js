
define( function (require) {

	var take = require('agj/take');
	require('agj/take/array');
	require('agj/take/function');
	require('agj/take/number');
	require('agj/take/object');
	require('agj/take/string');


	describe("Take", function () {

		var module = {
			approve: function (obj) {
				return obj.isCorrect === true;
			},
			does: {
				convertToTrue: function () { return true; },
				identity: function (a) { return a; }
			}
		};

		it("allows registration of new modules", function () {
			take.register(module);
		});

		it("offers an interface to use that module's functions as methods", function () {
			var obj = { isCorrect: true };
			expect(take(obj).convertToTrue().value).toBe(true);
			expect(take(obj).convertToTrue()()).toBe(true);
		});

		xdescribe("Array", function () {
			it("", function () {

			});
		});

	});

	
});
