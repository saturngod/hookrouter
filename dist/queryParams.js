"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQueryParams = exports.getQueryParams = exports.setQueryParams = void 0;

var _react = _interopRequireDefault(require("react"));

var _isNode = _interopRequireDefault(require("./isNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var queryParamListeners = [];
var queryParamObject = {};

var setQueryParams = function setQueryParams(inObj) {
  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(inObj instanceof Object)) {
    throw new Error('Object required');
  }

  if (replace) {
    queryParamObject = inObj;
  } else {
    Object.assign(queryParamObject, inObj);
  }

  var now = Date.now();
  queryParamListeners.forEach(function (cb) {
    return cb(now);
  });

  if (!_isNode.default) {
    var qs = '?' + objectToQueryString(queryParamObject);

    if (qs === location.search) {
      return;
    }

    history.replaceState(null, null, location.pathname + (qs !== '?' ? qs : ''));
  }
};

exports.setQueryParams = setQueryParams;

var getQueryParams = function getQueryParams() {
  return Object.assign({}, queryParamObject);
};
/**
 * This takes an URL query string and converts it into a javascript object.
 * @param {string} inStr
 * @return {object}
 */


exports.getQueryParams = getQueryParams;

var queryStringToObject = function queryStringToObject(inStr) {
  var p = new URLSearchParams(inStr);
  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var param = _step.value;
      result[param[0]] = param[1];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};
/**
 * This takes a javascript object and turns it into a URL query string.
 * @param {object} inObj
 * @return {string}
 */


var objectToQueryString = function objectToQueryString(inObj) {
  var qs = new URLSearchParams();
  Object.entries(inObj).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value !== undefined ? qs.append(key, value) : null;
  });
  return qs.toString();
};

if (!_isNode.default) {
  queryParamObject = queryStringToObject(location.search.substr(1));
}
/**
 * This hook returns the currently set query parameters as object and offers a setter function
 * to set a new query string.
 *
 * All components that are hooked to the query parameters will get updated if they change.
 * Query params can also be updated along with the path, by calling `navigate(url, queryParams)`.
 *
 * @returns {array} [queryParamObject, setQueryParams]
 */


var useQueryParams = function useQueryParams() {
  var setUpdate = _react.default.useState(0)[1];

  _react.default.useEffect(function () {
    queryParamListeners.push(setUpdate);
    return function () {
      var index = queryParamListeners.indexOf(setUpdate);

      if (index === -1) {
        return;
      }

      queryParamListeners.splice(index, 1);
    };
  }, [setUpdate]);

  return [queryParamObject, setQueryParams];
};

exports.useQueryParams = useQueryParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeVBhcmFtcy5qcyJdLCJuYW1lcyI6WyJxdWVyeVBhcmFtTGlzdGVuZXJzIiwicXVlcnlQYXJhbU9iamVjdCIsInNldFF1ZXJ5UGFyYW1zIiwiaW5PYmoiLCJyZXBsYWNlIiwiT2JqZWN0IiwiRXJyb3IiLCJhc3NpZ24iLCJub3ciLCJEYXRlIiwiZm9yRWFjaCIsImNiIiwiaXNOb2RlIiwicXMiLCJvYmplY3RUb1F1ZXJ5U3RyaW5nIiwibG9jYXRpb24iLCJzZWFyY2giLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicGF0aG5hbWUiLCJnZXRRdWVyeVBhcmFtcyIsInF1ZXJ5U3RyaW5nVG9PYmplY3QiLCJpblN0ciIsInAiLCJVUkxTZWFyY2hQYXJhbXMiLCJyZXN1bHQiLCJwYXJhbSIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImFwcGVuZCIsInRvU3RyaW5nIiwic3Vic3RyIiwidXNlUXVlcnlQYXJhbXMiLCJzZXRVcGRhdGUiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxFQUE1QjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLEVBQXZCOztBQUVPLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsS0FBRCxFQUE0QjtBQUFBLE1BQXBCQyxPQUFvQix1RUFBVixLQUFVOztBQUN6RCxNQUFHLEVBQUVELEtBQUssWUFBWUUsTUFBbkIsQ0FBSCxFQUE4QjtBQUM3QixVQUFNLElBQUlDLEtBQUosQ0FBVSxpQkFBVixDQUFOO0FBQ0E7O0FBQ0QsTUFBR0YsT0FBSCxFQUFXO0FBQ1ZILElBQUFBLGdCQUFnQixHQUFHRSxLQUFuQjtBQUNBLEdBRkQsTUFFTztBQUNORSxJQUFBQSxNQUFNLENBQUNFLE1BQVAsQ0FBY04sZ0JB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RCxFQVVHLENBQUNMLFNBQUQsQ0FWSDs7QUFZQSxTQUFPLENBQUNsQyxnQkFBRCxFQUFtQkMsY0FBbkIsQ0FBUDtBQUNBLENBaEJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpc05vZGUgZnJvbSAnLi9pc05vZGUnO1xuXG5jb25zdCBxdWVyeVBhcmFtTGlzdGVuZXJzID0gW107XG5sZXQgcXVlcnlQYXJhbU9iamVjdCA9IHt9O1xuXG5leHBvcnQgY29uc3Qgc2V0UXVlcnlQYXJhbXMgPSAoaW5PYmosIHJlcGxhY2UgPSBmYWxzZSkgPT4ge1xuXHRpZighKGluT2JqIGluc3RhbmNlb2YgT2JqZWN0KSl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdPYmplY3QgcmVxdWlyZWQnKTtcblx0fVxuXHRpZihyZXBsYWNlKXtcblx0XHRxdWVyeVBhcmFtT2JqZWN0ID0gaW5PYmo7XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmFzc2lnbihxdWVyeVBhcmFtT2JqZWN0LCBpbk9iaik7XG5cdH1cblx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblx0cXVlcnlQYXJhbUxpc3RlbmVycy5mb3JFYWNoKGNiID0+IGNiKG5vdykpO1xuXHRpZiAoIWlzTm9kZSkge1xuXHRcdGNvbnN0IHFzID0gJz8nICsgb2JqZWN0VG9RdWVyeVN0cmluZyhxdWVyeVBhcmFtT2JqZWN0KTtcblx0XHRpZihxcyA9PT0gbG9jYXRpb24uc2VhcmNoKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsIGxvY2F0aW9uLnBhdGhuYW1lICsgKHFzICE9PSAnPycgPyBxcyA6ICcnKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRRdWVyeVBhcmFtcyA9ICgpID0+IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5UGFyYW1PYmplY3QpO1xuXG4vKipcbiAqIFRoaXMgdGFrZXMgYW4gVVJMIHF1ZXJ5IHN0cmluZyBhbmQgY29udmVydHMgaXQgaW50byBhIGphdmFzY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGluU3RyXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmNvbnN0IHF1ZXJ5U3RyaW5nVG9PYmplY3QgPSAoaW5TdHIpID0+IHtcblx0Y29uc3QgcCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoaW5TdHIpO1xuXHRsZXQgcmVzdWx0ID0ge307XG5cdGZvciAobGV0IHBhcmFtIG9mIHApIHtcblx0XHRyZXN1bHRbcGFyYW1bMF1dID0gcGFyYW1bMV07XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogVGhpcyB0YWtlcyBhIGphdmFzY3JpcHQgb2JqZWN0IGFuZCB0dXJucyBpdCBpbnRvIGEgVVJMIHF1ZXJ5IHN0cmluZy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBpbk9ialxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBvYmplY3RUb1F1ZXJ5U3RyaW5nID0gKGluT2JqKSA9PiB7XG5cdGNvbnN0IHFzID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXHRPYmplY3QuZW50cmllcyhpbk9iaikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gcXMuYXBwZW5kKGtleSwgdmFsdWUpIDogbnVsbCk7XG5cdHJldHVybiBxcy50b1N0cmluZygpO1xufTtcblxuaWYoIWlzTm9kZSl7XG5cdHF1ZXJ5UGFyYW1PYmplY3QgPSBxdWVyeVN0cmluZ1RvT2JqZWN0KGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkpO1xufVxuXG4vKipcbiAqIFRoaXMgaG9vayByZXR1cm5zIHRoZSBjdXJyZW50bHkgc2V0IHF1ZXJ5IHBhcmFtZXRlcnMgYXMgb2JqZWN0IGFuZCBvZmZlcnMgYSBzZXR0ZXIgZnVuY3Rpb25cbiAqIHRvIHNldCBhIG5ldyBxdWVyeSBzdHJpbmcuXG4gKlxuICogQWxsIGNvbXBvbmVudHMgdGhhdCBhcmUgaG9va2VkIHRvIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIHdpbGwgZ2V0IHVwZGF0ZWQgaWYgdGhleSBjaGFuZ2UuXG4gKiBRdWVyeSBwYXJhbXMgY2FuIGFsc28gYmUgdXBkYXRlZCBhbG9uZyB3aXRoIHRoZSBwYXRoLCBieSBjYWxsaW5nIGBuYXZpZ2F0ZSh1cmwsIHF1ZXJ5UGFyYW1zKWAuXG4gKlxuICogQHJldHVybnMge2FycmF5fSBbcXVlcnlQYXJhbU9iamVjdCwgc2V0UXVlcnlQYXJhbXNdXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VRdWVyeVBhcmFtcyA9ICgpID0+IHtcblx0Y29uc3Qgc2V0VXBkYXRlID0gUmVhY3QudXNlU3RhdGUoMClbMV07XG5cblx0UmVhY3QudXNlRWZmZWN0KCgpID0+IHtcblx0XHRxdWVyeVBhcmFtTGlzdGVuZXJzLnB1c2goc2V0VXBkYXRlKTtcblxuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHF1ZXJ5UGFyYW1MaXN0ZW5lcnMuaW5kZXhPZihzZXRVcGRhdGUpO1xuXHRcdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRxdWVyeVBhcmFtTGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fTtcblx0fSwgW3NldFVwZGF0ZV0pO1xuXG5cdHJldHVybiBbcXVlcnlQYXJhbU9iamVjdCwgc2V0UXVlcnlQYXJhbXNdO1xufTtcbiJdfQ==