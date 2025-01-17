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
import { useState } from 'react';
import './MeetingMessage.css';
import { FaCalendar, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoMdChatboxes } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { format } from 'timeago.js';
import Avatar from '../Avatar/Avatar';
import Dropdown from '../Dropdown/Dropdown';
import classNames from 'classnames';
var MeetingMessage = function (_a) {
    var date = _a.date, dateString = _a.dateString, title = _a.title, subject = _a.subject, collapseTitle = _a.collapseTitle, moreItems = _a.moreItems, participants = _a.participants, dataSource = _a.dataSource, onClick = _a.onClick, onMeetingTitleClick = _a.onMeetingTitleClick, onMeetingVideoLinkClick = _a.onMeetingVideoLinkClick, onMeetingMoreSelect = _a.onMeetingMoreSelect, props = __rest(_a, ["date", "dateString", "title", "subject", "collapseTitle", "moreItems", "participants", "dataSource", "onClick", "onMeetingTitleClick", "onMeetingVideoLinkClick", "onMeetingMoreSelect"]);
    var _b = useState(false), toogle = _b[0], setToogle = _b[1];
    var PARTICIPANT_LIMIT = props.participantsLimit;
    var dateText = dateString ? dateString : date && format(date);
    var _onMeetingLinkClick = function (item, index, event) {
        if (onMeetingTitleClick instanceof Function)
            onMeetingTitleClick(item, index, event);
    };
    var _onMeetingVideoLinkClick = function (item, index, event) {
        if (onMeetingVideoLinkClick instanceof Function)
            onMeetingVideoLinkClick(item, index, event);
    };
    var toggleClick = function () {
        setToogle(!toogle);
    };
    return (_jsx("div", __assign({ className: 'rce-mbox-mtmg' }, { children: _jsxs("div", __assign({ className: 'rce-mtmg' }, { children: [_jsx("div", __assign({ className: 'rce-mtmg-subject' }, { children: subject || 'Unknown Meeting' })), _jsxs("div", __assign({ className: 'rce-mtmg-body', onClick: onClick }, { children: [_jsxs("div", __assign({ className: 'rce-mtmg-item' }, { children: [_jsx(FaCalendar, {}), _jsxs("div", __assign({ className: 'rce-mtmg-content' }, { children: [_jsx("span", __assign({ className: 'rce-mtmg-title' }, { children: title })), _jsx("span", __assign({ className: 'rce-mtmg-date' }, { children: dateText }))] }))] })), onMeetingMoreSelect && moreItems && moreItems.length > 0 && (_jsx("div", { children: _jsx(Dropdown, { animationType: 'bottom', animationPosition: 'norteast', buttonProps: {
                                    className: 'rce-mtmg-right-icon',
                                    icon: {
                                        component: _jsx(MdMoreHoriz, {}),
                                        size: 24,
                                    },
                                }, items: moreItems, onSelect: onMeetingMoreSelect }) }))] })), _jsx("div", __assign({ className: 'rce-mtmg-body-bottom', onClick: toggleClick }, { children: toogle === true ? (_jsxs("div", __assign({ className: 'rce-mtmg-bottom--tptitle' }, { children: [_jsx(FaCaretDown, {}), _jsx("span", { children: collapseTitle })] }))) : (_jsxs("div", __assign({ className: 'rce-mtmg-body-bottom--bttitle' }, { children: [_jsx(FaCaretRight, {}), _jsxs("span", { children: [participants === null || participants === void 0 ? void 0 : participants.slice(0, PARTICIPANT_LIMIT).map(function (x) { return x.title || 'Unknow'; }).join(', '), participants &&
                                        PARTICIPANT_LIMIT &&
                                        participants.length > PARTICIPANT_LIMIT &&
                                        ", +".concat(participants.length - PARTICIPANT_LIMIT)] })] }))) })), _jsx("div", __assign({ className: classNames('rce-mtmg-toogleContent', { 'rce-mtmg-toogleContent--click': toogle === true }) }, { children: dataSource &&
                        dataSource.map(function (x, i) {
                            return (_jsxs("div", { children: [!x.event && (_jsxs("div", __assign({ className: 'rce-mitem' }, { children: [_jsx("div", __assign({ className: classNames('rce-mitem avatar', { 'rce-mitem no-avatar': !x.avatar }) }, { children: x.avatar ? _jsx(Avatar, { src: x.avatar }) : _jsx(IoMdChatboxes, {}) })), _jsxs("div", __assign({ className: 'rce-mitem-body' }, { children: [_jsxs("div", __assign({ className: 'rce-mitem-body--top' }, { children: [_jsx("div", __assign({ className: 'rce-mitem-body--top-title', onClick: function (e) { return _onMeetingLinkClick(x, i, e); } }, { children: x.title })), _jsx("div", __assign({ className: 'rce-mitem-body--top-time' }, { children: x.dateString ? x.dateString : x.date && x.date && format(x.date) }))] })), _jsx("div", __assign({ className: 'rce-mitem-body--bottom' }, { children: _jsx("div", __assign({ className: 'rce-mitem-body--bottom-title' }, { children: x.message })) }))] }))] }))), x.event && (_jsx("div", __assign({ className: 'rce-mitem-event' }, { children: _jsxs("div", __assign({ className: 'rce-mitem-bottom-body' }, { children: [_jsx("div", __assign({ className: 'rce-mitem-body avatar' }, { children: _jsx(HiOutlineVideoCamera, {}) })), _jsxs("div", __assign({ className: 'rce-mitem-bottom-body-top' }, { children: [x.event.title, _jsx("div", __assign({ className: 'rce-mitem-body--top-time' }, { children: x.dateString ? x.dateString : x.date && format(x.date) })), _jsx("div", __assign({ className: 'rce-mitem-avatar-content' }, { children: _jsxs("div", __assign({ className: 'rce-mitem-avatar' }, { children: [x.event.avatars &&
                                                                        x.event.avatars.slice(0, x.event.avatarsLimit).map(function (x, i) { return _jsx(Avatar, { src: x.src }, i); }), x.event.avatars && x.event.avatarsLimit && x.event.avatars.length > x.event.avatarsLimit && (_jsx("div", __assign({ className: 'rce-mitem-length rce-mitem-tooltip', tooltip: x.event.avatars
                                                                            .slice(x.event.avatarsLimit, x.event.avatars.length)
                                                                            .map(function (avatar) { return avatar.title; })
                                                                            .join(',')
                                                                            .toString() }, { children: _jsx("span", __assign({ className: 'rce-mitem-tooltip-text' }, { children: '+' + (x.event.avatars.length - x.event.avatarsLimit) })) })))] })) })), x.record && (_jsx("div", __assign({ className: 'rce-mtmg-call-record' }, { children: _jsxs("div", __assign({ className: 'rce-mtmg-call-body' }, { children: [_jsxs("div", __assign({ onClick: function (e) { return _onMeetingVideoLinkClick(x, i, e); }, className: 'rce-mtmg-call-avatars' }, { children: [_jsx(Avatar, { className: 'rce-mtmg-call-avatars', src: x.record.avatar }), _jsx("div", __assign({ className: 'rce-mtmg-record-time' }, { children: x.record.time }))] })), _jsxs("div", __assign({ className: 'rce-mtmg-call-body-title' }, { children: [_jsx("span", { children: x.record.title }), _jsx("div", __assign({ className: 'rce-mtmg-call-body-bottom' }, { children: x.record.savedBy }))] }))] })) })))] }))] })) })))] }, i));
                        }) }))] })) })));
};
export default MeetingMessage;
