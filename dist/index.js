'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loading = require('../assets/images/loading.gif');

var _loading2 = _interopRequireDefault(_loading);

var _ = require('../assets/images/404.jpeg');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyImage = function (_React$Component) {
    _inherits(LazyImage, _React$Component);

    function LazyImage(props, context) {
        _classCallCheck(this, LazyImage);

        var _this = _possibleConstructorReturn(this, (LazyImage.__proto__ || Object.getPrototypeOf(LazyImage)).call(this, props, context));

        _this.state = {
            alt: props.alt || 'image not loaded',
            src: props.src || 'forced404',
            onClick: props.onClick || function () {},
            onError: props.onError || function () {},
            className: props.className || "",
            // Next properties are for internal component working
            loadingStatus: "init",
            defaultLoading: props.defaultLoading || _loading2.default,
            defaultNotFound: props.defaultNotFound || _2.default
        };
        _this.state.visibleSrc = _this.state.defaultLoading;
        _this.state.className += " lazy-image";
        _this.syntheticImage = new Image();
        return _this;
    }

    _createClass(LazyImage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('img', { src: this.state.visibleSrc,
                className: this.state.className,
                onClick: this.state.onClick });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var newProps = Object.assign({}, this.props, props);
            this.setState(newProps, this.loadImage);
        }
    }, {
        key: 'loadImage',
        value: function loadImage() {
            var _this2 = this,
                _arguments = arguments;

            if (this.state.src === this.state.visibleSrc) {
                if (this.state.loadingStatus === "loaded") {
                    return;
                }
            }
            this.setState({
                visibleSrc: this.state.defaultLoading,
                loadingStatus: "loading"
            });
            this.syntheticImage.src = this.state.src;
            this.syntheticImage.onload = function (currentRequestSrc) {
                return function () {
                    if (currentRequestSrc === _this2.syntheticImage.src) {
                        _this2.setState({
                            visibleSrc: currentRequestSrc,
                            loadingStatus: "loaded"
                        });
                    }
                };
            }(this.syntheticImage.src);
            this.syntheticImage.onerror = function (currentRequestSrc) {
                return function () {
                    if (currentRequestSrc === _this2.syntheticImage.src) {
                        _this2.setState({
                            visibleSrc: _this2.state.defaultNotFound,
                            loadingStatus: "error"
                        }, function () {
                            _this2.state.onError(_this2, _arguments);
                        });
                    }
                };
            }(this.syntheticImage.src);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadImage();
        }
    }]);

    return LazyImage;
}(_react2.default.Component);

exports.default = LazyImage;
