/* globals NAMESPACE */
/* globals IS_UIX */
/**
 * @function dialog
 * @name dialog
 * @author wangzhonghua
 * @file dialog.js
 * @date 2015.02.05
 * @memberof $.fn or $.blend
 * @grammar  $('.test').dialog().show(),$.blend.dialog().show()
 * @desc 页面级dialog
 * @param {Object} options 组件配置（以下参数为配置项）
 * @param {String} options.id (可选, 默认值: 随机数) dialog id
 * @param {Interval} options.top (可选, 默认值: null) dialog 自定义top值
 * @param {String} options.addCSSClass (可选, 默认值: \'\') dialog最外层自定义class
 * @param {String} options.title (可选, 默认值: 标题) dialog 标题
 * @param {String} options.content (可选, 默认值: \'\') dialog 内容
 * @param {String} options.cancelText (可选, 默认值: 取消) dialog 取消按钮的文案
 * @param {String} options.cancelClass (可选, 默认值: \'\') dialog 取消按钮的自定义class
 * @param {String} options.doneText (可选, 默认值: 确认) dialog 确认按钮的文案
 * @param {String} options.doneClass (可选, 默认值: \'\') dialog 确认按钮的自定义class
 * @param {String} options.maskTapClose (可选, 默认值: false) mask被点击后是否关闭dialog
 * @example
 * 	1、$('.dialog').dialog(), $('.dialog')为dialog自定义节点,并不是dialog的容器,切记
 * 	2、var dialog = $.blend.dialog({
 * 						title: 'my title',
 * 						message: 'my message',
 * 					});
 * 		  dialog.show();
 */
'use strict';
$.widget('blend.dialog', {
    /*配置项*/
    options: {
        id: null,
        hasHeader: true,        // 是否有diaload头
        top: undefined,         // 自定义dialog距离顶部距离
        addCSSClass: null,
        title: '标题',          // dialog标题
        content: '',            // dialog内容
        cancelText: '取消',     // 取消按钮自定义文案
        cancelClass: '',
        confirmText: '确认',    // 确认按钮自定义文案
        confirmClass: '',
        maskTapClose: false,    // 点击mask，关闭dialog
        renderType: 0,            // 渲染方式，0 是DOM渲染，1是js渲染,2是自定义
        btnStatus: 3,             // 控制cancel按钮(2)和confirm按钮(1) 的和值
        needAnimate: true         // 弹框出现的时候是否需要动画
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;

        this.$body = $('body');
        this.id = options.id || 'dialog-' + this._randomID();
        this.addCSSClass = options.addCSSClass ? options.addCSSClass : '';
        this.title = options.title;
        this.content = options.content;
        this.cancelText = options.cancelText;
        this.cancelClass = options.cancelClass;
        this.confirmText = options.confirmText;
        this.confirmClass = options.confirmClass;
        this.hasHeader = options.hasHeader;
        this.autoCloseDone = true;
        this.maskTapClose = options.maskTapClose;
        this.top = options.top;
        this.renderType = options.renderType;
        this.useCustom = (this.renderType === 2) ? true : false;    // renderType为2表示使用自定义dom
        this.btnStatus = options.btnStatus;
        this.$el = this.element;
        this.needAnimate = options.needAnimate;
    },
    /**
     * 初始化
     * @private
     */
    _init: function () {
        var me = this;

        //FastClick.attach(this.element[0]);
        /**
         * UIX 环境的初始化
         */
        if (IS_UIX) {
            if (this._uix !== null) {
                // (this._uix.destroy)&&(this._uix.destroy());
            }
             $.dynamicLoad (function() {
                require(['src/blend'], function (blend) {
                    me._uix = me._createUIXDialog(blend);

                });
            });
            return;
        }
        /**
         * 使用提供的默认方式
         */
        if (!this.useCustom) {
            this.$el = this._createHTMLDialog();
            this._bindEvent();
        }

    },
    /**
     * 返回随机的id
     * @private
     * @return {string} 随机生成的id
     */
    _randomID: function () {
        return (((1 + Math.random()) * 0x1000) | 0).toString(16);
    },
    /**
     * 创建UIX的Dialog
     * @param {Object} blend 通过blend2 require的变量
     * @private
     */
    _createUIXDialog: function (blend) {

        if (this.useCustom) {
            // console.error('UIX暂不支持自定义dialog');
            return;
        }

        var $el = this.$el;

        var title = $el.find('.' + NAMESPACE + 'dialog-header').text() || this.title;
        var content = $el.find('.' + NAMESPACE + 'dialog-body').text() || this.content;
        var confirmText = $el.find('.' + NAMESPACE + 'dialog-confirm').text() || this.confirmText;
        var cancelText = $el.find('.' + NAMESPACE + 'dialog-cancel').text() || this.cancelText;

        // create Dialog
        var uixDialog = blend.create('dialog', {
            title: title,
            description: content
        });

        if ((this.btnStatus & 1) > 0) {
            var confirmItem = uixDialog.create({
                text: confirmText
            });
            confirmItem.bind('ontap', (function (that) {
                return function () {
                    that._trigger('confirm');
                };
            })(this));

            uixDialog.append(confirmItem);
        }

        if ((this.btnStatus & 2) > 0) {
            var cancelItem = uixDialog.create({
                text: cancelText
            });
            cancelItem.bind('ontap', (function (that) {
                return function () {
                    that._trigger('cancel');
                };
            })(this));

            uixDialog.append(cancelItem);
        }

        this._uixDialog = uixDialog;
    },
    /**
     * 创建web的dialog
     * @private
     * @return {HTMLElement}
     */
    _createHTMLDialog: function () {

        // 已经创建过dialog
        if (this.jsRendered) {
            return this.$el;
        }

        // 根据传递的参数
        var outerEle;
        var curEle;
        if (this.renderType === 0) {
            curEle = this.$el;
            curEle.find('.' + NAMESPACE + 'dialog-footer a')
            .addClass(NAMESPACE + 'dialog-btn');
            outerEle = curEle;
        }
        else if (this.renderType === 1) {
            outerEle = this._getDialogHtml();
        }

        this.$title = outerEle.find('.' + NAMESPACE + 'dialog-title');
        this.$content = outerEle.find('.' + NAMESPACE + 'dialog-body');
        this.$header = outerEle.find('.' + NAMESPACE + 'dialog-header');

        if (!this.hasHeader) {
            // this.$content.addClass(NAMESPACE + 'dialog-tips');
            this.$header.remove();
        }

        if (!this.btnStatus) {
            outerEle.find('.' + NAMESPACE + 'dialog-footer').remove();
        }
        else {
            if ((this.btnStatus & 1) <= 0) {
                outerEle.find('.' + NAMESPACE + 'dialog-confirm').remove();
            }
            if ((this.btnStatus & 2) <= 0) {
                outerEle.find('.' + NAMESPACE + 'dialog-cancel').remove();
            }
        }

        this.jsRendered = true;
        return outerEle;
    },
    /**
     * 为dialog相关元素添加事件
     * @private
     */
    _bindEvent: function () {
        var self = this;
        $(window).on('orientationchange resize', function () {
            self.setPosition();
        });

        this.$el.on('click', '.' + (this.cancelClass || NAMESPACE + 'dialog-cancel'), function () {
            self._trigger('cancel');
            self.autoCloseDone && self.hide();
        }).on('click', '.' + (this.doneClass || NAMESPACE + 'dialog-confirm'), function () {
            self._trigger('confirm');
            self.autoCloseDone && self.hide();
        }).on('dialog.close', function () {
            self.hide();
        });
    },
    /**
     * 定义事件派发
     * @param {Object} event 事件对象
     * @private
     */
    _trigger: function (event) {
        this.$el.trigger('dialog:' + event);
    },
    /**
     * 生成dialog html片段
     * @private
     * @return {HTMLElement}
     */
    _getDialogHtml: function () {

        var dom = '<div class="' + NAMESPACE + 'dialog-header">' + this.title + '</div>'
                      + '<div class="' + NAMESPACE + 'dialog-body">' + this.content + '</div>'
                      + '<div class="' + NAMESPACE + 'dialog-footer">'
                         +  '<a href="javascript:void(0);" class="' + this.cancelClass + ' ' + NAMESPACE + 'dialog-cancel ' + NAMESPACE + 'dialog-btn">' + this.cancelText + '</a>'
                         +  '<a href="javascript:void(0);" class="' + this.confirmClass + ' ' + NAMESPACE + 'dialog-confirm ' + NAMESPACE + 'dialog-btn">' + this.confirmText + '</a>'
                      + '</div>';
        this.$el.append(dom);
        return this.$el;
    },
    /**
     * 显示dialog
     * @param {string} content 指定show方法要展示的body内容
     * @return {Object}
     */
    show: function (content) {

        if (IS_UIX) {
            this._uixDialog.show();
            return null;
        }

        var self = this;
        if (this.lock) {
            return this.$el;
        }
        if (!this.hasRendered) {
            this.$el.appendTo(this.$body);
            this.hasRendered = true;        // 标记已经渲染
        }
        this.setPosition();
        this.mask(0.5);
        (content) && this.$content.html(content);
        window.setTimeout(function () {
            if (!self.needAnimate) {
              self.$el.addClass(NAMESPACE + 'dialog-no-transition');  // 添加class，将过渡时间设置为0
            }
            self.$el.addClass(NAMESPACE + 'dialog-show');
            self._trigger('show');
            self.lock = false;
        }, 50);
        this.lock = true;
        return this.$el;
    },
    /**
     * 关闭dialog
     * @return {Object}
     */
    hide: function () {
        var self = this;
        if (this.lock) {
            return this.$el;
        }
        window.setTimeout(function () {
            self.unmask();
            self.lock = false;
        }, 50);
        this._trigger('hide');
        this.lock = true;
        return this.$el.removeClass(NAMESPACE + 'dialog-show');
    },
    /**
     * 销毁dialog
     * @return {Object}
     */
    destroy: function () {
        this.unmask();
        if (this.$el) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    },
    /**
     * 显示mask
     * @param {number} opacity 透明度
     */
    mask: function (opacity) {
        var self = this;
        opacity = opacity ? ' style="opacity:' + opacity + ';"' : '';
        var bodyHeight = Math.max(document.body.scrollHeight, document.body.clientHeight, document.documentElement.clientHeight, window.screen.height);
        (this._maskDom = $('<div class="' + NAMESPACE + 'dialog-mask"' + opacity + '></div>')).prependTo(this.$body);
        this._maskDom.css('height', bodyHeight);
        this._maskDom.on('click', function (e) {
            e.preventDefault();
            self.maskTapClose && self.hide();
        }).on('touchmove', function (e) {
            e.preventDefault();
        });
    },
    /**
     * 关闭mask
     */
    unmask: function () {
        this._maskDom.off('touchstart touchmove').remove();
    },
    /**
     * 设置dialog位置
     * @return {Object}
     */
    setPosition: function () {
        var top = typeof this.top === 'undefined' ?
        (window.innerHeight / 2) - (this.$el[0].clientHeight / 2) : parseInt(this.top, 10);
        var left = (window.innerWidth / 2) - (this.$el[0].clientWidth / 2);
        return this.$el.css({
            top: top + 'px',
            left: left + 'px'
        });
    }
});
