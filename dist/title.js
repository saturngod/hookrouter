"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = exports.useTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _isNode = _interopRequireDefault(require("./isNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentTitle = '';
/**
 * This hook will set the window title, when a component gets mounted.
 * When the component gets unmounted, the previously used title will be restored.
 * @param {string} inString
 */

var useTitle = function useTitle(inString) {
  currentTitle = inString;

  if (_isNode.default) {
    return;
  }

  _react.default.useEffect(function () {
    var previousTitle = document.title;
    document.title = inString;
    return function () {
      document.title = previousTitle;
    };
  });
};
/**
 * Returns the current window title to be used in a SSR context
 * @returns {string}
 */


exports.useTitle = useTitle;

var getTitle = function getTitle() {
  return currentTitle;
};

exports.getTitle = getTitle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aXRsZS5qcyJdLCJuYW1lcyI6WyJjdXJyZW50VGl0bGUiLCJ1c2VUaXRsZSIsImluU3RyaW5nIiwiaXNOb2RlIiwiUmVhY3QiLCJ1c2VFZmZlY3QiLCJwcmV2aW91c1RpdGxlIiwiZG9jdW1lbnQiLCJ0aXRsZSIsImdldFRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxZQUFZLEdBQUcsRUFBbkI7QUFFQTs7Ozs7O0FBS08sSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFjO0FBQ3JDRixFQUFBQSxZQUFZLEdBQUdFLFFBQWY7O0FBRUEsTUFBR0MsZUFBSCxFQUFVO0FBQ1Q7QUFDQTs7QUFFREMsaUJBQU1DLFNBQU4sQ0FBZ0IsWUFBTTtBQUNyQixRQUFNQyxhQUFhLEdBQUdDLFFBQVEsQ0FBQ0MsS0FBL0I7QUFDQUQsSUFBQUEsUUFBUSxDQUFDQyxLQUFULEdBQWlCTixRQUFqQjtBQUNBLFdBQU8sWUFBTTtBQUNaSyxNQUFBQSxRQUFRLENBQUNDLEtBQVQsR0FBaUJGLGFBQWpCO0FBQ0EsS0FGRDtBQUdBLEdBTkQ7QUFPQSxDQWRNO0FBZ0JQOzs7Ozs7OztBQUlPLElBQU1HLFFBQVEsR0FBRyxTQUFYQSxRQUFXO0FBQUEsU0FBTVQsWUFBTjtBQUFBLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpc05vZGUgZnJvbSAnLi9pc05vZGUnO1xuXG5sZXQgY3VycmVudFRpdGxlID0gJyc7XG5cbi8qKlxuICogVGhpcyBob29rIHdpbGwgc2V0IHRoZSB3aW5kb3cgdGl0bGUsIHdoZW4gYSBjb21wb25lbnQgZ2V0cyBtb3VudGVkLlxuICogV2hlbiB0aGUgY29tcG9uZW50IGdldHMgdW5tb3VudGVkLCB0aGUgcHJldmlvdXNseSB1c2VkIHRpdGxlIHdpbGwgYmUgcmVzdG9yZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5TdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVRpdGxlID0gKGluU3RyaW5nKSA9PiB7XG5cdGN1cnJlbnRUaXRsZSA9IGluU3RyaW5nO1xuXG5cdGlmKGlzTm9kZSl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0UmVhY3QudXNlRWZmZWN0KCgpID0+IHtcblx0XHRjb25zdCBwcmV2aW91c1RpdGxlID0gZG9jdW1lbnQudGl0bGU7XG5cdFx0ZG9jdW1lbnQudGl0bGUgPSBpblN0cmluZztcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQudGl0bGUgPSBwcmV2aW91c1RpdGxlO1xuXHRcdH07XG5cdH0pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjdXJyZW50IHdpbmRvdyB0aXRsZSB0byBiZSB1c2VkIGluIGEgU1NSIGNvbnRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaXRsZSA9ICgpID0+IGN1cnJlbnRUaXRsZTtcbiJdfQ==