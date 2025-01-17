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
import './MeetingList.css';
import MeetingItem from '../MeetingItem/MeetingItem';
import classNames from 'classnames';
var MeetingList = function (props) {
    var _a;
    var onClick = function (item, index, event) {
        if (props.onClick instanceof Function)
            props.onClick(item, index, event);
    };
    var onContextMenu = function (item, index, event) {
        event.preventDefault();
        if (props.onContextMenu instanceof Function)
            props.onContextMenu(item, index, event);
    };
    var onAvatarError = function (item, index, event) {
        if (props.onAvatarError instanceof Function)
            props.onAvatarError(item, index, event);
    };
    var onMeetingClick = function (item, index, event) {
        if (props.onMeetingClick instanceof Function)
            props.onMeetingClick(item, index, event);
    };
    var onShareClick = function (item, index, event) {
        if (props.onShareClick instanceof Function)
            props.onShareClick(item, index, event);
    };
    var onCloseClick = function (item, index, event) {
        if (props.onCloseClick instanceof Function)
            props.onCloseClick(item, index, event);
    };
    return (_jsx("div", __assign({ ref: props.cmpRef, className: classNames('rce-container-mtlist', props.className) }, { children: (_a = props.dataSource) === null || _a === void 0 ? void 0 : _a.map(function (x, i) { return (_jsx(MeetingItem, __assign({ lazyLoadingImage: props.lazyLoadingImage }, x, { onAvatarError: function (e) { return onAvatarError(x, i, e); }, onContextMenu: function (e) { return onContextMenu(x, i, e); }, onClick: function (e) { return onClick(x, i, e); }, onMeetingClick: function (e) { return onMeetingClick(x, i, e); }, onShareClick: function (e) { return onShareClick(x, i, e); }, onCloseClick: function (e) { return onCloseClick(x, i, e); } }), i)); }) })));
};
export default MeetingList;
