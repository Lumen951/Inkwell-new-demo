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
import { jsx as _jsx } from "react/jsx-runtime";
import './SpotifyMessage.css';
var SpotifyMessage = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 300 : _b, _c = _a.height, height = _c === void 0 ? 380 : _c, props = __rest(_a, ["width", "height"]);
    var toUrl = function () {
        var formBody = [];
        for (var property in props) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(props[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        return formBody.join('&');
    };
    if (!props.uri)
        return null;
    return (_jsx("div", __assign({ className: 'rce-mbox-spotify' }, { children: _jsx("iframe", { src: 'https://open.spotify.com/embed?' + toUrl(), width: width, height: height, frameBorder: '0', allowTransparency: true }) })));
};
export default SpotifyMessage;
