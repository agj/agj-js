
define( function (require) {
	'use strict';
	
	var anyEl = require('agj/domGenerator/anyEl');
	
	describe("domGenerator/anyEl", function () {

		it("generates a DOM element of the specified tag, class and ID, and optionally including the passed attributes, and containing the passed elements or text", function () {
			var child = document.createElement('a');
			var element = anyEl('section.class1#some-id.class2.class3', { title: 'some title', 'data-custom': 'custom data' },
				"text content",
				child
			);

			expect( element.tagName ).toBe( 'SECTION' );
			expect( element.id ).toBe( 'some-id' );
			expect( element.className ).toBe( 'class1 class2 class3' );
			expect( element.getAttribute('title') ).toBe( 'some title' );
			expect( element.getAttribute('data-custom') ).toBe( 'custom data' );
			expect( element.childNodes.length ).toBe( 2 );
			expect( element.childNodes[0].data ).toBe( 'text content' );
			expect( element.childNodes[1] ).toBe( child );

			element = anyEl('em', child, "text content");

			expect( element.tagName ).toBe( 'EM' );
			expect( element.childNodes[0].tagName ).toBe( 'A' );
			expect( element.childNodes[1].data ).toBe( "text content" );

			element = anyEl('span');

			expect( element.tagName ).toBe( 'SPAN' );
			expect( element.childNodes.length ).toBe( 0 );
		});

	});

});
