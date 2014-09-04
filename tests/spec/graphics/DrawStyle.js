
define( function (require) {
	'use strict';
	
	var DrawStyle = require('agj/graphics/DrawStyle');
	
	describe("graphics/DrawStyle", function () {

		it("defines draw style", function () {
			var style = new DrawStyle()
				.fillColor(0xff0000)
				.fillAlpha(0.5)
				.lineColor(0x00ff00)
				.lineAlpha(0.7)
				.lineWeight(3)
				.lineCapsStyle('round')
				.lineJointStyle('bevel')
				.lineMiterLimit(10);

			expect( style.fillColor()      ).toBe( 0xff0000 );
			expect( style.fillAlpha()      ).toBe( 0.5 );
			expect( style.lineColor()      ).toBe( 0x00ff00 );
			expect( style.lineAlpha()      ).toBe( 0.7 );
			expect( style.lineWeight()     ).toBe( 3 );
			expect( style.lineCapsStyle()  ).toBe( 'round' );
			expect( style.lineJointStyle() ).toBe( 'bevel' );
			expect( style.lineMiterLimit() ).toBe( 10 );

			expect( style.definesFill() ).toBe( true );
			expect( style.definesLine() ).toBe( true );
		});

		it("returns usable defaults in case a value is unset", function () {
			var style = new DrawStyle();

			expect( style.fillColor()      ).toBe( 0 );
			expect( style.fillAlpha()      ).toBe( 0 );
			expect( style.lineColor()      ).toBe( 0 );
			expect( style.lineAlpha()      ).toBe( 0 );
			expect( style.lineWeight()     ).toBe( 0 );
			expect( style.lineCapsStyle()  ).toBe( 'butt' );
			expect( style.lineJointStyle() ).toBe( 'round' );
			expect( style.lineMiterLimit() ).toBe( 3 );

			expect( style.definesFill() ).toBe( false );
			expect( style.definesLine() ).toBe( false );
		});

	});

});
