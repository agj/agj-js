
define( function (require) {
	'use strict';

	var is = require('agj/is');
	var anyEl = require('agj/html-generator/anyEl');
	var toEl = require('agj/html-generator/toEl');
	var inject = require('agj/html-generator/inject');

	describe("HTML generator", function () {
		it("generates HTML elements via anyEl() function call", function () {
			expect( anyEl('span').tagName ).toBe( 'SPAN' );
			expect( anyEl('div').tagName ).toBe( 'DIV' );
		});

		it("creates element generators via toEl() function call", function () {
			expect( toEl('span')().tagName ).toBe( 'SPAN' );
			expect( toEl('div')().tagName ).toBe( 'DIV' );
		});

		describe("allows specifying", function () {
			it("an ID", function () {
				expect( anyEl('span#someID').id ).toBe('someID');
			});
			it("classes", function () {
				expect( anyEl('span.my-class').className ).toBe('my-class');
				expect( anyEl('span.my-class.my-other-class').className ).toBe('my-class my-other-class');
			});
			it("an ID and classes", function () {
				expect( anyEl('span#someID.my-class.my-other-class').id ).toBe('someID');
				expect( anyEl('span#someID.my-class.my-other-class').className ).toBe('my-class my-other-class');
			});
			it("attributes", function () {
				expect( anyEl('a', { href: 'http://www.agj.cl/' }).getAttribute('href') ).toBe('http://www.agj.cl/');
				expect( anyEl('span', { title: 'some title' }).getAttribute('title') ).toBe('some title');
			});
			it("children elements", function () {
				var p = anyEl('p',
					"Some plain text first, ",
					anyEl('em', "then some emphasized text,"),
					" ",
					anyEl('strong', "then some strongly emphasized one.")
				);
				expect( p.tagName ).toBe('P');
				expect( p.children.length ).toBe(2);
				expect( p.children[0].tagName ).toBe('EM');
				expect( p.children[0].textContent ).toBe('then some emphasized text,');
				expect( p.children[1].tagName ).toBe('STRONG');
				expect( p.children[1].textContent ).toBe('then some strongly emphasized one.');
				expect( p.childNodes[0].textContent ).toBe('Some plain text first, ');
				expect( p.childNodes[2].textContent ).toBe(' ');
			});
			it("an ID, classes, attributes, and children", function () {
				var el = anyEl('a#someID.some-class', { href: 'http://www.agj.cl/' },
					anyEl('span', "Hello"),
					" ",
					anyEl('em', "there!")
				);
				expect( el.tagName ).toBe('A');
				expect( el.id ).toBe('someID');
				expect( el.className ).toBe('some-class');
				expect( el.getAttribute('href') ).toBe('http://www.agj.cl/');
				expect( el.children.length ).toBe(2);
			});
			it("an ID, classes, and children", function () {
				var el = anyEl('a#someID.some-class',
					anyEl('span', "Hello"),
					" ",
					anyEl('em', "there!")
				);
				expect( el.tagName ).toBe('A');
				expect( el.id ).toBe('someID');
				expect( el.className ).toBe('some-class');
				expect( el.getAttribute('href') ).toBeFalsy();
				expect( el.children.length ).toBe(2);
			});
			it("an ID, classes, and attributes", function () {
				var el = anyEl('a#someID.some-class', { href: 'http://www.agj.cl/' });
				expect( el.tagName ).toBe('A');
				expect( el.id ).toBe('someID');
				expect( el.className ).toBe('some-class');
				expect( el.getAttribute('href') ).toBe('http://www.agj.cl/');
				expect( el.children.length ).toBe(0);
			});
			it("attributes, and children", function () {
				var el = anyEl('a', { href: 'http://www.agj.cl/' },
					anyEl('span', "Hello")
				);
				expect( el.tagName ).toBe('A');
				expect( el.id ).toBeFalsy();
				expect( el.className ).toBeFalsy();
				expect( el.getAttribute('href') ).toBe('http://www.agj.cl/');
				expect( el.children.length ).toBe(1);
			});
		});

		it("allows arbitrary nesting", function () {
			var section = toEl('section');
			var h1 = toEl('h1');
			var p = toEl('p');
			var strong = toEl('strong');
			var em = toEl('em');
			var a = toEl('a');
			
			var test = section('#main',
				h1('.title', "I'm gonna be talking to you now"),
				p("I'm honestly kind of ashamed. ", strong('.special', "Hey you ", em("guys"), "!"), " I think I'm okay now."),
				p("Now here we have a link:", a({ href: 'http://www.agj.cl/' }, "to my website!"))
			);

			expect( test.tagName ).toBe( 'SECTION' );
			expect( test.children[0].tagName ).toBe( 'H1' );
			expect( test.children[1].tagName ).toBe( 'P' );
			expect( test.children[1].children[0].tagName ).toBe( 'STRONG' );
			expect( test.children[1].children[0].children[0].tagName ).toBe( 'EM' );

			expect( test.id ).toBe( 'main' );
			expect( test.children[0].className ).toBe( 'title' );
			expect( test.children[1].children[0].className ).toBe( 'special' );
			expect( test.children[2].children[0].getAttribute('href') ).toBe( 'http://www.agj.cl/' );
		});

		it("provides 'inject' function which injects tag generators matched to argument names of the passed function", function () {
			var test = inject( function (section, h1, p, strong, em, a) {
				return section('#main',
					h1('.title', "I'm gonna be talking to you now"),
					p("I'm honestly kind of ashamed. ", strong('.special', "Hey you ", em("guys"), "!"), " I think I'm okay now."),
					p("Now here we have a link:", a({ href: 'http://www.agj.cl/' }, "to my website!"))
				);
			});
			expect( test.tagName ).toBe( 'SECTION' );
			expect( test.children[0].tagName ).toBe( 'H1' );
			expect( test.children[1].tagName ).toBe( 'P' );
			expect( test.children[1].children[0].tagName ).toBe( 'STRONG' );
			expect( test.children[1].children[0].children[0].tagName ).toBe( 'EM' );
		});
	});

});
