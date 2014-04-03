
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var λ = require('lib/lambda-functional.js');

	var testFn = λ('a / b');

	var pass = util.pass();
	var passDefault = util.pass(
		function () { return { args: [testFn] }; }
	);
	var checkWith = function (checker) {
		return passDefault().checkWith(checker);
	};
	var get = function (result) { return passDefault().get(result); };

	return {
		parameters: get(['a', 'b']),
		autoCurry:  checkWith( λ('_(10)(2)') ).get( 5 ),
		compose:    pass( λ('_-1'), λ('*2'), testFn ).checkWith( λ('_(100, 50)') ).get( 3 ),
		// fixArity
		flip:       checkWith( λ('_(10, 2)') ).get( 0.2 ),
		// loop
		// maybe
		// memoize
		not: [
		            pass( λ('_ == "hi"') ).checkWith( λ('_("hi")') ).get( false ),
		            pass( λ('_ == "hi"') ).checkWith( λ('_("ay")') ).get( true ),
		],
		pipe:       checkWith( λ('_.pipe( this.λ("*2") ).to( this.λ("_-1") )(100, 50)').bind({λ:λ}) ).get( 3 ),
		// promoteArg
		// promoteArgSolid
		returnArg:  checkWith( λ('_(50, 100)') ).get( 50 ),
		// returnThis
		sequence:   pass( testFn, λ('*2'), λ('_-1') ).checkWith( λ('_(100, 50)') ).get( 3 ),
		variadic:   pass( λ('a + b.join("")') ).checkWith( λ('_("hi", "fu", "mi")') ).get( 'hifumi' )
	};

});
