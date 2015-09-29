/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * imglist 组件
 * @file imglist.js
 */
'use strict';
$.widget('blend.imglist', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        ratio: ''   // normal/wide/square/small/middle/full
    },
    /**
     * 创建组件调用一次
     * @private
     */
    _create: function () {

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $el = this.element;
        /**
         * 经过继承的 options
         */
        var options = this.options;

        if (options.ratio){
            var ratioClass = NAMESPACE + 'imglist-';
            switch (options.ratio) {
                case 'wide':
                case 'square':
                case 'middle':
                case 'small':
                case 'full':
                    ratioClass += options.ratio;
                    break;
                default :
                    ratioClass += 'normal';
            }
            options.ratio !== 'full' && $el.find('.' + NAMESPACE + 'imglist-wrapper').addClass(NAMESPACE + 'imglist-theme');
            this.$li = $el.find('.' + NAMESPACE + 'imglist-wrapper li');
            this.$li.addClass(ratioClass);
        }
    },
    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {

    }
});
