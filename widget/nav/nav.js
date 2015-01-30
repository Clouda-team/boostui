/**
 * nav 组件
 * Created by wanghongliang02 on 15-1-29.
 */


$.widget("boost.nav", {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        column: 3,
        animate: true,
        time: 500,
        expand: '更多',
        pack: '收起',
        row: false
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        /**
         * this 对象为一个 组件 实例
         * 不是 Zepto/jQuery 对象
         * 也不是 Dom 对象
         */

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $ele = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;

        /**
         * 建议: Zepto/jQuery 对象变量名前加 $
         */
        this.expandClass = 'boostnav-expand';
        this.expandedClass = 'boostnav-expanded';
        this.$item = $ele.find('.boostnav-item');
        this.columnClass = 'boostnav-column-';
        this.hideClass = 'boostnav-item-hide';
        this.columnRange = [3, 4, 5];

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        this._colunm();
        this._row();
        if (!this.inited) {
            this._initEvent();
            this.inited = true;
        }
    },
    /**
     *
     * @private
     */
    _initEvent: function() {
        var nav = this;
        nav.element.on('click', '.' + nav.expandClass, function(e) {
            var $this = $(this);
            if ($this.hasClass(nav.expandedClass)) {
                var height = nav.$item.eq(0).height();
                nav.element.css('height', 15 + height * nav.options.row);
                $this.removeClass(nav.expandedClass);
                var max = nav.options.row * nav.options.column;
                nav.$item.each(function(i) {
                    if (i >= max  - 1) {
                        $(this).addClass(nav.hideClass);
                    }
                });
                $this.html(nav.options.expand);
            } else {
                nav.element.css('height', 'auto');
                $this.addClass(nav.expandedClass);
                nav.$item.removeClass(nav.hideClass);
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
        var $ele = this.element;
        /**
         * 处理column范围
         */
        if (this.options.column && $.inArray(this.options.column, this.columnRange) == -1) {
            this.options.column = 3;
        }
        var columnClass = [];
        for (var i = 0; i < this.columnRange.length; i++) {
            columnClass.push(this.columnClass + this.columnRange[i]);
        }
        $ele.removeClass(columnClass.join(" ")).addClass(this.columnClass + this.options.column);

    },
    /**
     * _row 自定义的成员函数，
     * @private
     */
    _row: function () {
        var $ele = this.element;
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

        var length = this.$item.length;
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
        var nav =this;
        var $ele = this.element;
        $ele.css('height', 'auto');
        $ele.find('.' + nav.expandClass).remove();
        nav.$item.removeClass(this.hideClass);
    },
    /**
     * add expand
     * @private
     */
    _addExpand: function(max) {
        var nav = this;
        nav.$item.each(function(i) {
            if (i >= max - 1) {
                $(this).addClass(nav.hideClass);
            } else {
                $(this).removeClass(nav.hideClass);
            }
        });
        var height = nav.$item.eq(0).height();
        nav.element.css('height', 15 + height * nav.options.row);
        if (nav.element.find('.' + nav.expandClass).length === 1) {
            nav.element.find('.' + nav.expandClass).removeClass(nav.expandedClass).html(nav.options.expand);
        } else {
            nav.element.append('<span class="boostnav-item ' + nav.expandClass + '">' + nav.options.expand + '</span>');
        }
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
