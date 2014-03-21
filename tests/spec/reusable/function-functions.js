
define( function (require) {
	'use strict';
	
	var util = require('util/util');
	var λ = require('lib/lambda-functional.js');

	var testFun = λ('a / b');

	var pass = util.pass();
	var passDefault = util.pass(
		function () { return { args: [testFun] }; }
	);
	var checkWith = function (checker) {
		return passDefault().checkWith(checker);
	};

	return {
		autoCurry: checkWith( λ('_(10)(2)') ).get( 5 ),
		pipe:      checkWith( λ('_.pipe( this.λ("*2") ).to( this.λ("_-1") )(100, 50)').bind({λ:λ}) ).get( 3 ),
		flip:      checkWith( λ('_(10, 2)') ).get( 0.2 ),
		compose:   pass( λ('_-1'), λ('*2'), testFun ).checkWith( λ('_(100, 50)') ).get( 3 ),
		sequence:  pass( testFun, λ('*2'), λ('_-1') ).checkWith( λ('_(100, 50)') ).get( 3 ),
		// maybe
		// fixArity
		variadic:  pass( λ('a + b.join("")') ).checkWith( λ('_("hi", "fu", "mi")') ).get( 'hifumi' )
	};

});
