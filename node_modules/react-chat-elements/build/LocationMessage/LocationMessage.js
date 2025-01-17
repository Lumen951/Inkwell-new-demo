var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './LocationMessage.css';
import classNames from 'classnames';
var STATIC_URL = 'https://maps.googleapis.com/maps/api/staticmap?markers=color:MARKER_COLOR|LATITUDE,LONGITUDE&zoom=ZOOM&size=270x200&scale=2&key=KEY';
var MAP_URL = 'https://www.google.com/maps/search/?api=1&query=LATITUDE,LONGITUDE&zoom=ZOOM';
var LocationMessage = function (_a) {
    var _b = _a.markerColor, markerColor = _b === void 0 ? 'red' : _b, _c = _a.target, target = _c === void 0 ? '_blank' : _c, _d = _a.zoom, zoom = _d === void 0 ? '14' : _d, props = __rest(_a, ["markerColor", "target", "zoom"]);
    var buildURL = function (url) {
        return url
            .replace(/LATITUDE/g, props === null || props === void 0 ? void 0 : props.data.latitude)
            .replace(/LONGITUDE/g, props === null || props === void 0 ? void 0 : props.data.longitude)
            .replace('MARKER_COLOR', markerColor)
            .replace('ZOOM', zoom)
            .replace('KEY', props.apiKey);
    };
    var className = function () {
        var _className = classNames('rce-mbox-location', props.className);
        if (props.text) {
            _className = classNames(_className, 'rce-mbox-location-has-text');
        }
        return _className;
    };
    return (_jsxs("div", __assign({ className: 'rce-container-lmsg' }, { children: [_jsx("a", __assign({ onClick: props.onOpen, target: target, href: props.href || props.src || buildURL(props.data.mapURL || MAP_URL), className: className() }, { children: _jsx("img", { onError: props.onError, className: 'rce-mbox-location-img', src: props.src || buildURL(props.data.staticURL || STATIC_URL) }) })), props.text && _jsx("div", __assign({ className: 'rce-mbox-text rce-mbox-location-text' }, { children: props.text }))] })));
};
export default LocationMessage;
