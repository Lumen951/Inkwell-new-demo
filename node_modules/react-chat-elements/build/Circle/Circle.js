import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useCallback } from 'react';
import { Circle } from 'progressbar.js';
var wrapper;
var ProgressCircle = function (_a) {
    var animate = _a.animate, progressOptions = _a.progressOptions, className = _a.className;
    var bar = useMemo(function () {
        wrapper = document.createElement('div');
        return new Circle(wrapper, progressOptions);
    }, []);
    var node = useCallback(function (node) {
        if (node) {
            node.appendChild(wrapper);
        }
    }, []);
    useEffect(function () {
        bar.animate(animate);
    }, [animate, bar]);
    return _jsx("div", { className: className, ref: node });
};
export default ProgressCircle;
