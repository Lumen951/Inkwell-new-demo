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
import './AudioMessage.css';
var AudioMessage = function (props) {
    var controlsList = props.data.controlsList;
    return (_jsxs("div", __assign({ className: 'rce-mbox-audio', style: props.customStyle }, { children: [_jsxs("audio", __assign({}, props.audioProps, { controls: true, controlsList: controlsList ? controlsList : 'nodownload' }, { children: [_jsx("source", { src: props.data.audioURL, type: props.data.audioType || 'audio/mp3' }), "Your browser does not support the audio element."] })), props.text && _jsx("div", __assign({ className: 'rce-mbox-text' }, { children: props.text }))] })));
};
export default AudioMessage;
