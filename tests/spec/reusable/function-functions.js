
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var λ = require('lib/lambda-functional.js');

	var testFn = λ('a / b');

	var declarator = util.declarator();
	var declaratorWithDefault = util.declarator(
		function () { return { args: [testFn] }; }
	);

	var pass = declarator.pass;
	var passDefault = declaratorWithDefault.pass;
	var checkWith = declaratorWithDefault.checkWith;
	var get = declaratorWithDefault.get;

	return {
		parameters: [
			get( ['a', 'b'] )
				.becauseIt("gets an array of names of parameters of the passed function"),
			pass( λ('6') )
				.get( [] )
				.becauseIt("gets an empty array if the passed function has no parameters"),
		],
		autoCurry: [
			pass( λ('a / b / c') )
				.checkWith( λ('_(10)(2)(5)') )
				.get( 1 )
				.becauseIt("permits passing one by one the arguments to a three-parameter function"),
			pass( λ('a / b') )
				.checkWith( λ('_(10)(2)') )
				.get( 5 )
				.becauseIt("permits passing one by one the arguments to a two-parameter function"),
			pass( λ('a / b / c') )
				.checkWith( λ('_(10, 2)(5)') )
				.get( 1 )
				.becauseIt("permits passing two and then one arguments to a three-parameter function"),
			pass( λ('a / b / c') )
				.checkWith( λ('_(10)(2, 5)') )
				.get( 1 )
				.becauseIt("permits passing one and then two arguments to a three-parameter function"),
			pass( λ('a / b / c') )
				.checkWith( λ('_(10, 2, 5)') )
				.get( 1 )
				.becauseIt("still permits passing all arguments at once to a three-parameter function"),
		],
		compose: [
			pass( λ('_-1'), λ('*2'), testFn )
				.checkWith( λ('_(100, 50)') )
				.get( 3 )
				.becauseIt(""),
		],
		// fixArity
		flip: [
			checkWith( λ('_(10, 2)') )
				.get( 0.2 )
				.becauseIt(""),
		],
		// loop
		// maybe
		// memoize
		not: [
			pass( λ('_ == "hi"') )
				.checkWith( λ('_("hi")') )
				.get( false )
				.becauseIt(""),
			pass( λ('_ == "hi"') )
				.checkWith( λ('_("ay")') )
				.get( true )
				.becauseIt(""),
		],
		pipe: [
			checkWith( λ('_.pipe( this.λ("*2") ).to( this.λ("_-1") )(100, 50)').bind({λ:λ}) )
				.get( 3 )
				.becauseIt(""),
		],
		// promoteArg
		// promoteArgSolid
		returnArg: [
			checkWith( λ('_(50, 100)') )
				.get( 50 )
				.becauseIt(""),
		],
		// returnThis
		sequence: [
			pass( testFn, λ('*2'), λ('_-1') )
				.checkWith( λ('_(100, 50)') )
				.get( 3 )
				.becauseIt(""),
		],
		variadic: [
			pass( λ('a + b.join("")') )
				.checkWith( λ('_("hi", "fu", "mi")') )
				.get( 'hifumi' )
				.becauseIt(""),
		],
	};

});
