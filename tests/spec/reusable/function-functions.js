
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
			pass( λ('_-1'), λ('*2') )
				.checkWith( λ('_(100)') )
				.get( 199 )
				.becauseIt("returns a function which will return the result of passing from left to right the return arguments of each of the passed two functions"),
			pass( λ('_-1'), λ('*2'), λ('/10') )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.becauseIt("returns a function which will return the result of passing from left to right the return arguments of each of the passed three functions"),
			pass( λ('_-1'), λ('*2'), λ('/10') )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.becauseIt("should work the same when used multiple times"),
		],
		// fixArity
		flip: [
			pass( λ('a / b') )
				.checkWith( λ('_(10, 2)') )
				.get( 0.2 )
				.becauseIt("makes the second argument the first and the other way around for a binary function"),
			pass( λ('a / b / c') )
				.checkWith( λ('_(10, 2, 5)') )
				.get( 0.25 )
				.becauseIt("makes the third argument the second, and the first the third for a ternary function"),
			pass( λ('_') )
				.checkWith( λ('_(10)') )
				.get( 10 )
				.becauseIt("does nothing to a unary function"),
		],
		// iterate
		// maybe
		// memoize
		not: [
			pass( λ('_ == "hi"') )
				.checkWith( λ('_("hi")') )
				.get( false )
				.becauseIt("makes a function return false for values it would return true"),
			pass( λ('_ == "hi"') )
				.checkWith( λ('_("ay")') )
				.get( true )
				.becauseIt("makes a function return true for values it would return false"),
			pass( λ('_') )
				.checkWith( λ('_("ay")') )
				.get( false )
				.becauseIt("if the returned value is truthy but not boolean, it is coherced into a false value"),
		],
		parameters: [
			pass( λ('a / b') )
				.get( ['a', 'b'] )
				.becauseIt("returns an array of names of parameters of the passed function"),
			pass( λ('6') )
				.get( [] )
				.becauseIt("returns an empty array if the passed function has no parameters"),
		],
		partial: [
			pass( λ('a / b'), [10] )
				.checkWith( λ('_(5)') )
				.get(2)
				.becauseIt("can take a binary function and one argument and returns a unary function that takes the remaining argument"),
			pass( λ('a / b'), [10, 5] )
				.checkWith( λ('_()') )
				.get(2)
				.becauseIt("can take a binary function and two arguments and returns a nullary function"),
			pass( λ('a / b'), [] )
				.checkWith( λ('_(10, 5)') )
				.get(2)
				.becauseIt("returns an equivalent function if no arguments are passed"),
		],
		pipe: [
			pass( λ('a / b') )
				.checkWith( function (_) {
					var piped = _.pipe(λ('*2')).to(λ('_-1'));
					return piped(100, 50);
				})
				.get( 3 )
				.becauseIt("takes the passed function and gives it the .pipe() and .to() methods, and the resulting function takes arguments and passes them to the first function, its result to the next, and so forth"),
		],
		// promoteArg
		// promoteArgSolid
		// returnArg
		// returnThis
		sequence: [
			pass( λ('*2'), λ('_-1') )
				.checkWith( λ('_(100)') )
				.get( 199 )
				.becauseIt("returns a function which will return the result of passing from right to left the return arguments of each of the passed two functions"),
			pass( λ('/10'), λ('*2'), λ('_-1') )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.becauseIt("returns a function which will return the result of passing from right to left the return arguments of each of the passed three functions"),
			pass( λ('/10'), λ('*2'), λ('_-1') )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.checkWith( λ('_(100)') )
				.get( 19 )
				.becauseIt("should work the same when used multiple times"),
		],
		variadic: [
			pass( λ('a + b.join(",")') )
				.checkWith( λ('_("hi", "fu", "mi")') )
				.get( 'hifu,mi' )
				.becauseIt("decorates the function so that the last parameter receives all trailing arguments, as an array"),
			pass( λ('a + b.join(",")') )
				.checkWith( λ('_(undefined, "fu", "mi")') )
				.get( 'undefinedfu,mi' )
				.becauseIt("still passes undefined arguments"),
			pass( λ('a, b -> b') )
				.checkWith( λ('_("hi")') )
				.get( [] )
				.becauseIt("makes an empty array if no trailing arguments are passed"),
			pass( λ('a, b -> b') )
				.checkWith( λ('_()') )
				.get( [] )
				.becauseIt("still makes an empty array if no arguments are passed at all"),
		],
	};

});
