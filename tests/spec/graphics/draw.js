
define( function (require) {
	'use strict';
	
	var draw = require('agj/graphics/draw');
	var DrawStyle = require('agj/graphics/DrawStyle');
	
	describe("graphics/draw", function () {

		var canvas, ctx, blackFill, blackLine;

		beforeEach( function () {
			canvas = document.createElement('canvas');
			canvas.width = 100;
			canvas.height = 100;
			ctx = canvas.getContext('2d');
			blackFill = new DrawStyle().setFillColor(0x000000).setFillAlpha(1);
			blackLine = new DrawStyle().setLineColor(0x000000).setLineAlpha(1).setLineWeight(2);
		});

		function pixelAt(ctx, x, y) {
			var data = ctx.getImageData(x, y, 1, 1).data;
			function c(color) {
				var r = color.toString(16);
				while (r.length < 2) r = '0' + r;
				return r;
			}
			var r = c(data[3]) + c(data[0]) + c(data[1]) + c(data[2]);
			console.log(x, y, r);
			return r;
		}

		it("rectangle() draws a rectangle", function () {
			draw.rectangle(ctx, blackFill, { x: 0, y: 0, width: 50, height: 50 });

			// Inside.
			expect( pixelAt(ctx, 25, 25) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 49, 49) ).toBe( 'ff000000' );

			// Outside.
			expect( pixelAt(ctx, 51, 25) ).toBe( '00000000' );
			expect( pixelAt(ctx, 25, 51) ).toBe( '00000000' );
			expect( pixelAt(ctx, 51, 51) ).toBe( '00000000' );
		});

		it("circle() draws a circle", function () {
			draw.circle(ctx, blackFill, { x: 50, y: 50, radius: 25 });
			var sine = Math.sin(Math.PI / 4) * 25;

			// Inside.
			expect( pixelAt(ctx, 50, 50) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 26, 50) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 50, 26) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 50 - sine + 1, 50 - sine + 1) ).toBe( 'ff000000' );

			// Outside.
			expect( pixelAt(ctx, 24, 50) ).toBe( '00000000' );
			expect( pixelAt(ctx, 50, 24) ).toBe( '00000000' );
			expect( pixelAt(ctx, 50 - sine - 1, 50 - sine - 1) ).toBe( '00000000' );
		});

		it("line() draws a line", function () {
			draw.line(ctx, blackLine, { x: 0, y: 0 }, { x: 100, y: 100 });

			// Inside.
			expect( pixelAt(ctx, 1, 1) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 50, 50) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 99, 99) ).toBe( 'ff000000' );

			// Outside.
			expect( pixelAt(ctx, 4, 1) ).toBe( '00000000' );
			expect( pixelAt(ctx, 1, 4) ).toBe( '00000000' );
			expect( pixelAt(ctx, 96, 99) ).toBe( '00000000' );
			expect( pixelAt(ctx, 99, 96) ).toBe( '00000000' );
		});

		it("curve() draws a quadratic curve", function () {
			draw.curve(ctx, blackLine, { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 });

			// Inside.
			expect( pixelAt(ctx, 3, 0) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 99, 96) ).toBe( 'ff000000' );
			expect( pixelAt(ctx, 75, 25) ).toBe( 'ff000000' );

			// Outside.
			expect( pixelAt(ctx, 73, 27) ).toBe( '00000000' );
		});

	});

});
