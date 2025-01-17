import { jsx as _jsx } from "react/jsx-runtime";
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SpotifyMessage from '../SpotifyMessage';
describe('SpotifyMessage component', function () {
    it('should render without issues', function () {
        var component = shallow(_jsx(SpotifyMessage, {}));
        expect(component.length).toBe(1);
        expect(toJson(component)).toMatchSnapshot();
    });
});
