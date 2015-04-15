/**
 * @file uix.js
 * @author zhangyuanwei
 */
/*
获取UIX版本信息
 */
var UIX_VERSION = (function () {
    var ua = navigator.userAgent.toLowerCase();
    var v = ua.match(/uix\/(\d+\.\d+\.\d+\.\d+)/);
    return v ? v[1] : undefined;
})();

var IS_UIX = UIX_VERSION !== undefined;
var UIX_ACTION_BACK = 'back';
var ACTION_BACK_CLASS = NAMESPACE + 'action-' + UIX_ACTION_BACK;
// TODO more action

if (IS_UIX) {
    (function () {
        var htmlElem = document.getElementsByTagName('HTML')[0];
        var className = htmlElem.className;
        htmlElem.className = className + ' ' + NAMESPACE + 'boost';
    })();
}

function color2Hex(str) {

    function toHex(n) {
        n = Math.max(Math.min(Math.floor(n), 0xFF), 0) + 0x100;
        return n.toString(16).substring(1);
    }

    function rgb(r, g, b) {
        return '#ff' + toHex(r) + toHex(g) + toHex(b);
    }

    function rgba(r, g, b, a) {
        a = a * 0xFF;
        return '#' + toHex(a) + toHex(r) + toHex(g) + toHex(b);
    }

    color2Hex = function (str) {
        return (new Function('rgb', 'rgba', 'return ' + str)).call(null, rgb, rgba);
    };

    return color2Hex(str);
}
