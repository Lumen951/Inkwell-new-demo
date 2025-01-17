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
import './Popup.css';
import Button from '../Button/Button';
import classNames from 'classnames';
var Popup = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    var props = __rest(_a, []);
    if (((_b = props.popup) === null || _b === void 0 ? void 0 : _b.show) === true)
        return (_jsx("div", __assign({ className: classNames('rce-popup-wrapper', props.type, props.className) }, { children: _jsxs("div", __assign({ className: 'rce-popup' }, { children: [((_c = props.popup) === null || _c === void 0 ? void 0 : _c.renderHeader) ? (_jsx("div", __assign({ className: 'rce-popup-header' }, { children: (_d = props.popup) === null || _d === void 0 ? void 0 : _d.renderHeader() }))) : (_jsxs("div", __assign({ className: 'rce-popup-header' }, { children: [_jsx("span", { children: (_e = props.popup) === null || _e === void 0 ? void 0 : _e.header }), ((_f = props.popup) === null || _f === void 0 ? void 0 : _f.header) && ((_h = (_g = props.popup) === null || _g === void 0 ? void 0 : _g.headerButtons) === null || _h === void 0 ? void 0 : _h.map(function (x, i) { return _jsx(Button, __assign({}, x), i); }))] }))), _jsx("div", __assign({ className: 'rce-popup-content', style: { color: (_j = props.popup) === null || _j === void 0 ? void 0 : _j.color } }, { children: ((_k = props.popup) === null || _k === void 0 ? void 0 : _k.renderContent) ? (_l = props.popup) === null || _l === void 0 ? void 0 : _l.renderContent() : (_m = props.popup) === null || _m === void 0 ? void 0 : _m.text })), _jsx("div", __assign({ className: 'rce-popup-footer' }, { children: ((_o = props.popup) === null || _o === void 0 ? void 0 : _o.renderFooter)
                            ? (_p = props.popup) === null || _p === void 0 ? void 0 : _p.renderFooter()
                            : (_r = (_q = props.popup) === null || _q === void 0 ? void 0 : _q.footerButtons) === null || _r === void 0 ? void 0 : _r.map(function (x, i) { return _jsx(Button, __assign({}, x), i); }) }))] })) })));
    return null;
};
export default Popup;
