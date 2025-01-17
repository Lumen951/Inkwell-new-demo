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
import './ReplyMessage.css';
import classNames from 'classnames';
var ReplyMessage = function (_a) {
    var onClick = _a.onClick, props = __rest(_a, ["onClick"]);
    return (_jsxs("div", __assign({ className: classNames('rce-mbox-reply', {
            'rce-mbox-reply-border': !!props.titleColor,
        }), style: __assign({}, (props.titleColor && { borderColor: props.titleColor })), onClick: onClick }, { children: [_jsxs("div", __assign({ className: 'rce-mbox-reply-left' }, { children: [_jsx("div", __assign({ style: __assign({}, (props.titleColor && { color: props.titleColor })), className: 'rce-mbox-reply-owner' }, { children: props.title || 'Unknown' })), _jsx("div", __assign({ className: 'rce-mbox-reply-message' }, { children: props.message || '...' }))] })), props.photoURL && (_jsx("div", __assign({ className: 'rce-mbox-reply-right' }, { children: _jsx("img", { src: props.photoURL, alt: '' }) })))] })));
};
export default ReplyMessage;
