
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var tween = require('agj/tween');

	describe("Tween functions:", function () {
		describe("live array", function () {
			beforeEach( function () {
				this.start = [0, 1, 10, 100];
				this.end = [100, 10, 1, 0];
			});

			it("returns an object with the result array, the progress, an updated signal, a finished promise, and a stop function", function () {
				var t = tween.liveArray(this.start, this.end, 0);
				expect( t.result ).toEqual( jasmine.any(Array) );
				expect( t.progress ).toEqual( jasmine.any(Number) );
				expect( t.updated.add ).toEqual( jasmine.any(Function) );
				expect( t.finished.then ).toEqual( jasmine.any(Function) );
				expect( t.stop ).toEqual( jasmine.any(Function) );
			});

			it("passes result array when the promise is resolved", function (done) {
				var t = tween.liveArray(this.start, this.end, 0);
				t.finished.then( function (result) {
					expect( result ).toBe( t.result );
					expect( result ).not.toBe( this.start );
					expect( result ).not.toBe( this.end );
					done();
				}.bind(this));
			});

			it("starts with an array identical to startState", function (done) {
				var t = tween.liveArray(this.start, this.end, 0);
				t.finished.then( function (result) {
					expect( t.result ).toBe( result );
					done();
				}.bind(this));
				expect( t.result ).toEqual( this.start );
			});

			it("finishes with an array identical to endState", function (done) {
				var t = tween.liveArray(this.start, this.end, 0);
				t.finished.then( function (result) {
					expect( result ).toEqual( this.end );
					done();
				}.bind(this));
			});

			it("should not take less than the specified duration, but also not much longer", function (done) {
				var t = tween.liveArray(this.start, this.end, 50);
				var startTime = Date.now();
				t.finished.then( function (result) {
					var total = Date.now() - startTime;
					expect( total ).toBeGreaterThan( 50 );
					expect( total ).toBeLessThan( 80 );
					done();
				});
			});

			it("notifies each update via signal dispatch, passing result and progress", function (done) {
				var t = tween.liveArray(this.start, this.end, 50);
				t.updated.add( function (result, progress) {
					expect( result ).toBe( t.result );
					if (progress === 1) {
						expect( result ).toEqual( this.end );
					} else {
						expect( result ).not.toEqual( this.start );
						expect( result ).not.toEqual( this.end );
						expect( result[0] ).toBeGreaterThan( this.start[0] );
						expect( result[0] ).toBeLessThan( this.end[0] );
						expect( result[3] ).toBeLessThan( this.start[3] );
						expect( result[3] ).toBeGreaterThan( this.end[3] );
					}
				}.bind(this));
				t.finished.then(done);
			});
		});
	});

});
