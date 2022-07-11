/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7981);

module.exports = parent;

/***/ }),

/***/ 2529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9390);

__webpack_require__(5892);

var entryUnbind = __webpack_require__(1305);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 1755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(3642);

/***/ }),

/***/ 3642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7987);

module.exports = parent;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var $TypeError = TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 6288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var create = __webpack_require__(3590);

var defineProperty = (__webpack_require__(4615).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(794);

var $String = String;
var $TypeError = TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArray = __webpack_require__(4521);

var isConstructor = __webpack_require__(2097);

var isObject = __webpack_require__(794);

var wellKnownSymbol = __webpack_require__(3649);

var SPECIES = wellKnownSymbol('species');
var $Array = Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? $Array : C;
};

/***/ }),

/***/ 4822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5289); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 3746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

var createNonEnumerableProperty = __webpack_require__(57);

var makeBuiltIn = __webpack_require__(9594);

var defineGlobalProperty = __webpack_require__(2296);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);

  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value);
  }

  return O;
};

/***/ }),

/***/ 2296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es-x/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6768:
/***/ ((module) => {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 1305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var defineBuiltIn = __webpack_require__(3746);

var defineGlobalProperty = __webpack_require__(2296);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }

    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 1266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArray = __webpack_require__(4521);

var lengthOfArrayLike = __webpack_require__(1825);

var doesNotExceedSafeInteger = __webpack_require__(6768);

var bind = __webpack_require__(2938); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(8257);

var NATIVE_BIND = __webpack_require__(8987);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 5897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(8257);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(8257); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es-x/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var $Object = Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 4521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9624); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 2097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var classof = __webpack_require__(3058);

var getBuiltIn = __webpack_require__(5897);

var inspectSource = __webpack_require__(9734);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var $TypeError = TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 9594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var DESCRIPTORS = __webpack_require__(8494);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {
    /* empty */
  }, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }

  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;

  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    defineProperty(value, 'name', {
      value: name,
      configurable: true
    });
  }

  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }

  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      }); // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }

  var state = enforceInternalState(value);

  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }

  return value;
}; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required


Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ 9021:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe

module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 3590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(2569);

var definePropertiesModule = __webpack_require__(8728);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = __webpack_require__(4639);

var html = __webpack_require__(482);

var documentCreateElement = __webpack_require__(6668);

var sharedKey = __webpack_require__(9137);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var definePropertyModule = __webpack_require__(4615);

var anObject = __webpack_require__(2569);

var toIndexedObject = __webpack_require__(2977);

var objectKeys = __webpack_require__(5432); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var $TypeError = TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var uncurryThis = __webpack_require__(7386);

var objectKeys = __webpack_require__(5432);

var toIndexedObject = __webpack_require__(2977);

var $propertyIsEnumerable = (__webpack_require__(112).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var $TypeError = TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 3955:
/***/ ((module) => {

var $TypeError = TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var defineGlobalProperty = __webpack_require__(2296);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.8',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.8/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(9021); // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity


module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- NaN check

  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(3955);

var $Object = Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(2670);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 7670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(7263);

var flattenIntoArray = __webpack_require__(1266);

var toObject = __webpack_require__(1324);

var lengthOfArrayLike = __webpack_require__(1825);

var toIntegerOrInfinity = __webpack_require__(7486);

var arraySpeciesCreate = __webpack_require__(4822); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 5892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6288); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $entries = (__webpack_require__(9953).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

/***/ }),

/***/ 1762:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LE": () => (/* binding */ Macro)
/* harmony export */ });
/* unused harmony exports getMacroId, InvalidMacroError, adventureMacro, adventureMacroAuto, StrictMacro */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(678);
var _templateObject, _templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$items */ .vS)(_templateObject || (_templateObject = _taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = (0,_template_string__WEBPACK_IMPORTED_MODULE_1__/* .$skills */ .nx)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  _inherits(InvalidMacroError, _Error);

  var _super = _createSuper(InvalidMacroError);

  function InvalidMacroError() {
    _classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return _createClass(InvalidMacroError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    _classCallCheck(this, Macro);

    _defineProperty(this, "components", []);

    _defineProperty(this, "name", MACRO_NAME);
  }

  _createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return this.components.join(";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      (0,_property__WEBPACK_IMPORTED_MODULE_2__/* .set */ .t8)(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      this.components = [].concat(_toConsumableArray(this.components), _toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));
      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.name), "&macrotext=").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      var ballsCondition = "";

      if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof Array) {
        ballsCondition = condition.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        ballsCondition = "(".concat(ballsCondition, ")");
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect) {
        ballsCondition = "haseffect ".concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class) {
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return this.step("if ".concat(ballsCondition)).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, _toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, _toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getTodaysHolidayWanderers */ .UL)();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = (0,_lib__WEBPACK_IMPORTED_MODULE_3__/* .getTodaysHolidayWanderers */ .UL)();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, _toConsumableArray((0,_property__WEBPACK_IMPORTED_MODULE_2__/* .get */ .U2)(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = _createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

_defineProperty(Macro, "cachedMacroIds", new Map());

_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    adv1(loc, 0, "");

    while (inMultiFight()) {
      runCombat();
    }

    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {
  _inherits(StrictMacro, _Macro);

  var _super2 = _createSuper(StrictMacro);

  function StrictMacro() {
    _classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  _createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro)));

/***/ }),

/***/ 3311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$c": () => (/* binding */ getBanishedMonsters),
/* harmony export */   "Lo": () => (/* binding */ uneffect),
/* harmony export */   "UL": () => (/* binding */ getTodaysHolidayWanderers),
/* harmony export */   "lf": () => (/* binding */ have),
/* harmony export */   "pq": () => (/* binding */ ensureEffect),
/* harmony export */   "ve": () => (/* binding */ getKramcoWandererChance),
/* harmony export */   "xI": () => (/* binding */ getSaleValue)
/* harmony export */ });
/* unused harmony exports getSongLimit, isSong, getActiveEffects, getActiveSongs, getSongCount, canRememberSong, getMonsterLocations, getRemainingLiver, getRemainingStomach, getRemainingSpleen, haveInCampground, Wanderer, haveCounter, haveWandererCounter, isVoteWandererNow, isWandererNow, getFamiliarWandererChance, getWandererChance, isCurrentFamiliar, getFoldGroup, getZapGroup, canUse, noneToNull, getAverage, getAverageAdventures, getPlayerFromIdOrName, questStep, EnsureError, Environment, findLeprechaunMultiplier, findFairyMultiplier, holidayWanderers, canVisitUrl, damageTakenByElement */
/* harmony import */ var core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6737);
/* harmony import */ var core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_entries__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1755);
/* harmony import */ var core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_array_flat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2474);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(678);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8588);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys(myEffects()).map(e => Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Familiar) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveFamiliar)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Servant) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveServant)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveSkill)(thing);
  }

  if (thing instanceof kolmafia__WEBPACK_IMPORTED_MODULE_2__.Thrall) {
    var thrall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function haveInCampground(item) {
  return Object.keys(getCampground()).map(i => Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 == 1;
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer == Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = (0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_sausageFights");
  var lastFight = (0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("_lastSausageMonsterTurn");
  var totalTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.myTurncount)() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries(getRelated(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = _slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = _slicedToArray(_ref5, 1),
        i = _ref6[0];

    return Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .chunk */ .yo)((0,_property__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = _createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.toItem)(banisher);

      if (banisher.toLowerCase() === "saber force") {
        result.set((0,_template_string__WEBPACK_IMPORTED_MODULE_5__/* .$skill */ .tm)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Use the Force"]))), kolmafia__WEBPACK_IMPORTED_MODULE_2__.Monster.get(foe));
      } else if ([kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item.get("none"), kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item.get("training scroll:  Snokebomb"), kolmafia__WEBPACK_IMPORTED_MODULE_2__.Item.get("tomayohawk-style reflex hammer"), null].includes(banisherItem)) {
        if (kolmafia__WEBPACK_IMPORTED_MODULE_2__.Skill.get(banisher) === (0,_template_string__WEBPACK_IMPORTED_MODULE_5__/* .$skill */ .tm)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["none"])))) {
          break;
        } else {
          result.set(kolmafia__WEBPACK_IMPORTED_MODULE_2__.Skill.get(banisher), kolmafia__WEBPACK_IMPORTED_MODULE_2__.Monster.get(foe));
        }
      } else {
        result.set(banisherItem, kolmafia__WEBPACK_IMPORTED_MODULE_2__.Monster.get(foe));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== "Nuclear Autumn") {
    if ($items(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === "G-Lover") {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === "Bees Hate You") {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.get("none") ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.get("none") ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.get("none") ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = _slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.cliExecute)("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause) {
    var _this;

    _classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!"));
    _this.name = "Ensure Error";
    return _this;
  }

  return _createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(ef) < turns) {
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.cliExecute)(ef.default) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.haveEffect)(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) > Math.max(2 * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.autosellPrice)(item), 100) ? MALL_VALUE_MODIFIER * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) : (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.autosellPrice)(item));
    } else {
      valueMap.set(item, (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) > 100 ? MALL_VALUE_MODIFIER * (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.mallPrice)(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["none"]))));
  var meatBonus = numericModifier(familiar, "Meat Drop", 1, $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["none"]))));
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === $familiar(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) return numericModifier(familiar, "Fairy Effectiveness", 1, $item(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["none"]))));
  var itemBonus = numericModifier(familiar, "Item Drop", 1, $item(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["none"]))));
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", (0,_template_string__WEBPACK_IMPORTED_MODULE_5__/* .$monsters */ .fr)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", (0,_template_string__WEBPACK_IMPORTED_MODULE_5__/* .$monsters */ .fr)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", (0,_template_string__WEBPACK_IMPORTED_MODULE_5__/* .$monsters */ .fr)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_2__.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
/**
 * Determines & returns whether or not we can safely call visitUrl(), based on whether we're in a fight, multi-fight, choice, etc
 */

function canVisitUrl() {
  return !(currentRound() || inMultiFight() || choiceFollowsFight() || handlingChoice());
}
/**
 * Calculate damage taken from a specific element after factoring in resistance
 * @param baseDamage
 * @param element
 * @returns damage after factoring in resistances
 */

function damageTakenByElement(baseDamage, element) {
  if (baseDamage < 0) return 1;
  var res = elementalResistance(element);
  return Math.max(1, Math.ceil(baseDamage - baseDamage * res / 100));
}

/***/ }),

/***/ 2474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Jr": () => (/* binding */ PropertiesManager),
  "U2": () => (/* binding */ get),
  "t8": () => (/* binding */ _set)
});

// UNUSED EXPORTS: getBoolean, getBounty, getClass, getCoinmaster, getCommaSeparated, getEffect, getElement, getFamiliar, getItem, getLocation, getMonster, getNumber, getPhylum, getServant, getSkill, getSlot, getStat, getString, getThrall, setProperties, withChoice, withChoices, withProperties, withProperty

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(6737);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(5809);
// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "protectAgainstOverdrink", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useShinyTabbedChat", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_announcementShown", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSphereID", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "pathedSummonsHardcore", "pathedSummonsSoftcore", "popularTartUnlocked", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "trackVoteMonster", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_potatoAlarmClockUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758"];
var numericProperties = ["charsheetDropdown", "chatStyle", "coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "lastRssUpdate", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "barrelGoal", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "item9084", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBarrelSmashed", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEasterEggBalloon", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_companionshipCasts", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_monstersMapped", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "cookies.inventory", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "innerChatColor", "innerTabColor", "lastRelayUpdate", "lastRssVersion", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "outerChatColor", "outerTabColor", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "barrelLayout", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1460", "choiceAdventure1461"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "preBlackbirdFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.get("none") ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_.Bounty, external_kolmafia_.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_.Class, external_kolmafia_.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_.Coinmaster, external_kolmafia_.toCoinmaster);
var getEffect = createMafiaClassPropertyGetter(external_kolmafia_.Effect, external_kolmafia_.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_.Element, external_kolmafia_.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_.Familiar, external_kolmafia_.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_.Item, external_kolmafia_.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_.Location, external_kolmafia_.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_.Monster, external_kolmafia_.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_.Phylum, external_kolmafia_.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_.Servant, external_kolmafia_.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_.Skill, external_kolmafia_.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_.Slot, external_kolmafia_.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_.Stat, external_kolmafia_.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_.Thrall, external_kolmafia_.toThrall);
function get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = _slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/function () {
  function PropertiesManager() {
    _classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  _createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = _slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          _set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
  }]);

  return PropertiesManager;
}();

/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$L": () => (/* binding */ $coinmaster),
/* harmony export */   "HP": () => (/* binding */ $familiar),
/* harmony export */   "Jh": () => (/* binding */ $slot),
/* harmony export */   "O4": () => (/* binding */ $monster),
/* harmony export */   "PG": () => (/* binding */ $location),
/* harmony export */   "Ri": () => (/* binding */ $stat),
/* harmony export */   "_G": () => (/* binding */ $effect),
/* harmony export */   "ei": () => (/* binding */ $slots),
/* harmony export */   "fr": () => (/* binding */ $monsters),
/* harmony export */   "gw": () => (/* binding */ $stats),
/* harmony export */   "lh": () => (/* binding */ $effects),
/* harmony export */   "nx": () => (/* binding */ $skills),
/* harmony export */   "tm": () => (/* binding */ $skill),
/* harmony export */   "vS": () => (/* binding */ $items),
/* harmony export */   "xr": () => (/* binding */ $item),
/* harmony export */   "xw": () => (/* binding */ $locations)
/* harmony export */ });
/* unused harmony exports $bounty, $bounties, $class, $classes, $coinmasters, $element, $elements, $familiars, $phylum, $phyla, $servant, $servants, $thrall, $thralls */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);


var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.reduce((acc, literal, i) => acc + literal + (placeholders[i] || ""), "");
};

var createSingleConstant = Type => function (literals) {
  for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    placeholders[_key2 - 1] = arguments[_key2];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
  return Type.get(input);
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(input.split(/\s*,\s*/));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var $class = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var $familiar = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var $item = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var $items = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var $location = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var $skill = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Thrall);

/***/ }),

/***/ 8588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$x": () => (/* binding */ setEqual),
/* harmony export */   "uZ": () => (/* binding */ clamp),
/* harmony export */   "yo": () => (/* binding */ chunk)
/* harmony export */ });
/* unused harmony exports notNull, parseNumber, arrayToCountedMap, countedMapToArray, countedMapToString, sum, sumNumbers, arrayContains, invertMap */
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(_toConsumableArray(map).map(_ref2 => {
    var _ref3 = _slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return _toConsumableArray(map).map(_ref4 => {
    var _ref5 = _slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort();

  var sortedB = _toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = _createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}

/***/ }),

/***/ 4223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuiltCombatStrategy": () => (/* binding */ BuiltCombatStrategy),
/* harmony export */   "CombatResourceAllocation": () => (/* binding */ CombatResourceAllocation),
/* harmony export */   "CombatStrategy": () => (/* binding */ CombatStrategy),
/* harmony export */   "MonsterStrategy": () => (/* binding */ MonsterStrategy)
/* harmony export */ });
/* unused harmony export main */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1762);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(678);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3311);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var MonsterStrategy;

(function (MonsterStrategy) {
  MonsterStrategy[MonsterStrategy["Ignore"] = 0] = "Ignore";
  MonsterStrategy[MonsterStrategy["IgnoreNoBanish"] = 1] = "IgnoreNoBanish";
  MonsterStrategy[MonsterStrategy["Kill"] = 2] = "Kill";
  MonsterStrategy[MonsterStrategy["KillFree"] = 3] = "KillFree";
  MonsterStrategy[MonsterStrategy["KillHard"] = 4] = "KillHard";
  MonsterStrategy[MonsterStrategy["Banish"] = 5] = "Banish";
  MonsterStrategy[MonsterStrategy["Abort"] = 6] = "Abort";
  MonsterStrategy[MonsterStrategy["KillItem"] = 7] = "KillItem";
})(MonsterStrategy || (MonsterStrategy = {}));

var CombatResourceAllocation = /*#__PURE__*/function () {
  function CombatResourceAllocation() {
    _classCallCheck(this, CombatResourceAllocation);

    _defineProperty(this, "base", new Map());
  }

  _createClass(CombatResourceAllocation, [{
    key: "allocate",
    value: function allocate(strategy, resource) {
      if (resource === undefined) return;
      this.base.set(strategy, resource);
    } // Typed allocation methods for safety

  }, {
    key: "banishWith",
    value: function banishWith(resource) {
      this.allocate(MonsterStrategy.Banish, resource);
    }
  }, {
    key: "freekillWith",
    value: function freekillWith(resource) {
      this.allocate(MonsterStrategy.KillFree, resource);
    }
  }, {
    key: "runawayWith",
    value: function runawayWith(resource) {
      this.allocate(MonsterStrategy.Ignore, resource);
    }
  }, {
    key: "runawayNoBanishWith",
    value: function runawayNoBanishWith(resource) {
      this.allocate(MonsterStrategy.IgnoreNoBanish, resource);
    }
  }, {
    key: "all",
    value: function all() {
      return Array.from(this.base.values());
    }
  }, {
    key: "has",
    value: function has(for_strategy) {
      return this.base.has(for_strategy);
    }
  }, {
    key: "getMacro",
    value: function getMacro(for_strategy) {
      var resource = this.base.get(for_strategy);
      if (resource === undefined) return undefined;
      if (resource.do instanceof libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE) return resource.do;
      if (resource.do instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item) return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().item(resource.do);
      if (resource.do instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Skill) return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().skill(resource.do);
      throw "Unable to convert resource ".concat(resource.name, " to a macro");
    }
  }]);

  return CombatResourceAllocation;
}();
var BuiltCombatStrategy = /*#__PURE__*/function () {
  function BuiltCombatStrategy(abstract, resources, wanderers, state, location) {
    var _Macro2, _Macro4;

    _classCallCheck(this, BuiltCombatStrategy);

    _defineProperty(this, "macro", new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE());

    _defineProperty(this, "autoattack", new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE());

    _defineProperty(this, "boss", void 0);

    _defineProperty(this, "resources", void 0);

    this.boss = abstract.boss;
    this.resources = resources; // First, kill wanderers

    var wandererMonsters = wanderers.map(w => w.monster);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$item */ .xr)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) > 0 && wandererMonsters.find(m => m === (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$monster */ .O4)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["sausage goblin"])))) === undefined) {
      // Always be ready to fight sausage goblins if we equip Kramco
      wandererMonsters.push((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$monster */ .O4)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["sausage goblin"]))));
    }

    var _iterator = _createForOfIteratorHelper(wandererMonsters),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var wanderer = _step.value;
        // Note that we kill hard, which never uses up a freekill
        this.macro = this.macro.if_(wanderer, this.prepare_macro(MonsterStrategy.KillHard));
      } // Set up the autoattack

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var autoattack_macros = new CompressedMacro();
    abstract.autoattacks.forEach((value, key) => {
      var _Macro;

      autoattack_macros.add(key, (_Macro = new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE()).step.apply(_Macro, _toConsumableArray(value.map(m => undelay(m, state)))));
    });
    this.autoattack.step(autoattack_macros.build());
    if (abstract.default_autoattack) this.autoattack.step((_Macro2 = new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE()).step.apply(_Macro2, _toConsumableArray(abstract.default_autoattack.map(m => undelay(m, state))))); // If there is macro precursor, do it now

    if (abstract.init_macro) {
      this.macro = this.macro.step(undelay(abstract.init_macro, state));
    } // Perform any monster-specific macros (these may or may not end the fight)


    var monster_macros = new CompressedMacro();
    abstract.macros.forEach((value, key) => {
      var _Macro3;

      monster_macros.add(key, (_Macro3 = new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE()).step.apply(_Macro3, _toConsumableArray(value.map(m => undelay(m, state)))));
    });
    this.macro.step(monster_macros.build()); // Perform the non-monster specific macro

    if (abstract.default_macro) this.macro = this.macro.step((_Macro4 = new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE()).step.apply(_Macro4, _toConsumableArray(abstract.default_macro.map(m => undelay(m, state))))); // Perform monster-specific strategies

    var monster_strategies = new CompressedMacro();
    abstract.strategy.forEach((strat, monster) => {
      monster_strategies.add(monster, this.prepare_macro(strat, monster));
    });
    this.macro.step(monster_strategies.build()); // Perform the default strategy

    this.macro = this.macro.step(this.prepare_macro(abstract.default_strategy, location));
  }

  _createClass(BuiltCombatStrategy, [{
    key: "prepare_macro",
    value: function prepare_macro(strategy, target) {
      if (strategy instanceof libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE) return strategy;
      var monster = target instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster ? target : undefined; // Upgrade normal kills to free kills if provided

      if (strategy === MonsterStrategy.Kill && this.resources.has(MonsterStrategy.KillFree) && !(monster !== null && monster !== void 0 && monster.boss || this.boss)) {
        strategy = MonsterStrategy.KillFree;
      } // Upgrade normal kills to hard kills if we are underleveled


      if (strategy === MonsterStrategy.Kill && this.resources.has(MonsterStrategy.KillFree) === undefined && monster && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.monsterDefense)(monster) * 1.25 > (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBuffedstat)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weaponType)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equippedItem)((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$slot */ .Jh)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Weapon"]))))))) {
        strategy = MonsterStrategy.KillHard;
      } // Use the appropriate resource if provided


      var use_resource = this.resources.getMacro(strategy);
      if (use_resource !== undefined) return use_resource; // Choose a killing blow (items, banish, or stats)

      var killing_blow = undefined;
      var killing_stat = undefined;

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() >= 20) {
        if (strategy === MonsterStrategy.KillItem && (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$skill */ .tm)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Double Nanovision"]))))) {
          killing_stat = (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$stat */ .Ri)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Mysticality"])));
          killing_blow = (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$skill */ .tm)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Double Nanovision"])));
        } else if ((0,libram__WEBPACK_IMPORTED_MODULE_3__/* .have */ .lf)((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$skill */ .tm)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Infinite Loop"]))))) {
          killing_stat = (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$stat */ .Ri)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Moxie"])));
          killing_blow = (0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$skill */ .tm)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Infinite Loop"])));
        }
      } // Otherwise, default to standard strategies


      switch (strategy) {
        case MonsterStrategy.KillItem:
        case MonsterStrategy.IgnoreNoBanish:
        case MonsterStrategy.Ignore:
        case MonsterStrategy.Kill:
        case MonsterStrategy.KillHard:
        case MonsterStrategy.Banish:
          if (monster && monster.physicalResistance >= 70 || !killing_blow) return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().attack().repeat();
          if (!killing_stat) return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().abort();
          if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < 20) return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().abort(); // Weaken monsters with Pseudopod slap until they are in range of our kill.
          // Since monsterhpabove is locked behind manuel/factoids, just do the maximum
          // number of slaps we could ever need for the monster/zone.

          if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBuffedstat)(killing_stat) * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() / 20) < 100) {
            var HPgap = maxHP(target) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myBuffedstat)(killing_stat) * (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() / 20);
            var slaps = Math.ceil(HPgap / 10);

            if (slaps > 0) {
              return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().while_("!times ".concat(slaps), new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().skill((0,libram__WEBPACK_IMPORTED_MODULE_2__/* .$skill */ .tm)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Pseudopod Slap"]))))).while_("!mpbelow 20", new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().skill(killing_blow)).attack().repeat();
            }
          }

          return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().while_("!mpbelow 20", new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().skill(killing_blow)).attack().repeat();
        // Abort for strategies that can only be done with resources

        case MonsterStrategy.KillFree:
        case MonsterStrategy.Abort:
          return new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE().abort();
      }
    }
  }]);

  return BuiltCombatStrategy;
}();

function getMonsters(where) {
  if (where === undefined) return [];
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.appearanceRates)(where)) // Get the maximum HP in the location
  .filter(i => i[1] > 0).map(i => kolmafia__WEBPACK_IMPORTED_MODULE_0__.Monster.get(i[0]));
}

function maxHP(target) {
  if (target === undefined) return 1;
  var base = target instanceof kolmafia__WEBPACK_IMPORTED_MODULE_0__.Location ? Math.max.apply(Math, _toConsumableArray(getMonsters(target).map(maxHP))) : target.baseHp;
  return Math.floor(1.05 * base) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Monster Level");
}

function undelay(macro, state) {
  if (macro instanceof libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE) return macro;else return macro(state);
}

var holidayMonsters = (0,libram__WEBPACK_IMPORTED_MODULE_3__/* .getTodaysHolidayWanderers */ .UL)();
var CombatStrategy = /*#__PURE__*/function () {
  function CombatStrategy(boss) {
    _classCallCheck(this, CombatStrategy);

    _defineProperty(this, "init_macro", void 0);

    _defineProperty(this, "default_strategy", MonsterStrategy.Ignore);

    _defineProperty(this, "default_macro", void 0);

    _defineProperty(this, "default_autoattack", void 0);

    _defineProperty(this, "strategy", new Map());

    _defineProperty(this, "macros", new Map());

    _defineProperty(this, "autoattacks", new Map());

    _defineProperty(this, "boss", void 0);

    this.boss = boss !== null && boss !== void 0 ? boss : false; // TODO: better detection of which zones holiday monsters can appear

    if (holidayMonsters.length > 0 && !this.boss) this.ignore.apply(this, _toConsumableArray(holidayMonsters));
  }

  _createClass(CombatStrategy, [{
    key: "apply",
    value: function apply(strategy) {
      for (var _len = arguments.length, monsters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        monsters[_key - 1] = arguments[_key];
      }

      if (monsters.length === 0) {
        this.default_strategy = strategy;
      }

      for (var _i = 0, _monsters = monsters; _i < _monsters.length; _i++) {
        var monster = _monsters[_i];
        this.strategy.set(monster, strategy);
      }

      return this;
    }
  }, {
    key: "kill",
    value: function kill() {
      for (var _len2 = arguments.length, monsters = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        monsters[_key2] = arguments[_key2];
      }

      return this.apply.apply(this, [MonsterStrategy.Kill].concat(monsters));
    }
  }, {
    key: "killFree",
    value: function killFree() {
      for (var _len3 = arguments.length, monsters = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        monsters[_key3] = arguments[_key3];
      }

      return this.apply.apply(this, [MonsterStrategy.KillFree].concat(monsters));
    }
  }, {
    key: "killHard",
    value: function killHard() {
      for (var _len4 = arguments.length, monsters = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        monsters[_key4] = arguments[_key4];
      }

      return this.apply.apply(this, [MonsterStrategy.KillHard].concat(monsters));
    }
  }, {
    key: "killItem",
    value: function killItem() {
      for (var _len5 = arguments.length, monsters = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        monsters[_key5] = arguments[_key5];
      }

      return this.apply.apply(this, [MonsterStrategy.KillItem].concat(monsters));
    }
  }, {
    key: "banish",
    value: function banish() {
      for (var _len6 = arguments.length, monsters = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        monsters[_key6] = arguments[_key6];
      }

      if (monsters.length === 0) throw "Must specify list of monsters to banish";
      return this.apply.apply(this, [MonsterStrategy.Banish].concat(monsters));
    }
  }, {
    key: "ignore",
    value: function ignore() {
      for (var _len7 = arguments.length, monsters = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        monsters[_key7] = arguments[_key7];
      }

      return this.apply.apply(this, [MonsterStrategy.Ignore].concat(monsters));
    }
  }, {
    key: "ignoreNoBanish",
    value: function ignoreNoBanish() {
      for (var _len8 = arguments.length, monsters = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        monsters[_key8] = arguments[_key8];
      }

      return this.apply.apply(this, [MonsterStrategy.IgnoreNoBanish].concat(monsters));
    }
  }, {
    key: "abort",
    value: function abort() {
      for (var _len9 = arguments.length, monsters = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        monsters[_key9] = arguments[_key9];
      }

      return this.apply.apply(this, [MonsterStrategy.Abort].concat(monsters));
    }
  }, {
    key: "macro",
    value: function macro(strategy) {
      for (var _len10 = arguments.length, monsters = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
        monsters[_key10 - 1] = arguments[_key10];
      }

      if (monsters.length === 0) {
        if (this.default_macro === undefined) this.default_macro = [];
        this.default_macro.push(strategy);
      }

      for (var _i2 = 0, _monsters2 = monsters; _i2 < _monsters2.length; _i2++) {
        var _this$macros$get;

        var monster = _monsters2[_i2];
        if (!this.macros.has(monster)) this.macros.set(monster, []);
        (_this$macros$get = this.macros.get(monster)) === null || _this$macros$get === void 0 ? void 0 : _this$macros$get.push(strategy);
      }

      return this;
    }
  }, {
    key: "prependMacro",
    value: function prependMacro(strategy) {
      for (var _len11 = arguments.length, monsters = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        monsters[_key11 - 1] = arguments[_key11];
      }

      if (monsters.length === 0) {
        this.init_macro = strategy;
      }

      for (var _i3 = 0, _monsters3 = monsters; _i3 < _monsters3.length; _i3++) {
        var _this$macros$get2;

        var monster = _monsters3[_i3];
        if (!this.macros.has(monster)) this.macros.set(monster, []);
        (_this$macros$get2 = this.macros.get(monster)) === null || _this$macros$get2 === void 0 ? void 0 : _this$macros$get2.unshift(strategy);
      }

      return this;
    }
  }, {
    key: "autoattack",
    value: function autoattack(strategy) {
      for (var _len12 = arguments.length, monsters = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        monsters[_key12 - 1] = arguments[_key12];
      }

      if (monsters.length === 0) {
        if (this.default_autoattack === undefined) this.default_autoattack = [];
        this.default_autoattack.push(strategy);
      }

      for (var _i4 = 0, _monsters4 = monsters; _i4 < _monsters4.length; _i4++) {
        var _this$autoattacks$get;

        var monster = _monsters4[_i4];
        if (!this.autoattacks.has(monster)) this.autoattacks.set(monster, []);
        (_this$autoattacks$get = this.autoattacks.get(monster)) === null || _this$autoattacks$get === void 0 ? void 0 : _this$autoattacks$get.push(strategy);
      }

      return this;
    }
  }, {
    key: "can",
    value: function can(do_this) {
      if (do_this === this.default_strategy) return true;
      return Array.from(this.strategy.values()).includes(do_this);
    }
  }, {
    key: "where",
    value: function where(do_this) {
      return Array.from(this.strategy.keys()).filter(key => this.strategy.get(key) === do_this);
    }
  }, {
    key: "currentStrategy",
    value: function currentStrategy(monster) {
      var _this$strategy$get;

      return (_this$strategy$get = this.strategy.get(monster)) !== null && _this$strategy$get !== void 0 ? _this$strategy$get : this.default_strategy;
    }
  }, {
    key: "clone",
    value: function clone() {
      var result = new CombatStrategy(this.boss);
      result.default_strategy = this.default_strategy;
      result.default_macro = this.default_macro;
      result.default_autoattack = this.default_autoattack;
      result.strategy = new Map(this.strategy);
      result.macros = new Map(this.macros);
      result.autoattacks = new Map(this.autoattacks);
      return result;
    }
  }]);

  return CombatStrategy;
}();
function main() {
  Macro.load().submit();
}

var CompressedMacro = /*#__PURE__*/function () {
  function CompressedMacro() {
    _classCallCheck(this, CompressedMacro);

    _defineProperty(this, "components", new Map());
  }

  _createClass(CompressedMacro, [{
    key: "add",
    value: function add(monster, macro) {
      var _this$components$get;

      var macro_text = macro.toString();
      if (macro_text.length === 0) return;
      if (!this.components.has(macro_text)) this.components.set(macro_text, [monster]);else (_this$components$get = this.components.get(macro_text)) === null || _this$components$get === void 0 ? void 0 : _this$components$get.push(monster);
    }
  }, {
    key: "build",
    value: function build() {
      var result = new libram__WEBPACK_IMPORTED_MODULE_1__/* .Macro */ .LE();
      this.components.forEach((monsters, macro) => {
        var condition = monsters.map(mon => "monsterid ".concat(mon.id)).join(" || ");
        result = result.if_(condition, macro);
      });
      return result;
    }
  }]);

  return CompressedMacro;
}();

/***/ }),

/***/ 8695:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "args": () => (/* binding */ args),
  "main": () => (/* binding */ main)
});

// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(7530);
// EXTERNAL MODULE: ./node_modules/libram/dist/lib.js
var lib = __webpack_require__(3311);
// EXTERNAL MODULE: ./node_modules/libram/dist/template-string.js
var template_string = __webpack_require__(678);
// EXTERNAL MODULE: ./node_modules/libram/dist/property.js + 2 modules
var property = __webpack_require__(2474);
// EXTERNAL MODULE: ./src/combat.ts
var src_combat = __webpack_require__(4223);
;// CONCATENATED MODULE: ./src/moods.ts
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




function getRelevantEffects() {
  var result = {
    "-combat": [],
    "+combat": [],
    " combat": [],
    // Maximizer has issues with "50 +combat" and similar
    mainstat: []
  }; // Glitches if given above

  result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject || (_templateObject = _taggedTemplateLiteral(["That's Just Cloud-Talk, Man"])))); // One-per-day

  if (!(0,property/* get */.U2)("_ballpit")) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Having a Ball!"]))));
  if (!(0,property/* get */.U2)("_lyleFavored")) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Favored by Lyle"]))));
  if (!(0,property/* get */.U2)("telescopeLookedHigh")) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Starry-Eyed"]))));
  if ((0,property/* get */.U2)("spacegateAlways") && (0,property/* get */.U2)("spacegateVaccine2") && !(0,property/* get */.U2)("_spacegateVaccine")) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Broad-Spectrum Vaccine"]))));
  if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Emotionally Chipped"])))) && (0,property/* get */.U2)("_feelExcitementUsed") < 3) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Feeling Excited"]))));
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["protonic accelerator pack"])))) && !(0,property/* get */.U2)("_streamsCrossed")) result["mainstat"].push((0,template_string/* $effect */._G)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Total Protonic Reversal"]))));
  if (!(0,property/* get */.U2)("_olympicSwimmingPool") || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Silent Running"]))))) result["-combat"].push((0,template_string/* $effect */._G)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Silent Running"])))); // Noncombat/combat buffs

  if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Phase Shift"]))))) result["-combat"].push((0,template_string/* $effect */._G)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Shifted Phase"]))));
  if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Photonic Shroud"]))))) result["-combat"].push((0,template_string/* $effect */._G)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["Darkened Photons"]))));
  if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Piezoelectric Honk"]))))) result["+combat"].push((0,template_string/* $effect */._G)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Hooooooooonk!"]))));
  result[" combat"] = result["+combat"];
  return result;
}

function shrug(effects) {
  var _iterator = _createForOfIteratorHelper(effects),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var effect = _step.value;
      if ((0,lib/* have */.lf)(effect)) (0,lib/* uneffect */.Lo)(effect);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function moodCompatible(modifier) {
  // Since shrugging is limited, ensure we do not attempt a +combat task
  // while under -combat effects, and vice-versa.
  if (modifier === undefined) return true;

  if (modifier.includes("+combat") || modifier.includes(" combat")) {
    // eslint-disable-next-line libram/verify-constants
    return !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["Shifted Phase"])))) && !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Darkened Photons"]))));
  }

  if (modifier.includes("-combat")) {
    // eslint-disable-next-line libram/verify-constants
    return !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Hooooooooonk!"]))));
  }

  return true;
}
function applyEffects(modifier, required) {
  var relevantEffects = getRelevantEffects();
  var useful_effects = [];
  useful_effects.push.apply(useful_effects, _toConsumableArray(required));

  for (var key in relevantEffects) {
    if (modifier.includes(key)) {
      useful_effects.push.apply(useful_effects, _toConsumableArray(relevantEffects[key]));
    }
  } // Remove wrong combat effects


  if (modifier.includes("+combat") || modifier.includes(" combat")) shrug(relevantEffects["-combat"]);
  if (modifier.includes("-combat")) shrug(relevantEffects["+combat"]);
  var mpcosts = new Map([[(0,template_string/* $effect */._G)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Shifted Phase"]))), 50], [(0,template_string/* $effect */._G)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Hooooooooonk!"]))), 50], [(0,template_string/* $effect */._G)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["Darkened Photons"]))), 40]]); // Apply all relevant effects

  var hotswapped = []; //

  for (var _i = 0, _useful_effects = useful_effects; _i < _useful_effects.length; _i++) {
    var _mpcosts$get;

    var effect = _useful_effects[_i];
    if ((0,lib/* have */.lf)(effect)) continue; // If we don't have the MP for this effect, hotswap some equipment

    var mpcost = (_mpcosts$get = mpcosts.get(effect)) !== null && _mpcosts$get !== void 0 ? _mpcosts$get : 0;

    if (mpcost > (0,external_kolmafia_.myMaxmp)()) {
      hotswapped.push.apply(hotswapped, _toConsumableArray(swapEquipmentForMp(mpcost)));
    }

    (0,lib/* ensureEffect */.pq)(effect);
  } // If we hotswapped equipment, restore our old equipment (in-reverse, to work well if we moved equipment around)


  hotswapped.reverse();

  for (var _i2 = 0, _hotswapped = hotswapped; _i2 < _hotswapped.length; _i2++) {
    var _hotswapped$_i = _slicedToArray(_hotswapped[_i2], 2),
        slot = _hotswapped$_i[0],
        item = _hotswapped$_i[1];

    (0,external_kolmafia_.equip)(item, slot);
  }
}
function swapEquipmentForMp(mpgoal) {
  var hotswapped = [];
  var inventory_options = Object.entries((0,external_kolmafia_.getInventory)()).map(v => external_kolmafia_.Item.get(v[0])).filter(item => (0,external_kolmafia_.numericModifier)(item, "Maximum MP") > 0 && (0,external_kolmafia_.canEquip)(item));

  var _iterator2 = _createForOfIteratorHelper(external_kolmafia_.Slot.all()),
      _step2;

  try {
    var _loop = function _loop() {
      var slot = _step2.value;
      if (mpgoal <= (0,external_kolmafia_.myMaxmp)()) return "break";
      if (slot === (0,template_string/* $slot */.Jh)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["weapon"]))) || slot === (0,template_string/* $slot */.Jh)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["off-hand"])))) return "continue"; // skip weapon handedness (for now)

      var item = (0,external_kolmafia_.equippedItem)(slot);
      if (item === (0,template_string/* $item */.xr)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["none"])))) return "continue"; // Find an item in the same slot that gives more max MP

      var canonical_slot = slot === (0,template_string/* $slot */.Jh)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["acc3"]))) ? (0,template_string/* $slot */.Jh)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["acc1"]))) : slot === (0,template_string/* $slot */.Jh)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["acc2"]))) ? (0,template_string/* $slot */.Jh)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["acc1"]))) : slot;
      var slot_options = inventory_options.filter(it => (0,external_kolmafia_.equippedAmount)(it) === 0 && (0,external_kolmafia_.toSlot)(it) === canonical_slot && (0,external_kolmafia_.numericModifier)(it, "Maximum HP") >= (0,external_kolmafia_.numericModifier)(item, "Maximum HP") && (0,external_kolmafia_.numericModifier)(it, "Maximum MP") > (0,external_kolmafia_.numericModifier)(item, "Maximum MP")).sort((a, b) => (0,external_kolmafia_.numericModifier)(b, "Maximum MP") - (0,external_kolmafia_.numericModifier)(a, "Maximum MP")); // If there is such an item, equip it

      if (slot_options.length === 0) return "continue";
      hotswapped.push([slot, item]);
      (0,external_kolmafia_.equip)(slot, slot_options[0]);
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ret = _loop();

      if (_ret === "break") break;
      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return hotswapped;
}
;// CONCATENATED MODULE: ./src/priority.ts
var priority_templateObject, priority_templateObject2, priority_templateObject3, priority_templateObject4, priority_templateObject5, priority_templateObject6, priority_templateObject7, priority_templateObject8, priority_templateObject9, priority_templateObject10;

function priority_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function priority_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = priority_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function priority_toConsumableArray(arr) { return priority_arrayWithoutHoles(arr) || priority_iterableToArray(arr) || priority_unsupportedIterableToArray(arr) || priority_nonIterableSpread(); }

function priority_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function priority_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return priority_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return priority_arrayLikeToArray(o, minLen); }

function priority_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function priority_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return priority_arrayLikeToArray(arr); }

function priority_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Temporary priorities that override the routing.
 */




var OverridePriority;

(function (OverridePriority) {
  OverridePriority[OverridePriority["Wanderer"] = 20000] = "Wanderer";
  OverridePriority[OverridePriority["Always"] = 10000] = "Always";
  OverridePriority[OverridePriority["Free"] = 1000] = "Free";
  OverridePriority[OverridePriority["Start"] = 900] = "Start";
  OverridePriority[OverridePriority["LastCopyableMonster"] = 100] = "LastCopyableMonster";
  OverridePriority[OverridePriority["Effect"] = 20] = "Effect";
  OverridePriority[OverridePriority["GoodOrb"] = 15] = "GoodOrb";
  OverridePriority[OverridePriority["YR"] = 10] = "YR";
  OverridePriority[OverridePriority["GoodGoose"] = 1] = "GoodGoose";
  OverridePriority[OverridePriority["GoodBanish"] = 0.5] = "GoodBanish";
  OverridePriority[OverridePriority["None"] = 0] = "None";
  OverridePriority[OverridePriority["BadOrb"] = -2] = "BadOrb";
  OverridePriority[OverridePriority["BadGoose"] = -16] = "BadGoose";
  OverridePriority[OverridePriority["BadMood"] = -100] = "BadMood";
  OverridePriority[OverridePriority["Last"] = -10000] = "Last";
})(OverridePriority || (OverridePriority = {}));

var Prioritization = /*#__PURE__*/function () {
  function Prioritization() {
    _classCallCheck(this, Prioritization);

    _defineProperty(this, "priorities", new Set());

    _defineProperty(this, "orb_monster", undefined);
  }

  _createClass(Prioritization, [{
    key: "explain",
    value: function explain() {
      var reasons = new Map([[OverridePriority.Wanderer, "Wanderer"], [OverridePriority.Always, "Forced"], [OverridePriority.Free, "Free action"], [OverridePriority.Start, "Initial tasks"], [OverridePriority.LastCopyableMonster, "Copy last monster"], [OverridePriority.Effect, "Useful effect"], [OverridePriority.GoodOrb, this.orb_monster ? "Target ".concat(this.orb_monster) : "Target ?"], [OverridePriority.YR, "Yellow ray"], [OverridePriority.GoodGoose, "Goose charged"], [OverridePriority.GoodBanish, "Banishes committed"], [OverridePriority.BadOrb, this.orb_monster ? "Avoid ".concat(this.orb_monster) : "Avoid ?"], [OverridePriority.BadGoose, "Goose not charged"], [OverridePriority.BadMood, "Wrong combat modifiers"]]);
      return priority_toConsumableArray(this.priorities).map(priority => reasons.get(priority)).filter(priority => priority !== undefined).join(", ");
    }
  }, {
    key: "has",
    value: function has(priorty) {
      return this.priorities.has(priorty);
    }
  }, {
    key: "score",
    value: function score() {
      var result = 0;

      var _iterator = priority_createForOfIteratorHelper(this.priorities),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var priority = _step.value;
          result += priority;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;
    }
  }], [{
    key: "fixed",
    value: function fixed(priority) {
      var result = new Prioritization();
      result.priorities.add(priority);
      return result;
    }
  }, {
    key: "from",
    value: function from(task, state) {
      var _task$priority, _task$priority2;

      var result = new Prioritization();
      var base = (_task$priority = (_task$priority2 = task.priority) === null || _task$priority2 === void 0 ? void 0 : _task$priority2.call(task)) !== null && _task$priority !== void 0 ? _task$priority : OverridePriority.None;
      if (base !== OverridePriority.None) result.priorities.add(base); // Check if Grey Goose is charged

      if (needsChargedGoose(task, state)) {
        if ((0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(priority_templateObject || (priority_templateObject = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6) {
          // Do not trigger BadGoose if a YR is up, to make the airship flow better.
          // This way we can get the YR off and use the goose separately
          if (!result.priorities.has(OverridePriority.YR)) {
            result.priorities.add(OverridePriority.BadGoose);
          }
        } else {
          result.priorities.add(OverridePriority.GoodGoose);
        }
      } // Dodge useless monsters with the orb


      if (task.do instanceof external_kolmafia_.Location) {
        var next_monster = state.orb.prediction(task.do);

        if (next_monster !== undefined) {
          result.orb_monster = next_monster;
          result.priorities.add(orbPriority(task, next_monster, state));
        }
      } // Ensure that the current +/- combat effects are compatible
      //  (Macguffin/Forest is tough and doesn't need much +combat; just power though)


      var outfit_spec = typeof task.outfit === "function" ? task.outfit(state) : task.outfit;

      if (!moodCompatible(outfit_spec === null || outfit_spec === void 0 ? void 0 : outfit_spec.modifier) && task.name !== "Macguffin/Forest") {
        result.priorities.add(OverridePriority.BadMood);
      } // Burn off desert debuffs


      if (((0,lib/* have */.lf)((0,template_string/* $effect */._G)(priority_templateObject2 || (priority_templateObject2 = priority_taggedTemplateLiteral(["Prestidigysfunction"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(priority_templateObject3 || (priority_templateObject3 = priority_taggedTemplateLiteral(["Turned Into a Skeleton"]))))) && task.combat && task.combat.can(src_combat.MonsterStrategy.KillItem)) {
        result.priorities.add(OverridePriority.BadMood);
      } // Wait until we get a -combat skill before doing any -combat


      if (outfit_spec !== null && outfit_spec !== void 0 && outfit_spec.modifier && outfit_spec.modifier.includes("-combat") && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(priority_templateObject4 || (priority_templateObject4 = priority_taggedTemplateLiteral(["Phase Shift"])))) && !( // All these add up to -25 combat fine, no need to wait
      (0,lib/* have */.lf)((0,template_string/* $item */.xr)(priority_templateObject5 || (priority_templateObject5 = priority_taggedTemplateLiteral(["Space Trip safety headphones"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(priority_templateObject6 || (priority_templateObject6 = priority_taggedTemplateLiteral(["unbreakable umbrella"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(priority_templateObject7 || (priority_templateObject7 = priority_taggedTemplateLiteral(["protonic accelerator pack"])))) && (!(0,property/* get */.U2)("_olympicSwimmingPool") || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(priority_templateObject8 || (priority_templateObject8 = priority_taggedTemplateLiteral(["Silent Running"]))))))) {
        result.priorities.add(OverridePriority.BadMood);
      } // If we have already used banishes in the zone, prefer it


      if (state.banishes.isPartiallyBanished(task)) {
        result.priorities.add(OverridePriority.GoodBanish);
      }

      return result;
    }
  }]);

  return Prioritization;
}();

function orbPriority(task, monster, state) {
  if (!(task.do instanceof external_kolmafia_.Location)) return OverridePriority.None; // If the goose is not charged, do not aim to reprocess

  if (state.absorb.isReprocessTarget(monster) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(priority_templateObject9 || (priority_templateObject9 = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6) return OverridePriority.None; // Determine if a monster is useful or not based on the combat goals

  if (task.orbtargets === undefined) {
    var _task$combat;

    var task_combat = (_task$combat = task.combat) !== null && _task$combat !== void 0 ? _task$combat : new src_combat.CombatStrategy();
    var next_monster_strategy = task_combat.currentStrategy(monster);
    var next_useless = (next_monster_strategy === src_combat.MonsterStrategy.Ignore || next_monster_strategy === src_combat.MonsterStrategy.IgnoreNoBanish || next_monster_strategy === src_combat.MonsterStrategy.Banish) && !state.absorb.isTarget(monster) && (!state.absorb.isReprocessTarget(monster) || (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(priority_templateObject10 || (priority_templateObject10 = priority_taggedTemplateLiteral(["Grey Goose"])))) < 6);
    var others_useless = task_combat.can(src_combat.MonsterStrategy.Ignore) || task_combat.can(src_combat.MonsterStrategy.IgnoreNoBanish) || task_combat.can(src_combat.MonsterStrategy.Banish);
    var others_useful = state.absorb.hasTargets(task.do) || state.absorb.hasReprocessTargets(task.do) || task_combat.can(src_combat.MonsterStrategy.Kill) || task_combat.can(src_combat.MonsterStrategy.KillFree) || task_combat.can(src_combat.MonsterStrategy.KillHard) || task_combat.can(src_combat.MonsterStrategy.KillItem);

    if (next_useless && others_useful) {
      return OverridePriority.BadOrb;
    } else if (!next_useless && others_useless) {
      return OverridePriority.GoodOrb;
    } else {
      return OverridePriority.None;
    }
  } // Use orbtargets to decide if the next monster is useful


  var fromTask = task.orbtargets();
  if (fromTask === undefined) return OverridePriority.None;
  var targets = [].concat(priority_toConsumableArray(fromTask), priority_toConsumableArray(state.absorb.remainingAbsorbs(task.do)), priority_toConsumableArray(state.absorb.remainingReprocess(task.do)));
  if (targets.length === 0) return OverridePriority.None;

  if (targets.find(t => t === monster) === undefined) {
    return OverridePriority.BadOrb;
  } else {
    return OverridePriority.GoodOrb;
  }
}

function needsChargedGoose(task, state) {
  // Note that we purposefully do not check if we will be equipping the goose
  // in the location. We want to eventually reprocess everything, and so a
  // charged goose allows us to use the orb to target reprocess monsters.
  return task.do instanceof external_kolmafia_.Location && state.absorb.hasReprocessTargets(task.do);
}
;// CONCATENATED MODULE: ./src/tasks/structure.ts

function step(questName) {
  var stringStep = (0,property/* get */.U2)(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
;// CONCATENATED MODULE: ./src/tasks/level1.ts
var level1_templateObject, level1_templateObject2;

function level1_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var TootQuest = {
  name: "Toot",
  tasks: [{
    name: "Start",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Toot",
    after: ["Start"],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") > 0,
    do: () => (0,external_kolmafia_.visitUrl)("tutorial.php?action=toot"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Finish",
    after: ["Toot"],
    priority: () => OverridePriority.Free,
    completed: () => step("questM05Toot") > 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level1_templateObject || (level1_templateObject = level1_taggedTemplateLiteral(["letter from King Ralph XI"])))),
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level1_templateObject2 || (level1_templateObject2 = level1_taggedTemplateLiteral(["letter from King Ralph XI"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/lib.ts
var lib_templateObject, lib_templateObject2, lib_templateObject3;

function lib_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function debug(message, color) {
  if (color) {
    (0,external_kolmafia_.print)(message, color);
  } else {
    (0,external_kolmafia_.print)(message);
  }
} // From phccs

function convertMilliseconds(milliseconds) {
  var seconds = milliseconds / 1000;
  var minutes = Math.floor(seconds / 60);
  var secondsLeft = Math.round((seconds - minutes * 60) * 1000) / 1000;
  var hours = Math.floor(minutes / 60);
  var minutesLeft = Math.round(minutes - hours * 60);
  return (hours !== 0 ? "".concat(hours, " hours, ") : "") + (minutesLeft !== 0 ? "".concat(minutesLeft, " minutes, ") : "") + (secondsLeft !== 0 ? "".concat(secondsLeft, " seconds") : "");
}
function atLevel(level) {
  var goal = Math.pow(level - 1, 2) + 4;
  return (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(lib_templateObject || (lib_templateObject = lib_taggedTemplateLiteral(["muscle"])))) >= goal || (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(lib_templateObject2 || (lib_templateObject2 = lib_taggedTemplateLiteral(["mysticality"])))) >= goal || (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(lib_templateObject3 || (lib_templateObject3 = lib_taggedTemplateLiteral(["moxie"])))) >= goal;
}
// EXTERNAL MODULE: ./node_modules/libram/dist/combat.js
var dist_combat = __webpack_require__(1762);
;// CONCATENATED MODULE: ./src/tasks/level12.ts
var level12_templateObject, level12_templateObject2, level12_templateObject3, level12_templateObject4, level12_templateObject5, level12_templateObject6, level12_templateObject7, level12_templateObject8, level12_templateObject9, level12_templateObject10, _CombatStrategy, level12_templateObject11, level12_templateObject12, level12_templateObject13, level12_templateObject14, level12_templateObject15, level12_templateObject16, level12_templateObject17, level12_templateObject18, level12_templateObject19, level12_templateObject20, level12_templateObject21, level12_templateObject22, level12_templateObject23, level12_templateObject24, level12_templateObject25, level12_templateObject26, level12_templateObject27, level12_templateObject28, level12_templateObject29, level12_templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156;

function level12_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = level12_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function level12_toConsumableArray(arr) { return level12_arrayWithoutHoles(arr) || level12_iterableToArray(arr) || level12_unsupportedIterableToArray(arr) || level12_nonIterableSpread(); }

function level12_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level12_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level12_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level12_arrayLikeToArray(o, minLen); }

function level12_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level12_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level12_arrayLikeToArray(arr); }

function level12_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level12_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function flyersDone() {
  return (0,property/* get */.U2)("flyeredML") >= 10500;
}
var Flyers = [{
  name: "Flyers Start",
  after: ["Enrage"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject || (level12_templateObject = level12_taggedTemplateLiteral(["rock band flyers"])))) || (0,property/* get */.U2)("sidequestArenaCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject2 || (level12_templateObject2 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?place=concert&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}, {
  name: "Flyers End",
  after: ["Flyers Start"],
  ready: () => flyersDone(),
  // Buffer for mafia tracking
  completed: () => (0,property/* get */.U2)("sidequestArenaCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject3 || (level12_templateObject3 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?place=concert&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Lighthouse = [// Use CMG to replace a void monster into a Lobsterfrogman, then backup into the Boss Bat's lair
{
  name: "Lighthouse",
  after: ["Enrage", "Bat/Use Sonar 3"],
  ready: () => (0,property/* get */.U2)("cursedMagnifyingGlassCount") >= 13 && (0,property/* get */.U2)("_voidFreeFights") < 5,
  completed: () => (0,property/* get */.U2)("lastCopyableMonster") === (0,template_string/* $monster */.O4)(level12_templateObject4 || (level12_templateObject4 = level12_taggedTemplateLiteral(["lobsterfrogman"]))) || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level12_templateObject5 || (level12_templateObject5 = level12_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || (0,property/* get */.U2)("sidequestLighthouseCompleted") !== "none" || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject6 || (level12_templateObject6 = level12_taggedTemplateLiteral(["cursed magnifying glass"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject7 || (level12_templateObject7 = level12_taggedTemplateLiteral(["Powerful Glove"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject8 || (level12_templateObject8 = level12_taggedTemplateLiteral(["backup camera"])))),
  do: (0,template_string/* $location */.PG)(level12_templateObject9 || (level12_templateObject9 = level12_taggedTemplateLiteral(["Sonofa Beach"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject10 || (level12_templateObject10 = level12_taggedTemplateLiteral(["cursed magnifying glass, Powerful Glove"])))
  },
  combat: (_CombatStrategy = new src_combat.CombatStrategy()).macro.apply(_CombatStrategy, [new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level12_templateObject11 || (level12_templateObject11 = level12_taggedTemplateLiteral(["CHEAT CODE: Replace Enemy"]))))].concat(level12_toConsumableArray((0,template_string/* $monsters */.fr)(level12_templateObject12 || (level12_templateObject12 = level12_taggedTemplateLiteral(["void guy, void slab, void spider"])))))).kill((0,template_string/* $monster */.O4)(level12_templateObject13 || (level12_templateObject13 = level12_taggedTemplateLiteral(["lobsterfrogman"])))),
  limit: {
    tries: 1
  }
}, {
  name: "Lighthouse Basic",
  after: ["Enrage", "Lighthouse"],
  completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level12_templateObject14 || (level12_templateObject14 = level12_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || (0,property/* get */.U2)("sidequestLighthouseCompleted") !== "none",
  do: (0,template_string/* $location */.PG)(level12_templateObject15 || (level12_templateObject15 = level12_taggedTemplateLiteral(["Sonofa Beach"]))),
  outfit: {
    modifier: "+combat"
  },
  combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level12_templateObject16 || (level12_templateObject16 = level12_taggedTemplateLiteral(["lobsterfrogman"])))),
  limit: {
    soft: 40
  }
}, {
  name: "Lighthouse End",
  after: ["Lighthouse Basic"],
  completed: () => (0,property/* get */.U2)("sidequestLighthouseCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject17 || (level12_templateObject17 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?place=lighthouse&action=pyro&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Junkyard = [{
  name: "Junkyard Start",
  after: ["Enrage"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject18 || (level12_templateObject18 = level12_taggedTemplateLiteral(["molybdenum magnet"])))) || (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject19 || (level12_templateObject19 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?action=junkman&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}, {
  name: "Junkyard Hammer",
  after: ["Junkyard Start"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject20 || (level12_templateObject20 = level12_taggedTemplateLiteral(["molybdenum hammer"])))) || (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: (0,template_string/* $item */.xr)(level12_templateObject21 || (level12_templateObject21 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject22 || (level12_templateObject22 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: (0,template_string/* $location */.PG)(level12_templateObject23 || (level12_templateObject23 = level12_taggedTemplateLiteral(["Next to that Barrel with Something Burning in it"]))),
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().while_("!match whips out && !times 28 && !hpbelow 30", new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level12_templateObject24 || (level12_templateObject24 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new dist_combat/* Macro */.LE().item("molybdenum magnet")), (0,template_string/* $monster */.O4)(level12_templateObject25 || (level12_templateObject25 = level12_taggedTemplateLiteral(["batwinged gremlin (tool)"])))).banish((0,template_string/* $monster */.O4)(level12_templateObject26 || (level12_templateObject26 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill((0,template_string/* $monster */.O4)(level12_templateObject27 || (level12_templateObject27 = level12_taggedTemplateLiteral(["batwinged gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Wrench",
  after: ["Junkyard Start"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level12_templateObject28 || (level12_templateObject28 = level12_taggedTemplateLiteral(["molybdenum crescent wrench"])))) || (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: (0,template_string/* $item */.xr)(level12_templateObject29 || (level12_templateObject29 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: (0,template_string/* $items */.vS)(level12_templateObject30 || (level12_templateObject30 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: (0,template_string/* $location */.PG)(_templateObject31 || (_templateObject31 = level12_taggedTemplateLiteral(["Over Where the Old Tires Are"]))),
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().while_("!match whips out && !times 28 && !hpbelow 30", new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject32 || (_templateObject32 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new dist_combat/* Macro */.LE().item("molybdenum magnet")), (0,template_string/* $monster */.O4)(_templateObject33 || (_templateObject33 = level12_taggedTemplateLiteral(["erudite gremlin (tool)"])))).banish((0,template_string/* $monster */.O4)(_templateObject34 || (_templateObject34 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill((0,template_string/* $monster */.O4)(_templateObject35 || (_templateObject35 = level12_taggedTemplateLiteral(["erudite gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Pliers",
  after: ["Junkyard Start"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(_templateObject36 || (_templateObject36 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject37 || (_templateObject37 = level12_taggedTemplateLiteral(["molybdenum pliers"])))) || (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(_templateObject38 || (_templateObject38 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: (0,template_string/* $location */.PG)(_templateObject39 || (_templateObject39 = level12_taggedTemplateLiteral(["Near an Abandoned Refrigerator"]))),
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().while_("!match whips out && !times 28 && !hpbelow 30", new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject40 || (_templateObject40 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new dist_combat/* Macro */.LE().item("molybdenum magnet")), (0,template_string/* $monster */.O4)(_templateObject41 || (_templateObject41 = level12_taggedTemplateLiteral(["spider gremlin (tool)"])))).banish((0,template_string/* $monster */.O4)(_templateObject42 || (_templateObject42 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill((0,template_string/* $monster */.O4)(_templateObject43 || (_templateObject43 = level12_taggedTemplateLiteral(["spider gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard Screwdriver",
  after: ["Junkyard Start"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject44 || (_templateObject44 = level12_taggedTemplateLiteral(["molybdenum screwdriver"])))) || (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  acquire: [{
    item: (0,template_string/* $item */.xr)(_templateObject45 || (_templateObject45 = level12_taggedTemplateLiteral(["seal tooth"])))
  }],
  outfit: {
    equip: (0,template_string/* $items */.vS)(_templateObject46 || (_templateObject46 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: (0,template_string/* $location */.PG)(_templateObject47 || (_templateObject47 = level12_taggedTemplateLiteral(["Out by that Rusted-Out Car"]))),
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().while_("!match whips out && !times 28 && !hpbelow 30", new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject48 || (_templateObject48 = level12_taggedTemplateLiteral(["seal tooth"]))))).if_("match whips out", new dist_combat/* Macro */.LE().item("molybdenum magnet")), (0,template_string/* $monster */.O4)(_templateObject49 || (_templateObject49 = level12_taggedTemplateLiteral(["vegetable gremlin (tool)"])))).banish((0,template_string/* $monster */.O4)(_templateObject50 || (_templateObject50 = level12_taggedTemplateLiteral(["A.M.C. gremlin"])))).kill((0,template_string/* $monster */.O4)(_templateObject51 || (_templateObject51 = level12_taggedTemplateLiteral(["vegetable gremlin (tool)"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Junkyard End",
  after: ["Junkyard Hammer", "Junkyard Wrench", "Junkyard Pliers", "Junkyard Screwdriver"],
  completed: () => (0,property/* get */.U2)("sidequestJunkyardCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(_templateObject52 || (_templateObject52 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?action=junkman&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Orchard = [{
  name: "Orchard Hatching",
  after: ["Enrage"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject53 || (_templateObject53 = level12_taggedTemplateLiteral(["filthworm hatchling scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject54 || (_templateObject54 = level12_taggedTemplateLiteral(["Filthworm Larva Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject55 || (_templateObject55 = level12_taggedTemplateLiteral(["filthworm drone scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject56 || (_templateObject56 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject57 || (_templateObject57 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject58 || (_templateObject58 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject59 || (_templateObject59 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || (0,property/* get */.U2)("sidequestOrchardCompleted") !== "none",
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject60 || (_templateObject60 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.BadMood : OverridePriority.YR,
  acquire: [{
    item: (0,template_string/* $item */.xr)(_templateObject61 || (_templateObject61 = level12_taggedTemplateLiteral(["yellow rocket"]))),
    useful: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject62 || (_templateObject62 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))
  }],
  do: (0,template_string/* $location */.PG)(_templateObject63 || (_templateObject63 = level12_taggedTemplateLiteral(["The Hatching Chamber"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject64 || (_templateObject64 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))) return {
      modifier: "item"
    };else return {};
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject65 || (_templateObject65 = level12_taggedTemplateLiteral(["yellow rocket"])))), (0,template_string/* $monster */.O4)(_templateObject66 || (_templateObject66 = level12_taggedTemplateLiteral(["larval filthworm"])))).killItem(),
  limit: {
    soft: 10
  }
}, {
  name: "Orchard Feeding",
  after: ["Orchard Hatching"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject67 || (_templateObject67 = level12_taggedTemplateLiteral(["filthworm drone scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject68 || (_templateObject68 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject69 || (_templateObject69 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject70 || (_templateObject70 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject71 || (_templateObject71 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || (0,property/* get */.U2)("sidequestOrchardCompleted") !== "none",
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject72 || (_templateObject72 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.BadMood : OverridePriority.YR,
  acquire: [{
    item: (0,template_string/* $item */.xr)(_templateObject73 || (_templateObject73 = level12_taggedTemplateLiteral(["yellow rocket"]))),
    useful: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject74 || (_templateObject74 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))
  }],
  do: (0,template_string/* $location */.PG)(_templateObject75 || (_templateObject75 = level12_taggedTemplateLiteral(["The Feeding Chamber"]))),
  effects: (0,template_string/* $effects */.lh)(_templateObject76 || (_templateObject76 = level12_taggedTemplateLiteral(["Filthworm Larva Stench"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject77 || (_templateObject77 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))) return {
      modifier: "item"
    };else return {};
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject78 || (_templateObject78 = level12_taggedTemplateLiteral(["yellow rocket"])))), (0,template_string/* $monster */.O4)(_templateObject79 || (_templateObject79 = level12_taggedTemplateLiteral(["filthworm drone"])))).killItem(),
  limit: {
    soft: 10
  }
}, {
  name: "Orchard Guard",
  after: ["Orchard Feeding"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject80 || (_templateObject80 = level12_taggedTemplateLiteral(["filthworm royal guard scent gland"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject81 || (_templateObject81 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject82 || (_templateObject82 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || (0,property/* get */.U2)("sidequestOrchardCompleted") !== "none",
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject83 || (_templateObject83 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.BadMood : OverridePriority.YR,
  acquire: [{
    item: (0,template_string/* $item */.xr)(_templateObject84 || (_templateObject84 = level12_taggedTemplateLiteral(["yellow rocket"]))),
    useful: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject85 || (_templateObject85 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))
  }],
  do: (0,template_string/* $location */.PG)(_templateObject86 || (_templateObject86 = level12_taggedTemplateLiteral(["The Royal Guard Chamber"]))),
  effects: (0,template_string/* $effects */.lh)(_templateObject87 || (_templateObject87 = level12_taggedTemplateLiteral(["Filthworm Drone Stench"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject88 || (_templateObject88 = level12_taggedTemplateLiteral(["Everything Looks Yellow"]))))) return {
      modifier: "item"
    };else return {};
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject89 || (_templateObject89 = level12_taggedTemplateLiteral(["yellow rocket"])))), (0,template_string/* $monster */.O4)(_templateObject90 || (_templateObject90 = level12_taggedTemplateLiteral(["filthworm royal guard"])))).killItem(),
  limit: {
    soft: 10
  }
}, {
  name: "Orchard Queen",
  after: ["Orchard Guard"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject91 || (_templateObject91 = level12_taggedTemplateLiteral(["heart of the filthworm queen"])))) || (0,property/* get */.U2)("sidequestOrchardCompleted") !== "none",
  do: (0,template_string/* $location */.PG)(_templateObject92 || (_templateObject92 = level12_taggedTemplateLiteral(["The Filthworm Queen's Chamber"]))),
  outfit: {
    modifier: "items"
  },
  effects: (0,template_string/* $effects */.lh)(_templateObject93 || (_templateObject93 = level12_taggedTemplateLiteral(["Filthworm Guard Stench"]))),
  combat: new src_combat.CombatStrategy(true).kill(),
  limit: {
    tries: 2
  } // allow wanderer

}, {
  name: "Orchard Finish",
  after: ["Orchard Queen", "Open Orchard"],
  completed: () => (0,property/* get */.U2)("sidequestOrchardCompleted") !== "none",
  outfit: {
    equip: (0,template_string/* $items */.vS)(_templateObject94 || (_templateObject94 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
  },
  do: () => {
    (0,external_kolmafia_.visitUrl)("bigisland.php?place=orchard&action=stand&pwd");
  },
  freeaction: true,
  limit: {
    tries: 1
  }
}];
var Nuns = [{
  name: "Nuns",
  after: ["Open Nuns"],
  completed: () => (0,property/* get */.U2)("sidequestNunsCompleted") !== "none",
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject95 || (_templateObject95 = level12_taggedTemplateLiteral(["Winklered"])))) ? OverridePriority.Effect : OverridePriority.None,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject96 || (_templateObject96 = level12_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) && (0,property/* get */.U2)("boomBoxSong") !== "Total Eclipse of Your Meat") (0,external_kolmafia_.cliExecute)("boombox meat");
    if (!(0,property/* get */.U2)("concertVisited")) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(_templateObject97 || (_templateObject97 = level12_taggedTemplateLiteral(["Winklered"]))));
  },
  do: (0,template_string/* $location */.PG)(_templateObject98 || (_templateObject98 = level12_taggedTemplateLiteral(["The Themthar Hills"]))),
  outfit: {
    modifier: "meat",
    equip: (0,template_string/* $items */.vS)(_templateObject99 || (_templateObject99 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin, amulet coin"]))) // Use amulet coin (if we have) to avoid using orb

  },
  freecombat: true,
  // Do not equip cmg or carn plant
  combat: new src_combat.CombatStrategy(true).macro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(_templateObject100 || (_templateObject100 = level12_taggedTemplateLiteral(["Bowl Straight Up"])))).trySkill((0,template_string/* $skill */.tm)(_templateObject101 || (_templateObject101 = level12_taggedTemplateLiteral(["Sing Along"]))))).kill(),
  limit: {
    soft: 25
  }
}];
var WarQuest = {
  name: "War",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(12) && councilSafe(),
    completed: () => step("questL12War") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Outfit Hippy",
    after: ["Misc/Unlock Island"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject102 || (_templateObject102 = level12_taggedTemplateLiteral(["filthy corduroys"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject103 || (_templateObject103 = level12_taggedTemplateLiteral(["filthy knitted dread sack"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject104 || (_templateObject104 = level12_taggedTemplateLiteral(["Cargo Cultist Shorts"])))),
    ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject105 || (_templateObject105 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) && ((0,external_kolmafia_.myMeat)() >= 250 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject106 || (_templateObject106 = level12_taggedTemplateLiteral(["yellow rocket"]))))),
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject107 || (_templateObject107 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.None : OverridePriority.YR,
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject108 || (_templateObject108 = level12_taggedTemplateLiteral(["yellow rocket"])))
    }],
    do: (0,template_string/* $location */.PG)(_templateObject109 || (_templateObject109 = level12_taggedTemplateLiteral(["Hippy Camp"]))),
    limit: {
      soft: 5
    },
    outfit: {
      modifier: "+combat"
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject110 || (_templateObject110 = level12_taggedTemplateLiteral(["yellow rocket"])))))
  }, {
    name: "Outfit Frat",
    after: ["Start", "Outfit Hippy"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject111 || (_templateObject111 = level12_taggedTemplateLiteral(["beer helmet"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject112 || (_templateObject112 = level12_taggedTemplateLiteral(["distressed denim pants"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject113 || (_templateObject113 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject114 || (_templateObject114 = level12_taggedTemplateLiteral(["Cargo Cultist Shorts"])))),
    ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject115 || (_templateObject115 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) && ((0,external_kolmafia_.myMeat)() >= 250 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject116 || (_templateObject116 = level12_taggedTemplateLiteral(["yellow rocket"]))))),
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject117 || (_templateObject117 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.None : OverridePriority.YR,
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject118 || (_templateObject118 = level12_taggedTemplateLiteral(["yellow rocket"])))
    }],
    do: (0,template_string/* $location */.PG)(_templateObject119 || (_templateObject119 = level12_taggedTemplateLiteral(["Frat House"]))),
    limit: {
      soft: 5
    },
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject120 || (_templateObject120 = level12_taggedTemplateLiteral(["filthy corduroys, filthy knitted dread sack"]))),
      modifier: "+combat"
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject121 || (_templateObject121 = level12_taggedTemplateLiteral(["yellow rocket"]))))),
    choices: {
      142: 3,
      143: 3,
      144: 3,
      145: 1,
      146: 3,
      1433: 3
    }
  }, {
    name: "Outfit Frat Cargo",
    after: [],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject122 || (_templateObject122 = level12_taggedTemplateLiteral(["beer helmet"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject123 || (_templateObject123 = level12_taggedTemplateLiteral(["distressed denim pants"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject124 || (_templateObject124 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject125 || (_templateObject125 = level12_taggedTemplateLiteral(["Cargo Cultist Shorts"])))),
    ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject126 || (_templateObject126 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) && ((0,external_kolmafia_.myMeat)() >= 250 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject127 || (_templateObject127 = level12_taggedTemplateLiteral(["yellow rocket"]))))),
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(_templateObject128 || (_templateObject128 = level12_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.None : OverridePriority.YR,
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject129 || (_templateObject129 = level12_taggedTemplateLiteral(["yellow rocket"])))
    }],
    do: () => {
      (0,external_kolmafia_.cliExecute)("cargo 568");
    },
    limit: {
      tries: 1
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(_templateObject130 || (_templateObject130 = level12_taggedTemplateLiteral(["yellow rocket"])))))
  }, {
    name: "Enrage",
    after: ["Start", "Misc/Unlock Island", "Outfit Frat Cargo", "Outfit Frat"],
    completed: () => step("questL12War") >= 1,
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject131 || (_templateObject131 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"]))),
      modifier: "-combat"
    },
    do: (0,template_string/* $location */.PG)(_templateObject132 || (_templateObject132 = level12_taggedTemplateLiteral(["Wartime Hippy Camp (Frat Disguise)"]))),
    choices: {
      142: 3,
      143: 3,
      144: 3,
      145: 1,
      146: 3,
      1433: 3
    },
    limit: {
      soft: 20
    }
  }].concat(Flyers, Lighthouse, Junkyard, [{
    name: "Open Orchard",
    after: ["Flyers End", "Lighthouse End", "Junkyard End"],
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject133 || (_templateObject133 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject134 || (_templateObject134 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject135 || (_templateObject135 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => (0,property/* get */.U2)("hippiesDefeated") >= 64,
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject136 || (_templateObject136 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: (0,template_string/* $location */.PG)(_templateObject137 || (_templateObject137 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    post: dimesForGarters,
    combat: new src_combat.CombatStrategy().kill(),
    limit: {
      tries: 10
    }
  }], Orchard, [{
    name: "Open Nuns",
    after: ["Orchard Finish"],
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject138 || (_templateObject138 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject139 || (_templateObject139 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject140 || (_templateObject140 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => (0,property/* get */.U2)("hippiesDefeated") >= 192,
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject141 || (_templateObject141 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: (0,template_string/* $location */.PG)(_templateObject142 || (_templateObject142 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    combat: new src_combat.CombatStrategy().kill(),
    limit: {
      tries: 9
    }
  }], Nuns, [{
    name: "Clear",
    after: ["Nuns"],
    acquire: [{
      item: (0,template_string/* $item */.xr)(_templateObject143 || (_templateObject143 = level12_taggedTemplateLiteral(["beer helmet"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject144 || (_templateObject144 = level12_taggedTemplateLiteral(["distressed denim pants"])))
    }, {
      item: (0,template_string/* $item */.xr)(_templateObject145 || (_templateObject145 = level12_taggedTemplateLiteral(["bejeweled pledge pin"])))
    }],
    completed: () => (0,property/* get */.U2)("hippiesDefeated") >= 1000,
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject146 || (_templateObject146 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    do: (0,template_string/* $location */.PG)(_templateObject147 || (_templateObject147 = level12_taggedTemplateLiteral(["The Battlefield (Frat Uniform)"]))),
    post: dimesForGarters,
    combat: new src_combat.CombatStrategy().kill(),
    limit: {
      tries: 30
    }
  }, {
    name: "Boss Hippie",
    after: ["Clear"],
    completed: () => step("questL12War") === 999,
    outfit: {
      equip: (0,template_string/* $items */.vS)(_templateObject148 || (_templateObject148 = level12_taggedTemplateLiteral(["beer helmet, distressed denim pants, bejeweled pledge pin"])))
    },
    prepare: dimesForGarters,
    do: () => {
      (0,external_kolmafia_.visitUrl)("bigisland.php?place=camp&whichcamp=1&confirm7=1");
      (0,external_kolmafia_.visitUrl)("bigisland.php?action=bossfight&pwd");
    },
    combat: new src_combat.CombatStrategy(true).killHard(),
    limit: {
      tries: 1
    }
  }])
};
function councilSafe() {
  // Check if it is safe to visit the council without making the war outfit worse
  // (It is harder to get the hippy outfit after the war starts)
  return !atLevel(12) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject149 || (_templateObject149 = level12_taggedTemplateLiteral(["filthy corduroys"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject150 || (_templateObject150 = level12_taggedTemplateLiteral(["filthy knitted dread sack"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject151 || (_templateObject151 = level12_taggedTemplateLiteral(["beer helmet"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject152 || (_templateObject152 = level12_taggedTemplateLiteral(["distressed denim pants"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject153 || (_templateObject153 = level12_taggedTemplateLiteral(["bejeweled pledge pin"]))));
}

function dimesForGarters() {
  if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(_templateObject154 || (_templateObject154 = level12_taggedTemplateLiteral(["gauze garter"])))) >= 20) return;
  var to_sell = (0,template_string/* $items */.vS)(_templateObject155 || (_templateObject155 = level12_taggedTemplateLiteral(["pink clay bead, purple clay bead, green clay bead, communications windchimes, bullet-proof corduroys, round purple sunglasses, reinforced beaded headband"])));

  var _iterator = level12_createForOfIteratorHelper(to_sell),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var it = _step.value;
      if ((0,external_kolmafia_.itemAmount)(it) > 0) (0,external_kolmafia_.sell)(it.buyer, (0,external_kolmafia_.itemAmount)(it), it);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if ((0,template_string/* $coinmaster */.$L)(_templateObject156 || (_templateObject156 = level12_taggedTemplateLiteral(["Quartersmaster"]))).availableTokens >= 2) (0,external_kolmafia_.cliExecute)("make * gauze garter");
}
;// CONCATENATED MODULE: ./src/tasks/level2.ts
var level2_templateObject, level2_templateObject2, level2_templateObject3;

function level2_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var MosquitoQuest = {
  name: "Mosquito",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(2),
    completed: () => step("questL02Larva") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Burn Delay",
    after: ["Start"],
    completed: () => (0,template_string/* $location */.PG)(level2_templateObject || (level2_templateObject = level2_taggedTemplateLiteral(["The Spooky Forest"]))).turnsSpent >= 5 || step("questL02Larva") >= 1,
    do: (0,template_string/* $location */.PG)(level2_templateObject2 || (level2_templateObject2 = level2_taggedTemplateLiteral(["The Spooky Forest"]))),
    choices: {
      502: 2,
      505: 1,
      334: 1
    },
    limit: {
      tries: 5
    },
    delay: 5
  }, {
    name: "Mosquito",
    after: ["Burn Delay"],
    completed: () => step("questL02Larva") >= 1,
    do: (0,template_string/* $location */.PG)(level2_templateObject3 || (level2_templateObject3 = level2_taggedTemplateLiteral(["The Spooky Forest"]))),
    choices: {
      502: 2,
      505: 1,
      334: 1
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Finish",
    after: ["Mosquito"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL02Larva") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level3.ts
var level3_templateObject, level3_templateObject2;

function level3_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var TavernQuest = {
  name: "Tavern",
  tasks: [{
    name: "Start",
    after: ["Mosquito/Finish"],
    ready: () => atLevel(3),
    completed: () => step("questL03Rat") >= 0,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Tavernkeep",
    after: ["Start"],
    completed: () => step("questL03Rat") >= 1,
    do: () => (0,external_kolmafia_.visitUrl)("tavern.php?place=barkeep"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Basement",
    after: ["Tavernkeep"],
    completed: () => step("questL03Rat") >= 2,
    priority: () => atLevel(17) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level3_templateObject || (level3_templateObject = level3_taggedTemplateLiteral(["backup camera"])))) ? OverridePriority.None : OverridePriority.BadGoose,
    // Wait for backup camera to max out
    do: () => {
      (0,external_kolmafia_.visitUrl)("cellar.php");
      var layout = (0,external_kolmafia_.getProperty)("tavernLayout");
      var path = [3, 2, 1, 0, 5, 10, 15, 20, 16, 21];

      for (var i = 0; i < path.length; i++) {
        if (layout.charAt(path[i]) === "0") {
          (0,external_kolmafia_.visitUrl)("cellar.php?action=explore&whichspot=".concat(path[i] + 1));
          (0,external_kolmafia_.runCombat)();
          (0,external_kolmafia_.runChoice)(-1);
          break;
        }
      }
    },
    outfit: {
      modifier: "ML, +combat"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level3_templateObject2 || (level3_templateObject2 = level3_taggedTemplateLiteral(["drunken rat king"])))).ignoreNoBanish(),
    choices: {
      509: 1,
      510: 1,
      511: 2,
      514: () => (0,external_kolmafia_.numericModifier)("Stench Damage") >= 20 ? 2 : 1,
      515: () => (0,external_kolmafia_.numericModifier)("Spooky Damage") >= 20 ? 2 : 1,
      496: () => (0,external_kolmafia_.numericModifier)("Hot Damage") >= 20 ? 2 : 1,
      513: () => (0,external_kolmafia_.numericModifier)("Cold Damage") >= 20 ? 2 : 1
    },
    limit: {
      tries: 10
    }
  }, {
    name: "Finish",
    after: ["Basement"],
    completed: () => step("questL03Rat") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("tavern.php?place=barkeep"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level4.ts
var level4_templateObject, level4_templateObject2, level4_templateObject3, level4_templateObject4, level4_templateObject5, level4_templateObject6, level4_templateObject7, level4_templateObject8, level4_templateObject9, level4_templateObject10, level4_templateObject11, level4_templateObject12, level4_templateObject13, level4_templateObject14, level4_templateObject15, level4_templateObject16, level4_templateObject17, level4_templateObject18, level4_templateObject19, level4_templateObject20, level4_templateObject21, level4_templateObject22, level4_templateObject23, level4_templateObject24, level4_templateObject25, level4_templateObject26, level4_templateObject27, level4_templateObject28, _CombatStrategy$macro, level4_templateObject29, level4_templateObject30, level4_templateObject31, level4_templateObject32, level4_templateObject33;

function level4_toConsumableArray(arr) { return level4_arrayWithoutHoles(arr) || level4_iterableToArray(arr) || level4_unsupportedIterableToArray(arr) || level4_nonIterableSpread(); }

function level4_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level4_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level4_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level4_arrayLikeToArray(o, minLen); }

function level4_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level4_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level4_arrayLikeToArray(arr); }

function level4_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level4_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var BatQuest = {
  name: "Bat",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(4),
    completed: () => step("questL04Bat") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Get Sonar 1",
    after: [],
    completed: () => step("questL04Bat") + (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level4_templateObject || (level4_templateObject = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 1,
    do: (0,template_string/* $location */.PG)(level4_templateObject2 || (level4_templateObject2 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject3 || (level4_templateObject3 = level4_taggedTemplateLiteral(["industrial fire extinguisher"])))) || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level4_templateObject4 || (level4_templateObject4 = level4_taggedTemplateLiteral(["Double Nanovision"])))),
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject5 || (level4_templateObject5 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject6 || (level4_templateObject6 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject7 || (level4_templateObject7 = level4_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 20 && !(0,property/* get */.U2)("fireExtinguisherBatHoleUsed")) return {
        equip: (0,template_string/* $items */.vS)(level4_templateObject8 || (level4_templateObject8 = level4_taggedTemplateLiteral(["industrial fire extinguisher"]))),
        modifier: "stench res"
      };else return {
        modifier: "item, 10 stench res"
      };
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level4_templateObject9 || (level4_templateObject9 = level4_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))).kill((0,template_string/* $monster */.O4)(level4_templateObject10 || (level4_templateObject10 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 1",
    after: ["Get Sonar 1"],
    completed: () => step("questL04Bat") >= 1,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject11 || (level4_templateObject11 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Get Sonar 2",
    after: ["Use Sonar 1", "Palindome/Bat Snake"],
    completed: () => step("questL04Bat") + (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level4_templateObject12 || (level4_templateObject12 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 2,
    do: (0,template_string/* $location */.PG)(level4_templateObject13 || (level4_templateObject13 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject14 || (level4_templateObject14 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject15 || (level4_templateObject15 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: {
      modifier: "item, 10 stench res"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level4_templateObject16 || (level4_templateObject16 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 2",
    after: ["Get Sonar 2"],
    completed: () => step("questL04Bat") >= 2,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject17 || (level4_templateObject17 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Get Sonar 3",
    after: ["Use Sonar 2"],
    completed: () => step("questL04Bat") + (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level4_templateObject18 || (level4_templateObject18 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))) >= 3,
    do: (0,template_string/* $location */.PG)(level4_templateObject19 || (level4_templateObject19 = level4_taggedTemplateLiteral(["Guano Junction"]))),
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject20 || (level4_templateObject20 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject21 || (level4_templateObject21 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"]))));
    },
    outfit: {
      modifier: "item, 10 stench res"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level4_templateObject22 || (level4_templateObject22 = level4_taggedTemplateLiteral(["screambat"])))).killItem(),
    limit: {
      tries: 10
    }
  }, {
    name: "Use Sonar 3",
    after: ["Get Sonar 3"],
    completed: () => step("questL04Bat") >= 3,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level4_templateObject23 || (level4_templateObject23 = level4_taggedTemplateLiteral(["sonar-in-a-biscuit"])))),
    limit: {
      tries: 3
    },
    freeaction: true
  }, {
    name: "Lobsterfrogman Drop",
    after: ["Use Sonar 3"],
    ready: () => (0,property/* get */.U2)("lastCopyableMonster") === (0,template_string/* $monster */.O4)(level4_templateObject24 || (level4_templateObject24 = level4_taggedTemplateLiteral(["lobsterfrogman"]))),
    priority: () => (0,property/* get */.U2)("lastCopyableMonster") === (0,template_string/* $monster */.O4)(level4_templateObject25 || (level4_templateObject25 = level4_taggedTemplateLiteral(["lobsterfrogman"]))) ? OverridePriority.LastCopyableMonster : OverridePriority.None,
    completed: () => step("questL04Bat") >= 4 || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level4_templateObject26 || (level4_templateObject26 = level4_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || (0,property/* get */.U2)("sidequestLighthouseCompleted") !== "none" || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level4_templateObject27 || (level4_templateObject27 = level4_taggedTemplateLiteral(["backup camera"])))),
    do: (0,template_string/* $location */.PG)(level4_templateObject28 || (level4_templateObject28 = level4_taggedTemplateLiteral(["The Boss Bat's Lair"]))),
    combat: (_CombatStrategy$macro = new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level4_templateObject29 || (level4_templateObject29 = level4_taggedTemplateLiteral(["Back-Up to your Last Enemy"])))))).kill.apply(_CombatStrategy$macro, level4_toConsumableArray((0,template_string/* $monsters */.fr)(level4_templateObject30 || (level4_templateObject30 = level4_taggedTemplateLiteral(["Boss Bat, lobsterfrogman"]))))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level4_templateObject31 || (level4_templateObject31 = level4_taggedTemplateLiteral(["backup camera"])))
    },
    limit: {
      tries: 4
    }
  }, {
    name: "Boss Bat",
    after: ["Bat/Use Sonar 3", "Lobsterfrogman Drop"],
    completed: () => step("questL04Bat") >= 4,
    do: (0,template_string/* $location */.PG)(level4_templateObject32 || (level4_templateObject32 = level4_taggedTemplateLiteral(["The Boss Bat's Lair"]))),
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level4_templateObject33 || (level4_templateObject33 = level4_taggedTemplateLiteral(["Boss Bat"])))).ignoreNoBanish(),
    limit: {
      soft: 10
    },
    delay: 6
  }, {
    name: "Finish",
    after: ["Boss Bat"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL04Bat") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level5.ts
var level5_templateObject, level5_templateObject2, level5_templateObject3, level5_templateObject4, level5_templateObject5, level5_templateObject6, level5_templateObject7, level5_templateObject8, level5_templateObject9, level5_templateObject10, level5_templateObject11, level5_templateObject12, level5_templateObject13, level5_templateObject14, level5_templateObject15, level5_templateObject16, level5_templateObject17, level5_templateObject18, level5_templateObject19, level5_templateObject20, level5_templateObject21, level5_templateObject22, level5_templateObject23, level5_templateObject24, level5_templateObject25, level5_templateObject26, level5_templateObject27, level5_templateObject28, level5_templateObject29, level5_templateObject30, level5_templateObject31;

function level5_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var KnobQuest = {
  name: "Knob",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(5),
    completed: () => step("questL05Goblin") >= 0,
    prepare: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject || (level5_templateObject = level5_taggedTemplateLiteral(["natural magick candle"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level5_templateObject2 || (level5_templateObject2 = level5_taggedTemplateLiteral(["The Odour of Magick"]))));
    },
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Outskirts",
    after: [],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject3 || (level5_templateObject3 = level5_taggedTemplateLiteral(["Knob Goblin encryption key"])))) || step("questL05Goblin") > 0,
    do: (0,template_string/* $location */.PG)(level5_templateObject4 || (level5_templateObject4 = level5_taggedTemplateLiteral(["The Outskirts of Cobb's Knob"]))),
    choices: {
      111: 3,
      113: 2,
      118: 1
    },
    limit: {
      tries: 12
    },
    delay: 10
  }, {
    name: "Open Knob",
    after: ["Start", "Outskirts"],
    completed: () => step("questL05Goblin") >= 1,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level5_templateObject5 || (level5_templateObject5 = level5_taggedTemplateLiteral(["Cobb's Knob map"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Harem",
    after: ["Open Knob"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject6 || (level5_templateObject6 = level5_taggedTemplateLiteral(["Knob Goblin harem veil"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject7 || (level5_templateObject7 = level5_taggedTemplateLiteral(["Knob Goblin harem pants"])))),
    do: (0,template_string/* $location */.PG)(level5_templateObject8 || (level5_templateObject8 = level5_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject9 || (level5_templateObject9 = level5_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 20 && !(0,property/* get */.U2)("fireExtinguisherHaremUsed")) return {
        equip: (0,template_string/* $items */.vS)(level5_templateObject10 || (level5_templateObject10 = level5_taggedTemplateLiteral(["industrial fire extinguisher"])))
      };else return {
        modifier: "item"
      };
    },
    combat: new src_combat.CombatStrategy().macro( // Always use the fire extinguisher on the guard
    new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level5_templateObject11 || (level5_templateObject11 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"])))), (0,template_string/* $monster */.O4)(level5_templateObject12 || (level5_templateObject12 = level5_taggedTemplateLiteral(["Knob Goblin Harem Guard"])))).macro( // Don't use the fire extinguisher if we want to absorb the madam
    state => new dist_combat/* Macro */.LE().externalIf(!state.absorb.isTarget((0,template_string/* $monster */.O4)(level5_templateObject13 || (level5_templateObject13 = level5_taggedTemplateLiteral(["Knob Goblin Madam"])))), new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level5_templateObject14 || (level5_templateObject14 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), (0,template_string/* $monster */.O4)(level5_templateObject15 || (level5_templateObject15 = level5_taggedTemplateLiteral(["Knob Goblin Madam"])))).macro( // Don't use the fire extinguisher if we want to absorb the girl
    state => new dist_combat/* Macro */.LE().externalIf(!state.absorb.isTarget((0,template_string/* $monster */.O4)(level5_templateObject16 || (level5_templateObject16 = level5_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))), new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level5_templateObject17 || (level5_templateObject17 = level5_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), (0,template_string/* $monster */.O4)(level5_templateObject18 || (level5_templateObject18 = level5_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))).banish((0,template_string/* $monster */.O4)(level5_templateObject19 || (level5_templateObject19 = level5_taggedTemplateLiteral(["Knob Goblin Harem Guard"])))).killItem(),
    limit: {
      soft: 20
    } // Allow for Cobb's Knob lab key

  }, {
    name: "Perfume",
    after: ["Harem"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level5_templateObject20 || (level5_templateObject20 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject21 || (level5_templateObject21 = level5_taggedTemplateLiteral(["Knob Goblin perfume"])))) || step("questL05Goblin") === 999,
    do: (0,template_string/* $location */.PG)(level5_templateObject22 || (level5_templateObject22 = level5_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level5_templateObject23 || (level5_templateObject23 = level5_taggedTemplateLiteral(["Knob Goblin harem veil, Knob Goblin harem pants"])))
    },
    limit: {
      tries: 2
    } // Allow for Cobb's Knob lab key

  }, {
    name: "King",
    after: ["Harem", "Perfume"],
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level5_templateObject24 || (level5_templateObject24 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"])))) ? OverridePriority.Effect : OverridePriority.None,
    completed: () => step("questL05Goblin") === 999,
    do: (0,template_string/* $location */.PG)(level5_templateObject25 || (level5_templateObject25 = level5_taggedTemplateLiteral(["Throne Room"]))),
    combat: new src_combat.CombatStrategy(true).kill((0,template_string/* $monster */.O4)(level5_templateObject26 || (level5_templateObject26 = level5_taggedTemplateLiteral(["Knob Goblin King"])))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level5_templateObject27 || (level5_templateObject27 = level5_taggedTemplateLiteral(["Knob Goblin harem veil, Knob Goblin harem pants"])))
    },
    effects: (0,template_string/* $effects */.lh)(level5_templateObject28 || (level5_templateObject28 = level5_taggedTemplateLiteral(["Knob Goblin Perfume"]))),
    limit: {
      tries: 1
    }
  }, {
    name: "Open Menagerie",
    after: ["King"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level5_templateObject29 || (level5_templateObject29 = level5_taggedTemplateLiteral(["Cobb's Knob Menagerie key"])))),
    do: (0,template_string/* $location */.PG)(level5_templateObject30 || (level5_templateObject30 = level5_taggedTemplateLiteral(["Cobb's Knob Laboratory"]))),
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level5_templateObject31 || (level5_templateObject31 = level5_taggedTemplateLiteral(["Knob Goblin Very Mad Scientist"])))),
    limit: {
      soft: 15
    }
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level6.ts
var level6_templateObject, level6_templateObject2, level6_templateObject3, level6_templateObject4, level6_templateObject5, level6_templateObject6, level6_templateObject7, level6_templateObject8, level6_templateObject9, level6_templateObject10, level6_templateObject11, level6_templateObject12, level6_templateObject13, level6_templateObject14, level6_templateObject15, level6_templateObject16, level6_templateObject17, level6_templateObject18, level6_templateObject19, level6_templateObject20, level6_templateObject21, level6_templateObject22, level6_CombatStrategy, level6_templateObject23, level6_templateObject24, level6_templateObject25, level6_templateObject26, level6_templateObject27;

function level6_toConsumableArray(arr) { return level6_arrayWithoutHoles(arr) || level6_iterableToArray(arr) || level6_unsupportedIterableToArray(arr) || level6_nonIterableSpread(); }

function level6_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level6_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level6_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level6_arrayLikeToArray(o, minLen); }

function level6_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level6_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level6_arrayLikeToArray(arr); }

function level6_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level6_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var FriarQuest = {
  name: "Friar",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(6),
    completed: () => step("questL06Friar") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Heart",
    after: ["Start"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject || (level6_templateObject = level6_taggedTemplateLiteral(["box of birthday candles"])))) || step("questL06Friar") === 999,
    do: (0,template_string/* $location */.PG)(level6_templateObject2 || (level6_templateObject2 = level6_taggedTemplateLiteral(["The Dark Heart of the Woods"]))),
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject3 || (level6_templateObject3 = level6_taggedTemplateLiteral(["latte lovers member's mug"])))) && !(0,property/* get */.U2)("latteUnlocks").includes("wing")) {
        return {
          modifier: "-combat",
          equip: (0,template_string/* $items */.vS)(level6_templateObject4 || (level6_templateObject4 = level6_taggedTemplateLiteral(["latte lovers member's mug"])))
        };
      }

      return {
        modifier: "-combat"
      };
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Neck",
    after: ["Start"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject5 || (level6_templateObject5 = level6_taggedTemplateLiteral(["dodecagram"])))) || step("questL06Friar") === 999,
    do: (0,template_string/* $location */.PG)(level6_templateObject6 || (level6_templateObject6 = level6_taggedTemplateLiteral(["The Dark Neck of the Woods"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      1428: 2
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Elbow",
    after: ["Start"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject7 || (level6_templateObject7 = level6_taggedTemplateLiteral(["eldritch butterknife"])))) || step("questL06Friar") === 999,
    do: (0,template_string/* $location */.PG)(level6_templateObject8 || (level6_templateObject8 = level6_taggedTemplateLiteral(["The Dark Elbow of the Woods"]))),
    outfit: {
      modifier: "-combat"
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Finish",
    after: ["Heart", "Neck", "Elbow", // Finish reprocessing first, since these zones close
    "Reprocess/The Dark Heart of the Woods", "Reprocess/The Dark Neck of the Woods", "Reprocess/The Dark Elbow of the Woods"],
    completed: () => step("questL06Friar") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("friars.php?action=ritual&pwd"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
var OrganQuest = {
  name: "Organ",
  tasks: [{
    name: "Start",
    after: ["Friar/Finish"],
    completed: () => step("questM10Azazel") >= 0,
    do: () => {
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Tutu",
    after: ["Start"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject9 || (level6_templateObject9 = level6_taggedTemplateLiteral(["Azazel's tutu"])))) || step("questM10Azazel") === 999,
    acquire: [{
      item: (0,template_string/* $item */.xr)(level6_templateObject10 || (level6_templateObject10 = level6_taggedTemplateLiteral(["imp air"]))),
      num: 5
    }, {
      item: (0,template_string/* $item */.xr)(level6_templateObject11 || (level6_templateObject11 = level6_taggedTemplateLiteral(["bus pass"]))),
      num: 5
    }],
    do: () => (0,external_kolmafia_.visitUrl)("pandamonium.php?action=moan"),
    limit: {
      tries: 2
    },
    freeaction: true
  }, {
    name: "Arena",
    after: ["Start"],
    completed: () => {
      if (step("questM10Azazel") === 999) return true;
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject12 || (level6_templateObject12 = level6_taggedTemplateLiteral(["Azazel's unicorn"]))))) return true;

      var count = items => items.reduce((sum, item) => sum + (0,external_kolmafia_.itemAmount)(item), 0);

      if (count((0,template_string/* $items */.vS)(level6_templateObject13 || (level6_templateObject13 = level6_taggedTemplateLiteral(["giant marshmallow, beer-scented teddy bear, gin-soaked blotter paper"])))) < 2) return false;
      if (count((0,template_string/* $items */.vS)(level6_templateObject14 || (level6_templateObject14 = level6_taggedTemplateLiteral(["booze-soaked cherry, comfy pillow, sponge cake"])))) < 2) return false;
      return true;
    },
    do: (0,template_string/* $location */.PG)(level6_templateObject15 || (level6_templateObject15 = level6_taggedTemplateLiteral(["Infernal Rackets Backstage"]))),
    limit: {
      soft: 30
    },
    outfit: {
      modifier: "-combat"
    }
  }, {
    name: "Unicorn",
    after: ["Arena"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject16 || (level6_templateObject16 = level6_taggedTemplateLiteral(["Azazel's unicorn"])))) || step("questM10Azazel") === 999,
    do: () => {
      var goals = {
        Bognort: (0,template_string/* $items */.vS)(level6_templateObject17 || (level6_templateObject17 = level6_taggedTemplateLiteral(["giant marshmallow, gin-soaked blotter paper"]))),
        Stinkface: (0,template_string/* $items */.vS)(level6_templateObject18 || (level6_templateObject18 = level6_taggedTemplateLiteral(["beer-scented teddy bear, gin-soaked blotter paper"]))),
        Flargwurm: (0,template_string/* $items */.vS)(level6_templateObject19 || (level6_templateObject19 = level6_taggedTemplateLiteral(["booze-soaked cherry, sponge cake"]))),
        Jim: (0,template_string/* $items */.vS)(level6_templateObject20 || (level6_templateObject20 = level6_taggedTemplateLiteral(["comfy pillow, sponge cake"])))
      };
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven");

      for (var _i = 0, _Object$keys = Object.keys(goals); _i < _Object$keys.length; _i++) {
        var member = _Object$keys[_i];
        if (goals[member].length === 0) throw "Unable to solve Azazel's arena quest";
        var item = (0,lib/* have */.lf)(goals[member][0]) ? (0,external_kolmafia_.toInt)(goals[member][0]) : (0,external_kolmafia_.toInt)(goals[member][1]);
        (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven&bandmember=".concat(member, "&togive=").concat(item, "&preaction=try"));
      }
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Comedy Club",
    after: ["Start"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject21 || (level6_templateObject21 = level6_taggedTemplateLiteral(["observational glasses"])))),
    do: (0,template_string/* $location */.PG)(level6_templateObject22 || (level6_templateObject22 = level6_taggedTemplateLiteral(["The Laugh Floor"]))),
    outfit: {
      modifier: "+combat"
    },
    combat: (level6_CombatStrategy = new src_combat.CombatStrategy()).kill.apply(level6_CombatStrategy, level6_toConsumableArray((0,template_string/* $monsters */.fr)(level6_templateObject23 || (level6_templateObject23 = level6_taggedTemplateLiteral(["Carbuncle Top, Larry of the Field of Signs, Victor the Insult Comic Hellhound"]))))),
    limit: {
      soft: 30
    }
  }, {
    name: "Lollipop",
    after: ["Comedy Club"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level6_templateObject24 || (level6_templateObject24 = level6_taggedTemplateLiteral(["Azazel's lollipop"])))) || step("questM10Azazel") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("pandamonium.php?action=mourn&preaction=observe"),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level6_templateObject25 || (level6_templateObject25 = level6_taggedTemplateLiteral(["observational glasses"])))
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Azazel",
    after: ["Tutu", "Unicorn", "Lollipop"],
    completed: () => step("questM10Azazel") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("pandamonium.php?action=temp"),
    limit: {
      tries: 1
    }
  }, {
    name: "Finish",
    after: ["Azazel"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level6_templateObject26 || (level6_templateObject26 = level6_taggedTemplateLiteral(["Liver of Steel"])))),
    do: () => (0,external_kolmafia_.drink)((0,template_string/* $item */.xr)(level6_templateObject27 || (level6_templateObject27 = level6_taggedTemplateLiteral(["steel margarita"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level7.ts
var level7_templateObject, level7_templateObject2, level7_templateObject3, level7_templateObject4, level7_templateObject5, level7_templateObject6, level7_templateObject7, level7_templateObject8, level7_templateObject9, level7_templateObject10, level7_templateObject11, level7_templateObject12, level7_templateObject13, level7_templateObject14, level7_templateObject15, level7_templateObject16, level7_CombatStrategy$macro, level7_templateObject17, level7_templateObject18, level7_templateObject19, level7_templateObject20, level7_templateObject21, level7_templateObject22, level7_templateObject23, level7_templateObject24, _CombatStrategy$macro2, _CombatStrategy$macro3, level7_templateObject25, level7_templateObject26, level7_templateObject27, level7_templateObject28, level7_templateObject29, level7_templateObject30, level7_templateObject31, level7_templateObject32, level7_templateObject33, level7_templateObject34, level7_templateObject35, level7_templateObject36, level7_templateObject37, level7_CombatStrategy, level7_templateObject38, level7_templateObject39, level7_templateObject40, level7_templateObject41, level7_templateObject42;

function level7_toConsumableArray(arr) { return level7_arrayWithoutHoles(arr) || level7_iterableToArray(arr) || level7_unsupportedIterableToArray(arr) || level7_nonIterableSpread(); }

function level7_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level7_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level7_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level7_arrayLikeToArray(o, minLen); }

function level7_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level7_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level7_arrayLikeToArray(arr); }

function level7_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level7_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









function tuneCape() {
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level7_templateObject || (level7_templateObject = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && ((0,property/* get */.U2)("retroCapeSuperhero") !== "vampire" || (0,property/* get */.U2)("retroCapeWashingInstructions") !== "kill")) {
    (0,external_kolmafia_.cliExecute)("retrocape vampire kill");
  }
}

function tryCape(sword) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level7_templateObject2 || (level7_templateObject2 = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) {
    rest.unshift((0,template_string/* $item */.xr)(level7_templateObject3 || (level7_templateObject3 = level7_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
    rest.unshift(sword);
  }

  return rest;
}

var slay_macro = new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level7_templateObject4 || (level7_templateObject4 = level7_taggedTemplateLiteral(["Slay the Dead"])))).attack().repeat();
var Alcove = [{
  name: "Alcove",
  after: ["Start"],
  prepare: tuneCape,
  ready: state => // Reprocess the grave rober, then wait for the +init skill
  (state.absorb.hasReprocessTargets((0,template_string/* $location */.PG)(level7_templateObject5 || (level7_templateObject5 = level7_taggedTemplateLiteral(["The Defiled Alcove"])))) || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level7_templateObject6 || (level7_templateObject6 = level7_taggedTemplateLiteral(["Overclocking"])))) || !!((0,property/* get */.U2)("twinPeakProgress") & 8)) && (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(level7_templateObject7 || (level7_templateObject7 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => (0,property/* get */.U2)("cyrptAlcoveEvilness") <= 25,
  do: (0,template_string/* $location */.PG)(level7_templateObject8 || (level7_templateObject8 = level7_taggedTemplateLiteral(["The Defiled Alcove"]))),
  outfit: () => {
    return {
      equip: tryCape((0,template_string/* $item */.xr)(level7_templateObject9 || (level7_templateObject9 = level7_taggedTemplateLiteral(["antique machete"]))), (0,template_string/* $item */.xr)(level7_templateObject10 || (level7_templateObject10 = level7_taggedTemplateLiteral(["gravy boat"])))),
      modifier: "init 850max"
    };
  },
  // Modern zmobie does not show up in orb
  orbtargets: () => [],
  choices: {
    153: 4
  },
  combat: new src_combat.CombatStrategy().macro(slay_macro),
  limit: {
    turns: 25
  }
}, {
  name: "Alcove Boss",
  after: ["Start", "Alcove"],
  completed: () => (0,property/* get */.U2)("cyrptAlcoveEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: (0,template_string/* $location */.PG)(level7_templateObject11 || (level7_templateObject11 = level7_taggedTemplateLiteral(["The Defiled Alcove"]))),
  combat: new src_combat.CombatStrategy(true).kill(),
  limit: {
    tries: 1
  }
}];
var Cranny = [{
  name: "Cranny",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(level7_templateObject12 || (level7_templateObject12 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => (0,property/* get */.U2)("cyrptCrannyEvilness") <= 25,
  do: (0,template_string/* $location */.PG)(level7_templateObject13 || (level7_templateObject13 = level7_taggedTemplateLiteral(["The Defiled Cranny"]))),
  outfit: () => {
    return {
      equip: tryCape((0,template_string/* $item */.xr)(level7_templateObject14 || (level7_templateObject14 = level7_taggedTemplateLiteral(["antique machete"]))), (0,template_string/* $item */.xr)(level7_templateObject15 || (level7_templateObject15 = level7_taggedTemplateLiteral(["gravy boat"]))), (0,template_string/* $item */.xr)(level7_templateObject16 || (level7_templateObject16 = level7_taggedTemplateLiteral(["old patched suit-pants"])))),
      modifier: "-combat, ML"
    };
  },
  choices: {
    523: 4
  },
  combat: (level7_CombatStrategy$macro = new src_combat.CombatStrategy().macro(slay_macro)).kill.apply(level7_CombatStrategy$macro, level7_toConsumableArray((0,template_string/* $monsters */.fr)(level7_templateObject17 || (level7_templateObject17 = level7_taggedTemplateLiteral(["swarm of ghuol whelps, big swarm of ghuol whelps, giant swarm of ghuol whelps, huge ghuol"]))))),
  // Do not search for swarm with orb
  orbtargets: () => [],
  limit: {
    turns: 25
  }
}, {
  name: "Cranny Boss",
  after: ["Start", "Cranny"],
  completed: () => (0,property/* get */.U2)("cyrptCrannyEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: (0,template_string/* $location */.PG)(level7_templateObject18 || (level7_templateObject18 = level7_taggedTemplateLiteral(["The Defiled Cranny"]))),
  combat: new src_combat.CombatStrategy(true).killHard(),
  limit: {
    tries: 1
  }
}];
var Niche = [{
  name: "Niche",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(level7_templateObject19 || (level7_templateObject19 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => (0,property/* get */.U2)("cyrptNicheEvilness") <= 25,
  do: (0,template_string/* $location */.PG)(level7_templateObject20 || (level7_templateObject20 = level7_taggedTemplateLiteral(["The Defiled Niche"]))),
  choices: {
    157: 4
  },
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level7_templateObject21 || (level7_templateObject21 = level7_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 20 && !(0,property/* get */.U2)("fireExtinguisherCyrptUsed")) return {
      equip: (0,template_string/* $items */.vS)(level7_templateObject22 || (level7_templateObject22 = level7_taggedTemplateLiteral(["gravy boat, industrial fire extinguisher"])))
    };else return {
      equip: tryCape((0,template_string/* $item */.xr)(level7_templateObject23 || (level7_templateObject23 = level7_taggedTemplateLiteral(["antique machete"]))), (0,template_string/* $item */.xr)(level7_templateObject24 || (level7_templateObject24 = level7_taggedTemplateLiteral(["gravy boat"]))))
    };
  },
  combat: (_CombatStrategy$macro2 = (_CombatStrategy$macro3 = new src_combat.CombatStrategy().macro(slay_macro, (0,template_string/* $monster */.O4)(level7_templateObject25 || (level7_templateObject25 = level7_taggedTemplateLiteral(["dirty old lihc"])))).macro( // Don't use the fire extinguisher if we want to absorb the lihc
  state => new dist_combat/* Macro */.LE().externalIf(!state.absorb.isTarget((0,template_string/* $monster */.O4)(level7_templateObject26 || (level7_templateObject26 = level7_taggedTemplateLiteral(["basic lihc"])))), new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level7_templateObject27 || (level7_templateObject27 = level7_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))))), (0,template_string/* $monster */.O4)(level7_templateObject28 || (level7_templateObject28 = level7_taggedTemplateLiteral(["basic lihc"]))))).macro.apply(_CombatStrategy$macro3, [new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level7_templateObject29 || (level7_templateObject29 = level7_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"])))).step(slay_macro)].concat(level7_toConsumableArray((0,template_string/* $monsters */.fr)(level7_templateObject30 || (level7_templateObject30 = level7_taggedTemplateLiteral(["senile lihc, slick lihc"]))))))).banish.apply(_CombatStrategy$macro2, level7_toConsumableArray((0,template_string/* $monsters */.fr)(level7_templateObject31 || (level7_templateObject31 = level7_taggedTemplateLiteral(["basic lihc, senile lihc, slick lihc"]))))),
  orbtargets: () => [(0,template_string/* $monster */.O4)(level7_templateObject32 || (level7_templateObject32 = level7_taggedTemplateLiteral(["dirty old lihc"])))],
  limit: {
    turns: 25
  }
}, {
  name: "Niche Boss",
  after: ["Start", "Niche"],
  completed: () => (0,property/* get */.U2)("cyrptNicheEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: (0,template_string/* $location */.PG)(level7_templateObject33 || (level7_templateObject33 = level7_taggedTemplateLiteral(["The Defiled Niche"]))),
  combat: new src_combat.CombatStrategy(true).kill(),
  limit: {
    tries: 1
  }
}];
var Nook = [{
  name: "Nook",
  after: ["Start"],
  prepare: tuneCape,
  ready: () => (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(level7_templateObject34 || (level7_templateObject34 = level7_taggedTemplateLiteral(["Muscle"])))) >= 62,
  completed: () => (0,property/* get */.U2)("cyrptNookEvilness") <= 25,
  do: (0,template_string/* $location */.PG)(level7_templateObject35 || (level7_templateObject35 = level7_taggedTemplateLiteral(["The Defiled Nook"]))),
  post: () => {
    // Use evil eyes via chat until mafia tracking is fixed
    if ((0,property/* get */.U2)("cyrptNookEvilness") > 25) (0,external_kolmafia_.cliExecute)("/use * evil eye"); // while (have($item`evil eye`) && get("cyrptNookEvilness") > 25) cliExecute("use * evil eye");
  },
  outfit: () => {
    return {
      equip: tryCape((0,template_string/* $item */.xr)(level7_templateObject36 || (level7_templateObject36 = level7_taggedTemplateLiteral(["antique machete"]))), (0,template_string/* $item */.xr)(level7_templateObject37 || (level7_templateObject37 = level7_taggedTemplateLiteral(["gravy boat"])))),
      modifier: "item 500max"
    };
  },
  choices: {
    155: 5,
    1429: 1
  },
  combat: (level7_CombatStrategy = new src_combat.CombatStrategy()).macro.apply(level7_CombatStrategy, [slay_macro].concat(level7_toConsumableArray((0,template_string/* $monsters */.fr)(level7_templateObject38 || (level7_templateObject38 = level7_taggedTemplateLiteral(["spiny skelelton, toothy sklelton"])))))).banish((0,template_string/* $monster */.O4)(level7_templateObject39 || (level7_templateObject39 = level7_taggedTemplateLiteral(["party skelteon"])))),
  limit: {
    soft: 25
  }
}, {
  name: "Nook Eye",
  // In case we get eyes from outside sources (Nostalgia)
  after: ["Start"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level7_templateObject40 || (level7_templateObject40 = level7_taggedTemplateLiteral(["evil eye"])))),
  completed: () => (0,property/* get */.U2)("cyrptNookEvilness") <= 25,
  do: () => {
    (0,external_kolmafia_.cliExecute)("use * evil eye");
  },
  freeaction: true,
  limit: {
    tries: 9
  }
}, {
  name: "Nook Boss",
  after: ["Start", "Nook", "Nook Eye"],
  completed: () => (0,property/* get */.U2)("cyrptNookEvilness") === 0 && step("questL07Cyrptic") !== -1,
  do: (0,template_string/* $location */.PG)(level7_templateObject41 || (level7_templateObject41 = level7_taggedTemplateLiteral(["The Defiled Nook"]))),
  combat: new src_combat.CombatStrategy(true).killItem(),
  limit: {
    tries: 1
  }
}];
var CryptQuest = {
  name: "Crypt",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(7),
    completed: () => step("questL07Cyrptic") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }].concat(Alcove, Cranny, Niche, Nook, [{
    name: "Bonerdagon",
    after: ["Start", "Alcove Boss", "Cranny Boss", "Niche Boss", "Nook Boss"],
    completed: () => step("questL07Cyrptic") >= 1,
    do: (0,template_string/* $location */.PG)(level7_templateObject42 || (level7_templateObject42 = level7_taggedTemplateLiteral(["Haert of the Cyrpt"]))),
    choices: {
      527: 1
    },
    combat: new src_combat.CombatStrategy(true).kill(),
    limit: {
      tries: 1
    }
  }, {
    name: "Finish",
    after: ["Start", "Bonerdagon"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL07Cyrptic") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
// EXTERNAL MODULE: ./node_modules/libram/dist/utils.js
var utils = __webpack_require__(8588);
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/CombatLoversLocket.js
var CombatLoversLocket_templateObject;

function CombatLoversLocket_slicedToArray(arr, i) { return CombatLoversLocket_arrayWithHoles(arr) || CombatLoversLocket_iterableToArrayLimit(arr, i) || CombatLoversLocket_unsupportedIterableToArray(arr, i) || CombatLoversLocket_nonIterableRest(); }

function CombatLoversLocket_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CombatLoversLocket_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CombatLoversLocket_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CombatLoversLocket_arrayLikeToArray(o, minLen); }

function CombatLoversLocket_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CombatLoversLocket_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CombatLoversLocket_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CombatLoversLocket_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = (0,template_string/* $item */.xr)(CombatLoversLocket_templateObject || (CombatLoversLocket_templateObject = CombatLoversLocket_taggedTemplateLiteral(["Combat Lover's Locket"])));
function have() {
  return (0,lib/* have */.lf)(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries(getLocketMonsters()).filter(_ref => {
    var _ref2 = CombatLoversLocket_slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = CombatLoversLocket_slicedToArray(_ref3, 1),
        name = _ref4[0];

    return toMonster(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries((0,external_kolmafia_.getLocketMonsters)()).map(_ref5 => {
    var _ref6 = CombatLoversLocket_slicedToArray(_ref5, 1),
        name = _ref6[0];

    return (0,external_kolmafia_.toMonster)(name);
  });
}

function parseLocketProperty() {
  return (0,property/* get */.U2)("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return have() ? (0,utils/* clamp */.uZ)(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => (0,external_kolmafia_.toMonster)(id));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!have() || reminiscesLeft() === 0 || !(0,external_kolmafia_.getLocketMonsters)()[monster.name]) {
    return false;
  }

  (0,external_kolmafia_.cliExecute)("reminisce ".concat(monster));
  (0,external_kolmafia_.runCombat)();
  return monstersReminisced().includes(monster);
}
/**
 * This function efficiently evaluates all of an adventurer's possibly reminiscable monsters, placing them through a filtering criteria and evaluating them based on a passed function.
 * @param criteria A filtering function for delineating which monsters are "fair game" for the search, such as "is this monster free".
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A singular monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!have() || reminiscesLeft() === 0) return null;
  var options = availableLocketMonsters().filter(criteria);
  if (!options.length) return null;
  return options.reduce((a, b) => value(a) > value(b) ? a : b);
}
;// CONCATENATED MODULE: ./src/tasks/level13.ts
var level13_templateObject, level13_templateObject2, level13_templateObject3, level13_templateObject4, level13_templateObject5, level13_templateObject6, level13_templateObject7, level13_templateObject8, level13_templateObject9, level13_templateObject10, level13_templateObject11, level13_templateObject12, level13_templateObject13, level13_templateObject14, level13_templateObject15, level13_templateObject16, level13_templateObject17, level13_templateObject18, level13_templateObject19, level13_templateObject20, level13_templateObject21, level13_templateObject22, level13_templateObject23, level13_templateObject24, level13_templateObject25, level13_templateObject26, level13_templateObject27, level13_templateObject28, level13_templateObject29, level13_templateObject30, level13_templateObject31, level13_templateObject32, level13_templateObject33, level13_templateObject34, level13_templateObject35, level13_templateObject36, level13_templateObject37, level13_templateObject38, level13_templateObject39, level13_templateObject40, level13_templateObject41, level13_templateObject42, level13_templateObject43, level13_templateObject44, level13_templateObject45, level13_templateObject46, level13_templateObject47, level13_templateObject48, level13_templateObject49, level13_templateObject50, level13_templateObject51, level13_templateObject52, level13_templateObject53, level13_templateObject54, level13_templateObject55, level13_templateObject56, level13_templateObject57, level13_templateObject58, level13_templateObject59, level13_templateObject60, level13_templateObject61, level13_templateObject62, level13_templateObject63, level13_templateObject64, level13_templateObject65, level13_templateObject66, level13_templateObject67, level13_templateObject68, level13_templateObject69, level13_templateObject70, level13_templateObject71, level13_templateObject72, level13_templateObject73, level13_templateObject74, level13_templateObject75, level13_templateObject76, level13_templateObject77, level13_templateObject78, level13_templateObject79, level13_templateObject80, level13_templateObject81;

function level13_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Challenges = [{
  name: "Speed Challenge",
  after: ["Start", "Absorb/Overclocking"],
  ready: () => towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants1") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(1);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "init",
    familiar: (0,template_string/* $familiar */.HP)(level13_templateObject || (level13_templateObject = level13_taggedTemplateLiteral(["Oily Woim"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Moxie Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge1") === (0,template_string/* $stat */.Ri)(level13_templateObject2 || (level13_templateObject2 = level13_taggedTemplateLiteral(["Moxie"]))) && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(2);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "moxie"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Muscle Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge1") === (0,template_string/* $stat */.Ri)(level13_templateObject3 || (level13_templateObject3 = level13_taggedTemplateLiteral(["Muscle"]))) && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(2);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "muscle"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Mysticality Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge1") === (0,template_string/* $stat */.Ri)(level13_templateObject4 || (level13_templateObject4 = level13_taggedTemplateLiteral(["Mysticality"]))) && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants2") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(2);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "mysticality"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Hot Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge2") === "hot" && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(3);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "hot dmg, hot spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Cold Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge2") === "cold" && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(3);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "cold dmg, cold spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Spooky Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge2") === "spooky" && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(3);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "spooky dmg, spooky spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Stench Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge2") === "stench" && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(3);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "stench dmg, stench spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Sleaze Challenge",
  after: ["Start"],
  ready: () => (0,property/* get */.U2)("nsChallenge2") === "sleaze" && towerReady(),
  completed: () => (0,property/* get */.U2)("nsContestants3") > -1,
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
    (0,external_kolmafia_.runChoice)(3);
    (0,external_kolmafia_.runChoice)(6);
  },
  outfit: {
    modifier: "sleaze dmg, sleaze spell dmg"
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var ChallengeBosses = [{
  name: "Speed Boss",
  after: ["Speed Challenge"],
  completed: () => (0,property/* get */.U2)("nsContestants1") === 0,
  do: (0,template_string/* $location */.PG)(level13_templateObject5 || (level13_templateObject5 = level13_taggedTemplateLiteral(["Fastest Adventurer Contest"]))),
  combat: new src_combat.CombatStrategy(true).killHard(),
  limit: {
    tries: 5
  }
}, {
  name: "Stat Boss",
  after: ["Muscle Challenge", "Moxie Challenge", "Mysticality Challenge"],
  completed: () => (0,property/* get */.U2)("nsContestants2") === 0,
  do: (0,template_string/* $location */.PG)(level13_templateObject6 || (level13_templateObject6 = level13_taggedTemplateLiteral(["A Crowd of (Stat) Adventurers"]))),
  combat: new src_combat.CombatStrategy(true).killHard(),
  limit: {
    tries: 1
  }
}, {
  name: "Element Boss",
  after: ["Hot Challenge", "Cold Challenge", "Spooky Challenge", "Stench Challenge", "Sleaze Challenge"],
  completed: () => (0,property/* get */.U2)("nsContestants3") === 0,
  do: (0,template_string/* $location */.PG)(level13_templateObject7 || (level13_templateObject7 = level13_taggedTemplateLiteral(["A Crowd of (Element) Adventurers"]))),
  combat: new src_combat.CombatStrategy(true).killHard(),
  limit: {
    tries: 10
  }
}];
var Door = [{
  name: "Boris Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject8 || (level13_templateObject8 = level13_taggedTemplateLiteral(["Boris's key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Boris"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock1"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Jarlsberg Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject9 || (level13_templateObject9 = level13_taggedTemplateLiteral(["Jarlsberg's key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Jarlsberg"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock2"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Sneaky Pete Lock",
  after: ["Maze", "Keys/All Heroes"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject10 || (level13_templateObject10 = level13_taggedTemplateLiteral(["Sneaky Pete's key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Sneaky Pete"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock3"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Star Lock",
  after: ["Maze", "Keys/Star Key"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject11 || (level13_templateObject11 = level13_taggedTemplateLiteral(["Richard's star key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Richard's star key"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock4"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Digital Lock",
  after: ["Maze", "Keys/Digital Key"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject12 || (level13_templateObject12 = level13_taggedTemplateLiteral(["digital key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("digital key"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock5"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Skeleton Lock",
  after: ["Maze", "Keys/Skeleton Key"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level13_templateObject13 || (level13_templateObject13 = level13_taggedTemplateLiteral(["skeleton key"])))
  }],
  completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("skeleton key"),
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_lock6"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Door",
  after: ["Boris Lock", "Jarlsberg Lock", "Sneaky Pete Lock", "Star Lock", "Digital Lock", "Skeleton Lock"],
  completed: () => step("questL13Final") > 5,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower_door&action=ns_doorknob"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var wand = [{
  name: "Wand W",
  after: ["Wall of Bones"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject14 || (level13_templateObject14 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject15 || (level13_templateObject15 = level13_taggedTemplateLiteral(["ruby W"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject16 || (level13_templateObject16 = level13_taggedTemplateLiteral(["WA"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject17 || (level13_templateObject17 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: (0,template_string/* $location */.PG)(level13_templateObject18 || (level13_templateObject18 = level13_taggedTemplateLiteral(["Pandamonium Slums"]))),
  outfit: {
    modifier: "item"
  },
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level13_templateObject19 || (level13_templateObject19 = level13_taggedTemplateLiteral(["W imp"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand A",
  after: ["Wall of Bones"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject20 || (level13_templateObject20 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject21 || (level13_templateObject21 = level13_taggedTemplateLiteral(["metallic A"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject22 || (level13_templateObject22 = level13_taggedTemplateLiteral(["WA"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject23 || (level13_templateObject23 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: (0,template_string/* $location */.PG)(level13_templateObject24 || (level13_templateObject24 = level13_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
  outfit: {
    modifier: "item"
  },
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level13_templateObject25 || (level13_templateObject25 = level13_taggedTemplateLiteral(["MagiMechTech MechaMech"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand N",
  after: ["Wall of Bones"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject26 || (level13_templateObject26 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject27 || (level13_templateObject27 = level13_taggedTemplateLiteral(["lowercase N"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject28 || (level13_templateObject28 = level13_taggedTemplateLiteral(["ND"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject29 || (level13_templateObject29 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: (0,template_string/* $location */.PG)(level13_templateObject30 || (level13_templateObject30 = level13_taggedTemplateLiteral(["The Valley of Rof L'm Fao"]))),
  outfit: {
    modifier: "item"
  },
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level13_templateObject31 || (level13_templateObject31 = level13_taggedTemplateLiteral(["XXX pr0n"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand D",
  after: ["Wall of Bones"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject32 || (level13_templateObject32 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject33 || (level13_templateObject33 = level13_taggedTemplateLiteral(["heavy D"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject34 || (level13_templateObject34 = level13_taggedTemplateLiteral(["ND"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject35 || (level13_templateObject35 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || towerSkip(),
  do: (0,template_string/* $location */.PG)(level13_templateObject36 || (level13_templateObject36 = level13_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  outfit: {
    modifier: "item"
  },
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level13_templateObject37 || (level13_templateObject37 = level13_taggedTemplateLiteral(["Alphabet Giant"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Wand Parts",
  after: ["Wall of Bones"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject38 || (level13_templateObject38 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject39 || (level13_templateObject39 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))) || ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject40 || (level13_templateObject40 = level13_taggedTemplateLiteral(["WA"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject41 || (level13_templateObject41 = level13_taggedTemplateLiteral(["ruby W"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject42 || (level13_templateObject42 = level13_taggedTemplateLiteral(["metallic A"]))))) && ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject43 || (level13_templateObject43 = level13_taggedTemplateLiteral(["ND"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject44 || (level13_templateObject44 = level13_taggedTemplateLiteral(["lowercase N"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject45 || (level13_templateObject45 = level13_taggedTemplateLiteral(["heavy D"]))))) || towerSkip(),
  prepare: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level13_templateObject46 || (level13_templateObject46 = level13_taggedTemplateLiteral(["11-leaf clover"])))),
  do: (0,template_string/* $location */.PG)(level13_templateObject47 || (level13_templateObject47 = level13_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  limit: {
    tries: 1
  }
}, {
  name: "Wand",
  ready: () => towerReady(),
  after: ["Wand W", "Wand A", "Wand N", "Wand D", "Wand Parts"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject48 || (level13_templateObject48 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))),
  do: () => {
    (0,external_kolmafia_.cliExecute)("make Wand of Nagamar");
  },
  limit: {
    tries: 1
  }
}];
var TowerQuest = {
  name: "Tower",
  tasks: [{
    name: "Start",
    after: ["Mosquito/Finish", "Tavern/Finish", "Bat/Finish", "Knob/King", "Friar/Finish", "Crypt/Finish", "McLargeHuge/Finish", "Orc Chasm/Finish", "Giant/Finish", "Macguffin/Finish", "War/Boss Hippie"],
    ready: () => atLevel(13),
    completed: () => step("questL13Final") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Challenges, ChallengeBosses, [{
    name: "Coronation",
    after: ["Speed Boss", "Stat Boss", "Element Boss"],
    completed: () => step("questL13Final") > 2,
    do: () => {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
      (0,external_kolmafia_.runChoice)(-1);
    },
    choices: {
      1003: 4
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Frank",
    after: ["Coronation"],
    completed: () => step("questL13Final") > 3,
    do: () => {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_02_coronation");
      (0,external_kolmafia_.runChoice)(-1);
    },
    choices: {
      1020: 1,
      1021: 1,
      1022: 1
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Maze",
    after: ["Frank"],
    completed: () => step("questL13Final") > 4,
    prepare: () => {
      fillHp();
    },
    do: (0,template_string/* $location */.PG)(level13_templateObject49 || (level13_templateObject49 = level13_taggedTemplateLiteral(["The Hedge Maze"]))),
    choices: {
      1004: 1,
      1005: 2,
      1008: 2,
      1011: 2,
      1013: 1,
      1022: 1
    },
    outfit: {
      modifier: "hot res, cold res, stench res, spooky res, sleaze res",
      familiar: (0,template_string/* $familiar */.HP)(level13_templateObject50 || (level13_templateObject50 = level13_taggedTemplateLiteral(["Exotic Parrot"])))
    },
    effects: (0,template_string/* $effects */.lh)(level13_templateObject51 || (level13_templateObject51 = level13_taggedTemplateLiteral(["Red Door Syndrome"]))),
    limit: {
      tries: 1
    }
  }], Door, [{
    name: "Beehive",
    after: ["Macguffin/Forest", "Reprocess/The Black Forest"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject52 || (level13_templateObject52 = level13_taggedTemplateLiteral(["beehive"])))) || (0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(level13_templateObject53 || (level13_templateObject53 = level13_taggedTemplateLiteral(["Shorter-Order Cook"])))) || step("questL13Final") > 6,
    do: (0,template_string/* $location */.PG)(level13_templateObject54 || (level13_templateObject54 = level13_taggedTemplateLiteral(["The Black Forest"]))),
    choices: {
      923: 1,
      924: 3,
      1018: 1,
      1019: 1
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 5
    }
  }, {
    name: "Wall of Skin",
    after: ["Door", "Beehive"],
    prepare: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject55 || (level13_templateObject55 = level13_taggedTemplateLiteral(["handful of hand chalk"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level13_templateObject56 || (level13_templateObject56 = level13_taggedTemplateLiteral(["Chalky Hand"]))));
      fillHp();
    },
    completed: () => step("questL13Final") > 6,
    do: (0,template_string/* $location */.PG)(level13_templateObject57 || (level13_templateObject57 = level13_taggedTemplateLiteral(["Tower Level 1"]))),
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(level13_templateObject58 || (level13_templateObject58 = level13_taggedTemplateLiteral(["Shorter-Order Cook"]))),
      equip: (0,template_string/* $items */.vS)(level13_templateObject59 || (level13_templateObject59 = level13_taggedTemplateLiteral(["hot plate"])))
    },
    combat: new src_combat.CombatStrategy(true).macro(new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(level13_templateObject60 || (level13_templateObject60 = level13_taggedTemplateLiteral(["beehive"])))).skill((0,template_string/* $skill */.tm)(level13_templateObject61 || (level13_templateObject61 = level13_taggedTemplateLiteral(["Grey Noise"])))).repeat()),
    limit: {
      tries: 1
    }
  }, {
    name: "Wall of Meat",
    after: ["Wall of Skin"],
    prepare: () => {
      fillHp();
    },
    completed: () => step("questL13Final") > 7,
    do: (0,template_string/* $location */.PG)(level13_templateObject62 || (level13_templateObject62 = level13_taggedTemplateLiteral(["Tower Level 2"]))),
    outfit: {
      modifier: "meat",
      equip: (0,template_string/* $items */.vS)(level13_templateObject63 || (level13_templateObject63 = level13_taggedTemplateLiteral(["amulet coin"])))
    },
    combat: new src_combat.CombatStrategy(true).killHard(),
    limit: {
      tries: 2
    }
  }, {
    name: "Wall of Bones",
    after: ["Wall of Meat", "Giant/Ground Knife"],
    completed: () => step("questL13Final") > 8,
    do: (0,template_string/* $location */.PG)(level13_templateObject64 || (level13_templateObject64 = level13_taggedTemplateLiteral(["Tower Level 3"]))),
    combat: new src_combat.CombatStrategy(true).macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level13_templateObject65 || (level13_templateObject65 = level13_taggedTemplateLiteral(["electric boning knife"]))))),
    limit: {
      tries: 1
    }
  }], wand, [{
    name: "Mirror",
    after: ["Wall of Bones", "Wand"],
    acquire: [{
      item: (0,template_string/* $item */.xr)(level13_templateObject66 || (level13_templateObject66 = level13_taggedTemplateLiteral(["Wand of Nagamar"])))
    }],
    completed: () => step("questL13Final") > 9,
    do: (0,template_string/* $location */.PG)(level13_templateObject67 || (level13_templateObject67 = level13_taggedTemplateLiteral(["Tower Level 4"]))),
    choices: {
      1015: 2
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Shadow",
    after: ["Mirror", "Absorb/Twin Peak"],
    prepare: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject68 || (level13_templateObject68 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) && ((0,property/* get */.U2)("retroCapeSuperhero") !== "heck" || (0,property/* get */.U2)("retroCapeWashingInstructions") !== "hold")) {
        (0,external_kolmafia_.cliExecute)("retrocape heck hold");
      }

      fillHp();
    },
    completed: () => step("questL13Final") > 10,
    do: (0,template_string/* $location */.PG)(level13_templateObject69 || (level13_templateObject69 = level13_taggedTemplateLiteral(["Tower Level 5"]))),
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject70 || (level13_templateObject70 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) return {
        equip: (0,template_string/* $items */.vS)(level13_templateObject71 || (level13_templateObject71 = level13_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))
      };else if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject72 || (level13_templateObject72 = level13_taggedTemplateLiteral(["attorney's badge"]))))) return {
        modifier: "HP",
        equip: (0,template_string/* $items */.vS)(level13_templateObject73 || (level13_templateObject73 = level13_taggedTemplateLiteral(["attorney's badge"]))),
        avoid: (0,template_string/* $items */.vS)(level13_templateObject74 || (level13_templateObject74 = level13_taggedTemplateLiteral(["extra-wide head candle"])))
      };else return {
        modifier: "HP",
        avoid: (0,template_string/* $items */.vS)(level13_templateObject75 || (level13_templateObject75 = level13_taggedTemplateLiteral(["extra-wide head candle"])))
      };
    },
    combat: new src_combat.CombatStrategy(true).macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level13_templateObject76 || (level13_templateObject76 = level13_taggedTemplateLiteral(["gauze garter"])))).repeat()),
    limit: {
      tries: 1
    }
  }, {
    name: "Naughty Sorceress",
    after: ["Shadow"],
    completed: () => step("questL13Final") > 11,
    do: (0,template_string/* $location */.PG)(level13_templateObject77 || (level13_templateObject77 = level13_taggedTemplateLiteral(["The Naughty Sorceress' Chamber"]))),
    outfit: {
      modifier: "muscle"
    },
    combat: new src_combat.CombatStrategy(true).kill(),
    limit: {
      tries: 1
    }
  }])
};
function fillHp() {
  if ((0,external_kolmafia_.myHp)() < (0,external_kolmafia_.myMaxhp)()) {
    if (!(0,external_kolmafia_.restoreHp)((0,external_kolmafia_.myMaxhp)())) {
      // Backup healing plan in a pinch
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level13_templateObject78 || (level13_templateObject78 = level13_taggedTemplateLiteral(["scroll of drastic healing"]))))) {
        (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level13_templateObject79 || (level13_templateObject79 = level13_taggedTemplateLiteral(["scroll of drastic healing"]))));
      } else if ((0,property/* get */.U2)("_hotTubSoaks") < 5) {
        (0,external_kolmafia_.visitUrl)("clan_viplounge.php?action=hottub");
      }

      var tries = 0;

      while ((0,external_kolmafia_.myHp)() < (0,external_kolmafia_.myMaxhp)() && (0,external_kolmafia_.myMeat)() >= 1000 && tries < 30) {
        tries++;
        (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(level13_templateObject80 || (level13_templateObject80 = level13_taggedTemplateLiteral(["Doc Galaktik's Homeopathic Elixir"]))));
        (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level13_templateObject81 || (level13_templateObject81 = level13_taggedTemplateLiteral(["Doc Galaktik's Homeopathic Elixir"]))));
      }
    }
  }
}
/* Skip this until ronin if the tower is delayed. */

function towerReady() {
  return !args.delaytower || (0,external_kolmafia_.myTurncount)() >= 1000;
}
/* Skip this entirely, either in-ronin or when delaying until ronin. */

function towerSkip() {
  return args.delaytower || (0,external_kolmafia_.myTurncount)() >= 1000;
}
;// CONCATENATED MODULE: ./src/tasks/level8.ts
var level8_templateObject, level8_templateObject2, _CombatStrategy$killI, level8_templateObject3, level8_templateObject4, level8_templateObject5, level8_templateObject6, level8_templateObject7, level8_templateObject8, level8_templateObject9, level8_templateObject10, level8_templateObject11, level8_templateObject12, level8_templateObject13, level8_templateObject14, level8_templateObject15, level8_templateObject16, level8_templateObject17, level8_templateObject18, level8_templateObject19, level8_templateObject20;

function level8_toConsumableArray(arr) { return level8_arrayWithoutHoles(arr) || level8_iterableToArray(arr) || level8_unsupportedIterableToArray(arr) || level8_nonIterableSpread(); }

function level8_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level8_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level8_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level8_arrayLikeToArray(o, minLen); }

function level8_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level8_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level8_arrayLikeToArray(arr); }

function level8_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level8_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var McLargeHugeQuest = {
  name: "McLargeHuge",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(8),
    completed: () => step("questL08Trapper") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Trapper Request",
    after: ["Start"],
    completed: () => step("questL08Trapper") >= 1,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    priority: () => OverridePriority.Free,
    freeaction: true
  }, {
    name: "Goatlet",
    after: ["Trapper Request"],
    completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level8_templateObject || (level8_templateObject = level8_taggedTemplateLiteral(["goat cheese"])))) >= 3 || step("questL08Trapper") >= 2,
    do: (0,template_string/* $location */.PG)(level8_templateObject2 || (level8_templateObject2 = level8_taggedTemplateLiteral(["The Goatlet"]))),
    outfit: {
      modifier: "item"
    },
    combat: (_CombatStrategy$killI = new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level8_templateObject3 || (level8_templateObject3 = level8_taggedTemplateLiteral(["dairy goat"]))))).banish.apply(_CombatStrategy$killI, level8_toConsumableArray((0,template_string/* $monsters */.fr)(level8_templateObject4 || (level8_templateObject4 = level8_taggedTemplateLiteral(["drunk goat, sabre-toothed goat"]))))),
    limit: {
      soft: 15
    }
  }, {
    name: "Ore Mountain",
    after: [],
    completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level8_templateObject5 || (level8_templateObject5 = level8_taggedTemplateLiteral(["asbestos ore"])))) >= 3 || step("questL08Trapper") >= 2 || monstersReminisced().includes((0,template_string/* $monster */.O4)(level8_templateObject6 || (level8_templateObject6 = level8_taggedTemplateLiteral(["mountain man"])))) || !have(),
    ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level8_templateObject7 || (level8_templateObject7 = level8_taggedTemplateLiteral(["Everything Looks Yellow"])))) && ((0,external_kolmafia_.myMeat)() >= 250 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level8_templateObject8 || (level8_templateObject8 = level8_taggedTemplateLiteral(["yellow rocket"]))))),
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level8_templateObject9 || (level8_templateObject9 = level8_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.None : OverridePriority.YR,
    acquire: [{
      item: (0,template_string/* $item */.xr)(level8_templateObject10 || (level8_templateObject10 = level8_taggedTemplateLiteral(["yellow rocket"])))
    }],
    prepare: () => {
      (0,external_kolmafia_.cliExecute)("retrocape heck hold");
    },
    do: () => {
      reminisce((0,template_string/* $monster */.O4)(level8_templateObject11 || (level8_templateObject11 = level8_taggedTemplateLiteral(["mountain man"]))));
    },
    outfit: {
      equip: (0,template_string/* $items */.vS)(level8_templateObject12 || (level8_templateObject12 = level8_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level8_templateObject13 || (level8_templateObject13 = level8_taggedTemplateLiteral(["yellow rocket"]))))),
    limit: {
      tries: 1
    }
  }, {
    name: "Trapper Return",
    after: ["Goatlet", "Pull/Ore", "Ore Mountain"],
    completed: () => step("questL08Trapper") >= 2,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Ninja",
    after: ["Trapper Return", "Misc/Summon Lion", "Palindome/Cold Snake"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level8_templateObject14 || (level8_templateObject14 = level8_taggedTemplateLiteral(["ninja rope"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level8_templateObject15 || (level8_templateObject15 = level8_taggedTemplateLiteral(["ninja carabiner"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level8_templateObject16 || (level8_templateObject16 = level8_taggedTemplateLiteral(["ninja crampons"])))) || step("questL08Trapper") >= 3,
    prepare: () => {
      fillHp();
    },
    do: (0,template_string/* $location */.PG)(level8_templateObject17 || (level8_templateObject17 = level8_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
    outfit: {
      modifier: "50 combat, init"
    },
    limit: {
      soft: 20
    },
    combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level8_templateObject18 || (level8_templateObject18 = level8_taggedTemplateLiteral(["Frozen Solid Snake"]))), (0,template_string/* $monster */.O4)(level8_templateObject19 || (level8_templateObject19 = level8_taggedTemplateLiteral(["ninja snowman assassin"])))),
    orbtargets: () => [] // no assassins in orbs

  }, {
    name: "Climb",
    after: ["Trapper Return", "Ninja"],
    completed: () => step("questL08Trapper") >= 3,
    do: () => {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=mclargehuge&action=cloudypeak");
    },
    outfit: {
      modifier: "cold res 5min"
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Peak",
    after: ["Climb"],
    completed: () => step("questL08Trapper") >= 5,
    do: (0,template_string/* $location */.PG)(level8_templateObject20 || (level8_templateObject20 = level8_taggedTemplateLiteral(["Mist-Shrouded Peak"]))),
    outfit: {
      modifier: "cold res 5min"
    },
    combat: new src_combat.CombatStrategy(true).kill(),
    limit: {
      tries: 4
    }
  }, {
    name: "Finish",
    after: ["Peak"],
    completed: () => step("questL08Trapper") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin"),
    limit: {
      tries: 1
    },
    freeaction: true
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level9.ts
var level9_templateObject, level9_templateObject2, level9_templateObject3, level9_templateObject4, level9_templateObject5, level9_templateObject6, level9_templateObject7, level9_templateObject8, level9_templateObject9, level9_templateObject10, level9_templateObject11, level9_templateObject12, level9_templateObject13, level9_templateObject14, level9_templateObject15, level9_templateObject16, level9_templateObject17, level9_templateObject18, level9_templateObject19, level9_templateObject20, level9_templateObject21, level9_templateObject22, level9_templateObject23, level9_templateObject24, level9_templateObject25, level9_CombatStrategy, level9_templateObject26, level9_templateObject27, level9_templateObject28, level9_templateObject29, level9_templateObject30, level9_templateObject31, _CombatStrategy2, level9_templateObject32, level9_templateObject33, level9_templateObject34, level9_templateObject35, level9_templateObject36, _CombatStrategy3, level9_templateObject37, level9_templateObject38, level9_templateObject39, level9_templateObject40, level9_templateObject41, level9_templateObject42, level9_templateObject43, _CombatStrategy4, level9_templateObject44, level9_templateObject45, level9_templateObject46, level9_templateObject47, level9_templateObject48, level9_templateObject49, level9_templateObject50, level9_templateObject51, level9_templateObject52, level9_templateObject53, level9_templateObject54, level9_templateObject55, level9_templateObject56, level9_templateObject57, level9_templateObject58, level9_templateObject59, level9_templateObject60, level9_templateObject61, level9_templateObject62, level9_templateObject63, level9_templateObject64, level9_templateObject65, level9_templateObject66, level9_templateObject67, level9_templateObject68, level9_templateObject69, level9_templateObject70;

function level9_toConsumableArray(arr) { return level9_arrayWithoutHoles(arr) || level9_iterableToArray(arr) || level9_unsupportedIterableToArray(arr) || level9_nonIterableSpread(); }

function level9_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level9_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level9_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level9_arrayLikeToArray(o, minLen); }

function level9_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level9_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level9_arrayLikeToArray(arr); }

function level9_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level9_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var ABoo = [{
  name: "ABoo Start",
  after: ["Start Peaks"],
  completed: () => (0,template_string/* $location */.PG)(level9_templateObject || (level9_templateObject = level9_taggedTemplateLiteral(["A-Boo Peak"]))).noncombatQueue.includes("Faction Traction = Inaction") || (0,property/* get */.U2)("booPeakProgress") < 50,
  do: (0,template_string/* $location */.PG)(level9_templateObject2 || (level9_templateObject2 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  limit: {
    tries: 1
  }
}, {
  name: "ABoo Clues",
  after: ["ABoo Start"],
  completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level9_templateObject3 || (level9_templateObject3 = level9_taggedTemplateLiteral(["A-Boo clue"])))) * 30 >= (0,property/* get */.U2)("booPeakProgress"),
  do: (0,template_string/* $location */.PG)(level9_templateObject4 || (level9_templateObject4 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  outfit: {
    modifier: "item",
    equip: (0,template_string/* $items */.vS)(level9_templateObject5 || (level9_templateObject5 = level9_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"])))
  },
  combat: new src_combat.CombatStrategy().macro(() => (0,external_kolmafia_.numericModifier)("Monster Level") < -45 ? new dist_combat/* Macro */.LE() : new dist_combat/* Macro */.LE().attack().repeat() // Attack the ghost directly if ML is too high
  ).killItem(),
  choices: {
    611: 1,
    1430: 1
  },
  limit: {
    soft: 10
  }
}, {
  name: "ABoo Horror",
  after: ["ABoo Start", "Absorb/The Batrat and Ratbat Burrow", "Absorb/The Spooky Forest", "Absorb/The eXtreme Slope", "Absorb/A-Boo Peak"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject6 || (level9_templateObject6 = level9_taggedTemplateLiteral(["A-Boo clue"])))),
  completed: () => (0,property/* get */.U2)("booPeakProgress") === 0,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject7 || (level9_templateObject7 = level9_taggedTemplateLiteral(["pec oil"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level9_templateObject8 || (level9_templateObject8 = level9_taggedTemplateLiteral(["Oiled-Up"]))));
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject9 || (level9_templateObject9 = level9_taggedTemplateLiteral(["A-Boo clue"]))));
    fillHp();
  },
  do: (0,template_string/* $location */.PG)(level9_templateObject10 || (level9_templateObject10 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  effects: (0,template_string/* $effects */.lh)(level9_templateObject11 || (level9_templateObject11 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))),
  outfit: {
    modifier: "20 spooky res, 20 cold res, HP",
    familiar: (0,template_string/* $familiar */.HP)(level9_templateObject12 || (level9_templateObject12 = level9_taggedTemplateLiteral(["Exotic Parrot"]))),
    skipDefaults: true
  },
  choices: {
    611: 1
  },
  limit: {
    tries: 5
  },
  freeaction: true,
  expectbeatenup: true
}, {
  name: "ABoo Peak",
  after: ["ABoo Clues", "ABoo Horror"],
  completed: () => (0,property/* get */.U2)("booPeakLit"),
  do: (0,template_string/* $location */.PG)(level9_templateObject13 || (level9_templateObject13 = level9_taggedTemplateLiteral(["A-Boo Peak"]))),
  limit: {
    tries: 1
  }
}];
var Oil = [{
  name: "Oil Kill",
  after: ["Start Peaks"],
  completed: () => (0,property/* get */.U2)("oilPeakProgress") === 0,
  prepare: () => {
    if ((0,external_kolmafia_.myMp)() < 80 && (0,external_kolmafia_.myMaxmp)() >= 80) (0,external_kolmafia_.restoreMp)(80 - (0,external_kolmafia_.myMp)());
  },
  do: (0,template_string/* $location */.PG)(level9_templateObject14 || (level9_templateObject14 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject15 || (level9_templateObject15 = level9_taggedTemplateLiteral(["unbreakable umbrella"]))))) return {
      modifier: "ML 80 max, 0.1 item",
      equip: (0,template_string/* $items */.vS)(level9_templateObject16 || (level9_templateObject16 = level9_taggedTemplateLiteral(["unbreakable umbrella"])))
    };else return {
      modifier: "ML 100 max, 0.1 item"
    };
  },
  combat: new src_combat.CombatStrategy().killItem(),
  limit: {
    tries: 18
  },
  orbtargets: undefined
}, {
  name: "Oil Peak",
  after: ["Oil Kill"],
  completed: () => (0,property/* get */.U2)("oilPeakLit"),
  do: (0,template_string/* $location */.PG)(level9_templateObject17 || (level9_templateObject17 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  limit: {
    tries: 1
  },
  orbtargets: undefined
}, {
  name: "Oil Jar",
  // get oil for jar of oil
  after: ["Oil Peak"],
  completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level9_templateObject18 || (level9_templateObject18 = level9_taggedTemplateLiteral(["bubblin' crude"])))) >= 12 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject19 || (level9_templateObject19 = level9_taggedTemplateLiteral(["jar of oil"])))) || !!((0,property/* get */.U2)("twinPeakProgress") & 4),
  do: (0,template_string/* $location */.PG)(level9_templateObject20 || (level9_templateObject20 = level9_taggedTemplateLiteral(["Oil Peak"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject21 || (level9_templateObject21 = level9_taggedTemplateLiteral(["unbreakable umbrella"]))))) return {
      modifier: "ML 80 max, 0.1 item, monster level percent",
      equip: (0,template_string/* $items */.vS)(level9_templateObject22 || (level9_templateObject22 = level9_taggedTemplateLiteral(["unbreakable umbrella"])))
    };else return {
      modifier: "ML, 0.1 item"
    };
  },
  limit: {
    soft: 5
  },
  orbtargets: undefined
}];
var Twin = [{
  name: "Twin Stench Search",
  after: ["Start Peaks", "Macguffin/Forest"],
  // Wait for black paint,
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject23 || (level9_templateObject23 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 1),
  do: (0,template_string/* $location */.PG)(level9_templateObject24 || (level9_templateObject24 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 1,
    607: 1
  },
  effects: (0,template_string/* $effects */.lh)(level9_templateObject25 || (level9_templateObject25 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))),
  outfit: {
    modifier: "100 stench res 4min, -combat, item"
  },
  combat: (level9_CombatStrategy = new src_combat.CombatStrategy()).killItem.apply(level9_CombatStrategy, level9_toConsumableArray((0,template_string/* $monsters */.fr)(level9_templateObject26 || (level9_templateObject26 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Stench",
  after: ["Start Peaks"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject27 || (level9_templateObject27 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 1),
  do: () => {
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject28 || (level9_templateObject28 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 1,
    607: 1
  },
  effects: (0,template_string/* $effects */.lh)(level9_templateObject29 || (level9_templateObject29 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))),
  outfit: {
    modifier: "stench res 4min"
  },
  limit: {
    tries: 1
  }
}, {
  name: "Twin Item Search",
  after: ["Start Peaks"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject30 || (level9_templateObject30 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 2),
  do: (0,template_string/* $location */.PG)(level9_templateObject31 || (level9_templateObject31 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 2,
    608: 1
  },
  outfit: {
    modifier: "item 50min, -combat"
  },
  combat: (_CombatStrategy2 = new src_combat.CombatStrategy()).killItem.apply(_CombatStrategy2, level9_toConsumableArray((0,template_string/* $monsters */.fr)(level9_templateObject32 || (level9_templateObject32 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Item",
  after: ["Start Peaks"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject33 || (level9_templateObject33 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 2),
  do: () => {
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject34 || (level9_templateObject34 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 2,
    608: 1
  },
  outfit: {
    modifier: "item 50min"
  },
  limit: {
    tries: 1
  }
}, {
  name: "Twin Oil Search",
  after: ["Start Peaks", "Oil Jar"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject35 || (level9_templateObject35 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 4),
  do: (0,template_string/* $location */.PG)(level9_templateObject36 || (level9_templateObject36 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 3,
    609: 1,
    616: 1
  },
  outfit: {
    modifier: "item, -combat"
  },
  combat: (_CombatStrategy3 = new src_combat.CombatStrategy()).killItem.apply(_CombatStrategy3, level9_toConsumableArray((0,template_string/* $monsters */.fr)(level9_templateObject37 || (level9_templateObject37 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"]))))),
  acquire: [{
    item: (0,template_string/* $item */.xr)(level9_templateObject38 || (level9_templateObject38 = level9_taggedTemplateLiteral(["jar of oil"])))
  }],
  limit: {
    soft: 10
  }
}, {
  name: "Twin Oil",
  after: ["Start Peaks", "Oil Jar"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject39 || (level9_templateObject39 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 4),
  do: () => {
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject40 || (level9_templateObject40 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 3,
    609: 1,
    616: 1
  },
  acquire: [{
    item: (0,template_string/* $item */.xr)(level9_templateObject41 || (level9_templateObject41 = level9_taggedTemplateLiteral(["jar of oil"])))
  }],
  limit: {
    tries: 1
  }
}, {
  name: "Twin Init Search",
  after: ["Twin Stench", "Twin Item", "Twin Oil", "Twin Stench Search", "Twin Item Search", "Twin Oil Search"],
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject42 || (level9_templateObject42 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 8),
  do: (0,template_string/* $location */.PG)(level9_templateObject43 || (level9_templateObject43 = level9_taggedTemplateLiteral(["Twin Peak"]))),
  choices: {
    606: 4,
    610: 1,
    1056: 1
  },
  outfit: {
    modifier: "init 40 min, item, -combat"
  },
  combat: (_CombatStrategy4 = new src_combat.CombatStrategy()).killItem.apply(_CombatStrategy4, level9_toConsumableArray((0,template_string/* $monsters */.fr)(level9_templateObject44 || (level9_templateObject44 = level9_taggedTemplateLiteral(["bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Twin Init",
  after: ["Twin Stench", "Twin Item", "Twin Oil", "Twin Stench Search", "Twin Item Search", "Twin Oil Search"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject45 || (level9_templateObject45 = level9_taggedTemplateLiteral(["rusty hedge trimmers"])))),
  completed: () => !!((0,property/* get */.U2)("twinPeakProgress") & 8),
  do: () => {
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject46 || (level9_templateObject46 = level9_taggedTemplateLiteral(["rusty hedge trimmers"]))));
  },
  choices: {
    606: 4,
    610: 1,
    1056: 1
  },
  limit: {
    tries: 1
  }
}];
var ChasmQuest = {
  name: "Orc Chasm",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(9),
    completed: () => step("questL09Topping") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Bridge",
    after: ["Start", "Macguffin/Forest"],
    // Wait for black paint
    ready: () => ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject47 || (level9_templateObject47 = level9_taggedTemplateLiteral(["frozen jeans"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject48 || (level9_templateObject48 = level9_taggedTemplateLiteral(["industrial fire extinguisher"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject49 || (level9_templateObject49 = level9_taggedTemplateLiteral(["June cleaver"])))) && (0,property/* get */.U2)("_juneCleaverCold", 0) >= 5 || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject50 || (level9_templateObject50 = level9_taggedTemplateLiteral(["Cryocurrency"])))) || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject51 || (level9_templateObject51 = level9_taggedTemplateLiteral(["Cooling Tubules"])))) || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject52 || (level9_templateObject52 = level9_taggedTemplateLiteral(["Snow-Cooling System"]))))) && (0,property/* get */.U2)("smutOrcNoncombatProgress") < 15 || ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level9_templateObject53 || (level9_templateObject53 = level9_taggedTemplateLiteral(["Red Door Syndrome"])))) || (0,external_kolmafia_.myMeat)() >= 1000) && (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(level9_templateObject54 || (level9_templateObject54 = level9_taggedTemplateLiteral(["Moxie"])))) >= 400,
    completed: () => step("questL09Topping") >= 1,
    prepare: () => {
      if ((0,property/* get */.U2)("smutOrcNoncombatProgress") >= 15 && step("questL11Black") >= 2) {
        (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level9_templateObject55 || (level9_templateObject55 = level9_taggedTemplateLiteral(["Red Door Syndrome"]))));
        (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level9_templateObject56 || (level9_templateObject56 = level9_taggedTemplateLiteral(["Butt-Rock Hair"]))));
      }
    },
    do: (0,template_string/* $location */.PG)(level9_templateObject57 || (level9_templateObject57 = level9_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))),
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject58 || (level9_templateObject58 = level9_taggedTemplateLiteral(["smut orc keepsake box"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level9_templateObject59 || (level9_templateObject59 = level9_taggedTemplateLiteral(["smut orc keepsake box"]))));
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=orc_chasm&action=bridge".concat((0,property/* get */.U2)("chasmBridgeProgress"))); // use existing materials
    },
    outfit: () => {
      if ((0,property/* get */.U2)("smutOrcNoncombatProgress") < 15) {
        var equip = (0,template_string/* $items */.vS)(level9_templateObject60 || (level9_templateObject60 = level9_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"])));

        if (!(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject61 || (level9_templateObject61 = level9_taggedTemplateLiteral(["Cryocurrency"])))) && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject62 || (level9_templateObject62 = level9_taggedTemplateLiteral(["Cooling Tubules"])))) && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level9_templateObject63 || (level9_templateObject63 = level9_taggedTemplateLiteral(["Snow-Cooling System"]))))) {
          if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject64 || (level9_templateObject64 = level9_taggedTemplateLiteral(["frozen jeans"]))))) equip.push((0,template_string/* $item */.xr)(level9_templateObject65 || (level9_templateObject65 = level9_taggedTemplateLiteral(["frozen jeans"]))));else if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject66 || (level9_templateObject66 = level9_taggedTemplateLiteral(["June cleaver"])))) && (0,property/* get */.U2)("_juneCleaverCold", 0) >= 5) equip.push((0,template_string/* $item */.xr)(level9_templateObject67 || (level9_templateObject67 = level9_taggedTemplateLiteral(["June cleaver"]))));else if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level9_templateObject68 || (level9_templateObject68 = level9_taggedTemplateLiteral(["industrial fire extinguisher"]))))) equip.push((0,template_string/* $item */.xr)(level9_templateObject69 || (level9_templateObject69 = level9_taggedTemplateLiteral(["industrial fire extinguisher"]))));
        }

        return {
          modifier: "item",
          equip: equip
        };
      } else return {
        modifier: "sleaze res",
        equip: (0,template_string/* $items */.vS)(level9_templateObject70 || (level9_templateObject70 = level9_taggedTemplateLiteral(["combat lover's locket"])))
      };
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().attack().repeat()).ignore(),
    choices: {
      1345: 3
    },
    freeaction: () => (0,property/* get */.U2)("smutOrcNoncombatProgress") >= 15,
    limit: {
      soft: 45
    }
  }, {
    name: "Start Peaks",
    after: ["Bridge"],
    completed: () => step("questL09Topping") >= 2,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=highlands&action=highlands_dude"),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(ABoo, Oil, Twin, [{
    name: "Finish",
    after: ["ABoo Peak", "Oil Peak", "Twin Init", "Twin Init Search"],
    completed: () => step("questL09Topping") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=highlands&action=highlands_dude"),
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level10.ts
var level10_templateObject, level10_templateObject2, level10_templateObject3, level10_templateObject4, level10_templateObject5, level10_templateObject6, level10_templateObject7, level10_templateObject8, level10_templateObject9, level10_templateObject10, level10_templateObject11, level10_templateObject12, level10_templateObject13, level10_templateObject14, level10_templateObject15, level10_templateObject16, level10_templateObject17, level10_templateObject18, level10_templateObject19, level10_templateObject20, level10_templateObject21, level10_templateObject22, level10_templateObject23, level10_templateObject24, level10_templateObject25, level10_templateObject26, level10_templateObject27, level10_templateObject28, level10_templateObject29, level10_templateObject30, level10_templateObject31, level10_templateObject32, level10_templateObject33, level10_templateObject34, level10_templateObject35, level10_templateObject36, level10_templateObject37, level10_templateObject38, level10_templateObject39, level10_templateObject40;

function level10_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var GiantQuest = {
  name: "Giant",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(10),
    completed: () => step("questL10Garbage") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    freeaction: true
  }, {
    name: "Get Bean",
    after: ["Bat/Use Sonar 2"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject || (level10_templateObject = level10_taggedTemplateLiteral(["enchanted bean"])))) || step("questL10Garbage") >= 1,
    do: (0,template_string/* $location */.PG)(level10_templateObject2 || (level10_templateObject2 = level10_taggedTemplateLiteral(["The Beanbat Chamber"]))),
    outfit: {
      modifier: "item"
    },
    combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level10_templateObject3 || (level10_templateObject3 = level10_taggedTemplateLiteral(["beanbat"])))),
    limit: {
      soft: 5
    }
  }, {
    name: "Grow Beanstalk",
    after: ["Start", "Get Bean"],
    completed: () => step("questL10Garbage") >= 1,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level10_templateObject4 || (level10_templateObject4 = level10_taggedTemplateLiteral(["enchanted bean"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Airship YR Healer",
    after: ["Grow Beanstalk"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject5 || (level10_templateObject5 = level10_taggedTemplateLiteral(["amulet of extreme plot significance"])))),
    ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level10_templateObject6 || (level10_templateObject6 = level10_taggedTemplateLiteral(["Everything Looks Yellow"])))) && ((0,external_kolmafia_.myMeat)() >= 250 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject7 || (level10_templateObject7 = level10_taggedTemplateLiteral(["yellow rocket"]))))),
    priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level10_templateObject8 || (level10_templateObject8 = level10_taggedTemplateLiteral(["Everything Looks Yellow"])))) ? OverridePriority.None : OverridePriority.YR,
    acquire: [{
      item: (0,template_string/* $item */.xr)(level10_templateObject9 || (level10_templateObject9 = level10_taggedTemplateLiteral(["yellow rocket"])))
    }],
    do: (0,template_string/* $location */.PG)(level10_templateObject10 || (level10_templateObject10 = level10_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
    choices: {
      178: 2,
      182: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject11 || (level10_templateObject11 = level10_taggedTemplateLiteral(["model airship"])))) ? 1 : 4
    },
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level10_templateObject12 || (level10_templateObject12 = level10_taggedTemplateLiteral(["Temporary Amnesia"]))))) (0,external_kolmafia_.cliExecute)("uneffect Temporary Amnesia");
    },
    orbtargets: () => undefined,
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 50
    },
    delay: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject13 || (level10_templateObject13 = level10_taggedTemplateLiteral(["Plastic Wrap Immateria"])))) ? 25 : (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject14 || (level10_templateObject14 = level10_taggedTemplateLiteral(["Gauze Immateria"])))) ? 20 : 15,
    // After that, just look for noncombats
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level10_templateObject15 || (level10_templateObject15 = level10_taggedTemplateLiteral(["yellow rocket"])))), (0,template_string/* $monster */.O4)(level10_templateObject16 || (level10_templateObject16 = level10_taggedTemplateLiteral(["Quiet Healer"])))).killItem((0,template_string/* $monster */.O4)(level10_templateObject17 || (level10_templateObject17 = level10_taggedTemplateLiteral(["Burly Sidekick"]))))
  }, {
    name: "Airship",
    after: ["Airship YR Healer"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject18 || (level10_templateObject18 = level10_taggedTemplateLiteral(["S.O.C.K."])))),
    do: (0,template_string/* $location */.PG)(level10_templateObject19 || (level10_templateObject19 = level10_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
    choices: {
      178: 2,
      182: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject20 || (level10_templateObject20 = level10_taggedTemplateLiteral(["model airship"])))) ? 1 : 4
    },
    post: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level10_templateObject21 || (level10_templateObject21 = level10_taggedTemplateLiteral(["Temporary Amnesia"]))))) (0,external_kolmafia_.cliExecute)("uneffect Temporary Amnesia");
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 50
    },
    delay: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject22 || (level10_templateObject22 = level10_taggedTemplateLiteral(["Plastic Wrap Immateria"])))) ? 25 : (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject23 || (level10_templateObject23 = level10_taggedTemplateLiteral(["Gauze Immateria"])))) ? 20 : 15,
    // After that, just look for noncombats
    combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level10_templateObject24 || (level10_templateObject24 = level10_taggedTemplateLiteral(["Quiet Healer"]))), (0,template_string/* $monster */.O4)(level10_templateObject25 || (level10_templateObject25 = level10_taggedTemplateLiteral(["Burly Sidekick"]))))
  }, {
    name: "Basement Search",
    after: ["Airship"],
    completed: () => (0,external_kolmafia_.containsText)((0,template_string/* $location */.PG)(level10_templateObject26 || (level10_templateObject26 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))).noncombatQueue, "Mess Around with Gym") || step("questL10Garbage") >= 8,
    do: (0,template_string/* $location */.PG)(level10_templateObject27 || (level10_templateObject27 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    },
    choices: {
      670: 5,
      669: 1,
      671: 4
    }
  }, {
    name: "Basement Finish",
    after: ["Basement Search"],
    completed: () => step("questL10Garbage") >= 8,
    do: (0,template_string/* $location */.PG)(level10_templateObject28 || (level10_templateObject28 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level10_templateObject29 || (level10_templateObject29 = level10_taggedTemplateLiteral(["amulet of extreme plot significance"])))
    },
    choices: {
      670: 4
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Ground",
    after: ["Basement Finish"],
    completed: () => step("questL10Garbage") >= 9,
    do: (0,template_string/* $location */.PG)(level10_templateObject30 || (level10_templateObject30 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
    choices: {
      672: 3,
      673: 3,
      674: 3,
      1026: 2
    },
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject31 || (level10_templateObject31 = level10_taggedTemplateLiteral(["electric boning knife"]))))) return {};else return {
        modifier: "-combat"
      };
    },
    limit: {
      turns: 12
    },
    delay: 10
  }, {
    name: "Ground Knife",
    after: ["Ground", "Tower/Wall of Meat"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject32 || (level10_templateObject32 = level10_taggedTemplateLiteral(["electric boning knife"])))) || step("questL13Final") > 8,
    do: (0,template_string/* $location */.PG)(level10_templateObject33 || (level10_templateObject33 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
    choices: {
      672: 3,
      673: 3,
      674: 3,
      1026: 2
    },
    outfit: {
      modifier: "-combat"
    },
    limit: {
      soft: 20
    },
    delay: 10
  }, {
    name: "Top Floor",
    after: ["Ground"],
    acquire: [{
      item: (0,template_string/* $item */.xr)(level10_templateObject34 || (level10_templateObject34 = level10_taggedTemplateLiteral(["Mohawk wig"])))
    }],
    completed: () => step("questL10Garbage") >= 10,
    do: (0,template_string/* $location */.PG)(level10_templateObject35 || (level10_templateObject35 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level10_templateObject36 || (level10_templateObject36 = level10_taggedTemplateLiteral(["Mohawk wig"]))),
      modifier: "-combat"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level10_templateObject37 || (level10_templateObject37 = level10_taggedTemplateLiteral(["Burning Snake of Fire"])))),
    choices: {
      675: 4,
      676: 4,
      677: 1,
      678: 1,
      679: 1,
      1431: 4
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Finish",
    after: ["Top Floor"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL10Garbage") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      soft: 10
    },
    freeaction: true
  }, {
    name: "Unlock HITS",
    after: ["Top Floor"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level10_templateObject38 || (level10_templateObject38 = level10_taggedTemplateLiteral(["steam-powered model rocketship"])))),
    do: (0,template_string/* $location */.PG)(level10_templateObject39 || (level10_templateObject39 = level10_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
    outfit: {
      modifier: "-combat"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level10_templateObject40 || (level10_templateObject40 = level10_taggedTemplateLiteral(["Burning Snake of Fire"])))),
    choices: {
      675: 4,
      676: 4,
      677: 2,
      678: 3,
      679: 1,
      1431: 4
    },
    limit: {
      soft: 20
    }
  }]
};
;// CONCATENATED MODULE: ./src/tasks/level11_hidden.ts
var level11_hidden_templateObject, level11_hidden_templateObject2, level11_hidden_templateObject3, level11_hidden_templateObject4, level11_hidden_templateObject5, level11_hidden_templateObject6, level11_hidden_templateObject7, level11_hidden_templateObject8, level11_hidden_templateObject9, level11_hidden_templateObject10, level11_hidden_templateObject11, level11_hidden_templateObject12, level11_hidden_templateObject13, level11_hidden_templateObject14, level11_hidden_templateObject15, level11_hidden_templateObject16, level11_hidden_templateObject17, level11_hidden_templateObject18, level11_hidden_templateObject19, level11_hidden_templateObject20, level11_hidden_templateObject21, level11_hidden_templateObject22, level11_hidden_templateObject23, level11_hidden_templateObject24, level11_hidden_templateObject25, level11_hidden_templateObject26, level11_hidden_templateObject27, level11_hidden_templateObject28, level11_hidden_templateObject29, level11_hidden_templateObject30, level11_hidden_templateObject31, level11_hidden_templateObject32, level11_hidden_templateObject33, level11_hidden_templateObject34, level11_hidden_templateObject35, level11_hidden_templateObject36, level11_hidden_templateObject37, level11_hidden_templateObject38, level11_hidden_templateObject39, level11_hidden_templateObject40, level11_hidden_templateObject41, level11_hidden_templateObject42, level11_hidden_templateObject43, level11_hidden_templateObject44, _CombatStrategy$killH, level11_hidden_templateObject45, level11_hidden_templateObject46, level11_hidden_templateObject47, level11_hidden_templateObject48, level11_hidden_templateObject49, level11_hidden_templateObject50, level11_hidden_templateObject51, level11_hidden_templateObject52, _CombatStrategy$killH2, level11_hidden_templateObject53, level11_hidden_templateObject54, level11_hidden_templateObject55, level11_hidden_templateObject56, level11_hidden_templateObject57, level11_hidden_templateObject58, level11_hidden_templateObject59, level11_hidden_templateObject60, level11_hidden_templateObject61, level11_hidden_templateObject62, level11_hidden_templateObject63, level11_hidden_templateObject64, level11_hidden_templateObject65, level11_hidden_templateObject66, level11_hidden_templateObject67, level11_hidden_templateObject68, level11_hidden_templateObject69, _CombatStrategy$kill, level11_hidden_templateObject70, level11_hidden_templateObject71, level11_hidden_templateObject72, level11_hidden_templateObject73, level11_hidden_templateObject74, level11_hidden_templateObject75, level11_hidden_templateObject76, level11_hidden_templateObject77, level11_hidden_templateObject78, level11_hidden_templateObject79, level11_hidden_templateObject80, level11_hidden_templateObject81, _CombatStrategy$killH3, level11_hidden_templateObject82, level11_hidden_templateObject83, level11_hidden_templateObject84, level11_hidden_templateObject85, level11_hidden_templateObject86, level11_hidden_templateObject87, level11_hidden_templateObject88, level11_hidden_templateObject89, level11_hidden_templateObject90, level11_hidden_templateObject91, level11_hidden_templateObject92, level11_hidden_templateObject93, level11_hidden_templateObject94, level11_hidden_templateObject95, level11_hidden_templateObject96, level11_hidden_templateObject97, level11_hidden_templateObject98, level11_hidden_templateObject99, _CombatStrategy$killH4, level11_hidden_templateObject100, level11_hidden_templateObject101, level11_hidden_templateObject102, level11_hidden_templateObject103, level11_hidden_templateObject104, level11_hidden_templateObject105, level11_hidden_templateObject106, _CombatStrategy$killH5, level11_hidden_templateObject107, level11_hidden_templateObject108, level11_hidden_templateObject109, level11_hidden_templateObject110, level11_hidden_templateObject111, level11_hidden_templateObject112, level11_hidden_templateObject113, level11_hidden_templateObject114, level11_hidden_templateObject115, level11_hidden_CombatStrategy, level11_hidden_templateObject116, level11_hidden_templateObject117, level11_hidden_templateObject118, level11_hidden_templateObject119;

function level11_hidden_toConsumableArray(arr) { return level11_hidden_arrayWithoutHoles(arr) || level11_hidden_iterableToArray(arr) || level11_hidden_unsupportedIterableToArray(arr) || level11_hidden_nonIterableSpread(); }

function level11_hidden_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level11_hidden_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level11_hidden_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level11_hidden_arrayLikeToArray(o, minLen); }

function level11_hidden_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level11_hidden_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level11_hidden_arrayLikeToArray(arr); }

function level11_hidden_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level11_hidden_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function manualChoice(whichchoice, option) {
  return (0,external_kolmafia_.visitUrl)("choice.php?whichchoice=".concat(whichchoice, "&pwd=").concat((0,external_kolmafia_.myHash)(), "&option=").concat(option));
}

var Temple = [{
  name: "Forest Coin",
  after: ["Mosquito/Burn Delay"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject || (level11_hidden_templateObject = level11_hidden_taggedTemplateLiteral(["tree-holed coin"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject2 || (level11_hidden_templateObject2 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))) || step("questM16Temple") === 999,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject3 || (level11_hidden_templateObject3 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 2,
    505: 2,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Map",
  after: ["Forest Coin"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject4 || (level11_hidden_templateObject4 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))) || step("questM16Temple") === 999,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject5 || (level11_hidden_templateObject5 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 3,
    506: 3,
    507: 1,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Sapling",
  after: ["Mosquito/Burn Delay"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject6 || (level11_hidden_templateObject6 = level11_hidden_taggedTemplateLiteral(["spooky sapling"])))) || step("questM16Temple") === 999,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject7 || (level11_hidden_templateObject7 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 1,
    503: 3,
    504: 3,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Forest Fertilizer",
  after: ["Mosquito/Burn Delay"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject8 || (level11_hidden_templateObject8 = level11_hidden_taggedTemplateLiteral(["Spooky-Gro fertilizer"])))) || step("questM16Temple") === 999,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject9 || (level11_hidden_templateObject9 = level11_hidden_taggedTemplateLiteral(["The Spooky Forest"]))),
  choices: {
    502: 3,
    506: 2,
    507: 1,
    334: 1
  },
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 10
  }
}, {
  name: "Open Temple",
  after: ["Forest Coin", "Forest Map", "Forest Sapling", "Forest Fertilizer"],
  completed: () => step("questM16Temple") === 999,
  do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_hidden_templateObject10 || (level11_hidden_templateObject10 = level11_hidden_taggedTemplateLiteral(["Spooky Temple map"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Temple Wool",
  after: ["Open Temple"],
  completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_hidden_templateObject11 || (level11_hidden_templateObject11 = level11_hidden_taggedTemplateLiteral(["stone wool"])))) >= 2 || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_hidden_templateObject12 || (level11_hidden_templateObject12 = level11_hidden_taggedTemplateLiteral(["stone wool"])))) === 1 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject13 || (level11_hidden_templateObject13 = level11_hidden_taggedTemplateLiteral(["the Nostril of the Serpent"])))) || step("questL11Worship") >= 3,
  priority: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject14 || (level11_hidden_templateObject14 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))))) return OverridePriority.None;
    if ((0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(level11_hidden_templateObject15 || (level11_hidden_templateObject15 = level11_hidden_taggedTemplateLiteral(["Grey Goose"])))) >= 6) return OverridePriority.GoodGoose;
    return OverridePriority.BadGoose;
  },
  prepare: () => {
    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_hidden_templateObject16 || (level11_hidden_templateObject16 = level11_hidden_taggedTemplateLiteral(["11-leaf clover"])))) > 1 && !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject17 || (level11_hidden_templateObject17 = level11_hidden_taggedTemplateLiteral(["Lucky!"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject18 || (level11_hidden_templateObject18 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_hidden_templateObject19 || (level11_hidden_templateObject19 = level11_hidden_taggedTemplateLiteral(["11-leaf clover"]))));
  },
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject20 || (level11_hidden_templateObject20 = level11_hidden_taggedTemplateLiteral(["The Hidden Temple"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject21 || (level11_hidden_templateObject21 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 10) return {
      equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject22 || (level11_hidden_templateObject22 = level11_hidden_taggedTemplateLiteral(["industrial fire extinguisher"]))),
      modifier: "+combat"
    };else return {
      familiar: (0,template_string/* $familiar */.HP)(level11_hidden_templateObject23 || (level11_hidden_templateObject23 = level11_hidden_taggedTemplateLiteral(["Grey Goose"]))),
      modifier: "+combat, item"
    };
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject24 || (level11_hidden_templateObject24 = level11_hidden_taggedTemplateLiteral(["Fire Extinguisher: Polar Vortex"])))).trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject25 || (level11_hidden_templateObject25 = level11_hidden_taggedTemplateLiteral(["Fire Extinguisher: Polar Vortex"])))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject26 || (level11_hidden_templateObject26 = level11_hidden_taggedTemplateLiteral(["baa-relief sheep"])))).macro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject27 || (level11_hidden_templateObject27 = level11_hidden_taggedTemplateLiteral(["Emit Matter Duplicating Drones"])))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject28 || (level11_hidden_templateObject28 = level11_hidden_taggedTemplateLiteral(["Baa'baa'bu'ran"])))).killItem((0,template_string/* $monster */.O4)(level11_hidden_templateObject29 || (level11_hidden_templateObject29 = level11_hidden_taggedTemplateLiteral(["baa-relief sheep"]))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject30 || (level11_hidden_templateObject30 = level11_hidden_taggedTemplateLiteral(["Baa'baa'bu'ran"])))),
  choices: {
    579: 2,
    580: 1,
    581: 3,
    582: 1
  },
  limit: {
    soft: 20
  }
}, {
  name: "Temple Nostril",
  after: ["Open Temple", "Temple Wool"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject31 || (level11_hidden_templateObject31 = level11_hidden_taggedTemplateLiteral(["the Nostril of the Serpent"])))) || step("questL11Worship") >= 3,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject32 || (level11_hidden_templateObject32 = level11_hidden_taggedTemplateLiteral(["The Hidden Temple"]))),
  choices: {
    579: 2,
    582: 1
  },
  effects: (0,template_string/* $effects */.lh)(level11_hidden_templateObject33 || (level11_hidden_templateObject33 = level11_hidden_taggedTemplateLiteral(["Stone-Faced"]))),
  limit: {
    tries: 1
  }
}, {
  name: "Open City",
  after: ["Temple Nostril", "Macguffin/Diary"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject34 || (level11_hidden_templateObject34 = level11_hidden_taggedTemplateLiteral(["stone wool"])))
  }],
  completed: () => step("questL11Worship") >= 3,
  do: () => {
    (0,external_kolmafia_.visitUrl)("adventure.php?snarfblat=280");
    manualChoice(582, 2);
    manualChoice(580, 2);
    manualChoice(584, 4);
    manualChoice(580, 1);
    manualChoice(123, 2);
    (0,external_kolmafia_.visitUrl)("choice.php");
    (0,external_kolmafia_.cliExecute)("dvorak");
    manualChoice(125, 3);
  },
  effects: (0,template_string/* $effects */.lh)(level11_hidden_templateObject35 || (level11_hidden_templateObject35 = level11_hidden_taggedTemplateLiteral(["Stone-Faced"]))),
  limit: {
    tries: 1
  }
}];
var Apartment = [{
  name: "Open Apartment",
  after: ["Open City"],
  completed: () => (0,property/* get */.U2)("hiddenApartmentProgress") >= 1,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject36 || (level11_hidden_templateObject36 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northwest)"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject37 || (level11_hidden_templateObject37 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    781: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject38 || (level11_hidden_templateObject38 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Apartment Files",
  // Get the last McClusky files here if needed, as a backup plan
  after: ["Office Files", "Banish Janitors"],
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject39 || (level11_hidden_templateObject39 = level11_hidden_taggedTemplateLiteral(["Once-Cursed"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject40 || (level11_hidden_templateObject40 = level11_hidden_taggedTemplateLiteral(["Twice-Cursed"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject41 || (level11_hidden_templateObject41 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject42 || (level11_hidden_templateObject42 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 5)"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject43 || (level11_hidden_templateObject43 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || (0,property/* get */.U2)("hiddenOfficeProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject44 || (level11_hidden_templateObject44 = level11_hidden_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  combat: (_CombatStrategy$killH = new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject45 || (level11_hidden_templateObject45 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Apartment Building)"])))).kill((0,template_string/* $monster */.O4)(level11_hidden_templateObject46 || (level11_hidden_templateObject46 = level11_hidden_taggedTemplateLiteral(["pygmy witch accountant"]))))).banish.apply(_CombatStrategy$killH, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject47 || (level11_hidden_templateObject47 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy witch lawyer"]))))).ignoreNoBanish((0,template_string/* $monster */.O4)(level11_hidden_templateObject48 || (level11_hidden_templateObject48 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))).ignore(),
  limit: {
    tries: 9
  },
  choices: {
    780: 1
  }
}, {
  name: "Apartment",
  after: ["Open Apartment", "Apartment Files"],
  // Wait until after all needed pygmy witch lawyers are done
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject49 || (level11_hidden_templateObject49 = level11_hidden_taggedTemplateLiteral(["Once-Cursed"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject50 || (level11_hidden_templateObject50 = level11_hidden_taggedTemplateLiteral(["Twice-Cursed"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject51 || (level11_hidden_templateObject51 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => (0,property/* get */.U2)("hiddenApartmentProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject52 || (level11_hidden_templateObject52 = level11_hidden_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  combat: (_CombatStrategy$killH2 = new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject53 || (level11_hidden_templateObject53 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Apartment Building)"]))))).banish.apply(_CombatStrategy$killH2, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject54 || (level11_hidden_templateObject54 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy witch lawyer, pygmy witch accountant"]))))).ignoreNoBanish((0,template_string/* $monster */.O4)(level11_hidden_templateObject55 || (level11_hidden_templateObject55 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))).ignore(),
  orbtargets: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_hidden_templateObject56 || (level11_hidden_templateObject56 = level11_hidden_taggedTemplateLiteral(["Thrice-Cursed"]))))) return [];else return [(0,template_string/* $monster */.O4)(level11_hidden_templateObject57 || (level11_hidden_templateObject57 = level11_hidden_taggedTemplateLiteral(["pygmy shaman"])))];
  },
  choices: {
    780: 1
  },
  limit: {
    tries: 9
  }
}, {
  name: "Finish Apartment",
  after: ["Apartment"],
  completed: () => (0,property/* get */.U2)("hiddenApartmentProgress") >= 8,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject58 || (level11_hidden_templateObject58 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northwest)"]))),
  choices: {
    781: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Office = [{
  name: "Open Office",
  after: ["Open City"],
  completed: () => (0,property/* get */.U2)("hiddenOfficeProgress") >= 1,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject59 || (level11_hidden_templateObject59 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northeast)"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject60 || (level11_hidden_templateObject60 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    785: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject61 || (level11_hidden_templateObject61 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Office Files",
  after: ["Open Office", "Banish Janitors"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject62 || (level11_hidden_templateObject62 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 1)"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject63 || (level11_hidden_templateObject63 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 2)"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject64 || (level11_hidden_templateObject64 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 3)"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject65 || (level11_hidden_templateObject65 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 4)"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject66 || (level11_hidden_templateObject66 = level11_hidden_taggedTemplateLiteral(["McClusky file (page 5)"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject67 || (level11_hidden_templateObject67 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || (0,property/* get */.U2)("hiddenOfficeProgress") >= 7 || (0,template_string/* $location */.PG)(level11_hidden_templateObject68 || (level11_hidden_templateObject68 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))).turnsSpent >= 10,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject69 || (level11_hidden_templateObject69 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  combat: (_CombatStrategy$kill = new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_hidden_templateObject70 || (level11_hidden_templateObject70 = level11_hidden_taggedTemplateLiteral(["pygmy witch accountant"]))))).banish.apply(_CombatStrategy$kill, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject71 || (level11_hidden_templateObject71 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy headhunter, pygmy witch lawyer"]))))),
  choices: {
    786: 2
  },
  limit: {
    tries: 10
  }
}, {
  name: "Office Clip",
  after: ["Office Files", "Apartment Files"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject72 || (level11_hidden_templateObject72 = level11_hidden_taggedTemplateLiteral(["boring binder clip"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject73 || (level11_hidden_templateObject73 = level11_hidden_taggedTemplateLiteral(["McClusky file (complete)"])))) || (0,property/* get */.U2)("hiddenOfficeProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject74 || (level11_hidden_templateObject74 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  choices: {
    786: 2
  },
  combat: new src_combat.CombatStrategy().ignore(),
  limit: {
    tries: 6
  }
}, {
  name: "Office Boss",
  after: ["Office Clip"],
  completed: () => (0,property/* get */.U2)("hiddenOfficeProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject75 || (level11_hidden_templateObject75 = level11_hidden_taggedTemplateLiteral(["The Hidden Office Building"]))),
  choices: {
    786: 1
  },
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject76 || (level11_hidden_templateObject76 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Office Building)"])))).ignore(),
  orbtargets: () => [],
  limit: {
    soft: 10
  }
}, {
  name: "Finish Office",
  after: ["Office Boss"],
  completed: () => (0,property/* get */.U2)("hiddenOfficeProgress") >= 8,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject77 || (level11_hidden_templateObject77 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Northeast)"]))),
  choices: {
    785: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Hospital = [{
  name: "Open Hospital",
  after: ["Open City"],
  completed: () => (0,property/* get */.U2)("hiddenHospitalProgress") >= 1,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject78 || (level11_hidden_templateObject78 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southwest)"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject79 || (level11_hidden_templateObject79 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    783: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject80 || (level11_hidden_templateObject80 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Hospital",
  after: ["Open Hospital", "Banish Janitors"],
  completed: () => (0,property/* get */.U2)("hiddenHospitalProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject81 || (level11_hidden_templateObject81 = level11_hidden_taggedTemplateLiteral(["The Hidden Hospital"]))),
  combat: (_CombatStrategy$killH3 = new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject82 || (level11_hidden_templateObject82 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Hospital)"])))).kill((0,template_string/* $monster */.O4)(level11_hidden_templateObject83 || (level11_hidden_templateObject83 = level11_hidden_taggedTemplateLiteral(["pygmy witch surgeon"]))))).banish.apply(_CombatStrategy$killH3, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject84 || (level11_hidden_templateObject84 = level11_hidden_taggedTemplateLiteral(["pygmy orderlies, pygmy janitor, pygmy witch nurse"]))))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject85 || (level11_hidden_templateObject85 = level11_hidden_taggedTemplateLiteral(["half-size scalpel, head mirror, surgical mask, bloodied surgical dungarees"])))
  },
  choices: {
    784: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "Finish Hospital",
  after: ["Hospital"],
  completed: () => (0,property/* get */.U2)("hiddenHospitalProgress") >= 8,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject86 || (level11_hidden_templateObject86 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southwest)"]))),
  choices: {
    783: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Bowling = [{
  name: "Open Bowling",
  after: ["Open City"],
  completed: () => (0,property/* get */.U2)("hiddenBowlingAlleyProgress") >= 1,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject87 || (level11_hidden_templateObject87 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southeast)"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject88 || (level11_hidden_templateObject88 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  },
  choices: {
    787: 1
  },
  limit: {
    tries: 4
  },
  freecombat: true,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject89 || (level11_hidden_templateObject89 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
  }]
}, {
  name: "Bowling Skills",
  after: ["Open Bowling"],
  ready: () => (0,external_kolmafia_.myMeat)() >= 500,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject90 || (level11_hidden_templateObject90 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))),
    optional: true
  }],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level11_hidden_templateObject91 || (level11_hidden_templateObject91 = level11_hidden_taggedTemplateLiteral(["System Sweep"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(level11_hidden_templateObject92 || (level11_hidden_templateObject92 = level11_hidden_taggedTemplateLiteral(["Double Nanovision"])))),
  prepare: () => {
    // No need for more bowling progress after we beat the boss
    if ((0,property/* get */.U2)("hiddenBowlingAlleyProgress") >= 7 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject93 || (level11_hidden_templateObject93 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))))) (0,external_kolmafia_.putCloset)((0,template_string/* $item */.xr)(level11_hidden_templateObject94 || (level11_hidden_templateObject94 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))), (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_hidden_templateObject95 || (level11_hidden_templateObject95 = level11_hidden_taggedTemplateLiteral(["bowling ball"]))))); // Open the hidden tavern if it is available.

    if ((0,property/* get */.U2)("hiddenTavernUnlock") < (0,external_kolmafia_.myAscensions)() && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_hidden_templateObject96 || (level11_hidden_templateObject96 = level11_hidden_taggedTemplateLiteral(["book of matches"]))))) {
      (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_hidden_templateObject97 || (level11_hidden_templateObject97 = level11_hidden_taggedTemplateLiteral(["book of matches"]))));
      (0,external_kolmafia_.buy)((0,template_string/* $item */.xr)(level11_hidden_templateObject98 || (level11_hidden_templateObject98 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))));
    }
  },
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject99 || (level11_hidden_templateObject99 = level11_hidden_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  combat: (_CombatStrategy$killH4 = new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject100 || (level11_hidden_templateObject100 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Bowling Alley)"])))).killItem((0,template_string/* $monster */.O4)(level11_hidden_templateObject101 || (level11_hidden_templateObject101 = level11_hidden_taggedTemplateLiteral(["pygmy bowler"])))).autoattack(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject102 || (level11_hidden_templateObject102 = level11_hidden_taggedTemplateLiteral(["Infinite Loop"])))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject103 || (level11_hidden_templateObject103 = level11_hidden_taggedTemplateLiteral(["drunk pygmy"]))))).banish.apply(_CombatStrategy$killH4, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject104 || (level11_hidden_templateObject104 = level11_hidden_taggedTemplateLiteral(["pygmy orderlies"]))))),
  outfit: {
    modifier: "item"
  },
  choices: {
    788: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "Bowling",
  after: ["Open Bowling", "Banish Janitors"],
  ready: () => (0,external_kolmafia_.myMeat)() >= 500,
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_hidden_templateObject105 || (level11_hidden_templateObject105 = level11_hidden_taggedTemplateLiteral(["Bowl of Scorpions"]))),
    optional: true
  }],
  completed: () => (0,property/* get */.U2)("hiddenBowlingAlleyProgress") >= 7,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject106 || (level11_hidden_templateObject106 = level11_hidden_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  combat: (_CombatStrategy$killH5 = new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_hidden_templateObject107 || (level11_hidden_templateObject107 = level11_hidden_taggedTemplateLiteral(["ancient protector spirit (The Hidden Bowling Alley)"])))).killItem((0,template_string/* $monster */.O4)(level11_hidden_templateObject108 || (level11_hidden_templateObject108 = level11_hidden_taggedTemplateLiteral(["pygmy bowler"])))).autoattack(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject109 || (level11_hidden_templateObject109 = level11_hidden_taggedTemplateLiteral(["Infinite Loop"])))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject110 || (level11_hidden_templateObject110 = level11_hidden_taggedTemplateLiteral(["drunk pygmy"]))))).banish.apply(_CombatStrategy$killH5, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject111 || (level11_hidden_templateObject111 = level11_hidden_taggedTemplateLiteral(["pygmy janitor, pygmy orderlies"]))))),
  outfit: {
    modifier: "item"
  },
  choices: {
    788: 1
  },
  limit: {
    soft: 25
  }
}, {
  name: "Finish Bowling",
  after: ["Bowling"],
  completed: () => (0,property/* get */.U2)("hiddenBowlingAlleyProgress") >= 8,
  do: (0,template_string/* $location */.PG)(level11_hidden_templateObject112 || (level11_hidden_templateObject112 = level11_hidden_taggedTemplateLiteral(["An Overgrown Shrine (Southeast)"]))),
  choices: {
    787: 2
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var HiddenQuest = {
  name: "Hidden City",
  tasks: [].concat(Temple, Office, Apartment, Hospital, Bowling, [{
    name: "Banish Janitors",
    after: ["Bowling Skills"],
    completed: () => (0,property/* get */.U2)("relocatePygmyJanitor") === (0,external_kolmafia_.myAscensions)(),
    do: (0,template_string/* $location */.PG)(level11_hidden_templateObject113 || (level11_hidden_templateObject113 = level11_hidden_taggedTemplateLiteral(["The Hidden Park"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      789: 2
    },
    limit: {
      soft: 10
    }
  }, {
    name: "Boss",
    after: ["Finish Office", "Finish Apartment", "Finish Hospital", "Finish Bowling"],
    completed: () => step("questL11Worship") === 999,
    do: (0,template_string/* $location */.PG)(level11_hidden_templateObject114 || (level11_hidden_templateObject114 = level11_hidden_taggedTemplateLiteral(["A Massive Ziggurat"]))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(level11_hidden_templateObject115 || (level11_hidden_templateObject115 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
    },
    choices: {
      791: 1
    },
    combat: (level11_hidden_CombatStrategy = new src_combat.CombatStrategy(true)).kill.apply(level11_hidden_CombatStrategy, level11_hidden_toConsumableArray((0,template_string/* $monsters */.fr)(level11_hidden_templateObject116 || (level11_hidden_templateObject116 = level11_hidden_taggedTemplateLiteral(["dense liana, Protector Spectre"]))))).autoattack(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_hidden_templateObject117 || (level11_hidden_templateObject117 = level11_hidden_taggedTemplateLiteral(["Infinite Loop"])))), (0,template_string/* $monster */.O4)(level11_hidden_templateObject118 || (level11_hidden_templateObject118 = level11_hidden_taggedTemplateLiteral(["dense liana"])))),
    limit: {
      tries: 4
    },
    acquire: [{
      item: (0,template_string/* $item */.xr)(level11_hidden_templateObject119 || (level11_hidden_templateObject119 = level11_hidden_taggedTemplateLiteral(["antique machete"])))
    }]
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11_manor.ts
var level11_manor_templateObject, level11_manor_templateObject2, level11_manor_templateObject3, level11_manor_templateObject4, level11_manor_templateObject5, level11_manor_templateObject6, level11_manor_templateObject7, level11_manor_templateObject8, level11_manor_templateObject9, level11_manor_templateObject10, level11_manor_templateObject11, level11_manor_templateObject12, level11_manor_CombatStrategy, level11_manor_templateObject13, level11_manor_templateObject14, level11_manor_templateObject15, level11_manor_templateObject16, level11_manor_templateObject17, level11_manor_templateObject18, level11_manor_templateObject19, level11_manor_templateObject20, level11_manor_templateObject21, level11_manor_templateObject22, level11_manor_templateObject23, level11_manor_templateObject24, level11_manor_templateObject25, level11_manor_templateObject26, level11_manor_templateObject27, level11_manor_CombatStrategy$kill, level11_manor_CombatStrategy2, level11_manor_templateObject28, level11_manor_templateObject29, level11_manor_templateObject30, level11_manor_templateObject31, level11_manor_templateObject32, level11_manor_templateObject33, level11_manor_templateObject34, _CombatStrategy$kill2, level11_manor_templateObject35, level11_manor_templateObject36, level11_manor_templateObject37, level11_manor_templateObject38, level11_manor_templateObject39, level11_manor_templateObject40, level11_manor_templateObject41, level11_manor_templateObject42, level11_manor_templateObject43, level11_manor_templateObject44, level11_manor_templateObject45, level11_manor_templateObject46, level11_manor_templateObject47, level11_manor_CombatStrategy$killI, level11_manor_templateObject48, level11_manor_templateObject49, level11_manor_templateObject50, level11_manor_templateObject51, level11_manor_templateObject52, level11_manor_templateObject53, _CombatStrategy$killI2, level11_manor_templateObject54, level11_manor_templateObject55, level11_manor_templateObject56, level11_manor_templateObject57, level11_manor_templateObject58, level11_manor_templateObject59, level11_manor_templateObject60, level11_manor_templateObject61, _CombatStrategy$kill3, level11_manor_templateObject62, level11_manor_templateObject63, level11_manor_templateObject64;

function level11_manor_toConsumableArray(arr) { return level11_manor_arrayWithoutHoles(arr) || level11_manor_iterableToArray(arr) || level11_manor_unsupportedIterableToArray(arr) || level11_manor_nonIterableSpread(); }

function level11_manor_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level11_manor_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level11_manor_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level11_manor_arrayLikeToArray(o, minLen); }

function level11_manor_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level11_manor_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level11_manor_arrayLikeToArray(arr); }

function level11_manor_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level11_manor_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var Manor1 = [{
  name: "Kitchen",
  after: ["Start"],
  completed: () => step("questM20Necklace") >= 1,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject || (level11_manor_templateObject = level11_manor_taggedTemplateLiteral(["rainbow glitter candle"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_manor_templateObject2 || (level11_manor_templateObject2 = level11_manor_taggedTemplateLiteral(["rainbow glitter candle"]))));
  },
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject3 || (level11_manor_templateObject3 = level11_manor_taggedTemplateLiteral(["The Haunted Kitchen"]))),
  outfit: {
    modifier: "stench res, hot res"
  },
  choices: {
    893: 2
  },
  combat: new src_combat.CombatStrategy().kill(),
  limit: {
    soft: 12
  }
}, {
  name: "Billiards",
  after: ["Kitchen"],
  completed: () => step("questM20Necklace") >= 3,
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_manor_templateObject4 || (level11_manor_templateObject4 = level11_manor_taggedTemplateLiteral(["Chalky Hand"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject5 || (level11_manor_templateObject5 = level11_manor_taggedTemplateLiteral(["handful of hand chalk"])))) ? OverridePriority.Effect : OverridePriority.None,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject6 || (level11_manor_templateObject6 = level11_manor_taggedTemplateLiteral(["handful of hand chalk"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level11_manor_templateObject7 || (level11_manor_templateObject7 = level11_manor_taggedTemplateLiteral(["Chalky Hand"]))));
  },
  ready: () => (0,external_kolmafia_.myInebriety)() <= 15,
  // Nonnegative contribution
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject8 || (level11_manor_templateObject8 = level11_manor_taggedTemplateLiteral(["The Haunted Billiards Room"]))),
  choices: {
    875: 1,
    900: 2,
    1436: 1
  },
  outfit: () => {
    return {
      equip: (0,template_string/* $items */.vS)(level11_manor_templateObject9 || (level11_manor_templateObject9 = level11_manor_taggedTemplateLiteral(["pool cue"]))),
      modifier: "-combat"
    };
  },
  combat: new src_combat.CombatStrategy().ignore().killItem((0,template_string/* $monster */.O4)(level11_manor_templateObject10 || (level11_manor_templateObject10 = level11_manor_taggedTemplateLiteral(["chalkdust wraith"])))).kill((0,template_string/* $monster */.O4)(level11_manor_templateObject11 || (level11_manor_templateObject11 = level11_manor_taggedTemplateLiteral(["pooltergeist (ultra-rare)"])))),
  limit: {
    soft: 20
  }
}, {
  name: "Library",
  after: ["Billiards"],
  completed: () => step("questM20Necklace") >= 4,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject12 || (level11_manor_templateObject12 = level11_manor_taggedTemplateLiteral(["The Haunted Library"]))),
  combat: (level11_manor_CombatStrategy = new src_combat.CombatStrategy()).banish.apply(level11_manor_CombatStrategy, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject13 || (level11_manor_templateObject13 = level11_manor_taggedTemplateLiteral(["banshee librarian, bookbat"]))))).kill(),
  choices: {
    163: 4,
    888: 4,
    889: 5,
    894: 1
  },
  limit: {
    soft: 15
  }
}, {
  name: "Finish Floor1",
  after: ["Library"],
  completed: () => step("questM20Necklace") === 999,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor1&action=manor1_ladys"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var Manor2 = [{
  name: "Start Floor2",
  after: ["Finish Floor1"],
  completed: () => step("questM21Dance") >= 1,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Gallery Delay",
  after: ["Start Floor2"],
  completed: () => (0,template_string/* $location */.PG)(level11_manor_templateObject14 || (level11_manor_templateObject14 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))).turnsSpent >= 5 || step("questM21Dance") >= 2,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject15 || (level11_manor_templateObject15 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))),
  choices: {
    89: 6,
    896: 1
  },
  // TODO: louvre
  limit: {
    turns: 5
  },
  delay: 5
}, {
  name: "Gallery",
  after: ["Gallery Delay"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject16 || (level11_manor_templateObject16 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's dancing shoes"])))) || step("questM21Dance") >= 2,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject17 || (level11_manor_templateObject17 = level11_manor_taggedTemplateLiteral(["The Haunted Gallery"]))),
  choices: {
    89: 6,
    896: 1
  },
  // TODO: louvre
  outfit: {
    modifier: "-combat"
  },
  limit: {
    soft: 15
  }
}, {
  name: "Bathroom Delay",
  after: ["Start Floor2"],
  completed: () => (0,template_string/* $location */.PG)(level11_manor_templateObject18 || (level11_manor_templateObject18 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))).turnsSpent >= 5 || step("questM21Dance") >= 2,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject19 || (level11_manor_templateObject19 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  choices: {
    881: 1,
    105: 1,
    892: 1
  },
  combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_manor_templateObject20 || (level11_manor_templateObject20 = level11_manor_taggedTemplateLiteral(["cosmetics wraith"])))),
  limit: {
    turns: 5
  },
  delay: 5,
  // No need to search for cosmetics wraith
  orbtargets: () => []
}, {
  name: "Bathroom",
  after: ["Bathroom Delay"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject21 || (level11_manor_templateObject21 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's powder puff"])))) || step("questM21Dance") >= 2,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject22 || (level11_manor_templateObject22 = level11_manor_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  choices: {
    881: 1,
    105: 1,
    892: 1
  },
  outfit: {
    modifier: "-combat"
  },
  combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_manor_templateObject23 || (level11_manor_templateObject23 = level11_manor_taggedTemplateLiteral(["cosmetics wraith"])))),
  limit: {
    soft: 15
  },
  // No need to search for cosmetics wraith
  orbtargets: () => []
}, {
  name: "Bedroom",
  after: ["Start Floor2"],
  completed: () => ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject24 || (level11_manor_templateObject24 = level11_manor_taggedTemplateLiteral(["Lady Spookyraven's finest gown"])))) || step("questM21Dance") >= 2) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject25 || (level11_manor_templateObject25 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))),
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject26 || (level11_manor_templateObject26 = level11_manor_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  choices: {
    876: 1,
    877: 1,
    878: () => {
      if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject27 || (level11_manor_templateObject27 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"]))))) return 3;else return 4;
    },
    879: 1,
    880: 1,
    897: 2
  },
  combat: (level11_manor_CombatStrategy$kill = (level11_manor_CombatStrategy2 = new src_combat.CombatStrategy()).kill.apply(level11_manor_CombatStrategy2, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject28 || (level11_manor_templateObject28 = level11_manor_taggedTemplateLiteral(["elegant animated nightstand, animated ornate nightstand"]))))) // kill ornate nightstand if banish fails
  ).banish.apply(level11_manor_CombatStrategy$kill, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject29 || (level11_manor_templateObject29 = level11_manor_taggedTemplateLiteral(["animated mahogany nightstand, animated rustic nightstand, Wardr\xF6b nightstand"]))))).ignore((0,template_string/* $monster */.O4)(level11_manor_templateObject30 || (level11_manor_templateObject30 = level11_manor_taggedTemplateLiteral(["tumbleweed"])))),
  delay: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject31 || (level11_manor_templateObject31 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))) ? 5 : 0,
  limit: {
    soft: 15
  }
}, {
  name: "Bedroom Camera",
  after: ["Bedroom"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject32 || (level11_manor_templateObject32 = level11_manor_taggedTemplateLiteral(["disposable instant camera"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject33 || (level11_manor_templateObject33 = level11_manor_taggedTemplateLiteral(["photograph of a dog"])))) || step("questL11Palindome") >= 3,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject34 || (level11_manor_templateObject34 = level11_manor_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  choices: {
    876: 1,
    877: 1,
    878: 4,
    879: 1,
    880: 1,
    897: 2
  },
  combat: (_CombatStrategy$kill2 = new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_manor_templateObject35 || (level11_manor_templateObject35 = level11_manor_taggedTemplateLiteral(["animated ornate nightstand"]))))).banish.apply(_CombatStrategy$kill2, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject36 || (level11_manor_templateObject36 = level11_manor_taggedTemplateLiteral(["animated mahogany nightstand, animated rustic nightstand, Wardr\xF6b nightstand, elegant animated nightstand"]))))).ignore((0,template_string/* $monster */.O4)(level11_manor_templateObject37 || (level11_manor_templateObject37 = level11_manor_taggedTemplateLiteral(["tumbleweed"])))),
  limit: {
    soft: 10
  }
}, {
  name: "Open Ballroom",
  after: ["Gallery", "Bathroom", "Bedroom"],
  completed: () => step("questM21Dance") >= 3,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys"),
  limit: {
    tries: 1
  }
}, {
  name: "Finish Floor2",
  after: ["Open Ballroom"],
  completed: () => step("questM21Dance") >= 4,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject38 || (level11_manor_templateObject38 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  limit: {
    turns: 1
  }
}];
var ManorBasement = [{
  name: "Ballroom Delay",
  after: ["Macguffin/Diary", "Finish Floor2"],
  completed: () => (0,template_string/* $location */.PG)(level11_manor_templateObject39 || (level11_manor_templateObject39 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))).turnsSpent >= 5 || step("questL11Manor") >= 1,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject40 || (level11_manor_templateObject40 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  choices: {
    90: 3,
    106: 4,
    921: 1
  },
  limit: {
    turns: 5
  },
  delay: 5
}, {
  name: "Ballroom",
  after: ["Ballroom Delay"],
  completed: () => step("questL11Manor") >= 1,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject41 || (level11_manor_templateObject41 = level11_manor_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  outfit: {
    modifier: "-combat"
  },
  choices: {
    90: 3,
    106: 4,
    921: 1
  },
  limit: {
    soft: 10
  }
}, {
  name: "Learn Recipe",
  after: ["Ballroom"],
  completed: () => (0,property/* get */.U2)("spookyravenRecipeUsed") === "with_glasses",
  do: () => {
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall");
    (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_manor_templateObject42 || (level11_manor_templateObject42 = level11_manor_taggedTemplateLiteral(["recipe: mortar-dissolving solution"]))));
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_manor_templateObject43 || (level11_manor_templateObject43 = level11_manor_taggedTemplateLiteral(["Lord Spookyraven's spectacles"])))
  },
  limit: {
    tries: 1
  }
}, {
  name: "Wine Cellar",
  after: ["Learn Recipe"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject44 || (level11_manor_templateObject44 = level11_manor_taggedTemplateLiteral(["bottle of Chateau de Vinegar"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject45 || (level11_manor_templateObject45 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject46 || (level11_manor_templateObject46 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject47 || (level11_manor_templateObject47 = level11_manor_taggedTemplateLiteral(["The Haunted Wine Cellar"]))),
  outfit: {
    modifier: "item, booze drop"
  },
  choices: {
    901: 2
  },
  combat: (level11_manor_CombatStrategy$killI = new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level11_manor_templateObject48 || (level11_manor_templateObject48 = level11_manor_taggedTemplateLiteral(["possessed wine rack"]))))).banish.apply(level11_manor_CombatStrategy$killI, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject49 || (level11_manor_templateObject49 = level11_manor_taggedTemplateLiteral(["mad wino, skeletal sommelier"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Laundry Room",
  after: ["Learn Recipe"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject50 || (level11_manor_templateObject50 = level11_manor_taggedTemplateLiteral(["blasting soda"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject51 || (level11_manor_templateObject51 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject52 || (level11_manor_templateObject52 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject53 || (level11_manor_templateObject53 = level11_manor_taggedTemplateLiteral(["The Haunted Laundry Room"]))),
  outfit: {
    modifier: "item, food drop"
  },
  choices: {
    891: 2
  },
  combat: (_CombatStrategy$killI2 = new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level11_manor_templateObject54 || (level11_manor_templateObject54 = level11_manor_taggedTemplateLiteral(["cabinet of Dr. Limpieza"]))))).banish.apply(_CombatStrategy$killI2, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject55 || (level11_manor_templateObject55 = level11_manor_taggedTemplateLiteral(["plaid ghost, possessed laundry press"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Fulminate",
  after: ["Wine Cellar", "Laundry Room"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject56 || (level11_manor_templateObject56 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject57 || (level11_manor_templateObject57 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: () => (0,external_kolmafia_.create)((0,template_string/* $item */.xr)(level11_manor_templateObject58 || (level11_manor_templateObject58 = level11_manor_taggedTemplateLiteral(["unstable fulminate"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Boiler Room",
  after: ["Fulminate"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_manor_templateObject59 || (level11_manor_templateObject59 = level11_manor_taggedTemplateLiteral(["wine bomb"])))) || step("questL11Manor") >= 3,
  do: (0,template_string/* $location */.PG)(level11_manor_templateObject60 || (level11_manor_templateObject60 = level11_manor_taggedTemplateLiteral(["The Haunted Boiler Room"]))),
  outfit: {
    modifier: "ML",
    equip: (0,template_string/* $items */.vS)(level11_manor_templateObject61 || (level11_manor_templateObject61 = level11_manor_taggedTemplateLiteral(["unstable fulminate, transparent pants"])))
  },
  choices: {
    902: 2
  },
  combat: (_CombatStrategy$kill3 = new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_manor_templateObject62 || (level11_manor_templateObject62 = level11_manor_taggedTemplateLiteral(["monstrous boiler"]))))).banish.apply(_CombatStrategy$kill3, level11_manor_toConsumableArray((0,template_string/* $monsters */.fr)(level11_manor_templateObject63 || (level11_manor_templateObject63 = level11_manor_taggedTemplateLiteral(["coaltergeist, steam elemental"]))))),
  limit: {
    soft: 10
  }
}, {
  name: "Blow Wall",
  after: ["Boiler Room"],
  completed: () => step("questL11Manor") >= 3,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall"),
  limit: {
    tries: 1
  },
  freeaction: true
}];
var ManorQuest = {
  name: "Manor",
  tasks: [{
    name: "Start",
    after: [],
    completed: () => step("questM20Necklace") >= 0,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_manor_templateObject64 || (level11_manor_templateObject64 = level11_manor_taggedTemplateLiteral(["telegram from Lady Spookyraven"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Manor1, Manor2, ManorBasement, [{
    name: "Boss",
    after: ["Blow Wall"],
    completed: () => step("questL11Manor") >= 999,
    do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberboss"),
    combat: new src_combat.CombatStrategy(true).kill(),
    limit: {
      tries: 1
    }
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11_palindome.ts
var level11_palindome_templateObject, level11_palindome_templateObject2, level11_palindome_templateObject3, level11_palindome_templateObject4, level11_palindome_templateObject5, level11_palindome_templateObject6, level11_palindome_templateObject7, level11_palindome_templateObject8, level11_palindome_templateObject9, level11_palindome_templateObject10, level11_palindome_templateObject11, level11_palindome_templateObject12, level11_palindome_templateObject13, level11_palindome_templateObject14, level11_palindome_templateObject15, level11_palindome_templateObject16, level11_palindome_templateObject17, level11_palindome_templateObject18, level11_palindome_templateObject19, level11_palindome_templateObject20, level11_palindome_templateObject21, level11_palindome_templateObject22, level11_palindome_templateObject23, level11_palindome_templateObject24, level11_palindome_templateObject25, level11_palindome_templateObject26, level11_palindome_templateObject27, level11_palindome_templateObject28, level11_palindome_templateObject29, level11_palindome_templateObject30, level11_palindome_templateObject31, level11_palindome_templateObject32, level11_palindome_templateObject33, level11_palindome_templateObject34, level11_palindome_templateObject35, level11_palindome_templateObject36, level11_palindome_templateObject37, level11_palindome_templateObject38, level11_palindome_templateObject39, level11_palindome_templateObject40, level11_palindome_templateObject41, level11_palindome_templateObject42, level11_palindome_templateObject43, level11_palindome_templateObject44, level11_palindome_templateObject45, level11_palindome_templateObject46, level11_palindome_templateObject47, level11_palindome_templateObject48, level11_palindome_templateObject49, level11_palindome_templateObject50, level11_palindome_templateObject51, level11_palindome_templateObject52, level11_palindome_templateObject53, level11_palindome_templateObject54, level11_palindome_templateObject55, level11_palindome_templateObject56, level11_palindome_templateObject57, level11_palindome_templateObject58, level11_palindome_templateObject59, level11_palindome_templateObject60, level11_palindome_templateObject61, level11_palindome_templateObject62, _CombatStrategy$kill$, level11_palindome_CombatStrategy$kill, level11_palindome_templateObject63, level11_palindome_templateObject64, level11_palindome_templateObject65, level11_palindome_templateObject66, level11_palindome_templateObject67, level11_palindome_templateObject68, level11_palindome_templateObject69, level11_palindome_templateObject70, level11_palindome_templateObject71, level11_palindome_templateObject72, level11_palindome_templateObject73, _CombatStrategy$banis, _CombatStrategy$banis2, level11_palindome_CombatStrategy, level11_palindome_templateObject74, level11_palindome_templateObject75, level11_palindome_templateObject76, level11_palindome_templateObject77, level11_palindome_templateObject78, level11_palindome_templateObject79, level11_palindome_templateObject80, level11_palindome_templateObject81, _CombatStrategy$banis3, level11_palindome_CombatStrategy2, level11_palindome_templateObject82, level11_palindome_templateObject83, level11_palindome_templateObject84, level11_palindome_templateObject85, level11_palindome_templateObject86, level11_palindome_templateObject87, level11_palindome_templateObject88, level11_palindome_templateObject89, level11_palindome_templateObject90, level11_palindome_CombatStrategy3, level11_palindome_templateObject91, level11_palindome_templateObject92, level11_palindome_templateObject93, level11_palindome_templateObject94, level11_palindome_templateObject95, level11_palindome_CombatStrategy4, level11_palindome_templateObject96, level11_palindome_templateObject97, level11_palindome_templateObject98, level11_palindome_templateObject99, level11_palindome_templateObject100, level11_palindome_templateObject101, level11_palindome_templateObject102, level11_palindome_templateObject103, level11_palindome_templateObject104, level11_palindome_templateObject105, level11_palindome_templateObject106, level11_palindome_templateObject107, level11_palindome_templateObject108;

function level11_palindome_toConsumableArray(arr) { return level11_palindome_arrayWithoutHoles(arr) || level11_palindome_iterableToArray(arr) || level11_palindome_unsupportedIterableToArray(arr) || level11_palindome_nonIterableSpread(); }

function level11_palindome_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level11_palindome_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level11_palindome_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level11_palindome_arrayLikeToArray(o, minLen); }

function level11_palindome_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level11_palindome_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level11_palindome_arrayLikeToArray(arr); }

function level11_palindome_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level11_palindome_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function shenItem(item) {
  return (0,property/* get */.U2)("shenQuestItem") === item.name && (step("questL11Shen") === 1 || step("questL11Shen") === 3 || step("questL11Shen") === 5);
}

var Copperhead = [{
  name: "Copperhead Start",
  after: ["Macguffin/Diary"],
  completed: () => step("questL11Shen") >= 1,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject || (level11_palindome_templateObject = level11_palindome_taggedTemplateLiteral(["The Copperhead Club"]))),
  choices: {
    1074: 1
  },
  limit: {
    tries: 1
  }
}, {
  name: "Copperhead",
  after: ["Copperhead Start"],
  ready: () => step("questL11Shen") === 2 || step("questL11Shen") === 4 || step("questL11Shen") === 6,
  completed: () => step("questL11Shen") === 999,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject2 || (level11_palindome_templateObject2 = level11_palindome_taggedTemplateLiteral(["crappy waiter disguise"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level11_palindome_templateObject3 || (level11_palindome_templateObject3 = level11_palindome_taggedTemplateLiteral(["Crappily Disguised as a Waiter"]))));
  },
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject4 || (level11_palindome_templateObject4 = level11_palindome_taggedTemplateLiteral(["The Copperhead Club"]))),
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level11_palindome_templateObject5 || (level11_palindome_templateObject5 = level11_palindome_taggedTemplateLiteral(["Copperhead Club bartender"]))), (0,template_string/* $monster */.O4)(level11_palindome_templateObject6 || (level11_palindome_templateObject6 = level11_palindome_taggedTemplateLiteral(["ninja dressed as a waiter"]))), (0,template_string/* $monster */.O4)(level11_palindome_templateObject7 || (level11_palindome_templateObject7 = level11_palindome_taggedTemplateLiteral(["waiter dressed as a ninja"])))),
  choices: {
    852: 1,
    853: 1,
    854: 1,
    855: () => {
      return (0,property/* get */.U2)("copperheadClubHazard") !== "lantern" ? 3 : 4;
    }
  },
  limit: {
    tries: 20
  }
}, {
  name: "Bat Snake",
  after: ["Copperhead Start", "Bat/Use Sonar 1"],
  ready: () => shenItem((0,template_string/* $item */.xr)(level11_palindome_templateObject8 || (level11_palindome_templateObject8 = level11_palindome_taggedTemplateLiteral(["The Stankara Stone"])))),
  completed: () => step("questL11Shen") === 999 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject9 || (level11_palindome_templateObject9 = level11_palindome_taggedTemplateLiteral(["The Stankara Stone"])))) || (0,external_kolmafia_.myDaycount)() === 1 && step("questL11Shen") > 1,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject10 || (level11_palindome_templateObject10 = level11_palindome_taggedTemplateLiteral(["The Batrat and Ratbat Burrow"]))),
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject11 || (level11_palindome_templateObject11 = level11_palindome_taggedTemplateLiteral(["Batsnake"])))).killItem(),
  outfit: {
    modifier: "item"
  },
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Cold Snake",
  after: ["Copperhead Start", "McLargeHuge/Trapper Return", "Misc/Summon Lion"],
  ready: () => shenItem((0,template_string/* $item */.xr)(level11_palindome_templateObject12 || (level11_palindome_templateObject12 = level11_palindome_taggedTemplateLiteral(["The First Pizza"])))),
  completed: () => step("questL11Shen") === 999 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject13 || (level11_palindome_templateObject13 = level11_palindome_taggedTemplateLiteral(["The First Pizza"])))) || (0,external_kolmafia_.myDaycount)() === 1 && step("questL11Shen") > 3,
  prepare: () => {
    (0,external_kolmafia_.restoreHp)((0,external_kolmafia_.myMaxhp)());
  },
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject14 || (level11_palindome_templateObject14 = level11_palindome_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
  outfit: {
    modifier: "50 combat, init"
  },
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject15 || (level11_palindome_templateObject15 = level11_palindome_taggedTemplateLiteral(["Frozen Solid Snake"]))), (0,template_string/* $monster */.O4)(level11_palindome_templateObject16 || (level11_palindome_templateObject16 = level11_palindome_taggedTemplateLiteral(["ninja snowman assassin"])))),
  orbtargets: () => [],
  // no assassins in orbs
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Hot Snake Precastle",
  after: ["Copperhead Start", "Giant/Ground"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_palindome_templateObject17 || (level11_palindome_templateObject17 = level11_palindome_taggedTemplateLiteral(["Mohawk wig"])))
  }],
  ready: () => shenItem((0,template_string/* $item */.xr)(level11_palindome_templateObject18 || (level11_palindome_templateObject18 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject19 || (level11_palindome_templateObject19 = level11_palindome_taggedTemplateLiteral(["steam-powered model rocketship"])))),
  completed: () => step("questL11Shen") === 999 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject20 || (level11_palindome_templateObject20 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))),
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject21 || (level11_palindome_templateObject21 = level11_palindome_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject22 || (level11_palindome_templateObject22 = level11_palindome_taggedTemplateLiteral(["Mohawk wig"]))),
    modifier: "-combat"
  },
  choices: {
    675: 4,
    676: 4,
    677: () => {
      return step("questL10Garbage") >= 10 ? 2 : 1;
    },
    678: () => {
      return step("questL10Garbage") >= 10 ? 3 : 1;
    },
    679: 1,
    1431: 4
  },
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject23 || (level11_palindome_templateObject23 = level11_palindome_taggedTemplateLiteral(["Burning Snake of Fire"])))),
  limit: {
    soft: 10
  },
  delay: 5
}, {
  name: "Hot Snake Postcastle",
  after: ["Copperhead Start", "Giant/Ground"],
  ready: () => shenItem((0,template_string/* $item */.xr)(level11_palindome_templateObject24 || (level11_palindome_templateObject24 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject25 || (level11_palindome_templateObject25 = level11_palindome_taggedTemplateLiteral(["steam-powered model rocketship"])))),
  completed: () => step("questL11Shen") === 999 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject26 || (level11_palindome_templateObject26 = level11_palindome_taggedTemplateLiteral(["Murphy's Rancid Black Flag"])))),
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject27 || (level11_palindome_templateObject27 = level11_palindome_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  choices: {
    675: 4,
    676: 4,
    677: 1,
    678: 1,
    679: 1,
    1431: 4
  },
  outfit: {
    modifier: "+combat"
  },
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject28 || (level11_palindome_templateObject28 = level11_palindome_taggedTemplateLiteral(["Burning Snake of Fire"])))),
  limit: {
    soft: 10
  },
  delay: 5
}];
var Zepplin = [{
  name: "Protesters Start",
  after: ["Macguffin/Diary"],
  completed: () => step("questL11Ron") >= 1,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject29 || (level11_palindome_templateObject29 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject30 || (level11_palindome_templateObject30 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Protesters",
  after: ["Protesters Start", "Misc/Hermit Clover"],
  ready: () => (0,external_kolmafia_.canEquip)((0,template_string/* $item */.xr)(level11_palindome_templateObject31 || (level11_palindome_templateObject31 = level11_palindome_taggedTemplateLiteral(["transparent pants"])))) && ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_palindome_templateObject32 || (level11_palindome_templateObject32 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 || ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject33 || (level11_palindome_templateObject33 = level11_palindome_taggedTemplateLiteral(["Flamin' Whatshisname"])))) || step("questL11Shen") === 999) && ((0,property/* get */.U2)("camelSpit") < 100 || !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_palindome_templateObject34 || (level11_palindome_templateObject34 = level11_palindome_taggedTemplateLiteral(["Everything Looks Yellow"])))))),
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject35 || (level11_palindome_templateObject35 = level11_palindome_taggedTemplateLiteral(["lynyrd musk"]))))) (0,lib/* ensureEffect */.pq)((0,template_string/* $effect */._G)(level11_palindome_templateObject36 || (level11_palindome_templateObject36 = level11_palindome_taggedTemplateLiteral(["Musky"]))));
    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_palindome_templateObject37 || (level11_palindome_templateObject37 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 && !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_palindome_templateObject38 || (level11_palindome_templateObject38 = level11_palindome_taggedTemplateLiteral(["Lucky!"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_palindome_templateObject39 || (level11_palindome_templateObject39 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"]))));
  },
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_palindome_templateObject40 || (level11_palindome_templateObject40 = level11_palindome_taggedTemplateLiteral(["yellow rocket"]))),
    useful: () => (0,property/* get */.U2)("camelSpit") >= 100
  }],
  completed: () => (0,property/* get */.U2)("zeppelinProtestors") >= 80,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject41 || (level11_palindome_templateObject41 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(level11_palindome_templateObject42 || (level11_palindome_templateObject42 = level11_palindome_taggedTemplateLiteral(["cigarette lighter"]))))).macro(() => (0,property/* get */.U2)("camelSpit") >= 100 ? new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_palindome_templateObject43 || (level11_palindome_templateObject43 = level11_palindome_taggedTemplateLiteral(["%fn, spit on them!"])))).tryItem((0,template_string/* $item */.xr)(level11_palindome_templateObject44 || (level11_palindome_templateObject44 = level11_palindome_taggedTemplateLiteral(["yellow rocket"])))) : new dist_combat/* Macro */.LE(), (0,template_string/* $monster */.O4)(level11_palindome_templateObject45 || (level11_palindome_templateObject45 = level11_palindome_taggedTemplateLiteral(["Blue Oyster cultist"])))).killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject46 || (level11_palindome_templateObject46 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))).killItem((0,template_string/* $monster */.O4)(level11_palindome_templateObject47 || (level11_palindome_templateObject47 = level11_palindome_taggedTemplateLiteral(["Blue Oyster cultist"])))).killItem((0,template_string/* $monster */.O4)(level11_palindome_templateObject48 || (level11_palindome_templateObject48 = level11_palindome_taggedTemplateLiteral(["lynyrd skinner"])))).kill(),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  outfit: () => {
    var sleazeitems = (0,template_string/* $items */.vS)(level11_palindome_templateObject49 || (level11_palindome_templateObject49 = level11_palindome_taggedTemplateLiteral(["deck of lewd playing cards"])));
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject50 || (level11_palindome_templateObject50 = level11_palindome_taggedTemplateLiteral(["designer sweatpants"]))))) sleazeitems.push((0,template_string/* $item */.xr)(level11_palindome_templateObject51 || (level11_palindome_templateObject51 = level11_palindome_taggedTemplateLiteral(["designer sweatpants"]))));else if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject52 || (level11_palindome_templateObject52 = level11_palindome_taggedTemplateLiteral(["transparent pants"]))))) sleazeitems.push((0,template_string/* $item */.xr)(level11_palindome_templateObject53 || (level11_palindome_templateObject53 = level11_palindome_taggedTemplateLiteral(["transparent pants"]))));
    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_palindome_templateObject54 || (level11_palindome_templateObject54 = level11_palindome_taggedTemplateLiteral(["11-leaf clover"])))) > 1 || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_palindome_templateObject55 || (level11_palindome_templateObject55 = level11_palindome_taggedTemplateLiteral(["Lucky!"]))))) return {
      modifier: "sleaze dmg, sleaze spell dmg",
      equip: sleazeitems,
      skipDefaults: true
    };
    if ((0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(level11_palindome_templateObject56 || (level11_palindome_templateObject56 = level11_palindome_taggedTemplateLiteral(["Melodramedary"])))) && (0,property/* get */.U2)("camelSpit") >= 100) return {
      modifier: "-combat, item",
      familiar: (0,template_string/* $familiar */.HP)(level11_palindome_templateObject57 || (level11_palindome_templateObject57 = level11_palindome_taggedTemplateLiteral(["Melodramedary"]))),
      equip: sleazeitems
    };
    return {
      modifier: "-combat, sleaze dmg, sleaze spell dmg",
      equip: sleazeitems
    };
  },
  limit: {
    soft: 30
  }
}, {
  name: "Protesters Finish",
  after: ["Protesters"],
  completed: () => step("questL11Ron") >= 2,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject58 || (level11_palindome_templateObject58 = level11_palindome_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  combat: new src_combat.CombatStrategy().killHard((0,template_string/* $monster */.O4)(level11_palindome_templateObject59 || (level11_palindome_templateObject59 = level11_palindome_taggedTemplateLiteral(["The Nuge"])))),
  choices: {
    856: 1,
    857: 1,
    858: 1,
    866: 2,
    1432: 1
  },
  limit: {
    tries: 2
  },
  // If clovers were used before the intro adventure, we need to clear both the intro and closing advs here.
  freeaction: true
}, {
  name: "Zepplin",
  after: ["Protesters Finish"],
  completed: () => step("questL11Ron") >= 5,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject60 || (level11_palindome_templateObject60 = level11_palindome_taggedTemplateLiteral(["Red Zeppelin ticket"]))))) return;
    (0,external_kolmafia_.visitUrl)("woods.php");
    (0,external_kolmafia_.visitUrl)("shop.php?whichshop=blackmarket");
    (0,external_kolmafia_.visitUrl)("shop.php?whichshop=blackmarket&action=buyitem&whichrow=289&ajax=1&quantity=1");
    if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject61 || (level11_palindome_templateObject61 = level11_palindome_taggedTemplateLiteral(["Red Zeppelin ticket"]))))) throw "Unable to buy Red Zeppelin ticket; please buy manually";
  },
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject62 || (level11_palindome_templateObject62 = level11_palindome_taggedTemplateLiteral(["The Red Zeppelin"]))),
  combat: (_CombatStrategy$kill$ = (level11_palindome_CombatStrategy$kill = new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(level11_palindome_templateObject63 || (level11_palindome_templateObject63 = level11_palindome_taggedTemplateLiteral(["Ron \"The Weasel\" Copperhead"]))))).macro.apply(level11_palindome_CombatStrategy$kill, [() => {
    if ((0,property/* get */.U2)("_glarkCableUses") < 5) return new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(level11_palindome_templateObject64 || (level11_palindome_templateObject64 = level11_palindome_taggedTemplateLiteral(["glark cable"]))));else return new dist_combat/* Macro */.LE();
  }].concat(level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject65 || (level11_palindome_templateObject65 = level11_palindome_taggedTemplateLiteral(["man with the red buttons, red skeleton, red butler"]))))))).banish.apply(_CombatStrategy$kill$, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject66 || (level11_palindome_templateObject66 = level11_palindome_taggedTemplateLiteral(["Red Herring, Red Snapper"]))))).kill(),
  limit: {
    soft: 13
  }
}];
var Dome = [{
  name: "Talisman",
  after: ["Copperhead", "Zepplin", "Bat Snake", "Cold Snake", "Hot Snake Precastle", "Hot Snake Postcastle"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject67 || (level11_palindome_templateObject67 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))),
  do: () => (0,external_kolmafia_.create)((0,template_string/* $item */.xr)(level11_palindome_templateObject68 || (level11_palindome_templateObject68 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Palindome Dog",
  after: ["Talisman", "Manor/Bedroom Camera"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject69 || (level11_palindome_templateObject69 = level11_palindome_taggedTemplateLiteral(["photograph of a dog"])))) || step("questL11Palindome") >= 3,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject70 || (level11_palindome_templateObject70 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject71 || (level11_palindome_templateObject71 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject72 || (level11_palindome_templateObject72 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject73 || (level11_palindome_templateObject73 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item"
    };
  },
  combat: (_CombatStrategy$banis = (_CombatStrategy$banis2 = (level11_palindome_CombatStrategy = new src_combat.CombatStrategy()).banish.apply(level11_palindome_CombatStrategy, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject74 || (level11_palindome_templateObject74 = level11_palindome_taggedTemplateLiteral(["Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat"])))))).macro.apply(_CombatStrategy$banis2, [new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(level11_palindome_templateObject75 || (level11_palindome_templateObject75 = level11_palindome_taggedTemplateLiteral(["disposable instant camera"]))))].concat(level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject76 || (level11_palindome_templateObject76 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"]))))))).killItem.apply(_CombatStrategy$banis, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject77 || (level11_palindome_templateObject77 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"]))))).kill(),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Dudes",
  after: ["Palindome Dog"],
  completed: () => (0,lib/* have */.lf)(external_kolmafia_.Item.get(7262)) || step("questL11Palindome") >= 3,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject78 || (level11_palindome_templateObject78 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject79 || (level11_palindome_templateObject79 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject80 || (level11_palindome_templateObject80 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject81 || (level11_palindome_templateObject81 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item"
    };
  },
  combat: (_CombatStrategy$banis3 = (level11_palindome_CombatStrategy2 = new src_combat.CombatStrategy()).banish.apply(level11_palindome_CombatStrategy2, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject82 || (level11_palindome_templateObject82 = level11_palindome_taggedTemplateLiteral(["Evil Olive, Flock of Stab-bats, Taco Cat, Tan Gnat"])))))).killItem.apply(_CombatStrategy$banis3, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject83 || (level11_palindome_templateObject83 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"]))))).kill(),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Photos",
  after: ["Palindome Dudes"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject84 || (level11_palindome_templateObject84 = level11_palindome_taggedTemplateLiteral(["photograph of a red nugget"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject85 || (level11_palindome_templateObject85 = level11_palindome_taggedTemplateLiteral(["photograph of God"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject86 || (level11_palindome_templateObject86 = level11_palindome_taggedTemplateLiteral(["photograph of an ostrich egg"])))) || step("questL11Palindome") >= 3,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject87 || (level11_palindome_templateObject87 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  outfit: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject88 || (level11_palindome_templateObject88 = level11_palindome_taggedTemplateLiteral(["stunt nuts"]))))) return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject89 || (level11_palindome_templateObject89 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat"
    };
    return {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject90 || (level11_palindome_templateObject90 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
      modifier: "-combat, item"
    };
  },
  combat: (level11_palindome_CombatStrategy3 = new src_combat.CombatStrategy()).killItem.apply(level11_palindome_CombatStrategy3, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject91 || (level11_palindome_templateObject91 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"]))))),
  limit: {
    soft: 20
  }
}, {
  name: "Palindome Nuts",
  after: ["Palindome Photos"],
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject92 || (level11_palindome_templateObject92 = level11_palindome_taggedTemplateLiteral(["Inside the Palindome"]))),
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject93 || (level11_palindome_templateObject93 = level11_palindome_taggedTemplateLiteral(["stunt nuts"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject94 || (level11_palindome_templateObject94 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"])))) || step("questL11Palindome") >= 5,
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject95 || (level11_palindome_templateObject95 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"]))),
    modifier: "item"
  },
  combat: (level11_palindome_CombatStrategy4 = new src_combat.CombatStrategy()).killItem.apply(level11_palindome_CombatStrategy4, level11_palindome_toConsumableArray((0,template_string/* $monsters */.fr)(level11_palindome_templateObject96 || (level11_palindome_templateObject96 = level11_palindome_taggedTemplateLiteral(["Bob Racecar, Racecar Bob"]))))),
  limit: {
    soft: 20
  }
}, {
  name: "Alarm Gem",
  after: ["Palindome Dudes", "Palindome Photos"],
  completed: () => step("questL11Palindome") >= 3,
  do: () => {
    if ((0,lib/* have */.lf)(external_kolmafia_.Item.get(7262))) (0,external_kolmafia_.use)(external_kolmafia_.Item.get(7262));
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=palindome&action=pal_droffice");
    (0,external_kolmafia_.visitUrl)("choice.php?pwd=".concat((0,external_kolmafia_.myHash)(), "&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265"));
    (0,external_kolmafia_.use)(1, external_kolmafia_.Item.get(7270));
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=palindome&action=pal_mroffice");
    fillHp();
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject97 || (level11_palindome_templateObject97 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true,
  expectbeatenup: true
}, {
  name: "Grove",
  after: ["Alarm Gem"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject98 || (level11_palindome_templateObject98 = level11_palindome_taggedTemplateLiteral(["bird rib"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject99 || (level11_palindome_templateObject99 = level11_palindome_taggedTemplateLiteral(["lion oil"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject100 || (level11_palindome_templateObject100 = level11_palindome_taggedTemplateLiteral(["wet stew"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject101 || (level11_palindome_templateObject101 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"])))) || step("questL11Palindome") >= 5,
  do: (0,template_string/* $location */.PG)(level11_palindome_templateObject102 || (level11_palindome_templateObject102 = level11_palindome_taggedTemplateLiteral(["Whitey's Grove"]))),
  outfit: {
    modifier: "50 combat, item"
  },
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level11_palindome_templateObject103 || (level11_palindome_templateObject103 = level11_palindome_taggedTemplateLiteral(["whitesnake"])))).killItem((0,template_string/* $monster */.O4)(level11_palindome_templateObject104 || (level11_palindome_templateObject104 = level11_palindome_taggedTemplateLiteral(["white lion"])))),
  limit: {
    soft: 15
  }
}, {
  name: "Open Alarm",
  after: ["Alarm Gem", "Palindome Nuts", "Grove"],
  completed: () => step("questL11Palindome") >= 5,
  do: () => {
    if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_palindome_templateObject105 || (level11_palindome_templateObject105 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"]))))) (0,external_kolmafia_.create)((0,template_string/* $item */.xr)(level11_palindome_templateObject106 || (level11_palindome_templateObject106 = level11_palindome_taggedTemplateLiteral(["wet stunt nut stew"]))));
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=palindome&action=pal_mrlabel");
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject107 || (level11_palindome_templateObject107 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var PalindomeQuest = {
  name: "Palindome",
  tasks: [].concat(Copperhead, Zepplin, Dome, [{
    name: "Boss",
    after: ["Open Alarm"],
    completed: () => step("questL11Palindome") === 999,
    do: () => {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=palindome&action=pal_drlabel");
      (0,external_kolmafia_.runChoice)(-1);
    },
    outfit: {
      equip: (0,template_string/* $items */.vS)(level11_palindome_templateObject108 || (level11_palindome_templateObject108 = level11_palindome_taggedTemplateLiteral(["Talisman o' Namsilat, Mega Gem"])))
    },
    choices: {
      131: 1
    },
    combat: new src_combat.CombatStrategy(true).kill(),
    limit: {
      tries: 1
    }
  }])
};
;// CONCATENATED MODULE: ./src/tasks/level11.ts
var level11_templateObject, level11_templateObject2, level11_templateObject3, level11_templateObject4, level11_templateObject5, level11_templateObject6, level11_templateObject7, level11_templateObject8, level11_templateObject9, level11_templateObject10, level11_templateObject11, level11_templateObject12, level11_templateObject13, level11_templateObject14, level11_templateObject15, level11_templateObject16, level11_templateObject17, level11_templateObject18, level11_templateObject19, _CombatStrategy$ignor, level11_templateObject20, level11_templateObject21, level11_templateObject22, level11_templateObject23, level11_templateObject24, level11_templateObject25, level11_templateObject26, level11_templateObject27, level11_templateObject28, level11_templateObject29, level11_templateObject30, level11_templateObject31, level11_templateObject32, level11_templateObject33, level11_templateObject34, level11_templateObject35, level11_templateObject36, level11_templateObject37, level11_templateObject38, level11_templateObject39, level11_templateObject40, level11_templateObject41, level11_templateObject42, level11_templateObject43, level11_templateObject44, level11_templateObject45, level11_templateObject46, level11_templateObject47, level11_templateObject48, level11_templateObject49, level11_templateObject50, level11_templateObject51, level11_templateObject52, level11_templateObject53, level11_templateObject54, level11_templateObject55, level11_templateObject56, level11_templateObject57, level11_templateObject58, level11_templateObject59, level11_templateObject60, level11_templateObject61, level11_templateObject62, level11_templateObject63, level11_templateObject64, level11_templateObject65, level11_templateObject66, level11_templateObject67, level11_templateObject68, level11_templateObject69, level11_templateObject70, level11_templateObject71, level11_templateObject72, level11_templateObject73, level11_templateObject74, level11_templateObject75, level11_templateObject76, level11_templateObject77, level11_templateObject78, level11_templateObject79, level11_templateObject80, level11_templateObject81, level11_templateObject82, level11_templateObject83, level11_templateObject84, level11_templateObject85, level11_templateObject86, level11_templateObject87, level11_templateObject88, level11_templateObject89, level11_templateObject90, level11_templateObject91, level11_templateObject92, level11_templateObject93, level11_templateObject94, level11_templateObject95, level11_templateObject96, level11_templateObject97, level11_templateObject98, level11_templateObject99, level11_templateObject100, level11_templateObject101, level11_templateObject102, level11_templateObject103, level11_templateObject104;

function level11_toConsumableArray(arr) { return level11_arrayWithoutHoles(arr) || level11_iterableToArray(arr) || level11_unsupportedIterableToArray(arr) || level11_nonIterableSpread(); }

function level11_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function level11_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return level11_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return level11_arrayLikeToArray(o, minLen); }

function level11_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function level11_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return level11_arrayLikeToArray(arr); }

function level11_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function level11_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var Diary = [{
  name: "Forest",
  after: ["Start"],
  completed: () => step("questL11Black") >= 2,
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject || (level11_templateObject = level11_taggedTemplateLiteral(["MayDay\u2122 supply package"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_templateObject2 || (level11_templateObject2 = level11_taggedTemplateLiteral(["MayDay\u2122 supply package"]))));
  },
  do: (0,template_string/* $location */.PG)(level11_templateObject3 || (level11_templateObject3 = level11_taggedTemplateLiteral(["The Black Forest"]))),
  post: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject4 || (level11_templateObject4 = level11_taggedTemplateLiteral(["Really Quite Poisoned"]))))) (0,lib/* uneffect */.Lo)((0,template_string/* $effect */._G)(level11_templateObject5 || (level11_templateObject5 = level11_taggedTemplateLiteral(["Really Quite Poisoned"]))));
  },
  outfit: state => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject6 || (level11_templateObject6 = level11_taggedTemplateLiteral(["reassembled blackbird"]))))) {
      return {
        equip: (0,template_string/* $items */.vS)(level11_templateObject7 || (level11_templateObject7 = level11_taggedTemplateLiteral(["blackberry galoshes"]))),
        modifier: "50 combat 5max, -1ML"
      };
    } else if (state.absorb.isReprocessTarget((0,template_string/* $monster */.O4)(level11_templateObject8 || (level11_templateObject8 = level11_taggedTemplateLiteral(["black magic woman"])))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(level11_templateObject9 || (level11_templateObject9 = level11_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && state.orb.prediction((0,template_string/* $location */.PG)(level11_templateObject10 || (level11_templateObject10 = level11_taggedTemplateLiteral(["The Black Forest"])))) === (0,template_string/* $monster */.O4)(level11_templateObject11 || (level11_templateObject11 = level11_taggedTemplateLiteral(["black magic woman"])))) {
      // Swoop in for a single adventure to reprocess the black magic woman
      return {
        equip: (0,template_string/* $items */.vS)(level11_templateObject12 || (level11_templateObject12 = level11_taggedTemplateLiteral(["blackberry galoshes, miniature crystal ball"]))),
        familiar: (0,template_string/* $familiar */.HP)(level11_templateObject13 || (level11_templateObject13 = level11_taggedTemplateLiteral(["Grey Goose"]))),
        modifier: "50 combat 5max, -1ML"
      };
    } else {
      return {
        equip: (0,template_string/* $items */.vS)(level11_templateObject14 || (level11_templateObject14 = level11_taggedTemplateLiteral(["blackberry galoshes"]))),
        familiar: (0,template_string/* $familiar */.HP)(level11_templateObject15 || (level11_templateObject15 = level11_taggedTemplateLiteral(["Reassembled Blackbird"]))),
        modifier: "50 combat 5max, item, -1ML"
      };
    }
  },
  choices: {
    923: 1,
    924: () => {
      if (!(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(level11_templateObject16 || (level11_templateObject16 = level11_taggedTemplateLiteral(["Shorter-Order Cook"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject17 || (level11_templateObject17 = level11_taggedTemplateLiteral(["beehive"]))))) return 3;
      if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject18 || (level11_templateObject18 = level11_taggedTemplateLiteral(["blackberry galoshes"])))) && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject19 || (level11_templateObject19 = level11_taggedTemplateLiteral(["blackberry"])))) >= 3) return 2;
      return 1;
    },
    928: 4,
    1018: 1,
    1019: 1
  },
  combat: (_CombatStrategy$ignor = new src_combat.CombatStrategy().ignore((0,template_string/* $monster */.O4)(level11_templateObject20 || (level11_templateObject20 = level11_taggedTemplateLiteral(["blackberry bush"]))))).killItem.apply(_CombatStrategy$ignor, level11_toConsumableArray((0,template_string/* $monsters */.fr)(level11_templateObject21 || (level11_templateObject21 = level11_taggedTemplateLiteral(["black adder, black panther"]))))).kill(),
  orbtargets: () => undefined,
  // do not dodge anything with orb
  limit: {
    soft: 15
  }
}, {
  name: "Buy Documents",
  after: ["Forest"],
  ready: () => (0,external_kolmafia_.myMeat)() >= 5000,
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject22 || (level11_templateObject22 = level11_taggedTemplateLiteral(["forged identification documents"])))) || step("questL11Black") >= 4,
  do: () => {
    (0,external_kolmafia_.visitUrl)("woods.php");
    (0,external_kolmafia_.visitUrl)("shop.php?whichshop=blackmarket");
    (0,external_kolmafia_.visitUrl)("shop.php?whichshop=blackmarket&action=buyitem&whichrow=281&ajax=1&quantity=1");
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(level11_templateObject23 || (level11_templateObject23 = level11_taggedTemplateLiteral(["designer sweatpants"])))
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Diary",
  after: ["Buy Documents", "Misc/Unlock Beach"],
  ready: () => (0,external_kolmafia_.myMeat)() >= 500,
  completed: () => step("questL11Black") >= 4,
  do: (0,template_string/* $location */.PG)(level11_templateObject24 || (level11_templateObject24 = level11_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
  choices: {
    793: 1
  },
  limit: {
    tries: 1
  }
}];
var Desert = [{
  name: "Scrip",
  after: ["Misc/Unlock Beach"],
  ready: () => (0,external_kolmafia_.myMeat)() >= 6000 || step("questL11Black") >= 4 && (0,external_kolmafia_.myMeat)() >= 500,
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject25 || (level11_templateObject25 = level11_taggedTemplateLiteral(["Shore Inc. Ship Trip Scrip"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject26 || (level11_templateObject26 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  do: (0,template_string/* $location */.PG)(level11_templateObject27 || (level11_templateObject27 = level11_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
  choices: {
    793: 1
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Compass",
  after: ["Misc/Unlock Beach", "Scrip"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject28 || (level11_templateObject28 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  do: () => (0,external_kolmafia_.buy)((0,template_string/* $coinmaster */.$L)(level11_templateObject29 || (level11_templateObject29 = level11_taggedTemplateLiteral(["The Shore, Inc. Gift Shop"]))), 1, (0,template_string/* $item */.xr)(level11_templateObject30 || (level11_templateObject30 = level11_taggedTemplateLiteral(["UV-resistant compass"])))),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Oasis",
  after: ["Compass"],
  completed: () => (0,property/* get */.U2)("desertExploration") >= 100,
  ready: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject31 || (level11_templateObject31 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) && (0,property/* get */.U2)("desertExploration") > 0,
  do: (0,template_string/* $location */.PG)(level11_templateObject32 || (level11_templateObject32 = level11_taggedTemplateLiteral(["The Oasis"]))),
  limit: {
    soft: 10
  }
}, {
  name: "Oasis Drum",
  after: ["Compass"],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject33 || (level11_templateObject33 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject34 || (level11_templateObject34 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15,
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject35 || (level11_templateObject35 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => (0,property/* get */.U2)("desertExploration") >= 100 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject36 || (level11_templateObject36 = level11_taggedTemplateLiteral(["drum machine"])))) || ((0,property/* get */.U2)("gnasirProgress") & 16) !== 0,
  prepare: state => {
    if (state.absorb.hasReprocessTargets((0,template_string/* $location */.PG)(level11_templateObject37 || (level11_templateObject37 = level11_taggedTemplateLiteral(["The Oasis"]))))) {
      // Use ghost dog chow to prepare to reprocess Blur without needing arena adventures
      while ((0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(level11_templateObject38 || (level11_templateObject38 = level11_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject39 || (level11_templateObject39 = level11_taggedTemplateLiteral(["Ghost Dog Chow"]))))) {
        (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_templateObject40 || (level11_templateObject40 = level11_taggedTemplateLiteral(["Ghost Dog Chow"]))));
      }
    }
  },
  do: (0,template_string/* $location */.PG)(level11_templateObject41 || (level11_templateObject41 = level11_taggedTemplateLiteral(["The Oasis"]))),
  combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(level11_templateObject42 || (level11_templateObject42 = level11_taggedTemplateLiteral(["blur"])))),
  outfit: {
    modifier: "item"
  },
  limit: {
    soft: 10
  },
  post: () => {
    if (!(0,template_string/* $location */.PG)(level11_templateObject43 || (level11_templateObject43 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))).noncombatQueue.includes("A Sietch in Time")) return;

    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject44 || (level11_templateObject44 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15 || ((0,property/* get */.U2)("gnasirProgress") & 1) === 0 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject45 || (level11_templateObject45 = level11_taggedTemplateLiteral(["stone rose"]))))) {
      var res = (0,external_kolmafia_.visitUrl)("place.php?whichplace=desertbeach&action=db_gnasir");

      while (res.includes("value=2")) {
        res = (0,external_kolmafia_.runChoice)(2);
      }

      (0,external_kolmafia_.runChoice)(1);
    }

    (0,external_kolmafia_.cliExecute)("use * desert sightseeing pamphlet");
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject46 || (level11_templateObject46 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject47 || (level11_templateObject47 = level11_taggedTemplateLiteral(["drum machine"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_templateObject48 || (level11_templateObject48 = level11_taggedTemplateLiteral(["drum machine"]))));
  }
}, {
  name: "Desert",
  after: ["Diary", "Compass"],
  acquire: [{
    item: (0,template_string/* $item */.xr)(level11_templateObject49 || (level11_templateObject49 = level11_taggedTemplateLiteral(["can of black paint"]))),
    useful: () => ((0,property/* get */.U2)("gnasirProgress") & 2) === 0
  }],
  ready: () => ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject50 || (level11_templateObject50 = level11_taggedTemplateLiteral(["can of black paint"])))) || (0,external_kolmafia_.myMeat)() >= 1000 || ((0,property/* get */.U2)("gnasirProgress") & 2) !== 0) && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject51 || (level11_templateObject51 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) < 15 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject52 || (level11_templateObject52 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && ((0,property/* get */.U2)("desertExploration") === 0 && !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject53 || (level11_templateObject53 = level11_taggedTemplateLiteral(["A Girl Named Sue"])))) || (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject54 || (level11_templateObject54 = level11_taggedTemplateLiteral(["Ultrahydrated"]))))),
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject55 || (level11_templateObject55 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) ? OverridePriority.Effect : OverridePriority.None,
  completed: () => (0,property/* get */.U2)("desertExploration") >= 100,
  do: (0,template_string/* $location */.PG)(level11_templateObject56 || (level11_templateObject56 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))),
  outfit: state => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject57 || (level11_templateObject57 = level11_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 20 && !(0,property/* get */.U2)("fireExtinguisherDesertUsed") && (0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject58 || (level11_templateObject58 = level11_taggedTemplateLiteral(["Ultrahydrated"]))))) return {
      equip: (0,template_string/* $items */.vS)(level11_templateObject59 || (level11_templateObject59 = level11_taggedTemplateLiteral(["industrial fire extinguisher, UV-resistant compass, dromedary drinking helmet"]))),
      familiar: (0,template_string/* $familiar */.HP)(level11_templateObject60 || (level11_templateObject60 = level11_taggedTemplateLiteral(["Melodramedary"])))
    };else if (state.absorb.isReprocessTarget((0,template_string/* $monster */.O4)(level11_templateObject61 || (level11_templateObject61 = level11_taggedTemplateLiteral(["swarm of fire ants"])))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(level11_templateObject62 || (level11_templateObject62 = level11_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject63 || (level11_templateObject63 = level11_taggedTemplateLiteral(["miniature crystal ball"]))))) {
      if (state.orb.prediction((0,template_string/* $location */.PG)(level11_templateObject64 || (level11_templateObject64 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"])))) === (0,template_string/* $monster */.O4)(level11_templateObject65 || (level11_templateObject65 = level11_taggedTemplateLiteral(["swarm of fire ants"])))) {
        // Swoop in for a single adventure to reprocess the fire ants
        return {
          equip: (0,template_string/* $items */.vS)(level11_templateObject66 || (level11_templateObject66 = level11_taggedTemplateLiteral(["UV-resistant compass, miniature crystal ball"]))),
          familiar: (0,template_string/* $familiar */.HP)(level11_templateObject67 || (level11_templateObject67 = level11_taggedTemplateLiteral(["Grey Goose"])))
        };
      } else {
        // Wait for the orb to predict swarm of fire ants
        return {
          equip: (0,template_string/* $items */.vS)(level11_templateObject68 || (level11_templateObject68 = level11_taggedTemplateLiteral(["UV-resistant compass, miniature crystal ball"]))),
          familiar: (0,template_string/* $familiar */.HP)(level11_templateObject69 || (level11_templateObject69 = level11_taggedTemplateLiteral(["Melodramedary"])))
        };
      }
    } else return {
      equip: (0,template_string/* $items */.vS)(level11_templateObject70 || (level11_templateObject70 = level11_taggedTemplateLiteral(["UV-resistant compass, dromedary drinking helmet"]))),
      familiar: (0,template_string/* $familiar */.HP)(level11_templateObject71 || (level11_templateObject71 = level11_taggedTemplateLiteral(["Melodramedary"])))
    };
  },
  combat: new src_combat.CombatStrategy().macro(() => {
    if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(level11_templateObject72 || (level11_templateObject72 = level11_taggedTemplateLiteral(["Ultrahydrated"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject73 || (level11_templateObject73 = level11_taggedTemplateLiteral(["industrial fire extinguisher"])))) && (0,property/* get */.U2)("_fireExtinguisherCharge") >= 20 && !(0,property/* get */.U2)("fireExtinguisherDesertUsed")) return new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_templateObject74 || (level11_templateObject74 = level11_taggedTemplateLiteral(["Fire Extinguisher: Zone Specific"]))));else return new dist_combat/* Macro */.LE();
  }).kill(),
  post: () => {
    if (!(0,template_string/* $location */.PG)(level11_templateObject75 || (level11_templateObject75 = level11_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))).noncombatQueue.includes("A Sietch in Time")) return;
    if (((0,property/* get */.U2)("gnasirProgress") & 16) > 0) return;

    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject76 || (level11_templateObject76 = level11_taggedTemplateLiteral(["worm-riding manual page"])))) >= 15 || ((0,property/* get */.U2)("gnasirProgress") & 1) === 0 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject77 || (level11_templateObject77 = level11_taggedTemplateLiteral(["stone rose"])))) || ((0,property/* get */.U2)("gnasirProgress") & 2) === 0 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject78 || (level11_templateObject78 = level11_taggedTemplateLiteral(["can of black paint"])))) || ((0,property/* get */.U2)("gnasirProgress") & 4) === 0 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject79 || (level11_templateObject79 = level11_taggedTemplateLiteral(["killing jar"]))))) {
      var res = (0,external_kolmafia_.visitUrl)("place.php?whichplace=desertbeach&action=db_gnasir");

      while (res.includes("value=2")) {
        res = (0,external_kolmafia_.runChoice)(2);
      }

      (0,external_kolmafia_.runChoice)(1);
    }

    (0,external_kolmafia_.cliExecute)("use * desert sightseeing pamphlet");
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject80 || (level11_templateObject80 = level11_taggedTemplateLiteral(["worm-riding hooks"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject81 || (level11_templateObject81 = level11_taggedTemplateLiteral(["drum machine"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(level11_templateObject82 || (level11_templateObject82 = level11_taggedTemplateLiteral(["drum machine"]))));
  },
  limit: {
    soft: 30
  },
  choices: {
    805: 1
  }
}];

function rotatePyramid(goal) {
  var ratchets = (goal - (0,property/* get */.U2)("pyramidPosition") + 5) % 5;
  var to_buy = ratchets - (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject83 || (level11_templateObject83 = level11_taggedTemplateLiteral(["tomb ratchet"])))) - (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject84 || (level11_templateObject84 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))));

  if (to_buy > 0) {
    (0,external_kolmafia_.buy)((0,template_string/* $item */.xr)(level11_templateObject85 || (level11_templateObject85 = level11_taggedTemplateLiteral(["tomb ratchet"]))), to_buy);
  }

  (0,external_kolmafia_.visitUrl)("place.php?whichplace=pyramid&action=pyramid_control");

  for (var i = 0; i < ratchets; i++) {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject86 || (level11_templateObject86 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))))) {
      (0,external_kolmafia_.visitUrl)("choice.php?whichchoice=929&option=1&pwd");
    } else {
      (0,external_kolmafia_.visitUrl)("choice.php?whichchoice=929&option=2&pwd");
    }
  }

  if ((0,property/* get */.U2)("pyramidPosition") !== goal) throw "Failed to rotate pyramid to ".concat(goal);
  (0,external_kolmafia_.visitUrl)("choice.php?whichchoice=929&option=5&pwd");
}

var Pyramid = [{
  name: "Open Pyramid",
  after: ["Desert", "Oasis", "Oasis Drum", "Manor/Boss", "Palindome/Boss", "Hidden City/Boss"],
  completed: () => step("questL11Pyramid") >= 0,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=desertbeach&action=db_pyramid1"),
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  name: "Upper Chamber",
  after: ["Open Pyramid"],
  completed: () => step("questL11Pyramid") >= 1,
  do: (0,template_string/* $location */.PG)(level11_templateObject87 || (level11_templateObject87 = level11_taggedTemplateLiteral(["The Upper Chamber"]))),
  outfit: {
    modifier: "+combat"
  },
  limit: {
    turns: 6
  }
}, {
  name: "Middle Chamber",
  after: ["Upper Chamber"],
  completed: () => {
    if (!(0,property/* get */.U2)("controlRoomUnlock")) return false;
    if ((0,property/* get */.U2)("pyramidBombUsed")) return true;
    var ratchets = (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject88 || (level11_templateObject88 = level11_taggedTemplateLiteral(["tomb ratchet"])))) + (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(level11_templateObject89 || (level11_templateObject89 = level11_taggedTemplateLiteral(["crumbling wooden wheel"]))));
    var needed = (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject90 || (level11_templateObject90 = level11_taggedTemplateLiteral(["ancient bomb"])))) ? 3 : (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject91 || (level11_templateObject91 = level11_taggedTemplateLiteral(["ancient bronze token"])))) ? 7 : 10;
    return ratchets >= needed;
  },
  do: (0,template_string/* $location */.PG)(level11_templateObject92 || (level11_templateObject92 = level11_taggedTemplateLiteral(["The Middle Chamber"]))),
  limit: {
    soft: 25
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(level11_templateObject93 || (level11_templateObject93 = level11_taggedTemplateLiteral(["tangle of rat tails"])))), (0,template_string/* $monster */.O4)(level11_templateObject94 || (level11_templateObject94 = level11_taggedTemplateLiteral(["tomb rat"])))).killItem((0,template_string/* $monster */.O4)(level11_templateObject95 || (level11_templateObject95 = level11_taggedTemplateLiteral(["tomb rat"]))), (0,template_string/* $monster */.O4)(level11_templateObject96 || (level11_templateObject96 = level11_taggedTemplateLiteral(["tomb rat king"])))).banish((0,template_string/* $monster */.O4)(level11_templateObject97 || (level11_templateObject97 = level11_taggedTemplateLiteral(["tomb asp"]))), (0,template_string/* $monster */.O4)(level11_templateObject98 || (level11_templateObject98 = level11_taggedTemplateLiteral(["tomb servant"])))),
  outfit: {
    modifier: "item"
  },
  delay: 9
}, {
  name: "Get Token",
  after: ["Middle Chamber"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject99 || (level11_templateObject99 = level11_taggedTemplateLiteral(["ancient bronze token"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject100 || (level11_templateObject100 = level11_taggedTemplateLiteral(["ancient bomb"])))) || (0,property/* get */.U2)("pyramidBombUsed"),
  do: () => rotatePyramid(4),
  limit: {
    tries: 1
  }
}, {
  name: "Get Bomb",
  after: ["Get Token"],
  completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject101 || (level11_templateObject101 = level11_taggedTemplateLiteral(["ancient bomb"])))) || (0,property/* get */.U2)("pyramidBombUsed"),
  do: () => rotatePyramid(3),
  limit: {
    tries: 1
  }
}, {
  name: "Use Bomb",
  after: ["Get Bomb"],
  completed: () => (0,property/* get */.U2)("pyramidBombUsed"),
  do: () => rotatePyramid(1),
  limit: {
    tries: 1
  }
}, {
  name: "Boss",
  after: ["Use Bomb"],
  completed: () => step("questL11Pyramid") === 999,
  do: () => (0,external_kolmafia_.visitUrl)("place.php?whichplace=pyramid&action=pyramid_state1a"),
  outfit: () => {
    if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(level11_templateObject102 || (level11_templateObject102 = level11_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return {
      familiar: (0,template_string/* $familiar */.HP)(level11_templateObject103 || (level11_templateObject103 = level11_taggedTemplateLiteral(["Gelatinous Cubeling"])))
    }; // Ensure we get equipment

    return {};
  },
  combat: new src_combat.CombatStrategy(true).macro(new dist_combat/* Macro */.LE().while_("!mpbelow 20", new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(level11_templateObject104 || (level11_templateObject104 = level11_taggedTemplateLiteral(["Infinite Loop"]))))).attack().repeat()).kill(),
  limit: {
    tries: 1
  }
}];
var MacguffinQuest = {
  name: "Macguffin",
  tasks: [{
    name: "Start",
    after: [],
    ready: () => atLevel(11),
    priority: () => OverridePriority.Free,
    // Always start this quest ASAP, it is key for routing
    completed: () => step("questL11MacGuffin") !== -1,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }].concat(Diary, Desert, Pyramid, [{
    name: "Finish",
    after: ["Boss"],
    priority: () => councilSafe() ? OverridePriority.Free : OverridePriority.BadMood,
    completed: () => step("questL11MacGuffin") === 999,
    do: () => (0,external_kolmafia_.visitUrl)("council.php"),
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./node_modules/libram/dist/logger.js
function logger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function logger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function logger_createClass(Constructor, protoProps, staticProps) { if (protoProps) logger_defineProperties(Constructor.prototype, protoProps); if (staticProps) logger_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function logger_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var defaultHandlers = {
  info: message => (0,external_kolmafia_.printHtml)("<b>[Libram]</b> ".concat(message)),
  warning: message => (0,external_kolmafia_.printHtml)("<span style=\"background: orange; color: white;\"><b>[Libram]</b> ".concat(message, "</span>")),
  error: _error => (0,external_kolmafia_.printHtml)("<span style=\"background: red; color: white;\"><b>[Libram]</b> ".concat(_error.toString(), "</span>"))
};

var Logger = /*#__PURE__*/function () {
  function Logger() {
    logger_classCallCheck(this, Logger);

    logger_defineProperty(this, "handlers", defaultHandlers);
  }

  logger_createClass(Logger, [{
    key: "setHandler",
    value: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function setHandler(level, callback) {
      this.handlers[level] = callback;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "log",
    value: function log(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function info(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function warning(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function error(message) {
      this.log("error", message);
    }
  }]);

  return Logger;
}();

/* harmony default export */ const logger = (new Logger());
;// CONCATENATED MODULE: ./node_modules/libram/dist/maximize.js
var maximize_templateObject, maximize_templateObject2, maximize_templateObject3, maximize_templateObject4, maximize_templateObject5, maximize_templateObject6, maximize_templateObject7, maximize_templateObject8, maximize_templateObject9, maximize_templateObject10, maximize_templateObject11, maximize_templateObject12, maximize_templateObject13, maximize_templateObject14, maximize_templateObject15, maximize_templateObject16, maximize_templateObject17, maximize_templateObject18, maximize_templateObject19, maximize_templateObject20, maximize_templateObject21, maximize_templateObject22, maximize_templateObject23, maximize_templateObject24, maximize_templateObject25, maximize_templateObject26, maximize_templateObject27, maximize_templateObject28, maximize_templateObject29, maximize_templateObject30, maximize_templateObject31, maximize_templateObject32, maximize_templateObject33, maximize_templateObject34, maximize_templateObject35, maximize_templateObject36, maximize_templateObject37, maximize_templateObject38, maximize_templateObject39, maximize_templateObject40, maximize_templateObject41, maximize_templateObject42, maximize_templateObject43, maximize_templateObject44;

function maximize_slicedToArray(arr, i) { return maximize_arrayWithHoles(arr) || maximize_iterableToArrayLimit(arr, i) || maximize_unsupportedIterableToArray(arr, i) || maximize_nonIterableRest(); }

function maximize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function maximize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function maximize_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = maximize_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function maximize_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function maximize_createClass(Constructor, protoProps, staticProps) { if (protoProps) maximize_defineProperties(Constructor.prototype, protoProps); if (staticProps) maximize_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function maximize_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function maximize_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function maximize_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function maximize_toConsumableArray(arr) { return maximize_arrayWithoutHoles(arr) || maximize_iterableToArray(arr) || maximize_unsupportedIterableToArray(arr) || maximize_nonIterableSpread(); }

function maximize_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function maximize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return maximize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return maximize_arrayLikeToArray(o, minLen); }

function maximize_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function maximize_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return maximize_arrayLikeToArray(arr); }

function maximize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */

function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo;

  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(maximize_toConsumableArray(defaultOptions.forceEquip), maximize_toConsumableArray((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(maximize_toConsumableArray(defaultOptions.preventEquip), maximize_toConsumableArray((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(item => {
      var _addendums$forceEquip2;

      return !defaultOptions.forceEquip.includes(item) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item));
    }),
    bonusEquip: new Map([].concat(maximize_toConsumableArray(defaultOptions.bonusEquip), maximize_toConsumableArray((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(maximize_toConsumableArray(defaultOptions.preventSlot), maximize_toConsumableArray((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : []))
  };
}

var defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: []
};
/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */

function setDefaultMaximizeOptions(options) {
  Object.assign(defaultMaximizeOptions, options);
} // Subset of slots that are valid for caching.

var cachedSlots = (0,template_string/* $slots */.ei)(maximize_templateObject || (maximize_templateObject = maximize_taggedTemplateLiteral(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"])));

var CacheEntry = /*#__PURE__*/maximize_createClass(function CacheEntry(equipment, rider, familiar, canEquipItemCount) {
  maximize_classCallCheck(this, CacheEntry);

  maximize_defineProperty(this, "equipment", void 0);

  maximize_defineProperty(this, "rider", void 0);

  maximize_defineProperty(this, "familiar", void 0);

  maximize_defineProperty(this, "canEquipItemCount", void 0);

  this.equipment = equipment;
  this.rider = rider;
  this.familiar = familiar;
  this.canEquipItemCount = canEquipItemCount;
});

var _outfitSlots = /*#__PURE__*/new WeakMap();

var _useHistory = /*#__PURE__*/new WeakMap();

var _maxSize = /*#__PURE__*/new WeakMap();

var OutfitLRUCache = /*#__PURE__*/function () {
  // Current outfits allocated
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  function OutfitLRUCache(maxSize) {
    maximize_classCallCheck(this, OutfitLRUCache);

    _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _useHistory, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _maxSize, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maxSize, maxSize);
  }

  maximize_createClass(OutfitLRUCache, [{
    key: "checkConsistent",
    value: function checkConsistent() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory)).sort().every((value, index) => value === index)) {
        throw new Error("Outfit cache consistency failed.");
      }
    }
  }, {
    key: "promote",
    value: function promote(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(maximize_toConsumableArray(_classPrivateFieldGet(this, _useHistory).filter(i => i !== index))));

      this.checkConsistent();
    }
  }, {
    key: "get",
    value: function get(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);

      if (index < 0) return undefined;
      this.promote(index);
      return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function insert(key) {
      var lastUseIndex = undefined;

      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop();

        if (lastUseIndex === undefined) {
          throw new Error("Outfit cache consistency failed.");
        }

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex);

        _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key;
        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;

        _classPrivateFieldGet(this, _useHistory).splice(0, 0, index);

        this.checkConsistent();
        return "".concat(OutfitLRUCache.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }]);

  return OutfitLRUCache;
}();
/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */


maximize_defineProperty(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");

function saveOutfit(name) {
  (0,external_kolmafia_.cliExecute)("outfit save ".concat(name));
} // Objective cache entries.


var cachedObjectives = {}; // Outfit cache entries. Keep 6 by default to avoid cluttering list.

var outfitCache = new OutfitLRUCache(6); // Cache to prevent rescanning all items unnecessarily

var cachedStats = [0, 0, 0];
var cachedCanEquipItemCount = 0;
/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */

function canEquipItemCount() {
  var stats = (0,template_string/* $stats */.gw)(maximize_templateObject2 || (maximize_templateObject2 = maximize_taggedTemplateLiteral(["Muscle, Mysticality, Moxie"]))).map(stat => Math.min((0,external_kolmafia_.myBasestat)(stat), 300));

  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }

  cachedStats = stats;
  cachedCanEquipItemCount = external_kolmafia_.Item.all().filter(item => (0,external_kolmafia_.canEquip)(item)).length;
  return cachedCanEquipItemCount;
}
/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */


function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];

  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && (0,external_kolmafia_.myFamiliar)() !== entry.familiar) {
    logger.warning("Equipment found in maximize cache but familiar is different.");
    return null;
  }

  if (options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount()) {
    logger.warning("Equipment found in maximize cache but equippable item list is out of date.");
    return null;
  }

  return entry;
}
/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */


function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : undefined;

  if (outfitName) {
    if (!(0,external_kolmafia_.isWearingOutfit)(outfitName)) {
      (0,external_kolmafia_.outfit)(outfitName);
    }

    var familiarEquip = entry.equipment.get((0,template_string/* $slot */.Jh)(maximize_templateObject3 || (maximize_templateObject3 = maximize_taggedTemplateLiteral(["familiar"]))));
    if (familiarEquip) (0,external_kolmafia_.equip)((0,template_string/* $slot */.Jh)(maximize_templateObject4 || (maximize_templateObject4 = maximize_taggedTemplateLiteral(["familiar"]))), familiarEquip);
  } else {
    var _iterator = maximize_createForOfIteratorHelper(entry.equipment),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = maximize_slicedToArray(_step.value, 2),
            slot = _step$value[0],
            item = _step$value[1];

        if ((0,external_kolmafia_.equippedItem)(slot) !== item && (0,external_kolmafia_.availableAmount)(item) > 0) {
          (0,external_kolmafia_.equip)(slot, item);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);

      logger.info("Saving equipment to outfit ".concat(_outfitName, "."));
      saveOutfit(_outfitName);
    }
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject5 || (maximize_templateObject5 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject6 || (maximize_templateObject6 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    (0,external_kolmafia_.enthroneFamiliar)(entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject7 || (maximize_templateObject7 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) || (0,template_string/* $familiar */.HP)(maximize_templateObject8 || (maximize_templateObject8 = maximize_taggedTemplateLiteral(["none"]))));
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject9 || (maximize_templateObject9 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject10 || (maximize_templateObject10 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    (0,external_kolmafia_.bjornifyFamiliar)(entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject11 || (maximize_templateObject11 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) || (0,template_string/* $familiar */.HP)(maximize_templateObject12 || (maximize_templateObject12 = maximize_taggedTemplateLiteral(["none"]))));
  }
}

var slotStructure = [(0,template_string/* $slots */.ei)(maximize_templateObject13 || (maximize_templateObject13 = maximize_taggedTemplateLiteral(["hat"]))), (0,template_string/* $slots */.ei)(maximize_templateObject14 || (maximize_templateObject14 = maximize_taggedTemplateLiteral(["back"]))), (0,template_string/* $slots */.ei)(maximize_templateObject15 || (maximize_templateObject15 = maximize_taggedTemplateLiteral(["shirt"]))), (0,template_string/* $slots */.ei)(maximize_templateObject16 || (maximize_templateObject16 = maximize_taggedTemplateLiteral(["weapon, off-hand"]))), (0,template_string/* $slots */.ei)(maximize_templateObject17 || (maximize_templateObject17 = maximize_taggedTemplateLiteral(["pants"]))), (0,template_string/* $slots */.ei)(maximize_templateObject18 || (maximize_templateObject18 = maximize_taggedTemplateLiteral(["acc1, acc2, acc3"]))), (0,template_string/* $slots */.ei)(maximize_templateObject19 || (maximize_templateObject19 = maximize_taggedTemplateLiteral(["familiar"])))];
/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */

function verifyCached(entry) {
  var success = true;

  var _iterator2 = maximize_createForOfIteratorHelper(slotStructure),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var slotGroup = _step2.value;
      var desiredSlots = slotGroup.map(slot => {
        var _entry$equipment$get;

        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(_ref => {
        var _ref2 = maximize_slicedToArray(_ref, 2),
            item = _ref2[1];

        return item !== null;
      });
      var desiredSet = desiredSlots.map(_ref3 => {
        var _ref4 = maximize_slicedToArray(_ref3, 2),
            item = _ref4[1];

        return item;
      });
      var equippedSet = desiredSlots.map(_ref5 => {
        var _ref6 = maximize_slicedToArray(_ref5, 1),
            slot = _ref6[0];

        return (0,external_kolmafia_.equippedItem)(slot);
      });

      if (!(0,utils/* setEqual */.$x)(desiredSet, equippedSet)) {
        logger.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), "."));
        success = false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject20 || (maximize_templateObject20 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0 && entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject21 || (maximize_templateObject21 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))))) {
    if (entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject22 || (maximize_templateObject22 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) !== (0,external_kolmafia_.myEnthronedFamiliar)()) {
      logger.warning("Failed to apply ".concat(entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject23 || (maximize_templateObject23 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))), " in ").concat((0,template_string/* $item */.xr)(maximize_templateObject24 || (maximize_templateObject24 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), "."));
      success = false;
    }
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject25 || (maximize_templateObject25 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0 && entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject26 || (maximize_templateObject26 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))))) {
    if (entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject27 || (maximize_templateObject27 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) !== (0,external_kolmafia_.myBjornedFamiliar)()) {
      logger.warning("Failed to apply".concat(entry.rider.get((0,template_string/* $item */.xr)(maximize_templateObject28 || (maximize_templateObject28 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))), " in ").concat((0,template_string/* $item */.xr)(maximize_templateObject29 || (maximize_templateObject29 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), "."));
      success = false;
    }
  }

  return success;
}
/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */


function saveCached(cacheKey, options) {
  var equipment = new Map();
  var rider = new Map();

  var _iterator3 = maximize_createForOfIteratorHelper(cachedSlots),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _slot2 = _step3.value;
      equipment.set(_slot2, (0,external_kolmafia_.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject30 || (maximize_templateObject30 = maximize_taggedTemplateLiteral(["card sleeve"])))) > 0) {
    equipment.set((0,template_string/* $slot */.Jh)(maximize_templateObject31 || (maximize_templateObject31 = maximize_taggedTemplateLiteral(["card-sleeve"]))), (0,external_kolmafia_.equippedItem)((0,template_string/* $slot */.Jh)(maximize_templateObject32 || (maximize_templateObject32 = maximize_taggedTemplateLiteral(["card-sleeve"])))));
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject33 || (maximize_templateObject33 = maximize_taggedTemplateLiteral(["Crown of Thrones"])))) > 0) {
    rider.set((0,template_string/* $item */.xr)(maximize_templateObject34 || (maximize_templateObject34 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))), (0,external_kolmafia_.myEnthronedFamiliar)());
  }

  if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(maximize_templateObject35 || (maximize_templateObject35 = maximize_taggedTemplateLiteral(["Buddy Bjorn"])))) > 0) {
    rider.set((0,template_string/* $item */.xr)(maximize_templateObject36 || (maximize_templateObject36 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))), (0,external_kolmafia_.myBjornedFamiliar)());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    var _iterator4 = maximize_createForOfIteratorHelper(options.preventSlot),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var slot = _step4.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (options.preventSlot.includes((0,template_string/* $slot */.Jh)(maximize_templateObject37 || (maximize_templateObject37 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete((0,template_string/* $item */.xr)(maximize_templateObject38 || (maximize_templateObject38 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (options.preventSlot.includes((0,template_string/* $slot */.Jh)(maximize_templateObject39 || (maximize_templateObject39 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete((0,template_string/* $item */.xr)(maximize_templateObject40 || (maximize_templateObject40 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator5 = maximize_createForOfIteratorHelper(external_kolmafia_.Slot.all()),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _slot = _step5.value;

        if (!options.onlySlot.includes(_slot)) {
          equipment.delete(_slot);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    if (!options.onlySlot.includes((0,template_string/* $slot */.Jh)(maximize_templateObject41 || (maximize_templateObject41 = maximize_taggedTemplateLiteral(["buddy-bjorn"]))))) {
      rider.delete((0,template_string/* $item */.xr)(maximize_templateObject42 || (maximize_templateObject42 = maximize_taggedTemplateLiteral(["Buddy Bjorn"]))));
    }

    if (!options.onlySlot.includes((0,template_string/* $slot */.Jh)(maximize_templateObject43 || (maximize_templateObject43 = maximize_taggedTemplateLiteral(["crown-of-thrones"]))))) {
      rider.delete((0,template_string/* $item */.xr)(maximize_templateObject44 || (maximize_templateObject44 = maximize_taggedTemplateLiteral(["Crown of Thrones"]))));
    }
  }

  var entry = new CacheEntry(equipment, rider, (0,external_kolmafia_.myFamiliar)(), canEquipItemCount());
  cachedObjectives[cacheKey] = entry;

  if (options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger.info("Saving equipment to outfit ".concat(outfitName, "."));
    saveOutfit(outfitName);
  }
}
/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 * @returns Whether the maximize call succeeded.
 */


function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  var forceEquip = fullOptions.forceEquip,
      preventEquip = fullOptions.preventEquip,
      bonusEquip = fullOptions.bonusEquip,
      onlySlot = fullOptions.onlySlot,
      preventSlot = fullOptions.preventSlot; // Sort each group in objective to ensure consistent ordering in string

  var objective = [].concat(maximize_toConsumableArray(objectives.sort()), maximize_toConsumableArray(forceEquip.map(item => "equip ".concat(item)).sort()), maximize_toConsumableArray(preventEquip.map(item => "-equip ".concat(item)).sort()), maximize_toConsumableArray(onlySlot.map(slot => "".concat(slot)).sort()), maximize_toConsumableArray(preventSlot.map(slot => "-".concat(slot)).sort()), maximize_toConsumableArray(Array.from(bonusEquip.entries()).filter(_ref7 => {
    var _ref8 = maximize_slicedToArray(_ref7, 2),
        bonus = _ref8[1];

    return bonus !== 0;
  }).map(_ref9 => {
    var _ref10 = maximize_slicedToArray(_ref9, 2),
        item = _ref10[0],
        bonus = _ref10[1];

    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item);
  }).sort())).join(", ");
  var cacheEntry = checkCache(objective, fullOptions);

  if (cacheEntry) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);

    if (verifyCached(cacheEntry)) {
      logger.info("Equipped cached ".concat(objective));
      return true;
    }

    logger.warning("Maximize cache application failed, maximizing...");
  }

  var result = (0,external_kolmafia_.maximize)(objective, false);
  saveCached(objective, fullOptions);
  return result;
}

var _maximizeParameters = /*#__PURE__*/new WeakMap();

var _maximizeOptions = /*#__PURE__*/new WeakMap();

var Requirement = /*#__PURE__*/function () {
  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  function Requirement(maximizeParameters, maximizeOptions) {
    maximize_classCallCheck(this, Requirement);

    _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters);

    _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }

  maximize_createClass(Requirement, [{
    key: "maximizeParameters",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function get() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     * @param other Requirement to merge with.
     */

  }, {
    key: "merge",
    value: function merge(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption2, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot;

      var optionsA = this.maximizeOptions;
      var optionsB = other.maximizeOptions;
      return new Requirement([].concat(maximize_toConsumableArray(this.maximizeParameters), maximize_toConsumableArray(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(maximize_toConsumableArray((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), maximize_toConsumableArray((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])),
        preventEquip: [].concat(maximize_toConsumableArray((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), maximize_toConsumableArray((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 ? _other$maximizeOption2 : [])),
        bonusEquip: new Map([].concat(maximize_toConsumableArray((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), maximize_toConsumableArray((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(maximize_toConsumableArray((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), maximize_toConsumableArray((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(maximize_toConsumableArray((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), maximize_toConsumableArray((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : []))
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     * @param allRequirements Requirements to merge
     */

  }, {
    key: "maximize",
    value:
    /**
     * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
     * @returns Whether the maximize call succeeded.
     */
    function maximize() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     * @param requirements Requirements to maximize on
     */

  }], [{
    key: "merge",
    value: function merge(allRequirements) {
      return allRequirements.reduce((x, y) => x.merge(y), new Requirement([], {}));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++) {
        requirements[_key] = arguments[_key];
      }

      Requirement.merge(requirements).maximize();
    }
  }]);

  return Requirement;
}();
;// CONCATENATED MODULE: ./src/resources.ts
var resources_templateObject, resources_templateObject2, resources_templateObject3, resources_templateObject4, resources_templateObject5, resources_templateObject6, resources_templateObject7, resources_templateObject8, resources_templateObject9, resources_templateObject10, resources_templateObject11, resources_templateObject12, resources_templateObject13, resources_templateObject14, resources_templateObject15, resources_templateObject16, resources_templateObject17, resources_templateObject18, resources_templateObject19, resources_templateObject20, resources_templateObject21, resources_templateObject22, resources_templateObject23, resources_templateObject24, resources_templateObject25, resources_templateObject26, resources_templateObject27, resources_templateObject28, resources_templateObject29, resources_templateObject30, resources_templateObject31, resources_templateObject32, resources_templateObject33, resources_templateObject34;

function resources_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = resources_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function resources_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return resources_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return resources_arrayLikeToArray(o, minLen); }

function resources_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resources_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function resources_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function resources_createClass(Constructor, protoProps, staticProps) { if (protoProps) resources_defineProperties(Constructor.prototype, protoProps); if (staticProps) resources_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function resources_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function resources_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var banishSources = [{
  name: "Bowl Curveball",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject || (resources_templateObject = resources_taggedTemplateLiteral(["cosmic bowling ball"])))),
  do: (0,template_string/* $skill */.tm)(resources_templateObject2 || (resources_templateObject2 = resources_taggedTemplateLiteral(["Bowl a Curveball"])))
}, {
  name: "System Sweep",
  available: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(resources_templateObject3 || (resources_templateObject3 = resources_taggedTemplateLiteral(["System Sweep"])))),
  do: (0,template_string/* $skill */.tm)(resources_templateObject4 || (resources_templateObject4 = resources_taggedTemplateLiteral(["System Sweep"])))
}, {
  name: "Latte",
  available: () => (!(0,property/* get */.U2)("_latteBanishUsed") || (0,property/* get */.U2)("_latteRefillsUsed") < 2) && // Save one refil for aftercore
  (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject5 || (resources_templateObject5 = resources_taggedTemplateLiteral(["latte lovers member's mug"])))),
  prepare: () => {
    if ((0,property/* get */.U2)("_latteBanishUsed")) {
      var modifiers = [];
      if ((0,property/* get */.U2)("latteUnlocks").includes("wing")) modifiers.push("wing");
      if ((0,property/* get */.U2)("latteUnlocks").includes("cajun")) modifiers.push("cajun");
      modifiers.push("cinnamon", "pumpkin", "vanilla");
      (0,external_kolmafia_.cliExecute)("latte refill ".concat(modifiers.slice(0, 3).join(" "))); // Always unlocked
    }
  },
  do: (0,template_string/* $skill */.tm)(resources_templateObject6 || (resources_templateObject6 = resources_taggedTemplateLiteral(["Throw Latte on Opponent"]))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject7 || (resources_templateObject7 = resources_taggedTemplateLiteral(["latte lovers member's mug"])))
}, {
  name: "Reflex Hammer",
  available: () => (0,property/* get */.U2)("_reflexHammerUsed") < 3 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject8 || (resources_templateObject8 = resources_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))),
  do: (0,template_string/* $skill */.tm)(resources_templateObject9 || (resources_templateObject9 = resources_taggedTemplateLiteral(["Reflex Hammer"]))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject10 || (resources_templateObject10 = resources_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))
}, {
  name: "KGB dart",
  available: () => (0,property/* get */.U2)("_kgbTranquilizerDartUses") < 3 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject11 || (resources_templateObject11 = resources_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))),
  do: (0,template_string/* $skill */.tm)(resources_templateObject12 || (resources_templateObject12 = resources_taggedTemplateLiteral(["KGB tranquilizer dart"]))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject13 || (resources_templateObject13 = resources_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))
}, {
  name: "Middle Finger",
  available: () => !(0,property/* get */.U2)("_mafiaMiddleFingerRingUsed") && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject14 || (resources_templateObject14 = resources_taggedTemplateLiteral(["mafia middle finger ring"])))),
  do: (0,template_string/* $skill */.tm)(resources_templateObject15 || (resources_templateObject15 = resources_taggedTemplateLiteral(["Show them your ring"]))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject16 || (resources_templateObject16 = resources_taggedTemplateLiteral(["mafia middle finger ring"])))
}];
var BanishState = /*#__PURE__*/function () {
  function BanishState() {
    resources_classCallCheck(this, BanishState);

    resources_defineProperty(this, "already_banished", void 0);

    this.already_banished = new Map(Array.from((0,lib/* getBanishedMonsters */.$c)(), entry => [entry[1], entry[0]]));
  } // Return true if some of the monsters in the task are banished


  resources_createClass(BanishState, [{
    key: "isPartiallyBanished",
    value: function isPartiallyBanished(task) {
      var _task$combat, _task$combat$where;

      return ((_task$combat = task.combat) === null || _task$combat === void 0 ? void 0 : (_task$combat$where = _task$combat.where(src_combat.MonsterStrategy.Banish)) === null || _task$combat$where === void 0 ? void 0 : _task$combat$where.find(monster => this.already_banished.has(monster) && this.already_banished.get(monster) !== (0,template_string/* $item */.xr)(resources_templateObject17 || (resources_templateObject17 = resources_taggedTemplateLiteral(["ice house"]))))) !== undefined;
    } // Return true if all requested monsters in the task are banished

  }, {
    key: "isFullyBanished",
    value: function isFullyBanished(task) {
      var _task$combat2, _task$combat2$where;

      return ((_task$combat2 = task.combat) === null || _task$combat2 === void 0 ? void 0 : (_task$combat2$where = _task$combat2.where(src_combat.MonsterStrategy.Banish)) === null || _task$combat2$where === void 0 ? void 0 : _task$combat2$where.find(monster => !this.already_banished.has(monster))) === undefined;
    } // Return a list of all banishes not allocated to some available task

  }, {
    key: "unusedBanishes",
    value: function unusedBanishes(tasks) {
      var used_banishes = new Set();

      var _iterator = resources_createForOfIteratorHelper(tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          if (task.combat === undefined) continue;

          var _iterator2 = resources_createForOfIteratorHelper(task.combat.where(src_combat.MonsterStrategy.Banish)),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var monster = _step2.value;
              var banished_with = this.already_banished.get(monster);
              if (banished_with !== undefined) used_banishes.add(banished_with);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return banishSources.filter(banish => banish.available() && !used_banishes.has(banish.do));
    }
  }]);

  return BanishState;
}();
var wandererSources = [{
  name: "Voted",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject18 || (resources_templateObject18 = resources_taggedTemplateLiteral(["\"I Voted!\" sticker"])))) && (0,external_kolmafia_.totalTurnsPlayed)() % 11 === 1 && (0,property/* get */.U2)("lastVoteMonsterTurn") < (0,external_kolmafia_.totalTurnsPlayed)() && (0,property/* get */.U2)("_voteFreeFights") < 3 && atLevel(5),
  equip: (0,template_string/* $item */.xr)(resources_templateObject19 || (resources_templateObject19 = resources_taggedTemplateLiteral(["\"I Voted!\" sticker"]))),
  monster: "monsterid 2094 || monsterid 2095 || monsterid 2096 || monsterid 2097 || monsterid 2098",
  chance: () => 1 // when available

}, {
  name: "Cursed Magnifying Glass",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject20 || (resources_templateObject20 = resources_taggedTemplateLiteral(["cursed magnifying glass"])))) && (0,property/* get */.U2)("_voidFreeFights") < 5 && (0,property/* get */.U2)("cursedMagnifyingGlassCount") >= 13 && ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(resources_templateObject21 || (resources_templateObject21 = resources_taggedTemplateLiteral(["barrel of gunpowder"])))) >= 5 || // Done with cmg + meteor trick
  (0,property/* get */.U2)("sidequestLighthouseCompleted") !== "none"),
  equip: (0,template_string/* $item */.xr)(resources_templateObject22 || (resources_templateObject22 = resources_taggedTemplateLiteral(["cursed magnifying glass"]))),
  monster: "monsterid 2227 || monsterid 2228 || monsterid 2229",
  chance: () => 1 // when available

}, {
  name: "Kramco",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject23 || (resources_templateObject23 = resources_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"])))) && atLevel(5),
  equip: (0,template_string/* $item */.xr)(resources_templateObject24 || (resources_templateObject24 = resources_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))),
  monster: (0,template_string/* $monster */.O4)(resources_templateObject25 || (resources_templateObject25 = resources_taggedTemplateLiteral(["sausage goblin"]))),
  chance: () => (0,lib/* getKramcoWandererChance */.ve)()
}];
function canChargeVoid() {
  return (0,property/* get */.U2)("_voidFreeFights") < 5 && (0,property/* get */.U2)("cursedMagnifyingGlassCount") < 13;
}
var runawayValue = (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject26 || (resources_templateObject26 = resources_taggedTemplateLiteral(["Greatest American Pants"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject27 || (resources_templateObject27 = resources_taggedTemplateLiteral(["navel ring of navel gazing"])))) ? 0.8 * (0,property/* get */.U2)("valueOfAdventure") : (0,property/* get */.U2)("valueOfAdventure");
var runawaySources = [{
  name: "Bowl Curveball",
  available: () => false,
  do: new dist_combat/* Macro */.LE().skill((0,template_string/* $skill */.tm)(resources_templateObject28 || (resources_templateObject28 = resources_taggedTemplateLiteral(["Bowl a Curveball"])))),
  chance: () => 1,
  banishes: true
}, {
  name: "GAP",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject29 || (resources_templateObject29 = resources_taggedTemplateLiteral(["Greatest American Pants"])))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject30 || (resources_templateObject30 = resources_taggedTemplateLiteral(["Greatest American Pants"]))),
  do: new dist_combat/* Macro */.LE().runaway(),
  chance: () => (0,property/* get */.U2)("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}, {
  name: "Navel Ring",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject31 || (resources_templateObject31 = resources_taggedTemplateLiteral(["navel ring of navel gazing"])))),
  equip: (0,template_string/* $item */.xr)(resources_templateObject32 || (resources_templateObject32 = resources_taggedTemplateLiteral(["navel ring of navel gazing"]))),
  do: new dist_combat/* Macro */.LE().runaway(),
  chance: () => (0,property/* get */.U2)("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}, {
  name: "Peppermint Parasol",
  available: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(resources_templateObject33 || (resources_templateObject33 = resources_taggedTemplateLiteral(["peppermint parasol"])))),
  do: new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(resources_templateObject34 || (resources_templateObject34 = resources_taggedTemplateLiteral(["peppermint parasol"])))),
  chance: () => (0,property/* get */.U2)("_navelRunaways") < 3 ? 1 : 0.2,
  banishes: false
}];
var freekillSources = [];
;// CONCATENATED MODULE: ./src/tasks/keys.ts
var keys_templateObject, keys_templateObject2, keys_templateObject3, keys_templateObject4, keys_templateObject5, keys_templateObject6, keys_templateObject7, keys_templateObject8, keys_templateObject9, keys_templateObject10, keys_templateObject11, keys_templateObject12, keys_templateObject13, keys_templateObject14, keys_templateObject15, keys_templateObject16, keys_templateObject17, keys_templateObject18, keys_templateObject19, keys_templateObject20, keys_templateObject21, keys_templateObject22, keys_templateObject23, keys_templateObject24, keys_templateObject25, keys_templateObject26, keys_templateObject27, keys_templateObject28, keys_templateObject29, keys_templateObject30, keys_templateObject31, keys_templateObject32, keys_templateObject33, keys_templateObject34, keys_templateObject35, keys_templateObject36, keys_templateObject37, keys_templateObject38, keys_templateObject39, keys_templateObject40, keys_templateObject41, keys_templateObject42, keys_templateObject43, keys_templateObject44, keys_templateObject45, keys_templateObject46, keys_templateObject47, keys_templateObject48, keys_templateObject49, keys_templateObject50, keys_templateObject51, keys_templateObject52, keys_templateObject53, keys_templateObject54, keys_templateObject55, keys_templateObject56, keys_templateObject57, keys_templateObject58, keys_templateObject59, keys_templateObject60, keys_templateObject61, keys_templateObject62, keys_templateObject63, keys_templateObject64, keys_templateObject65, keys_templateObject66, keys_templateObject67, keys_templateObject68, keys_templateObject69, keys_templateObject70, keys_templateObject71, keys_templateObject72, keys_templateObject73, keys_templateObject74, keys_templateObject75, keys_templateObject76, keys_templateObject77, keys_templateObject78, keys_templateObject79, keys_templateObject80, keys_CombatStrategy, keys_templateObject81, keys_templateObject82, keys_templateObject83, keys_templateObject84, keys_templateObject85, keys_templateObject86, keys_templateObject87, keys_templateObject88, keys_templateObject89;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { keys_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function keys_toConsumableArray(arr) { return keys_arrayWithoutHoles(arr) || keys_iterableToArray(arr) || keys_unsupportedIterableToArray(arr) || keys_nonIterableSpread(); }

function keys_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function keys_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function keys_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return keys_arrayLikeToArray(arr); }

function keys_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = keys_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function keys_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return keys_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return keys_arrayLikeToArray(o, minLen); }

function keys_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function keys_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keys_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keys_createClass(Constructor, protoProps, staticProps) { if (protoProps) keys_defineProperties(Constructor.prototype, protoProps); if (staticProps) keys_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function keys_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function keys_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var Keys;

(function (Keys) {
  Keys["Deck"] = "Deck";
  Keys["Malware"] = "Daily Dungeon Malware";
  Keys["Dungeon"] = "Daily Dungeon";
  Keys["Fantasy"] = "Fantasy";
  Keys["ZapBoris"] = "Zap Boris";
  Keys["ZapSneaky"] = "Zap Sneaky";
  Keys["ZapJarlsberg"] = "Zap Jarlsberg";
})(Keys || (Keys = {}));

var heroKeys = [{
  which: Keys.Deck,
  possible: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject || (keys_templateObject = keys_taggedTemplateLiteral(["Deck of Every Card"])))) && (0,property/* get */.U2)("_deckCardsDrawn") === 0,
  after: [],
  priority: () => OverridePriority.Free,
  completed: () => (0,property/* get */.U2)("_deckCardsDrawn") > 0 || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject2 || (keys_templateObject2 = keys_taggedTemplateLiteral(["Deck of Every Card"])))),
  do: () => {
    (0,external_kolmafia_.cliExecute)("cheat tower");
    if ((0,property/* get */.U2)("_deckCardsDrawn") <= 10) (0,external_kolmafia_.cliExecute)("cheat sheep");
    if ((0,property/* get */.U2)("_deckCardsDrawn") <= 10) (0,external_kolmafia_.cliExecute)("cheat mine");
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  which: Keys.Malware,
  possible: () => !(0,property/* get */.U2)("dailyDungeonDone") && !(0,property/* get */.U2)("_dailyDungeonMalwareUsed"),
  ready: () => step("questL13Final") !== -1 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject3 || (keys_templateObject3 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject4 || (keys_templateObject4 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject5 || (keys_templateObject5 = keys_taggedTemplateLiteral(["eleven-foot pole"])))),
  after: ["Pull/daily dungeon malware"],
  completed: () => (0,property/* get */.U2)("dailyDungeonDone") || (0,property/* get */.U2)("_dailyDungeonMalwareUsed"),
  prepare: () => {
    (0,property/* set */.t8)("_loop_gyou_malware_amount", (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject6 || (keys_templateObject6 = keys_taggedTemplateLiteral(["daily dungeon malware"])))));
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject7 || (keys_templateObject7 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return;
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject8 || (keys_templateObject8 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return;
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject9 || (keys_templateObject9 = keys_taggedTemplateLiteral(["skeleton bone"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject10 || (keys_templateObject10 = keys_taggedTemplateLiteral(["loose teeth"]))))) (0,external_kolmafia_.cliExecute)("make * skeleton key");
  },
  do: (0,template_string/* $location */.PG)(keys_templateObject11 || (keys_templateObject11 = keys_taggedTemplateLiteral(["The Daily Dungeon"]))),
  post: () => {
    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject12 || (keys_templateObject12 = keys_taggedTemplateLiteral(["daily dungeon malware"])))) < (0,property/* get */.U2)("_loop_gyou_malware_amount", 0)) (0,property/* set */.t8)("_dailyDungeonMalwareUsed", true);
    (0,lib/* uneffect */.Lo)((0,template_string/* $effect */._G)(keys_templateObject13 || (keys_templateObject13 = keys_taggedTemplateLiteral(["Apathy"]))));
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(keys_templateObject14 || (keys_templateObject14 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    modifier: "init"
  },
  // Avoid apathy
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().item((0,template_string/* $item */.xr)(keys_templateObject15 || (keys_templateObject15 = keys_taggedTemplateLiteral(["daily dungeon malware"]))))).kill(),
  choices: {
    689: 1,
    690: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject16 || (keys_templateObject16 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    691: () => 3,
    // Do not skip the second chest; there is a chance we skip all the monsters
    692: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject17 || (keys_templateObject17 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return 3;
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject18 || (keys_templateObject18 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return 7;
      if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject19 || (keys_templateObject19 = keys_taggedTemplateLiteral(["skeleton key"])))) > 1 || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject20 || (keys_templateObject20 = keys_taggedTemplateLiteral(["skeleton bone"])))) > 1 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject21 || (keys_templateObject21 = keys_taggedTemplateLiteral(["loose teeth"])))) > 1) return 2;
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject22 || (keys_templateObject22 = keys_taggedTemplateLiteral(["skeleton key"])))) && (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("skeleton key")) return 2;
      return 4;
    },
    693: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject23 || (keys_templateObject23 = keys_taggedTemplateLiteral(["eleven-foot pole"])))) ? 2 : 1
  },
  limit: {
    tries: 15
  }
}, {
  which: Keys.Dungeon,
  possible: () => !(0,property/* get */.U2)("dailyDungeonDone"),
  ready: () => step("questL13Final") !== -1 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject24 || (keys_templateObject24 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject25 || (keys_templateObject25 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject26 || (keys_templateObject26 = keys_taggedTemplateLiteral(["eleven-foot pole"])))),
  after: ["Daily Dungeon Malware"],
  completed: () => (0,property/* get */.U2)("dailyDungeonDone"),
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject27 || (keys_templateObject27 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return;
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject28 || (keys_templateObject28 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return;
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject29 || (keys_templateObject29 = keys_taggedTemplateLiteral(["skeleton bone"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject30 || (keys_templateObject30 = keys_taggedTemplateLiteral(["loose teeth"]))))) (0,external_kolmafia_.cliExecute)("make * skeleton key");
  },
  do: (0,template_string/* $location */.PG)(keys_templateObject31 || (keys_templateObject31 = keys_taggedTemplateLiteral(["The Daily Dungeon"]))),
  post: () => {
    (0,lib/* uneffect */.Lo)((0,template_string/* $effect */._G)(keys_templateObject32 || (keys_templateObject32 = keys_taggedTemplateLiteral(["Apathy"]))));
  },
  outfit: {
    equip: (0,template_string/* $items */.vS)(keys_templateObject33 || (keys_templateObject33 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"]))),
    modifier: "init"
  },
  // Avoid apathy
  combat: new src_combat.CombatStrategy().kill(),
  choices: {
    689: 1,
    690: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject34 || (keys_templateObject34 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    691: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject35 || (keys_templateObject35 = keys_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) ? 2 : 3,
    692: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject36 || (keys_templateObject36 = keys_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) return 3;
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject37 || (keys_templateObject37 = keys_taggedTemplateLiteral(["Platinum Yendorian Express Card"]))))) return 7;
      if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject38 || (keys_templateObject38 = keys_taggedTemplateLiteral(["skeleton key"])))) > 1 || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject39 || (keys_templateObject39 = keys_taggedTemplateLiteral(["skeleton bone"])))) > 1 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject40 || (keys_templateObject40 = keys_taggedTemplateLiteral(["loose teeth"])))) > 1) return 2;
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject41 || (keys_templateObject41 = keys_taggedTemplateLiteral(["skeleton key"])))) && (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("skeleton key")) return 2;
      return 4;
    },
    693: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject42 || (keys_templateObject42 = keys_taggedTemplateLiteral(["eleven-foot pole"])))) ? 2 : 1
  },
  limit: {
    tries: 15
  }
}, {
  which: Keys.Fantasy,
  possible: () => (0,property/* get */.U2)("frAlways") || (0,property/* get */.U2)("_frToday"),
  after: ["Misc/Open Fantasy"],
  ready: () => (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(keys_templateObject43 || (keys_templateObject43 = keys_taggedTemplateLiteral(["moxie"])))) >= 120,
  completed: () => (0,template_string/* $location */.PG)(keys_templateObject44 || (keys_templateObject44 = keys_taggedTemplateLiteral(["The Bandit Crossroads"]))).turnsSpent >= 5,
  do: (0,template_string/* $location */.PG)(keys_templateObject45 || (keys_templateObject45 = keys_taggedTemplateLiteral(["The Bandit Crossroads"]))),
  outfit: {
    familiar: (0,template_string/* $familiar */.HP)(keys_templateObject46 || (keys_templateObject46 = keys_taggedTemplateLiteral(["none"]))),
    equip: (0,template_string/* $items */.vS)(keys_templateObject47 || (keys_templateObject47 = keys_taggedTemplateLiteral(["FantasyRealm G. E. M."]))),
    modifier: "moxie"
  },
  combat: new src_combat.CombatStrategy().kill(),
  limit: {
    tries: 5
  }
}, {
  which: Keys.ZapSneaky,
  possible: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") <= 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject48 || (keys_templateObject48 = keys_taggedTemplateLiteral(["Boris's ring"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject49 || (keys_templateObject49 = keys_taggedTemplateLiteral(["Jarlsberg's earring"])))),
  after: ["Pull/Sneaky Pete's breath spray", "Wand/Wand"],
  completed: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") >= 1 || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject50 || (keys_templateObject50 = keys_taggedTemplateLiteral(["Sneaky Pete's breath spray"])))),
  do: () => {
    unequipAcc((0,template_string/* $item */.xr)(keys_templateObject51 || (keys_templateObject51 = keys_taggedTemplateLiteral(["Sneaky Pete's breath spray"]))));
    (0,external_kolmafia_.cliExecute)("zap Sneaky Pete's breath spray");
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  which: Keys.ZapBoris,
  possible: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") <= 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject52 || (keys_templateObject52 = keys_taggedTemplateLiteral(["Jarlsberg's earring"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject53 || (keys_templateObject53 = keys_taggedTemplateLiteral(["Sneaky Pete's breath spray"])))),
  after: ["Pull/Boris's ring", "Wand/Wand"],
  completed: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") >= 1 || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject54 || (keys_templateObject54 = keys_taggedTemplateLiteral(["Boris's ring"])))),
  do: () => {
    unequipAcc((0,template_string/* $item */.xr)(keys_templateObject55 || (keys_templateObject55 = keys_taggedTemplateLiteral(["Boris's ring"]))));
    (0,external_kolmafia_.cliExecute)("zap Boris's ring");
  },
  limit: {
    tries: 1
  },
  freeaction: true
}, {
  which: Keys.ZapJarlsberg,
  possible: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") <= 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject56 || (keys_templateObject56 = keys_taggedTemplateLiteral(["Boris's ring"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject57 || (keys_templateObject57 = keys_taggedTemplateLiteral(["Sneaky Pete's breath spray"])))),
  after: ["Pull/Jarlsberg's earring", "Wand/Wand"],
  completed: () => (0,property/* get */.U2)("lastZapperWandExplosionDay") >= 1 || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject58 || (keys_templateObject58 = keys_taggedTemplateLiteral(["Jarlsberg's earring"])))),
  do: () => {
    unequipAcc((0,template_string/* $item */.xr)(keys_templateObject59 || (keys_templateObject59 = keys_taggedTemplateLiteral(["Jarlsberg's earring"]))));
    (0,external_kolmafia_.cliExecute)("zap Jarlsberg's earring");
  },
  limit: {
    tries: 1
  },
  freeaction: true
}];
var KeyState;

(function (KeyState) {
  KeyState["DONE"] = "Done";
  KeyState["READY"] = "Ready";
  KeyState["MAYBE"] = "Maybe";
  KeyState["UNNEEDED"] = "Unneeded";
  KeyState["IMPOSSIBLE"] = "Impossible";
})(KeyState || (KeyState = {}));

var KeyStrategy = /*#__PURE__*/function () {
  function KeyStrategy(tasks) {
    keys_classCallCheck(this, KeyStrategy);

    keys_defineProperty(this, "plan", new Map());

    keys_defineProperty(this, "tasks", void 0);

    this.tasks = tasks;
  }

  keys_createClass(KeyStrategy, [{
    key: "update",
    value: function update() {
      var keysNeeded = Math.max(0, 3 - keyCount());
      var sureKeys = 0; // Number of keys we have definitely planned.

      var maybeKeys = 0; // Number of keys we plan to attempt if possible.

      var _iterator = keys_createForOfIteratorHelper(this.tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;

          // If we have already guaranteed all keys, no more are needed
          if (sureKeys >= keysNeeded) {
            this.plan.set(task.which, KeyState.UNNEEDED);
            continue;
          }

          switch (task.possible()) {
            case false:
              // This key is impossible to get.
              this.plan.set(task.which, KeyState.IMPOSSIBLE);
              break;

            case true:
              // If all the maybe-keys above succeed, then there is no need for this key. So set our state to maybe.
              // If there are not enough maybe-keys above, then we plan to do this key.
              this.plan.set(task.which, maybeKeys < keysNeeded ? KeyState.READY : KeyState.MAYBE);
              sureKeys++;
              maybeKeys++;
              break;

            case undefined:
              // The key is maybe possible to get.
              this.plan.set(task.which, KeyState.MAYBE);
              maybeKeys++;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (sureKeys < keysNeeded) {
        var info = Array.from(this.plan.entries()).map(keyinfo => keyinfo.join("=")).join("; ");
        throw "Can only guarantee ".concat(sureKeys, " of ").concat(keysNeeded, " keys. (").concat(info, ")");
      }
    }
  }, {
    key: "useful",
    value: function useful(key) {
      if (this.plan.get(key) === KeyState.READY) return true;
      if (this.plan.get(key) === KeyState.MAYBE) return undefined;
      return false;
    }
  }]);

  return KeyStrategy;
}();

var keyStrategy = new KeyStrategy(heroKeys);
var KeysQuest = {
  name: "Keys",
  tasks: [].concat(keys_toConsumableArray(keyStrategy.tasks.map(task => {
    return _objectSpread(_objectSpread({}, task), {}, {
      name: task.which,
      completed: state => task.completed(state) || keyStrategy.plan.get(task.which) === KeyState.DONE || keyStrategy.plan.get(task.which) === KeyState.UNNEEDED || keyStrategy.plan.get(task.which) === KeyState.IMPOSSIBLE,
      ready: state => (task.ready === undefined || task.ready(state)) && keyStrategy.plan.get(task.which) === KeyState.READY
    });
  })), [{
    name: "All Heroes",
    after: keyStrategy.tasks.map(task => task.which),
    completed: () => keyCount() >= 3,
    do: () => {
      throw "Unable to obtain enough fat loot tokens";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Open 8-Bit",
    after: [],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject60 || (keys_templateObject60 = keys_taggedTemplateLiteral(["continuum transfunctioner"])))),
    do: () => {
      if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject61 || (keys_templateObject61 = keys_taggedTemplateLiteral(["continuum transfunctioner"]))))) {
        (0,external_kolmafia_.visitUrl)("place.php?whichplace=forestvillage&action=fv_mystic");
        (0,external_kolmafia_.runChoice)(1);
        (0,external_kolmafia_.runChoice)(1);
        (0,external_kolmafia_.runChoice)(1);
      }
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Digital Key",
    after: ["Open 8-Bit"],
    ready: () => step("questL13Final") > 2 || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject62 || (keys_templateObject62 = keys_taggedTemplateLiteral(["Powerful Glove"])))),
    completed: () => (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("digital key") || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject63 || (keys_templateObject63 = keys_taggedTemplateLiteral(["digital key"])))) || (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject64 || (keys_templateObject64 = keys_taggedTemplateLiteral(["white pixel"])))) + Math.min((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject65 || (keys_templateObject65 = keys_taggedTemplateLiteral(["blue pixel"])))), (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject66 || (keys_templateObject66 = keys_taggedTemplateLiteral(["red pixel"])))), (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject67 || (keys_templateObject67 = keys_taggedTemplateLiteral(["green pixel"]))))) >= 30 || towerSkip(),
    do: (0,template_string/* $location */.PG)(keys_templateObject68 || (keys_templateObject68 = keys_taggedTemplateLiteral(["8-Bit Realm"]))),
    outfit: {
      equip: (0,template_string/* $items */.vS)(keys_templateObject69 || (keys_templateObject69 = keys_taggedTemplateLiteral(["continuum transfunctioner"]))),
      modifier: "item"
    },
    combat: new src_combat.CombatStrategy().kill(),
    limit: {
      soft: 40
    }
  }, {
    name: "Star Key",
    after: ["Giant/Unlock HITS"],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject70 || (keys_templateObject70 = keys_taggedTemplateLiteral(["star chart"])))) && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject71 || (keys_templateObject71 = keys_taggedTemplateLiteral(["star"])))) >= 8 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject72 || (keys_templateObject72 = keys_taggedTemplateLiteral(["line"])))) >= 7 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject73 || (keys_templateObject73 = keys_taggedTemplateLiteral(["Richard's star key"])))) || (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Richard's star key") || towerSkip(),
    do: (0,template_string/* $location */.PG)(keys_templateObject74 || (keys_templateObject74 = keys_taggedTemplateLiteral(["The Hole in the Sky"]))),
    outfit: {
      modifier: "item"
    },
    combat: new src_combat.CombatStrategy().kill((0,template_string/* $monster */.O4)(keys_templateObject75 || (keys_templateObject75 = keys_taggedTemplateLiteral(["Astronomer"])))).killItem(),
    limit: {
      soft: 20
    },
    orbtargets: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject76 || (keys_templateObject76 = keys_taggedTemplateLiteral(["star chart"])))) ? [(0,template_string/* $monster */.O4)(keys_templateObject77 || (keys_templateObject77 = keys_taggedTemplateLiteral(["Astronomer"])))] : []
  }, {
    name: "Skeleton Key",
    after: ["Crypt/Nook Boss", "Tower/Start"],
    prepare: () => {
      if (step("questM23Meatsmith") === -1) {
        (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith");
        (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
        (0,external_kolmafia_.runChoice)(1);
      }
    },
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject78 || (keys_templateObject78 = keys_taggedTemplateLiteral(["skeleton bone"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject79 || (keys_templateObject79 = keys_taggedTemplateLiteral(["loose teeth"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject80 || (keys_templateObject80 = keys_taggedTemplateLiteral(["skeleton key"])))) || (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("skeleton key") || towerSkip(),
    outfit: {
      modifier: "item"
    },
    combat: (keys_CombatStrategy = new src_combat.CombatStrategy()).killItem.apply(keys_CombatStrategy, keys_toConsumableArray((0,template_string/* $monsters */.fr)(keys_templateObject81 || (keys_templateObject81 = keys_taggedTemplateLiteral(["factory-irregular skeleton, remaindered skeleton, swarm of skulls"]))))).banish((0,template_string/* $monster */.O4)(keys_templateObject82 || (keys_templateObject82 = keys_taggedTemplateLiteral(["novelty tropical skeleton"])))),
    do: (0,template_string/* $location */.PG)(keys_templateObject83 || (keys_templateObject83 = keys_taggedTemplateLiteral(["The Skeleton Store"]))),
    limit: {
      soft: 10
    }
  }])
};

function keyCount() {
  var count = (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(keys_templateObject84 || (keys_templateObject84 = keys_taggedTemplateLiteral(["fat loot token"]))));
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject85 || (keys_templateObject85 = keys_taggedTemplateLiteral(["Boris's key"])))) || (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Boris")) count++;
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject86 || (keys_templateObject86 = keys_taggedTemplateLiteral(["Jarlsberg's key"])))) || (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Jarlsberg")) count++;
  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(keys_templateObject87 || (keys_templateObject87 = keys_taggedTemplateLiteral(["Sneaky Pete's key"])))) || (0,property/* get */.U2)("nsTowerDoorKeysUsed").includes("Sneaky Pete")) count++;
  return count;
}

function unequipAcc(acc) {
  if (!(0,external_kolmafia_.haveEquipped)(acc)) return;

  var _iterator2 = keys_createForOfIteratorHelper((0,template_string/* $slots */.ei)(keys_templateObject88 || (keys_templateObject88 = keys_taggedTemplateLiteral(["acc1, acc2, acc3"])))),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var slot = _step2.value;
      if ((0,external_kolmafia_.equippedItem)(slot) === acc) (0,external_kolmafia_.equip)(slot, (0,template_string/* $item */.xr)(keys_templateObject89 || (keys_templateObject89 = keys_taggedTemplateLiteral(["none"]))));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
;// CONCATENATED MODULE: ./src/outfit.ts
var outfit_templateObject, outfit_templateObject2, outfit_templateObject3, outfit_templateObject4, outfit_templateObject5, outfit_templateObject6, outfit_templateObject7, outfit_templateObject8, outfit_templateObject9, outfit_templateObject10, outfit_templateObject11, outfit_templateObject12, outfit_templateObject13, outfit_templateObject14, outfit_templateObject15, outfit_templateObject16, outfit_templateObject17, outfit_templateObject18, outfit_templateObject19, outfit_templateObject20, outfit_templateObject21, outfit_templateObject22, outfit_templateObject23, outfit_templateObject24, outfit_templateObject25, outfit_templateObject26, outfit_templateObject27, outfit_templateObject28, outfit_templateObject29, outfit_templateObject30, outfit_templateObject31, outfit_templateObject32, outfit_templateObject33, outfit_templateObject34, outfit_templateObject35, outfit_templateObject36, outfit_templateObject37, outfit_templateObject38, outfit_templateObject39, outfit_templateObject40, outfit_templateObject41, outfit_templateObject42, outfit_templateObject43, outfit_templateObject44, outfit_templateObject45, outfit_templateObject46, outfit_templateObject47, outfit_templateObject48, outfit_templateObject49, outfit_templateObject50, outfit_templateObject51, outfit_templateObject52, outfit_templateObject53, outfit_templateObject54, outfit_templateObject55, outfit_templateObject56, outfit_templateObject57, outfit_templateObject58, outfit_templateObject59, outfit_templateObject60, outfit_templateObject61, outfit_templateObject62, outfit_templateObject63, outfit_templateObject64, outfit_templateObject65, outfit_templateObject66, outfit_templateObject67, outfit_templateObject68, outfit_templateObject69, outfit_templateObject70, outfit_templateObject71, outfit_templateObject72, outfit_templateObject73, outfit_templateObject74, outfit_templateObject75, outfit_templateObject76, outfit_templateObject77, outfit_templateObject78, outfit_templateObject79, outfit_templateObject80, outfit_templateObject81, outfit_templateObject82, outfit_templateObject83, outfit_templateObject84, outfit_templateObject85, outfit_templateObject86, outfit_templateObject87, outfit_templateObject88, outfit_templateObject89, outfit_templateObject90, outfit_templateObject91, outfit_templateObject92;

function outfit_toConsumableArray(arr) { return outfit_arrayWithoutHoles(arr) || outfit_iterableToArray(arr) || outfit_unsupportedIterableToArray(arr) || outfit_nonIterableSpread(); }

function outfit_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function outfit_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function outfit_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return outfit_arrayLikeToArray(arr); }

function outfit_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = outfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function outfit_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return outfit_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return outfit_arrayLikeToArray(o, minLen); }

function outfit_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function outfit_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function outfit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function outfit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function outfit_createClass(Constructor, protoProps, staticProps) { if (protoProps) outfit_defineProperties(Constructor.prototype, protoProps); if (staticProps) outfit_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function outfit_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





// Adapted from phccs
var Outfit = /*#__PURE__*/function () {
  function Outfit() {
    outfit_classCallCheck(this, Outfit);

    outfit_defineProperty(this, "equips", new Map());

    outfit_defineProperty(this, "accesories", []);

    outfit_defineProperty(this, "skipDefaults", false);

    outfit_defineProperty(this, "familiar", void 0);

    outfit_defineProperty(this, "modifier", void 0);

    outfit_defineProperty(this, "avoid", void 0);
  }

  outfit_createClass(Outfit, [{
    key: "equip",
    value: function equip(item) {
      if (item === undefined) return true;
      if (Array.isArray(item)) return item.every(val => this.equip(val));
      if (!(0,lib/* have */.lf)(item)) return false;
      if (item instanceof external_kolmafia_.Item && !(0,external_kolmafia_.canEquip)(item)) return false;
      if (this.avoid && this.avoid.find(i => i === item) !== undefined) return false;

      if (item instanceof external_kolmafia_.Item) {
        var slot = (0,external_kolmafia_.toSlot)(item);

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject || (outfit_templateObject = outfit_taggedTemplateLiteral(["acc1"])))) {
          if (this.accesories.length >= 3) return false;
          this.accesories.push(item);
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject2 || (outfit_templateObject2 = outfit_taggedTemplateLiteral(["off-hand"])))) {
          var weapon = this.equips.get((0,template_string/* $slot */.Jh)(outfit_templateObject3 || (outfit_templateObject3 = outfit_taggedTemplateLiteral(["weapon"]))));
          if (weapon && (0,external_kolmafia_.weaponHands)(weapon) === 2) return false;
        }

        if (!this.equips.has(slot)) {
          this.equips.set(slot, item);
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject4 || (outfit_templateObject4 = outfit_taggedTemplateLiteral(["weapon"]))) && !this.equips.has((0,template_string/* $slot */.Jh)(outfit_templateObject5 || (outfit_templateObject5 = outfit_taggedTemplateLiteral(["off-hand"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(outfit_templateObject6 || (outfit_templateObject6 = outfit_taggedTemplateLiteral(["Double-Fisted Skull Smashing"])))) && (0,external_kolmafia_.weaponHands)(item)) {
          this.equips.set((0,template_string/* $slot */.Jh)(outfit_templateObject7 || (outfit_templateObject7 = outfit_taggedTemplateLiteral(["off-hand"]))), item);
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject8 || (outfit_templateObject8 = outfit_taggedTemplateLiteral(["off-hand"]))) && (0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(outfit_templateObject9 || (outfit_templateObject9 = outfit_taggedTemplateLiteral(["Left-Hand Man"])))) && this.familiar === undefined && !this.equips.has((0,template_string/* $slot */.Jh)(outfit_templateObject10 || (outfit_templateObject10 = outfit_taggedTemplateLiteral(["familiar"]))))) {
          if (item === (0,template_string/* $item */.xr)(outfit_templateObject11 || (outfit_templateObject11 = outfit_taggedTemplateLiteral(["cursed magnifying glass"]))) && !canChargeVoid()) {
            var _this$equips$get;

            // Cursed magnifying glass cannot trigger in Lefty
            this.equips.set((0,template_string/* $slot */.Jh)(outfit_templateObject12 || (outfit_templateObject12 = outfit_taggedTemplateLiteral(["familiar"]))), (_this$equips$get = this.equips.get((0,template_string/* $slot */.Jh)(outfit_templateObject13 || (outfit_templateObject13 = outfit_taggedTemplateLiteral(["off-hand"]))))) !== null && _this$equips$get !== void 0 ? _this$equips$get : (0,template_string/* $item */.xr)(outfit_templateObject14 || (outfit_templateObject14 = outfit_taggedTemplateLiteral(["none"]))));
            this.equips.set((0,template_string/* $slot */.Jh)(outfit_templateObject15 || (outfit_templateObject15 = outfit_taggedTemplateLiteral(["off-hand"]))), item);
          } else {
            this.familiar = (0,template_string/* $familiar */.HP)(outfit_templateObject16 || (outfit_templateObject16 = outfit_taggedTemplateLiteral(["Left-Hand Man"])));
            this.equips.set((0,template_string/* $slot */.Jh)(outfit_templateObject17 || (outfit_templateObject17 = outfit_taggedTemplateLiteral(["familiar"]))), item);
          }

          return true;
        }

        return false;
      } else {
        if (this.familiar && this.familiar !== item) return false;
        if (!(0,lib/* have */.lf)(item)) return false;
        this.familiar = item;
        return true;
      }
    }
  }, {
    key: "equipFirst",
    value: function equipFirst(resources) {
      var _iterator = outfit_createForOfIteratorHelper(resources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var resource = _step.value;
          if (!resource.available()) continue;
          if (resource.chance && resource.chance() === 0) continue;
          if (!this.canEquip(resource.equip)) continue;
          if (!this.equip(resource.equip)) continue;
          return resource;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return undefined;
    }
  }, {
    key: "equipUntilCapped",
    value: function equipUntilCapped(resources) {
      var result = [];

      var _iterator2 = outfit_createForOfIteratorHelper(resources),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var resource = _step2.value;
          if (!resource.available()) continue;
          if (resource.chance && resource.chance() === 0) continue;
          if (!this.canEquip(resource.equip)) continue;
          if (!this.equip(resource.equip)) continue;
          result.push(resource);
          if (resource.chance && resource.chance() === 1) break;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return result;
    }
  }, {
    key: "canEquip",
    value: function canEquip(item) {
      if (item === undefined) return true;
      if (Array.isArray(item)) return item.every(val => this.canEquip(val)); // TODO: smarter

      if (!(0,lib/* have */.lf)(item)) return false;
      if (item instanceof external_kolmafia_.Item && !(0,external_kolmafia_.canEquip)(item)) return false;
      if (this.avoid && this.avoid.find(i => i === item) !== undefined) return false;

      if (item instanceof external_kolmafia_.Item) {
        var slot = (0,external_kolmafia_.toSlot)(item);

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject18 || (outfit_templateObject18 = outfit_taggedTemplateLiteral(["acc1"])))) {
          if (this.accesories.length >= 3) return false;
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject19 || (outfit_templateObject19 = outfit_taggedTemplateLiteral(["off-hand"])))) {
          var weapon = this.equips.get((0,template_string/* $slot */.Jh)(outfit_templateObject20 || (outfit_templateObject20 = outfit_taggedTemplateLiteral(["weapon"]))));
          if (weapon && (0,external_kolmafia_.weaponHands)(weapon) === 2) return false;
        }

        if (!this.equips.has(slot)) {
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject21 || (outfit_templateObject21 = outfit_taggedTemplateLiteral(["weapon"]))) && !this.equips.has((0,template_string/* $slot */.Jh)(outfit_templateObject22 || (outfit_templateObject22 = outfit_taggedTemplateLiteral(["off-hand"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(outfit_templateObject23 || (outfit_templateObject23 = outfit_taggedTemplateLiteral(["Double-Fisted Skull Smashing"])))) && (0,external_kolmafia_.weaponHands)(item)) {
          return true;
        }

        if (slot === (0,template_string/* $slot */.Jh)(outfit_templateObject24 || (outfit_templateObject24 = outfit_taggedTemplateLiteral(["off-hand"]))) && (0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(outfit_templateObject25 || (outfit_templateObject25 = outfit_taggedTemplateLiteral(["Left-Hand Man"])))) && this.familiar === undefined && !this.equips.has((0,template_string/* $slot */.Jh)(outfit_templateObject26 || (outfit_templateObject26 = outfit_taggedTemplateLiteral(["familiar"]))))) {
          return true;
        }

        return false;
      } else {
        if (this.familiar && this.familiar !== item) return false;
        if (!(0,lib/* have */.lf)(item)) return false;
        return true;
      }
    }
  }, {
    key: "dress",
    value: function dress() {
      if (this.familiar) (0,external_kolmafia_.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values());
      var accessorySlots = (0,template_string/* $slots */.ei)(outfit_templateObject27 || (outfit_templateObject27 = outfit_taggedTemplateLiteral(["acc1, acc2, acc3"])));

      var _iterator3 = outfit_createForOfIteratorHelper((0,template_string/* $slots */.ei)(outfit_templateObject34 || (outfit_templateObject34 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, shirt, pants, familiar, buddy-bjorn, crown-of-thrones, back"])))),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var slot = _step3.value;
          if (targetEquipment.includes((0,external_kolmafia_.equippedItem)(slot)) && this.equips.get(slot) !== (0,external_kolmafia_.equippedItem)(slot)) (0,external_kolmafia_.equip)(slot, (0,template_string/* $item */.xr)(outfit_templateObject35 || (outfit_templateObject35 = outfit_taggedTemplateLiteral(["none"]))));
        } //Order is anchored here to prevent DFSS shenanigans

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = outfit_createForOfIteratorHelper((0,template_string/* $slots */.ei)(outfit_templateObject36 || (outfit_templateObject36 = outfit_taggedTemplateLiteral(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"])))),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _slot = _step4.value;
          var equipment = this.equips.get(_slot);
          if (equipment) (0,external_kolmafia_.equip)(_slot, equipment);
        } //We don't care what order accessories are equipped in, just that they're equipped

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var accessoryEquips = this.accesories;

      var _iterator5 = outfit_createForOfIteratorHelper(accessorySlots),
          _step5;

      try {
        var _loop = function _loop() {
          var slot = _step5.value;
          var toEquip = accessoryEquips.find(equip => (0,external_kolmafia_.equippedAmount)(equip) < accessoryEquips.filter(accessory => accessory === equip).length);
          if (!toEquip) return "break";
          var currentEquip = (0,external_kolmafia_.equippedItem)(slot); //We never want an empty accessory slot

          if (currentEquip === (0,template_string/* $item */.xr)(outfit_templateObject37 || (outfit_templateObject37 = outfit_taggedTemplateLiteral(["none"]))) || (0,external_kolmafia_.equippedAmount)(currentEquip) > accessoryEquips.filter(accessory => accessory === currentEquip).length) {
            (0,external_kolmafia_.equip)(slot, toEquip);
          }
        };

        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (this.modifier) {
        // Handle familiar equipment manually to avoid weird Left-Hand Man behavior
        var fam_equip = this.equips.get((0,template_string/* $slot */.Jh)(outfit_templateObject28 || (outfit_templateObject28 = outfit_taggedTemplateLiteral(["familiar"]))));

        if (fam_equip !== undefined) {
          var index = targetEquipment.indexOf(fam_equip);
          if (index > -1) targetEquipment.splice(index, 1);
        }

        var requirements = Requirement.merge([new Requirement([this.modifier, "0.01 MP regen, 0.001 HP regen"], {
          forceEquip: targetEquipment.concat.apply(targetEquipment, outfit_toConsumableArray(accessoryEquips))
        })]);

        if (fam_equip !== undefined) {
          requirements = Requirement.merge([requirements, new Requirement([], {
            preventSlot: [(0,template_string/* $slot */.Jh)(outfit_templateObject29 || (outfit_templateObject29 = outfit_taggedTemplateLiteral(["familiar"])))]
          })]);
        }

        if (this.avoid !== undefined) {
          requirements = Requirement.merge([requirements, new Requirement([], {
            preventEquip: this.avoid
          })]);
        }

        if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(outfit_templateObject30 || (outfit_templateObject30 = outfit_taggedTemplateLiteral(["cursed magnifying glass"])))) && (0,property/* get */.U2)("cursedMagnifyingGlassCount") >= 13 && !targetEquipment.includes((0,template_string/* $item */.xr)(outfit_templateObject31 || (outfit_templateObject31 = outfit_taggedTemplateLiteral(["cursed magnifying glass"]))))) {
          // Avoid burning CMG void fight just for the modifier
          requirements = Requirement.merge([requirements, new Requirement([], {
            preventEquip: [(0,template_string/* $item */.xr)(outfit_templateObject32 || (outfit_templateObject32 = outfit_taggedTemplateLiteral(["cursed magnifying glass"])))]
          })]);
        }

        if (this.modifier.includes("-combat")) {
          if ((0,property/* get */.U2)("umbrellaState") !== "cocoon") (0,external_kolmafia_.cliExecute)("umbrella cocoon");
        } else if (this.modifier.includes("ML")) {
          if ((0,property/* get */.U2)("umbrellaState") !== "broken") (0,external_kolmafia_.cliExecute)("umbrella broken");
        }

        if (!requirements.maximize()) {
          throw "Unable to maximize ".concat(this.modifier);
        }
      } // Do not use +ML backup camera unless specifically needed


      if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(outfit_templateObject33 || (outfit_templateObject33 = outfit_taggedTemplateLiteral(["backup camera"])))) > 0 && (!this.modifier || !this.modifier.includes("ML")) && (0,property/* get */.U2)("backupCameraMode").toLowerCase() === "ml") {
        (0,external_kolmafia_.cliExecute)("backupcamera meat");
      }

      if (!(0,property/* get */.U2)("backupCameraReverserEnabled")) {
        (0,external_kolmafia_.cliExecute)("backupcamera reverser on");
      }
    }
  }, {
    key: "equipCharging",
    value: function equipCharging() {
      var _this$modifier;

      if ((_this$modifier = this.modifier) !== null && _this$modifier !== void 0 && _this$modifier.includes("-combat")) {
        // Modifier plays strangely with the umbrella
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject38 || (outfit_templateObject38 = outfit_taggedTemplateLiteral(["unbreakable umbrella"]))));
      }

      if ((0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(outfit_templateObject39 || (outfit_templateObject39 = outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6) {
        if (this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject40 || (outfit_templateObject40 = outfit_taggedTemplateLiteral(["Grey Goose"]))))) {
          this.equip((0,template_string/* $item */.xr)(outfit_templateObject41 || (outfit_templateObject41 = outfit_taggedTemplateLiteral(["yule hatchet"]))));
          this.equip((0,template_string/* $item */.xr)(outfit_templateObject42 || (outfit_templateObject42 = outfit_taggedTemplateLiteral(["ghostly reins"]))));
          this.equip((0,template_string/* $item */.xr)(outfit_templateObject43 || (outfit_templateObject43 = outfit_taggedTemplateLiteral(["teacher's pen"]))));
          this.equip((0,template_string/* $item */.xr)(outfit_templateObject44 || (outfit_templateObject44 = outfit_taggedTemplateLiteral(["familiar scrapbook"]))));
        }
      } else if ((!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(outfit_templateObject45 || (outfit_templateObject45 = outfit_taggedTemplateLiteral(["eleven-foot pole"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(outfit_templateObject46 || (outfit_templateObject46 = outfit_taggedTemplateLiteral(["ring of Detect Boring Doors"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(outfit_templateObject47 || (outfit_templateObject47 = outfit_taggedTemplateLiteral(["Pick-O-Matic lockpicks"]))))) && keyStrategy.useful(Keys.Dungeon) !== false) {
        this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject48 || (outfit_templateObject48 = outfit_taggedTemplateLiteral(["Gelatinous Cubeling"]))));
      } else if ((0,property/* get */.U2)("camelSpit") < 100 && (0,property/* get */.U2)("zeppelinProtestors") < 80) {
        this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject49 || (outfit_templateObject49 = outfit_taggedTemplateLiteral(["Melodramedary"]))));
      }
    }
  }, {
    key: "equipDefaults",
    value: function equipDefaults() {
      var _this$modifier2;

      if ((_this$modifier2 = this.modifier) !== null && _this$modifier2 !== void 0 && _this$modifier2.includes("-combat")) this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject50 || (outfit_templateObject50 = outfit_taggedTemplateLiteral(["Disgeist"])))); // low priority

      if ((0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(outfit_templateObject51 || (outfit_templateObject51 = outfit_taggedTemplateLiteral(["Temporal Riftlet"]))))) {
        this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject52 || (outfit_templateObject52 = outfit_taggedTemplateLiteral(["Temporal Riftlet"]))));
      } else if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(outfit_templateObject53 || (outfit_templateObject53 = outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))))) {
        this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject54 || (outfit_templateObject54 = outfit_taggedTemplateLiteral(["Reagnimated Gnome"]))));
      } else this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject55 || (outfit_templateObject55 = outfit_taggedTemplateLiteral(["Galloping Grill"]))));

      this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject56 || (outfit_templateObject56 = outfit_taggedTemplateLiteral(["Melodramedary"]))));
      if (this.familiar === (0,template_string/* $familiar */.HP)(outfit_templateObject57 || (outfit_templateObject57 = outfit_taggedTemplateLiteral(["Grey Goose"]))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(outfit_templateObject58 || (outfit_templateObject58 = outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6) this.equip((0,template_string/* $item */.xr)(outfit_templateObject59 || (outfit_templateObject59 = outfit_taggedTemplateLiteral(["grey down vest"]))));
      if (this.familiar === (0,template_string/* $familiar */.HP)(outfit_templateObject60 || (outfit_templateObject60 = outfit_taggedTemplateLiteral(["Melodramedary"]))) && (0,property/* get */.U2)("camelSpit") < 100) this.equip((0,template_string/* $item */.xr)(outfit_templateObject61 || (outfit_templateObject61 = outfit_taggedTemplateLiteral(["dromedary drinking helmet"]))));
      if (this.familiar === (0,template_string/* $familiar */.HP)(outfit_templateObject62 || (outfit_templateObject62 = outfit_taggedTemplateLiteral(["Reagnimated Gnome"])))) this.equip((0,template_string/* $item */.xr)(outfit_templateObject63 || (outfit_templateObject63 = outfit_taggedTemplateLiteral(["gnomish housemaid's kgnee"]))));
      if ((0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(outfit_templateObject64 || (outfit_templateObject64 = outfit_taggedTemplateLiteral(["muscle"])))) >= 40) this.equip((0,template_string/* $item */.xr)(outfit_templateObject65 || (outfit_templateObject65 = outfit_taggedTemplateLiteral(["mafia thumb ring"]))));

      if (!this.modifier) {
        // Default outfit
        if ((0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(outfit_templateObject66 || (outfit_templateObject66 = outfit_taggedTemplateLiteral(["moxie"])))) >= 47) this.equip((0,template_string/* $item */.xr)(outfit_templateObject67 || (outfit_templateObject67 = outfit_taggedTemplateLiteral(["giant yellow hat"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject68 || (outfit_templateObject68 = outfit_taggedTemplateLiteral(["ice crown"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject69 || (outfit_templateObject69 = outfit_taggedTemplateLiteral(["June cleaver"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject70 || (outfit_templateObject70 = outfit_taggedTemplateLiteral(["industrial fire extinguisher"]))));
        if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(outfit_templateObject71 || (outfit_templateObject71 = outfit_taggedTemplateLiteral(["Torso Awareness"]))))) this.equip((0,template_string/* $item */.xr)(outfit_templateObject72 || (outfit_templateObject72 = outfit_taggedTemplateLiteral(["fresh coat of paint"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject73 || (outfit_templateObject73 = outfit_taggedTemplateLiteral(["familiar scrapbook"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject74 || (outfit_templateObject74 = outfit_taggedTemplateLiteral(["protonic accelerator pack"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject75 || (outfit_templateObject75 = outfit_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject76 || (outfit_templateObject76 = outfit_taggedTemplateLiteral(["designer sweatpants"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject77 || (outfit_templateObject77 = outfit_taggedTemplateLiteral(["Cargo Cultist Shorts"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject78 || (outfit_templateObject78 = outfit_taggedTemplateLiteral(["Powerful Glove"]))));
        if (this.familiar === (0,template_string/* $familiar */.HP)(outfit_templateObject79 || (outfit_templateObject79 = outfit_taggedTemplateLiteral(["Grey Goose"]))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(outfit_templateObject80 || (outfit_templateObject80 = outfit_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(outfit_templateObject81 || (outfit_templateObject81 = outfit_taggedTemplateLiteral(["teacher's pen"])))) >= 2) this.equip((0,template_string/* $item */.xr)(outfit_templateObject82 || (outfit_templateObject82 = outfit_taggedTemplateLiteral(["teacher's pen"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject83 || (outfit_templateObject83 = outfit_taggedTemplateLiteral(["backup camera"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject84 || (outfit_templateObject84 = outfit_taggedTemplateLiteral(["birch battery"]))));
        this.equip((0,template_string/* $item */.xr)(outfit_templateObject85 || (outfit_templateObject85 = outfit_taggedTemplateLiteral(["combat lover's locket"]))));
      }

      this.equip((0,template_string/* $item */.xr)(outfit_templateObject86 || (outfit_templateObject86 = outfit_taggedTemplateLiteral(["miniature crystal ball"])))); // If we never found a better familiar, just keep charging the goose

      this.equip((0,template_string/* $familiar */.HP)(outfit_templateObject87 || (outfit_templateObject87 = outfit_taggedTemplateLiteral(["Grey Goose"]))));
    }
  }], [{
    key: "create",
    value: function create(task, state) {
      var _spec$skipDefaults, _spec$equip;

      var spec = typeof task.outfit === "function" ? task.outfit(state) : task.outfit;
      var outfit = new Outfit();

      var _iterator6 = outfit_createForOfIteratorHelper((_spec$equip = spec === null || spec === void 0 ? void 0 : spec.equip) !== null && _spec$equip !== void 0 ? _spec$equip : []),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var item = _step6.value;
          outfit.equip(item);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      if (spec !== null && spec !== void 0 && spec.familiar) outfit.equip(spec.familiar);
      outfit.avoid = spec === null || spec === void 0 ? void 0 : spec.avoid;

      if (spec !== null && spec !== void 0 && spec.modifier) {
        // Run maximizer
        if (spec.modifier.includes("item")) {
          outfit.equip((0,template_string/* $familiar */.HP)(outfit_templateObject88 || (outfit_templateObject88 = outfit_taggedTemplateLiteral(["Grey Goose"]))));
          if (!spec.modifier.includes("+combat") && !spec.modifier.includes(" combat")) outfit.equip((0,template_string/* $item */.xr)(outfit_templateObject89 || (outfit_templateObject89 = outfit_taggedTemplateLiteral(["protonic accelerator pack"]))));
        } // if (spec.modifier.includes("+combat")) outfit.equip($familiar`Jumpsuited Hound Dog`);


        if (spec.modifier.includes("meat")) {
          outfit.equip((0,template_string/* $familiar */.HP)(outfit_templateObject90 || (outfit_templateObject90 = outfit_taggedTemplateLiteral(["Hobo Monkey"]))));
          outfit.equip((0,template_string/* $familiar */.HP)(outfit_templateObject91 || (outfit_templateObject91 = outfit_taggedTemplateLiteral(["Leprechaun"])))); // backup
        }

        if (spec.modifier.includes("+combat") && !spec.modifier.includes("res")) outfit.equip((0,template_string/* $item */.xr)(outfit_templateObject92 || (outfit_templateObject92 = outfit_taggedTemplateLiteral(["thermal blanket"]))));
        outfit.modifier = spec.modifier;
      }

      outfit.skipDefaults = (_spec$skipDefaults = spec === null || spec === void 0 ? void 0 : spec.skipDefaults) !== null && _spec$skipDefaults !== void 0 ? _spec$skipDefaults : false;
      return outfit;
    }
  }]);

  return Outfit;
}();
;// CONCATENATED MODULE: ./src/tasks/absorb.ts
var absorb_templateObject, absorb_templateObject2, absorb_templateObject3, absorb_templateObject4, absorb_templateObject5, absorb_templateObject6, absorb_templateObject7, absorb_templateObject8, absorb_templateObject9, absorb_templateObject10, absorb_templateObject11, absorb_templateObject12, absorb_templateObject13, absorb_templateObject14, absorb_templateObject15, absorb_templateObject16, absorb_templateObject17, absorb_templateObject18, absorb_templateObject19, absorb_templateObject20, absorb_templateObject21, absorb_templateObject22, absorb_templateObject23, absorb_templateObject24, absorb_templateObject25, absorb_templateObject26, absorb_templateObject27, absorb_templateObject28, absorb_templateObject29, absorb_templateObject30, absorb_templateObject31, absorb_templateObject32, absorb_templateObject33, absorb_templateObject34, absorb_templateObject35, absorb_templateObject36, absorb_templateObject37, absorb_templateObject38, absorb_templateObject39, absorb_templateObject40, absorb_templateObject41, absorb_templateObject42, absorb_templateObject43, absorb_templateObject44, absorb_templateObject45, absorb_templateObject46, absorb_templateObject47, absorb_templateObject48, absorb_templateObject49, absorb_templateObject50, absorb_templateObject51, absorb_templateObject52, absorb_templateObject53, absorb_templateObject54, absorb_templateObject55, absorb_templateObject56, absorb_templateObject57, absorb_templateObject58, absorb_templateObject59, absorb_templateObject60, absorb_templateObject61, absorb_templateObject62, absorb_templateObject63, absorb_templateObject64, absorb_templateObject65, absorb_templateObject66, absorb_templateObject67, absorb_templateObject68, absorb_templateObject69, absorb_templateObject70, absorb_templateObject71, absorb_templateObject72, absorb_templateObject73, absorb_templateObject74, absorb_templateObject75, absorb_templateObject76, absorb_templateObject77, absorb_templateObject78, absorb_templateObject79, absorb_templateObject80, absorb_templateObject81, absorb_templateObject82, absorb_templateObject83, absorb_templateObject84, absorb_templateObject85, absorb_templateObject86, absorb_templateObject87, absorb_templateObject88, absorb_templateObject89, absorb_templateObject90, absorb_templateObject91, absorb_templateObject92, absorb_templateObject93, absorb_templateObject94, absorb_templateObject95, absorb_templateObject96, absorb_templateObject97, absorb_templateObject98, absorb_templateObject99, absorb_templateObject100, absorb_templateObject101, absorb_templateObject102, absorb_templateObject103, absorb_templateObject104, absorb_templateObject105, absorb_templateObject106, absorb_templateObject107, absorb_templateObject108, absorb_templateObject109, absorb_templateObject110, absorb_templateObject111, absorb_templateObject112, absorb_templateObject113, absorb_templateObject114, absorb_templateObject115, absorb_templateObject116, absorb_templateObject117, absorb_templateObject118, absorb_templateObject119, absorb_templateObject120, absorb_templateObject121, absorb_templateObject122, absorb_templateObject123, absorb_templateObject124, absorb_templateObject125, absorb_templateObject126, absorb_templateObject127, absorb_templateObject128, absorb_templateObject129, absorb_templateObject130, absorb_templateObject131, absorb_templateObject132, absorb_templateObject133, absorb_templateObject134, absorb_templateObject135, absorb_templateObject136, absorb_templateObject137, absorb_templateObject138, absorb_templateObject139, absorb_templateObject140, absorb_templateObject141, absorb_templateObject142, absorb_templateObject143, absorb_templateObject144, absorb_templateObject145, absorb_templateObject146, absorb_templateObject147, absorb_templateObject148, absorb_templateObject149, absorb_templateObject150, absorb_templateObject151, absorb_templateObject152, absorb_templateObject153, absorb_templateObject154, absorb_templateObject155, absorb_templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284, _templateObject285, _templateObject286, _templateObject287, _templateObject288, _templateObject289, _templateObject290, _templateObject291, _templateObject292;

function absorb_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function absorb_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? absorb_ownKeys(Object(source), !0).forEach(function (key) { absorb_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : absorb_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function absorb_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function absorb_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function absorb_createClass(Constructor, protoProps, staticProps) { if (protoProps) absorb_defineProperties(Constructor.prototype, protoProps); if (staticProps) absorb_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function absorb_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function absorb_toConsumableArray(arr) { return absorb_arrayWithoutHoles(arr) || absorb_iterableToArray(arr) || absorb_unsupportedIterableToArray(arr) || absorb_nonIterableSpread(); }

function absorb_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function absorb_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function absorb_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return absorb_arrayLikeToArray(arr); }

function absorb_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = absorb_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function absorb_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return absorb_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return absorb_arrayLikeToArray(o, minLen); }

function absorb_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function absorb_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






 // Add a shorthand for expressing absorption-only tasks; there are a lot.

// A list of all locations that might have important monsters
// Roughly in order of unlock in a basic run
var absorbTasks = [// Level 2
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject || (absorb_templateObject = absorb_taggedTemplateLiteral(["The Spooky Forest"]))),
  after: ["Hidden City/Open Temple"],
  choices: {
    502: 2,
    505: 2,
    334: 1
  }
}, // Level 3
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject2 || (absorb_templateObject2 = absorb_taggedTemplateLiteral(["A Barroom Brawl"]))),
  after: ["Tavern/Start"]
}, // Level 4
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject3 || (absorb_templateObject3 = absorb_taggedTemplateLiteral(["The Bat Hole Entrance"]))),
  after: ["Bat/Start"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject4 || (absorb_templateObject4 = absorb_taggedTemplateLiteral(["Guano Junction"]))),
  after: ["Bat/Get Sonar 3"],
  choices: {
    1427: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject5 || (absorb_templateObject5 = absorb_taggedTemplateLiteral(["The Batrat and Ratbat Burrow"]))),
  after: ["Bat/Use Sonar 1", "Palindome/Bat Snake"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject6 || (absorb_templateObject6 = absorb_taggedTemplateLiteral(["The Beanbat Chamber"]))),
  after: ["Bat/Use Sonar 2", "Giant/Grow Beanstalk"]
}, // Level 5
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject7 || (absorb_templateObject7 = absorb_taggedTemplateLiteral(["The Outskirts of Cobb's Knob"]))),
  after: ["Knob/Open Knob"],
  choices: {
    111: 3,
    113: 2,
    118: 1
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject8 || (absorb_templateObject8 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject9 || (absorb_templateObject9 = absorb_taggedTemplateLiteral(["Cobb's Knob Kitchens"]))),
  after: ["Knob/Open Knob"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject10 || (absorb_templateObject10 = absorb_taggedTemplateLiteral(["Cobb's Knob Barracks"]))),
  after: ["Knob/Open Knob"],
  choices: {
    522: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject11 || (absorb_templateObject11 = absorb_taggedTemplateLiteral(["Cobb's Knob Harem"]))),
  after: ["Knob/King"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject12 || (absorb_templateObject12 = absorb_taggedTemplateLiteral(["Cobb's Knob Treasury"]))),
  after: ["Knob/Open Knob"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject13 || (absorb_templateObject13 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject14 || (absorb_templateObject14 = absorb_taggedTemplateLiteral(["Cobb's Knob Laboratory"]))),
  after: ["Knob/King"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject15 || (absorb_templateObject15 = absorb_taggedTemplateLiteral(["The Knob Shaft"]))),
  after: ["Knob/King"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject16 || (absorb_templateObject16 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject17 || (absorb_templateObject17 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 1"]))),
  after: ["Knob/Open Menagerie"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject18 || (absorb_templateObject18 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 2"]))),
  after: ["Knob/Open Menagerie"],
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject19 || (absorb_templateObject19 = absorb_taggedTemplateLiteral(["Fluid Dynamics Simulation"])))
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject20 || (absorb_templateObject20 = absorb_taggedTemplateLiteral(["Cobb's Knob Menagerie, Level 3"]))),
  after: ["Knob/Open Menagerie"],
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject21 || (absorb_templateObject21 = absorb_taggedTemplateLiteral(["Phase Shift"])))
}, // Level 6
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject22 || (absorb_templateObject22 = absorb_taggedTemplateLiteral(["The Dark Heart of the Woods"]))),
  after: ["Friar/Heart"],
  ready: () => step("questL06Friar") < 999
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject23 || (absorb_templateObject23 = absorb_taggedTemplateLiteral(["The Dark Neck of the Woods"]))),
  after: ["Friar/Neck"],
  ready: () => step("questL06Friar") < 999
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject24 || (absorb_templateObject24 = absorb_taggedTemplateLiteral(["The Dark Elbow of the Woods"]))),
  after: ["Friar/Elbow"],
  ready: () => step("questL06Friar") < 999
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject25 || (absorb_templateObject25 = absorb_taggedTemplateLiteral(["Pandamonium Slums"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject26 || (absorb_templateObject26 = absorb_taggedTemplateLiteral(["The Laugh Floor"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject27 || (absorb_templateObject27 = absorb_taggedTemplateLiteral(["Infernal Rackets Backstage"]))),
  prepare: () => {
    if (step("questM10Azazel") === -1) {
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=temp");
      (0,external_kolmafia_.visitUrl)("pandamonium.php?action=sven");
    }
  },
  after: ["Friar/Finish"],
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject28 || (absorb_templateObject28 = absorb_taggedTemplateLiteral(["Gravitational Compression"])))
}, // Level 7
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject29 || (absorb_templateObject29 = absorb_taggedTemplateLiteral(["The VERY Unquiet Garves"]))),
  after: ["Crypt/Start", "Crypt/Finish"]
}, // Level 8
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject30 || (absorb_templateObject30 = absorb_taggedTemplateLiteral(["Itznotyerzitz Mine"]))),
  after: ["McLargeHuge/Trapper Request"],
  choices: {
    18: 3,
    19: 3,
    20: 3,
    556: 2
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject31 || (absorb_templateObject31 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject32 || (absorb_templateObject32 = absorb_taggedTemplateLiteral(["The Goatlet"]))),
  after: ["McLargeHuge/Goatlet"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject33 || (absorb_templateObject33 = absorb_taggedTemplateLiteral(["Lair of the Ninja Snowmen"]))),
  after: ["McLargeHuge/Climb", "Palindome/Cold Snake"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject34 || (absorb_templateObject34 = absorb_taggedTemplateLiteral(["The eXtreme Slope"]))),
  after: ["McLargeHuge/Climb"],
  choices: {
    15: 3,
    16: 3,
    17: 3,
    575: 3
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject35 || (absorb_templateObject35 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject36 || (absorb_templateObject36 = absorb_taggedTemplateLiteral(["The Icy Peak"]))),
  after: ["McLargeHuge/Peak"],
  outfit: {
    modifier: "10 cold res 5min, +combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject37 || (absorb_templateObject37 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().attack().repeat(), (0,template_string/* $monster */.O4)(absorb_templateObject38 || (absorb_templateObject38 = absorb_taggedTemplateLiteral(["Snow Queen"]))))
}, // Level 9
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject39 || (absorb_templateObject39 = absorb_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))),
  after: ["Orc Chasm/Bridge"],
  choices: {
    1345: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject40 || (absorb_templateObject40 = absorb_taggedTemplateLiteral(["A-Boo Peak"]))),
  after: ["Orc Chasm/ABoo Clues"],
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().attack().repeat())
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject41 || (absorb_templateObject41 = absorb_taggedTemplateLiteral(["Twin Peak"]))),
  after: ["Orc Chasm/Twin Init"],
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject42 || (absorb_templateObject42 = absorb_taggedTemplateLiteral(["Overclocking"])))
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject43 || (absorb_templateObject43 = absorb_taggedTemplateLiteral(["Oil Peak"]))),
  after: ["Orc Chasm/Oil Peak"],
  prepare: () => {
    // Unequip the umbrella if it pushes us over the cap
    if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(absorb_templateObject44 || (absorb_templateObject44 = absorb_taggedTemplateLiteral(["unbreakable umbrella"])))) > 0 && (0,property/* get */.U2)("umbrellaState") === "broken" && (0,external_kolmafia_.numericModifier)("Monster Level") >= 80) {
      (0,external_kolmafia_.equip)((0,template_string/* $slot */.Jh)(absorb_templateObject45 || (absorb_templateObject45 = absorb_taggedTemplateLiteral(["off-hand"]))), (0,template_string/* $item */.xr)(absorb_templateObject46 || (absorb_templateObject46 = absorb_taggedTemplateLiteral(["none"]))));
    } // Unequip items one-by-one until we are below 100 ML
    // (Always leave the backup camera on)


    var _iterator = absorb_createForOfIteratorHelper(external_kolmafia_.Slot.all()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var slot = _step.value;
        if ((0,external_kolmafia_.numericModifier)("Monster Level") < 100) break;
        var item = (0,external_kolmafia_.equippedItem)(slot);
        if (item === (0,template_string/* $item */.xr)(absorb_templateObject47 || (absorb_templateObject47 = absorb_taggedTemplateLiteral(["none"])))) continue;
        if ((0,external_kolmafia_.numericModifier)(item, "Monster Level") === 0) continue;
        if (item === (0,template_string/* $item */.xr)(absorb_templateObject48 || (absorb_templateObject48 = absorb_taggedTemplateLiteral(["backup camera"])))) continue; // Always keep equipped to ensure we can get to 50

        (0,external_kolmafia_.equip)(slot, (0,template_string/* $item */.xr)(absorb_templateObject49 || (absorb_templateObject49 = absorb_taggedTemplateLiteral(["none"]))));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if ((0,external_kolmafia_.numericModifier)("Monster Level") < 50 || (0,external_kolmafia_.numericModifier)("Monster Level") >= 100) throw "Unable to get 50-99 ML for oil barons";
  },
  freecombat: true,
  outfit: {
    modifier: "ML 50min"
  },
  limit: {
    tries: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject50 || (absorb_templateObject50 = absorb_taggedTemplateLiteral(["The Valley of Rof L'm Fao"]))),
  after: ["Orc Chasm/Finish"]
}, // Level 10
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject51 || (absorb_templateObject51 = absorb_taggedTemplateLiteral(["The Penultimate Fantasy Airship"]))),
  after: ["Giant/Airship"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject52 || (absorb_templateObject52 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    178: 2,
    182: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject53 || (absorb_templateObject53 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Basement)"]))),
  after: ["Giant/Basement Finish"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject54 || (absorb_templateObject54 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    670: 3,
    669: 1,
    671: 3
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject55 || (absorb_templateObject55 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Ground Floor)"]))),
  after: ["Giant/Ground"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject56 || (absorb_templateObject56 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    672: 3,
    673: 3,
    674: 3,
    1026: 3
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject57 || (absorb_templateObject57 = absorb_taggedTemplateLiteral(["The Castle in the Clouds in the Sky (Top Floor)"]))),
  after: ["Giant/Top Floor", "Palindome/Hot Snake Postcastle"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject58 || (absorb_templateObject58 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    675: 4,
    676: 4,
    677: 4,
    678: 1,
    679: 1,
    1431: 4
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject59 || (absorb_templateObject59 = absorb_taggedTemplateLiteral(["The Hole in the Sky"]))),
  after: ["Giant/Unlock HITS", "Keys/Star Key"]
}, // Level 11
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject60 || (absorb_templateObject60 = absorb_taggedTemplateLiteral(["The Black Forest"]))),
  after: ["Macguffin/Forest"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject61 || (absorb_templateObject61 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    923: 1,
    924: 1
  },
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject62 || (absorb_templateObject62 = absorb_taggedTemplateLiteral(["Photonic Shroud"])))
}, // Level 11: Hidden City
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject63 || (absorb_templateObject63 = absorb_taggedTemplateLiteral(["The Hidden Temple"]))),
  after: ["Hidden City/Open City"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject64 || (absorb_templateObject64 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    579: () => {
      return (0,property/* get */.U2)("lastTempleAdventures") === (0,external_kolmafia_.myAscensions)() ? 2 : 1;
    },
    580: 3,
    581: 3
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject65 || (absorb_templateObject65 = absorb_taggedTemplateLiteral(["The Hidden Park"]))),
  after: ["Hidden City/Open City", "Hidden City/Banish Janitors"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject66 || (absorb_templateObject66 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    789: () => {
      return (0,property/* get */.U2)("relocatePygmyJanitor") === (0,external_kolmafia_.myAscensions)() ? 2 : 3;
    }
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject67 || (absorb_templateObject67 = absorb_taggedTemplateLiteral(["The Hidden Apartment Building"]))),
  after: ["Hidden City/Apartment"],
  choices: {
    780: 4
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject68 || (absorb_templateObject68 = absorb_taggedTemplateLiteral(["The Hidden Office Building"]))),
  after: ["Hidden City/Office Boss"],
  choices: {
    786: 4
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject69 || (absorb_templateObject69 = absorb_taggedTemplateLiteral(["The Hidden Hospital"]))),
  after: ["Hidden City/Hospital"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject70 || (absorb_templateObject70 = absorb_taggedTemplateLiteral(["The Hidden Bowling Alley"]))),
  after: ["Hidden City/Bowling"]
}, // Level 11: Manor
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject71 || (absorb_templateObject71 = absorb_taggedTemplateLiteral(["The Haunted Pantry"]))),
  after: [],
  choices: {
    114: 2,
    115: 1,
    116: 4,
    117: 1
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject72 || (absorb_templateObject72 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject73 || (absorb_templateObject73 = absorb_taggedTemplateLiteral(["The Haunted Conservatory"]))),
  after: ["Manor/Start"],
  choices: {
    899: 2
  },
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject74 || (absorb_templateObject74 = absorb_taggedTemplateLiteral(["Ponzi Apparatus"])))
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject75 || (absorb_templateObject75 = absorb_taggedTemplateLiteral(["The Haunted Kitchen"]))),
  after: ["Manor/Kitchen"],
  choices: {
    893: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject76 || (absorb_templateObject76 = absorb_taggedTemplateLiteral(["The Haunted Billiards Room"]))),
  after: ["Manor/Billiards"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject77 || (absorb_templateObject77 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().attack().repeat(), (0,template_string/* $monster */.O4)(absorb_templateObject78 || (absorb_templateObject78 = absorb_taggedTemplateLiteral(["chalkdust wraith"])))),
  choices: {
    900: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject79 || (absorb_templateObject79 = absorb_taggedTemplateLiteral(["The Haunted Library"]))),
  after: ["Manor/Library"],
  choices: {
    163: 4,
    888: 4,
    889: 5,
    894: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject80 || (absorb_templateObject80 = absorb_taggedTemplateLiteral(["The Haunted Gallery"]))),
  after: ["Manor/Gallery"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject81 || (absorb_templateObject81 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    89: 6,
    896: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject82 || (absorb_templateObject82 = absorb_taggedTemplateLiteral(["The Haunted Bathroom"]))),
  after: ["Manor/Bathroom"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject83 || (absorb_templateObject83 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    881: 1,
    105: 1,
    892: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject84 || (absorb_templateObject84 = absorb_taggedTemplateLiteral(["The Haunted Bedroom"]))),
  after: ["Manor/Bedroom"],
  choices: {
    876: 1,
    877: 1,
    878: 4,
    879: 1,
    880: 1,
    897: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject85 || (absorb_templateObject85 = absorb_taggedTemplateLiteral(["The Haunted Ballroom"]))),
  after: ["Manor/Ballroom"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject86 || (absorb_templateObject86 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    881: 1,
    105: 1,
    892: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject87 || (absorb_templateObject87 = absorb_taggedTemplateLiteral(["The Haunted Wine Cellar"]))),
  after: ["Manor/Wine Cellar"],
  choices: {
    901: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject88 || (absorb_templateObject88 = absorb_taggedTemplateLiteral(["The Haunted Laundry Room"]))),
  after: ["Manor/Laundry Room"],
  choices: {
    891: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject89 || (absorb_templateObject89 = absorb_taggedTemplateLiteral(["The Haunted Boiler Room"]))),
  after: ["Manor/Boiler Room"],
  choices: {
    902: 2
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: (0,template_string/* $location */.PG)(absorb_templateObject90 || (absorb_templateObject90 = absorb_taggedTemplateLiteral(["The Haunted Storage Room"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    886: 6,
    890: 1
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: (0,template_string/* $location */.PG)(absorb_templateObject91 || (absorb_templateObject91 = absorb_taggedTemplateLiteral(["The Haunted Nursery"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    884: 6,
    898: 2
  }
}, {
  prepare: () => {
    if (step("questM17Babies") === -1) (0,external_kolmafia_.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
  },
  do: (0,template_string/* $location */.PG)(absorb_templateObject92 || (absorb_templateObject92 = absorb_taggedTemplateLiteral(["The Haunted Laboratory"]))),
  after: ["Manor/Finish Floor2"],
  choices: {
    884: 6,
    903: 2
  }
}, // Level 11: Palindome
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject93 || (absorb_templateObject93 = absorb_taggedTemplateLiteral(["The Copperhead Club"]))),
  after: ["Palindome/Copperhead"],
  choices: {
    855: 4
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject94 || (absorb_templateObject94 = absorb_taggedTemplateLiteral(["A Mob of Zeppelin Protesters"]))),
  after: ["Palindome/Protesters Finish"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject95 || (absorb_templateObject95 = absorb_taggedTemplateLiteral(["The Red Zeppelin"]))),
  after: ["Palindome/Zepplin"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject96 || (absorb_templateObject96 = absorb_taggedTemplateLiteral(["Inside the Palindome"]))),
  after: ["Palindome/Palindome Photos"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject97 || (absorb_templateObject97 = absorb_taggedTemplateLiteral(["Talisman o' Namsilat, miniature crystal ball"])))
  },
  choices: {
    2: 2,
    126: 1,
    127: 1,
    180: 2
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject98 || (absorb_templateObject98 = absorb_taggedTemplateLiteral(["Whitey's Grove"]))),
  after: ["Palindome/Open Alarm"],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject99 || (absorb_templateObject99 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  },
  choices: {
    73: 3,
    74: 2,
    75: 2
  }
}, // Level 11: Pyramid
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject100 || (absorb_templateObject100 = absorb_taggedTemplateLiteral(["The Arid, Extra-Dry Desert"]))),
  after: ["Macguffin/Desert"]
}, {
  priority: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(absorb_templateObject101 || (absorb_templateObject101 = absorb_taggedTemplateLiteral(["Ultrahydrated"])))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(absorb_templateObject102 || (absorb_templateObject102 = absorb_taggedTemplateLiteral(["Grey Goose"])))) >= 6 ? OverridePriority.Effect : OverridePriority.None,
  do: (0,template_string/* $location */.PG)(absorb_templateObject103 || (absorb_templateObject103 = absorb_taggedTemplateLiteral(["The Oasis"]))),
  after: ["Macguffin/Desert"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject104 || (absorb_templateObject104 = absorb_taggedTemplateLiteral(["The Upper Chamber"]))),
  after: ["Macguffin/Upper Chamber"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject105 || (absorb_templateObject105 = absorb_taggedTemplateLiteral(["The Middle Chamber"]))),
  after: ["Macguffin/Middle Chamber"]
}, // Misc areas
// These are probably only worthwhile with orb
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject106 || (absorb_templateObject106 = absorb_taggedTemplateLiteral(["South of the Border"]))),
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(absorb_templateObject107 || (absorb_templateObject107 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))),
  after: ["Misc/Unlock Beach", "Absorb/Whitey's Grove"],
  choices: {
    4: 3
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject108 || (absorb_templateObject108 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject109 || (absorb_templateObject109 = absorb_taggedTemplateLiteral(["The Unquiet Garves"]))),
  after: ["Crypt/Start"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject110 || (absorb_templateObject110 = absorb_taggedTemplateLiteral(["The Old Landfill"]))),
  after: ["Mosquito/Start"],
  prepare: () => {
    if (step("questM19Hippy") === -1) {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
      (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=798&option=1");
      (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=798&option=2");
      (0,external_kolmafia_.visitUrl)("woods.php");
    }

    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(absorb_templateObject111 || (absorb_templateObject111 = absorb_taggedTemplateLiteral(["funky junk key"]))))) {
      (0,external_kolmafia_.putCloset)((0,template_string/* $item */.xr)(absorb_templateObject112 || (absorb_templateObject112 = absorb_taggedTemplateLiteral(["funky junk key"]))), (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(absorb_templateObject113 || (absorb_templateObject113 = absorb_taggedTemplateLiteral(["funky junk key"])))));
    }
  },
  ready: () => atLevel(6)
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject114 || (absorb_templateObject114 = absorb_taggedTemplateLiteral(["The Skeleton Store"]))),
  after: [],
  prepare: () => {
    if (step("questM23Meatsmith") === -1) {
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith");
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
      (0,external_kolmafia_.runChoice)(1);
    }
  },
  choices: {
    1060: 1
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject115 || (absorb_templateObject115 = absorb_taggedTemplateLiteral(["The Overgrown Lot"]))),
  after: [],
  prepare: () => {
    if (step("questM24Doc") === -1) {
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=doc");
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=doc&action=talk");
      (0,external_kolmafia_.runChoice)(1);
    }
  },
  choices: {
    1062: 3
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject116 || (absorb_templateObject116 = absorb_taggedTemplateLiteral(["Madness Bakery"]))),
  after: [],
  prepare: () => {
    if (step("questM25Armorer") === -1) {
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=armory");
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=armory&action=talk");
      (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=1065&option=1");
    }
  },
  choices: {
    1061: 5
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject117 || (absorb_templateObject117 = absorb_taggedTemplateLiteral(["The Dungeons of Doom"]))),
  skill: (0,template_string/* $skill */.tm)(absorb_templateObject118 || (absorb_templateObject118 = absorb_taggedTemplateLiteral(["Hivemindedness"]))),
  after: [],
  prepare: () => {
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(absorb_templateObject119 || (absorb_templateObject119 = absorb_taggedTemplateLiteral(["plus sign"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(absorb_templateObject120 || (absorb_templateObject120 = absorb_taggedTemplateLiteral(["plus sign"]))));
  },
  ready: () => (0,property/* get */.U2)("lastPlusSignUnlock") === (0,external_kolmafia_.myAscensions)(),
  choices: {
    25: 3
  },
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject121 || (absorb_templateObject121 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, // Moon-sign zones
{
  do: (0,template_string/* $location */.PG)(absorb_templateObject122 || (absorb_templateObject122 = absorb_taggedTemplateLiteral(["The Bugbear Pen"]))),
  ready: () => (0,external_kolmafia_.knollAvailable)(),
  prepare: () => {
    if (step("questM03Bugbear") === -1) {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=knoll_friendly&action=dk_mayor");
    }
  },
  after: ["Mosquito/Start"]
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject123 || (absorb_templateObject123 = absorb_taggedTemplateLiteral(["Outskirts of Camp Logging Camp"]))),
  ready: () => (0,external_kolmafia_.canadiaAvailable)(),
  after: [],
  outfit: {
    modifier: "+combat",
    equip: (0,template_string/* $items */.vS)(absorb_templateObject124 || (absorb_templateObject124 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
  }
}, {
  do: (0,template_string/* $location */.PG)(absorb_templateObject125 || (absorb_templateObject125 = absorb_taggedTemplateLiteral(["Thugnderdome"]))),
  ready: () => (0,external_kolmafia_.gnomadsAvailable)(),
  after: []
}]; // All monsters that give adventures upon absorption

var reprocessTargets = new Set([// 10 adv monsters
(0,template_string/* $monster */.O4)(absorb_templateObject126 || (absorb_templateObject126 = absorb_taggedTemplateLiteral(["1335 HaXx0r"]))), (0,template_string/* $monster */.O4)(absorb_templateObject127 || (absorb_templateObject127 = absorb_taggedTemplateLiteral(["Alphabet Giant"]))), (0,template_string/* $monster */.O4)(absorb_templateObject128 || (absorb_templateObject128 = absorb_taggedTemplateLiteral(["black magic woman"]))), (0,template_string/* $monster */.O4)(absorb_templateObject129 || (absorb_templateObject129 = absorb_taggedTemplateLiteral(["blur"]))), (0,template_string/* $monster */.O4)(absorb_templateObject130 || (absorb_templateObject130 = absorb_taggedTemplateLiteral(["Bob Racecar"]))), (0,template_string/* $monster */.O4)(absorb_templateObject131 || (absorb_templateObject131 = absorb_taggedTemplateLiteral(["coaltergeist"]))), (0,template_string/* $monster */.O4)(absorb_templateObject132 || (absorb_templateObject132 = absorb_taggedTemplateLiteral(["fleet woodsman"]))), (0,template_string/* $monster */.O4)(absorb_templateObject133 || (absorb_templateObject133 = absorb_taggedTemplateLiteral(["Iiti Kitty"]))), (0,template_string/* $monster */.O4)(absorb_templateObject134 || (absorb_templateObject134 = absorb_taggedTemplateLiteral(["Irritating Series of Random Encounters"]))), (0,template_string/* $monster */.O4)(absorb_templateObject135 || (absorb_templateObject135 = absorb_taggedTemplateLiteral(["Little Man in the Canoe"]))), (0,template_string/* $monster */.O4)(absorb_templateObject136 || (absorb_templateObject136 = absorb_taggedTemplateLiteral(["mad wino"]))), (0,template_string/* $monster */.O4)(absorb_templateObject137 || (absorb_templateObject137 = absorb_taggedTemplateLiteral(["Mob Penguin Capo"]))), (0,template_string/* $monster */.O4)(absorb_templateObject138 || (absorb_templateObject138 = absorb_taggedTemplateLiteral(["One-Eyed Willie"]))), (0,template_string/* $monster */.O4)(absorb_templateObject139 || (absorb_templateObject139 = absorb_taggedTemplateLiteral(["pygmy blowgunner"]))), (0,template_string/* $monster */.O4)(absorb_templateObject140 || (absorb_templateObject140 = absorb_taggedTemplateLiteral(["pygmy headhunter"]))), (0,template_string/* $monster */.O4)(absorb_templateObject141 || (absorb_templateObject141 = absorb_taggedTemplateLiteral(["pygmy orderlies"]))), (0,template_string/* $monster */.O4)(absorb_templateObject142 || (absorb_templateObject142 = absorb_taggedTemplateLiteral(["pygmy shaman"]))), (0,template_string/* $monster */.O4)(absorb_templateObject143 || (absorb_templateObject143 = absorb_taggedTemplateLiteral(["Racecar Bob"]))), (0,template_string/* $monster */.O4)(absorb_templateObject144 || (absorb_templateObject144 = absorb_taggedTemplateLiteral(["Raver Giant"]))), (0,template_string/* $monster */.O4)(absorb_templateObject145 || (absorb_templateObject145 = absorb_taggedTemplateLiteral(["Renaissance Giant"]))), (0,template_string/* $monster */.O4)(absorb_templateObject146 || (absorb_templateObject146 = absorb_taggedTemplateLiteral(["swarm of fire ants"]))), (0,template_string/* $monster */.O4)(absorb_templateObject147 || (absorb_templateObject147 = absorb_taggedTemplateLiteral(["tomb asp"]))), // 7 adv monsters
(0,template_string/* $monster */.O4)(absorb_templateObject148 || (absorb_templateObject148 = absorb_taggedTemplateLiteral(["animated rustic nightstand"]))), (0,template_string/* $monster */.O4)(absorb_templateObject149 || (absorb_templateObject149 = absorb_taggedTemplateLiteral(["basic lihc"]))), (0,template_string/* $monster */.O4)(absorb_templateObject150 || (absorb_templateObject150 = absorb_taggedTemplateLiteral(["Battlie Knight Ghost"]))), (0,template_string/* $monster */.O4)(absorb_templateObject151 || (absorb_templateObject151 = absorb_taggedTemplateLiteral(["Bubblemint Twins"]))), (0,template_string/* $monster */.O4)(absorb_templateObject152 || (absorb_templateObject152 = absorb_taggedTemplateLiteral(["CH Imp"]))), (0,template_string/* $monster */.O4)(absorb_templateObject153 || (absorb_templateObject153 = absorb_taggedTemplateLiteral(["chalkdust wraith"]))), (0,template_string/* $monster */.O4)(absorb_templateObject154 || (absorb_templateObject154 = absorb_taggedTemplateLiteral(["cloud of disembodied whiskers"]))), (0,template_string/* $monster */.O4)(absorb_templateObject155 || (absorb_templateObject155 = absorb_taggedTemplateLiteral(["eXtreme Orcish snowboarder"]))), (0,template_string/* $monster */.O4)(absorb_templateObject156 || (absorb_templateObject156 = absorb_taggedTemplateLiteral(["gluttonous ghuol"]))), (0,template_string/* $monster */.O4)(_templateObject157 || (_templateObject157 = absorb_taggedTemplateLiteral(["Grass Elemental"]))), (0,template_string/* $monster */.O4)(_templateObject158 || (_templateObject158 = absorb_taggedTemplateLiteral(["grave rober zmobie"]))), (0,template_string/* $monster */.O4)(_templateObject159 || (_templateObject159 = absorb_taggedTemplateLiteral(["guy with a pitchfork, and his wife"]))), (0,template_string/* $monster */.O4)(_templateObject160 || (_templateObject160 = absorb_taggedTemplateLiteral(["junksprite sharpener"]))), (0,template_string/* $monster */.O4)(_templateObject161 || (_templateObject161 = absorb_taggedTemplateLiteral(["Knob Goblin Very Mad Scientist"]))), (0,template_string/* $monster */.O4)(_templateObject162 || (_templateObject162 = absorb_taggedTemplateLiteral(["model skeleton"]))), (0,template_string/* $monster */.O4)(_templateObject163 || (_templateObject163 = absorb_taggedTemplateLiteral(["Ninja Snowman Janitor"]))), (0,template_string/* $monster */.O4)(_templateObject164 || (_templateObject164 = absorb_taggedTemplateLiteral(["oil baron"]))), (0,template_string/* $monster */.O4)(_templateObject165 || (_templateObject165 = absorb_taggedTemplateLiteral(["party skelteon"]))), (0,template_string/* $monster */.O4)(_templateObject166 || (_templateObject166 = absorb_taggedTemplateLiteral(["possessed silverware drawer"]))), (0,template_string/* $monster */.O4)(_templateObject167 || (_templateObject167 = absorb_taggedTemplateLiteral(["possessed toy chest"]))), (0,template_string/* $monster */.O4)(_templateObject168 || (_templateObject168 = absorb_taggedTemplateLiteral(["revolving bugbear"]))), (0,template_string/* $monster */.O4)(_templateObject169 || (_templateObject169 = absorb_taggedTemplateLiteral(["sabre-toothed goat"]))), (0,template_string/* $monster */.O4)(_templateObject170 || (_templateObject170 = absorb_taggedTemplateLiteral(["serialbus"]))), (0,template_string/* $monster */.O4)(_templateObject171 || (_templateObject171 = absorb_taggedTemplateLiteral(["sheet ghost"]))), (0,template_string/* $monster */.O4)(_templateObject172 || (_templateObject172 = absorb_taggedTemplateLiteral(["skeletal hamster"]))), (0,template_string/* $monster */.O4)(_templateObject173 || (_templateObject173 = absorb_taggedTemplateLiteral(["smut orc pipelayer"]))), (0,template_string/* $monster */.O4)(_templateObject174 || (_templateObject174 = absorb_taggedTemplateLiteral(["swarm of killer bees"]))), (0,template_string/* $monster */.O4)(_templateObject175 || (_templateObject175 = absorb_taggedTemplateLiteral(["tapdancing skeleton"]))), (0,template_string/* $monster */.O4)(_templateObject176 || (_templateObject176 = absorb_taggedTemplateLiteral(["toilet papergeist"]))), (0,template_string/* $monster */.O4)(_templateObject177 || (_templateObject177 = absorb_taggedTemplateLiteral(["upgraded ram"]))), (0,template_string/* $monster */.O4)(_templateObject178 || (_templateObject178 = absorb_taggedTemplateLiteral(["vicious gnauga"]))), (0,template_string/* $monster */.O4)(_templateObject179 || (_templateObject179 = absorb_taggedTemplateLiteral(["whitesnake"]))), (0,template_string/* $monster */.O4)(_templateObject180 || (_templateObject180 = absorb_taggedTemplateLiteral(["Booze Giant"]))), // 5 adv monsters
(0,template_string/* $monster */.O4)(_templateObject181 || (_templateObject181 = absorb_taggedTemplateLiteral(["dire pigeon"]))), (0,template_string/* $monster */.O4)(_templateObject182 || (_templateObject182 = absorb_taggedTemplateLiteral(["gingerbread murderer"]))), (0,template_string/* $monster */.O4)(_templateObject183 || (_templateObject183 = absorb_taggedTemplateLiteral(["grave rober"]))), (0,template_string/* $monster */.O4)(_templateObject184 || (_templateObject184 = absorb_taggedTemplateLiteral(["irate mariachi"]))), (0,template_string/* $monster */.O4)(_templateObject185 || (_templateObject185 = absorb_taggedTemplateLiteral(["plastered frat orc"]))), (0,template_string/* $monster */.O4)(_templateObject186 || (_templateObject186 = absorb_taggedTemplateLiteral(["swarm of skulls"]))), (0,template_string/* $monster */.O4)(_templateObject187 || (_templateObject187 = absorb_taggedTemplateLiteral(["albino bat"]))), (0,template_string/* $monster */.O4)(_templateObject188 || (_templateObject188 = absorb_taggedTemplateLiteral(["batrat"]))), (0,template_string/* $monster */.O4)(_templateObject189 || (_templateObject189 = absorb_taggedTemplateLiteral(["G imp"]))), (0,template_string/* $monster */.O4)(_templateObject190 || (_templateObject190 = absorb_taggedTemplateLiteral(["Knob Goblin Bean Counter"]))), (0,template_string/* $monster */.O4)(_templateObject191 || (_templateObject191 = absorb_taggedTemplateLiteral(["Knob Goblin Madam"]))), (0,template_string/* $monster */.O4)(_templateObject192 || (_templateObject192 = absorb_taggedTemplateLiteral(["Knob Goblin Master Chef"]))), (0,template_string/* $monster */.O4)(_templateObject193 || (_templateObject193 = absorb_taggedTemplateLiteral(["L imp"]))), (0,template_string/* $monster */.O4)(_templateObject194 || (_templateObject194 = absorb_taggedTemplateLiteral(["magical fruit bat"]))), (0,template_string/* $monster */.O4)(_templateObject195 || (_templateObject195 = absorb_taggedTemplateLiteral(["P imp"]))), (0,template_string/* $monster */.O4)(_templateObject196 || (_templateObject196 = absorb_taggedTemplateLiteral(["swarm of Knob lice"]))), (0,template_string/* $monster */.O4)(_templateObject197 || (_templateObject197 = absorb_taggedTemplateLiteral(["W imp"]))), (0,template_string/* $monster */.O4)(_templateObject198 || (_templateObject198 = absorb_taggedTemplateLiteral(["warwelf"])))]); // Other monsters that give skills

var usefulSkills = new Map([[(0,template_string/* $skill */.tm)(_templateObject199 || (_templateObject199 = absorb_taggedTemplateLiteral(["Ponzi Apparatus"]))), (0,template_string/* $monster */.O4)(_templateObject200 || (_templateObject200 = absorb_taggedTemplateLiteral(["anglerbush"])))], [(0,template_string/* $skill */.tm)(_templateObject201 || (_templateObject201 = absorb_taggedTemplateLiteral(["Ominous Substrate"]))), (0,template_string/* $monster */.O4)(_templateObject202 || (_templateObject202 = absorb_taggedTemplateLiteral(["animated ornate nightstand"])))], [(0,template_string/* $skill */.tm)(_templateObject203 || (_templateObject203 = absorb_taggedTemplateLiteral(["Innuendo Circuitry"]))), (0,template_string/* $monster */.O4)(_templateObject204 || (_templateObject204 = absorb_taggedTemplateLiteral(["Astronomer"])))], [(0,template_string/* $skill */.tm)(_templateObject205 || (_templateObject205 = absorb_taggedTemplateLiteral(["Exhaust Tubules"]))), (0,template_string/* $monster */.O4)(_templateObject206 || (_templateObject206 = absorb_taggedTemplateLiteral(["beanbat"])))], [(0,template_string/* $skill */.tm)(_templateObject207 || (_templateObject207 = absorb_taggedTemplateLiteral(["Overclocking"]))), (0,template_string/* $monster */.O4)(_templateObject208 || (_templateObject208 = absorb_taggedTemplateLiteral(["Big Wheelin' Twins"])))], [(0,template_string/* $skill */.tm)(_templateObject209 || (_templateObject209 = absorb_taggedTemplateLiteral(["Photonic Shroud"]))), (0,template_string/* $monster */.O4)(_templateObject210 || (_templateObject210 = absorb_taggedTemplateLiteral(["black panther"])))], [(0,template_string/* $skill */.tm)(_templateObject211 || (_templateObject211 = absorb_taggedTemplateLiteral(["Fluid Dynamics Simulation"]))), (0,template_string/* $monster */.O4)(_templateObject212 || (_templateObject212 = absorb_taggedTemplateLiteral(["Carnivorous Moxie Weed"])))], [(0,template_string/* $skill */.tm)(_templateObject213 || (_templateObject213 = absorb_taggedTemplateLiteral(["Ectogenesis"]))), (0,template_string/* $monster */.O4)(_templateObject214 || (_templateObject214 = absorb_taggedTemplateLiteral(["Claybender Sorcerer Ghost"])))], [(0,template_string/* $skill */.tm)(_templateObject215 || (_templateObject215 = absorb_taggedTemplateLiteral(["Microburner"]))), (0,template_string/* $monster */.O4)(_templateObject216 || (_templateObject216 = absorb_taggedTemplateLiteral(["Cobb's Knob oven"])))], [(0,template_string/* $skill */.tm)(_templateObject217 || (_templateObject217 = absorb_taggedTemplateLiteral(["Localized Vacuum"]))), (0,template_string/* $monster */.O4)(_templateObject218 || (_templateObject218 = absorb_taggedTemplateLiteral(["cubist bull"])))], [(0,template_string/* $skill */.tm)(_templateObject219 || (_templateObject219 = absorb_taggedTemplateLiteral(["Infernal Automata"]))), (0,template_string/* $monster */.O4)(_templateObject220 || (_templateObject220 = absorb_taggedTemplateLiteral(["demonic icebox"])))], [(0,template_string/* $skill */.tm)(_templateObject221 || (_templateObject221 = absorb_taggedTemplateLiteral(["Secondary Fermentation"]))), (0,template_string/* $monster */.O4)(_templateObject222 || (_templateObject222 = absorb_taggedTemplateLiteral(["drunk goat"])))], [(0,template_string/* $skill */.tm)(_templateObject223 || (_templateObject223 = absorb_taggedTemplateLiteral(["Double Nanovision"]))), (0,template_string/* $monster */.O4)(_templateObject224 || (_templateObject224 = absorb_taggedTemplateLiteral(["drunk pygmy"])))], [(0,template_string/* $skill */.tm)(_templateObject225 || (_templateObject225 = absorb_taggedTemplateLiteral(["Microweave"]))), (0,template_string/* $monster */.O4)(_templateObject226 || (_templateObject226 = absorb_taggedTemplateLiteral(["eXtreme cross-country hippy"])))], [(0,template_string/* $skill */.tm)(_templateObject227 || (_templateObject227 = absorb_taggedTemplateLiteral(["AUTOEXEC.BAT"]))), (0,template_string/* $monster */.O4)(_templateObject228 || (_templateObject228 = absorb_taggedTemplateLiteral(["Flock of Stab-bats"])))], [(0,template_string/* $skill */.tm)(_templateObject229 || (_templateObject229 = absorb_taggedTemplateLiteral(["Propagation Drive"]))), (0,template_string/* $monster */.O4)(_templateObject230 || (_templateObject230 = absorb_taggedTemplateLiteral(["junksprite bender"])))], [(0,template_string/* $skill */.tm)(_templateObject231 || (_templateObject231 = absorb_taggedTemplateLiteral(["Camp Subroutines"]))), (0,template_string/* $monster */.O4)(_templateObject232 || (_templateObject232 = absorb_taggedTemplateLiteral(["Knob Goblin Harem Girl"])))], [(0,template_string/* $skill */.tm)(_templateObject233 || (_templateObject233 = absorb_taggedTemplateLiteral(["Cryocurrency"]))), (0,template_string/* $monster */.O4)(_templateObject234 || (_templateObject234 = absorb_taggedTemplateLiteral(["Knob Goblin MBA"])))], [(0,template_string/* $skill */.tm)(_templateObject235 || (_templateObject235 = absorb_taggedTemplateLiteral(["Curses Library"]))), (0,template_string/* $monster */.O4)(_templateObject236 || (_templateObject236 = absorb_taggedTemplateLiteral(["lihc"])))], [(0,template_string/* $skill */.tm)(_templateObject237 || (_templateObject237 = absorb_taggedTemplateLiteral(["Clammy Microcilia"]))), (0,template_string/* $monster */.O4)(_templateObject238 || (_templateObject238 = absorb_taggedTemplateLiteral(["malevolent hair clog"])))], [(0,template_string/* $skill */.tm)(_templateObject239 || (_templateObject239 = absorb_taggedTemplateLiteral(["Financial Spreadsheets"]))), (0,template_string/* $monster */.O4)(_templateObject240 || (_templateObject240 = absorb_taggedTemplateLiteral(["me4t begZ0r"])))], [(0,template_string/* $skill */.tm)(_templateObject241 || (_templateObject241 = absorb_taggedTemplateLiteral(["Hivemindedness"]))), (0,template_string/* $monster */.O4)(_templateObject242 || (_templateObject242 = absorb_taggedTemplateLiteral(["mind flayer"])))], [(0,template_string/* $skill */.tm)(_templateObject243 || (_templateObject243 = absorb_taggedTemplateLiteral(["Cooling Tubules"]))), (0,template_string/* $monster */.O4)(_templateObject244 || (_templateObject244 = absorb_taggedTemplateLiteral(["Ninja Snowman Weaponmaster"])))], // [$skill`Lubricant Layer`, $monster`oil slick`],
[(0,template_string/* $skill */.tm)(_templateObject245 || (_templateObject245 = absorb_taggedTemplateLiteral(["Conifer Polymers"]))), (0,template_string/* $monster */.O4)(_templateObject246 || (_templateObject246 = absorb_taggedTemplateLiteral(["pine bat"])))], [(0,template_string/* $skill */.tm)(_templateObject247 || (_templateObject247 = absorb_taggedTemplateLiteral(["Legacy Code"]))), (0,template_string/* $monster */.O4)(_templateObject248 || (_templateObject248 = absorb_taggedTemplateLiteral(["possessed wine rack"])))], [(0,template_string/* $skill */.tm)(_templateObject249 || (_templateObject249 = absorb_taggedTemplateLiteral(["System Sweep"]))), (0,template_string/* $monster */.O4)(_templateObject250 || (_templateObject250 = absorb_taggedTemplateLiteral(["pygmy janitor"])))], [(0,template_string/* $skill */.tm)(_templateObject251 || (_templateObject251 = absorb_taggedTemplateLiteral(["Infinite Loop"]))), (0,template_string/* $monster */.O4)(_templateObject252 || (_templateObject252 = absorb_taggedTemplateLiteral(["pygmy witch lawyer"])))], [(0,template_string/* $skill */.tm)(_templateObject253 || (_templateObject253 = absorb_taggedTemplateLiteral(["Ire Proof"]))), (0,template_string/* $monster */.O4)(_templateObject254 || (_templateObject254 = absorb_taggedTemplateLiteral(["raging bull"])))], [(0,template_string/* $skill */.tm)(_templateObject255 || (_templateObject255 = absorb_taggedTemplateLiteral(["Nanofur"]))), (0,template_string/* $monster */.O4)(_templateObject256 || (_templateObject256 = absorb_taggedTemplateLiteral(["ratbat"])))], [(0,template_string/* $skill */.tm)(_templateObject257 || (_templateObject257 = absorb_taggedTemplateLiteral(["Procgen Ribaldry"]))), (0,template_string/* $monster */.O4)(_templateObject258 || (_templateObject258 = absorb_taggedTemplateLiteral(["smut orc screwer"])))], [(0,template_string/* $skill */.tm)(_templateObject259 || (_templateObject259 = absorb_taggedTemplateLiteral(["Snow-Cooling System"]))), (0,template_string/* $monster */.O4)(_templateObject260 || (_templateObject260 = absorb_taggedTemplateLiteral(["Snow Queen"])))], [(0,template_string/* $skill */.tm)(_templateObject261 || (_templateObject261 = absorb_taggedTemplateLiteral(["Phase Shift"]))), (0,template_string/* $monster */.O4)(_templateObject262 || (_templateObject262 = absorb_taggedTemplateLiteral(["Spectral Jellyfish"])))], [(0,template_string/* $skill */.tm)(_templateObject263 || (_templateObject263 = absorb_taggedTemplateLiteral(["Autovampirism Routines"]))), (0,template_string/* $monster */.O4)(_templateObject264 || (_templateObject264 = absorb_taggedTemplateLiteral(["spooky vampire"])))], [(0,template_string/* $skill */.tm)(_templateObject265 || (_templateObject265 = absorb_taggedTemplateLiteral(["Steam Mycelia"]))), (0,template_string/* $monster */.O4)(_templateObject266 || (_templateObject266 = absorb_taggedTemplateLiteral(["steam elemental"])))], [(0,template_string/* $skill */.tm)(_templateObject267 || (_templateObject267 = absorb_taggedTemplateLiteral(["Gravitational Compression"]))), (0,template_string/* $monster */.O4)(_templateObject268 || (_templateObject268 = absorb_taggedTemplateLiteral(["suckubus"])))], [(0,template_string/* $skill */.tm)(_templateObject269 || (_templateObject269 = absorb_taggedTemplateLiteral(["Grey Noise"]))), (0,template_string/* $monster */.O4)(_templateObject270 || (_templateObject270 = absorb_taggedTemplateLiteral(["Boss Bat"])))], [(0,template_string/* $skill */.tm)(_templateObject271 || (_templateObject271 = absorb_taggedTemplateLiteral(["Anti-Sleaze Recursion"]))), (0,template_string/* $monster */.O4)(_templateObject272 || (_templateObject272 = absorb_taggedTemplateLiteral(["werecougar"])))], [(0,template_string/* $skill */.tm)(_templateObject273 || (_templateObject273 = absorb_taggedTemplateLiteral(["Piezoelectric Honk"]))), (0,template_string/* $monster */.O4)(_templateObject274 || (_templateObject274 = absorb_taggedTemplateLiteral(["white lion"])))]]);
var usefulMonsters = new Set([].concat(absorb_toConsumableArray(reprocessTargets), absorb_toConsumableArray(usefulSkills.values())));

function monstersAt(location) {
  var result = Object.entries((0,external_kolmafia_.appearanceRates)(location)).filter(i => i[1] !== -2) // Avoid impossible monsters
  .map(i => external_kolmafia_.Monster.get(i[0]));
  return result;
}

var AbsorbState = /*#__PURE__*/function () {
  function AbsorbState() {
    absorb_classCallCheck(this, AbsorbState);

    absorb_defineProperty(this, "absorbed", new Set());

    absorb_defineProperty(this, "reprocessed", new Set());

    absorb_defineProperty(this, "ignored", new Set());

    var charsheet = (0,external_kolmafia_.visitUrl)("charsheet.php");
    var match; // Mark down all absorbed monsters that didn't give skills

    var monster_regex = new RegExp(/Absorbed [^<]* from ([^<]*)\./g);

    do {
      match = monster_regex.exec(charsheet);

      if (match) {
        var name = match[1].replace(/^a /g, "").replace(/^an /g, "").replace(/^some /g, "").replace(/^the /g, "").replace(/^The /g, "");
        this.absorbed.add(external_kolmafia_.Monster.get(name));
      }
    } while (match); // Mark down all absorbed monsters that gave skills


    var skill_regex = new RegExp(/<a onClick='javascript:poop\("[^"]*","skill", \d+, \d+\)'>([^<]*)<\/a>/g);

    do {
      match = skill_regex.exec(charsheet);

      if (match) {
        var monster = usefulSkills.get(external_kolmafia_.Skill.get(match[1]));
        if (monster === undefined) continue;
        this.absorbed.add(monster);
      }
    } while (match); // Mark down all monsters that we have reprocessed


    (0,property/* get */.U2)("gooseReprocessed").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_.Monster.get(id)).map(monster => this.reprocessed.add(monster)); // Ignore the elemental skills that are not useful for the tower

    var ignored_skills = new Set();
    var needed_elem_skills = {
      hot: (0,template_string/* $skills */.nx)(_templateObject275 || (_templateObject275 = absorb_taggedTemplateLiteral(["Microburner, Infernal Automata, Steam Mycelia"]))),
      cold: (0,template_string/* $skills */.nx)(_templateObject276 || (_templateObject276 = absorb_taggedTemplateLiteral(["Cryocurrency, Cooling Tubules, Snow-Cooling System"]))),
      spooky: (0,template_string/* $skills */.nx)(_templateObject277 || (_templateObject277 = absorb_taggedTemplateLiteral(["Curses Library, Ominous Substrate, Legacy Code"]))),
      stench: (0,template_string/* $skills */.nx)(_templateObject278 || (_templateObject278 = absorb_taggedTemplateLiteral(["Exhaust Tubules, Secondary Fermentation, AUTOEXEC.BAT"]))),
      sleaze: (0,template_string/* $skills */.nx)(_templateObject279 || (_templateObject279 = absorb_taggedTemplateLiteral(["Camp Subroutines, Procgen Ribaldry, Innuendo Circuitry"])))
    };

    for (var _elem in needed_elem_skills) {
      if ((0,property/* get */.U2)("nsChallenge2") !== _elem) {
        var _iterator2 = absorb_createForOfIteratorHelper(needed_elem_skills[_elem]),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var unneeded_skill = _step2.value;
            ignored_skills.add(unneeded_skill);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } // No need for resistance skills if we already have enough


    var res_skills = (0,template_string/* $skills */.nx)(_templateObject280 || (_templateObject280 = absorb_taggedTemplateLiteral(["Ire Proof, Nanofur, Autovampirism Routines, Conifer Polymers, Anti-Sleaze Recursion, Localized Vacuum, Microweave, Ectogenesis, Clammy Microcilia, Lubricant Layer"])));

    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject281 || (_templateObject281 = absorb_taggedTemplateLiteral(["ice crown"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject282 || (_templateObject282 = absorb_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) {
      var _iterator3 = absorb_createForOfIteratorHelper(res_skills),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var skill = _step3.value;
          ignored_skills.add(skill);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } // We need a single +cold dmg source for orcs


    if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(_templateObject283 || (_templateObject283 = absorb_taggedTemplateLiteral(["frozen jeans"])))) && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject284 || (_templateObject284 = absorb_taggedTemplateLiteral(["Cryocurrency"])))) && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(_templateObject285 || (_templateObject285 = absorb_taggedTemplateLiteral(["Cooling Tubules"]))))) {
      ignored_skills.delete((0,template_string/* $skill */.tm)(_templateObject286 || (_templateObject286 = absorb_taggedTemplateLiteral(["Snow-Cooling System"]))));
    }

    var _iterator4 = absorb_createForOfIteratorHelper(ignored_skills),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _skill = _step4.value;

        var _monster2 = usefulSkills.get(_skill);

        if (_monster2 === undefined) continue;
        this.ignored.add(_monster2);
      } // Ignore skills after the NS is defeated

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    if (step("questL13Final") > 11) {
      var _iterator5 = absorb_createForOfIteratorHelper(usefulSkills.values()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _monster = _step5.value;
          this.ignored.add(_monster);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } // Don't bother to chase the ice house banished monster


    var icehouse = (0,lib/* getBanishedMonsters */.$c)().get((0,template_string/* $item */.xr)(_templateObject287 || (_templateObject287 = absorb_taggedTemplateLiteral(["ice house"]))));
    if (icehouse !== undefined) this.ignored.add(icehouse);
  }

  absorb_createClass(AbsorbState, [{
    key: "remainingReprocess",
    value: function remainingReprocess(location) {
      // Return all remaining desired and unreprocessed monsters, in this location or everywhere
      if (!location) {
        return absorb_toConsumableArray(reprocessTargets).filter(monster => !this.reprocessed.has(monster) && !this.ignored.has(monster));
      }

      return monstersAt(location).filter(monster => this.isReprocessTarget(monster));
    }
  }, {
    key: "remainingAbsorbs",
    value: function remainingAbsorbs(location) {
      // Return all remaining desired and unabsorbed monsters, in this location or everywhere
      if (!location) {
        return absorb_toConsumableArray(usefulMonsters).filter(monster => !this.absorbed.has(monster) && !this.ignored.has(monster));
      }

      return monstersAt(location).filter(monster => this.isTarget(monster));
    }
  }, {
    key: "hasTargets",
    value: function hasTargets(location) {
      // Return true if the location has at least one desired unabsorbed monster
      return this.remainingAbsorbs(location).length > 0;
    }
  }, {
    key: "hasReprocessTargets",
    value: function hasReprocessTargets(location) {
      // Return true if the location has at least one desired unabsorbed monster we desire to reprocess
      return this.remainingReprocess(location).length > 0;
    }
  }, {
    key: "isTarget",
    value: function isTarget(monster) {
      // Return true if the monster is desired and unabsorbed
      return usefulMonsters.has(monster) && !this.absorbed.has(monster) && !this.ignored.has(monster);
    }
  }, {
    key: "isReprocessTarget",
    value: function isReprocessTarget(monster) {
      // Return true if the monster is desired and unreprocessed
      return reprocessTargets.has(monster) && !this.reprocessed.has(monster) && !this.ignored.has(monster);
    }
  }]);

  return AbsorbState;
}();
var AbsorbQuest = {
  name: "Absorb",
  tasks: [].concat(absorb_toConsumableArray(absorbTasks.map(task => {
    var _task$combat;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: task.do.toString(),
      completed: state => !state.absorb.hasTargets(task.do)
    }, task), {}, {
      after: task.skill ? [].concat(absorb_toConsumableArray(task.after), [task.skill.name]) : task.after,
      combat: ((_task$combat = task.combat) !== null && _task$combat !== void 0 ? _task$combat : new src_combat.CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: (0,template_string/* $items */.vS)(_templateObject288 || (_templateObject288 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), absorb_toConsumableArray(absorbTasks.filter(task => task.skill !== undefined).map(task => {
    var _task$skill$name, _task$skill, _task$combat2;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: (_task$skill$name = (_task$skill = task.skill) === null || _task$skill === void 0 ? void 0 : _task$skill.name) !== null && _task$skill$name !== void 0 ? _task$skill$name : "",
      completed: () => {
        var _task$skill2;

        return (0,lib/* have */.lf)((_task$skill2 = task.skill) !== null && _task$skill2 !== void 0 ? _task$skill2 : (0,template_string/* $skill */.tm)(_templateObject289 || (_templateObject289 = absorb_taggedTemplateLiteral(["none"]))));
      }
    }, task), {}, {
      combat: ((_task$combat2 = task.combat) !== null && _task$combat2 !== void 0 ? _task$combat2 : new src_combat.CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: (0,template_string/* $items */.vS)(_templateObject290 || (_templateObject290 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), [{
    // Add a last task for routing
    name: "All",
    after: absorbTasks.map(task => task.do.toString()),
    ready: () => false,
    completed: () => true,
    do: () => {
      throw "Unable to absorb all target monsters";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
var ReprocessQuest = {
  name: "Reprocess",
  tasks: [].concat(absorb_toConsumableArray(absorbTasks.map(task => {
    var _task$combat3;

    var result = absorb_objectSpread(absorb_objectSpread({
      name: task.do.toString(),
      completed: state => !state.absorb.hasReprocessTargets(task.do)
    }, task), {}, {
      after: [].concat(absorb_toConsumableArray(task.after), ["Absorb/".concat(task.do.toString())]),
      ready: state => (task.ready === undefined || task.ready(state)) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(_templateObject291 || (_templateObject291 = absorb_taggedTemplateLiteral(["Grey Goose"])))) >= 6,
      combat: ((_task$combat3 = task.combat) !== null && _task$combat3 !== void 0 ? _task$combat3 : new src_combat.CombatStrategy()).ignore(),
      // killing targetting monsters is set in the engine
      limit: {
        soft: 25
      }
    });

    if (result.outfit === undefined) result.outfit = {
      equip: (0,template_string/* $items */.vS)(_templateObject292 || (_templateObject292 = absorb_taggedTemplateLiteral(["miniature crystal ball"])))
    };
    return result;
  })), [{
    // Add a last task for routing
    name: "All",
    after: absorbTasks.map(task => task.do.toString()),
    ready: () => false,
    completed: () => true,
    do: () => {
      throw "Unable to reprocess all target monsters";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/state.ts
function state_slicedToArray(arr, i) { return state_arrayWithHoles(arr) || state_iterableToArrayLimit(arr, i) || state_unsupportedIterableToArray(arr, i) || state_nonIterableRest(); }

function state_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function state_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return state_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return state_arrayLikeToArray(o, minLen); }

function state_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function state_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function state_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function state_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function state_createClass(Constructor, protoProps, staticProps) { if (protoProps) state_defineProperties(Constructor.prototype, protoProps); if (staticProps) state_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function state_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function state_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var GameState = /*#__PURE__*/state_createClass(function GameState() {
  state_classCallCheck(this, GameState);

  state_defineProperty(this, "banishes", void 0);

  state_defineProperty(this, "absorb", void 0);

  state_defineProperty(this, "orb", void 0);

  this.banishes = new BanishState();
  this.absorb = new AbsorbState();
  this.orb = new OrbState();
});

var OrbState = /*#__PURE__*/function () {
  function OrbState() {
    state_classCallCheck(this, OrbState);

    state_defineProperty(this, "predictions", void 0);

    (0,external_kolmafia_.visitUrl)("inventory.php?ponder=1", false);
    this.predictions = new Map((0,property/* get */.U2)("crystalBallPredictions").split("|").map(element => element.split(":")).map(_ref => {
      var _ref2 = state_slicedToArray(_ref, 3),
          location = _ref2[1],
          monster = _ref2[2];

      return [(0,external_kolmafia_.toLocation)(location), (0,external_kolmafia_.toMonster)(monster)];
    }));
  }

  state_createClass(OrbState, [{
    key: "prediction",
    value: function prediction(loc) {
      return this.predictions.get(loc);
    }
  }]);

  return OrbState;
}();
;// CONCATENATED MODULE: ./src/engine.ts
var engine_templateObject, engine_templateObject2, engine_templateObject3, engine_templateObject4, engine_templateObject5, engine_templateObject6, engine_templateObject7, engine_templateObject8, engine_templateObject9, engine_templateObject10, engine_templateObject11, engine_templateObject12, engine_templateObject13, engine_templateObject14, engine_templateObject15, engine_templateObject16, engine_templateObject17, engine_templateObject18, engine_templateObject19, engine_templateObject20, engine_templateObject21, engine_templateObject22, engine_templateObject23, engine_templateObject24, engine_templateObject25, engine_templateObject26, engine_templateObject27, engine_templateObject28, engine_templateObject29, engine_templateObject30, engine_templateObject31, engine_templateObject32, engine_templateObject33, engine_templateObject34, engine_templateObject35, engine_templateObject36;

function engine_toConsumableArray(arr) { return engine_arrayWithoutHoles(arr) || engine_iterableToArray(arr) || engine_unsupportedIterableToArray(arr) || engine_nonIterableSpread(); }

function engine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function engine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function engine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return engine_arrayLikeToArray(arr); }

function engine_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function engine_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = engine_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function engine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return engine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return engine_arrayLikeToArray(o, minLen); }

function engine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function engine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function engine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function engine_createClass(Constructor, protoProps, staticProps) { if (protoProps) engine_defineProperties(Constructor.prototype, protoProps); if (staticProps) engine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function engine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var wanderingNCs = new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
var Engine = /*#__PURE__*/function () {
  function Engine(tasks) {
    engine_classCallCheck(this, Engine);

    engine_defineProperty(this, "attempts", {});

    engine_defineProperty(this, "propertyManager", new property/* PropertiesManager */.Jr());

    engine_defineProperty(this, "tasks", void 0);

    engine_defineProperty(this, "tasks_by_name", new Map());

    this.tasks = tasks;

    var _iterator = engine_createForOfIteratorHelper(tasks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  engine_createClass(Engine, [{
    key: "available",
    value: function available(task, state) {
      var _iterator2 = engine_createForOfIteratorHelper(task.after),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var after = _step2.value;
          var after_task = this.tasks_by_name.get(after);
          if (after_task === undefined) throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed(state)) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (task.ready && !task.ready(state)) return false;
      if (task.completed(state)) return false; // Wait until we get Infinite Loop before doing most things

      if (task.do instanceof external_kolmafia_.Location && !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(engine_templateObject || (engine_templateObject = engine_taggedTemplateLiteral(["Infinite Loop"]))))) return false;
      return true;
    }
  }, {
    key: "hasDelay",
    value: function hasDelay(task) {
      if (!task.delay) return false;
      if (!(task.do instanceof external_kolmafia_.Location)) return false;
      return task.do.turnsSpent < task.delay;
    }
  }, {
    key: "execute",
    value: function execute(task, priority, state) {
      var _task$ready, _task$ready2;

      for (var _len = arguments.length, wanderers = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        wanderers[_key - 3] = arguments[_key];
      }

      debug("");
      var reason = priority.explain();
      var why = reason === "" ? "Route" : reason;
      debug("Executing ".concat(task.name, " [").concat(why, "]"), "blue");
      this.check_limits(task); // Get needed items

      var _iterator3 = engine_createForOfIteratorHelper(task.acquire || []),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _to_get$num;

          var to_get = _step3.value;
          var num_needed = (_to_get$num = to_get.num) !== null && _to_get$num !== void 0 ? _to_get$num : 1;
          var num_have = (0,external_kolmafia_.itemAmount)(to_get.item) + (0,external_kolmafia_.equippedAmount)(to_get.item);
          if (num_needed <= num_have) continue;
          if (to_get.useful !== undefined && !to_get.useful()) continue;

          if (to_get.item === (0,template_string/* $item */.xr)(engine_templateObject25 || (engine_templateObject25 = engine_taggedTemplateLiteral(["makeshift garbage shirt"])))) {
            // Hardcode to avoid mafia weirdness
            (0,external_kolmafia_.cliExecute)("fold makeshift garbage shirt");
          } else if (to_get.price !== undefined) {
            debug("Purchasing ".concat(num_needed - num_have, " ").concat(to_get.item, " below ").concat(to_get.price));
            (0,external_kolmafia_.buy)(to_get.item, num_needed - num_have, to_get.price);
          } else {
            debug("Acquiring ".concat(num_needed, " ").concat(to_get.item));
            (0,external_kolmafia_.retrieveItem)(to_get.item, num_needed);
          }

          if ((0,external_kolmafia_.itemAmount)(to_get.item) + (0,external_kolmafia_.equippedAmount)(to_get.item) < num_needed && !to_get.optional) {
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
          }
        } // Prepare basic equipment

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var outfit = Outfit.create(task, state);

      var _iterator4 = engine_createForOfIteratorHelper(wanderers),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var wanderer = _step4.value;
          if (!outfit.equip(wanderer === null || wanderer === void 0 ? void 0 : wanderer.equip)) throw "Wanderer equipment ".concat(wanderer.equip, " conflicts with ").concat(task.name);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var freeaction = typeof task.freeaction === "function" ? task.freeaction() : task.freeaction;

      if (!freeaction) {
        var _task$combat$clone, _task$combat;

        // Prepare combat macro
        var task_combat = (_task$combat$clone = (_task$combat = task.combat) === null || _task$combat === void 0 ? void 0 : _task$combat.clone()) !== null && _task$combat$clone !== void 0 ? _task$combat$clone : new src_combat.CombatStrategy(); // Absorb targeted monsters
        // (if we have teleportitis, everything is a possible target)

        var absorb_targets = task.do instanceof external_kolmafia_.Location ? new Set([].concat(engine_toConsumableArray(state.absorb.remainingAbsorbs((0,lib/* have */.lf)((0,template_string/* $effect */._G)(engine_templateObject2 || (engine_templateObject2 = engine_taggedTemplateLiteral(["Teleportitis"])))) ? undefined : task.do)), engine_toConsumableArray(state.absorb.remainingReprocess((0,lib/* have */.lf)((0,template_string/* $effect */._G)(engine_templateObject3 || (engine_templateObject3 = engine_taggedTemplateLiteral(["Teleportitis"])))) ? undefined : task.do)))) : [];

        var _iterator5 = engine_createForOfIteratorHelper(absorb_targets),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var monster = _step5.value;

            if (state.absorb.isReprocessTarget(monster)) {
              outfit.equip((0,template_string/* $familiar */.HP)(engine_templateObject14 || (engine_templateObject14 = engine_taggedTemplateLiteral(["Grey Goose"]))));
              task_combat.autoattack(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(engine_templateObject15 || (engine_templateObject15 = engine_taggedTemplateLiteral(["Re-Process Matter"])))), monster);
              task_combat.prependMacro(new dist_combat/* Macro */.LE().trySkill((0,template_string/* $skill */.tm)(engine_templateObject16 || (engine_templateObject16 = engine_taggedTemplateLiteral(["Re-Process Matter"])))), monster);
              debug("Target x2: ".concat(monster.name), "purple");
            } else {
              debug("Target: ".concat(monster.name), "purple");
            }

            var strategy = task_combat.currentStrategy(monster);

            if (strategy === src_combat.MonsterStrategy.Ignore || strategy === src_combat.MonsterStrategy.Banish || strategy === src_combat.MonsterStrategy.IgnoreNoBanish) {
              task_combat.kill(monster); // TODO: KillBanish for Banish, KillNoBanish for IgnoreNoBanish
            }
          } // Use rock-band flyers if needed (300 extra as a buffer for mafia tracking)

        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        var blacklist = new Set((0,template_string/* $locations */.xw)(engine_templateObject4 || (engine_templateObject4 = engine_taggedTemplateLiteral(["The Copperhead Club, The Black Forest"]))));

        if ((0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(engine_templateObject5 || (engine_templateObject5 = engine_taggedTemplateLiteral(["Moxie"])))) >= 200 && (0,external_kolmafia_.myBuffedstat)((0,template_string/* $stat */.Ri)(engine_templateObject6 || (engine_templateObject6 = engine_taggedTemplateLiteral(["Moxie"])))) >= 200 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(engine_templateObject7 || (engine_templateObject7 = engine_taggedTemplateLiteral(["rock band flyers"])))) && !flyersDone() && (!(task.do instanceof external_kolmafia_.Location) || !blacklist.has(task.do))) {
          task_combat.prependMacro(new dist_combat/* Macro */.LE().if_( // Avoid sausage goblin (2104), ninja snowman assassin (1185), protagonist (160), quantum mechanic (223)
          "!hpbelow 50 && !monsterid 2104 && !monsterid 1185 &&!monsterid 160 && !monsterid 223", new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(engine_templateObject8 || (engine_templateObject8 = engine_taggedTemplateLiteral(["rock band flyers"]))))));
        } // Apply resources


        var combat_resources = new src_combat.CombatResourceAllocation();

        if (wanderers.length === 0) {
          // Set up a banish if needed
          if (task_combat.can(src_combat.MonsterStrategy.Banish) && !state.banishes.isFullyBanished(task)) {
            var available_tasks = this.tasks.filter(task => this.available(task, state));
            var banishSources = state.banishes.unusedBanishes(available_tasks);
            combat_resources.banishWith(outfit.equipFirst(banishSources));
            debug("Banish targets: ".concat(task_combat.where(src_combat.MonsterStrategy.Banish).filter(monster => !state.banishes.already_banished.has(monster)).join(", ")));
            debug("Banishes available: ".concat(Array.from(banishSources).map(b => b.do).join(", ")));
          } // Equip an orb if we have a good target.
          // (If we have banished all the bad targets, there is no need to force an orb)


          if (priority.has(OverridePriority.GoodOrb) && (!task_combat.can(src_combat.MonsterStrategy.Banish) || !state.banishes.isFullyBanished(task))) {
            outfit.equip((0,template_string/* $item */.xr)(engine_templateObject9 || (engine_templateObject9 = engine_taggedTemplateLiteral(["miniature crystal ball"]))));
          } // Set up a runaway if there are combats we do not care about


          var runaway = undefined;

          if (task_combat.can(src_combat.MonsterStrategy.Ignore) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(engine_templateObject10 || (engine_templateObject10 = engine_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && (0,external_kolmafia_.myLevel)() >= 11) {
            runaway = outfit.equipFirst(runawaySources);
            combat_resources.runawayWith(runaway);
          }

          if (task_combat.can(src_combat.MonsterStrategy.IgnoreNoBanish) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(engine_templateObject11 || (engine_templateObject11 = engine_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && (0,external_kolmafia_.myLevel)() >= 11) {
            if (runaway !== undefined && !runaway.banishes) combat_resources.runawayNoBanishWith(runaway);else combat_resources.runawayNoBanishWith(outfit.equipFirst(runawaySources.filter(source => !source.banishes)));
          } // Set up a free kill if needed, or if no free kills will ever be needed again


          if (task_combat.can(src_combat.MonsterStrategy.KillFree) || task_combat.can(src_combat.MonsterStrategy.Kill) && !task_combat.boss && this.tasks.every(t => {
            var _t$combat;

            return t.completed(state) || !((_t$combat = t.combat) !== null && _t$combat !== void 0 && _t$combat.can(src_combat.MonsterStrategy.KillFree));
          })) {
            combat_resources.freekillWith(outfit.equipFirst(freekillSources));
          }
        } // Charge familiars if needed


        if (!outfit.skipDefaults) {
          outfit.equipCharging();
        }

        if (wanderers.length === 0) {
          var _outfit$modifier;

          // Set up more wanderers if delay is needed
          if (this.hasDelay(task)) wanderers = outfit.equipUntilCapped(wandererSources); // Prepare mood (no need if there is a forced wanderer)

          applyEffects((_outfit$modifier = outfit.modifier) !== null && _outfit$modifier !== void 0 ? _outfit$modifier : "", task.effects || []);
        } // Prepare full outfit


        if (!outfit.skipDefaults) {
          if (task_combat.boss) outfit.equip((0,template_string/* $familiar */.HP)(engine_templateObject12 || (engine_templateObject12 = engine_taggedTemplateLiteral(["Machine Elf"]))));
          var freecombat = task.freecombat || wanderers.find(wanderer => wanderer.chance() === 1); // if (!task_combat.boss && !freecombat) outfit.equip($item`carnivorous potted plant`);

          if (canChargeVoid() && (!outfit.modifier || !outfit.modifier.includes("-combat")) && !freecombat && (task_combat.can(src_combat.MonsterStrategy.Kill) && !combat_resources.has(src_combat.MonsterStrategy.KillFree) || task_combat.can(src_combat.MonsterStrategy.KillHard) || task_combat.boss)) outfit.equip((0,template_string/* $item */.xr)(engine_templateObject13 || (engine_templateObject13 = engine_taggedTemplateLiteral(["cursed magnifying glass"]))));
          outfit.equipDefaults();
        }

        outfit.dress(); // Prepare resources if needed

        wanderers.map(source => source.prepare && source.prepare());
        combat_resources.all().map(source => source.prepare && source.prepare()); // HP/MP upkeep

        if ((0,external_kolmafia_.myHp)() < 50 && (0,external_kolmafia_.myHp)() < (0,external_kolmafia_.myMaxhp)()) (0,external_kolmafia_.restoreHp)((0,external_kolmafia_.myMaxhp)() < 50 ? (0,external_kolmafia_.myMaxhp)() : 50);
        if ((0,external_kolmafia_.myMp)() < 40 && (0,external_kolmafia_.myMaxmp)() >= 40) (0,external_kolmafia_.restoreMp)(40);else if ((0,external_kolmafia_.myMp)() < 20) (0,external_kolmafia_.restoreMp)(20); // Prepare combat macro (after effects and outfit)

        var combat = new src_combat.BuiltCombatStrategy(task_combat, combat_resources, wanderers, state, task.do instanceof external_kolmafia_.Location ? task.do : undefined);
        var auto_str = combat.autoattack.toString();

        if (auto_str.length > 0) {
          debug("Auto: ".concat(auto_str), "purple");
          combat.autoattack.setAutoAttack();
        } else {
          (0,external_kolmafia_.setAutoAttack)(0);
        }

        debug(combat.macro.toString(), "blue");
        combat.macro.save();
      } else {
        var _outfit$modifier2;

        // Prepare only as requested by the task
        applyEffects((_outfit$modifier2 = outfit.modifier) !== null && _outfit$modifier2 !== void 0 ? _outfit$modifier2 : "", task.effects || []);
        outfit.dress();
      } // Prepare choice selections


      var choices = {};

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        var _choice = task.choices[choice_id];
        if (typeof _choice === "number") choices[choice_id] = _choice;else choices[choice_id] = _choice();
      }

      this.propertyManager.setChoices(choices);

      if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(engine_templateObject17 || (engine_templateObject17 = engine_taggedTemplateLiteral(["June cleaver"])))) > 0) {
        this.propertyManager.setChoices({
          // June cleaver noncombats
          1467: 3,
          // +adv
          1468: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 1,
          1469: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 3,
          1470: 2,
          // teacher's pen
          1471: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 1,
          1472: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1473: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1474: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 2,
          1475: (0,property/* get */.U2)("_juneCleaverSkips", 0) < 5 ? 4 : 1
        });
      }

      var ignored_noncombats = ["Wooof! Wooooooof!", "Seeing-Eyes Dog", "Playing Fetch", "Lights Out in the"];
      var ignored_noncombats_seen = ignored_noncombats.filter(name => task.do instanceof external_kolmafia_.Location && task.do.noncombatQueue.includes(name)); // Do any task-specific preparation

      if (task.prepare) task.prepare(state);

      if (args.verboseequip) {
        var equipped = engine_toConsumableArray(new Set(external_kolmafia_.Slot.all().map(slot => (0,external_kolmafia_.equippedItem)(slot))));

        (0,external_kolmafia_.print)("Equipped: ".concat(equipped.join(", ")));
      } // Do the task


      var beaten_turns = (0,external_kolmafia_.haveEffect)((0,template_string/* $effect */._G)(engine_templateObject18 || (engine_templateObject18 = engine_taggedTemplateLiteral(["Beaten Up"]))));
      var start_advs = (0,external_kolmafia_.myAdventures)();
      var goose_weight = (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(engine_templateObject19 || (engine_templateObject19 = engine_taggedTemplateLiteral(["Grey Goose"]))));

      if (typeof task.do === "function") {
        task.do();
      } else {
        (0,external_kolmafia_.adv1)(task.do, 0, ""); // If we encounter a free wandering noncombat, just retry

        if (wanderingNCs.has((0,property/* get */.U2)("lastEncounter"))) {
          if ((0,property/* get */.U2)("lastEncounter") === "Poetic Justice") {
            // Our choice for this one leads to 5 turns of Beaten Up
            beaten_turns = (0,external_kolmafia_.haveEffect)((0,template_string/* $effect */._G)(engine_templateObject20 || (engine_templateObject20 = engine_taggedTemplateLiteral(["Beaten Up"]))));
          }

          (0,external_kolmafia_.adv1)(task.do, 0, "");
        }
      }

      (0,external_kolmafia_.runCombat)();

      while ((0,external_kolmafia_.inMultiFight)()) {
        (0,external_kolmafia_.runCombat)();
      }

      if ((0,external_kolmafia_.choiceFollowsFight)()) (0,external_kolmafia_.runChoice)(-1);
      if (task.post) task.post();
      absorbConsumables();
      autosellJunk();
      if ((0,external_kolmafia_.myAdventures)() !== start_advs) getExtros(); // Crash if we unexpectedly lost the fight

      if (!task.expectbeatenup && (0,lib/* have */.lf)((0,template_string/* $effect */._G)(engine_templateObject21 || (engine_templateObject21 = engine_taggedTemplateLiteral(["Beaten Up"]))))) {
        if ((0,external_kolmafia_.haveEffect)((0,template_string/* $effect */._G)(engine_templateObject22 || (engine_templateObject22 = engine_taggedTemplateLiteral(["Beaten Up"])))) > beaten_turns || // Turns of beaten-up increased, so we lost
        (0,external_kolmafia_.haveEffect)((0,template_string/* $effect */._G)(engine_templateObject23 || (engine_templateObject23 = engine_taggedTemplateLiteral(["Beaten Up"])))) === beaten_turns && ( // Turns of beaten-up was constant but adventures went down, so we lost fight while already beaten up
        (0,external_kolmafia_.myAdventures)() < start_advs || // Check if adventures went down but also we reprocessed a monster
        (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(engine_templateObject24 || (engine_templateObject24 = engine_taggedTemplateLiteral(["Grey Goose"])))) < goose_weight && ((0,external_kolmafia_.myAdventures)() === start_advs + 4 || (0,external_kolmafia_.myAdventures)() === start_advs + 6 || (0,external_kolmafia_.myAdventures)() === start_advs + 9))) throw "Fight was lost; stop.";
      }

      var _iterator6 = engine_createForOfIteratorHelper((0,template_string/* $effects */.lh)(engine_templateObject26 || (engine_templateObject26 = engine_taggedTemplateLiteral(["Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned, Toad In The Hole"])))),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var poisoned = _step6.value;
          if ((0,lib/* have */.lf)(poisoned)) (0,lib/* uneffect */.Lo)(poisoned);
        } // Mark the number of attempts (unless an ignored noncombat occured)

      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      if (!(task.name in this.attempts)) this.attempts[task.name] = 0;

      if (ignored_noncombats.filter(name => task.do instanceof external_kolmafia_.Location && task.do.noncombatQueue.includes(name)).length === ignored_noncombats_seen.length) {
        this.attempts[task.name]++;
      }

      var new_state = new GameState();

      if (task.completed(new_state)) {
        debug("".concat(task.name, " completed!"), "blue");
      } else if (!((_task$ready = (_task$ready2 = task.ready) === null || _task$ready2 === void 0 ? void 0 : _task$ready2.call(task, state)) !== null && _task$ready !== void 0 ? _task$ready : true)) {
        debug("".concat(task.name, " not completed! [Again? Not ready]"), "blue");
      } else {
        var priority_explain = Prioritization.from(task, new_state).explain();

        if (priority_explain !== "") {
          debug("".concat(task.name, " not completed! [Again? ").concat(priority_explain, "]"), "blue");
        } else {
          debug("".concat(task.name, " not completed!"), "blue");
        }

        this.check_limits(task); // Error if too many tries occur
      }

      return new_state;
    }
  }, {
    key: "check_limits",
    value: function check_limits(task) {
      var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";
      if (task.limit.tries && this.attempts[task.name] >= task.limit.tries) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
      if (task.limit.soft && this.attempts[task.name] >= task.limit.soft) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
      if (task.limit.turns && task.do instanceof external_kolmafia_.Location && task.do.turnsSpent >= task.limit.turns) throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
    }
  }]);

  return Engine;
}();
var consumables_blacklist = new Set((0,template_string/* $items */.vS)(engine_templateObject27 || (engine_templateObject27 = engine_taggedTemplateLiteral(["wet stew, wet stunt nut stew, stunt nuts, astral pilsner, astral hot dog dinner, giant marshmallow, booze-soaked cherry, sponge cake, gin-soaked blotter paper, steel margarita, bottle of Chateau de Vinegar, Bowl of Scorpions, unnamed cocktail, Flamin' Whatshisname, goat cheese, Extrovermectin\u2122, blueberry muffin, bran muffin, chocolate chip muffin"]))));

function autosellJunk() {
  if ((0,external_kolmafia_.myPath)() !== "Grey You") return; // final safety

  if ((0,external_kolmafia_.myMeat)() >= 10000) return;
  if ((0,external_kolmafia_.myTurncount)() >= 1000) return; // stop after breaking ronin

  if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(engine_templateObject28 || (engine_templateObject28 = engine_taggedTemplateLiteral(["pork elf goodies sack"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(engine_templateObject29 || (engine_templateObject29 = engine_taggedTemplateLiteral(["pork elf goodies sack"])))); // Sell junk items

  var junk = (0,template_string/* $items */.vS)(engine_templateObject30 || (engine_templateObject30 = engine_taggedTemplateLiteral(["hamethyst, baconstone, meat stack, dense meat stack, facsimile dictionary, space blanket, 1,970 carat gold, black snake skin, demon skin, hellion cube, adder bladder, weremoose spit, Knob Goblin firecracker, wussiness potion, diamond-studded cane, Knob Goblin tongs, Knob Goblin scimitar, eggbeater, red-hot sausage fork, Knob Goblin pants, awful poetry journal, black pixel, pile of dusty animal bones"], ["hamethyst, baconstone, meat stack, dense meat stack, facsimile dictionary, space blanket, 1\\,970 carat gold, black snake skin, demon skin, hellion cube, adder bladder, weremoose spit, Knob Goblin firecracker, wussiness potion, diamond-studded cane, Knob Goblin tongs, Knob Goblin scimitar, eggbeater, red-hot sausage fork, Knob Goblin pants, awful poetry journal, black pixel, pile of dusty animal bones"])));

  var _iterator7 = engine_createForOfIteratorHelper(junk),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _item = _step7.value;
      if ((0,lib/* have */.lf)(_item)) (0,external_kolmafia_.autosell)(_item, (0,external_kolmafia_.itemAmount)(_item));
    } // Sell all but one of a few items

  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  var partial_junk = (0,template_string/* $items */.vS)(engine_templateObject31 || (engine_templateObject31 = engine_taggedTemplateLiteral(["porquoise, ruby W, metallic A, lowercase N, heavy D"])));

  var _iterator8 = engine_createForOfIteratorHelper(partial_junk),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var _item2 = _step8.value;
      if ((0,external_kolmafia_.itemAmount)(_item2) > 1) (0,external_kolmafia_.autosell)(_item2, (0,external_kolmafia_.itemAmount)(_item2) - 1);
    } // Use wallets

  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  var wallets = (0,template_string/* $items */.vS)(engine_templateObject32 || (engine_templateObject32 = engine_taggedTemplateLiteral(["ancient vinyl coin purse, black pension check, old leather wallet, Gathered Meat-Clip, old coin purse"])));

  var _iterator9 = engine_createForOfIteratorHelper(wallets),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _item3 = _step9.value;
      if ((0,lib/* have */.lf)(_item3)) (0,external_kolmafia_.use)(_item3, (0,external_kolmafia_.itemAmount)(_item3));
    } // Sell extra consumables (after 1 has been absorbed)

  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  for (var item_name in (0,external_kolmafia_.getInventory)()) {
    var item = external_kolmafia_.Item.get(item_name);
    if (consumables_blacklist.has(item)) continue;
    if ((0,external_kolmafia_.autosellPrice)(item) === 0) continue;

    if (item.inebriety > 0 || item.fullness > 0 || item.spleen > 0) {
      (0,external_kolmafia_.autosell)(item, (0,external_kolmafia_.itemAmount)(item));
    }
  }
}

function absorbConsumables() {
  if ((0,external_kolmafia_.myPath)() !== "Grey You") return; // final safety

  if ((0,external_kolmafia_.myTurncount)() >= 1000) return; // stop after breaking ronin

  var absorbed_list = (0,property/* get */.U2)("_loop_gyou_absorbed_consumables", "");
  var absorbed = new Set(absorbed_list.split(","));

  for (var item_name in (0,external_kolmafia_.getInventory)()) {
    var item = external_kolmafia_.Item.get(item_name);
    var item_id = "".concat((0,external_kolmafia_.toInt)(item));
    if (consumables_blacklist.has(item)) continue;

    if (item.inebriety > 0 && !absorbed.has(item_id)) {
      (0,external_kolmafia_.overdrink)(item);
      absorbed_list += absorbed_list.length > 0 ? ",".concat(item_id) : item_id;
    }

    if (item.fullness > 0 && !absorbed.has(item_id)) {
      (0,external_kolmafia_.eat)(item);
      absorbed_list += absorbed_list.length > 0 ? ",".concat(item_id) : item_id;
    }
  }

  (0,property/* set */.t8)("_loop_gyou_absorbed_consumables", absorbed_list);
}

function getExtros() {
  if ((0,external_kolmafia_.getWorkshed)() !== (0,template_string/* $item */.xr)(engine_templateObject33 || (engine_templateObject33 = engine_taggedTemplateLiteral(["cold medicine cabinet"])))) return;
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(engine_templateObject34 || (engine_templateObject34 = engine_taggedTemplateLiteral(["ice crown"]))))) return;
  if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(engine_templateObject35 || (engine_templateObject35 = engine_taggedTemplateLiteral(["frozen jeans"]))))) return;

  if ((0,property/* get */.U2)("_coldMedicineConsults") >= 5 || (0,property/* get */.U2)("_nextColdMedicineConsult") > (0,external_kolmafia_.totalTurnsPlayed)()) {
    return;
  }

  var options = (0,external_kolmafia_.visitUrl)("campground.php?action=workshed");
  var match;
  var regexp = /descitem\((\d+)\)/g;

  while ((match = regexp.exec(options)) !== null) {
    var item = (0,external_kolmafia_.descToItem)(match[1]);

    if (item === (0,template_string/* $item */.xr)(engine_templateObject36 || (engine_templateObject36 = engine_taggedTemplateLiteral(["Extrovermectin\u2122"])))) {
      (0,external_kolmafia_.visitUrl)("campground.php?action=workshed");
      (0,external_kolmafia_.runChoice)(5);
      return;
    }
  }
}
;// CONCATENATED MODULE: ./src/tasks/misc.ts
var misc_templateObject, misc_templateObject2, misc_templateObject3, misc_templateObject4, misc_templateObject5, misc_templateObject6, misc_templateObject7, misc_templateObject8, misc_templateObject9, misc_templateObject10, misc_templateObject11, misc_templateObject12, misc_templateObject13, misc_templateObject14, misc_templateObject15, misc_templateObject16, misc_templateObject17, misc_templateObject18, misc_templateObject19, misc_templateObject20, misc_templateObject21, misc_templateObject22, misc_templateObject23, misc_templateObject24, misc_templateObject25, misc_templateObject26, misc_templateObject27, misc_templateObject28, misc_templateObject29, misc_templateObject30, misc_templateObject31, misc_templateObject32, misc_templateObject33, misc_templateObject34, misc_templateObject35, misc_templateObject36, misc_templateObject37, misc_templateObject38, misc_templateObject39, misc_templateObject40, misc_templateObject41, misc_templateObject42, misc_templateObject43, misc_templateObject44, misc_templateObject45, misc_templateObject46, misc_templateObject47, misc_templateObject48, misc_templateObject49, misc_templateObject50, misc_templateObject51, misc_templateObject52, misc_templateObject53, misc_templateObject54, misc_templateObject55, misc_templateObject56, misc_templateObject57, misc_templateObject58, misc_templateObject59, misc_templateObject60, misc_templateObject61, misc_templateObject62, misc_templateObject63, misc_templateObject64, misc_templateObject65, misc_templateObject66, misc_templateObject67, misc_templateObject68, misc_templateObject69, misc_templateObject70, misc_templateObject71, misc_templateObject72, misc_templateObject73, misc_templateObject74, misc_templateObject75, misc_templateObject76, misc_templateObject77, misc_templateObject78, misc_templateObject79, misc_templateObject80, misc_templateObject81, misc_templateObject82, misc_templateObject83, misc_templateObject84, misc_templateObject85, misc_templateObject86, misc_templateObject87, misc_templateObject88, misc_templateObject89, misc_templateObject90, misc_templateObject91, misc_templateObject92, misc_templateObject93, misc_templateObject94, misc_templateObject95, misc_templateObject96, misc_templateObject97, misc_templateObject98, misc_templateObject99, misc_templateObject100, misc_templateObject101, misc_templateObject102, misc_templateObject103, misc_templateObject104, misc_templateObject105, misc_templateObject106, misc_templateObject107, misc_templateObject108, misc_templateObject109, misc_templateObject110, misc_templateObject111, misc_templateObject112, misc_templateObject113, misc_templateObject114, misc_templateObject115, misc_templateObject116, misc_templateObject117, misc_templateObject118, misc_templateObject119, misc_templateObject120, misc_templateObject121, misc_templateObject122, misc_templateObject123, misc_templateObject124, misc_templateObject125, misc_templateObject126, misc_templateObject127, misc_templateObject128, misc_templateObject129, misc_templateObject130, misc_templateObject131, misc_templateObject132, misc_templateObject133, misc_templateObject134, misc_templateObject135, misc_templateObject136, misc_templateObject137, misc_templateObject138, misc_templateObject139, misc_templateObject140, misc_templateObject141, misc_templateObject142, misc_templateObject143, misc_templateObject144, misc_templateObject145, misc_templateObject146, misc_templateObject147, misc_templateObject148, misc_templateObject149, misc_templateObject150, misc_templateObject151, misc_templateObject152, misc_templateObject153, misc_CombatStrategy$banis, misc_templateObject154, misc_templateObject155, misc_templateObject156, misc_templateObject157, misc_templateObject158, misc_templateObject159, misc_templateObject160, misc_templateObject161, misc_templateObject162, misc_templateObject163, misc_templateObject164, misc_templateObject165, misc_templateObject166, misc_templateObject167, misc_templateObject168, misc_templateObject169, misc_templateObject170, misc_templateObject171, misc_templateObject172, misc_templateObject173, misc_templateObject174, misc_templateObject175, misc_templateObject176, misc_templateObject177, misc_templateObject178, misc_templateObject179, misc_templateObject180, misc_templateObject181, misc_templateObject182, misc_templateObject183, misc_templateObject184, misc_templateObject185, misc_templateObject186, misc_templateObject187, misc_templateObject188, misc_templateObject189, misc_templateObject190, misc_templateObject191, misc_templateObject192, misc_templateObject193, misc_templateObject194, misc_templateObject195, misc_templateObject196;

function misc_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = misc_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function misc_toConsumableArray(arr) { return misc_arrayWithoutHoles(arr) || misc_iterableToArray(arr) || misc_unsupportedIterableToArray(arr) || misc_nonIterableSpread(); }

function misc_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function misc_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return misc_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return misc_arrayLikeToArray(o, minLen); }

function misc_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function misc_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return misc_arrayLikeToArray(arr); }

function misc_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function misc_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var MiscQuest = {
  name: "Misc",
  tasks: [{
    name: "Unlock Beach",
    after: [],
    ready: () => (0,external_kolmafia_.myMeat)() >= ((0,external_kolmafia_.knollAvailable)() ? 538 : 5000),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject || (misc_templateObject = misc_taggedTemplateLiteral(["bitchin' meatcar"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject2 || (misc_templateObject2 = misc_taggedTemplateLiteral(["Desert Bus pass"])))),
    do: () => {
      if ((0,external_kolmafia_.knollAvailable)()) (0,external_kolmafia_.cliExecute)("acquire 1 bitchin' meatcar");else (0,external_kolmafia_.cliExecute)("acquire 1 desert bus pass");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Island Scrip",
    after: ["Unlock Beach"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 6000 || step("questL11Black") >= 4 && (0,external_kolmafia_.myMeat)() >= 500,
    completed: () => (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(misc_templateObject3 || (misc_templateObject3 = misc_taggedTemplateLiteral(["Shore Inc. Ship Trip Scrip"])))) >= 3 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject4 || (misc_templateObject4 = misc_taggedTemplateLiteral(["dinghy plans"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject5 || (misc_templateObject5 = misc_taggedTemplateLiteral(["dingy dinghy"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject6 || (misc_templateObject6 = misc_taggedTemplateLiteral(["junk junk"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject7 || (misc_templateObject7 = misc_taggedTemplateLiteral(["skeletal skiff"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject8 || (misc_templateObject8 = misc_taggedTemplateLiteral(["yellow submarine"])))),
    do: (0,template_string/* $location */.PG)(misc_templateObject9 || (misc_templateObject9 = misc_taggedTemplateLiteral(["The Shore, Inc. Travel Agency"]))),
    choices: {
      793: 1
    },
    limit: {
      tries: 5
    }
  }, {
    name: "Unlock Island",
    after: ["Island Scrip"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 400 || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject10 || (misc_templateObject10 = misc_taggedTemplateLiteral(["dingy planks"])))),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject11 || (misc_templateObject11 = misc_taggedTemplateLiteral(["dingy dinghy"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject12 || (misc_templateObject12 = misc_taggedTemplateLiteral(["junk junk"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject13 || (misc_templateObject13 = misc_taggedTemplateLiteral(["skeletal skiff"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject14 || (misc_templateObject14 = misc_taggedTemplateLiteral(["yellow submarine"])))),
    do: () => {
      (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(misc_templateObject15 || (misc_templateObject15 = misc_taggedTemplateLiteral(["dingy planks"]))));
      (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(misc_templateObject16 || (misc_templateObject16 = misc_taggedTemplateLiteral(["dinghy plans"]))));
      (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject17 || (misc_templateObject17 = misc_taggedTemplateLiteral(["dinghy plans"]))));
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Floundry",
    after: [],
    ready: () => false,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject18 || (misc_templateObject18 = misc_taggedTemplateLiteral(["fish hatchet"])))) || true,
    do: () => (0,external_kolmafia_.cliExecute)("acquire 1 fish hatchet"),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Acquire Kgnee",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => (0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject19 || (misc_templateObject19 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject20 || (misc_templateObject20 = misc_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))) && !(0,property/* get */.U2)("_loopcasual_checkedGnome", false),
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject21 || (misc_templateObject21 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject22 || (misc_templateObject22 = misc_taggedTemplateLiteral(["gnomish housemaid's kgnee"])))) || (0,property/* get */.U2)("_loopcasual_checkedGnome", false),
    do: () => {
      (0,external_kolmafia_.visitUrl)("arena.php");
      (0,external_kolmafia_.runChoice)(4);
      (0,property/* set */.t8)("_loopcasual_checkedGnome", true);
    },
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject23 || (misc_templateObject23 = misc_taggedTemplateLiteral(["Reagnimated Gnome"])))
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Voting",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject24 || (misc_templateObject24 = misc_taggedTemplateLiteral(["\"I Voted!\" sticker"])))) || (0,property/* get */.U2)("_voteToday") || !(0,property/* get */.U2)("voteAlways"),
    do: () => {
      // Taken from garbo
      var voterValueTable = [{
        monster: (0,template_string/* $monster */.O4)(misc_templateObject25 || (misc_templateObject25 = misc_taggedTemplateLiteral(["terrible mutant"]))),
        value: (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(misc_templateObject26 || (misc_templateObject26 = misc_taggedTemplateLiteral(["glob of undifferentiated tissue"])))) + 10
      }, {
        monster: (0,template_string/* $monster */.O4)(misc_templateObject27 || (misc_templateObject27 = misc_taggedTemplateLiteral(["angry ghost"]))),
        value: (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(misc_templateObject28 || (misc_templateObject28 = misc_taggedTemplateLiteral(["ghostly ectoplasm"])))) * 1.11
      }, {
        monster: (0,template_string/* $monster */.O4)(misc_templateObject29 || (misc_templateObject29 = misc_taggedTemplateLiteral(["government bureaucrat"]))),
        value: (0,lib/* getSaleValue */.xI)((0,template_string/* $item */.xr)(misc_templateObject30 || (misc_templateObject30 = misc_taggedTemplateLiteral(["absentee voter ballot"])))) * 0.05 + 75 * 0.25 + 50
      }, {
        monster: (0,template_string/* $monster */.O4)(misc_templateObject31 || (misc_templateObject31 = misc_taggedTemplateLiteral(["annoyed snake"]))),
        value: 25 * 0.5 + 25
      }, {
        monster: (0,template_string/* $monster */.O4)(misc_templateObject32 || (misc_templateObject32 = misc_taggedTemplateLiteral(["slime blob"]))),
        value: 20 * 0.4 + 50 * 0.2 + 250 * 0.01
      }];
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=town_right&action=townright_vote");
      var votingMonsterPriority = voterValueTable.sort((a, b) => b.value - a.value).map(element => element.monster.name);
      var initPriority = new Map([["Meat Drop: +30", 10], ["Item Drop: +15", 9], ["Familiar Experience: +2", 8], ["Adventures: +1", 7], ["Monster Level: +10", 5], ["".concat((0,external_kolmafia_.myPrimestat)(), " Percent: +25"), 3], ["Experience (".concat((0,external_kolmafia_.myPrimestat)(), "): +4"), 2], ["Meat Drop: -30", -2], ["Item Drop: -15", -2], ["Familiar Experience: -2", -2]]);
      var monsterVote = votingMonsterPriority.indexOf((0,property/* get */.U2)("_voteMonster1")) < votingMonsterPriority.indexOf((0,property/* get */.U2)("_voteMonster2")) ? 1 : 2;
      var voteLocalPriorityArr = [[0, initPriority.get((0,property/* get */.U2)("_voteLocal1")) || ((0,property/* get */.U2)("_voteLocal1").indexOf("-") === -1 ? 1 : -1)], [1, initPriority.get((0,property/* get */.U2)("_voteLocal2")) || ((0,property/* get */.U2)("_voteLocal2").indexOf("-") === -1 ? 1 : -1)], [2, initPriority.get((0,property/* get */.U2)("_voteLocal3")) || ((0,property/* get */.U2)("_voteLocal3").indexOf("-") === -1 ? 1 : -1)], [3, initPriority.get((0,property/* get */.U2)("_voteLocal4")) || ((0,property/* get */.U2)("_voteLocal4").indexOf("-") === -1 ? 1 : -1)]];
      var bestVotes = voteLocalPriorityArr.sort((a, b) => b[1] - a[1]);
      var firstInit = bestVotes[0][0];
      var secondInit = bestVotes[1][0];
      (0,external_kolmafia_.visitUrl)("choice.php?option=1&whichchoice=1331&g=".concat(monsterVote, "&local[]=").concat(firstInit, "&local[]=").concat(secondInit));
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Protonic Ghost",
    after: [],
    completed: () => false,
    priority: () => OverridePriority.Always,
    ready: () => {
      if (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject33 || (misc_templateObject33 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))))) return false;
      if ((0,property/* get */.U2)("questPAGhost") === "unstarted") return false;

      switch ((0,property/* get */.U2)("ghostLocation")) {
        case (0,template_string/* $location */.PG)(misc_templateObject34 || (misc_templateObject34 = misc_taggedTemplateLiteral(["The Haunted Conservatory"]))):
          return step("questM20Necklace") >= 0;

        case (0,template_string/* $location */.PG)(misc_templateObject35 || (misc_templateObject35 = misc_taggedTemplateLiteral(["The Haunted Gallery"]))):
          return step("questM21Dance") >= 1;

        case (0,template_string/* $location */.PG)(misc_templateObject36 || (misc_templateObject36 = misc_taggedTemplateLiteral(["The Haunted Kitchen"]))):
          return step("questM20Necklace") >= 0;

        case (0,template_string/* $location */.PG)(misc_templateObject37 || (misc_templateObject37 = misc_taggedTemplateLiteral(["The Haunted Wine Cellar"]))):
          return step("questL11Manor") >= 1;

        case (0,template_string/* $location */.PG)(misc_templateObject38 || (misc_templateObject38 = misc_taggedTemplateLiteral(["The Icy Peak"]))):
          return step("questL08Trapper") === 999;

        case (0,template_string/* $location */.PG)(misc_templateObject39 || (misc_templateObject39 = misc_taggedTemplateLiteral(["Inside the Palindome"]))):
          return (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject40 || (misc_templateObject40 = misc_taggedTemplateLiteral(["Talisman o' Namsilat"]))));

        case (0,template_string/* $location */.PG)(misc_templateObject41 || (misc_templateObject41 = misc_taggedTemplateLiteral(["The Old Landfill"]))):
          return (0,external_kolmafia_.myBasestat)((0,external_kolmafia_.myPrimestat)()) >= 25 && step("questL02Larva") >= 0;

        case (0,template_string/* $location */.PG)(misc_templateObject42 || (misc_templateObject42 = misc_taggedTemplateLiteral(["Madness Bakery"]))):
        case (0,template_string/* $location */.PG)(misc_templateObject43 || (misc_templateObject43 = misc_taggedTemplateLiteral(["The Overgrown Lot"]))):
        case (0,template_string/* $location */.PG)(misc_templateObject44 || (misc_templateObject44 = misc_taggedTemplateLiteral(["The Skeleton Store"]))):
          return true;
        // Can freely start quest

        case (0,template_string/* $location */.PG)(misc_templateObject45 || (misc_templateObject45 = misc_taggedTemplateLiteral(["The Smut Orc Logging Camp"]))):
          return step("questL09Topping") >= 0;

        case (0,template_string/* $location */.PG)(misc_templateObject46 || (misc_templateObject46 = misc_taggedTemplateLiteral(["The Spooky Forest"]))):
          return step("questL02Larva") >= 0;
      }

      return false;
    },
    prepare: () => {
      // Start quests if needed
      switch ((0,property/* get */.U2)("ghostLocation")) {
        case (0,template_string/* $location */.PG)(misc_templateObject47 || (misc_templateObject47 = misc_taggedTemplateLiteral(["Madness Bakery"]))):
          if (step("questM25Armorer") === -1) {
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=armory");
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=armory&action=talk");
            (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=1065&option=1");
          }

          return;

        case (0,template_string/* $location */.PG)(misc_templateObject48 || (misc_templateObject48 = misc_taggedTemplateLiteral(["The Old Landfill"]))):
          if (step("questM19Hippy") === -1) {
            (0,external_kolmafia_.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
            (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=798&option=1");
            (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=798&option=2");
            (0,external_kolmafia_.visitUrl)("woods.php");
          }

          return;

        case (0,template_string/* $location */.PG)(misc_templateObject49 || (misc_templateObject49 = misc_taggedTemplateLiteral(["The Overgrown Lot"]))):
          if (step("questM24Doc") === -1) {
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=doc");
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=doc&action=talk");
            (0,external_kolmafia_.runChoice)(1);
          }

          return;

        case (0,template_string/* $location */.PG)(misc_templateObject50 || (misc_templateObject50 = misc_taggedTemplateLiteral(["The Skeleton Store"]))):
          if (step("questM23Meatsmith") === -1) {
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith");
            (0,external_kolmafia_.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
            (0,external_kolmafia_.runChoice)(1);
          }

          return;

        default:
          return;
      }
    },
    do: () => {
      var _get;

      (0,external_kolmafia_.adv1)((_get = (0,property/* get */.U2)("ghostLocation")) !== null && _get !== void 0 ? _get : (0,template_string/* $location */.PG)(misc_templateObject51 || (misc_templateObject51 = misc_taggedTemplateLiteral(["none"]))), 0, "");

      if (wanderingNCs.has((0,property/* get */.U2)("lastEncounter"))) {
        var _get2;

        (0,external_kolmafia_.adv1)((_get2 = (0,property/* get */.U2)("ghostLocation")) !== null && _get2 !== void 0 ? _get2 : (0,template_string/* $location */.PG)(misc_templateObject52 || (misc_templateObject52 = misc_taggedTemplateLiteral(["none"]))), 0, "");
      }
    },
    outfit: () => {
      if ((0,property/* get */.U2)("ghostLocation") === (0,template_string/* $location */.PG)(misc_templateObject53 || (misc_templateObject53 = misc_taggedTemplateLiteral(["Inside the Palindome"])))) return {
        equip: (0,template_string/* $items */.vS)(misc_templateObject54 || (misc_templateObject54 = misc_taggedTemplateLiteral(["Talisman o' Namsilat, protonic accelerator pack"]))),
        modifier: "DA, DR"
      };
      if ((0,property/* get */.U2)("ghostLocation") === (0,template_string/* $location */.PG)(misc_templateObject55 || (misc_templateObject55 = misc_taggedTemplateLiteral(["The Icy Peak"])))) return {
        equip: (0,template_string/* $items */.vS)(misc_templateObject56 || (misc_templateObject56 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))),
        modifier: "1000 cold res, DA, DR"
      };
      return {
        equip: (0,template_string/* $items */.vS)(misc_templateObject57 || (misc_templateObject57 = misc_taggedTemplateLiteral(["protonic accelerator pack"]))),
        modifier: "DA, DR"
      };
    },
    combat: new src_combat.CombatStrategy().macro(() => {
      if ((0,external_kolmafia_.myHp)() < (0,external_kolmafia_.myMaxhp)() || (0,property/* get */.U2)("ghostLocation") === (0,template_string/* $location */.PG)(misc_templateObject58 || (misc_templateObject58 = misc_taggedTemplateLiteral(["The Haunted Wine Cellar"]))) || (0,property/* get */.U2)("ghostLocation") === (0,template_string/* $location */.PG)(misc_templateObject59 || (misc_templateObject59 = misc_taggedTemplateLiteral(["The Overgrown Lot"])))) return new dist_combat/* Macro */.LE().attack().repeat();else return new dist_combat/* Macro */.LE().skill((0,template_string/* $skill */.tm)(misc_templateObject60 || (misc_templateObject60 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill((0,template_string/* $skill */.tm)(misc_templateObject61 || (misc_templateObject61 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill((0,template_string/* $skill */.tm)(misc_templateObject62 || (misc_templateObject62 = misc_taggedTemplateLiteral(["Shoot Ghost"])))).skill((0,template_string/* $skill */.tm)(misc_templateObject63 || (misc_templateObject63 = misc_taggedTemplateLiteral(["Trap Ghost"]))));
    }),
    post: () => {
      if ((0,property/* get */.U2)("questPAGhost") !== "unstarted") {
        throw "Failed to kill ghost from protonic accelerator pack";
      }
    },
    limit: {
      tries: 20
    }
  }, {
    name: "Acquire Birch Battery",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject64 || (misc_templateObject64 = misc_taggedTemplateLiteral(["SpinMaster\u2122 lathe"])))) && (!(0,property/* get */.U2)("_spinmasterLatheVisited") || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject65 || (misc_templateObject65 = misc_taggedTemplateLiteral(["flimsy hardwood scraps"]))))),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject66 || (misc_templateObject66 = misc_taggedTemplateLiteral(["birch battery"])))),
    do: () => {
      (0,external_kolmafia_.visitUrl)("shop.php?whichshop=lathe");
      (0,external_kolmafia_.cliExecute)("acquire birch battery");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Acquire Firework Hat",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject67 || (misc_templateObject67 = misc_taggedTemplateLiteral(["sombrero-mounted sparkler"])))) || (0,property/* get */.U2)("_fireworksShopHatBought"),
    do: () => {
      (0,external_kolmafia_.visitUrl)("clan_viplounge.php");
      (0,external_kolmafia_.visitUrl)("clan_viplounge.php?action=fwshop&whichfloor=2");
      (0,external_kolmafia_.cliExecute)("acquire sombrero-mounted sparkler");
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Acquire Cold Medicine Gear",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject68 || (misc_templateObject68 = misc_taggedTemplateLiteral(["ice crown"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject69 || (misc_templateObject69 = misc_taggedTemplateLiteral(["frozen jeans"])))),
    ready: () => (0,external_kolmafia_.getWorkshed)() === (0,template_string/* $item */.xr)(misc_templateObject70 || (misc_templateObject70 = misc_taggedTemplateLiteral(["cold medicine cabinet"]))) && (0,property/* get */.U2)("_coldMedicineConsults") < 5 && (0,property/* get */.U2)("_nextColdMedicineConsult") <= (0,external_kolmafia_.totalTurnsPlayed)(),
    do: () => {
      (0,external_kolmafia_.visitUrl)("campground.php?action=workshed");
      (0,external_kolmafia_.runChoice)(1);
    },
    freeaction: true,
    limit: {
      tries: 2
    }
  }, {
    name: "Goose Exp",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject71 || (misc_templateObject71 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 9 || (0,property/* get */.U2)("_loop_gyou_chef_goose") === "true" || !(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject72 || (misc_templateObject72 = misc_taggedTemplateLiteral(["Shorter-Order Cook"])))),
    do: () => {
      (0,property/* set */.t8)("_loop_gyou_chef_goose", "true");
    },
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject73 || (misc_templateObject73 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Locket Pygmy",
    after: [],
    priority: () => OverridePriority.Start,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject74 || (misc_templateObject74 = misc_taggedTemplateLiteral(["Infinite Loop"])))),
    acquire: [{
      item: (0,template_string/* $item */.xr)(misc_templateObject75 || (misc_templateObject75 = misc_taggedTemplateLiteral(["Arr, M80"]))),
      num: 2,
      useful: () => (0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject76 || (misc_templateObject76 = misc_taggedTemplateLiteral(["Vampire Vintner"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject77 || (misc_templateObject77 = misc_taggedTemplateLiteral(["cosmic bowling ball"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject78 || (misc_templateObject78 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))
    }, {
      // Backup plan if missing Vintner/bowling ball
      item: (0,template_string/* $item */.xr)(misc_templateObject79 || (misc_templateObject79 = misc_taggedTemplateLiteral(["yellow rocket"]))),
      num: 1,
      useful: () => !(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject80 || (misc_templateObject80 = misc_taggedTemplateLiteral(["Vampire Vintner"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject81 || (misc_templateObject81 = misc_taggedTemplateLiteral(["cosmic bowling ball"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject82 || (misc_templateObject82 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))
    }],
    prepare: () => {
      if (((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(misc_templateObject83 || (misc_templateObject83 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) === 0 || (0,external_kolmafia_.myFamiliar)() !== (0,template_string/* $familiar */.HP)(misc_templateObject84 || (misc_templateObject84 = misc_taggedTemplateLiteral(["Vampire Vintner"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject85 || (misc_templateObject85 = misc_taggedTemplateLiteral(["yellow rocket"]))))) (0,external_kolmafia_.abort)("Not ready for pygmy locket");
      if ((0,external_kolmafia_.equippedAmount)((0,template_string/* $item */.xr)(misc_templateObject86 || (misc_templateObject86 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"])))) > 0) (0,external_kolmafia_.cliExecute)("retrocape heck hold");
      if ((0,external_kolmafia_.initiativeModifier)() < 50) (0,external_kolmafia_.cliExecute)("pool stylish");
      if ((0,external_kolmafia_.initiativeModifier)() < 50) (0,external_kolmafia_.abort)("Not ready for pygmy locket");
    },
    do: () => {
      reminisce((0,template_string/* $monster */.O4)(misc_templateObject87 || (misc_templateObject87 = misc_taggedTemplateLiteral(["pygmy witch lawyer"]))));
    },
    combat: new src_combat.CombatStrategy().macro(new dist_combat/* Macro */.LE().tryItem((0,template_string/* $item */.xr)(misc_templateObject88 || (misc_templateObject88 = misc_taggedTemplateLiteral(["yellow rocket"])))).tryItem((0,template_string/* $item */.xr)(misc_templateObject89 || (misc_templateObject89 = misc_taggedTemplateLiteral(["cosmic bowling ball"])))).step("if hascombatitem 10769;use Arr;endif;") // Arr, M80; "use Arr, M80" trys and fails to funksling
    .step("if hascombatitem 10769;use Arr;endif;").skill((0,template_string/* $skill */.tm)(misc_templateObject90 || (misc_templateObject90 = misc_taggedTemplateLiteral(["Pseudopod Slap"])))).repeat()),
    outfit: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject91 || (misc_templateObject91 = misc_taggedTemplateLiteral(["Vampire Vintner"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject92 || (misc_templateObject92 = misc_taggedTemplateLiteral(["cosmic bowling ball"])))) && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject93 || (misc_templateObject93 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))))) return {
        modifier: "init",
        equip: (0,template_string/* $items */.vS)(misc_templateObject94 || (misc_templateObject94 = misc_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
        familiar: (0,template_string/* $familiar */.HP)(misc_templateObject95 || (misc_templateObject95 = misc_taggedTemplateLiteral(["Vampire Vintner"])))
      };else return {
        modifier: "init, -1ML"
      }; // Just use yellow rocket
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Hermit Clover",
    after: ["Palindome/Protesters Start"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 1000,
    completed: () => (0,property/* get */.U2)("_loop_gyou_clovers") === "true",
    do: () => {
      (0,external_kolmafia_.hermit)((0,template_string/* $item */.xr)(misc_templateObject96 || (misc_templateObject96 = misc_taggedTemplateLiteral(["11-leaf clover"]))), 3);
      (0,property/* set */.t8)("_loop_gyou_clovers", "true");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Fortune",
    after: ["Hidden City/Open City"],
    completed: () => (0,property/* get */.U2)("_clanFortuneBuffUsed") || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject97 || (misc_templateObject97 = misc_taggedTemplateLiteral(["Clan VIP Lounge key"])))),
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_.cliExecute)("fortune buff susie");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Friar Buff",
    after: ["Friar/Finish", "Macguffin/Desert"],
    // After the desert to avoid wasting it on the camel
    completed: () => (0,property/* get */.U2)("friarsBlessingReceived"),
    ready: () => (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject98 || (misc_templateObject98 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6,
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_.cliExecute)("friars familiar");
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Dog Chow",
    after: [],
    ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject99 || (misc_templateObject99 = misc_taggedTemplateLiteral(["Ghost Dog Chow"])))) && (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject100 || (misc_templateObject100 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6,
    completed: () => false,
    do: () => {
      (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject101 || (misc_templateObject101 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))));
      if ((0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject102 || (misc_templateObject102 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject103 || (misc_templateObject103 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject104 || (misc_templateObject104 = misc_taggedTemplateLiteral(["Ghost Dog Chow"]))));
    },
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject105 || (misc_templateObject105 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    freeaction: true,
    limit: {
      soft: 20
    }
  }, {
    name: "Cake-Shaped Arena",
    after: [],
    ready: () => (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject106 || (misc_templateObject106 = misc_taggedTemplateLiteral(["Grey Goose"])))) < 6 && (0,external_kolmafia_.myMeat)() >= 100,
    completed: () => false,
    do: arenaFight,
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject107 || (misc_templateObject107 = misc_taggedTemplateLiteral(["Grey Goose"]))),
      modifier: "50 familiar exp, familiar weight"
    },
    freeaction: true,
    limit: {
      soft: 75
    }
  }, {
    name: "Amulet Coin",
    after: [],
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject108 || (misc_templateObject108 = misc_taggedTemplateLiteral(["amulet coin"])))) || !(0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject109 || (misc_templateObject109 = misc_taggedTemplateLiteral(["Summon Clip Art"])))) || (0,property/* get */.U2)("tomeSummons") >= 3 || !(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(misc_templateObject110 || (misc_templateObject110 = misc_taggedTemplateLiteral(["Cornbeefadon"])))),
    priority: () => OverridePriority.Free,
    do: () => {
      (0,external_kolmafia_.retrieveItem)((0,template_string/* $item */.xr)(misc_templateObject111 || (misc_templateObject111 = misc_taggedTemplateLiteral(["box of Familiar Jacks"]))));
      (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject112 || (misc_templateObject112 = misc_taggedTemplateLiteral(["box of Familiar Jacks"]))));
    },
    outfit: {
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject113 || (misc_templateObject113 = misc_taggedTemplateLiteral(["Cornbeefadon"])))
    },
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Boombox",
    after: [],
    priority: () => OverridePriority.Free,
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject114 || (misc_templateObject114 = misc_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) || (0,property/* get */.U2)("boomBoxSong") === "Total Eclipse of Your Meat" || (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject115 || (misc_templateObject115 = misc_taggedTemplateLiteral(["System Sweep"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject116 || (misc_templateObject116 = misc_taggedTemplateLiteral(["Double Nanovision"])))) || (0,property/* get */.U2)("_boomBoxSongsLeft") === 0,
    do: () => (0,external_kolmafia_.cliExecute)("boombox meat"),
    freeaction: true,
    limit: {
      tries: 1
    }
  }, {
    name: "Boombox Seasoning",
    after: [],
    priority: () => OverridePriority.Free,
    ready: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject117 || (misc_templateObject117 = misc_taggedTemplateLiteral(["System Sweep"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject118 || (misc_templateObject118 = misc_taggedTemplateLiteral(["Double Nanovision"])))) && ((0,property/* get */.U2)("currentNunneryMeat") === 0 || (0,property/* get */.U2)("currentNunneryMeat") === 100000),
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject119 || (misc_templateObject119 = misc_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"])))) || (0,property/* get */.U2)("boomBoxSong") === "Food Vibrations" || (0,property/* get */.U2)("_boomBoxSongsLeft") === 0,
    do: () => (0,external_kolmafia_.cliExecute)("boombox food"),
    freeaction: true,
    limit: {
      tries: 2
    }
  }, {
    name: "Gnome Shirt",
    after: [],
    ready: () => (0,external_kolmafia_.myMeat)() >= 11000 && (0,external_kolmafia_.gnomadsAvailable)(),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject120 || (misc_templateObject120 = misc_taggedTemplateLiteral(["Torso Awareness"])))),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => {
      (0,external_kolmafia_.visitUrl)("gnomes.php?action=trainskill&whichskill=12");
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Gnome Items",
    after: ["Gnome Shirt"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 11000 && (0,external_kolmafia_.gnomadsAvailable)(),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject121 || (misc_templateObject121 = misc_taggedTemplateLiteral(["Powers of Observatiogn"])))),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => {
      (0,external_kolmafia_.visitUrl)("gnomes.php?action=trainskill&whichskill=10");
    },
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Muscle",
    after: ["Unlock Beach", "Reprocess/The Bugbear Pen"],
    ready: () => (0,external_kolmafia_.knollAvailable)() && ((0,external_kolmafia_.mySign)() !== "Vole" || (0,external_kolmafia_.myMaxmp)() - (0,external_kolmafia_.numericModifier)("Maximum MP") >= 50 && (0,external_kolmafia_.myMaxhp)() - (0,external_kolmafia_.numericModifier)("Maximum HP") >= 60 && (0,external_kolmafia_.myMeat)() >= 11000),
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject122 || (misc_templateObject122 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || (0,property/* get */.U2)("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Myst",
    after: ["Reprocess/Outskirts of Camp Logging Camp"],
    ready: () => (0,external_kolmafia_.canadiaAvailable)(),
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject123 || (misc_templateObject123 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || (0,property/* get */.U2)("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Tune from Moxie",
    after: ["Reprocess/Thugnderdome", "Gnome Shirt", "Gnome Items"],
    ready: () => (0,external_kolmafia_.gnomadsAvailable)(),
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject124 || (misc_templateObject124 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || (0,property/* get */.U2)("moonTuned", false),
    priority: () => OverridePriority.Free,
    freeaction: true,
    do: () => (0,external_kolmafia_.cliExecute)("spoon ".concat(args.tune)),
    limit: {
      tries: 1
    }
  }, {
    name: "Retune Moon",
    after: ["Tune from Muscle", "Tune from Myst", "Tune from Moxie"],
    ready: () => false,
    completed: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject125 || (misc_templateObject125 = misc_taggedTemplateLiteral(["hewn moon-rune spoon"])))) || args.tune === undefined || (0,property/* get */.U2)("moonTuned", false),
    do: () => false,
    limit: {
      tries: 1
    }
  }, {
    name: "Summon Lion",
    after: ["Hidden City/Bowling Skills"],
    ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject126 || (misc_templateObject126 = misc_taggedTemplateLiteral(["white page"])))),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(misc_templateObject127 || (misc_templateObject127 = misc_taggedTemplateLiteral(["Piezoelectric Honk"])))),
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject128 || (misc_templateObject128 = misc_taggedTemplateLiteral(["white page"])))),
    limit: {
      tries: 1
    },
    choices: {
      940: 2
    },
    outfit: {
      modifier: "item"
    },
    combat: new src_combat.CombatStrategy().killItem((0,template_string/* $monster */.O4)(misc_templateObject129 || (misc_templateObject129 = misc_taggedTemplateLiteral(["white lion"]))))
  }, {
    name: "Mayday",
    after: ["Macguffin/Start"],
    priority: () => OverridePriority.Free,
    completed: () => !(0,property/* get */.U2)("hasMaydayContract") || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject130 || (misc_templateObject130 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))) && atLevel(11),
    ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject131 || (misc_templateObject131 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))) && (0,external_kolmafia_.myTurncount)() < 1000,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject132 || (misc_templateObject132 = misc_taggedTemplateLiteral(["MayDay\u2122 supply package"])))),
    limit: {
      tries: 1
    },
    freeaction: true
  }, {
    name: "Open Fantasy",
    after: [],
    ready: () => (0,property/* get */.U2)("frAlways") || (0,property/* get */.U2)("_frToday"),
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject133 || (misc_templateObject133 = misc_taggedTemplateLiteral(["FantasyRealm G. E. M."])))),
    do: () => {
      (0,external_kolmafia_.visitUrl)("place.php?whichplace=realm_fantasy&action=fr_initcenter");
      (0,external_kolmafia_.runChoice)(-1);
    },
    choices: {
      1280: 1
    },
    limit: {
      tries: 1
    }
  }]
};
var WandQuest = {
  name: "Wand",
  tasks: [{
    name: "Plus Sign",
    after: [],
    ready: () => (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(misc_templateObject134 || (misc_templateObject134 = misc_taggedTemplateLiteral(["muscle"])))) >= 45 && (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(misc_templateObject135 || (misc_templateObject135 = misc_taggedTemplateLiteral(["mysticality"])))) >= 45 && (0,external_kolmafia_.myBasestat)((0,template_string/* $stat */.Ri)(misc_templateObject136 || (misc_templateObject136 = misc_taggedTemplateLiteral(["moxie"])))) >= 45,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject137 || (misc_templateObject137 = misc_taggedTemplateLiteral(["plus sign"])))) || (0,property/* get */.U2)("lastPlusSignUnlock") === (0,external_kolmafia_.myAscensions)(),
    do: (0,template_string/* $location */.PG)(misc_templateObject138 || (misc_templateObject138 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      451: 3
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Get Teleportitis",
    after: ["Plus Sign"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 1000 && // Meat for goal teleportitis choice adventure
    (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject139 || (misc_templateObject139 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 6 && // Goose exp for potential absorbs during teleportits
    (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject140 || (misc_templateObject140 = misc_taggedTemplateLiteral(["soft green echo eyedrop antidote"])))),
    // Antitdote to remove teleportitis afterwards
    priority: () => (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject141 || (misc_templateObject141 = misc_taggedTemplateLiteral(["Grey Goose"])))) >= 6 ? OverridePriority.GoodGoose : OverridePriority.None,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(misc_templateObject142 || (misc_templateObject142 = misc_taggedTemplateLiteral(["Teleportitis"])))) || (0,property/* get */.U2)("lastPlusSignUnlock") === (0,external_kolmafia_.myAscensions)(),
    do: (0,template_string/* $location */.PG)(misc_templateObject143 || (misc_templateObject143 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    outfit: {
      modifier: "-combat"
    },
    choices: {
      451: 5
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Mimic",
    after: ["Get Teleportitis"],
    ready: () => (0,external_kolmafia_.myMeat)() >= 5000,
    completed: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject144 || (misc_templateObject144 = misc_taggedTemplateLiteral(["dead mimic"])))) || (0,property/* get */.U2)("lastZapperWand") === (0,external_kolmafia_.myAscensions)() || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject145 || (misc_templateObject145 = misc_taggedTemplateLiteral(["aluminum wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject146 || (misc_templateObject146 = misc_taggedTemplateLiteral(["ebony wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject147 || (misc_templateObject147 = misc_taggedTemplateLiteral(["hexagonal wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject148 || (misc_templateObject148 = misc_taggedTemplateLiteral(["marble wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject149 || (misc_templateObject149 = misc_taggedTemplateLiteral(["pine wand"])))) || keyStrategy.useful(Keys.ZapBoris) === false && keyStrategy.useful(Keys.ZapJarlsberg) === false && keyStrategy.useful(Keys.ZapSneaky) === false,
    prepare: () => {
      if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject150 || (misc_templateObject150 = misc_taggedTemplateLiteral(["plus sign"]))))) (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject151 || (misc_templateObject151 = misc_taggedTemplateLiteral(["plus sign"]))));
    },
    do: (0,template_string/* $location */.PG)(misc_templateObject152 || (misc_templateObject152 = misc_taggedTemplateLiteral(["The Dungeons of Doom"]))),
    outfit: {
      modifier: "-combat, init",
      familiar: (0,template_string/* $familiar */.HP)(misc_templateObject153 || (misc_templateObject153 = misc_taggedTemplateLiteral(["Grey Goose"])))
    },
    combat: (misc_CombatStrategy$banis = new src_combat.CombatStrategy().banish((0,template_string/* $monster */.O4)(misc_templateObject154 || (misc_templateObject154 = misc_taggedTemplateLiteral(["Quantum Mechanic"]))))).kill.apply(misc_CombatStrategy$banis, misc_toConsumableArray((0,template_string/* $monsters */.fr)(misc_templateObject155 || (misc_templateObject155 = misc_taggedTemplateLiteral(["mimic, The Master Of Thieves"]))))),
    // Avoid getting more teleportitis
    choices: {
      25: 2
    },
    limit: {
      soft: 20
    }
  }, {
    name: "Wand",
    after: ["Mimic"],
    completed: () => (0,property/* get */.U2)("lastZapperWand") === (0,external_kolmafia_.myAscensions)() || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject156 || (misc_templateObject156 = misc_taggedTemplateLiteral(["aluminum wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject157 || (misc_templateObject157 = misc_taggedTemplateLiteral(["ebony wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject158 || (misc_templateObject158 = misc_taggedTemplateLiteral(["hexagonal wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject159 || (misc_templateObject159 = misc_taggedTemplateLiteral(["marble wand"])))) || (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject160 || (misc_templateObject160 = misc_taggedTemplateLiteral(["pine wand"])))) || keyStrategy.useful(Keys.ZapBoris) === false && keyStrategy.useful(Keys.ZapJarlsberg) === false && keyStrategy.useful(Keys.ZapSneaky) === false,
    do: () => (0,external_kolmafia_.use)((0,template_string/* $item */.xr)(misc_templateObject161 || (misc_templateObject161 = misc_taggedTemplateLiteral(["dead mimic"])))),
    freeaction: true,
    limit: {
      tries: 1
    }
  }]
};
function teleportitisTask(engine, tasks, state) {
  // Combine the choice selections from all tasks
  // Where multiple tasks make different choices at the same choice, prefer:
  //  * Earlier tasks to later tasks
  //  * Uncompleted tasks to completed tasks
  var choices = {
    3: 3
  }; // The goal choice

  var done_tasks = tasks.filter(task => task.completed(state));
  var left_tasks = tasks.filter(task => !task.completed(state));

  var _iterator = misc_createForOfIteratorHelper([].concat(misc_toConsumableArray(left_tasks), misc_toConsumableArray(done_tasks)).reverse()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var task = _step.value;

      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str);
        choices[choice_id] = task.choices[choice_id];
      }
    } // Escape the hidden city alters

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  choices[781] = 6;
  choices[783] = 6;
  choices[785] = 6;
  choices[787] = 6;

  if (step("questL11Worship") >= 3) {
    // Escape the hidden heart of the hidden temple
    choices[580] = 3;
  }

  return {
    name: "Teleportitis",
    after: ["Wand/Get Teleportitis"],
    ready: () => (0,lib/* have */.lf)((0,template_string/* $effect */._G)(misc_templateObject162 || (misc_templateObject162 = misc_taggedTemplateLiteral(["Teleportitis"])))),
    completed: () => (0,property/* get */.U2)("lastPlusSignUnlock") === (0,external_kolmafia_.myAscensions)(),
    do: (0,template_string/* $location */.PG)(misc_templateObject163 || (misc_templateObject163 = misc_taggedTemplateLiteral(["The Enormous Greater-Than Sign"]))),
    post: () => {
      // Some tracking is broken when we encounter it with teleportitis
      if ((0,property/* get */.U2)("lastEncounter") === "Having a Ball in the Ballroom") (0,property/* set */.t8)("questM21Dance", "step4");
    },
    outfit: {
      equip: (0,template_string/* $items */.vS)(misc_templateObject164 || (misc_templateObject164 = misc_taggedTemplateLiteral(["antique machete"])))
    },
    choices: choices,
    limit: {
      soft: 20
    }
  };
}
var removeTeleportitis = {
  name: "Clear Teleportitis",
  after: [],
  ready: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(misc_templateObject165 || (misc_templateObject165 = misc_taggedTemplateLiteral(["soft green echo eyedrop antidote"])))),
  completed: () => !(0,lib/* have */.lf)((0,template_string/* $effect */._G)(misc_templateObject166 || (misc_templateObject166 = misc_taggedTemplateLiteral(["Teleportitis"])))),
  do: () => {
    (0,lib/* uneffect */.Lo)((0,template_string/* $effect */._G)(misc_templateObject167 || (misc_templateObject167 = misc_taggedTemplateLiteral(["Teleportitis"]))));
  },
  limit: {
    soft: 2
  },
  freeaction: true
}; // Cake-shaped arena strengths for all of the possible house familiars (and the goose)

var houseFamiliars = new Map([[(0,template_string/* $familiar */.HP)(misc_templateObject168 || (misc_templateObject168 = misc_taggedTemplateLiteral(["Angry Goat"]))), [3, 0, 2, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject169 || (misc_templateObject169 = misc_taggedTemplateLiteral(["Baby Gravy Fairy"]))), [0, 3, 1, 2]], // mafia and wiki disagree
[(0,template_string/* $familiar */.HP)(misc_templateObject170 || (misc_templateObject170 = misc_taggedTemplateLiteral(["Barrrnacle"]))), [0, 2, 1, 3]], [(0,template_string/* $familiar */.HP)(misc_templateObject171 || (misc_templateObject171 = misc_taggedTemplateLiteral(["Blood-Faced Volleyball"]))), [0, 1, 3, 2]], [(0,template_string/* $familiar */.HP)(misc_templateObject172 || (misc_templateObject172 = misc_taggedTemplateLiteral(["Clockwork Grapefruit"]))), [3, 2, 0, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject173 || (misc_templateObject173 = misc_taggedTemplateLiteral(["Cocoabo"]))), [2, 3, 0, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject174 || (misc_templateObject174 = misc_taggedTemplateLiteral(["Fuzzy Dice"]))), [2, 2, 2, 2]], [(0,template_string/* $familiar */.HP)(misc_templateObject175 || (misc_templateObject175 = misc_taggedTemplateLiteral(["Ghuol Whelp"]))), [1, 2, 0, 3]], [(0,template_string/* $familiar */.HP)(misc_templateObject176 || (misc_templateObject176 = misc_taggedTemplateLiteral(["Grue"]))), [2, 0, 1, 3]], [(0,template_string/* $familiar */.HP)(misc_templateObject177 || (misc_templateObject177 = misc_taggedTemplateLiteral(["Hanukkimbo Dreidl"]))), [2, 1, 3, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject178 || (misc_templateObject178 = misc_taggedTemplateLiteral(["Hovering Sombrero"]))), [0, 3, 2, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject179 || (misc_templateObject179 = misc_taggedTemplateLiteral(["Howling Balloon Monkey"]))), [1, 3, 2, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject180 || (misc_templateObject180 = misc_taggedTemplateLiteral(["Killer Bee"]))), [3, 1, 2, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject181 || (misc_templateObject181 = misc_taggedTemplateLiteral(["Leprechaun"]))), [1, 3, 0, 2]], [(0,template_string/* $familiar */.HP)(misc_templateObject182 || (misc_templateObject182 = misc_taggedTemplateLiteral(["Levitating Potato"]))), [0, 1, 2, 3]], [(0,template_string/* $familiar */.HP)(misc_templateObject183 || (misc_templateObject183 = misc_taggedTemplateLiteral(["MagiMechTech MicroMechaMech"]))), [3, 0, 1, 2]], [(0,template_string/* $familiar */.HP)(misc_templateObject184 || (misc_templateObject184 = misc_taggedTemplateLiteral(["Mosquito"]))), [2, 1, 3, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject185 || (misc_templateObject185 = misc_taggedTemplateLiteral(["Sabre-Toothed Lime"]))), [3, 0, 2, 1]], [(0,template_string/* $familiar */.HP)(misc_templateObject186 || (misc_templateObject186 = misc_taggedTemplateLiteral(["Spooky Pirate Skeleton"]))), [2, 3, 1, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject187 || (misc_templateObject187 = misc_taggedTemplateLiteral(["Stab Bat"]))), [3, 2, 1, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject188 || (misc_templateObject188 = misc_taggedTemplateLiteral(["Star Starfish"]))), [2, 1, 3, 0]], [(0,template_string/* $familiar */.HP)(misc_templateObject189 || (misc_templateObject189 = misc_taggedTemplateLiteral(["Whirling Maple Leaf"]))), [3, 1, 2, 0]], // Along with our non-house familiar
[(0,template_string/* $familiar */.HP)(misc_templateObject190 || (misc_templateObject190 = misc_taggedTemplateLiteral(["Grey Goose"]))), [1, 2, 3, 3]]]);

function arenaStrength(familiar, weight, event) {
  var strengths = houseFamiliars.get(familiar);

  if (strengths === undefined) {
    throw "Weights for familiar ".concat(familiar.hatchling, " not found.");
  }

  var strength = strengths[event - 1];

  switch (strength) {
    case 3:
      return weight + 3;

    case 2:
      return weight;

    case 1:
      return weight - 3;

    case 0:
      return 0;
  }

  return 0;
}

function arenaFight() {
  // Train for a single round in the arena, using our current equipment
  // Parse arena opponents
  var familiar_regex = new RegExp(/<[^>]+value=(\d+)><\/td><td[^>]*><img[^>]+><\/td><td class=small><b>[^<]+<\/b> the ([^<]+)<br>([\d]+) lb/g);
  var arena = (0,external_kolmafia_.visitUrl)("arena.php");
  var match;
  var options = [];

  do {
    match = familiar_regex.exec(arena);

    if (match) {
      var opponent = parseInt(match[1]);
      var familiar = external_kolmafia_.Familiar.get(match[2]);
      var weight = parseInt(match[3]);

      if (Number.isNaN(opponent) || Number.isNaN(weight) || weight === 0 || familiar === (0,template_string/* $familiar */.HP)(misc_templateObject191 || (misc_templateObject191 = misc_taggedTemplateLiteral(["none"])))) {
        throw "Unable to parse arena familiar ".concat(match[1], " @ ").concat(match[2], " lbs");
      }

      for (var _i = 0, _arr = [1, 2, 3, 4]; _i < _arr.length; _i++) {
        var event = _arr[_i];
        options.push({
          opponent: opponent,
          familiar: familiar,
          event: event,
          delta: arenaStrength((0,template_string/* $familiar */.HP)(misc_templateObject192 || (misc_templateObject192 = misc_taggedTemplateLiteral(["Grey Goose"]))), (0,external_kolmafia_.familiarWeight)((0,template_string/* $familiar */.HP)(misc_templateObject193 || (misc_templateObject193 = misc_taggedTemplateLiteral(["Grey Goose"])))) + (0,external_kolmafia_.weightAdjustment)(), event) - arenaStrength(familiar, weight, event)
        });
      }
    }
  } while (match); // Find the best opponent.
  // i.e. the strongest opponent that we can beat with at least 4 weight


  var bestOption = options.sort((o, p) => o.delta - p.delta).find(o => o.delta >= 4);

  if (bestOption === undefined) {
    debug("Unable to find good arena opponent; defaulting to mafia", "red");
    (0,external_kolmafia_.cliExecute)("train turns 1");
  } else {
    debug("Fighting ".concat(bestOption.familiar, " with \u0394weight=").concat(bestOption.delta));
    var start_exp = (0,template_string/* $familiar */.HP)(misc_templateObject194 || (misc_templateObject194 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience;
    (0,external_kolmafia_.visitUrl)("arena.php?action=go&whichopp=".concat(bestOption.opponent, "&event=").concat(bestOption.event), true);
    if (start_exp === (0,template_string/* $familiar */.HP)(misc_templateObject195 || (misc_templateObject195 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience) throw "Lost training in cake-shaped arena";
    debug("Experience gained: ".concat((0,template_string/* $familiar */.HP)(misc_templateObject196 || (misc_templateObject196 = misc_taggedTemplateLiteral(["Grey Goose"]))).experience - start_exp));
  }
}
;// CONCATENATED MODULE: ./src/tasks/pulls.ts
var pulls_templateObject, pulls_templateObject2, pulls_templateObject3, pulls_templateObject4, pulls_templateObject5, pulls_templateObject6, pulls_templateObject7, pulls_templateObject8, pulls_templateObject9, pulls_templateObject10, pulls_templateObject11, pulls_templateObject12, pulls_templateObject13, pulls_templateObject14, pulls_templateObject15, pulls_templateObject16, pulls_templateObject17, pulls_templateObject18, pulls_templateObject19, pulls_templateObject20, pulls_templateObject21, pulls_templateObject22, pulls_templateObject23, pulls_templateObject24, pulls_templateObject25, pulls_templateObject26, pulls_templateObject27, pulls_templateObject28, pulls_templateObject29, pulls_templateObject30, pulls_templateObject31, pulls_templateObject32, pulls_templateObject33, pulls_templateObject34, pulls_templateObject35, pulls_templateObject36, pulls_templateObject37, pulls_templateObject38, pulls_templateObject39, pulls_templateObject40, pulls_templateObject41, pulls_templateObject42, pulls_templateObject43, pulls_templateObject44, pulls_templateObject45, pulls_templateObject46, pulls_templateObject47, pulls_templateObject48, pulls_templateObject49, pulls_templateObject50, pulls_templateObject51, pulls_templateObject52;

function pulls_toConsumableArray(arr) { return pulls_arrayWithoutHoles(arr) || pulls_iterableToArray(arr) || pulls_unsupportedIterableToArray(arr) || pulls_nonIterableSpread(); }

function pulls_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function pulls_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function pulls_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return pulls_arrayLikeToArray(arr); }

function pulls_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = pulls_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function pulls_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return pulls_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return pulls_arrayLikeToArray(o, minLen); }

function pulls_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pulls_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pulls_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function pulls_createClass(Constructor, protoProps, staticProps) { if (protoProps) pulls_defineProperties(Constructor.prototype, protoProps); if (staticProps) pulls_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function pulls_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pulls_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







/**
 * optional: If true, only pull this if there is one in storage (i.e., no mall buy).
 * useful: True if we need it, false if we don't, undefined if not sure yet.
 * pull: The item to pull, or a list of options to pull.
 * name: If a list of options is given, what to use for the task (& sim) name.
 */

var pulls = [// Always pull the key items first
{
  pull: (0,template_string/* $item */.xr)(pulls_templateObject || (pulls_templateObject = pulls_taggedTemplateLiteral(["daily dungeon malware"]))),
  useful: () => keyStrategy.useful(Keys.Malware)
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject2 || (pulls_templateObject2 = pulls_taggedTemplateLiteral(["Boris's ring"]))),
  useful: () => keyStrategy.useful(Keys.ZapBoris)
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject3 || (pulls_templateObject3 = pulls_taggedTemplateLiteral(["Jarlsberg's earring"]))),
  useful: () => keyStrategy.useful(Keys.ZapJarlsberg)
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject4 || (pulls_templateObject4 = pulls_taggedTemplateLiteral(["Sneaky Pete's breath spray"]))),
  useful: () => keyStrategy.useful(Keys.ZapSneaky)
}, {
  name: "Ore",
  pull: () => (0,property/* get */.U2)("trapperOre") === "" ? undefined : external_kolmafia_.Item.get((0,property/* get */.U2)("trapperOre")),
  useful: () => {
    if ((0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(pulls_templateObject5 || (pulls_templateObject5 = pulls_taggedTemplateLiteral(["asbestos ore"])))) >= 3 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(pulls_templateObject6 || (pulls_templateObject6 = pulls_taggedTemplateLiteral(["linoleum ore"])))) >= 3 && (0,external_kolmafia_.itemAmount)((0,template_string/* $item */.xr)(pulls_templateObject7 || (pulls_templateObject7 = pulls_taggedTemplateLiteral(["chrome ore"])))) >= 3) return false;
    if ((0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject8 || (pulls_templateObject8 = pulls_taggedTemplateLiteral(["Deck of Every Card"]))))) return false;
    if ((0,property/* get */.U2)("trapperOre") === "") return undefined;
    return (0,external_kolmafia_.itemAmount)(external_kolmafia_.Item.get((0,property/* get */.U2)("trapperOre"))) < 3 && step("questL08Trapper") < 2;
  }
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject9 || (pulls_templateObject9 = pulls_taggedTemplateLiteral(["Mohawk wig"]))),
  useful: () => (0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject10 || (pulls_templateObject10 = pulls_taggedTemplateLiteral(["S.O.C.K."])))) ? !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject11 || (pulls_templateObject11 = pulls_taggedTemplateLiteral(["Mohawk wig"])))) : undefined // if one didn't drop naturally

}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject12 || (pulls_templateObject12 = pulls_taggedTemplateLiteral(["1,970 carat gold"]))),
  useful: () => {
    if ((0,external_kolmafia_.myMeat)() < 200 && step("questM05Toot") > 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject13 || (pulls_templateObject13 = pulls_taggedTemplateLiteral(["letter from King Ralph XI"]))))) return true;
    if ((0,external_kolmafia_.myMeat)() < 4000 && step("questL11Black") === 2 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject14 || (pulls_templateObject14 = pulls_taggedTemplateLiteral(["forged identification documents"]))))) return true;
    if ((0,lib/* have */.lf)((0,template_string/* $skill */.tm)(pulls_templateObject15 || (pulls_templateObject15 = pulls_taggedTemplateLiteral(["System Sweep"])))) && (0,lib/* have */.lf)((0,template_string/* $skill */.tm)(pulls_templateObject16 || (pulls_templateObject16 = pulls_taggedTemplateLiteral(["Double Nanovision"]))))) return false; // early run is over

    return undefined;
  }
}, {
  pull: (0,template_string/* $items */.vS)(pulls_templateObject17 || (pulls_templateObject17 = pulls_taggedTemplateLiteral(["Greatest American Pants, navel ring of navel gazing"]))),
  optional: true,
  name: "Runaway IoTM"
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject18 || (pulls_templateObject18 = pulls_taggedTemplateLiteral(["ring of conflict"]))),
  // Last chance for -5% combat frequency
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject19 || (pulls_templateObject19 = pulls_taggedTemplateLiteral(["unbreakable umbrella"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject20 || (pulls_templateObject20 = pulls_taggedTemplateLiteral(["Space Trip safety headphones"])))) && (0,external_kolmafia_.storageAmount)((0,template_string/* $item */.xr)(pulls_templateObject21 || (pulls_templateObject21 = pulls_taggedTemplateLiteral(["Space Trip safety headphones"])))) === 0 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject22 || (pulls_templateObject22 = pulls_taggedTemplateLiteral(["protonic accelerator pack"]))))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject23 || (pulls_templateObject23 = pulls_taggedTemplateLiteral(["white page"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject24 || (pulls_templateObject24 = pulls_taggedTemplateLiteral(["portable cassette player"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject25 || (pulls_templateObject25 = pulls_taggedTemplateLiteral(["antique machete"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject26 || (pulls_templateObject26 = pulls_taggedTemplateLiteral(["book of matches"])))
}, {
  pull: (0,template_string/* $items */.vS)(pulls_templateObject27 || (pulls_templateObject27 = pulls_taggedTemplateLiteral(["Space Trip safety headphones, HOA regulation book"]))),
  name: "-ML",
  optional: true
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject28 || (pulls_templateObject28 = pulls_taggedTemplateLiteral(["yule hatchet"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject29 || (pulls_templateObject29 = pulls_taggedTemplateLiteral(["grey down vest"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject30 || (pulls_templateObject30 = pulls_taggedTemplateLiteral(["teacher's pen"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject31 || (pulls_templateObject31 = pulls_taggedTemplateLiteral(["blackberry galoshes"]))),
  useful: () => step("questL11Black") < 2
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject32 || (pulls_templateObject32 = pulls_taggedTemplateLiteral(["killing jar"]))),
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $familiar */.HP)(pulls_templateObject33 || (pulls_templateObject33 = pulls_taggedTemplateLiteral(["Melodramedary"]))))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject34 || (pulls_templateObject34 = pulls_taggedTemplateLiteral(["old patched suit-pants"]))),
  optional: true
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject35 || (pulls_templateObject35 = pulls_taggedTemplateLiteral(["transparent pants"]))),
  optional: true,
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject36 || (pulls_templateObject36 = pulls_taggedTemplateLiteral(["designer sweatpants"]))))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject37 || (pulls_templateObject37 = pulls_taggedTemplateLiteral(["deck of lewd playing cards"]))),
  optional: true
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject38 || (pulls_templateObject38 = pulls_taggedTemplateLiteral(["mafia thumb ring"]))),
  optional: true
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject39 || (pulls_templateObject39 = pulls_taggedTemplateLiteral(["giant yellow hat"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject40 || (pulls_templateObject40 = pulls_taggedTemplateLiteral(["gravy boat"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject41 || (pulls_templateObject41 = pulls_taggedTemplateLiteral(["11-leaf clover"])))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject42 || (pulls_templateObject42 = pulls_taggedTemplateLiteral(["wet stew"]))),
  useful: () => step("questL11Palindome") < 5 && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject43 || (pulls_templateObject43 = pulls_taggedTemplateLiteral(["wet stunt nut stew"])))) && !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject44 || (pulls_templateObject44 = pulls_taggedTemplateLiteral(["wet stew"])))) && (!(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject45 || (pulls_templateObject45 = pulls_taggedTemplateLiteral(["lion oil"])))) || !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject46 || (pulls_templateObject46 = pulls_taggedTemplateLiteral(["bird rib"])))))
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject47 || (pulls_templateObject47 = pulls_taggedTemplateLiteral(["ninja rope"]))),
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject48 || (pulls_templateObject48 = pulls_taggedTemplateLiteral(["ninja rope"])))) && step("questL08Trapper") < 3 && step("questL11Shen") > 3
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject49 || (pulls_templateObject49 = pulls_taggedTemplateLiteral(["ninja carabiner"]))),
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject50 || (pulls_templateObject50 = pulls_taggedTemplateLiteral(["ninja carabiner"])))) && step("questL08Trapper") < 3 && step("questL11Shen") > 3
}, {
  pull: (0,template_string/* $item */.xr)(pulls_templateObject51 || (pulls_templateObject51 = pulls_taggedTemplateLiteral(["ninja crampons"]))),
  useful: () => !(0,lib/* have */.lf)((0,template_string/* $item */.xr)(pulls_templateObject52 || (pulls_templateObject52 = pulls_taggedTemplateLiteral(["ninja crampons"])))) && step("questL08Trapper") < 3 && step("questL11Shen") > 3
}];

var Pull = /*#__PURE__*/function () {
  function Pull(spec) {
    var _spec$optional, _spec$useful;

    pulls_classCallCheck(this, Pull);

    pulls_defineProperty(this, "items", void 0);

    pulls_defineProperty(this, "name", void 0);

    pulls_defineProperty(this, "optional", void 0);

    pulls_defineProperty(this, "useful", void 0);

    if ("name" in spec) {
      this.name = spec.name;
    } else {
      this.name = spec.pull.name;
    }

    var pull = spec.pull;
    this.items = pull instanceof external_kolmafia_.Item ? () => [pull] : typeof pull === "function" ? () => [pull()] : () => pull;
    this.optional = (_spec$optional = spec.optional) !== null && _spec$optional !== void 0 ? _spec$optional : false;
    this.useful = (_spec$useful = spec.useful) !== null && _spec$useful !== void 0 ? _spec$useful : () => true;
  }

  pulls_createClass(Pull, [{
    key: "wasPulled",
    value: function wasPulled(pulled) {
      var _iterator = pulls_createForOfIteratorHelper(this.items()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          if (item === undefined) continue;
          if (pulled.has(item)) return true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
  }, {
    key: "shouldPull",
    value: function shouldPull() {
      var needed = this.useful();
      if (needed === false) return false;
      if (!this.optional) return needed; // For optional items, return false if we have none
      // and defer to needed if we have some.

      var _iterator2 = pulls_createForOfIteratorHelper(this.items()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (item === undefined) return undefined; // We don't even know which item yet

          if ((0,external_kolmafia_.storageAmount)(item) > 0) return needed;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return false;
    }
  }, {
    key: "pull",
    value: function pull() {
      var _iterator3 = pulls_createForOfIteratorHelper(this.items()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;
          if (item === undefined) throw "Unable to pull ".concat(this.name, "; the desired item is undefined");

          if ((0,external_kolmafia_.storageAmount)(item) > 0 || (0,external_kolmafia_.buyUsingStorage)(1, item, 100000)) {
            (0,external_kolmafia_.cliExecute)("pull ".concat(item.name));
            return;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return Pull;
}();

var PullState;

(function (PullState) {
  PullState[PullState["PULLED"] = 0] = "PULLED";
  PullState[PullState["READY"] = 1] = "READY";
  PullState[PullState["MAYBE"] = 2] = "MAYBE";
  PullState[PullState["UNNEEDED"] = 3] = "UNNEEDED";
})(PullState || (PullState = {}));

var PullStrategy = /*#__PURE__*/function () {
  function PullStrategy(pulls) {
    pulls_classCallCheck(this, PullStrategy);

    pulls_defineProperty(this, "pulls", void 0);

    pulls_defineProperty(this, "enabled", void 0);

    this.pulls = pulls.map(pull => new Pull(pull));
    this.enabled = pulls.map(() => PullState.MAYBE);
  }

  pulls_createClass(PullStrategy, [{
    key: "update",
    value: function update() {
      var pulled = new Set((0,property/* get */.U2)("_roninStoragePulls").split(",").map(id => parseInt(id)).filter(id => id > 0).map(id => external_kolmafia_.Item.get(id)));
      var count = args.pulls - pulled.size;

      for (var i = 0; i < this.pulls.length; i++) {
        if (this.pulls[i].wasPulled(pulled)) {
          this.enabled[i] = PullState.PULLED;
          continue;
        }

        switch (this.pulls[i].shouldPull()) {
          case false:
            this.enabled[i] = PullState.UNNEEDED;
            continue;

          case true:
            this.enabled[i] = count > 0 ? PullState.READY : PullState.MAYBE; // Only pull if there is room in the plan

            count--;
            continue;

          case undefined:
            this.enabled[i] = PullState.MAYBE;
            count--;
            continue;
        }
      }
    }
  }, {
    key: "pullsUsed",
    value: function pullsUsed() {
      return (0,property/* get */.U2)("_roninStoragePulls").split(",").length;
    }
  }]);

  return PullStrategy;
}();

var pullStrategy = new PullStrategy(pulls);
var PullQuest = {
  name: "Pull",
  tasks: [].concat(pulls_toConsumableArray(pullStrategy.pulls.map((pull, index) => {
    return {
      name: pull.name,
      priority: () => OverridePriority.Free,
      after: [],
      ready: () => pullStrategy.enabled[index] === PullState.READY,
      completed: () => pullStrategy.enabled[index] === PullState.PULLED || pullStrategy.enabled[index] === PullState.UNNEEDED,
      do: () => pull.pull(),
      post: () => {
        pullStrategy.update();
      },
      limit: {
        tries: 1
      },
      freeaction: true
    };
  })), [{
    // Add a last task that tracks if all pulls have been done, for routing
    name: "All",
    after: pullStrategy.pulls.map(pull => pull.name),
    completed: () => true,
    do: () => {
      throw "Should never run";
    },
    limit: {
      tries: 1
    },
    freeaction: true
  }])
};
;// CONCATENATED MODULE: ./src/tasks/all.ts
function all_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = all_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function all_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return all_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return all_arrayLikeToArray(o, minLen); }

function all_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





















function all_tasks() {
  var quests = [TootQuest, MiscQuest, PullQuest, WandQuest, KeysQuest, MosquitoQuest, TavernQuest, BatQuest, KnobQuest, FriarQuest, // OrganQuest,
  CryptQuest, McLargeHugeQuest, ChasmQuest, GiantQuest, HiddenQuest, ManorQuest, PalindomeQuest, MacguffinQuest, WarQuest, TowerQuest, AbsorbQuest, ReprocessQuest];
  var result = [];

  var _loop = function _loop() {
    var quest = _quests[_i];

    var _iterator = all_createForOfIteratorHelper(quest.tasks),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var task = _step.value;
        // Include quest name in task names and dependencies (unless dependency quest is given)
        task.name = "".concat(quest.name, "/").concat(task.name);
        task.after = task.after.map(after => after.includes("/") ? after : "".concat(quest.name, "/").concat(after));
        result.push(task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  for (var _i = 0, _quests = quests; _i < _quests.length; _i++) {
    _loop();
  } // Verify the dependency names of all tasks


  var names = new Set();

  for (var _i2 = 0, _result = result; _i2 < _result.length; _i2++) {
    var task = _result[_i2];
    names.add(task.name);
  }

  for (var _i3 = 0, _result2 = result; _i3 < _result2.length; _i3++) {
    var _task = _result2[_i3];

    var _iterator2 = all_createForOfIteratorHelper(_task.after),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var after = _step2.value;

        if (!names.has(after)) {
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return result;
}
;// CONCATENATED MODULE: ./src/route.ts
function route_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = route_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function route_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return route_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return route_arrayLikeToArray(o, minLen); }

function route_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var routing = [// Start with the basic leveling tasks
"Toot/Finish", // Get basic gear
"Misc/Goose Exp", "Misc/Acquire Cold Medicine Gear", "Misc/Acquire Firework Hat", "Misc/Acquire Birch Battery", "Keys/Deck", "Pull/All", // Get infinite loop
"McLargeHuge/Ore Mountain", "Misc/Locket Pygmy", "Absorb/Ponzi Apparatus", // Get +meat early, we'll want a lot
// Get initial -combat
"Knob/King", "Absorb/Phase Shift", "McLargeHuge/Trapper Request", // open for absorbing
"Absorb/Fluid Dynamics Simulation", // ASAP once level 11 is hit, grab -combat
"Absorb/Photonic Shroud", // Grind tasks until level 11
"Mosquito/Burn Delay", "Hidden City/Open Temple", // Get +item
"Absorb/Gravitational Compression", "Misc/Fortune", // Aim for remaining pygmies
"Hidden City/Bowling Skills", "Giant/Airship YR Healer", "Misc/Retune Moon", "War/Flyers Start", // Start the war and get flyers
// For MP regen, ASAP
"Wand/Wand", "Misc/Hermit Clover", "Absorb/Hivemindedness", // Open Hidden City with Sue buff
"Hidden City/Open Office", "Hidden City/Open Hospital", "Hidden City/Open Apartment", // Line up -combats
"Manor/Start Floor2", "Manor/Bedroom", "Manor/Bathroom Delay", "Manor/Gallery Delay", "Palindome/Copperhead", "Palindome/Bat Snake", "Bat/Use Sonar 3", // Prepare for lobsterfrogman backups
"Palindome/Cold Snake", // Knock down -combats
"Manor/Finish Floor2", "Giant/Unlock HITS", "Crypt/Cranny", "Manor/Finish Floor2", "Mosquito/Finish", // The following 3 tasks should always stay in this order
"Macguffin/Oasis", // Get ultrahydrated as soon as needed
"Macguffin/Oasis Drum", // Get drum as soon as pages are gathered
"Macguffin/Desert", // charge camel for protestors
"Palindome/Protesters", // Finish remaining quests
"McLargeHuge/Finish", "Manor/Boss", "Crypt/Finish", "Giant/Finish", "Tavern/Finish", "Macguffin/Finish", "Orc Chasm/Start Peaks", "Orc Chasm/Finish", "Reprocess/Twin Peak", // Work on absorbing Twin Peak during war
"War/Boss Hippie", // Finish up with last delay
"Bat/Finish", "Tower/Naughty Sorceress", "Absorb/South of the Border", // If we are doing this, do it early to give room for orb
"Absorb/All", "Reprocess/All", // Return to locations if reprocessing was missed
"Misc/Dog Chow", // Eat if there are no other options
"Misc/Cake-Shaped Arena" // Arena if there are no charged options
];
function prioritize(tasks) {
  var priorities = new Map();

  var _iterator = route_createForOfIteratorHelper(tasks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var task = _step.value;
      if (task.delay !== undefined) priorities.set(task.name, [2000, task]); // Finish delay as late as possible

      priorities.set(task.name, [1000, task]);
    } // Prioritize the routing list of tasks first

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function setPriorityRecursive(task, priority) {
    var old_priority = priorities.get(task);
    if (old_priority === undefined) throw "Unknown routing task ".concat(task);
    if (old_priority[0] <= priority) return;
    priorities.set(task, [priority, old_priority[1]]);

    var _iterator2 = route_createForOfIteratorHelper(old_priority[1].after),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var requirement = _step2.value;
        setPriorityRecursive(requirement, priority - 0.01);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  for (var i = 0; i < routing.length; i++) {
    setPriorityRecursive(routing[i], i);
  } // Sort all tasks by priority.
  // Since this sort is stable, we default to earlier tasks.


  var result = tasks.slice();
  result.sort((a, b) => (priorities.get(a.name) || [1000])[0] - (priorities.get(b.name) || [1000])[0]);
  return result;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/since.js
function since_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function since_createClass(Constructor, protoProps, staticProps) { if (protoProps) since_defineProperties(Constructor.prototype, protoProps); if (staticProps) since_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function since_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Provides functions for checking KoLmafia's version and revision.
 * @packageDocumentation
 */

/**
 * Represents an exception thrown when the current KoLmafia version does not
 * match an expected condition.
 */

var KolmafiaVersionError = /*#__PURE__*/function (_Error) {
  _inherits(KolmafiaVersionError, _Error);

  var _super = _createSuper(KolmafiaVersionError);

  function KolmafiaVersionError(message) {
    var _this;

    since_classCallCheck(this, KolmafiaVersionError);

    _this = _super.call(this, message); // Explicitly set the prototype, so that 'instanceof' still works in Node.js
    // even when the class is transpiled down to ES5
    // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Note that this code isn't needed for Rhino.

    Object.setPrototypeOf(_assertThisInitialized(_this), KolmafiaVersionError.prototype);
    return _this;
  }

  return since_createClass(KolmafiaVersionError);
}( /*#__PURE__*/_wrapNativeSuper(Error)); // Manually set class name, so that the stack trace shows proper name in Rhino

KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
/**
 * Returns the currently executing script name, suitable for embedding in an
 * error message.
 * @returns Path of the main script wrapped in single-quotes, or `"This script"`
 *    if the path cannot be determined
 */

function getScriptName() {
  var _require$main;

  // In Rhino, the current script name is available in require.main.id
  var scriptName = (_require$main = __webpack_require__.c[__webpack_require__.s]) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
/**
 * If KoLmafia's revision number is less than `revision`, throws an exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since rXXX;` statement in ASH.
 * @param revision Revision number
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's revision number is less than `revision`.
 * @throws {TypeError} If `revision` is not an integer
 *
 * @example
 * ```ts
 * // Throws if KoLmafia revision is less than r20500
 * sinceKolmafiaRevision(20500);
 * ```
 */


function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision)) {
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  } // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()


  var currentRevision = (0,external_kolmafia_.getRevision)();

  if (currentRevision > 0 && currentRevision < revision) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0,external_kolmafia_.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
/**
 * If KoLmafia's version is less than `majorVersion.minorVersion`, throws an
 * exception.
 * Otherwise, does nothing.
 *
 * This behaves like the `since X.Y;` statement in ASH.
 * @param majorVersion Major version number
 * @param minorVersion Minor version number
 * @deprecated Point versions are no longer released by KoLmafia
 * @throws {KolmafiaVersionError}
 *    If KoLmafia's major version is less than `majorVersion`, or if the major
 *    versions are equal but the minor version is less than `minorVersion`
 * @throws {TypeError}
 *    If either `majorVersion` or `minorVersion` are not integers
 *
 * @example
 * ```ts
 * // Throws if KoLmafia version is less than 20.7
 * sinceKolmafiaVersion(20, 7);
 * ```
 */

function sinceKolmafiaVersion(majorVersion, minorVersion) {
  if (getRevision() >= 25720) {
    return;
  }

  if (!Number.isInteger(majorVersion)) {
    throw new TypeError("Invalid major version number ".concat(majorVersion, " (must be an integer)"));
  }

  if (!Number.isInteger(minorVersion)) {
    throw new TypeError("Invalid minor version number ".concat(minorVersion, " (must be an integer)"));
  }

  if (majorVersion > 21 || majorVersion === 20 && minorVersion > 9) {
    throw new Error("There were no versions released after 21.09. This command will always fail");
  }

  var versionStr = getVersion();
  var versionStrMatch = /v(\d+)\.(\d+)/.exec(versionStr);

  if (!versionStrMatch) {
    // This is not something the user should handle
    throw new Error("Unexpected KoLmafia version string: \"".concat(versionStr, "\". You may need to update the script."));
  }

  var currentMajorVersion = Number(versionStrMatch[1]);
  var currentMinorVersion = Number(versionStrMatch[2]); // Based on net.sourceforge.kolmafia.textui.Parser.sinceException()

  if (currentMajorVersion < majorVersion || currentMajorVersion === majorVersion && currentMinorVersion < minorVersion) {
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires version ").concat(majorVersion, ".").concat(minorVersion, " of kolmafia or higher (current: ").concat(currentMajorVersion, ".").concat(currentMinorVersion, "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
  }
}
;// CONCATENATED MODULE: ./src/args.ts
function args_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = args_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function args_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return args_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return args_arrayLikeToArray(o, minLen); }

function args_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function args_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function args_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? args_ownKeys(Object(source), !0).forEach(function (key) { args_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : args_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function args_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function args_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function args_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function args_createClass(Constructor, protoProps, staticProps) { if (protoProps) args_defineProperties(Constructor.prototype, protoProps); if (staticProps) args_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



/**
 * Specification for an argument that takes values in T.
 * @member key The key to use when parsing this argument.
 * @member help Description for the help text.
 * @member options An array of allowable values for this argument.
 *    Each entry has an optional description for the help text as well.
 * @member setting A setting to use for this argument. If not given,
 *    ${script name}_${argument name} is used; set to "" for no setting.
 *    A value in this setting is used as the new default for this argument,
 *    and can be overridden by a command line argument.
 * @member hidden If true, do not display this option in the help text.
 * @member default A default value to use if no value is provided.
 *    Note that 'default' is effectively optional, as all methods that take
 *    an ArgSpec allow for 'default' to be omitted. But it is typed as
 *    non-optional here to enable cool type inference voodoo.
 */

var Args = /*#__PURE__*/function () {
  function Args() {
    args_classCallCheck(this, Args);
  }

  args_createClass(Args, null, [{
    key: "custom",
    value: function custom(spec, parser, valueHelpName) {
      if ("default" in spec && spec.options) {
        if (!spec.options.map(option => option[0]).includes(spec.default)) {
          throw "Invalid default value ".concat(spec.default);
        }
      }

      return args_objectSpread(args_objectSpread({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: parser
      });
    }
    /**
     * Create a string argument.
     * @param spec Specification for this argument. See {@link ArgSpec} for details.
     */

  }, {
    key: "string",
    value: function string(spec) {
      return this.custom(spec, value => value, "TEXT");
    }
    /**
     * Create a number argument.
     * @param spec Specification for this argument. See {@link ArgSpec} for details.
     */

  }, {
    key: "number",
    value: function number(spec) {
      return this.custom(spec, value => isNaN(Number(value)) ? undefined : Number(value), "NUMBER");
    }
    /**
     * Create a boolean argument.
     * @param spec Specification for this argument. See {@link ArgSpec} for details.
     */

  }, {
    key: "boolean",
    value: function boolean(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "BOOLEAN");
    }
    /**
     * Create a flag.
     * @param spec Specification for this argument. See {@link ArgSpec} for details.
     */

  }, {
    key: "flag",
    value: function flag(spec) {
      return this.custom(spec, value => {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
        return undefined;
      }, "FLAG");
    }
    /**
     * Create a set of input arguments for a script.
     * @param scriptName Prefix for property names; often the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others).
     * @returns An object which can hold parsed argument values. The keys of this
     *    object are identical to the keys in 'args'.
     */

  }, {
    key: "create",
    value: function create(scriptName, scriptHelp, args) {
      var _res;

      for (var _k in args) {
        if (_k === "help" || args[_k].key === "help") throw "help is a reserved argument name";
      }

      var argsWithHelp = args_objectSpread(args_objectSpread({}, args), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      });

      var res = (_res = {}, args_defineProperty(_res, specSymbol, argsWithHelp), args_defineProperty(_res, scriptSymbol, scriptName), args_defineProperty(_res, scriptHelpSymbol, scriptHelp), _res); // Fill the default values for each argument.

      for (var _k2 in argsWithHelp) {
        var v = argsWithHelp[_k2];
        if ("default" in v) res[_k2] = v["default"];else res[_k2] = undefined;
      } // Parse values from settings.


      for (var _k3 in argsWithHelp) {
        var _argsWithHelp$_k3$set, _argsWithHelp$_k3$key;

        var setting = (_argsWithHelp$_k3$set = argsWithHelp[_k3].setting) !== null && _argsWithHelp$_k3$set !== void 0 ? _argsWithHelp$_k3$set : "".concat(scriptName, "_").concat((_argsWithHelp$_k3$key = argsWithHelp[_k3].key) !== null && _argsWithHelp$_k3$key !== void 0 ? _argsWithHelp$_k3$key : _k3);
        if (setting === "") continue; // no setting

        var value_str = (0,property/* get */.U2)(setting, "");
        if (value_str === "") continue;
        res[_k3] = parseAndValidate(argsWithHelp[_k3], "Setting ".concat(setting), value_str);
      }

      return res;
    }
    /**
     * Parse the command line input into the provided script arguments.
     * @param args An object to hold the parsed argument values, from Args.create(*).
     * @param command The command line input.
     */

  }, {
    key: "fill",
    value: function fill(args, command) {
      if (command === undefined || command === "") return;
      var spec = args[specSymbol];
      var keys = new Set();
      var flags = new Set();

      for (var _k4 in spec) {
        var _spec$_k4$key, _spec$_k4$key2;

        if (spec[_k4].valueHelpName === "FLAG") flags.add((_spec$_k4$key = spec[_k4].key) !== null && _spec$_k4$key !== void 0 ? _spec$_k4$key : _k4);else keys.add((_spec$_k4$key2 = spec[_k4].key) !== null && _spec$_k4$key2 !== void 0 ? _spec$_k4$key2 : _k4);
      } // Parse new argments from the command line


      var parsed = new CommandParser(command, keys, flags).parse();

      for (var _k5 in spec) {
        var _spec$_k5$key;

        var _key = (_spec$_k5$key = spec[_k5].key) !== null && _spec$_k5$key !== void 0 ? _spec$_k5$key : _k5;

        var value_str = parsed.get(_key);
        if (value_str === undefined) continue; // eslint-disable-next-line @typescript-eslint/no-explicit-any

        args[_k5] = parseAndValidate(spec[_k5], "Argument ".concat(_key), value_str);
      }
    }
    /**
     * Parse command line input into a new set of script arguments.
     * @param scriptName Prefix to use in property names; typically the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param spec An object specifying the script arguments.
     * @param command The command line input.
     */

  }, {
    key: "parse",
    value: function parse(scriptName, scriptHelp, spec, command) {
      var args = this.create(scriptName, scriptHelp, spec);
      this.fill(args, command);
      return args;
    }
    /**
     * Print a description of the script arguments to the CLI.
     * @param args An object of parsed arguments, from Args.create(*).
     * @param maxOptionsToDisplay If given, do not list more than this many options for each arg.
     */

  }, {
    key: "showHelp",
    value: function showHelp(args, maxOptionsToDisplay) {
      var spec = args[specSymbol];
      var scriptName = args[scriptSymbol];
      var scriptHelp = args[scriptHelpSymbol];
      (0,external_kolmafia_.printHtml)("".concat(scriptHelp));
      (0,external_kolmafia_.printHtml)("<font color='blue'><b>Options:</b></font>");

      for (var _k6 in spec) {
        var _arg$key, _arg$help, _arg$setting, _arg$key2, _arg$options;

        var arg = spec[_k6];
        if (arg.hidden) continue;
        var nameText = "<font color='blue'>".concat((_arg$key = arg.key) !== null && _arg$key !== void 0 ? _arg$key : _k6, "</font>");
        var valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>");
        var helpText = (_arg$help = arg.help) !== null && _arg$help !== void 0 ? _arg$help : "";
        var defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "";
        var settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_arg$setting = arg.setting) !== null && _arg$setting !== void 0 ? _arg$setting : "".concat(scriptName, "_").concat((_arg$key2 = arg.key) !== null && _arg$key2 !== void 0 ? _arg$key2 : _k6), "]</font>");
        (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
        var valueOptions = (_arg$options = arg.options) !== null && _arg$options !== void 0 ? _arg$options : [];

        if (valueOptions.length < (maxOptionsToDisplay !== null && maxOptionsToDisplay !== void 0 ? maxOptionsToDisplay : Number.MAX_VALUE)) {
          var _iterator = args_createForOfIteratorHelper(valueOptions),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var option = _step.value;

              if (option.length === 1) {
                (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0]));
              } else {
                (0,external_kolmafia_.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
  }]);

  return Args;
}();
/**
 * A parser that can transform a string value into the desired type.
 * It may return undefined if given an invalid value.
 */

/**
 * Metadata for the parsed arguments.
 *
 * This information is hidden within the parsed argument object so that it
 * is invisible to the user but available to fill(*) and showHelp(*).
 */
var specSymbol = Symbol("spec");
var scriptSymbol = Symbol("script");
var scriptHelpSymbol = Symbol("scriptHelp");

/**
 * Parse a string into a value for a given argument, throwing if the parsing fails.
 * @param arg An argument that takes values in T.
 * @param source A description of where this value came from, for the error message.
 * @param value The value to parse.
 * @returns the parsed value.
 */
function parseAndValidate(arg, source, value) {
  var parsed_value = arg.parser(value);
  if (parsed_value === undefined) throw "".concat(source, " could not parse value: ").concat(value);
  var options = arg.options;

  if (options) {
    if (!options.map(option => option[0]).includes(parsed_value)) {
      throw "".concat(source, " received invalid value: ").concat(value);
    }
  }

  return parsed_value;
}
/**
 * A parser to extract key/value pairs from a command line input.
 * @member command The command line input.
 * @member keys The set of valid keys that can appear.
 * @member flags The set of valid flags that can appear.
 * @member index An internal marker for the progress of the parser over the input.
 */


var CommandParser = /*#__PURE__*/function () {
  function CommandParser(command, keys, flags) {
    args_classCallCheck(this, CommandParser);

    args_defineProperty(this, "command", void 0);

    args_defineProperty(this, "keys", void 0);

    args_defineProperty(this, "flags", void 0);

    args_defineProperty(this, "index", void 0);

    this.command = command;
    this.index = 0;
    this.keys = keys;
    this.flags = flags;
  }
  /**
   * Perform the parsing of (key, value) pairs.
   * @returns The set of extracted (key, value) pairs.
   */


  args_createClass(CommandParser, [{
    key: "parse",
    value: function parse() {
      this.index = 0; // reset the parser

      var result = new Map();

      while (!this.finished()) {
        // A flag F may appear as !F to be parsed as false.
        var parsing_negative_flag = false;

        if (this.peek() === "!") {
          parsing_negative_flag = true;
          this.consume(["!"]);
        }

        var _key2 = this.parseKey();

        if (result.has(_key2)) {
          throw "Duplicate key: ".concat(_key2);
        }

        if (this.flags.has(_key2)) {
          // The key corresponds to a flag.
          // Parse [key] as true and ![key] as false.
          result.set(_key2, parsing_negative_flag ? "false" : "true");
          if (this.peek() === "=") throw "Flag ".concat(_key2, " cannot be assigned a value");
          if (!this.finished()) this.consume([" "]);
        } else {
          // Parse [key]=[value] or [key] [value]
          this.consume(["=", " "]);

          var _value = this.parseValue();

          if (!this.finished()) this.consume([" "]);
          result.set(_key2, _value);
        }
      }

      return result;
    }
    /**
     * @returns True if the entire command has been parsed.
     */

  }, {
    key: "finished",
    value: function finished() {
      return this.index >= this.command.length;
    }
    /**
     * @returns The next character to parse, if it exists.
     */

  }, {
    key: "peek",
    value: function peek() {
      if (this.index >= this.command.length) return undefined;
      return this.command.charAt(this.index);
    }
    /**
     * Advance the internal marker over the next expected character.
     * Throws an error on unexpected characters.
     *
     * @param allowed Characters that are expected.
     */

  }, {
    key: "consume",
    value: function consume(allowed) {
      var _this$peek;

      if (this.finished()) throw "Expected ".concat(allowed);

      if (allowed.includes((_this$peek = this.peek()) !== null && _this$peek !== void 0 ? _this$peek : "")) {
        this.index += 1;
      }
    }
    /**
     * Find the next occurance of one of the provided characters, or the end of
     * the string if the characters never appear again.
     *
     * @param searchValue The characters to locate.
     */

  }, {
    key: "findNext",
    value: function findNext(searchValue) {
      var result = this.command.length;

      var _iterator2 = args_createForOfIteratorHelper(searchValue),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _value2 = _step2.value;
          var index = this.command.indexOf(_value2, this.index);
          if (index !== -1 && index < result) result = index;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return result;
    }
    /**
     * Starting from the internal marker, parse a single key.
     * This also advances the internal marker.
     *
     * @returns The next key.
     */

  }, {
    key: "parseKey",
    value: function parseKey() {
      var keyEnd = this.findNext(["=", " "]);
      var key = this.command.substring(this.index, keyEnd);
      this.index = keyEnd;

      if (!this.keys.has(key) && !this.flags.has(key)) {
        throw "Unknown key: ".concat(key);
      }

      return key;
    }
    /**
     * Starting from the internal marker, parse a single value.
     * This also advances the internal marker.
     *
     * Values are a single word or enclosed in matching quotes, i.e. one of:
     *    "[^"]*"
     *    '[^']*"
     *    [^'"][^ ]*
     *
     * @returns The next value.
     */

  }, {
    key: "parseValue",
    value: function parseValue() {
      var _this$peek2;

      var valueEnder = " ";
      var quotes = ["'", '"'];

      if (quotes.includes((_this$peek2 = this.peek()) !== null && _this$peek2 !== void 0 ? _this$peek2 : "")) {
        var _this$peek3;

        valueEnder = (_this$peek3 = this.peek()) !== null && _this$peek3 !== void 0 ? _this$peek3 : ""; // The value is everything until the next quote

        this.consume([valueEnder]); // Consume opening quote
      }

      var valueEnd = this.findNext([valueEnder]);
      var value = this.command.substring(this.index, valueEnd);

      if (valueEnder !== " " && valueEnd === this.command.length) {
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      } // Consume the value (and closing quote)


      this.index = valueEnd;
      if (valueEnder !== " ") this.consume([valueEnder]);
      return value;
    }
  }]);

  return CommandParser;
}();
;// CONCATENATED MODULE: ./src/sim.ts
var sim_templateObject, sim_templateObject2, sim_templateObject3, sim_templateObject4, sim_templateObject5, sim_templateObject6, sim_templateObject7, sim_templateObject8, sim_templateObject9, sim_templateObject10, sim_templateObject11, sim_templateObject12, sim_templateObject13, sim_templateObject14, sim_templateObject15, sim_templateObject16, sim_templateObject17, sim_templateObject18, sim_templateObject19, sim_templateObject20, sim_templateObject21, sim_templateObject22, sim_templateObject23, sim_templateObject24, sim_templateObject25, sim_templateObject26, sim_templateObject27, sim_templateObject28, sim_templateObject29;

function sim_slicedToArray(arr, i) { return sim_arrayWithHoles(arr) || sim_iterableToArrayLimit(arr, i) || sim_unsupportedIterableToArray(arr, i) || sim_nonIterableRest(); }

function sim_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function sim_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function sim_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sim_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = sim_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function sim_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return sim_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return sim_arrayLikeToArray(o, minLen); }

function sim_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function sim_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function sim_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function sim_createClass(Constructor, protoProps, staticProps) { if (protoProps) sim_defineProperties(Constructor.prototype, protoProps); if (staticProps) sim_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function sim_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sim_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Hardcoded = /*#__PURE__*/sim_createClass(function Hardcoded(have, name) {
  sim_classCallCheck(this, Hardcoded);

  sim_defineProperty(this, "have", void 0);

  sim_defineProperty(this, "name", void 0);

  this.have = have;
  this.name = name;
});

/**
 * Return: a list of all things required to run the script.
 */
function buildIotmList() {
  var requirements = [{
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject || (sim_templateObject = sim_taggedTemplateLiteral(["Grey Goose"]))),
    why: "Adventures"
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject2 || (sim_templateObject2 = sim_taggedTemplateLiteral(["Clan VIP Lounge key"]))),
    why: "YRs, -combat"
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject3 || (sim_templateObject3 = sim_taggedTemplateLiteral(["industrial fire extinguisher"]))),
    why: "Harem outfit, Bat hole, stone wool, Crypt, Ultrahydrated",
    optional: true
  }, {
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject4 || (sim_templateObject4 = sim_taggedTemplateLiteral(["Melodramedary"]))),
    why: "Desert progress",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject5 || (sim_templateObject5 = sim_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))),
    why: "Slay the dead in crypt, pygmy killing",
    optional: true
  }, {
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject6 || (sim_templateObject6 = sim_taggedTemplateLiteral(["Shorter-Order Cook"]))),
    why: "Kill the Wall of Skin, initial exp",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject7 || (sim_templateObject7 = sim_taggedTemplateLiteral(["Deck of Every Card"]))),
    why: "Get a key for the NS tower",
    optional: true
  }, {
    thing: new Hardcoded((0,lib/* have */.lf)((0,template_string/* $item */.xr)(sim_templateObject8 || (sim_templateObject8 = sim_taggedTemplateLiteral(["cold medicine cabinet"])))) || (0,external_kolmafia_.getWorkshed)() === (0,template_string/* $item */.xr)(sim_templateObject9 || (sim_templateObject9 = sim_taggedTemplateLiteral(["cold medicine cabinet"]))), "Cold medicine cabinet"),
    why: "QoL Equipment"
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject10 || (sim_templateObject10 = sim_taggedTemplateLiteral(["fresh coat of paint"]))),
    why: "Minor boosts in moxie sign",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject11 || (sim_templateObject11 = sim_taggedTemplateLiteral(["protonic accelerator pack"]))),
    why: "Wanderers",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject12 || (sim_templateObject12 = sim_taggedTemplateLiteral(["Cargo Cultist Shorts"]))),
    why: "War outfit",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject13 || (sim_templateObject13 = sim_taggedTemplateLiteral(["Powerful Glove"]))),
    why: "Pixels and lobsterfrogmen",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject14 || (sim_templateObject14 = sim_taggedTemplateLiteral(["SpinMaster\u2122 lathe"]))),
    why: "Equipment",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject15 || (sim_templateObject15 = sim_taggedTemplateLiteral(["cursed magnifying glass"]))),
    why: "Lobsterfrogmen, delay",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject16 || (sim_templateObject16 = sim_taggedTemplateLiteral(["backup camera"]))),
    why: "Lobsterfrogmen, ML, init",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject17 || (sim_templateObject17 = sim_taggedTemplateLiteral(["combat lover's locket"]))),
    why: "Reminiscing"
  }, {
    thing: new Hardcoded(new Set(unlockedLocketMonsters()).has((0,template_string/* $monster */.O4)(sim_templateObject18 || (sim_templateObject18 = sim_taggedTemplateLiteral(["pygmy witch lawyer"])))), "combat lover's locket (Pygmy witch lawyer locketed)"),
    why: "Reminiscing for Infinite Loop"
  }, {
    thing: new Hardcoded(new Set(unlockedLocketMonsters()).has((0,template_string/* $monster */.O4)(sim_templateObject19 || (sim_templateObject19 = sim_taggedTemplateLiteral(["mountain man"])))), "combat lover's locket (Mountain man)"),
    why: "Reminiscing for Ore"
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject20 || (sim_templateObject20 = sim_taggedTemplateLiteral(["miniature crystal ball"]))),
    why: "Monster prediction",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject21 || (sim_templateObject21 = sim_taggedTemplateLiteral(["unbreakable umbrella"]))),
    why: "-combat modifier, ML",
    optional: true
  }, {
    thing: new Hardcoded((0,lib/* have */.lf)((0,template_string/* $item */.xr)(sim_templateObject22 || (sim_templateObject22 = sim_taggedTemplateLiteral(["cosmic bowling ball"])))) || (0,property/* get */.U2)("cosmicBowlingBallReturnCombats", -1) >= 0, "Cosmic bowling ball"),
    why: "Banishes, Pygmy killing",
    optional: true
  }, {
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject23 || (sim_templateObject23 = sim_taggedTemplateLiteral(["Vampire Vintner"]))),
    why: "Pygmy killing",
    optional: true
  }, {
    thing: (0,template_string/* $skill */.tm)(sim_templateObject24 || (sim_templateObject24 = sim_taggedTemplateLiteral(["Summon Clip Art"]))),
    why: "Amulet coin (via familiar jacks)",
    optional: true
  }, {
    thing: new Hardcoded("haunted doghouse" in (0,external_kolmafia_.getCampground)(), "haunted doghouse"),
    why: "Ghost dog chow",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject25 || (sim_templateObject25 = sim_taggedTemplateLiteral(["SongBoom\u2122 BoomBox"]))),
    why: "In-run meat source",
    optional: true
  }, {
    thing: (0,template_string/* $item */.xr)(sim_templateObject26 || (sim_templateObject26 = sim_taggedTemplateLiteral(["hewn moon-rune spoon"]))),
    why: "Access to an extra monster absorb (see tune arg)",
    optional: true
  }, {
    thing: new Hardcoded((0,property/* get */.U2)("hasMaydayContract"), "MayDay™ contract"),
    why: "+combat, early meat",
    optional: true
  }];
  return requirements;
}

function buildMiscList() {
  var requirements = [{
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject27 || (sim_templateObject27 = sim_taggedTemplateLiteral(["Oily Woim"]))),
    why: "Bonus initiative",
    optional: true
  }, {
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject28 || (sim_templateObject28 = sim_taggedTemplateLiteral(["Hobo Monkey"]))),
    why: "Meat drops",
    optional: true
  }, {
    thing: (0,template_string/* $familiar */.HP)(sim_templateObject29 || (sim_templateObject29 = sim_taggedTemplateLiteral(["Cornbeefadon"]))),
    why: "Amulet coin, with clip art",
    optional: true
  }];
  return requirements;
}

function buildPullList() {
  var result = [];

  var _iterator = sim_createForOfIteratorHelper(pullStrategy.pulls),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pull = _step.value;
      var items = pull.items().filter(item => item); // Ignore dynamic item selection for now

      if (items.length === 0) continue; // For cheap items, we will just buy it during the run

      if (items.find(item => (0,external_kolmafia_.mallPrice)(item) !== 0 && (0,external_kolmafia_.mallPrice)(item) <= 100000)) continue;
      result.push({
        thing: items,
        why: "Pull",
        optional: pull.optional
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

function checkThing(thing) {
  if (thing instanceof Hardcoded) return [thing.have, thing.name];
  if (thing instanceof external_kolmafia_.Familiar) return [(0,lib/* have */.lf)(thing), thing.hatchling.name];
  if (thing instanceof external_kolmafia_.Skill) return [(0,lib/* have */.lf)(thing), thing.name];
  return [(0,lib/* have */.lf)(thing) || (0,external_kolmafia_.storageAmount)(thing) > 0, thing.name];
}

function check(req) {
  if (Array.isArray(req.thing)) {
    var checks = req.thing.map(checkThing);
    return [checks.find(res => res[0]) !== undefined, checks.map(res => res[1]).join(" OR "), req];
  } else {
    var res = checkThing(req.thing);
    return [res[0], res[1], req];
  }
}

function checkRequirements() {
  var missing_optional = 0;
  var missing = 0;
  var categories = [["IoTMs", buildIotmList().filter(req => !req.optional)], ["Miscellany", buildMiscList().filter(req => !req.optional)], ["Expensive Pulls", buildPullList().filter(req => !req.optional)], ["IoTMs (Optional)", buildIotmList().filter(req => req.optional)], ["Miscellany (Optional)", buildMiscList().filter(req => req.optional)], ["Expensive Pulls (Optional)", buildPullList().filter(req => req.optional)]];
  (0,external_kolmafia_.printHtml)("Checking your character... Legend: <font color='#888888'>✓ Have</font> / <font color='red'>X Missing & Required</font> / <font color='black'>X Missing & Optional");

  for (var _i = 0, _categories = categories; _i < _categories.length; _i++) {
    var _categories$_i = sim_slicedToArray(_categories[_i], 2),
        name = _categories$_i[0],
        requirements = _categories$_i[1];

    if (requirements.length === 0) continue;
    var requirements_info = requirements.map(check);
    (0,external_kolmafia_.print)(name, "blue");

    var _iterator2 = sim_createForOfIteratorHelper(requirements_info.sort((a, b) => a[1].localeCompare(b[1]))),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = sim_slicedToArray(_step2.value, 3),
            have_it = _step2$value[0],
            _name = _step2$value[1],
            req = _step2$value[2];

        var color = have_it ? "#888888" : req.optional ? "black" : "red";
        var symbol = have_it ? "✓" : "X";
        if (!have_it && req.optional) missing_optional++;
        if (!have_it && !req.optional) missing++;
        (0,external_kolmafia_.print)("".concat(symbol, " ").concat(_name, " - ").concat(req.why), color);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    (0,external_kolmafia_.print)("");
  } // Print the count of missing things


  if (missing > 0) {
    (0,external_kolmafia_.print)("You are missing ".concat(missing, " required things. This script will not yet work for you."), "red");
    if (missing_optional > 0) (0,external_kolmafia_.print)("You are also missing ".concat(missing_optional, " optional things."));
  } else {
    if (missing_optional > 0) {
      (0,external_kolmafia_.print)("You are missing ".concat(missing_optional, " optional things. This script should work, but it could do better."));
    } else {
      (0,external_kolmafia_.print)("You have everything! You are the shiniest star. This script should work great.");
    }
  }
}
;// CONCATENATED MODULE: ./src/_git_commit.ts
var lastCommitHash = "40ea8e3";
;// CONCATENATED MODULE: ./src/main.ts
var main_templateObject;

function main_toConsumableArray(arr) { return main_arrayWithoutHoles(arr) || main_iterableToArray(arr) || main_unsupportedIterableToArray(arr) || main_nonIterableSpread(); }

function main_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function main_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function main_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return main_arrayLikeToArray(arr); }

function main_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function main_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = main_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


















var time_property = "_loop_gyou_first_start";
var svn_name = "Kasekopf-loop-casual-branches-release";
var args = Args.create("loopgyou", 'This is a script to complete Grey You Softcore runs. Run "loopgyou sim" without quotes to check if this script will work for you.\n\nYou must ascend manually into a Grey You Softcore run before running the script. The cold medicine cabinet is required in your workshed. Prefer the Vole sign until you have finished most of the path progression. Astral mask or astral belt are both useful, but neither is required. Prefer candles for your eurdora.\n\nThe arguments accepted by the script are listed below. Note that you can combine multiple options; for example "loopgyou pulls=18 tune=blender" will save 2 pulls and switch moon sign to Blender during the run. Most options also have an associated setting to set an option permanently; for example "set loopgyou_pulls=18" will cause the script to always save 2 pulls (unless overriden by using the pulls option at runtime).', {
  sim: Args.flag({
    help: "Check if you have the requirements to run this script.",
    setting: ""
  }),
  version: Args.flag({
    help: "Show script version and exit.",
    setting: ""
  }),
  actions: Args.number({
    help: "Maximum number of actions to perform, if given. Can be used to execute just a few steps at a time."
  }),
  class: Args.number({
    help: "If given, break the prism and choose a class. <font color='red'>You will be reduced to 40 adventures with full organs after breaking the prism.</font>",
    options: [[1, "Seal Clubber"], [2, "Turtle Tamer"], [3, "Pastamancer"], [4, "Saurceror"], [5, "Disco Bandit"], [6, "Accordion Thief"]]
  }),
  pulls: Args.number({
    help: "Number of pulls to use. Lower this if you would like to save some pulls for in-ronin farming.",
    default: 20
  }),
  verboseequip: Args.flag({
    help: "Print out equipment usage before each task."
  }),
  tune: Args.string({
    help: "Use your hewn moon-rune spoon to retune to this sign when optimal."
  }),
  delaytower: Args.flag({
    help: "Delay the NS tower until after ronin ends.",
    default: false
  })
});
function main(command) {
  sinceKolmafiaRevision(26539);
  Args.fill(args, command);

  if (args.help) {
    Args.showHelp(args);
    return;
  }

  if (args.sim) {
    checkRequirements();
    return;
  }

  debug("Running loopgyou version [".concat(lastCommitHash !== null && lastCommitHash !== void 0 ? lastCommitHash : "custom-built", "] in KoLmafia r").concat((0,external_kolmafia_.getRevision)()));
  if (lastCommitHash !== undefined && (0,external_kolmafia_.svnExists)(svn_name) && !(0,external_kolmafia_.svnAtHead)(svn_name)) debug('A newer version of this script is available and can be obtained with "svn update".', "red");
  if (args.version) return;
  if ((0,external_kolmafia_.myPath)() !== "Grey You") throw "You are not currently in a Grey You run. Please start one."; // Break the prism and exit if requested

  if (args.class !== undefined) {
    if (step("questL13Final") <= 11) throw "You have not finished your Grey You run. Do not set this argument yet.";

    var _state = new GameState();

    (0,external_kolmafia_.print)("   Monsters remaining: ".concat(Array.from(_state.absorb.remainingAbsorbs()).join(", ")), "purple");
    (0,external_kolmafia_.print)("   Reprocess remaining: ".concat(Array.from(_state.absorb.remainingReprocess()).join(", ")), "purple");
    if (step("questL13Final") === 999) return;
    (0,external_kolmafia_.visitUrl)("place.php?whichplace=nstower&action=ns_11_prism");
    (0,external_kolmafia_.visitUrl)("main.php");
    (0,external_kolmafia_.runChoice)(args.class);
    (0,external_kolmafia_.runChoice)(args.class);
    return;
  }

  var set_time_now = (0,property/* get */.U2)(time_property, -1) === -1;
  if (set_time_now) (0,property/* set */.t8)(time_property, (0,external_kolmafia_.gametimeToInt)()); // Clear intro adventure

  (0,property/* set */.t8)("choiceAdventure1464", 1);
  if ((0,external_kolmafia_.visitUrl)("main.php").includes("somewhat-human-shaped mass of grey goo nanites")) (0,external_kolmafia_.runChoice)(-1);
  var tasks = prioritize(all_tasks());
  var engine = new Engine(tasks);

  try {
    var _args$actions;

    var actions_left = (_args$actions = args.actions) !== null && _args$actions !== void 0 ? _args$actions : Number.MAX_VALUE;

    var _state2 = new GameState();

    if (actions_left < 0) {
      // Update the strategy for the printout
      keyStrategy.update();
      pullStrategy.update();

      var _iterator = main_createForOfIteratorHelper(tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          var priority = Prioritization.from(task, _state2);
          var reason = priority.explain();
          var why = reason === "" ? "Route" : reason;
          debug("".concat(task.name, ": ").concat(task.completed(_state2) ? "Done" : engine.available(task, _state2) ? "Available [".concat(priority.score(), ": ").concat(why, "]") : "Not Available"), task.completed(_state2) ? "blue" : engine.available(task, _state2) ? undefined : "red");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // Do not bother to set properties if there are no tasks remaining


    if (tasks.find(task => {
      var _task$ready, _task$ready2;

      return !task.completed(_state2) && ((_task$ready = (_task$ready2 = task.ready) === null || _task$ready2 === void 0 ? void 0 : _task$ready2.call(task, _state2)) !== null && _task$ready !== void 0 ? _task$ready : true);
    }) !== undefined) {
      setUniversalProperties(engine.propertyManager);
      (0,external_kolmafia_.cliExecute)("ccs loopgyou");
    }

    while ((0,external_kolmafia_.myAdventures)() > 0) {
      // Note order matters for these strategy updates
      keyStrategy.update(); // Update key plan with current state

      pullStrategy.update(); // Update pull plan with current state

      var next = getNextTask(engine, tasks, _state2);
      if (next === undefined) break;

      if (actions_left <= 0) {
        debug("Next task: ".concat(next[0].name));
        return;
      } else {
        actions_left -= 1;
      }

      if (next[2] !== undefined) _state2 = engine.execute(next[0], next[1], _state2, next[2]);else _state2 = engine.execute(next[0], next[1], _state2);
      if ((0,external_kolmafia_.myPath)() !== "Grey You") break; // Prism broken
    }

    var remaining_tasks = tasks.filter(task => !task.completed(_state2));

    if (!runComplete()) {
      debug("Remaining tasks:", "red");

      var _iterator2 = main_createForOfIteratorHelper(remaining_tasks),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _task = _step2.value;
          if (!_task.completed(_state2)) debug("".concat(_task.name), "red");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      throw "Unable to find available task, but the run is not complete.";
    }
  } finally {
    engine.propertyManager.resetAll();
  }

  var state = new GameState();

  if (step("questL13Final") > 11) {
    (0,external_kolmafia_.print)("Grey you complete!", "purple");
  } else {
    (0,external_kolmafia_.print)("Grey you partially complete! Rerun after ronin ends.", "purple");
  }

  (0,external_kolmafia_.print)("   Adventures used: ".concat((0,external_kolmafia_.turnsPlayed)()), "purple");
  (0,external_kolmafia_.print)("   Adventures remaining: ".concat((0,external_kolmafia_.myAdventures)()), "purple");
  if (set_time_now) (0,external_kolmafia_.print)("   Time: ".concat(convertMilliseconds((0,external_kolmafia_.gametimeToInt)() - (0,property/* get */.U2)(time_property, (0,external_kolmafia_.gametimeToInt)()))), "purple");else (0,external_kolmafia_.print)("   Time: ".concat(convertMilliseconds((0,external_kolmafia_.gametimeToInt)() - (0,property/* get */.U2)(time_property, (0,external_kolmafia_.gametimeToInt)())), " since first run today started"), "purple");
  (0,external_kolmafia_.print)("   Pulls used: ".concat(pullStrategy.pullsUsed()), "purple");

  if ((0,external_kolmafia_.myPath)() === "Grey You") {
    (0,external_kolmafia_.print)("   Monsters remaining: ".concat(Array.from(state.absorb.remainingAbsorbs()).join(", ")), "purple");
    (0,external_kolmafia_.print)("   Reprocess remaining: ".concat(Array.from(state.absorb.remainingReprocess()).join(", ")), "purple");
  }
}

function getNextTask(engine, tasks, state) {
  var available_tasks = tasks.filter(task => engine.available(task, state)); // Teleportitis overrides all

  if ((0,lib/* have */.lf)((0,template_string/* $effect */._G)(main_templateObject || (main_templateObject = main_taggedTemplateLiteral(["Teleportitis"]))))) {
    var tele = teleportitisTask(engine, tasks, state);

    if (tele.completed(state) && removeTeleportitis.ready()) {
      return [removeTeleportitis, Prioritization.fixed(OverridePriority.Always)];
    }

    return [tele, Prioritization.fixed(OverridePriority.Always)];
  } // First, check for any heavily prioritized tasks


  var priority = available_tasks.find(task => {
    var _task$priority;

    return ((_task$priority = task.priority) === null || _task$priority === void 0 ? void 0 : _task$priority.call(task)) === OverridePriority.LastCopyableMonster;
  });

  if (priority !== undefined) {
    return [priority, Prioritization.fixed(OverridePriority.LastCopyableMonster)];
  } // If a wanderer is up try to place it in a useful location


  var wanderer = wandererSources.find(source => source.available() && source.chance() === 1);
  var delay_burning = available_tasks.find(task => engine.hasDelay(task) && Outfit.create(task, state).canEquip(wanderer === null || wanderer === void 0 ? void 0 : wanderer.equip));

  if (wanderer !== undefined && delay_burning !== undefined) {
    return [delay_burning, Prioritization.fixed(OverridePriority.Wanderer), wanderer];
  } // Next, choose tasks by priorty, then by route.


  var task_priorities = available_tasks.map(task => [task, Prioritization.from(task, state)]);
  var highest_priority = Math.max.apply(Math, main_toConsumableArray(task_priorities.map(tp => tp[1].score())));
  var todo = task_priorities.find(tp => tp[1].score() === highest_priority);

  if (todo !== undefined) {
    return todo;
  } // No next task


  return undefined;
}

function runComplete() {
  return step("questL13Final") > 11 || (0,external_kolmafia_.myPath)() !== "Grey You" || args.delaytower && (0,external_kolmafia_.myTurncount)() < 1000 && step("questL13Final") !== -1;
}

function setUniversalProperties(propertyManager) {
  // Properties adapted from garbo
  propertyManager.set({
    logPreferenceChange: true,
    logPreferenceChangeFilter: main_toConsumableArray(new Set([].concat(main_toConsumableArray((0,property/* get */.U2)("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(a => a).join(","),
    battleAction: "custom combat script",
    autoSatisfyWithMall: true,
    autoSatisfyWithNPCs: true,
    autoSatisfyWithCoinmasters: true,
    autoSatisfyWithStash: false,
    dontStopForCounters: true,
    maximizerFoldables: true,
    hpAutoRecovery: "0.0",
    hpAutoRecoveryTarget: "0.0",
    mpAutoRecovery: "0.0",
    mpAutoRecoveryTarget: "0.0",
    afterAdventureScript: "",
    betweenBattleScript: "",
    choiceAdventureScript: "",
    familiarScript: "",
    currentMood: "apathetic",
    autoTuxedo: true,
    autoPinkyRing: true,
    autoGarish: true,
    allowNonMoodBurning: false,
    allowSummonBurning: true,
    libramSkillsSoftcore: "none",
    louvreGoal: 7,
    louvreDesiredGoal: 7
  });
  propertyManager.setChoices({
    1106: 3,
    // Ghost Dog Chow
    1107: 1,
    // tennis ball
    1340: 3,
    // Is There A Doctor In The House?
    1341: 1 // Cure her poison

  });
}

/***/ }),

/***/ 7530:
/***/ ((module) => {

"use strict";
module.exports = require("kolmafia");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 8695);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;