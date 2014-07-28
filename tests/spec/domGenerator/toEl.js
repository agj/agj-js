
define( function (require) {
	'use strict';
	
	var toEl = require('agj/domGenerator/toEl');
	
	describe("domGenerator/toEl", function () {

		it("returns a function that generates a DOM of the specified tag, and which takes as optional arguments class and ID, attributes, and children elements or text", function () {
			var spanGenerator = toEl('span');
			var child = document.createElement('a');
			var element = spanGenerator('.class1#some-id.class2.class3', { title: 'some title', 'data-custom': 'custom data' },
				"text content",
				child
			);

			expect( element.tagName ).toBe( 'SPAN' );
			expect( element.id ).toBe( 'some-id' );
			expect( element.className ).toBe( 'class1 class2 class3' );
			expect( element.getAttribute('title') ).toBe( 'some title' );
			expect( element.getAttribute('data-custom') ).toBe( 'custom data' );
			expect( element.childNodes.length ).toBe( 2 );
			expect( element.childNodes[0].data ).toBe( 'text content' );
			expect( element.childNodes[1] ).toBe( child );

			element = spanGenerator(child, "text content");

			expect( element.tagName ).toBe( 'SPAN' );
			expect( element.childNodes[0].tagName ).toBe( 'A' );
			expect( element.childNodes[1].data ).toBe( "text content" );

			element = spanGenerator();

			expect( element.tagName ).toBe( 'SPAN' );
			expect( element.childNodes.length ).toBe( 0 );

			expect( spanGenerator('.my-class').className ).toBe( 'my-class' );
			expect( spanGenerator('#my-id').id ).toBe( 'my-id' );
			expect( spanGenerator("just text").id ).toBe( '' );
			expect( spanGenerator("just text").className ).toBe( '' );
			expect( spanGenerator("just text").textContent ).toBe( "just text" );
		});

	});

});
