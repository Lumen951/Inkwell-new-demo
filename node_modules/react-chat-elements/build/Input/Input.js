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
import { useEffect } from 'react';
import './Input.css';
import classNames from 'classnames';
var Input = function (_a) {
    var _b;
    var _c = _a.type, type = _c === void 0 ? 'text' : _c, _d = _a.multiline, multiline = _d === void 0 ? false : _d, _e = _a.minHeight, minHeight = _e === void 0 ? 25 : _e, _f = _a.maxHeight, maxHeight = _f === void 0 ? 200 : _f, _g = _a.autoHeight, autoHeight = _g === void 0 ? true : _g, _h = _a.autofocus, autofocus = _h === void 0 ? false : _h, props = __rest(_a, ["type", "multiline", "minHeight", "maxHeight", "autoHeight", "autofocus"]);
    useEffect(function () {
        var _a, _b;
        if (autofocus === true)
            (_b = (_a = props.referance) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus();
        if (props.clear instanceof Function) {
            props.clear(clear);
        }
    }, []);
    var onChangeEvent = function (e) {
        if (multiline === true) {
            if (autoHeight === true) {
                if (e.target.style.height !== minHeight + 'px') {
                    e.target.style.height = minHeight + 'px';
                }
                var height = void 0;
                if (e.target.scrollHeight <= maxHeight)
                    height = e.target.scrollHeight + 'px';
                else
                    height = maxHeight + 'px';
                if (e.target.style.height !== height) {
                    e.target.style.height = height;
                }
            }
        }
        if (props.maxlength && (e.target.value || '').length > props.maxlength) {
            if (props.onMaxLengthExceed instanceof Function)
                props.onMaxLengthExceed();
            if (props.referance) {
                props.referance.current.value = (e.target.value || '').substring(0, props.maxlength);
            }
            return;
        }
        if (props.onChange instanceof Function)
            props.onChange(e);
    };
    var clear = function () {
        var _a, _b, _c;
        var _event = {
            FAKE_EVENT: true,
            target: (_a = props.referance) === null || _a === void 0 ? void 0 : _a.current,
        };
        if ((_c = (_b = props.referance) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.value) {
            props.referance.current.value = '';
        }
        onChangeEvent(_event);
    };
    return (_jsxs("div", __assign({ className: classNames('rce-container-input', props.className) }, { children: [props.leftButtons && _jsx("div", __assign({ className: 'rce-input-buttons' }, { children: props.leftButtons })), multiline === false ? (_jsx("input", { ref: props.referance, type: type, className: classNames('rce-input'), placeholder: props.placeholder, defaultValue: props.defaultValue, style: props.inputStyle, onChange: onChangeEvent, onCopy: props.onCopy, onCut: props.onCut, onPaste: props.onPaste, onBlur: props.onBlur, onFocus: props.onFocus, onSelect: props.onSelect, onSubmit: props.onSubmit, onReset: props.onReset, onKeyDown: props.onKeyDown, onKeyPress: props.onKeyPress, onKeyUp: props.onKeyUp, value: props.value })) : (_jsx("textarea", __assign({ ref: props.referance, className: classNames('rce-input', 'rce-input-textarea'), placeholder: props.placeholder, defaultValue: props.defaultValue, style: props.inputStyle, onChange: onChangeEvent, onCopy: props.onCopy, onCut: props.onCut, onPaste: props.onPaste, onBlur: props.onBlur, onFocus: props.onFocus, onSelect: props.onSelect, onSubmit: props.onSubmit, onReset: props.onReset, onKeyDown: props.onKeyDown, onKeyPress: props.onKeyPress, onKeyUp: props.onKeyUp }, { children: props.defaultValue ? (_b = props === null || props === void 0 ? void 0 : props.value) !== null && _b !== void 0 ? _b : null : null }))), props.rightButtons && _jsx("div", __assign({ className: 'rce-input-buttons' }, { children: props.rightButtons }))] })));
};
export default Input;
