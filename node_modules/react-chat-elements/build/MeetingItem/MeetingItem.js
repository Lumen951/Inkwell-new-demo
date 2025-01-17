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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './MeetingItem.css';
import { MdVideoCall, MdLink, MdCall } from 'react-icons/md';
import Avatar from '../Avatar/Avatar';
import { format } from 'timeago.js';
import classNames from 'classnames';
var MeetingItem = function (_a) {
    var _b = _a.subjectLimit, subjectLimit = _b === void 0 ? 60 : _b, _c = _a.onClick, onClick = _c === void 0 ? function () { return void 0; } : _c, _d = _a.avatarFlexible, avatarFlexible = _d === void 0 ? false : _d, _e = _a.date, date = _e === void 0 ? new Date() : _e, _f = _a.lazyLoadingImage, lazyLoadingImage = _f === void 0 ? undefined : _f, _g = _a.avatarLimit, avatarLimit = _g === void 0 ? 5 : _g, _h = _a.avatars, avatars = _h === void 0 ? [] : _h, _j = _a.audioMuted, audioMuted = _j === void 0 ? true : _j, _k = _a.onAvatarError, onAvatarError = _k === void 0 ? function () { return void 0; } : _k, _l = _a.onMeetingClick, onMeetingClick = _l === void 0 ? function () { return void 0; } : _l, _m = _a.onShareClick, onShareClick = _m === void 0 ? function () { return void 0; } : _m, props = __rest(_a, ["subjectLimit", "onClick", "avatarFlexible", "date", "lazyLoadingImage", "avatarLimit", "avatars", "audioMuted", "onAvatarError", "onMeetingClick", "onShareClick"]);
    var statusColorType = props.statusColorType;
    var AVATAR_LIMIT = avatarLimit;
    var dateText = date && (props.dateString || format(date));
    var subject = props.subject && subjectLimit && props.subject.substring(0, subjectLimit) + (props.subject.length > subjectLimit ? '...' : '');
    return (_jsxs("div", __assign({ className: classNames('rce-container-mtitem', props.className), onClick: onClick, onContextMenu: props.onContextMenu }, { children: [_jsx("audio", { autoPlay: true, loop: true, muted: audioMuted, src: props.audioSource }), _jsxs("div", __assign({ className: 'rce-mtitem' }, { children: [_jsxs("div", __assign({ className: 'rce-mtitem-top' }, { children: [_jsx("div", __assign({ className: 'rce-mtitem-subject' }, { children: subject })), _jsx("div", __assign({ className: 'rce-mtitem-share', onClick: onShareClick }, { children: _jsx(MdLink, {}) }))] })), _jsxs("div", __assign({ className: 'rce-mtitem-body' }, { children: [_jsxs("div", __assign({ className: 'rce-mtitem-body--avatars' }, { children: [avatars === null || avatars === void 0 ? void 0 : avatars.slice(0, AVATAR_LIMIT).map(function (x, i) { return (_jsx(Avatar, { src: x.src, alt: x.alt, className: x.statusColorType === 'encircle' ? 'rce-mtitem-avatar-encircle-status' : '', size: 'small', letterItem: x.letterItem, sideElement: x.statusColor ? (_jsx("span", __assign({ className: 'rce-mtitem-status', style: statusColorType === 'encircle'
                                                ? {
                                                    boxShadow: "inset 0 0 0 2px ".concat(x.statusColor, ", inset 0 0 0 5px #FFFFFF"),
                                                }
                                                : {
                                                    backgroundColor: x.statusColor,
                                                } }, { children: x.statusText }))) : (_jsx(_Fragment, {})), onError: onAvatarError, lazyLoadingImage: lazyLoadingImage, type: classNames('circle', { 'flexible': avatarFlexible }) }, i)); }), avatars && AVATAR_LIMIT && avatars.length > AVATAR_LIMIT && (_jsx("div", __assign({ className: 'rce-avatar-container circle small rce-mtitem-letter' }, { children: _jsx("span", { children: '+' + (avatars.length - AVATAR_LIMIT) }) })))] })), _jsxs("div", __assign({ className: 'rce-mtitem-body--functions' }, { children: [props.closable && (_jsx("div", __assign({ className: 'rce-mtitem-closable', onClick: props.onCloseClick }, { children: _jsx(MdCall, {}) }))), _jsx("div", __assign({ className: 'rce-mtitem-button', onClick: onMeetingClick }, { children: _jsx(MdVideoCall, {}) }))] }))] })), _jsx("div", __assign({ className: 'rce-mtitem-footer' }, { children: _jsx("span", __assign({ className: 'rce-mtitem-date' }, { children: dateText })) }))] }))] })));
};
export default MeetingItem;
