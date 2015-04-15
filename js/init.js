/**
 * 对于带有特定属性的dom节点,自动初始化
 * @file init.js
 * @author zhangyuanwei
 */
;(function ($) {
    // TODO 判断UA环境,给body增加class
    $(function () {
        $('[data-blend-widget]').each(function (i, elem) {
            var $elem = $(elem);
            var widgetAttr = $elem.data('blend-widget');
            var widgetNames = widgetAttr.split(',');
            var widgetNameLen = widgetNames.length;
            var index;
            var name;
            for (index = 0; index < widgetNameLen; index++) {
                name = widgetNames[index];
                if ($.widget.has(name)) {
                    $elem[name]();
                }
                else {
                    // TODO error report
                    throw new Error('Unknow blend widget \"' + name + '\"');
                    // console.error('Unknow blend widget \"' + name + '\"');
                }
            }
        });
    });
})(Zepto);

