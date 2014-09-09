
define( function (require) {

	var is = require('agj/is');
	var toArray = require('agj/utils/toArray');
	var objMap = require('agj/object/map');

	function checkMethods(methods, checkFn) {
		Object.keys(methods).forEach( function (methodName) {
			var args = methods[methodName];
			describe(methodName, function() {
				if (!is.array(args)) args = [args];
				args.forEach( function (theseArgs) {
					it(theseArgs.description || '(no description)', function () {
						while (true) {
							if (!theseArgs.parent) break;
							theseArgs = theseArgs.parent;
						}
						checkFn(methodName, theseArgs);
					});
				});
			});
		});
	}

	function declarator(argsFactory) {
		argsFactory = argsFactory || function () { return {}; };

		var methods = {
			taking: function taking(object) {
				this.object = object;
				return this;
			},
			pass: function pass() {
				this.args = (this.args || []).concat(toArray(arguments));
				return this;
			},
			checkWith: function checkWith(checker) {
				var ret = !this.checker ? this : this.next = generateArgs(this);
				ret.checker = checker;
				return ret;
			},
			get: function get(result) {
				var ret = !this.result ? this : this.next = generateArgs(this);
				ret.result = result;
				if (is.array(result) || is.objectLiteral(result) || isNaN(result)) ret.loose = true;
				return ret;
			},
			becauseIt: function becauseIt(description) {
				this.description = description;
				return this;
			},
		};

		return objMap(generateArgs(), function (fn) {
			if (!is.fn(fn)) return fn;
			return wrapFirst(fn);
		});

		function generateArgs(parent) {
			var params = argsFactory();
			Object.keys(methods).forEach( function (name) {
				if (!params[name]) params[name] = methods[name];
			});
			if (parent) params.parent = parent;
			return params;
		}
		function wrapFirst(fn) {
			return function () {
				return fn.apply(generateArgs(), arguments);
			};
		}
	}

	function pass(argsFactory, chainObjectModifier) {
		chainObjectModifier = chainObjectModifier || function (o) { return o; };
		return function () {
			var params = argsFactory ? argsFactory() : {};
			params.args = (params.args || []).concat( toArray(arguments) );
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
		pass: pass,
		declarator: declarator
	};

});
