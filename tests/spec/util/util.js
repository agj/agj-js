
define( function (require) {

	var is = require('agj/is');

	function checkMethods(methods, checkFn) {
		Object.keys(methods).forEach( function (methodName) {
			var args = methods[methodName];
			it(methodName, function() {
				if (!is.array(args)) args = [args];
				args.forEach( function (theseArgs) {
					checkFn(methodName, theseArgs);
				});
			});
		});
	}

	function pass(paramsFactory, chainObjectModifier) {
		chainObjectModifier = chainObjectModifier || function (o) { return o; };
		return function () {
			var params = paramsFactory ? paramsFactory() : {};
			params.args = (params.args || []).concat( [].slice.call(arguments) );
			return chainObjectModifier({
				params: params,
				get: function (result) {
					params.result = result;
					if (is.array(result) || is.objectLiteral(result)) params.loose = true;
					return params;
				},
				checkWith: function (checker) {
					params.checker = checker;
					return this;
				}
			});
		};
	}

	return {
		checkMethods: checkMethods,
		pass: pass
	};

});
