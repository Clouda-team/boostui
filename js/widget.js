;
(function ($) {
    /**
     * widget 类工厂
     *
     * @param name {string} widget名
     * @param base {function} 父类
     * @param prototype {object} 原型
     * @return {function} 类构造函数
     */
    $.widget = function (name, base, prototype) {
        /**
         * 组件全名
         */
        var fullName;
        /**
         * 组件构造函数
         */
        var constructor;
        /**
         * 基础原型
         */
        var basePrototype;
        /**
         * 用于实现 this._super 调用
         */
        var proxiedPrototype = {};
        var namespace = name.split(".")[0];

        name = name.split(".")[1];
        fullName = namespace + "-" + name;

        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }

        $[namespace] = $[namespace] || {};
        constructor = $[namespace][name] = function (options, element) {
            // 检查是否是通过 new 调用的(instanceof)
            if (!this._createWidget) {
                return new constructor(options, element);
            }

            //没有参数的时候用于继承时候构造原型
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };

        basePrototype = new base();
        basePrototype.options = $.widget.extend({}, basePrototype.options);

        // 将原型复制到代理对象上，提供 this._super 和 this._superApply 支持
        $.each(prototype, function (prop, value) {
            var _super;
            var _superApply;

            if (!$.isFunction(value)) {
                proxiedPrototype[prop] = value;
            } else {
                _super = function () {
                    return base.prototype[prop].apply(this, arguments);
                };
                _superApply = function (args) {
                    return base.prototype[prop].apply(this, args);
                };
                proxiedPrototype[prop] = function () {
                    var returnValue;
                    var __super = this._super;
                    var __superApply = this._superApply;

                    try {
                        returnValue = value.apply(this, arguments);
                    } finally {
                        this._super = __super;
                        this.__superApply = __superApply;
                    }

                    return returnValue;
                };
            }
        });

        constructor.prototype = $.widget.extend(basePrototype, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });

        $.widget.bridge(name, constructor);

        return constructor;
    };

    var slice = Array.prototype.slice;

    /**
     * extend 复制对象属性到 target 上
     *
     * @param target
     * @return {undefined}
     */
    $.widget.extend = function (target) {
        var input = slice.call(arguments, 1);
        var inputIndex = 0;
        var inputLength = input.length;
        var key;
        var value;

        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        // Clone objects
                        target[key] = $.isPlainObject(target[key]) ?
                            $.widget.extend({}, target[key], value) :
                            $.widget.extend({}, value);
                    } else {
                        // Copy everything else by reference
                        target[key] = value;
                    }
                }
            }
        }

        return target;
    };

    /**
     * bridge 扩展Zepto.fn
     *
     * @param name
     * @param object
     * @return {undefined}
     */
    $.widget.bridge = function (name, constructor) {
        var fullName = constructor.prototype.widgetFullName || name;

        $.fn[name] = function (options) {
            var isMethodCall = typeof options === "string";
            var args = slice.call(arguments, 1);
            var returnValue = this;

            if (isMethodCall) {
                //函数调用
                this.each(function () {
                    var $this = $(this);
                    var instance = $this.data(fullName);
                    var methodValue;

                    if (options === "instance") {
                        returnValue = instance;
                        return false;
                    }

                    if (!instance) {
                        //TODO Error
                        throw new Error("cannot call methods on " + name + " prior to initialization; " +
                            "attempted to call method '" + options + "'");
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        //TODO Error
                        throw new Error("no such method '" + options + "' for " + name + " widget instance");
                    }

                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {
                //初始化
                //支持多个初始化参数
                if (args.length) {
                    options = $.widget.extend.apply(null, [options].concat(args));
                }

                this.each(function () {
                    var $this = $(this);
                    var instance = $this.data(fullName);
                    if (instance) {
                        //已经初始化过
                        instance.option(options || {});
                        if (instance._init) {
                            instance._init();
                        }
                    } else {
                        $this.data(fullName, new constructor(options, this));
                    }
                });
            }

            return returnValue;
        };
    };

    var noop = function () {};

    /**
     * $.Widget 父类
     *
     * @param  options
     * @param element
     * @class $.Widget
     */
    $.Widget = function ( /* options, element */ ) {};

    $.Widget.prototype = {
        options: {},
        _createWidget: function (options, element) {
            var $elememt = this.element = $(element);
            $elememt.data(this.widgetFullName, this);
            this.options = $.widget.extend({},
                this.options,
                this._getCreateOptions(),
                options);

            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: noop,
        _getCreateEventData: noop,
        _create: noop,
        _init: noop,

        _trigger: function (type, originalEvent, data) {
            var event;
            var callback = this.options[type];

            type = this.widgetName + ":" + type;
            data = data || {};
            event = $.Event(type, {
                originalEvent: originalEvent
            });
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        },
        option: function (key, value) {
            var options = key;
            var parts;
            var currentOpt;
            var i;

            if (arguments.length === 0) {
                //得到所有的 options 值
                return $.widget.extend({}, this.options);
            }

            if (typeof key === string) {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    // key = "a.b.c.d"
                    currentOpt = options[key] = $.widget.extend({}, this, options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        key = parts[i];
                        currentOpt[key] = currentOpt[key] || {};
                        currentOpt = currentOpt[key];
                    }
                    key = parts.pop();
                    if (arguments.length === 1) {
                        return currentOpt[key] === undefined ? null : currentOpt[key];
                    }
                    currentOpt[key] = value;
                } else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }

            this._setOptions(options);
            return this;
        },
        _setOptions: function (options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }

            return this;
        },
        _setOption: function (key, value) {
            this.options[key] = value;
            return this;
        }
    };
})(Zepto);
