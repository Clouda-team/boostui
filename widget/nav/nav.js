/**
 * nav 组件
 * Created by wanghongliang02 on 15-1-29.
 */


$.widget("blend.nav", {
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
        nav.columnRange = [3, 4, 5];
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var nav = this;
        if (nav.options.animate) {
            nav.element.addClass(nav.animateClass);
        } else {
            nav.element.removeClass(nav.animateClass);
        }
        nav._colunm();
        nav._row();
        if (!nav.inited) {
            nav._initEvent();
            nav.inited = true;
        }
    },
    /**
     *
     * @private
     */
    _initEvent: function() {
        var nav = this;
        nav.element.on('click.nav', '.' + nav.expandClass, function(e) {
            var $this = $(this);
            if ($this.hasClass(nav.expandedClass)) {
                var height = nav.$items.eq(0).height();
                nav.element.css('height', 15 + height * nav.options.row);
                $this.removeClass(nav.expandedClass);
                var max = nav.options.row * nav.options.column;
                nav.$items.each(function(i) {
                    var $navItem = $(this);
                    if (i >= max  - 1) {
                        if (nav.options.animate) {
                            setTimeout(function() {
                                $navItem.addClass(nav.hideClass);
                            }, nav.options.time);
                        } else {
                            $navItem.addClass(nav.hideClass);
                        }
                    }
                });
                $this.html(nav.options.expand);
            } else {
                var len = nav.$items.length;
                var row = Math.ceil(len / nav.options.column) + (len % nav.options.column ? 0 : 1);
                height = nav.$items.eq(0).height() * row + 15;
                nav.element.css('height', height);
                $this.addClass(nav.expandedClass);
                nav.$items.removeClass(nav.hideClass);
                $this.html(nav.options.pack);
            }
            if (nav.options.expandHandle && $.isFunction(nav.options.expandHandle)) {
                nav.options.expandHandle(e);
            }

        });
    },
    /**
     * _column 自定义的成员函数，
     * 所有以下划线开头的函数不可在外部调用
     */
    _colunm: function () {
        var nav = this;
        var $el = this.element;
        /**
         * 处理column范围
         */
        if (this.options.column && $.inArray(this.options.column, this.columnRange) == -1) {
            this.options.column = 3;
        }
        var columnClass = [];
        for (var i = 0; i < this.columnRange.length; i++) {
            columnClass.push(this.columnClassPre + this.columnRange[i]);
        }
        $el.removeClass(columnClass.join(" ")).addClass(this.columnClassPre + this.options.column);

    },
    /**
     * _row 自定义的成员函数，
     * @private
     */
    _row: function () {
        var nav = this;
        var $el = this.element;
        var option = this.options;
        if (option.row === false) {
            this._removeExpand();
            return;
        }
        option.row = parseInt(option.row);
        if (option.row < 1) {
            option.row = false;
            this._removeExpand();
            return;
        }

        var length = nav.$items.length;
        var max = option.column * option.row;
        if (max >= length) {
            this._removeExpand();
            return;
        }
        this._addExpand(max);
    },
    /**
     * remove expand
     * @private
     */
    _removeExpand: function() {
        var nav = this;
        var $el = nav.element;
        var len = nav.$items.length;
        var row = Math.ceil(len / nav.options.column);
        var height = nav.$items.eq(0).height() * row + 15;
        $el.css('height', height);
        $el.find('.' + nav.expandClass).remove();
        nav.$items.removeClass(this.hideClass);
    },
    /**
     * add expand
     * @private
     */
    _addExpand: function(max) {
        var nav = this;
        nav.$items.each(function(i) {
            if (i >= max - 1) {
                $(this).addClass(nav.hideClass);
            } else {
                $(this).removeClass(nav.hideClass);
            }
        });
        var height = nav.$items.eq(0).height();
        nav.element.css('height', 15 + height * nav.options.row);
        if (nav.element.find('.' + nav.expandClass).length === 1) {
            nav.element.find('.' + nav.expandClass).removeClass(nav.expandedClass).html(nav.options.expand);
        } else {
            nav.element.append('<span class="' + nav.options.itemClass + ' ' + nav.expandClass + '">' + nav.options.expand + '</span>');
        }
    },
    /**
     * 销毁对象
     * @private
     */
    _destroy: function() {
        var nav = this;
        nav.options.row = false;
        nav._removeExpand();
        nav.element.off('click.nav', '.' + nav.expandClass);
    },
    /**
     * 设置列数
     * 没有返回值或者返回值为 undefined 时会保持调用链，
     * 如果返回值不为 undefined 则将该值返回，不能再次链式调用
     * @param num
     * @return {undefined}
     */
    column: function(num) {
        if (arguments.length == 0) {
            return this.options.column;
        }
        if (num && $.inArray(num, this.columnRange) == -1) {
            return;
        }
        this.options.column = num;
        this._colunm();
        this._row();
    },
    /**
     * 设置行数
     * 没有返回值或者返回值为 undefined 时会保持调用链，
     * 如果返回值不为 undefined 则将该值返回，不能再次链式调用
     * @param num
     * @return {undefined}
     */
    row: function(num) {
        if (arguments.length == 0) {
            return this.options.row;
        }
        if (num === false) {
            this.options.row = false;
            this._removeExpand();
            return;
        }
        var row = parseInt(num);
        if (!row || row <= 0) {
            return;
        }
        this.options.row = row;
        this._row();
    }
});
