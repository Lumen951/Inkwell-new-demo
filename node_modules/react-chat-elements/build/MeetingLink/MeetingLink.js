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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './MeetingLink.css';
var MeetingLink = function (props) {
    var _a;
    return (_jsx("div", __assign({ className: 'rce-mtlink' }, { children: _jsxs("div", __assign({ className: 'rce-mtlink-content' }, { children: [_jsx("div", __assign({ className: 'rce-mtlink-item' }, { children: _jsx("div", __assign({ className: 'rce-mtlink-title' }, { children: props.text })) })), _jsx("div", __assign({ className: 'rce-mtlink-btn' }, { children: (_a = props === null || props === void 0 ? void 0 : props.actionButtons) === null || _a === void 0 ? void 0 : _a.map(function (Item) {
                        return (_jsx("div", __assign({ className: 'rce-mtlink-btn-content', onClick: function () { var _a; return Item.onClickButton((_a = props === null || props === void 0 ? void 0 : props.meetingID) !== null && _a !== void 0 ? _a : ''); } }, { children: _jsx(Item.Component, {}) })));
                    }) }))] })) })));
};
export default MeetingLink;
