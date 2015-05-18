/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file nav 组件
 * @author wanghongliang02
 */

$.widget('blend.nav', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        column: 3,
        animate: true,
        time: 500,
        expand: '更多',
        pack: '收起',
        itemClass: NAMESPACE + 'nav-item',
        row: false
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        var nav = this;
        var $el = nav.element;
        nav.$items = $el.find('.' + nav.options.itemClass);

        nav.expandClass = NAMESPACE + 'nav-expand';
        nav.animateClass = NAMESPACE + 'nav-animation';
        nav.expandedClass = NAMESPACE + 'nav-expanded';
        nav.columnClassPre = NAMESPACE + 'nav-column-';
        nav.hideClass = NAMESPACE + 'nav-item-hide';
        nav.noborderClass = NAMESPACE + 'nav-item-no-border';
        nav.columnRange = [3, 4, 5];
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var nav = this;
        if (nav.options.animate) {
            nav.element.addClass(nav.animateClass);
        }
        else {
            nav.element.removeClass(nav.animateClass);
        }
        nav._setColumn();
        nav._setRow();
        if (!nav.inited) {
            nav._initEvent();
            nav.inited = true;
        }
    },
    /**
     *
     * @private
     */
    _initEvent: function () {
        var nav = this;
        nav.element.on('click.nav', '.' + nav.expandClass, function (e) {
            var $this = $(this);
            if ($this.hasClass(nav.expandedClass)) {
                var height = nav.$items.eq(0).height();
                nav.element.css('height', 15 + height * nav.options.row);
                $this.removeClass(nav.expandedClass);
                var max = nav.options.row * nav.options.column;
                nav.$items.each(function (i) {
                    var $navItem = $(this);
                    if (i >= max - 1) {
                        if (nav.options.animate) {
                            setTimeout(function () {
                                $navItem.addClass(nav.hideClass);
                            }, nav.options.time);
                        }
                        else {
                            $navItem.addClass(nav.hideClass);
                        }
                    }
                    if (i >= max - nav.options.column) {
                        if (nav.options.animate) {
                            setTimeout(function () {
                                $navItem.addClass(nav.noborderClass);
                            }, nav.options.time);
                        }
                        else {
                            $navItem.addClass(nav.noborderClass);
                        }
                    } else {
                        if (nav.options.animate) {
                            setTimeout(function () {
                                $navItem.removeClass(nav.noborderClass);
                            }, nav.options.time);
                        }
                        else {
                            $navItem.removeClass(nav.noborderClass);
                        }
                    }
                });
                if (nav.options.animate) {
                    setTimeout(function () {
                        $this.html(nav.options.expand);
                    }, nav.options.time);
                }
                else {
                    $this.html(nav.options.expand);
                }
            }
            else {
                var len = nav.$items.length;
                var row = Math.ceil(len / nav.options.column) + (len % nav.options.column ? 0 : 1);
                height = nav.$items.eq(0).height() * row + 15;
                nav.element.css('height', height);
                $this.addClass(nav.expandedClass);
                nav.$items.removeClass(nav.hideClass);
                $this.html(nav.options.pack);
                var offset = len % nav.options.column || nav.options.column;
                var max = len - offset;
                nav.$items.each(function (i) {
                    var $this = $(this);
                    if (i >= max) {
                        $this.addClass(nav.noborderClass);
                    } else {
                        $this.removeClass(nav.noborderClass);
                    }
                });
            }
            if (nav.options.expandHandle && $.isFunction(nav.options.expandHandle)) {
                nav.options.expandHandle(e);
            }

        });
    },
    /**
     * _setColumn 自定义的成员函数，
     * 所有以下划线开头的函数不可在外部调用
     */
    _setColumn: function () {
        var nav = this;
        var $el = nav.element;
        /**
         * 处理column范围
         */
        if (nav.options.column && $.inArray(nav.options.column, nav.columnRange) === -1) {
            nav.options.column = 3;
        }
        var columnClass = [];
        for (var i = 0; i < nav.columnRange.length; i++) {
            columnClass.push(nav.columnClassPre + nav.columnRange[i]);
        }
        $el.removeClass(columnClass.join(' ')).addClass(nav.columnClassPre + nav.options.column);
    },
    /**
     * _setRow 自定义的成员函数，
     * @private
     */
    _setRow: function () {
        var nav = this;
        var option = nav.options;
        if (option.row === false) {
            nav._removeExpand();
            return;
        }
        option.row = parseInt(option.row, 10);
        if (option.row < 1) {
            option.row = false;
            nav._removeExpand();
            return;
        }

        var length = nav.$items.length;
        var max = option.column * option.row;
        if (max >= length) {
            nav._removeExpand();
            return;
        }
        nav._addExpand(max);
    },
    /**
     * remove expand
     * @private
     */
    _removeExpand: function () {
        var nav = this;
        var $el = nav.element;
        var len = nav.$items.length;
        var row = Math.ceil(len / nav.options.column);
        var height = nav.$items.eq(0).height() * row + 15;
        $el.css('height', height);
        $el.find('.' + nav.expandClass).remove();
        nav.$items.removeClass(this.hideClass);
        var max = (option.column - 1) * option.row;
        nav.$items.each(function (i) {
            var $this = $(this);
            if (i >= max) {
                $this.addClass(nav.noborderClass);
            } else {
                $this.removeClass(nav.noborderClass);
            }
        });
    },
    /**
     * @param {number} max 最大行数
     * @private
     */
    _addExpand: function (max) {
        var nav = this;
        nav.$items.each(function (i) {
            var $this = $(this);
            if (i >= max - nav.options.column) {
                $this.addClass(nav.noborderClass);
            } else {
                $this.removeClass(nav.noborderClass);
            }
            if (i >= max - 1) {
                $this.addClass(nav.hideClass);
            }
            else {
                $this.removeClass(nav.hideClass);
            }
        });
        var height = nav.$items.eq(0).height();
        nav.element.css('height', 15 + height * nav.options.row);
        if (nav.element.find('.' + nav.expandClass).length === 1) {
            nav.element.find('.' + nav.expandClass).removeClass(nav.expandedClass).html(nav.options.expand);
        }
        else {
            nav.element.append('<span class="' +
                nav.options.itemClass + ' ' + nav.expandClass + '">' + nav.options.expand + '</span>');
        }
    },
    /**
     * 销毁对象
     * @private
     */
    _destroy: function () {
        var nav = this;
        nav.options.row = false;
        nav._removeExpand();
        nav.element.off('click.nav', '.' + nav.expandClass);
    }
});
