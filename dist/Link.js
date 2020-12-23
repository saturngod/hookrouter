"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A = exports.setLinkProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("./router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Accepts HTML `a`-tag properties, requiring `href` and optionally
 * `onClick`, which are appropriately wrapped to allow other
 * frameworks to be used for creating `hookrouter` navigatable links.
 *
 * If `onClick` is supplied, then the navigation will happen before
 * the supplied `onClick` action!
 *
 * @example
 *
 * &lt;MyFrameworkLink what="ever" {...useLink({ href: '/' })}&gt;
 *   Link text
 * &lt;/MyFrameworkLink&gt;
 *
 * @param {Object} props Requires `href`. `onClick` is optional.
 */
var setLinkProps = function setLinkProps(props) {
  var onClick = function onClick(e) {
    if (!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && props.target !== "_blank") {
      e.preventDefault(); // prevent the link from actually navigating

      (0, _router.navigate)(e.currentTarget.href);
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  var href = props.href.substr(0, 1) === '/' ? (0, _router.getBasepath)() + props.href : props.href;
  return _objectSpread({}, props, {
    href: href,
    onClick: onClick
  });
};
/**
 * Accepts standard HTML `a`-tag properties. `href` and, optionally,
 * `onClick` are used to create links that work with `hookrouter`.
 *
 * @example
 *
 * &lt;A href="/" target="_blank"&gt;
 *   Home
 * &lt;/A&gt;
 *
 * @param {Object} props Requires `href`. `onClick` is optional
 */


exports.setLinkProps = setLinkProps;

var A = function A(props) {
  return _react.default.createElement("a", setLinkProps(props));
};

exports.A = A;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLmpzIl0sIm5hbWVzIjpbInNldExpbmtQcm9wcyIsInByb3BzIiwib25DbGljayIsImUiLCJzaGlmdEtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJtZXRhS2V5IiwidGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiaHJlZiIsInN1YnN0ciIsIkEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCTyxJQUFNQSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDQyxLQUFELEVBQVc7QUFDdEMsTUFBTUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ0MsQ0FBRCxFQUFPO0FBQ3RCLFFBQUksQ0FBQ0EsQ0FBQyxDQUFDQyxRQUFILElBQWUsQ0FBQ0QsQ0FBQyxDQUFDRSxPQUFsQixJQUE2QixDQUFDRixDQUFDLENBQUNHLE1BQWhDLElBQTBDLENBQUNILENBQUMsQ0FBQ0ksT0FBN0MsSUFBd0ROLEtBQUssQ0FBQ08sTUFBTixLQUFpQixRQUE3RSxFQUF1RjtBQUN0RkwsTUFBQUEsQ0FBQyxDQUFDTSxjQUFGLEdBRHNGLENBQ2xFOztBQUNwQiw0QkFBU04sQ0FBQyxDQUFDTyxhQUFGLENBQWdCQyxJQUF6QjtBQUNBOztBQUVELFFBQUlWLEtBQUssQ0FBQ0MsT0FBVixFQUFtQjtBQUNsQkQsTUFBQUEsS0FBSyxDQUFDQyxPQUFOLENBQWNDLENBQWQ7QUFDQTtBQUNELEdBVEQ7O0FBVUEsTUFBTVEsSUFBSSxHQUNUVixLQUFLLENBQUNVLElBQU4sQ0FBV0MsTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixNQUE0QixHQUE1QixHQUNHLDZCQUFnQlgsS0FBSyxDQUFDVSxJQUR6QixHQUVHVixLQUFLLENBQUNVLElBSFY7QUFLQSwyQkFBV1YsS0FBWDtBQUFrQlUsSUFBQUEsSUFBSSxFQUFKQSxJQUFsQjtBQUF3QlQsSUFBQUEsT0FBTyxFQUFQQTtBQUF4QjtBQUNBLENBakJNO0FBbUJQOzs7Ozs7Ozs7Ozs7Ozs7O0FBWU8sSUFBTVcsQ0FBQyxHQUFHLFNBQUpBLENBQUksQ0FBQ1osS0FBRDtBQUFBLFNBQVcsa0NBQU9ELFlBQVksQ0FBQ0MsS0FBRCxDQUFuQixDQUFYO0FBQUEsQ0FBViIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7bmF2aWdhdGUsIGdldEJhc2VwYXRofSBmcm9tIFwiLi9yb3V0ZXJcIjtcblxuLyoqXG4gKiBBY2NlcHRzIEhUTUwgYGFgLXRhZyBwcm9wZXJ0aWVzLCByZXF1aXJpbmcgYGhyZWZgIGFuZCBvcHRpb25hbGx5XG4gKiBgb25DbGlja2AsIHdoaWNoIGFyZSBhcHByb3ByaWF0ZWx5IHdyYXBwZWQgdG8gYWxsb3cgb3RoZXJcbiAqIGZyYW1ld29ya3MgdG8gYmUgdXNlZCBmb3IgY3JlYXRpbmcgYGhvb2tyb3V0ZXJgIG5hdmlnYXRhYmxlIGxpbmtzLlxuICpcbiAqIElmIGBvbkNsaWNrYCBpcyBzdXBwbGllZCwgdGhlbiB0aGUgbmF2aWdhdGlvbiB3aWxsIGhhcHBlbiBiZWZvcmVcbiAqIHRoZSBzdXBwbGllZCBgb25DbGlja2AgYWN0aW9uIVxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogJmx0O015RnJhbWV3b3JrTGluayB3aGF0PVwiZXZlclwiIHsuLi51c2VMaW5rKHsgaHJlZjogJy8nIH0pfSZndDtcbiAqICAgTGluayB0ZXh0XG4gKiAmbHQ7L015RnJhbWV3b3JrTGluayZndDtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgUmVxdWlyZXMgYGhyZWZgLiBgb25DbGlja2AgaXMgb3B0aW9uYWwuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRMaW5rUHJvcHMgPSAocHJvcHMpID0+IHtcblx0Y29uc3Qgb25DbGljayA9IChlKSA9PiB7XG5cdFx0aWYgKCFlLnNoaWZ0S2V5ICYmICFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmICFlLm1ldGFLZXkgJiYgcHJvcHMudGFyZ2V0ICE9PSBcIl9ibGFua1wiKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgdGhlIGxpbmsgZnJvbSBhY3R1YWxseSBuYXZpZ2F0aW5nXG5cdFx0XHRuYXZpZ2F0ZShlLmN1cnJlbnRUYXJnZXQuaHJlZik7XG5cdFx0fVxuXG5cdFx0aWYgKHByb3BzLm9uQ2xpY2spIHtcblx0XHRcdHByb3BzLm9uQ2xpY2soZSk7XG5cdFx0fVxuXHR9O1xuXHRjb25zdCBocmVmID1cblx0XHRwcm9wcy5ocmVmLnN1YnN0cigwLCAxKSA9PT0gJy8nXG5cdFx0XHQ/IGdldEJhc2VwYXRoKCkgKyBwcm9wcy5ocmVmXG5cdFx0XHQ6IHByb3BzLmhyZWY7XG5cblx0cmV0dXJuIHsuLi5wcm9wcywgaHJlZiwgb25DbGlja307XG59O1xuXG4vKipcbiAqIEFjY2VwdHMgc3RhbmRhcmQgSFRNTCBgYWAtdGFnIHByb3BlcnRpZXMuIGBocmVmYCBhbmQsIG9wdGlvbmFsbHksXG4gKiBgb25DbGlja2AgYXJlIHVzZWQgdG8gY3JlYXRlIGxpbmtzIHRoYXQgd29yayB3aXRoIGBob29rcm91dGVyYC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICZsdDtBIGhyZWY9XCIvXCIgdGFyZ2V0PVwiX2JsYW5rXCImZ3Q7XG4gKiAgIEhvbWVcbiAqICZsdDsvQSZndDtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgUmVxdWlyZXMgYGhyZWZgLiBgb25DbGlja2AgaXMgb3B0aW9uYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEEgPSAocHJvcHMpID0+IDxhIHsuLi5zZXRMaW5rUHJvcHMocHJvcHMpfSAvPjtcbiJdfQ==