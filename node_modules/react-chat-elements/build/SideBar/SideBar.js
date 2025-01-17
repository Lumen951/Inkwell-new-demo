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
import './SideBar.css';
import classNames from 'classnames';
var SideBar = function (_a) {
    var _b, _c, _d;
    var _e = _a.type, type = _e === void 0 ? 'dark' : _e, props = __rest(_a, ["type"]);
    return (_jsxs("div", __assign({ className: classNames('rce-sbar', type, props.data.className) }, { children: [_jsx("div", __assign({ className: 'rce-sbar-item' }, { children: (_b = props.data) === null || _b === void 0 ? void 0 : _b.top })), _jsx("div", __assign({ className: 'rce-sbar-item rce-sbar-item__center' }, { children: (_c = props.data) === null || _c === void 0 ? void 0 : _c.center })), _jsx("div", __assign({ className: 'rce-sbar-item' }, { children: (_d = props.data) === null || _d === void 0 ? void 0 : _d.bottom }))] })));
};
export default SideBar;
