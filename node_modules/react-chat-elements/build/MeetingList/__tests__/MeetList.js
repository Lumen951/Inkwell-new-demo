import { jsx as _jsx } from "react/jsx-runtime";
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MeetingList from '../MeetingList';
describe('MeetingList component', function () {
    it('should render without issues', function () {
        var component = shallow(_jsx(MeetingList, {}));
        expect(component.length).toBe(1);
        expect(toJson(component)).toMatchSnapshot();
    });
});
