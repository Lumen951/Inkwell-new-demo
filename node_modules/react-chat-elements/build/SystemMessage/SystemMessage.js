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
import { jsx as _jsx } from "react/jsx-runtime";
import './SystemMessage.css';
import classNames from 'classnames';
var SystemMessage = function (props) {
    return (_jsx("div", __assign({ className: classNames('rce-container-smsg', props.className) }, { children: _jsx("div", __assign({ className: 'rce-smsg' }, { children: _jsx("div", __assign({ className: 'rce-smsg-text' }, { children: props.text })) })) })));
};
export default SystemMessage;
