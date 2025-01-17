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
import './PhotoMessage.css';
import { FaCloudDownloadAlt, FaExclamationTriangle } from 'react-icons/fa';
import ProgressCircle from '../Circle/Circle';
var PhotoMessage = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var progressOptions = {
        strokeWidth: 2.3,
        color: '#efe',
        trailColor: '#aaa',
        trailWidth: 1,
        step: function (state, circle) {
            var _a, _b;
            circle.path.setAttribute('trail', (_a = state === null || state === void 0 ? void 0 : state.state) === null || _a === void 0 ? void 0 : _a.color);
            circle.path.setAttribute('trailwidth-width', (_b = state === null || state === void 0 ? void 0 : state.state) === null || _b === void 0 ? void 0 : _b.width);
            var value = Math.round(circle.value() * 100);
            if (value === 0)
                circle.setText('');
            else
                circle.setText(value);
        },
    };
    var error = ((_a = props === null || props === void 0 ? void 0 : props.data) === null || _a === void 0 ? void 0 : _a.status) && ((_b = props === null || props === void 0 ? void 0 : props.data) === null || _b === void 0 ? void 0 : _b.status.error) === true;
    return (_jsxs("div", __assign({ className: 'rce-mbox-photo' }, { children: [_jsxs("div", __assign({ className: 'rce-mbox-photo--img', style: __assign({}, (((_c = props === null || props === void 0 ? void 0 : props.data) === null || _c === void 0 ? void 0 : _c.width) &&
                    ((_d = props === null || props === void 0 ? void 0 : props.data) === null || _d === void 0 ? void 0 : _d.height) && {
                    width: props.data.width,
                    height: props.data.height,
                })) }, { children: [_jsx("img", { src: (_e = props === null || props === void 0 ? void 0 : props.data) === null || _e === void 0 ? void 0 : _e.uri, alt: (_f = props === null || props === void 0 ? void 0 : props.data) === null || _f === void 0 ? void 0 : _f.alt, onClick: props.onOpen, onLoad: props.onLoad, onError: props.onPhotoError }), error && (_jsx("div", __assign({ className: 'rce-mbox-photo--img__block' }, { children: _jsx("span", __assign({ className: 'rce-mbox-photo--img__block-item rce-mbox-photo--error' }, { children: _jsx(FaExclamationTriangle, {}) })) }))), !error && ((_g = props === null || props === void 0 ? void 0 : props.data) === null || _g === void 0 ? void 0 : _g.status) && !((_j = (_h = props === null || props === void 0 ? void 0 : props.data) === null || _h === void 0 ? void 0 : _h.status) === null || _j === void 0 ? void 0 : _j.download) && (_jsxs("div", __assign({ className: 'rce-mbox-photo--img__block' }, { children: [!((_k = props === null || props === void 0 ? void 0 : props.data) === null || _k === void 0 ? void 0 : _k.status.click) && (_jsx("button", __assign({ onClick: props.onDownload, className: 'rce-mbox-photo--img__block-item rce-mbox-photo--download' }, { children: _jsx(FaCloudDownloadAlt, {}) }))), typeof ((_l = props === null || props === void 0 ? void 0 : props.data) === null || _l === void 0 ? void 0 : _l.status.loading) === 'number' && ((_m = props === null || props === void 0 ? void 0 : props.data) === null || _m === void 0 ? void 0 : _m.status.loading) !== 0 && (_jsx(ProgressCircle, { animate: (_o = props === null || props === void 0 ? void 0 : props.data) === null || _o === void 0 ? void 0 : _o.status.loading, progressOptions: progressOptions, className: 'rce-mbox-photo--img__block-item' }))] })))] })), (props === null || props === void 0 ? void 0 : props.text) && _jsx("div", __assign({ className: 'rce-mbox-text' }, { children: props.text }))] })));
};
export default PhotoMessage;
