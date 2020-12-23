"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useControlledInterceptor = void 0;

var _react = _interopRequireDefault(require("react"));

var _interceptor = require("./interceptor");

var _router = require("./router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This is a controlled version of the interceptor which cancels any navigation intent
 * and hands control over it to your calling component.
 *
 * `interceptedPath` is initially `null` and will be set to the target path upon navigation.
 * `confirmNavigation` is the callback to be called to stop the interception and navigate to the last path.
 * `resetPath` is a callback that resets `interceptedPath` back to `null`.
 *
 * @returns {Array} [interceptedPath, confirmNavigation, resetPath]
 */
var useControlledInterceptor = function useControlledInterceptor() {
  var _React$useState = _react.default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      interceptedPath = _React$useState2[0],
      setInterceptedPath = _React$useState2[1];

  var interceptorFunction = _react.default.useMemo(function () {
    return function (currentPath, nextPath) {
      setInterceptedPath(nextPath);
      return currentPath;
    };
  }, [setInterceptedPath]);

  var stopInterception = (0, _interceptor.useInterceptor)(interceptorFunction);

  var confirmNavigation = _react.default.useMemo(function () {
    return function () {
      stopInterception();
      (0, _router.navigate)(interceptedPath);
    };
  }, [stopInterception, interceptedPath]);

  var resetPath = _react.default.useMemo(function () {
    return function () {
      return setInterceptedPath(null);
    };
  }, [setInterceptedPath]);

  return [interceptedPath, confirmNavigation, resetPath, stopInterception];
};

exports.useControlledInterceptor = useControlledInterceptor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVkSW50ZXJjZXB0b3IuanMiXSwibmFtZXMiOlsidXNlQ29udHJvbGxlZEludGVyY2VwdG9yIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsImludGVyY2VwdGVkUGF0aCIsInNldEludGVyY2VwdGVkUGF0aCIsImludGVyY2VwdG9yRnVuY3Rpb24iLCJ1c2VNZW1vIiwiY3VycmVudFBhdGgiLCJuZXh0UGF0aCIsInN0b3BJbnRlcmNlcHRpb24iLCJjb25maXJtTmF2aWdhdGlvbiIsInJlc2V0UGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztBQVVPLElBQU1BLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsR0FBTTtBQUFBLHdCQUNDQyxlQUFNQyxRQUFOLENBQWUsSUFBZixDQUREO0FBQUE7QUFBQSxNQUN0Q0MsZUFEc0M7QUFBQSxNQUNyQkMsa0JBRHFCOztBQUc3QyxNQUFNQyxtQkFBbUIsR0FBR0osZUFBTUssT0FBTixDQUMzQjtBQUFBLFdBQU0sVUFBQ0MsV0FBRCxFQUFjQyxRQUFkLEVBQTJCO0FBQ2hDSixNQUFBQSxrQkFBa0IsQ0FBQ0ksUUFBRCxDQUFsQjtBQUNBLGFBQU9ELFdBQVA7QUFDQSxLQUhEO0FBQUEsR0FEMkIsRUFLM0IsQ0FBQ0gsa0JBQUQsQ0FMMkIsQ0FBNUI7O0FBUUEsTUFBTUssZ0JBQWdCLEdBQUcsaUNBQWVKLG1CQUFmLENBQXpCOztBQUVBLE1BQU1LLGlCQUFpQixHQUFHVCxlQUFNSyxPQUFOLENBQ3pCO0FBQUEsV0FBTSxZQUFNO0FBQ1hHLE1BQUFBLGdCQUFnQjtBQUNoQiw0QkFBU04sZUFBVDtBQUNBLEtBSEQ7QUFBQSxHQUR5QixFQUt6QixDQUFDTSxnQkFBRCxFQUFtQk4sZUFBbkIsQ0FMeUIsQ0FBMUI7O0FBUUEsTUFBTVEsU0FBUyxHQUFHVixlQUFNSyxPQUFOLENBQ2pCO0FBQUEsV0FBTTtBQUFBLGFBQU1GLGtCQUFrQixDQUFDLElBQUQsQ0FBeEI7QUFBQSxLQUFOO0FBQUEsR0FEaUIsRUFFakIsQ0FBQ0Esa0JBQUQsQ0FGaUIsQ0FBbEI7O0FBS0EsU0FBTyxDQUFDRCxlQUFELEVBQWtCTyxpQkFBbEIsRUFBcUNDLFNBQXJDLEVBQWdERixnQkFBaEQsQ0FBUDtBQUNBLENBM0JNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlSW50ZXJjZXB0b3J9IGZyb20gXCIuL2ludGVyY2VwdG9yXCI7XG5pbXBvcnQge25hdmlnYXRlfSBmcm9tIFwiLi9yb3V0ZXJcIjtcblxuLyoqXG4gKiBUaGlzIGlzIGEgY29udHJvbGxlZCB2ZXJzaW9uIG9mIHRoZSBpbnRlcmNlcHRvciB3aGljaCBjYW5jZWxzIGFueSBuYXZpZ2F0aW9uIGludGVudFxuICogYW5kIGhhbmRzIGNvbnRyb2wgb3ZlciBpdCB0byB5b3VyIGNhbGxpbmcgY29tcG9uZW50LlxuICpcbiAqIGBpbnRlcmNlcHRlZFBhdGhgIGlzIGluaXRpYWxseSBgbnVsbGAgYW5kIHdpbGwgYmUgc2V0IHRvIHRoZSB0YXJnZXQgcGF0aCB1cG9uIG5hdmlnYXRpb24uXG4gKiBgY29uZmlybU5hdmlnYXRpb25gIGlzIHRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgdG8gc3RvcCB0aGUgaW50ZXJjZXB0aW9uIGFuZCBuYXZpZ2F0ZSB0byB0aGUgbGFzdCBwYXRoLlxuICogYHJlc2V0UGF0aGAgaXMgYSBjYWxsYmFjayB0aGF0IHJlc2V0cyBgaW50ZXJjZXB0ZWRQYXRoYCBiYWNrIHRvIGBudWxsYC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9IFtpbnRlcmNlcHRlZFBhdGgsIGNvbmZpcm1OYXZpZ2F0aW9uLCByZXNldFBhdGhdXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VDb250cm9sbGVkSW50ZXJjZXB0b3IgPSAoKSA9PiB7XG5cdGNvbnN0IFtpbnRlcmNlcHRlZFBhdGgsIHNldEludGVyY2VwdGVkUGF0aF0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcblxuXHRjb25zdCBpbnRlcmNlcHRvckZ1bmN0aW9uID0gUmVhY3QudXNlTWVtbyhcblx0XHQoKSA9PiAoY3VycmVudFBhdGgsIG5leHRQYXRoKSA9PiB7XG5cdFx0XHRzZXRJbnRlcmNlcHRlZFBhdGgobmV4dFBhdGgpO1xuXHRcdFx0cmV0dXJuIGN1cnJlbnRQYXRoO1xuXHRcdH0sXG5cdFx0W3NldEludGVyY2VwdGVkUGF0aF1cblx0KTtcblxuXHRjb25zdCBzdG9wSW50ZXJjZXB0aW9uID0gdXNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3JGdW5jdGlvbik7XG5cblx0Y29uc3QgY29uZmlybU5hdmlnYXRpb24gPSBSZWFjdC51c2VNZW1vKFxuXHRcdCgpID0+ICgpID0+IHtcblx0XHRcdHN0b3BJbnRlcmNlcHRpb24oKTtcblx0XHRcdG5hdmlnYXRlKGludGVyY2VwdGVkUGF0aCk7XG5cdFx0fSxcblx0XHRbc3RvcEludGVyY2VwdGlvbiwgaW50ZXJjZXB0ZWRQYXRoXVxuXHQpO1xuXG5cdGNvbnN0IHJlc2V0UGF0aCA9IFJlYWN0LnVzZU1lbW8oXG5cdFx0KCkgPT4gKCkgPT4gc2V0SW50ZXJjZXB0ZWRQYXRoKG51bGwpLFxuXHRcdFtzZXRJbnRlcmNlcHRlZFBhdGhdXG5cdCk7XG5cblx0cmV0dXJuIFtpbnRlcmNlcHRlZFBhdGgsIGNvbmZpcm1OYXZpZ2F0aW9uLCByZXNldFBhdGgsIHN0b3BJbnRlcmNlcHRpb25dO1xufTtcbiJdfQ==