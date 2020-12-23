"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInterceptor = exports.interceptRoute = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var incrementalId = 1;
var interceptors = [];

var interceptRoute = function interceptRoute(previousRoute, nextRoute) {
  if (!interceptors.length) {
    return nextRoute;
  }

  return interceptors.reduceRight(function (nextRoute, interceptor) {
    return nextRoute === previousRoute ? nextRoute : interceptor.handlerFunction(previousRoute, nextRoute);
  }, nextRoute);
};

exports.interceptRoute = interceptRoute;

var get = function get(componentId) {
  return interceptors.find(function (obj) {
    return obj.componentId === componentId;
  }) || null;
};

var remove = function remove(componentId) {
  var index = interceptors.findIndex(function (obj) {
    return obj.componentId === componentId;
  });

  if (index !== -1) {
    interceptors.splice(index, 1);
  }
};

var useInterceptor = function useInterceptor(handlerFunction) {
  var _React$useState = _react.default.useState(incrementalId++),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      componentId = _React$useState2[0];

  var obj = get(componentId);

  if (!obj) {
    obj = {
      componentId: componentId,
      stop: function stop() {
        return remove(componentId);
      },
      handlerFunction: handlerFunction
    };
    interceptors.unshift(obj);
  }

  _react.default.useEffect(function () {
    return function () {
      return obj.stop();
    };
  }, []);

  return obj.stop;
};

exports.useInterceptor = useInterceptor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJpbmNyZW1lbnRhbElkIiwiaW50ZXJjZXB0b3JzIiwiaW50ZXJjZXB0Um91dGUiLCJwcmV2aW91c1JvdXRlIiwibmV4dFJvdXRlIiwibGVuZ3RoIiwicmVkdWNlUmlnaHQiLCJpbnRlcmNlcHRvciIsImhhbmRsZXJGdW5jdGlvbiIsImdldCIsImNvbXBvbmVudElkIiwiZmluZCIsIm9iaiIsInJlbW92ZSIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwidXNlSW50ZXJjZXB0b3IiLCJSZWFjdCIsInVzZVN0YXRlIiwic3RvcCIsInVuc2hpZnQiLCJ1c2VFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsYUFBYSxHQUFHLENBQXBCO0FBRUEsSUFBTUMsWUFBWSxHQUFHLEVBQXJCOztBQUVPLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsYUFBRCxFQUFnQkMsU0FBaEIsRUFBOEI7QUFDM0QsTUFBSSxDQUFDSCxZQUFZLENBQUNJLE1BQWxCLEVBQTBCO0FBQ3pCLFdBQU9ELFNBQVA7QUFDQTs7QUFFRCxTQUFPSCxZQUFZLENBQUNLLFdBQWIsQ0FDTixVQUFDRixTQUFELEVBQVlHLFdBQVo7QUFBQSxXQUE0QkgsU0FBUyxLQUFLRCxhQUFkLEdBQ3pCQyxTQUR5QixHQUV6QkcsV0FBVyxDQUFDQyxlQUFaLENBQTRCTCxhQUE1QixFQUEyQ0MsU0FBM0MsQ0FGSDtBQUFBLEdBRE0sRUFJTkEsU0FKTSxDQUFQO0FBTUEsQ0FYTTs7OztBQWFQLElBQU1LLEdBQUcsR0FBRyxTQUFOQSxHQUFNLENBQUNDLFdBQUQ7QUFBQSxTQUFpQlQsWUFBWSxDQUFDVSxJQUFiLENBQWtCLFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNGLFdBQUosS0FBb0JBLFdBQXhCO0FBQUEsR0FBckIsS0FBNkQsSUFBOUU7QUFBQSxDQUFaOztBQUNBLElBQU1HLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNILFdBQUQsRUFBaUI7QUFDL0IsTUFBTUksS0FBSyxHQUFHYixZQUFZLENBQUNjLFNBQWIsQ0FBdUIsVUFBQUgsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ0YsV0FBSixLQUFvQkEsV0FBeEI7QUFBQSxHQUExQixDQUFkOztBQUNBLE1BQUlJLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDakJiLElBQUFBLFlBQVksQ0FBQ2UsTUFBYixDQUFvQkYsS0FBcEIsRUFBMkIsQ0FBM0I7QUFDQTtBQUNELENBTEQ7O0FBT08sSUFBTUcsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDVCxlQUFELEVBQXFCO0FBQUEsd0JBQzVCVSxlQUFNQyxRQUFOLENBQWVuQixhQUFhLEVBQTVCLENBRDRCO0FBQUE7QUFBQSxNQUMzQ1UsV0FEMkM7O0FBR2xELE1BQUlFLEdBQUcsR0FBR0gsR0FBRyxDQUFDQyxXQUFELENBQWI7O0FBRUEsTUFBSSxDQUFDRSxHQUFMLEVBQVU7QUFDVEEsSUFBQUEsR0FBRyxHQUFHO0FBQ0xGLE1BQUFBLFdBQVcsRUFBWEEsV0FESztBQUVMVSxNQUFBQSxJQUFJLEVBQUU7QUFBQSxlQUFNUCxNQUFNLENBQUNILFdBQUQsQ0FBWjtBQUFBLE9BRkQ7QUFHTEYsTUFBQUEsZUFBZSxFQUFmQTtBQUhLLEtBQU47QUFNQVAsSUFBQUEsWUFBWSxDQUFDb0IsT0FBYixDQUFxQlQsR0FBckI7QUFDQTs7QUFFRE0saUJBQU1JLFNBQU4sQ0FBZ0I7QUFBQSxXQUFNO0FBQUEsYUFBTVYsR0FBRyxDQUFDUSxJQUFKLEVBQU47QUFBQSxLQUFOO0FBQUEsR0FBaEIsRUFBd0MsRUFBeEM7O0FBRUEsU0FBT1IsR0FBRyxDQUFDUSxJQUFYO0FBQ0EsQ0FsQk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5sZXQgaW5jcmVtZW50YWxJZCA9IDE7XG5cbmNvbnN0IGludGVyY2VwdG9ycyA9IFtdO1xuXG5leHBvcnQgY29uc3QgaW50ZXJjZXB0Um91dGUgPSAocHJldmlvdXNSb3V0ZSwgbmV4dFJvdXRlKSA9PiB7XG5cdGlmICghaW50ZXJjZXB0b3JzLmxlbmd0aCkge1xuXHRcdHJldHVybiBuZXh0Um91dGU7XG5cdH1cblxuXHRyZXR1cm4gaW50ZXJjZXB0b3JzLnJlZHVjZVJpZ2h0KFxuXHRcdChuZXh0Um91dGUsIGludGVyY2VwdG9yKSA9PiBuZXh0Um91dGUgPT09IHByZXZpb3VzUm91dGVcblx0XHRcdD8gbmV4dFJvdXRlXG5cdFx0XHQ6IGludGVyY2VwdG9yLmhhbmRsZXJGdW5jdGlvbihwcmV2aW91c1JvdXRlLCBuZXh0Um91dGUpLFxuXHRcdG5leHRSb3V0ZVxuXHQpO1xufTtcblxuY29uc3QgZ2V0ID0gKGNvbXBvbmVudElkKSA9PiBpbnRlcmNlcHRvcnMuZmluZChvYmogPT4gb2JqLmNvbXBvbmVudElkID09PSBjb21wb25lbnRJZCkgfHwgbnVsbDtcbmNvbnN0IHJlbW92ZSA9IChjb21wb25lbnRJZCkgPT4ge1xuXHRjb25zdCBpbmRleCA9IGludGVyY2VwdG9ycy5maW5kSW5kZXgob2JqID0+IG9iai5jb21wb25lbnRJZCA9PT0gY29tcG9uZW50SWQpO1xuXHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0aW50ZXJjZXB0b3JzLnNwbGljZShpbmRleCwgMSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCB1c2VJbnRlcmNlcHRvciA9IChoYW5kbGVyRnVuY3Rpb24pID0+IHtcblx0Y29uc3QgW2NvbXBvbmVudElkXSA9IFJlYWN0LnVzZVN0YXRlKGluY3JlbWVudGFsSWQrKyk7XG5cblx0bGV0IG9iaiA9IGdldChjb21wb25lbnRJZCk7XG5cblx0aWYgKCFvYmopIHtcblx0XHRvYmogPSB7XG5cdFx0XHRjb21wb25lbnRJZCxcblx0XHRcdHN0b3A6ICgpID0+IHJlbW92ZShjb21wb25lbnRJZCksXG5cdFx0XHRoYW5kbGVyRnVuY3Rpb25cblx0XHR9O1xuXG5cdFx0aW50ZXJjZXB0b3JzLnVuc2hpZnQob2JqKTtcblx0fVxuXG5cdFJlYWN0LnVzZUVmZmVjdCgoKSA9PiAoKSA9PiBvYmouc3RvcCgpLCBbXSk7XG5cblx0cmV0dXJuIG9iai5zdG9wO1xufTtcbiJdfQ==