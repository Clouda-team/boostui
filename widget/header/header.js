/* globals NAMESPACE */
/* globals IS_UIX */
/* globals color2Hex */
/* globals ACTION_BACK_CLASS */
/* eslint-disable fecs-camelcase */
/**
 * @file header 组件
 * @author zhangyuanwei
 */

'use strict';
/**
 * 定义一个组件
 */


$.widget('blend.header', {
    options: {
        leftSelector: '.' + NAMESPACE + 'header-left',
        rightSelector: '.' + NAMESPACE + 'header-right',
        titleSelector: '.' + NAMESPACE + 'header-title',
        itemSelector: '.' + NAMESPACE + 'header-item'
    },
    _create: function () {
        this._uix = null;
    },
    _init: function () {
        var me = this;
        if (IS_UIX) {
            if (this._uix !== null) {
                this._uix.destroy();
            }
            require(['blend'], function (blend) {
                me._uix = me._initUIXComponent(blend);
                me._uix.render();
            });
        }
        if(navigator.userAgent.match(/baiduboxapp/i) && navigator.userAgent.match(/light/i) ){
            this.element.remove();
        }
        // this._initUIXComponent();
    },
    _initUIXComponent: function (blend) {
        var $el = this.element;
        var options = this.options;
        var uixTitle;

        var $leftItems = $el.find(options.leftSelector).find(options.itemSelector);
        var $rightItems = $el.find(options.rightSelector).find(options.itemSelector);
        var $titleItems = $el.find(options.titleSelector).find(options.itemSelector);

        uixTitle = blend.create('title', {
            text: $titleItems.text()
            // TODO 支持Image
        });


        uixTitle.setStyle({
            backgroundColor: color2Hex($el.css('background-color')),
            color: color2Hex($el.css('color'))
        });


        $leftItems.each(__genItemIterator(function (obj) {
            uixTitle.addLeftItem(obj);
        }));

        $rightItems.each(__genItemIterator(function (obj) {
            uixTitle.addRightItem(obj);
        }));


        return uixTitle;
    }
});


function __genItemIterator(cb) {
    return function (i, item) {
        var $item = $(item);
        var retObj = {};
        var nodeName = item.nodeName;

        if ($item.hasClass(ACTION_BACK_CLASS)) {
            retObj.action = {
                operator: 'back'
            };
        }
        else if (nodeName && nodeName.toUpperCase() === 'A') {
            retObj.action = {
                url: item.href
            };
        }

        retObj.text = $item.text();

        // TODO more event
        // TODO style
        cb(retObj);
    };
}
