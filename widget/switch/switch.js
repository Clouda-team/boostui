/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * 单选滑块组件
 *
 * @file switch.js
 * @author haoxin02
 */
$.widget('blend.switch', {

    options: {
        itemSwitch: '.' + NAMESPACE + 'switch',
        classNameActive: 'on'
    },
    /**
     * 创建组件
     * @private
     */
    _create: function () {
        this.$el = this.element;
    },
    /**
     * 初始化组件/
     * @private
     */
    _init: function () {
        FastClick.attach(this.element[0]);
        var options = this.options;

        this.switches = this.element;
        this._initEvent();
    },
    /**
     * 绑定事件
     * @private
     */
    _initEvent: function (){
        var that = this;
        
        this.switches.on('click', function () {
            if ($(this).hasClass(that.options.classNameActive)) {
                $(this).removeClass(that.options.classNameActive);
                $(this).trigger('switch:off');
            }else {
                $(this).addClass(that.options.classNameActive);
                $(this).trigger('switch:on');
            }
        });
    }
});

