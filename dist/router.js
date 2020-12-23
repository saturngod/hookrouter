"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRoutes = exports.getWorkingPath = exports.usePath = exports.getPath = exports.setPath = exports.navigate = exports.ParentContext = exports.getBasepath = exports.setBasepath = void 0;

var _react = _interopRequireDefault(require("react"));

var _isNode = _interopRequireDefault(require("./isNode"));

var _queryParams = require("./queryParams");

var _interceptor = require("./interceptor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var preparedRoutes = {};
var stack = {};
var componentId = 1;
var currentPath = _isNode.default ? '' : location.pathname;
var basePath = '';
var basePathRegEx = null;
var pathUpdaters = [];
/**
 * Will define a base path that will be utilized in your routing and navigation.
 * To be called _before_ any routing or navigation happens.
 * @param {string} inBasepath
 */

var setBasepath = function setBasepath(inBasepath) {
  basePath = inBasepath;
  basePathRegEx = new RegExp('^' + basePath);
};
/**
 * Returns the currently used base path.
 * @returns {string}
 */


exports.setBasepath = setBasepath;

var getBasepath = function getBasepath() {
  return basePath;
};

exports.getBasepath = getBasepath;

var resolvePath = function resolvePath(inPath) {
  if (_isNode.default) {
    var url = require('url');

    return url.resolve(currentPath, inPath);
  }

  var current = new URL(currentPath, location.href);
  var resolved = new URL(inPath, current);
  return resolved.pathname;
};

var ParentContext = _react.default.createContext(null);
/**
 * Pass a route string to this function to receive a regular expression.
 * The transformation will be cached and if you pass the same route a second
 * time, the cached regex will be returned.
 * @param {string} inRoute
 * @returns {Array} [RegExp, propList]
 */


exports.ParentContext = ParentContext;

var prepareRoute = function prepareRoute(inRoute) {
  if (preparedRoutes[inRoute]) {
    return preparedRoutes[inRoute];
  }

  var preparedRoute = [new RegExp("".concat(inRoute.substr(0, 1) === '*' ? '' : '^').concat(inRoute.replace(/:[a-zA-Z]+/g, '([^/]+)').replace(/\*/g, '')).concat(inRoute.substr(-1) === '*' ? '' : '$'))];
  var propList = inRoute.match(/:[a-zA-Z]+/g);
  preparedRoute.push(propList ? propList.map(function (paramName) {
    return paramName.substr(1);
  }) : []);
  preparedRoutes[inRoute] = preparedRoute;
  return preparedRoute;
};
/**
 * Virtually navigates the browser to the given URL and re-processes all routers.
 * @param {string} url The URL to navigate to. Do not mix adding GET params here and using the `getParams` argument.
 * @param {boolean} [replace=false] Should the navigation be done with a history replace to prevent back navigation by the user
 * @param {object} [queryParams] Key/Value pairs to convert into get parameters to be appended to the URL.
 * @param {boolean} [replaceQueryParams=true] Should existing query parameters be carried over, or dropped (replaced)?
 */


var navigate = function navigate(url) {
  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var replaceQueryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  url = (0, _interceptor.interceptRoute)(currentPath, resolvePath(url));

  if (!url || url === currentPath) {
    return;
  }

  currentPath = url;

  if (_isNode.default) {
    setPath(url);
    processStack();
    updatePathHooks();
    return;
  }

  var finalURL = basePathRegEx ? url.match(basePathRegEx) ? url : basePath + url : url;
  window.history["".concat(replace ? 'replace' : 'push', "State")](null, null, finalURL);
  processStack();
  updatePathHooks();

  if (queryParams) {
    (0, _queryParams.setQueryParams)(queryParams, replaceQueryParams);
  }
};

exports.navigate = navigate;
var customPath = '/';
/**
 * Enables you to manually set the path from outside in a nodeJS environment, where window.history is not available.
 * @param {string} inPath
 */

var setPath = function setPath(inPath) {
  var url = require('url');

  customPath = url.resolve(customPath, inPath);
};
/**
 * Returns the current path of the router.
 * @returns {string}
 */


exports.setPath = setPath;

var getPath = function getPath() {
  return customPath;
};
/**
 * This hook returns the currently used URI.
 * Works in a browser context as well as for SSR.
 *
 * _Heads up:_ This will make your component render on every navigation unless you set this hook to passive!
 * @param {boolean} [active=true] Will update the component upon path changes. Set to false to only retrieve the path, once.
 * @param {boolean} [withBasepath=false] Should the base path be left at the beginning of the URI?
 * @returns {string}
 */


exports.getPath = getPath;

var usePath = function usePath() {
  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var withBasepath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _React$useState = _react.default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      setUpdate = _React$useState2[1];

  _react.default.useEffect(function () {
    if (!active) {
      return;
    }

    pathUpdaters.push(setUpdate);
    return function () {
      var index = pathUpdaters.indexOf(setUpdate);

      if (index !== -1) {
        pathUpdaters.splice(index, 1);
      }
    };
  }, [setUpdate]);

  return withBasepath ? currentPath : currentPath.replace(basePathRegEx, '');
};
/**
 * Render all components that use path hooks.
 */


exports.usePath = usePath;

var updatePathHooks = function updatePathHooks() {
  var now = Date.now();
  pathUpdaters.forEach(function (cb) {
    return cb(now);
  });
};
/**
 * Called from within the router. This returns either the current windows url path
 * or a already reduced path, if a parent router has already matched with a finishing
 * wildcard before.
 * @param {string} [parentRouterId]
 * @returns {string}
 */


var getWorkingPath = function getWorkingPath(parentRouterId) {
  if (!parentRouterId) {
    return _isNode.default ? customPath : window.location.pathname.replace(basePathRegEx, '') || '/';
  }

  var stackEntry = stack[parentRouterId];

  if (!stackEntry) {
    throw 'wth';
  }

  return stackEntry.reducedPath !== null ? stackEntry.reducedPath || '/' : window.location.pathname;
};

exports.getWorkingPath = getWorkingPath;

var processStack = function processStack() {
  return Object.values(stack).forEach(process);
};
/**
 * This function takes two objects and compares if they have the same
 * keys and their keys have the same values assigned, so the objects are
 * basically the same.
 * @param {object} objA
 * @param {object} objB
 * @return {boolean}
 */


var objectsEqual = function objectsEqual(objA, objB) {
  var objAKeys = Object.keys(objA);
  var objBKeys = Object.keys(objB);

  var valueIsEqual = function valueIsEqual(key) {
    return objB.hasOwnProperty(key) && objA[key] === objB[key];
  };

  return objAKeys.length === objBKeys.length && objAKeys.every(valueIsEqual);
};

if (!_isNode.default) {
  window.addEventListener('popstate', function (e) {
    var nextPath = (0, _interceptor.interceptRoute)(currentPath, location.pathname);

    if (!nextPath || nextPath === currentPath) {
      e.preventDefault();
      e.stopPropagation();
      history.pushState(null, null, currentPath);
      return;
    }

    currentPath = nextPath;

    if (nextPath !== location.pathname) {
      history.replaceState(null, null, nextPath);
    }

    processStack();
    updatePathHooks();
  });
}

var emptyFunc = function emptyFunc() {
  return null;
};
/**
 * This will calculate the match of a given router.
 * @param {object} stackObj
 * @param {boolean} [directCall] If its not a direct call, the process function might trigger a component render.
 */


var process = function process(stackObj, directCall) {
  var routerId = stackObj.routerId,
      parentRouterId = stackObj.parentRouterId,
      routes = stackObj.routes,
      setUpdate = stackObj.setUpdate,
      resultFunc = stackObj.resultFunc,
      resultProps = stackObj.resultProps,
      previousReducedPath = stackObj.reducedPath;
  var currentPath = getWorkingPath(parentRouterId);
  var route = null;
  var targetFunction = null;
  var targetProps = null;
  var reducedPath = null;
  var anyMatched = false;

  for (var i = 0; i < routes.length; i++) {
    var _routes$i = _slicedToArray(routes[i], 2);

    route = _routes$i[0];
    targetFunction = _routes$i[1];

    var _ref = preparedRoutes[route] ? preparedRoutes[route] : prepareRoute(route),
        _ref2 = _slicedToArray(_ref, 2),
        regex = _ref2[0],
        groupNames = _ref2[1];

    var _result = currentPath.match(regex);

    if (!_result) {
      targetFunction = emptyFunc;
      continue;
    }

    if (groupNames.length) {
      targetProps = {};

      for (var j = 0; j < groupNames.length; j++) {
        targetProps[groupNames[j]] = _result[j + 1];
      }
    }

    reducedPath = currentPath.replace(_result[0], '');
    anyMatched = true;
    break;
  }

  if (!stack[routerId]) {
    return;
  }

  if (!anyMatched) {
    route = null;
    targetFunction = null;
    targetProps = null;
    reducedPath = null;
  }

  var funcsDiffer = resultFunc !== targetFunction;
  var pathDiffer = reducedPath !== previousReducedPath;
  var propsDiffer = true;

  if (!funcsDiffer) {
    if (!resultProps && !targetProps) {
      propsDiffer = false;
    } else {
      propsDiffer = !(resultProps && targetProps && objectsEqual(resultProps, targetProps) === true);
    }

    if (!propsDiffer) {
      if (!pathDiffer) {
        return;
      }
    }
  }

  var result = funcsDiffer || propsDiffer ? targetFunction ? targetFunction(targetProps) : null : stackObj.result;
  Object.assign(stack[routerId], {
    result: result,
    reducedPath: reducedPath,
    matchedRoute: route,
    passContext: route ? route.substr(-1) === '*' : false
  });

  if (!directCall && (funcsDiffer || propsDiffer || route === null)) {
    setUpdate(Date.now());
  }
};
/**
 * If a route returns a function, instead of a react element, we need to wrap this function
 * to eventually wrap a context object around its result.
 * @param RouteContext
 * @param originalResult
 * @returns {function(): *}
 */


var wrapperFunction = function wrapperFunction(RouteContext, originalResult) {
  return function () {
    return _react.default.createElement(RouteContext, null, originalResult.apply(originalResult, arguments));
  };
};
/**
 * Pass an object to this function where the keys are routes and the values
 * are functions to be executed when a route matches. Whatever your function returns
 * will be returned from the hook as well into your react component. Ideally you would
 * return components to be rendered when certain routes match, but you are not limited
 * to that.
 * @param {object} routeObj {"/someRoute": () => <Example />}
 */


var useRoutes = function useRoutes(routeObj) {
  // Each router gets an internal id to look them up again.
  var _React$useState3 = _react.default.useState(componentId),
      _React$useState4 = _slicedToArray(_React$useState3, 1),
      routerId = _React$useState4[0];

  var setUpdate = _react.default.useState(0)[1]; // Needed to create nested routers which use only a subset of the URL.


  var parentRouterId = _react.default.useContext(ParentContext); // If we just took the last ID, increase it for the next hook.


  if (routerId === componentId) {
    componentId += 1;
  } // Removes the router from the stack after component unmount - it won't be processed anymore.


  _react.default.useEffect(function () {
    return function () {
      return delete stack[routerId];
    };
  }, [routerId]);

  var stackObj = stack[routerId];

  if (stackObj && stackObj.originalRouteObj !== routeObj) {
    stackObj = null;
  }

  if (!stackObj) {
    stackObj = {
      routerId: routerId,
      originalRouteObj: routeObj,
      routes: Object.entries(routeObj),
      setUpdate: setUpdate,
      parentRouterId: parentRouterId,
      matchedRoute: null,
      reducedPath: null,
      passContext: false,
      result: null
    };
    stack[routerId] = stackObj;
    process(stackObj, true);
  }

  _react.default.useDebugValue(stackObj.matchedRoute);

  if (!stackObj.matchedRoute) {
    return null;
  }

  var result = stackObj.result;

  if (!stackObj.passContext) {
    return result;
  } else {
    var RouteContext = function RouteContext(_ref3) {
      var children = _ref3.children;
      return _react.default.createElement(ParentContext.Provider, {
        value: routerId
      }, children);
    };

    if (typeof result === 'function') {
      return wrapperFunction(RouteContext, result);
    }

    return _react.default.isValidElement(result) && result.type !== RouteContext ? _react.default.createElement(RouteContext, null, result) : result;
  }
};

exports.useRoutes = useRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXIuanMiXSwibmFtZXMiOlsicHJlcGFyZWRSb3V0ZXMiLCJzdGFjayIsImNvbXBvbmVudElkIiwiY3VycmVudFBhdGgiLCJpc05vZGUiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiYmFzZVBhdGgiLCJiYXNlUGF0aFJlZ0V4IiwicGF0aFVwZGF0ZXJzIiwic2V0QmFzZXBhdGgiLCJpbkJhc2VwYXRoIiwiUmVnRXhwIiwiZ2V0QmFzZXBhdGgiLCJyZXNvbHZlUGF0aCIsImluUGF0aCIsInVybCIsInJlcXVpcmUiLCJyZXNvbHZlIiwiY3VycmVudCIsIlVSTCIsImhyZWYiLCJyZXNvbHZlZCIsIlBhcmVudENvbnRleHQiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJwcmVwYXJlUm91dGUiLCJpblJvdXRlIiwicHJlcGFyZWRSb3V0ZSIsInN1YnN0ciIsInJlcGxhY2UiLCJwcm9wTGlzdCIsIm1hdGNoIiwicHVzaCIsIm1hcCIsInBhcmFtTmFtZSIsIm5hdmlnYXRlIiwicXVlcnlQYXJhbXMiLCJyZXBsYWNlUXVlcnlQYXJhbXMiLCJzZXRQYXRoIiwicHJvY2Vzc1N0YWNrIiwidXBkYXRlUGF0aEhvb2tzIiwiZmluYWxVUkwiLCJ3aW5kb3ciLCJoaXN0b3J5IiwiY3VzdG9tUGF0aCIsImdldFBhdGgiLCJ1c2VQYXRoIiwiYWN0aXZlIiwid2l0aEJhc2VwYXRoIiwidXNlU3RhdGUiLCJzZXRVcGRhdGUiLCJ1c2VFZmZlY3QiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJub3ciLCJEYXRlIiwiZm9yRWFjaCIsImNiIiwiZ2V0V29ya2luZ1BhdGgiLCJwYXJlbnRSb3V0ZXJJZCIsInN0YWNrRW50cnkiLCJyZWR1Y2VkUGF0aCIsIk9iamVjdCIsInZhbHVlcyIsInByb2Nlc3MiLCJvYmplY3RzRXF1YWwiLCJvYmpBIiwib2JqQiIsIm9iakFLZXlzIiwia2V5cyIsIm9iakJLZXlzIiwidmFsdWVJc0VxdWFsIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsZW5ndGgiLCJldmVyeSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwibmV4dFBhdGgiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInB1c2hTdGF0ZSIsInJlcGxhY2VTdGF0ZSIsImVtcHR5RnVuYyIsInN0YWNrT2JqIiwiZGlyZWN0Q2FsbCIsInJvdXRlcklkIiwicm91dGVzIiwicmVzdWx0RnVuYyIsInJlc3VsdFByb3BzIiwicHJldmlvdXNSZWR1Y2VkUGF0aCIsInJvdXRlIiwidGFyZ2V0RnVuY3Rpb24iLCJ0YXJnZXRQcm9wcyIsImFueU1hdGNoZWQiLCJpIiwicmVnZXgiLCJncm91cE5hbWVzIiwicmVzdWx0IiwiaiIsImZ1bmNzRGlmZmVyIiwicGF0aERpZmZlciIsInByb3BzRGlmZmVyIiwiYXNzaWduIiwibWF0Y2hlZFJvdXRlIiwicGFzc0NvbnRleHQiLCJ3cmFwcGVyRnVuY3Rpb24iLCJSb3V0ZUNvbnRleHQiLCJvcmlnaW5hbFJlc3VsdCIsImFwcGx5IiwiYXJndW1lbnRzIiwidXNlUm91dGVzIiwicm91dGVPYmoiLCJ1c2VDb250ZXh0Iiwib3JpZ2luYWxSb3V0ZU9iaiIsImVudHJpZXMiLCJ1c2VEZWJ1Z1ZhbHVlIiwiY2hpbGRyZW4iLCJpc1ZhbGlkRWxlbWVudCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsY0FBYyxHQUFHLEVBQXJCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxJQUFJQyxXQUFXLEdBQUcsQ0FBbEI7QUFDQSxJQUFJQyxXQUFXLEdBQUdDLGtCQUFTLEVBQVQsR0FBY0MsUUFBUSxDQUFDQyxRQUF6QztBQUNBLElBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLElBQXBCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLEVBQXJCO0FBRUE7Ozs7OztBQUtPLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLFVB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QUNxQixJQUFQLEtBQWdCWixZQUFoRCxHQUNKLDZCQUFDLFlBQUQsUUFBZVQsTUFBZixDQURJLEdBRUpBLE1BRkg7QUFHQTtBQUNELENBNURNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpc05vZGUgZnJvbSAnLi9pc05vZGUnO1xuaW1wb3J0IHtzZXRRdWVyeVBhcmFtc30gZnJvbSAnLi9xdWVyeVBhcmFtcyc7XG5pbXBvcnQge2ludGVyY2VwdFJvdXRlfSBmcm9tICcuL2ludGVyY2VwdG9yJztcblxubGV0IHByZXBhcmVkUm91dGVzID0ge307XG5sZXQgc3RhY2sgPSB7fTtcbmxldCBjb21wb25lbnRJZCA9IDE7XG5sZXQgY3VycmVudFBhdGggPSBpc05vZGUgPyAnJyA6IGxvY2F0aW9uLnBhdGhuYW1lO1xubGV0IGJhc2VQYXRoID0gJyc7XG5sZXQgYmFzZVBhdGhSZWdFeCA9IG51bGw7XG5jb25zdCBwYXRoVXBkYXRlcnMgPSBbXTtcblxuLyoqXG4gKiBXaWxsIGRlZmluZSBhIGJhc2UgcGF0aCB0aGF0IHdpbGwgYmUgdXRpbGl6ZWQgaW4geW91ciByb3V0aW5nIGFuZCBuYXZpZ2F0aW9uLlxuICogVG8gYmUgY2FsbGVkIF9iZWZvcmVfIGFueSByb3V0aW5nIG9yIG5hdmlnYXRpb24gaGFwcGVucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpbkJhc2VwYXRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRCYXNlcGF0aCA9IChpbkJhc2VwYXRoKSA9PiB7XG5cdGJhc2VQYXRoID0gaW5CYXNlcGF0aDtcblx0YmFzZVBhdGhSZWdFeCA9IG5ldyBSZWdFeHAoJ14nICsgYmFzZVBhdGgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50bHkgdXNlZCBiYXNlIHBhdGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QmFzZXBhdGggPSAoKSA9PiBiYXNlUGF0aDtcblxuY29uc3QgcmVzb2x2ZVBhdGggPSAoaW5QYXRoKSA9PiB7XG5cdGlmIChpc05vZGUpIHtcblx0XHRjb25zdCB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblx0XHRyZXR1cm4gdXJsLnJlc29sdmUoY3VycmVudFBhdGgsIGluUGF0aCk7XG5cdH1cblxuXHRjb25zdCBjdXJyZW50ID0gbmV3IFVSTChjdXJyZW50UGF0aCwgbG9jYXRpb24uaHJlZik7XG5cdGNvbnN0IHJlc29sdmVkID0gbmV3IFVSTChpblBhdGgsIGN1cnJlbnQpO1xuXHRyZXR1cm4gcmVzb2x2ZWQucGF0aG5hbWU7XG59O1xuXG5leHBvcnQgY29uc3QgUGFyZW50Q29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQobnVsbCk7XG5cbi8qKlxuICogUGFzcyBhIHJvdXRlIHN0cmluZyB0byB0aGlzIGZ1bmN0aW9uIHRvIHJlY2VpdmUgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBUaGUgdHJhbnNmb3JtYXRpb24gd2lsbCBiZSBjYWNoZWQgYW5kIGlmIHlvdSBwYXNzIHRoZSBzYW1lIHJvdXRlIGEgc2Vjb25kXG4gKiB0aW1lLCB0aGUgY2FjaGVkIHJlZ2V4IHdpbGwgYmUgcmV0dXJuZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5Sb3V0ZVxuICogQHJldHVybnMge0FycmF5fSBbUmVnRXhwLCBwcm9wTGlzdF1cbiAqL1xuY29uc3QgcHJlcGFyZVJvdXRlID0gKGluUm91dGUpID0+IHtcblx0aWYgKHByZXBhcmVkUm91dGVzW2luUm91dGVdKSB7XG5cdFx0cmV0dXJuIHByZXBhcmVkUm91dGVzW2luUm91dGVdO1xuXHR9XG5cblx0Y29uc3QgcHJlcGFyZWRSb3V0ZSA9IFtcblx0XHRuZXcgUmVnRXhwKGAke2luUm91dGUuc3Vic3RyKDAsIDEpID09PSAnKicgPyAnJyA6ICdeJ30ke2luUm91dGUucmVwbGFjZSgvOlthLXpBLVpdKy9nLCAnKFteL10rKScpLnJlcGxhY2UoL1xcKi9nLCAnJyl9JHtpblJvdXRlLnN1YnN0cigtMSwpID09PSAnKicgPyAnJyA6ICckJ31gKVxuXHRdO1xuXG5cdGNvbnN0IHByb3BMaXN0ID0gaW5Sb3V0ZS5tYXRjaCgvOlthLXpBLVpdKy9nKTtcblx0cHJlcGFyZWRSb3V0ZS5wdXNoKFxuXHRcdHByb3BMaXN0XG5cdFx0XHQ/IHByb3BMaXN0Lm1hcChwYXJhbU5hbWUgPT4gcGFyYW1OYW1lLnN1YnN0cigxKSlcblx0XHRcdDogW11cblx0KTtcblxuXHRwcmVwYXJlZFJvdXRlc1tpblJvdXRlXSA9IHByZXBhcmVkUm91dGU7XG5cdHJldHVybiBwcmVwYXJlZFJvdXRlO1xufTtcblxuLyoqXG4gKiBWaXJ0dWFsbHkgbmF2aWdhdGVzIHRoZSBicm93c2VyIHRvIHRoZSBnaXZlbiBVUkwgYW5kIHJlLXByb2Nlc3NlcyBhbGwgcm91dGVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byBuYXZpZ2F0ZSB0by4gRG8gbm90IG1peCBhZGRpbmcgR0VUIHBhcmFtcyBoZXJlIGFuZCB1c2luZyB0aGUgYGdldFBhcmFtc2AgYXJndW1lbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXBsYWNlPWZhbHNlXSBTaG91bGQgdGhlIG5hdmlnYXRpb24gYmUgZG9uZSB3aXRoIGEgaGlzdG9yeSByZXBsYWNlIHRvIHByZXZlbnQgYmFjayBuYXZpZ2F0aW9uIGJ5IHRoZSB1c2VyXG4gKiBAcGFyYW0ge29iamVjdH0gW3F1ZXJ5UGFyYW1zXSBLZXkvVmFsdWUgcGFpcnMgdG8gY29udmVydCBpbnRvIGdldCBwYXJhbWV0ZXJzIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBVUkwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXBsYWNlUXVlcnlQYXJhbXM9dHJ1ZV0gU2hvdWxkIGV4aXN0aW5nIHF1ZXJ5IHBhcmFtZXRlcnMgYmUgY2FycmllZCBvdmVyLCBvciBkcm9wcGVkIChyZXBsYWNlZCk/XG4gKi9cbmV4cG9ydCBjb25zdCBuYXZpZ2F0ZSA9ICh1cmwsIHJlcGxhY2UgPSBmYWxzZSwgcXVlcnlQYXJhbXMgPSBudWxsLCByZXBsYWNlUXVlcnlQYXJhbXMgPSB0cnVlKSA9PiB7XG5cdHVybCA9IGludGVyY2VwdFJvdXRlKGN1cnJlbnRQYXRoLCByZXNvbHZlUGF0aCh1cmwpKTtcblxuXHRpZiAoIXVybCB8fCB1cmwgPT09IGN1cnJlbnRQYXRoKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y3VycmVudFBhdGggPSB1cmw7XG5cblx0aWYgKGlzTm9kZSkge1xuXHRcdHNldFBhdGgodXJsKTtcblx0XHRwcm9jZXNzU3RhY2soKTtcblx0XHR1cGRhdGVQYXRoSG9va3MoKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBmaW5hbFVSTCA9IGJhc2VQYXRoUmVnRXhcblx0XHQ/IHVybC5tYXRjaChiYXNlUGF0aFJlZ0V4KVxuXHRcdFx0PyB1cmxcblx0XHRcdDogYmFzZVBhdGggKyB1cmxcblx0XHQ6XG5cdFx0dXJsO1xuXG5cdHdpbmRvdy5oaXN0b3J5W2Ake3JlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCd9U3RhdGVgXShudWxsLCBudWxsLCBmaW5hbFVSTCk7XG5cdHByb2Nlc3NTdGFjaygpO1xuXHR1cGRhdGVQYXRoSG9va3MoKTtcblxuXHRpZiAocXVlcnlQYXJhbXMpIHtcblx0XHRzZXRRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcywgcmVwbGFjZVF1ZXJ5UGFyYW1zKTtcblx0fVxufTtcblxubGV0IGN1c3RvbVBhdGggPSAnLyc7XG4vKipcbiAqIEVuYWJsZXMgeW91IHRvIG1hbnVhbGx5IHNldCB0aGUgcGF0aCBmcm9tIG91dHNpZGUgaW4gYSBub2RlSlMgZW52aXJvbm1lbnQsIHdoZXJlIHdpbmRvdy5oaXN0b3J5IGlzIG5vdCBhdmFpbGFibGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5QYXRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRQYXRoID0gKGluUGF0aCkgPT4ge1xuXHRjb25zdCB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblx0Y3VzdG9tUGF0aCA9IHVybC5yZXNvbHZlKGN1c3RvbVBhdGgsIGluUGF0aCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgcGF0aCBvZiB0aGUgcm91dGVyLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFBhdGggPSAoKSA9PiBjdXN0b21QYXRoO1xuXG4vKipcbiAqIFRoaXMgaG9vayByZXR1cm5zIHRoZSBjdXJyZW50bHkgdXNlZCBVUkkuXG4gKiBXb3JrcyBpbiBhIGJyb3dzZXIgY29udGV4dCBhcyB3ZWxsIGFzIGZvciBTU1IuXG4gKlxuICogX0hlYWRzIHVwOl8gVGhpcyB3aWxsIG1ha2UgeW91ciBjb21wb25lbnQgcmVuZGVyIG9uIGV2ZXJ5IG5hdmlnYXRpb24gdW5sZXNzIHlvdSBzZXQgdGhpcyBob29rIHRvIHBhc3NpdmUhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFthY3RpdmU9dHJ1ZV0gV2lsbCB1cGRhdGUgdGhlIGNvbXBvbmVudCB1cG9uIHBhdGggY2hhbmdlcy4gU2V0IHRvIGZhbHNlIHRvIG9ubHkgcmV0cmlldmUgdGhlIHBhdGgsIG9uY2UuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt3aXRoQmFzZXBhdGg9ZmFsc2VdIFNob3VsZCB0aGUgYmFzZSBwYXRoIGJlIGxlZnQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgVVJJP1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVBhdGggPSAoYWN0aXZlID0gdHJ1ZSwgd2l0aEJhc2VwYXRoID0gZmFsc2UpID0+IHtcblx0Y29uc3QgWywgc2V0VXBkYXRlXSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuXG5cdFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0aWYgKCFhY3RpdmUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRwYXRoVXBkYXRlcnMucHVzaChzZXRVcGRhdGUpO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHBhdGhVcGRhdGVycy5pbmRleE9mKHNldFVwZGF0ZSk7XG5cdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdHBhdGhVcGRhdGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0sIFtzZXRVcGRhdGVdKTtcblxuXHRyZXR1cm4gd2l0aEJhc2VwYXRoID8gY3VycmVudFBhdGggOiBjdXJyZW50UGF0aC5yZXBsYWNlKGJhc2VQYXRoUmVnRXgsICcnKTtcbn07XG5cbi8qKlxuICogUmVuZGVyIGFsbCBjb21wb25lbnRzIHRoYXQgdXNlIHBhdGggaG9va3MuXG4gKi9cbmNvbnN0IHVwZGF0ZVBhdGhIb29rcyA9ICgpID0+IHtcblx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblx0cGF0aFVwZGF0ZXJzLmZvckVhY2goY2IgPT4gY2Iobm93KSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBmcm9tIHdpdGhpbiB0aGUgcm91dGVyLiBUaGlzIHJldHVybnMgZWl0aGVyIHRoZSBjdXJyZW50IHdpbmRvd3MgdXJsIHBhdGhcbiAqIG9yIGEgYWxyZWFkeSByZWR1Y2VkIHBhdGgsIGlmIGEgcGFyZW50IHJvdXRlciBoYXMgYWxyZWFkeSBtYXRjaGVkIHdpdGggYSBmaW5pc2hpbmdcbiAqIHdpbGRjYXJkIGJlZm9yZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyZW50Um91dGVySWRdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0V29ya2luZ1BhdGggPSAocGFyZW50Um91dGVySWQpID0+IHtcblx0aWYgKCFwYXJlbnRSb3V0ZXJJZCkge1xuXHRcdHJldHVybiBpc05vZGUgPyBjdXN0b21QYXRoIDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoYmFzZVBhdGhSZWdFeCwgJycpIHx8ICcvJztcblx0fVxuXHRjb25zdCBzdGFja0VudHJ5ID0gc3RhY2tbcGFyZW50Um91dGVySWRdO1xuXHRpZiAoIXN0YWNrRW50cnkpIHtcblx0XHR0aHJvdyAnd3RoJztcblx0fVxuXG5cdHJldHVybiBzdGFja0VudHJ5LnJlZHVjZWRQYXRoICE9PSBudWxsID8gc3RhY2tFbnRyeS5yZWR1Y2VkUGF0aCB8fCAnLycgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG59O1xuXG5jb25zdCBwcm9jZXNzU3RhY2sgPSAoKSA9PiBPYmplY3QudmFsdWVzKHN0YWNrKS5mb3JFYWNoKHByb2Nlc3MpO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgdHdvIG9iamVjdHMgYW5kIGNvbXBhcmVzIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZVxuICoga2V5cyBhbmQgdGhlaXIga2V5cyBoYXZlIHRoZSBzYW1lIHZhbHVlcyBhc3NpZ25lZCwgc28gdGhlIG9iamVjdHMgYXJlXG4gKiBiYXNpY2FsbHkgdGhlIHNhbWUuXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqQVxuICogQHBhcmFtIHtvYmplY3R9IG9iakJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IG9iamVjdHNFcXVhbCA9IChvYmpBLCBvYmpCKSA9PiB7XG5cdGNvbnN0IG9iakFLZXlzID0gT2JqZWN0LmtleXMob2JqQSk7XG5cdGNvbnN0IG9iakJLZXlzID0gT2JqZWN0LmtleXMob2JqQik7XG5cblx0Y29uc3QgdmFsdWVJc0VxdWFsID0ga2V5ID0+IG9iakIuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBvYmpBW2tleV0gPT09IG9iakJba2V5XTtcblxuXHRyZXR1cm4gKFxuXHRcdG9iakFLZXlzLmxlbmd0aCA9PT0gb2JqQktleXMubGVuZ3RoXG5cdFx0JiYgb2JqQUtleXMuZXZlcnkodmFsdWVJc0VxdWFsKVxuXHQpO1xufTtcblxuaWYgKCFpc05vZGUpIHtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKGUpID0+IHtcblx0XHRjb25zdCBuZXh0UGF0aCA9IGludGVyY2VwdFJvdXRlKGN1cnJlbnRQYXRoLCBsb2NhdGlvbi5wYXRobmFtZSk7XG5cblx0XHRpZiAoIW5leHRQYXRoIHx8IG5leHRQYXRoID09PSBjdXJyZW50UGF0aCkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGN1cnJlbnRQYXRoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjdXJyZW50UGF0aCA9IG5leHRQYXRoO1xuXG5cdFx0aWYgKG5leHRQYXRoICE9PSBsb2NhdGlvbi5wYXRobmFtZSkge1xuXHRcdFx0aGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgbmV4dFBhdGgpO1xuXHRcdH1cblx0XHRwcm9jZXNzU3RhY2soKTtcblx0XHR1cGRhdGVQYXRoSG9va3MoKTtcblx0fSk7XG59XG5cbmNvbnN0IGVtcHR5RnVuYyA9ICgpID0+IG51bGw7XG5cbi8qKlxuICogVGhpcyB3aWxsIGNhbGN1bGF0ZSB0aGUgbWF0Y2ggb2YgYSBnaXZlbiByb3V0ZXIuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhY2tPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RpcmVjdENhbGxdIElmIGl0cyBub3QgYSBkaXJlY3QgY2FsbCwgdGhlIHByb2Nlc3MgZnVuY3Rpb24gbWlnaHQgdHJpZ2dlciBhIGNvbXBvbmVudCByZW5kZXIuXG4gKi9cbmNvbnN0IHByb2Nlc3MgPSAoc3RhY2tPYmosIGRpcmVjdENhbGwpID0+IHtcblx0Y29uc3Qge1xuXHRcdHJvdXRlcklkLFxuXHRcdHBhcmVudFJvdXRlcklkLFxuXHRcdHJvdXRlcyxcblx0XHRzZXRVcGRhdGUsXG5cdFx0cmVzdWx0RnVuYyxcblx0XHRyZXN1bHRQcm9wcyxcblx0XHRyZWR1Y2VkUGF0aDogcHJldmlvdXNSZWR1Y2VkUGF0aFxuXHR9ID0gc3RhY2tPYmo7XG5cblx0Y29uc3QgY3VycmVudFBhdGggPSBnZXRXb3JraW5nUGF0aChwYXJlbnRSb3V0ZXJJZCk7XG5cdGxldCByb3V0ZSA9IG51bGw7XG5cdGxldCB0YXJnZXRGdW5jdGlvbiA9IG51bGw7XG5cdGxldCB0YXJnZXRQcm9wcyA9IG51bGw7XG5cdGxldCByZWR1Y2VkUGF0aCA9IG51bGw7XG5cdGxldCBhbnlNYXRjaGVkID0gZmFsc2U7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRbcm91dGUsIHRhcmdldEZ1bmN0aW9uXSA9IHJvdXRlc1tpXTtcblx0XHRjb25zdCBbcmVnZXgsIGdyb3VwTmFtZXNdID0gcHJlcGFyZWRSb3V0ZXNbcm91dGVdXG5cdFx0XHQ/IHByZXBhcmVkUm91dGVzW3JvdXRlXVxuXHRcdFx0OiBwcmVwYXJlUm91dGUocm91dGUpO1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gY3VycmVudFBhdGgubWF0Y2gocmVnZXgpO1xuXHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHR0YXJnZXRGdW5jdGlvbiA9IGVtcHR5RnVuYztcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmIChncm91cE5hbWVzLmxlbmd0aCkge1xuXHRcdFx0dGFyZ2V0UHJvcHMgPSB7fTtcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgZ3JvdXBOYW1lcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHR0YXJnZXRQcm9wc1tncm91cE5hbWVzW2pdXSA9IHJlc3VsdFtqICsgMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVkdWNlZFBhdGggPSBjdXJyZW50UGF0aC5yZXBsYWNlKHJlc3VsdFswXSwgJycpO1xuXHRcdGFueU1hdGNoZWQgPSB0cnVlO1xuXHRcdGJyZWFrO1xuXHR9XG5cblx0aWYgKCFzdGFja1tyb3V0ZXJJZF0pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoIWFueU1hdGNoZWQpIHtcblx0XHRyb3V0ZSA9IG51bGw7XG5cdFx0dGFyZ2V0RnVuY3Rpb24gPSBudWxsO1xuXHRcdHRhcmdldFByb3BzID0gbnVsbDtcblx0XHRyZWR1Y2VkUGF0aCA9IG51bGw7XG5cdH1cblxuXHRjb25zdCBmdW5jc0RpZmZlciA9IHJlc3VsdEZ1bmMgIT09IHRhcmdldEZ1bmN0aW9uO1xuXHRjb25zdCBwYXRoRGlmZmVyID0gcmVkdWNlZFBhdGggIT09IHByZXZpb3VzUmVkdWNlZFBhdGg7XG5cdGxldCBwcm9wc0RpZmZlciA9IHRydWU7XG5cblx0aWYgKCFmdW5jc0RpZmZlcikge1xuXHRcdGlmICghcmVzdWx0UHJvcHMgJiYgIXRhcmdldFByb3BzKSB7XG5cdFx0XHRwcm9wc0RpZmZlciA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm9wc0RpZmZlciA9ICEocmVzdWx0UHJvcHMgJiYgdGFyZ2V0UHJvcHMgJiYgb2JqZWN0c0VxdWFsKHJlc3VsdFByb3BzLCB0YXJnZXRQcm9wcykgPT09IHRydWUpO1xuXHRcdH1cblxuXHRcdGlmICghcHJvcHNEaWZmZXIpIHtcblx0XHRcdGlmICghcGF0aERpZmZlcikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcmVzdWx0ID0gZnVuY3NEaWZmZXIgfHwgcHJvcHNEaWZmZXJcblx0XHQ/IHRhcmdldEZ1bmN0aW9uXG5cdFx0XHQ/IHRhcmdldEZ1bmN0aW9uKHRhcmdldFByb3BzKVxuXHRcdFx0OiBudWxsXG5cdFx0OiBzdGFja09iai5yZXN1bHQ7XG5cblx0T2JqZWN0LmFzc2lnbihzdGFja1tyb3V0ZXJJZF0sIHtcblx0XHRyZXN1bHQsXG5cdFx0cmVkdWNlZFBhdGgsXG5cdFx0bWF0Y2hlZFJvdXRlOiByb3V0ZSxcblx0XHRwYXNzQ29udGV4dDogcm91dGUgPyByb3V0ZS5zdWJzdHIoLTEpID09PSAnKicgOiBmYWxzZVxuXHR9KTtcblxuXHRpZiAoIWRpcmVjdENhbGwgJiYgKGZ1bmNzRGlmZmVyIHx8IHByb3BzRGlmZmVyIHx8IHJvdXRlID09PSBudWxsKSkge1xuXHRcdHNldFVwZGF0ZShEYXRlLm5vdygpKTtcblx0fVxufTtcblxuLyoqXG4gKiBJZiBhIHJvdXRlIHJldHVybnMgYSBmdW5jdGlvbiwgaW5zdGVhZCBvZiBhIHJlYWN0IGVsZW1lbnQsIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGZ1bmN0aW9uXG4gKiB0byBldmVudHVhbGx5IHdyYXAgYSBjb250ZXh0IG9iamVjdCBhcm91bmQgaXRzIHJlc3VsdC5cbiAqIEBwYXJhbSBSb3V0ZUNvbnRleHRcbiAqIEBwYXJhbSBvcmlnaW5hbFJlc3VsdFxuICogQHJldHVybnMge2Z1bmN0aW9uKCk6ICp9XG4gKi9cbmNvbnN0IHdyYXBwZXJGdW5jdGlvbiA9IChSb3V0ZUNvbnRleHQsIG9yaWdpbmFsUmVzdWx0KSA9PiBmdW5jdGlvbiAoKXtcblx0cmV0dXJuIChcblx0XHQ8Um91dGVDb250ZXh0PntvcmlnaW5hbFJlc3VsdC5hcHBseShvcmlnaW5hbFJlc3VsdCwgYXJndW1lbnRzKX08L1JvdXRlQ29udGV4dD5cblx0KTtcbn07XG5cbi8qKlxuICogUGFzcyBhbiBvYmplY3QgdG8gdGhpcyBmdW5jdGlvbiB3aGVyZSB0aGUga2V5cyBhcmUgcm91dGVzIGFuZCB0aGUgdmFsdWVzXG4gKiBhcmUgZnVuY3Rpb25zIHRvIGJlIGV4ZWN1dGVkIHdoZW4gYSByb3V0ZSBtYXRjaGVzLiBXaGF0ZXZlciB5b3VyIGZ1bmN0aW9uIHJldHVybnNcbiAqIHdpbGwgYmUgcmV0dXJuZWQgZnJvbSB0aGUgaG9vayBhcyB3ZWxsIGludG8geW91ciByZWFjdCBjb21wb25lbnQuIElkZWFsbHkgeW91IHdvdWxkXG4gKiByZXR1cm4gY29tcG9uZW50cyB0byBiZSByZW5kZXJlZCB3aGVuIGNlcnRhaW4gcm91dGVzIG1hdGNoLCBidXQgeW91IGFyZSBub3QgbGltaXRlZFxuICogdG8gdGhhdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSByb3V0ZU9iaiB7XCIvc29tZVJvdXRlXCI6ICgpID0+IDxFeGFtcGxlIC8+fVxuICovXG5leHBvcnQgY29uc3QgdXNlUm91dGVzID0gKHJvdXRlT2JqKSA9PiB7XG5cdC8vIEVhY2ggcm91dGVyIGdldHMgYW4gaW50ZXJuYWwgaWQgdG8gbG9vayB0aGVtIHVwIGFnYWluLlxuXHRjb25zdCBbcm91dGVySWRdID0gUmVhY3QudXNlU3RhdGUoY29tcG9uZW50SWQpO1xuXHRjb25zdCBzZXRVcGRhdGUgPSBSZWFjdC51c2VTdGF0ZSgwKVsxXTtcblx0Ly8gTmVlZGVkIHRvIGNyZWF0ZSBuZXN0ZWQgcm91dGVycyB3aGljaCB1c2Ugb25seSBhIHN1YnNldCBvZiB0aGUgVVJMLlxuXHRjb25zdCBwYXJlbnRSb3V0ZXJJZCA9IFJlYWN0LnVzZUNvbnRleHQoUGFyZW50Q29udGV4dCk7XG5cblx0Ly8gSWYgd2UganVzdCB0b29rIHRoZSBsYXN0IElELCBpbmNyZWFzZSBpdCBmb3IgdGhlIG5leHQgaG9vay5cblx0aWYgKHJvdXRlcklkID09PSBjb21wb25lbnRJZCkge1xuXHRcdGNvbXBvbmVudElkICs9IDE7XG5cdH1cblxuXHQvLyBSZW1vdmVzIHRoZSByb3V0ZXIgZnJvbSB0aGUgc3RhY2sgYWZ0ZXIgY29tcG9uZW50IHVubW91bnQgLSBpdCB3b24ndCBiZSBwcm9jZXNzZWQgYW55bW9yZS5cblx0UmVhY3QudXNlRWZmZWN0KCgpID0+ICgpID0+IGRlbGV0ZSBzdGFja1tyb3V0ZXJJZF0sIFtyb3V0ZXJJZF0pO1xuXG5cdGxldCBzdGFja09iaiA9IHN0YWNrW3JvdXRlcklkXTtcblxuXHRpZiAoc3RhY2tPYmogJiYgc3RhY2tPYmoub3JpZ2luYWxSb3V0ZU9iaiAhPT0gcm91dGVPYmopIHtcblx0XHRzdGFja09iaiA9IG51bGw7XG5cdH1cblxuXHRpZiAoIXN0YWNrT2JqKSB7XG5cdFx0c3RhY2tPYmogPSB7XG5cdFx0XHRyb3V0ZXJJZCxcblx0XHRcdG9yaWdpbmFsUm91dGVPYmo6IHJvdXRlT2JqLFxuXHRcdFx0cm91dGVzOiBPYmplY3QuZW50cmllcyhyb3V0ZU9iaiksXG5cdFx0XHRzZXRVcGRhdGUsXG5cdFx0XHRwYXJlbnRSb3V0ZXJJZCxcblx0XHRcdG1hdGNoZWRSb3V0ZTogbnVsbCxcblx0XHRcdHJlZHVjZWRQYXRoOiBudWxsLFxuXHRcdFx0cGFzc0NvbnRleHQ6IGZhbHNlLFxuXHRcdFx0cmVzdWx0OiBudWxsXG5cdFx0fTtcblxuXHRcdHN0YWNrW3JvdXRlcklkXSA9IHN0YWNrT2JqO1xuXG5cdFx0cHJvY2VzcyhzdGFja09iaiwgdHJ1ZSk7XG5cdH1cblxuXHRSZWFjdC51c2VEZWJ1Z1ZhbHVlKHN0YWNrT2JqLm1hdGNoZWRSb3V0ZSk7XG5cblx0aWYgKCFzdGFja09iai5tYXRjaGVkUm91dGUpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGxldCByZXN1bHQgPSBzdGFja09iai5yZXN1bHQ7XG5cblx0aWYgKCFzdGFja09iai5wYXNzQ29udGV4dCkge1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgUm91dGVDb250ZXh0ID0gKHtjaGlsZHJlbn0pID0+IDxQYXJlbnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtyb3V0ZXJJZH0+e2NoaWxkcmVufTwvUGFyZW50Q29udGV4dC5Qcm92aWRlcj47XG5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIHdyYXBwZXJGdW5jdGlvbihSb3V0ZUNvbnRleHQsIHJlc3VsdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KHJlc3VsdCkgJiYgcmVzdWx0LnR5cGUgIT09IFJvdXRlQ29udGV4dFxuXHRcdFx0PyA8Um91dGVDb250ZXh0PntyZXN1bHR9PC9Sb3V0ZUNvbnRleHQ+XG5cdFx0XHQ6IHJlc3VsdDtcblx0fVxufTtcbiJdfQ==