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
import { FaFile, FaCloudDownloadAlt, FaExclamationTriangle } from 'react-icons/fa';
import ProgressCircle from '../Circle/Circle';
import './FileMessage.css';
var FileMessage = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var progressOptions = {
        strokeWidth: 5,
        color: '#333',
        trailColor: '#aaa',
        trailWidth: 5,
        step: function (state, circle) {
            circle.path.setAttribute('trail', state.color);
            circle.path.setAttribute('trailwidth-width', state.width);
            var value = Math.round(circle.value() * 100);
            if (value === 0)
                circle.setText('');
            else
                circle.setText(value);
        },
    };
    var error = ((_a = props === null || props === void 0 ? void 0 : props.data) === null || _a === void 0 ? void 0 : _a.status) && ((_b = props === null || props === void 0 ? void 0 : props.data) === null || _b === void 0 ? void 0 : _b.status.error) === true;
    var onClick = function (e) {
        var _a, _b, _c;
        if (!((_a = props === null || props === void 0 ? void 0 : props.data) === null || _a === void 0 ? void 0 : _a.status))
            return;
        if (!((_b = props === null || props === void 0 ? void 0 : props.data) === null || _b === void 0 ? void 0 : _b.status.download) && props.onDownload instanceof Function)
            props.onDownload(e);
        else if (((_c = props === null || props === void 0 ? void 0 : props.data) === null || _c === void 0 ? void 0 : _c.status.download) && props.onOpen instanceof Function)
            props.onOpen(e);
    };
    return (_jsx("div", __assign({ className: 'rce-mbox-file' }, { children: _jsxs("button", __assign({ onClick: onClick }, { children: [_jsxs("div", __assign({ className: 'rce-mbox-file--icon' }, { children: [_jsx(FaFile, { color: '#aaa' }), _jsx("div", __assign({ className: 'rce-mbox-file--size' }, { children: props === null || props === void 0 ? void 0 : props.data.size }))] })), _jsx("div", __assign({ className: 'rce-mbox-file--text' }, { children: props.text })), _jsxs("div", __assign({ className: 'rce-mbox-file--buttons' }, { children: [error && (_jsx("span", __assign({ className: 'rce-error-button' }, { children: _jsx(FaExclamationTriangle, { color: '#ff3d3d' }) }))), !error && ((_c = props === null || props === void 0 ? void 0 : props.data) === null || _c === void 0 ? void 0 : _c.status) && !((_d = props === null || props === void 0 ? void 0 : props.data) === null || _d === void 0 ? void 0 : _d.status.download) && !((_e = props === null || props === void 0 ? void 0 : props.data) === null || _e === void 0 ? void 0 : _e.status.click) && (_jsx(FaCloudDownloadAlt, { color: '#aaa' })), !error &&
                            ((_f = props === null || props === void 0 ? void 0 : props.data) === null || _f === void 0 ? void 0 : _f.status) &&
                            typeof ((_g = props === null || props === void 0 ? void 0 : props.data) === null || _g === void 0 ? void 0 : _g.status.loading) === 'number' &&
                            ((_h = props === null || props === void 0 ? void 0 : props.data) === null || _h === void 0 ? void 0 : _h.status.loading) !== 0 && (_jsx(ProgressCircle, { animate: (_j = props === null || props === void 0 ? void 0 : props.data) === null || _j === void 0 ? void 0 : _j.status.loading, className: 'rce-mbox-file--loading', progressOptions: progressOptions }))] }))] })) })));
};
export default FileMessage;
