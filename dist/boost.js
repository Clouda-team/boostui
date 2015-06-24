(function(window, undefined) {
    var NAMESPACE = "blend-" ;
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

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this[0].textContent : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return 0 in arguments ?
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        }) :
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        )
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var computedStyle, element = this[0]
        if(!element) return
        computedStyle = getComputedStyle(element, '')
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

// by zhangyuanwei
var _Zepto = window.Zepto;
var _$ = window.$;
var hasZepto = "Zepto" in window;
var has$ = "$" in window;


Zepto.noConflict = function(deep){
    if(window.$ === Zepto){
      if(has$){
        window.$ = _$;
      }else{
        delete window.$;
      }
    }

    if(deep && window.Zepto === Zepto){
      if(hasZepto){
        window.Zepto = _Zepto;
      }else{
        delete window.Zepto;
      }
    }
    return Zepto;
};

window.Zepto = window.$ = Zepto;

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

// The following code is heavily inspired by jQuery's $.fn.data()
var BLENDURL = 'http://cp01-rdqa04-dev111.cp01.baidu.com:8042/boost/test/blendui-naitve.js';

;(function($){
  function dynamicLoad (callback) {  
      var _doc=document.getElementsByTagName('head')[0], 
          _script=document.createElement('script'),
          _loadScript = BLENDURL; 
      _script.setAttribute('type','text/javascript');  
      _script.setAttribute('src',_loadScript);  
      _doc.appendChild(_script);  
      _script.onload = _script.onreadystatechange=function(){  
          if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){  
              callback();  
          }  
          _script.onload=_script.onreadystatechange=null;  
      }  
  };

  $.dynamicLoad = dynamicLoad;
})(Zepto)

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

// The following code is heavily inspired by jQuery's $.fn.data()

;(function($){
  var data = {}, dataAttr = $.fn.data, camelize = $.camelCase,
    exp = $.expando = 'Zepto' + (+new Date()), emptyArray = []

  // Get value from node:
  // 1. first try key as given,
  // 2. then try camelized key,
  // 3. fall back to reading "data-*" attribute.
  function getData(node, name) {
    var id = node[exp], store = id && data[id]
    if (name === undefined) return store || setData(node)
    else {
      if (store) {
        if (name in store) return store[name]
        var camelName = camelize(name)
        if (camelName in store) return store[camelName]
      }
      return dataAttr.call($(node), name)
    }
  }

  // Store value under camelized key on node
  function setData(node, name, value) {
    var id = node[exp] || (node[exp] = ++$.uuid),
      store = data[id] || (data[id] = attributeData(node))
    if (name !== undefined) store[camelize(name)] = value
    return store
  }

  // Read all "data-*" attributes from a node
  function attributeData(node) {
    var store = {}
    $.each(node.attributes || emptyArray, function(i, attr){
      if (attr.name.indexOf('data-') == 0)
        store[camelize(attr.name.replace('data-', ''))] =
          $.zepto.deserializeValue(attr.value)
    })
    return store
  }

  $.fn.data = function(name, value) {
    return value === undefined ?
      // set multiple values via object
      $.isPlainObject(name) ?
        this.each(function(i, node){
          $.each(name, function(key, value){ setData(node, key, value) })
        }) :
        // get value from first element
        (0 in this ? getData(this[0], name) : undefined) :
      // set value on all elements
      this.each(function(){ setData(this, name, value) })
  }

  $.fn.removeData = function(names) {
    if (typeof names == 'string') names = names.split(/\s+/)
    return this.each(function(){
      var id = this[exp], store = id && data[id]
      if (store) $.each(names || store, function(key){
        delete store[names ? camelize(this) : key]
      })
    })
  }

  // Generate extended `remove` and `empty` functions
  ;['remove', 'empty'].forEach(function(methodName){
    var origFn = $.fn[methodName]
    $.fn[methodName] = function() {
      var elements = this.find('*')
      if (methodName === 'remove') elements = elements.add(this)
      elements.removeData()
      return origFn.call(this)
    }
  })
})(Zepto)

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)

    //     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

    /**
 * 组件 类工厂
 * @file widget.js
 * @author zhangyuanwei
 */
;(function ($) {
    'use strict';
    var widgetMap = {};
    /**
     * widget 类工厂
     *
     * @param {string} name  widget名
     * @param {Function} base 父类
     * @param {Object} prototype 原型
     * @return {Function} 类构造函数
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
        var namespace = name.split('.')[0];

        name = name.split('.')[1];
        fullName = namespace + '-' + name;

        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }

        $[namespace] = $[namespace] || {};
        constructor = widgetMap[name] = $[namespace][name] = function (options, element) {
            // 检查是否是通过 new 调用的(instanceof)
            if (!this._createWidget) {
                return new constructor(options, element);
            }

            // 没有参数的时候用于继承时候构造原型
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
            }
            else {
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
                    }
                    finally {
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


    $.widget.has = function (name) {
        return widgetMap.hasOwnProperty(name);
    };

    var slice = Array.prototype.slice;

    /**
     * extend 复制对象属性到 target 上
     *
     * @param {Object} target 要复制到的对象
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
                    }
                    else {
                        // Copy everything else by reference
                        target[key] = value;
                    }
                }
            }
        }

        return target;
    };


    var widgetMagic = '__iqzll3wmdjthuxr_';
    /**
     * bridge 扩展Zepto.fn
     *
     * @param {string} name name
     * @param {Object} constructor constructor
     */
    $.widget.bridge = function (name, constructor) {
        var fullName = constructor.prototype.widgetFullName || name;
        var dataKey = widgetMagic + fullName;

        $.fn[name] = function (options) {
            var isMethodCall = typeof options === 'string';
            var args = slice.call(arguments, 1);
            var returnValue = this;

            if (isMethodCall) {
                // 函数调用
                this.each(function () {
                    var $this = $(this);
                    var instance = $this.data(dataKey);
                    var methodValue;

                    if (options === 'instance') {
                        returnValue = instance;
                        return false;
                    }

                    if (options === 'destroy') {
                        if (instance.destroy) {
                            instance.destroy();
                        }
                        $this.removeData(dataKey);
                        return;
                    }

                    if (!instance) {
                        // TODO Error
                        throw new Error('cannot call methods on ' + name + ' prior to initialization; ' +
                            'attempted to call method "' + options + '"');
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                        // TODO Error
                        throw new Error('no such method "' + options + '" for ' + name + ' widget instance');
                    }

                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue;
                        return false;
                    }
                });
            }
            else {
                // 初始化
                // 支持多个初始化参数
                if (args.length) {
                    options = $.widget.extend.apply(null, [{}, options].concat(args));
                }

                this.each(function () {
                    var $this = $(this);
                    var instance = $this.data(dataKey);
                    if (instance) {
                        // 已经初始化过
                        instance.option(options || {});
                        if (instance._init) {
                            instance._init();
                        }
                    }
                    else {
                        $this.data(dataKey, new constructor(options, this));
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
     */
    $.Widget = function (/* options, element */) {};

    $.Widget.prototype = {
        options: {},
        /**
         * 创建组件
         * @private
         * @param  {Object} options 配置
         * @param  {HTMLElement} element DOM元素
         */
        _createWidget: function (options, element) {
            this.element = $(element);
            this.options = $.widget.extend({},
                this.options,
                this._getCreateOptions(),
                options);

            this._create();
            this._trigger('create', null, this._getCreateEventData());
            this._init();
        },
        /**
         * @private
         * @return {Object}
         */
        _getCreateOptions: function () {
            return this.element.data(this.widgetFullName);
        },
        /**
         * @private
         */
        _getCreateEventData: noop,
        /**
         * @private
         */
        _create: noop,
        /**
         * @private
         */
        _init: noop,
        destroy: function () {
            this._destroy();
            // TODO 批量删除事件绑定好像不大好做 -_-!!
            // var $this = this.element;
            // $this.off(this.widgetName);
        },
        /**
         * @private
         */
        _destroy: noop,
        /**
         * 派发事件
         * @private
         * @param  {string} type 事件类型
         * @param  {string} originalEvent 原始事件
         * @param  {Object} data 传递的数据
         * @return {[type]}
         */
        _trigger: function (type, originalEvent, data) {
            var event;
            var callback = this.options[type];

            type = this.widgetName + ':' + type;
            data = data || {};
            event = $.Event(type, {
                originalEvent: originalEvent
            });
            this.element.trigger(event, data);
            return !($.isFunction(callback) &&
                callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
        },
        option: function (key, value) {
            var options = key;
            var parts;
            var currentOpt;
            var i;

            if (arguments.length === 0) {
                // 得到所有的 options 值
                return $.widget.extend({}, this.options);
            }

            if (typeof key === 'string') {
                options = {};
                parts = key.split('.');
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
                }
                else {
                    if (arguments.length === 1) {
                        return this.options[key] === undefined ? null : this.options[key];
                    }
                    options[key] = value;
                }
            }

            this._setOptions(options);
            return this;
        },
        /**
         * 设置options
         * @private
         * @param {Object} options 传入的options
         * @return {Object} 当前对象
         */
        _setOptions: function (options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key]);
            }

            return this;
        },
        /**
         * 设置option
         * @private
         * @param {string} key key
         * @param {Object|string|number|Function|boolean} value value
         * @return {Object} 当前对象
         */
        _setOption: function (key, value) {
            this.options[key] = value;
            return this;
        }
    };
})(Zepto);

    ;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file checkbox 组件
 * @author dingquan
 */

'use strict';

$.widget('blend.checkbox', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        itemSelector: '.' + NAMESPACE + 'checkbox',
        itemLabel: NAMESPACE + 'checkbox-label',
        type: 'group',
        itemSelected: NAMESPACE + 'checkbox-checked',
        itemSelectAll: NAMESPACE + 'checkbox-all'
    },
    _create: function () {

        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        var $this = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;


        this.$group = $this.find(options.itemSelector); //
        this.$label = $this.find('.' + options.itemLabel);
        this.$container = $this;

    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        this._initEvent();
    },
    _checkGroup: function (curElem) {

        var that = this;
        var EventSelected = that.$container.find('.' + that.options.itemSelected);
        var EventSelector = that.$container.find(that.options.itemSelector);

        var eventData = {
            checked: 0
        };

        if (that.options.type === 'radio') {
            EventSelected.removeClass(that.options.itemSelected);
            curElem.addClass(that.options.itemSelected);
            eventData.checked++;
        }
        else {

            var len = 0;
            // 判断有无已勾选
            EventSelector.each(function () {
                var $this = $(this);
                if (!$this.hasClass(that.options.itemSelectAll)) {
                    len++;
                    if ($this.hasClass(that.options.itemSelected)) {
                        eventData.checked++;
                    }
                }
            });

            if (curElem.hasClass(that.options.itemSelectAll)) {
                if (eventData.checked < len) {
                    EventSelector.each(function () {
                        $(this).addClass(that.options.itemSelected);
                    });
                    eventData.checked = len;
                }
                else {
                    EventSelected.removeClass(that.options.itemSelected);
                    eventData.checked = 0;
                }
            }
            else {

                if (curElem.hasClass(that.options.itemSelected)) {
                    curElem.removeClass(that.options.itemSelected);
                    eventData.checked--;
                }
                else {
                    curElem.addClass(that.options.itemSelected);
                    eventData.checked++;
                }

            }
            if (eventData.checked < len) {
                that.$container.find('.' + that.options.itemSelectAll).removeClass(that.options.itemSelected);
            }
            else {
                that.$container.find('.' + that.options.itemSelectAll).addClass(that.options.itemSelected);
            }
        }
        that._trigger('checked', null, eventData);
    },
    _initEvent: function () {

        var that = this;

        this.$group.on('tap', function () {
            if (that._trigger('beforechecked', null, {})) {
                var curElem = $(this);
                that._checkGroup(curElem);
            }
        });
        this.$label.on('tap', function () {
            if (that._trigger('beforechecked', null, {})) {
                var curElem = that.$group.eq([that.$label.index($(this))]);
                that._checkGroup(curElem);
            }
        });
    },
    /**
     *
     * @return {*}
     * 获取value值函数
     */
    getValues: function () {
        var $this;
        var valArr = [];
        var val;
        var elems = this.$group;
        for (var i = 0; i < elems.length; i++) {
            $this = $(elems[i]);
            if ($this.hasClass(NAMESPACE + 'checkbox-checked') || $this.hasClass(NAMESPACE + 'button-checkbox-checked') && !$this.hasClass(NAMESPACE + 'checkbox-all')) {
                val = this.options.values[i];
                valArr.push(this.options.values[i]);
            }
        }
        if (this.options.type === 'radio') {
            return val;
        }
        return valArr;
    }
});
})(Zepto)
;(function($){/* globals NAMESPACE */
/**
 * counter 组件
 * @file counter.js
 * @author zhangyuanwei
 */
'use strict';
$.widget('blend.counter', {

    /**
     * 组件的默认选项，可以由多从覆盖关系
     */
    options: {
        minusSelector: '.' + NAMESPACE + 'counter-minus',
        plusSelector: '.' + NAMESPACE + 'counter-plus',
        inputSelector: '.' + NAMESPACE + 'counter-input',
        minValue: 0,
        maxValue: Infinity,
        disableClass: NAMESPACE + 'disabled',
        step: 1,
        asyn: false // true/false

    },

    /**
     * _create 创建组件时调用一次
     * @private
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
        var $el = this.element;

        /**
         * 经过继承的 options
         */
        var options = this.options;

        /**
         * 建议: Zepto/jQuery 对象变量名前加 $
         */
        this.$minus = $el.find(options.minusSelector); // !!!选择器选择的时候需要指定范围!!!
        this.$plus = $el.find(options.plusSelector);
        this.$input = $el.find(options.inputSelector);
    },

    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {
        var options = this.options;
        var minValue = Number(options.minValue);
        var maxValue = Number(options.maxValue);

        this._minValue = isNaN(minValue) ? 0 : minValue;
        this._maxValue = isNaN(maxValue) ? Infinity : maxValue;

        this._initValue();
        this._initEvent();
    },

    /**
     * _initValue 自定义的成员函数，
     * 所有以下划线开头的函数不可在外部调用
     * @private
     */
    _initValue: function () {
        // var initValue = Number(this.$input.val());
        // this._value = isNaN(initValue) ? 0 : initValue;
        var value = Number(this.$input.val());
        if (isNaN(value)) {
            return;
        }
        if (this._maxValue <= this._minValue) {
            this.$minus.addClass(this.options.disableClass);
            this.$plus.addClass(this.options.disableClass);
        }
        else {
            this.$minus.toggleClass(this.options.disableClass, value <= this._minValue);
            this.$plus.toggleClass(this.options.disableClass, value >= this._maxValue);
        }
        value = Math.min(this._maxValue, Math.max(this._minValue, value));
        this.$input.val(value);
        this._value = value;
    },

    /**
     * 初始化控件事件
     * @private
     */
    _initEvent: function () {
        var thisObj = this;
        var step = Number(this.options.step);
        step = isNaN(step) ? 1 : step;
        this.$plus.on('tap', function () {
            thisObj.value(thisObj._value + step);
        });
        this.$minus.on('tap', function () {
            thisObj.value(thisObj._value - step);
        });
        this.$input.on('blur', function () {
            thisObj.value(Number(thisObj.$input.val()) || thisObj._value);
        });
    },

    /**
     * value 自定义的成员方法,
     * 没有返回值或者返回值为 undefined 时会保持调用链，
     * 如果返回值不为 undefined 则将该值返回，不能再次链式调用
     *
     * @param {number} n 设置value值
     * @return {undefined}
     */
    value: function (n) {
        var value;
        var oldValue;
        var eventData;

        if (arguments.length > 0) {
            value = Number(n);
            if (isNaN(value)) {
                return;
            }
            if (this._maxValue <= this._minValue) {
                this.$minus.addClass(this.options.disableClass);
                this.$plus.addClass(this.options.disableClass);
            }
            else {
                this.$minus.toggleClass(this.options.disableClass, value <= this._minValue);
                this.$plus.toggleClass(this.options.disableClass, value >= this._maxValue);
            }
            value = Math.min(this._maxValue, Math.max(this._minValue, value));
            oldValue = this._value;

            if (oldValue === value) {
                return;
            }

            eventData = {
                oldValue: oldValue,
                newValue: value
            };

            if (this.options.asyn) {
                var counter = this;
                var updateData = {
                    oldValue: oldValue,
                    newValue: value
                };
                eventData.callback = function () {
                    counter.$input.val(value);
                    counter._value = value;
                    counter._trigger('update', null, updateData);
                };
                this._trigger('beforeupdate', null, eventData);
            }
            else {

                /**
                 * this._trigger 派发自定义事件
                 * 使用 jQuery/Zepto 的事件机制
                 * 监听时需要加上模块名
                 * eg: $("xx").navbar().on("navbar:xxx", function(){
                 *    // 可以通过 return false 影响程序执行
                 *    return false;
                 * });
                 */
                if (this._trigger('beforeupdate', null, eventData)) {
                    this.$input.val(value);
                    this._value = value;
                    this._trigger('update', null, eventData);
                }
            }

        }
        else {
            return this._value;
        }
    }

});
})(Zepto)
;(function($){/* globals NAMESPACE */
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
        btnStatus: 3             // 控制cancel按钮(2)和confirm按钮(1) 的和值
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
    },
    /**
     * 初始化
     * @private
     */
    _init: function () {
        var me = this;
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
        this.$el.on('tap', '.' + (this.cancelClass || NAMESPACE + 'dialog-cancel'), function () {
            self._trigger('cancel');
            self.autoCloseDone && self.hide();
        }).on('tap', '.' + (this.doneClass || NAMESPACE + 'dialog-confirm'), function () {
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
                         +  '<a href="javascript:void(0);" class="' + this.confirmClass + ' ' + NAMESPACE + 'dialog-confirm ' + NAMESPACE + 'dialog-btn">' + this.confirmText + '</a>'
                         +  '<a href="javascript:void(0);" class="' + this.cancelClass + ' ' + NAMESPACE + 'dialog-cancel ' + NAMESPACE + 'dialog-btn">' + this.cancelText + '</a>'
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
        var bodyHeight = document.body.clientHeight || document.body.offsetHeight;
        (this._maskDom = $('<div class="' + NAMESPACE + 'dialog-mask"' + opacity + '></div>')).prependTo(this.$body);
        this._maskDom.css('height', bodyHeight);
        this._maskDom.on('tap', function (e) {
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
})(Zepto)
;(function($){/**
 * fixedBar
 * @file fixedBar.js
 * @author wangzhonghua
 * @date 2015.02.05
 * @memberof $.fn or $.blend
 * 	$.boost.fixedBar()
 */
'use strict';
$.widget('blend.fixedBar', {
    /**
     * 初始化组件
     * @private
     */
    _init: function () {
        // 此处是解决某些浏览器，如uc，横竖屏切换时，由于地址栏的显隐现象，导致的fixedBar不能落底的问题。
        $(window).on('resize orientationchange', function () {
            window.scrollBy(0, 0);
        });
    }
});})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file formgroup 组件
 * @author wanghongliang02
 */

$.widget('blend.formgroup', {
    /**
     * 组件的默认选项
     */
    options: {
        labelClass: NAMESPACE + 'formgroup-label',
        inputClass: NAMESPACE + 'formgroup-input',
        // selectClass: NAMESPACE + 'formgroup-select',
        btnClass: NAMESPACE + 'formgroup-btn',
        errorClass: NAMESPACE + 'formgroup-error',
        validate: false,  // false/blur/true,
        /**
         * custon validate function
         * @param {string} msg error msg
         * @param {Object} $ele element
         * @param {Function} cb callback function
         * @return {boolean|string}
         */
        validateFunction: function (msg, $ele, cb) {
            return true;
        },
        asyn: false  // true/false
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        var formgroup = this;
        var validate = formgroup.options.validate;
        var events = false;
        // 预留其他事件接口(input/paste...)
        switch (validate) {
            case true:
                events = 'blur';
                break;
            case 'blur':
                events = 'blur';
                break;
            default :
                validate = false;
        }
        formgroup.events = events;
        if (!$.isFunction(formgroup.options.validateFunction)) {
            formgroup.options.validateFunction = function () {
            };
        }
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var formgroup = this;
        var $el = formgroup.element;
        formgroup.$inputItem = $el.find('.' + formgroup.options.inputClass);
        if (formgroup.options.validate && formgroup.events) {
            formgroup._initEvent();
        }
    },
    /**
     * 初始化事件
     * @private
     */
    _initEvent: function () {
        var formgroup = this;
        formgroup.$inputItem.on('focus.formgroup', function (e) {
            var $me = $(this);
            formgroup._removeError();
        });
        formgroup.$inputItem.on(formgroup.events + '.formgroup', function (e) {
            var $me = $(this);
            var value = $me.val();
            if (formgroup.options.validate) {
                formgroup._validate(value, $me);
            }
        });
    },
    /**
     * remove error class
     * @private
     */
    _removeError: function () {
        var formgroup = this;
        formgroup.element.removeClass(formgroup.options.errorClass);
    },
    /**
     * show error
     * @param {string} msg error tips
     * @private
     */
    _showError: function (msg) {
        var formgroup = this;
        formgroup.element.addClass(formgroup.options.errorClass);
        // TODO error tip
        var toast = $[NAMESPACE.substr(0, NAMESPACE.length - 1)].toast();
        toast.show(msg, 1000);
    },
    /**
     *
     * @param {string} value input value
     * @param {Object} $ele element
     * @private
     */
    _validate: function (value, $ele) {
        var formgroup = this;
        if (formgroup.options.asyn === true) {
            formgroup.options.validateFunction(value, $ele, function (ret) {
                if (ret && typeof ret === 'string') {
                    formgroup._showError(ret);
                }
            });
        }
        else {
            var ret = formgroup.options.validateFunction(value, $ele);
            if (ret && typeof ret === 'string') {
                formgroup._showError(ret);
            }
        }
    },
    /**
     * 更新或者获取当前表单项的值
     * @param {string} value 欲更新或者获取当前表单项的值
     * @return {mix}
     * @private
     */
    _value: function (value) {
        var formgroup = this;
        if (typeof value === 'undefined') {
            return formgroup.$inputItem.val();
        }
        formgroup.$inputItem.val(value);
    },
    /**
     * 销毁formgroup对象
     * @private
     */
    _destroy: function () {
        var formgroup = this;
        if (formgroup.options.validate && formgroup.events) {
            formgroup.$inputItem.off(formgroup.events + '.formgroup');
            formgroup.$inputItem.off('focus.formgroup');
        }
    },
    /**
     * 更新或者获取当前表单项的值
     * @param {string} value 欲更新或者获取当前表单项的值
     * @return {mix}
     * @private
     */
    value: function (value) {
        return this._value(value);
    }

});
})(Zepto)
;(function($){/**
 * gallery 组件
 * Created by dingquan on 15-3-24.
 *
 * @file gallery.js
 * @author dingquan
 */

'use strict';
// var NAMESPACE = "blend-";
$.widget('blend.gallery', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     * tapMode: true表示点击图片切换显示描述，false表示点击切换显示图集
     */
    options: {
    },
    /**
     * 创建组件是调用一次
     * @private
     */
    _create: function () {
        /**
         * this.element 组件对应的单个 Zepto/jQuery 对象
         */
        this.$el = this.element;
        /**
         * 经过继承的 options
         */
        var options = this.options;

        if (!options.data || !options.data.length) {
            throw new Error('data can not be empty');
        }
    },
    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {

        var me = this;

        if (IS_UIX) {
            // UIX
            if (this._uix !== null) {
              // (this._uix.destroy)&&(this._uix.destroy());
            }
            $.dynamicLoad (function() {
                require(['src/blend'], function (blend) {
                   me._uix = me._initUIXGallery(blend);
                });
            });

        }
        else {
            /**
             * web gallery 初始化
             */
            this._createMask();   // 创建遮罩mask
            this._setting();    // 设置相关内部属性
            this._renderHTML();
            this._bindHandler();
        }
    },
    /**
     * 初始化 uix gallery
     * @private
     * @param  {Object} blend blend对象
     * @return {[type]}
     */
    _initUIXGallery: function (blend) {

        var uixGallery = blend.create('gallery', {
            images: this.options.data
        });

        return uixGallery;

    },
    /**
     * 创建遮罩mask
     * @private
     */
    _createMask: function () {

        if (this.mask) {
            // 已经初始化过mask
            return;
        }

        var mask = document.createElement('div');
        mask.classList.add(NAMESPACE + 'gallery-mask');
        document.querySelector('body').appendChild(this.mask = mask);

    },
    /**
     * 根据传入options 设置内部变量
     * @private
     */
    _setting: function () {

        var opts = this.options;
        // 幻灯片外层容器
        this.wrap = this.mask;
        // 幻灯片 内容list
        this.data = opts.data;
        // 内容类型 dom or pic
        this.type = 'pic';
        // 滑动方向
        this.isVertical = false;
        // Overspread mode
        this.isOverspread = opts.isOverspread || false;
        // 图片切换时间间隔
        this.duration = opts.duration || 2000;
        // 指定开始播放的图片index
        this.initIndex = opts.initIndex || 0;
        if (this.initIndex > this.data.length - 1 || this.initIndex < 0) {
            this.initIndex = 0;
        }
        // touchstart prevent default to fixPage
        this.fixPage = true;
        this.slideIndex = this.slideIndex || this.initIndex || 0;

        this.axis = 'X';
        this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

        this.width = this.width || this.wrap.clientWidth || document.body.clientWidth || document.body.offsetWidth;
        this.height = this.height || this.wrap.clientHeight || document.body.clientHeight || document.body.offsetHeight;

        this.ratio = this.height / this.width;
        this.scale = this.width;
        // Callback function when your finger is moving
        this.onslide = opts.onslide;
        // Callback function when your finger touch the screen
        this.onslidestart = opts.onslidestart;
        // Callback function when the finger move out of the screen
        this.onslideend = opts.onslideend;
        // Callback function when the finger move out of the screen
        this.onslidechange = opts.onslidechange;

        //单击是显示描述/图集
        this.tapMode = (typeof opts.tapMode === "undefined") ?  true : opts.tapMode;
      
        this.offset = this.offset || {
            X: 0,
            Y: 0
        };
        this.useZoom = opts.useZoom || false;
        // looping logic adjust
        if (this.data.length < 2) {
            this.isLooping = false;
            this.isAutoPlay = false;
        }
        else {
            this.isLooping = opts.isLooping || false;
            this.isAutoplay = false;
        }
        // little trick set, when you chooce tear & vertical same time
        // iSlider overspread mode will be set true autometicly
        if (opts.animateType === 'card' && this.isVertical) {
            this.isOverspread = true;
        }
        // 自动播放模式
        if (this.isAutoplay) {
            this.show();
            this._play();
        }

        if (this.useZoom) {
            this._addZoomPlugin();
            this._initZoom(opts);
        }

        this.infoType = opts.infoType || 0;
        this.bottomHeight = (this.infoType === 1) ? '50px' : '116px';
        // debug mode
        this.log = opts.isDebug ? function (str) {
                window.console.log(str);
            } : function () {
        };
        // set Damping function
        this._setUpDamping();
        // stop autoplay when window blur
        // this._setPlayWhenFocus();
        // set animate Function
        this._animateFunc =
        opts.animateType in this._animateFuncs ? this._animateFuncs[opts.animateType] : this._animateFuncs['default'];
    },
    /**
     * transform 移动动画
     * @private
     * @type {Object}
     */
    _animateFuncs: {
        'default': function (dom, axis, scale, i, offset) {
            dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
        }
    },
    /**
     * @private
     */
    _setUpDamping: function () {
        var oneIn2 = this.scale >> 1;
        var oneIn4 = oneIn2 >> 1;
        var oneIn16 = oneIn4 >> 2;
        this._damping = function (distance) {
            var dis = Math.abs(distance);
            var result;
            if (dis < oneIn2) {
                result = dis >> 1;
            }
            else if (dis < oneIn2 + oneIn4) {
                result = oneIn4 + (dis - oneIn2 >> 2);
            }
            else {
                result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
            }
            return distance > 0 ? result : -result;
        };
    },
    /**
    * render single item html by idx
    * @private
    * @param {element} el ..
    * @param {number}  i  ..
    */
    _renderItem: function (el, i) {
        var item;
        var html;
        var len = this.data.length;
        // get the right item of data
        if (!this.isLooping) {
            item = this.data[i] || {empty: true};
        }
        else {
            if (i < 0) {
                item = this.data[len + i];
            }
            else if (i > len - 1) {
                item = this.data[i - len];
            }
            else {
                item = this.data[i];
            }
        }
        if (item.empty) {
            el.innerHTML = '';
            el.style.background = '';
            return;
        }
        if (this.type === 'pic') {
            if (!this.isOverspread) {
                html = item.height / item.width > this.ratio ?
                '<img  height="' + this.height + '" src="' + item.image + '">' :
                '<img width="' + this.width + '" src="' + item.image + '">';
            }
            else {
                el.style.background = 'url(' + item.image + ') 50% 50% no-repeat';
                el.style.backgroundSize = 'cover';
            }
        }
        else if (this.type === 'dom') {
            html = item.image;
        }
        html && (el.innerHTML = html);
    },
    /**
     * render list html
     * @private
     */
    _renderHTML: function () {

        this.outer && (this.outer.innerHTML = '');
        // initail ul element
        var outer = this.outer || document.createElement('ul');
        outer.style.cssText =
        'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';
        // storage li elements, only store 3 elements to reduce memory usage
        this.els = [];
        for (var i = 0; i < 3; i++) {
            var li = document.createElement('li');
            li.className = this.type === 'dom' ? NAMESPACE + 'gallery-dom' : NAMESPACE + 'gallery-pic';
            li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
            this.els.push(li);
            // prepare style animation
            this._animateFunc(li, this.axis, this.scale, i, 0);

            if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
                this._renderItem(li, 1 - i + this.slideIndex);
            }
            else {
                this._renderItem(li, i - 1 + this.slideIndex);
            }
            outer.appendChild(li);
        }
        this._initLoadImg();
        // append ul to div#canvas
        if (!this.outer) {
            this.outer = outer;
            this.wrap.appendChild(outer);
        }

        if (!this.topMenu) {
            this._renderTopAndBottom();
        }
    },
    /**
     * 渲染顶部和底部
     * @private
     */
    _renderTopAndBottom: function () {

        var topMenu = this.topMenu || document.createElement('div');
        var topBack = this.topBack || document.createElement('span');
        var topTitle = this.topTitle || document.createElement('div');

        topMenu.classList.add(NAMESPACE + 'gallery-top');
        topBack.classList.add(NAMESPACE + 'gallery-top-back');
        topTitle.classList.add(NAMESPACE + 'gallery-top-title');

        topMenu.appendChild(topBack);
        topMenu.appendChild(this.topTitle = topTitle);

        topBack.addEventListener('click', (function (val) {
            var that = val;

            return function (e) {
                that.outer.innerHTML = '';
                // that.mask.style.visibility = "hidden";
                that.mask.style.display = 'none';
                that._hideMenu();
            };
        })(this));

        var bottomMenu = this.bottomMenu || document.createElement('div');
        bottomMenu.classList.add(NAMESPACE + 'gallery-bottom');
        if (this.infoType === 1) {
          bottomMenu.classList.add(NAMESPACE + 'gallery-type-1');  
        }

        // 底部内容展示

        var bottomInfoWrap = this.bottomInfoWrap || document.createElement('div');
        bottomInfoWrap.classList.add(NAMESPACE + 'gallery-bottom-info-wrap');


        var bottomInfo = this.bottomInfo || document.createElement('div');
        bottomInfo.classList.add(NAMESPACE + 'gallery-bottom-info');


        var bottomPage = this.bottomPage || document.createElement('span');
        bottomPage.classList.add(NAMESPACE + 'gallery-bottom-page');

        bottomInfoWrap.appendChild(this.bottomPage = bottomPage);
        bottomInfoWrap.appendChild(this.bottomInfo = bottomInfo);

        bottomMenu.appendChild(bottomInfoWrap);

        this.wrap.appendChild(this.topMenu = topMenu);
        this.wrap.appendChild(this.bottomMenu = bottomMenu);

    },
    /**
     *  preload img when slideChange
     *  @private
     *  @param {number} dataIndex means which image will be load
     */
    _preloadImg: function (dataIndex) {
        var len = this.data.length;
        var idx = dataIndex;
        var self = this;
        var loadImg = function (index) {
            if (index > -1 && !self.data[index].loaded) {
                var preloadImg = new Image();
                preloadImg.src = self.data[index].image;
                self.data[index].loaded = 1;
            }
        };
        if (self.type !== 'dom') {
            var nextIndex = idx + 2 > len - 1 ? (idx + 2) % len : idx + 2;
            var prevIndex = idx - 2 < 0 ? len - 2 + idx : idx - 2;
            loadImg(nextIndex);
            loadImg(prevIndex);
        }
    },
    /**
     *  load extra imgs when renderHTML
     *  @private
     */
    _initLoadImg: function () {
        var data = this.data;
        var len = data.length;
        var idx = this.initIndex;
        var self = this;
        /*if (idx >= len - 1) {
            // fix bug
            return;
        }*/
        if (this.type !== 'dom' && len > 3) {
            var nextIndex = idx + 2 > len ? (idx + 1) % len : idx + 1;
            var prevIndex = idx - 1 < 0 ? len - 1 + idx : idx - 1;
            data[idx].loaded = 1;
            data[nextIndex].loaded = 1;
            if (self.isLooping) {
                data[prevIndex].loaded = 1;
            }
            setTimeout(function () {
                self._preloadImg(idx);
            }, 200);
        }
    },
    /**
     * @private
     */
    _play: function () {
        var self = this;
        var duration = this.duration;
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = setInterval(function () {
            self._slideTo(self.slideIndex + 1);
        }, duration);
    },
    /**
     * 滑动到指定的图片
     * @private
     * @param  {number} dataIndex 图片索引
     */
    _slideTo: function (dataIndex) {

        var data = this.data;
        var els = this.els;
        var idx = dataIndex;
        var n = dataIndex - this.slideIndex;
        if (Math.abs(n) > 1) {
            var nextEls = n > 0 ? this.els[2] : this.els[0];
            this._renderItem(nextEls, idx);
        }
        // preload when slide
        this._preloadImg(idx);
        // get right item of data
        if (data[idx]) {
            this.slideIndex = idx;
        }
        else {
            if (this.isLooping) {
                this.slideIndex = n > 0 ? 0 : data.length - 1;
            }
            else {
                this.slideIndex = this.slideIndex;
                n = 0;
            }
        }

        this.log('pic idx:' + this.slideIndex);
        this.topTitle.innerText = this.data[this.slideIndex].title;
        this.bottomInfo.innerText = this.data[this.slideIndex].description;
        this.bottomPage.innerText = (this.slideIndex + 1) + '/' + this.data.length;

        // keep the right order of items
        var sEle;
        if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
            if (n > 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
            else if (n < 0) {
                sEle = els.shift();
                els.push(sEle);
            }
        }
        else {
            if (n > 0) {
                sEle = els.shift();
                els.push(sEle);
            }
            else if (n < 0) {
                sEle = els.pop();
                els.unshift(sEle);
            }
        }
        // slidechange should render new item
        // and change new item style to fit animation
        if (n !== 0) {
            if (Math.abs(n) > 1) {
                this._renderItem(els[0], idx - 1);
                this._renderItem(els[2], idx + 1);
            }
            else if (Math.abs(n) === 1) {
                this._renderItem(sEle, idx + n);
            }
            sEle.style.webkitTransition = 'none';
            sEle.style.visibility = 'hidden';
            setTimeout(function () {
                sEle.style.visibility = 'visible';
            }, 200);
            // this.onslidechange && this.onslidechange(this.slideIndex);
            // this.dotchange && this.dotchange();
        }
        // do the trick animation
        for (var i = 0; i < 3; i++) {
            if (els[i] !== sEle) {
                els[i].style.webkitTransition = 'all .3s ease';
            }
            this._animateFunc(els[i], this.axis, this.scale, i, 0);
        }

        // stop playing when meet the end of data
        if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
            this._pause();
        }
    },
    /**
     * 暂停自动播放
     * @private
     */
    _pause: function () {
        clearInterval(this.autoPlayTimer);
    },
    /**
     * judge the device
     * @private
     * @return {Object} 事件
     */
    _device: function () {
        var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
    },
    /**
     * 绑定事件
     * @private
     */
    _bindHandler: function () {

        var outer = this.outer;
        var device = this._device();
        if (!device.hasTouch) {
            outer.style.cursor = 'pointer';
            outer.ondragstart = function (evt) {
                if (evt) {
                    return false;
                }
                return true;
            };
        }

        outer.addEventListener(device.startEvt, this);
        outer.addEventListener(device.moveEvt, this);
        outer.addEventListener(device.endEvt, this);
        window.addEventListener('orientationchange', this);
    },
    handleEvent: function (evt) {
        var device = this._device();
        switch (evt.type) {
            case device.startEvt:
                this._startHandler(evt);
                break;
            case device.moveEvt:
                this._moveHandler(evt);
                break;
            case device.endEvt:
                this._endHandler(evt);
                break;
            case 'touchcancel':
                this._endHandler(evt);
                break;
            case 'orientationchange':
                this._orientationchangeHandler();
                break;
            case 'focus':
                this.isAutoplay && this._play();
                break;
            case 'blur':
                this._pause();
                break;
        }
    },
    /**
     * 处理touchStart事件
     * @private
     * @param  {Event} evt ...
     */
    _startHandler: function (evt) {
        if (this.fixPage) {
            evt.preventDefault();
        }

        var device = this._device();
   
        this.isMoving = true;
        this._pause();
        // this.onslidestart && this.onslidestart();
        this.log('Event: beforeslide');
        this.startTime = new Date().getTime();
        this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
        this.zoomStartHandler && this.zoomStartHandler(evt);  // zoom 事件
    },
    /**
     * 处理touchMove事件
     * @private
     * @param  {Event} evt ...
     */
    _moveHandler: function (evt) {
        if (this.isMoving) {

            var device = this._device();
            var len = this.data.length;
            var axis = this.axis;
            var reverseAxis = this.reverseAxis;
            var offset = {
                X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
                Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
            };
            var res = this.zoomMoveHandler ? this.zoomMoveHandler(evt) : false;  // zoom  事件
            // var res = false;
            if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
                evt.preventDefault();
                this.onslide && this.onslide(offset[axis]);
                this.log('Event: onslide');
                if (!this.isLooping) {
                    // 未开启循环
                    if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
                        offset[axis] = this._damping(offset[axis]);
                    }
                }
                for (var i = 0; i < 3; i++) {
                    var item = this.els[i];
                    item.style.webkitTransition = 'all 0s';
                    this._animateFunc(item, axis, this.scale, i, offset[axis]);
                }
            }
            this.offset = offset;
        }
    },
    /**
     * 处理touchEnd事件
     * @private
     * @param  {Event} evt ...
     */
    _endHandler: function (evt) {
        this.isMoving = false;
        var offset = this.offset;
        var axis = this.axis;
        var boundary = this.scale / 2;
        var endTime = new Date().getTime();
        // a quick slide time must under 300ms
        // a quick slide should also slide at least 14 px
        boundary = endTime - this.startTime > 300 ? boundary : 14;
        var res = this.zoomEndHandler ? this.zoomEndHandler(evt) : false; // zoom  事件
        // var res = false;

        var absOffset = Math.abs(offset[axis]);
        var absReverseOffset = Math.abs(offset[this.reverseAxis]);
        if (!res && offset[axis] >= boundary && absReverseOffset < absOffset) {
            this._slideTo(this.slideIndex - 1);
        }
        else if (!res && offset[axis] < -boundary && absReverseOffset < absOffset) {
            this._slideTo(this.slideIndex + 1);
        }
        else if (!res) {
            this._slideTo(this.slideIndex);

            var _that = this;
            setTimeout(function (){
                if (_that.gesture !== 3 && _that.tapMode){
                     if (_that.isMenuShow) {
                        _that._hideMenu();
                    }
                    else {
                        _that._showMenu();
                    }
                }else if (_that.gesture !== 3 && !_that.tapMode){
                    _that.hide();
                }
            }, 300);
        }
        // create tap event if offset < 10
        if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
            this.tapEvt = document.createEvent('Event');
            this.tapEvt.initEvent('tap', true, true);
            if (!evt.target.dispatchEvent(this.tapEvt)) {
                evt.preventDefault();
            }
        }
        this.offset.X = this.offset.Y = 0;
        this.isAutoplay && this._play();
        // this.onslideend && this.onslideend(this.slideIndex);
        this.log('Event: afterslide');
    },
    /**
     * @private
     */
    _destroy: function () {
        var outer = this.outer;
        var device = this._device();
        outer.removeEventListener(device.startEvt, this);
        outer.removeEventListener(device.moveEvt, this);
        outer.removeEventListener(device.endEvt, this);
        window.removeEventListener('orientationchange', this);
        window.removeEventListener('focus', this);
        window.removeEventListener('blur', this);
        this.wrap.innerHTML = '';
    },
    /**
     * 展示顶部和底部
     * @private
     */
    _showMenu: function () {

        this.topMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.bottomMenu.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.isMenuShow = true;
    },
    /**
     * 隐藏顶部和底部
     * @private
     */
    _hideMenu: function () {

        this.topMenu.style.webkitTransform = 'translate3d(0, -44px, 0)';
        // this.bottomMenu.style.webkitTransform = 'translate3d(0, 116px, 0)';
        this.bottomMenu.style.webkitTransform = 'translate3d(0, ' + this.bottomHeight + ', 0)';
        this.isMenuShow = false;
    },
    /**
     * 指定展示第几张图片
     * @public
     * @param  {number} val 图片索引
     */
    show: function (val) {

        if (IS_UIX && this._uix) {
            this._uix.show();
            return;
        }

        if (val < 0 || isNaN(parseInt(val, 10))) {
            val = 0;
        }
        else if (val >= this.data.length) {
            val = this.data.length - 1;
        }

        this.initIndex = val;
        this._renderHTML();

        this._slideTo(val);
        this.mask.style.visibility = 'visible';
        this.mask.style.display = 'block';


        /* if (!this.outer || !this.outer.innerHTML) {
            this._renderHTML();
        }*/
        if (this.tapMode){
            var that = this;
            setTimeout(function(){
                that._showMenu();
            },300);
        }
        
        // this._showMenu();
    },
    /**
     * 隐藏gallery
     * @public
     */
    hide: function () {
        this.mask.style.display = 'none';
        this.mask.style.visibility = 'hidden';
    },
    extend: function (plugin, main) {
        if (!main) {
            main = this;
        }
        Object.keys(plugin).forEach(function (property) {
            Object.defineProperty(main, property, Object.getOwnPropertyDescriptor(plugin, property));
        });
    },
    /**
     * 增加图片的缩放功能
     * @private
     */
    _addZoomPlugin: function () {
        var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
        var minScale = 1 / 2;
        var viewScope = {};
        function generateTranslate(x, y, z, scale) {
            return 'translate' + (has3d ? '3d(' : '(') + x
            + 'px,' + y + (has3d ? 'px,' + z + 'px)' : 'px)') + 'scale(' + scale + ')';
        }
        function getDistance(a, b) {
            var x;
            var y;
            x = a.left - b.left;
            y = a.top - b.top;
            return Math.sqrt(x * x + y * y);
        }
        function generateTransformOrigin(x, y) {
            return x + 'px ' + y + 'px';
        }
        function getTouches(touches) {
            return Array.prototype.slice.call(touches).map(function (touch) {
                return {
                    left: touch.pageX,
                    top: touch.pageY
                };
            });
        }
        function calculateScale(start, end) {
            var startDistance = getDistance(start[0], start[1]);
            var endDistance = getDistance(end[0], end[1]);
            return endDistance / startDistance;
        }
        function getComputedTranslate(obj) {
            var result = {
                translateX: 0,
                translateY: 0,
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
                offsetX: 0,
                offsetY: 0
            };
            var offsetX = 0;
            var offsetY = 0;
            if (!window.getComputedStyle || !obj) {
                return result;
            }
            var style = window.getComputedStyle(obj);
            var transform;
            var origin;
            transform = style.webkitTransform || style.mozTransform;
            origin = style.webkitTransformOrigin || style.mozTransformOrigin;
            var par = origin.match(/(.*)px\s+(.*)px/);
            if (par.length > 1) {
                offsetX = par[1] - 0;
                offsetY = par[2] - 0;
            }
            if (transform === 'none') {
                return result;
            }
            var mat3d = transform.match(/^matrix3d\((.+)\)$/);
            var mat2d = transform.match(/^matrix\((.+)\)$/);
            var str;
            if (mat3d) {
                str = mat3d[1].split(', ');
                result = {
                    translateX: str[12] - 0,
                    translateY: str[13] - 0,
                    translateZ: str[14] - 0,
                    offsetX: offsetX - 0,
                    offsetY: offsetY - 0,
                    scaleX: str[0] - 0,
                    scaleY: str[5] - 0,
                    scaleZ: str[10] - 0
                };
            }
            else if (mat2d) {
                str = mat2d[1].split(', ');
                result = {
                    translateX: str[4] - 0,
                    translateY: str[5] - 0,
                    offsetX: offsetX - 0,
                    offsetY: offsetY - 0,
                    scaleX: str[0] - 0,
                    scaleY: str[3] - 0
                };
            }
            return result;
        }
        function getCenter(a, b) {
            return {
                x: (a.x + b.x) / 2,
                y: (a.y + b.y) / 2
            };
        }
        // 初始化缩放参数等
        function initZoom(opts) {
            this.currentScale = 1;
            this.zoomFactor = opts.zoomFactor || 2;
        }
        function startHandler(evt) {
            if (this.useZoom) {
                var node = this.els[1].querySelector('img');
                var transform = getComputedTranslate(node);
                this.startTouches = getTouches(evt.targetTouches);
                this._startX = transform.translateX - 0;
                this._startY = transform.translateY - 0;
                this.currentScale = transform.scaleX;
                this.zoomNode = node;
                var pos = getPosition(node);
                if (evt.targetTouches.length === 2) {
                    this.lastTouchStart = null;
                    var touches = evt.touches;
                    var touchCenter = getCenter({
                        x: touches[0].pageX,
                        y: touches[0].pageY
                    }, {
                        x: touches[1].pageX,
                        y: touches[1].pageY
                    });
                    node.style.webkitTransformOrigin =
                    generateTransformOrigin(touchCenter.x - pos.left, touchCenter.y - pos.top);
                }
                else if (evt.targetTouches.length === 1) {
                    var time = new Date().getTime();
                    this.gesture = 0;
                    if (time - this.lastTouchStart < 300) {
                        evt.preventDefault();
                        this.gesture = 3;
                    }
                    this.lastTouchStart = time;
                }
            }
        }
        function moveHandler(evt) {
            var result = 0;
            var node = this.zoomNode;
            var device = this._device();
            if (device.hasTouch) {
                if (evt.targetTouches.length === 2 && this.useZoom) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    this._scaleImage(evt);
                    result = 2;
                }
                else if (evt.targetTouches.length === 1 && this.useZoom && this.currentScale > 1) {
                    node.style.webkitTransitionDuration = '0';
                    evt.preventDefault();
                    this._moveImage(evt);
                    result = 1;
                }
                this.gesture = result;
                return result;
            }
        }
        function handleDoubleTap(evt) {
            var zoomFactor = this.zoomFactor || 2;
            var node = this.zoomNode;
            var pos = getPosition(node);
            this.currentScale = this.currentScale === 1 ? zoomFactor : 1;
            node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
       
        }
        // 缩放图片
        function scaleImage(evt) {
            var moveTouces = getTouches(evt.targetTouches);
            var scale = calculateScale(this.startTouches, moveTouces);
            // Object.defineProperty(evt,"scale",{"writable":true});
            var tmpscale = evt.scale || scale;
            // evt.scale = evt.scale || scale;
            var node = this.zoomNode;
            scale = this.currentScale * tmpscale < minScale ? minScale : this.currentScale * tmpscale;
            node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
        }
        function endHandler(evt) {
            var result = 0;
            if (this.gesture === 2) {
                // 双手指 todo
                this._resetImage(evt);
                result = 2;
            }
            else if (this.gesture === 1) {
                // 放大拖拽 todo
                this._resetImage(evt);
                result = 1;
            }
            else if (this.gesture === 3) {
                // 双击
                this._handleDoubleTap(evt);
                //this._resetImage(evt);
                result = 3; 
            }
            return result;
        }
        // 拖拽图片
        function moveImage(evt) {
            var node = this.zoomNode;
            var device = this._device();
            var offset = {
                X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
                Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
            };
            this.moveOffset = {
                x: this._startX + offset.X - 0,
                y: this._startY + offset.Y - 0
            };
            node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
        }
        function getPosition(element) {
            var pos = {
                left: 0,
                top: 0
            };
            do {
                pos.top += element.offsetTop || 0;
                pos.left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
            return pos;
        }
        function valueInViewScope(node, value, tag) {
            var min;
            var max;
            var pos = getPosition(node);
            viewScope = {
                start: {
                    left: pos.left,
                    top: pos.top
                },
                end: {
                    left: pos.left + node.clientWidth,
                    top: pos.top + node.clientHeight
                }
            };
            var str = tag === 1 ? 'left' : 'top';
            min = viewScope.start[str];
            max = viewScope.end[str];
            return value >= min && value <= max;
        }
        function overFlow(node, obj1) {
            var result = 0;
            var isX1In = valueInViewScope(node, obj1.start.left, 1);
            var isX2In = valueInViewScope(node, obj1.end.left, 1);
            var isY1In = valueInViewScope(node, obj1.start.top, 0);
            var isY2In = valueInViewScope(node, obj1.end.top, 0);
            if (isX1In !== isX2In && isY1In !== isY2In) {
                if (isX1In && isY2In) {
                    result = 1;
                }
                else if (isX1In && isY1In) {
                    result = 2;
                }
                else if (isX2In && isY2In) {
                    result = 3;
                }
                else {
                    result = 4;
                }
            }
            else if (isX1In === isX2In) {
                if (!isY1In && isY2In) {
                    result = 5;
                }
                else if (!isY2In && isY1In) {
                    result = 6;
                }
            }
            else if (isY1In === isY2In) {
                if (!isX1In && isX2In) {
                    result = 7;
                }
                else if (isX1In && !isX2In) {
                    result = 8;
                }
            }
            else if (isY1In === isY2In === isX1In === isX2In) {
                result = 9;
            }
            return result;
        }
        function resetImage(evt) {
            if (this.currentScale === 1) {
                return;
            }
            // var node = this.zoomNode, left, top, trans, w, h, pos, start, end, parent, flowTag;
            var node = this.zoomNode;
            var left;
            var top;
            var trans;
            var w;
            var h;
            var pos;
            var start;
            var end;
            var parent;
            var flowTag;
            trans = getComputedTranslate(node);
            parent = node.parentNode;
            w = node.clientWidth * trans.scaleX;
            h = node.clientHeight * trans.scaleX;
            pos = getPosition(node);
            start = {
                left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
                top: (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
            };
            end = {
                left: start.left + w,
                top: start.top + h
            };
            left = start.left;
            top = start.top;
            flowTag = overFlow(parent, {
                start: start,
                end: end
            });
            switch (flowTag) {
                case 1:
                    left = viewScope.start.left;
                    top = viewScope.end.top - h;
                    break;
                case 2:
                    left = viewScope.start.left;
                    top = viewScope.start.top;
                    break;
                case 3:
                    left = viewScope.end.left - w;
                    top = viewScope.end.top - h;
                    break;
                case 4:
                    left = viewScope.end.left - w;
                    top = viewScope.start.top;
                    break;
                case 5:
                    top = viewScope.end.top - h;
                    break;
                case 6:
                    top = viewScope.start.top;
                    break;
                case 7:
                    left = viewScope.end.left - w;
                    break;
                case 8:
                    left = viewScope.start.left;
                    break;
            }
            if (w < parent.clientWidth) {
                left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
            }
            if (h < parent.clientHeight) {
                top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
            }
            node.style.webkitTransitionDuration = '100ms';
            node.style.webkitTransform =
            generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top,
            0, trans.scaleX);
        }
        this.extend({
            /**
             * @private
             * @type {Function}
             */
            _initZoom: initZoom,
            /**
             * @private
             * @type {Function}
             */
            _scaleImage: scaleImage,
            /**
             * @private
             * @type {Function}
             */
            _moveImage: moveImage,
            /**
             * @private
             * @type {Function}
             */
            _resetImage: resetImage,
            /**
             * @private
             * @type {Function}
             */
            _handleDoubleTap: handleDoubleTap,
            zoomMoveHandler: moveHandler,
            zoomEndHandler: endHandler,
            zoomStartHandler: startHandler
        });
    }

});
})(Zepto)
;(function($){/* globals NAMESPACE */
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
})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file list 组件
 * @author wanghongliang02
 */

$.widget('blend.list', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        del: true,  // 删除的开关
        animate: true,  // 动画的开关
        itemClass: NAMESPACE + 'list-item',     // 滑动的element的class
        animateClass: NAMESPACE + 'list-animation', // 动画实现的class
        itemContentClass: NAMESPACE + 'list-item-content',  // 列表主体element的class
        itemDeleteActiveClass: NAMESPACE + 'list-item-delete-active',   // 列表删除激活时的class
        asyn: false,    // 删除的异步模式开关
        exceptionElement: false // 不删除的元素, 填写css的class
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        // 保存上一个删除的dom，for revert
        this.$tempEl = null;
        this.tempIndex = null;
        this.deleteWidth = '-54px';
        this.deleteBtnClass = NAMESPACE + 'list-item-delete';
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var list = this;
        if (!list.options.del) {
            this._destroy();
            return;
        }
        if (list.options.animate) {
            list.element.addClass(list.options.animateClass);
        }
        else {
            list.element.removeClass(list.options.animateClass);
        }
        list._initEvent();
    },
    /**
     * 绑定事件
     * @private
     */
    _initEvent: function () {
        var list = this;
        var $items = list.element.find('.' + list.options.itemClass);
        var device = this._device();
        
        $items.each(function () {
            if (!device.hasTouch) {
                this.style.cursor = 'pointer';
                this.ondragstart = function (evt) {
                    if (evt) {
                        return false;
                    }
                    return true;
                };
            }

            this.addEventListener(device.startEvt, function (evt){
                list._startHandler(evt, this, list);
            }, false);
            this.addEventListener(device.moveEvt, function (evt){
                list._moveHandler(evt, this, list);
            }, false);
            this.addEventListener(device.endEvt, function (evt){
                list._endHandler(evt, this, list);
            }, false);
        });
        if (!list.eventInit) {
            list.eventInit = true;
            list.element.on('tap.list', '.' + list.deleteBtnClass, function (e) {
                var $parent = $(this).closest('.' + list.options.itemClass);
                list.tempIndex = $parent.index();
                $parent.data('height', $parent.height());

                var eventData = {};
                eventData.ele = $parent;
                if (list.options.asyn) {
                    eventData.callback = function () {
                        $parent.height(0);
                        setTimeout(function () {
                            list.$tempEl = $parent.detach();
                            list.$tempEl.removeClass(list.options.itemDeleteActiveClass);
                            list.$tempEl.find('.' + list.options.itemContentClass).css('left', 0);
                        }, list.options.animate ? 500 : 0);
                    };
                    list._trigger('beforedelete', null, eventData);
                }
                else {
                    if (list._trigger('beforedelete', null, eventData)) {
                        $parent.height(0);
                        setTimeout(function () {
                            list.$tempEl = $parent.detach();
                            list.$tempEl.removeClass(list.options.itemDeleteActiveClass);
                            list.$tempEl.find('.' + list.options.itemContentClass).css('left', 0);
                        }, list.options.animate ? 500 : 0);
                    }
                }
            });
            // 未点击删除时的恢复
            list.element.on('touchstart.list', function (e) {
                var $target = $(e.target);
                var className = list.deleteBtnClass;
                if (!$target.hasClass(className) &&
                    list.element.find('.' + list.options.itemDeleteActiveClass).length === 1) {
                    var $el = list.element.find('.' + list.options.itemDeleteActiveClass);
                    if ($el.length === 1) {
                        $el.removeClass(list.options.itemDeleteActiveClass);
                        $el.find('.' + list.options.itemContentClass).css('left', 0);
                    }
                }
            });
        }

    },
    /**
     * destroy the swipe event
     * 取消一个列表的滑动删除效果
     * @private
     */
    _destroy: function () {
        var list = this;
        list._startHandler = null;
        list._moveHandler = null;
        list._endHandler = null;

        list.eventInit = false;
        list.element.off('tap.list', '.' + list.deleteBtnClass);
        list.element.off('touchstart.list');
    },
    /**
     * 刷新配置
     */
    refresh: function () {
        this._init();
    },
    /**
     * 用于删除失败时的恢复
     */
    revert: function () {
        var list = this;
        if (list.tempIndex === null || list.tempIndex === -1) {
            return;
        }
        var height = list.$tempEl.data('height');
        var $lastItem = list.element.find('.' + list.options.itemClass).eq(list.tempIndex);
        if ($lastItem.length === 1) {
            list.$tempEl.insertBefore($lastItem).height(height);
        }
        else {
            list.$tempEl.appendTo(list.element).height(height);
        }
    },
    /**
     * judge the device
     * @private
     * @return {Object} 事件
     */
    _device: function () {
        var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
    },
    _startHandler: function (evt, that, list){
        var device = list._device();

        that.startTime = +new Date();
        that.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
        that.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
    },
    _moveHandler: function (evt, that, list){
        if (that.startTime === 0){
            return;
        }
        var device = list._device();

        var pageY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
        //判断滑出范围就重置startTime
        if (pageY < that.offsetTop || pageY > (that.offsetTop + that.offsetHeight)){
            that.startTime = 0;
        }
    },
    _endHandler: function (evt, that, list){
        var device = list._device();
        var endTime = +new Date();
         var endX = device.hasTouch ? evt.changedTouches[0].pageX : evt.pageX;
      
        if (that.startTime > 0 && endTime - that.startTime < 400 && that.startX - endX > 50){
            if ($(that).find('.' + list.deleteBtnClass).length === 0) {
                that.parent().append('<span class="' + list.deleteBtnClass + '">删除</span>');
            }
            $(that).addClass(list.options.itemDeleteActiveClass);
            $(that).find('.' + list.options.itemContentClass).css('left', list.deleteWidth);
        }

        that.startTime = 0;
    }

});
})(Zepto)
;(function($){/* globals NAMESPACE */
/**
 * @function loading
 * @file loading.js
 * @name loading
 * @author wangzhonghua
 * @date 2015.02.05
 * @memberof $.fn or $.blend
 * @grammar  $('.test').loading().show(),$.blend.loading().show()
 * @desc 页面级loading
 * @param {Object} opts 组件配置（以下参数为配置项）
 * @param {String} opts.loadingClass (可选, 默认值:\'\') loading节点的className
 * @param {String} opts.loadingHtml (可选, 默认值:\'\') loading节点
 *
 * @example
 * 	1、$('.j_test_loading').loading(), $('.j_test_loading')为loading自定义节点,并不是容器,切记
 * 	2、var loading = $.blend.loading({
 * 						loadingClass: 'my_define'
 * 					});
 * 		  loading.show();
 *  3、var loading = $.blend.loading({
 * 						loadingHtml: '<div class="my_define">loading...</div>'
 * 					});
 * 		  loading.show();
 */
'use strict';
$.widget('blend.loading', {
	/*配置项*/
    options: {
        loadingClass: '',
        loadingHtml: ''
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;
        this.$el = this.element;
        this.$body = $('body');
        this.loadingHtml = options.loadingHtml || '<div data-' + NAMESPACE + 'widget="loading" class="'
        + (options.loadingClass || '') + ' ' + NAMESPACE + 'loading"></div>';
    },
    /**
     * 组件初始化
     * @private
     */
    _init: function () {
        if (this.$el.length) {
            this.show();
        }
        else {
            this.defaultSegment = true;
        }
    },
    /**
     * 显示dialog
     * @private
     * @return {Object} 当前Zepto对象
     */
    show: function () {
        if (!this.$el.length) {
            (this.$el = $(this.loadingHtml)).appendTo(this.$body);
        }
        return this.$el.show();
    },
    /**
     * 关闭loading
     * @private
     * @return {Object} 当前Zepto对象
     */
    hide: function () {
        return this.$el.hide();
    },
    /**
     * 销毁toast
     * @private
     * @return {Object} 当前Zepto对象
     */
    destroy: function () {
        if (this.defaultSegment) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    }
});
})(Zepto)
;(function($){/* globals NAMESPACE */
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
        expand: '<i>更多</i>',
        pack: '<i>收起</i>',
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
        nav.columnRange = [2, 3, 4, 5, 6];
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () {
        var nav = this;
        nav._setColumn();
        nav._setRow();
        
        setTimeout(function (){
            if (nav.options.animate) {
                nav.element.addClass(nav.animateClass);
            }
            else {
                nav.element.removeClass(nav.animateClass);
            }
        }, 100);
        
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
        nav.element.on('tap.nav', '.' + nav.expandClass, function (e) {
            if (!new RegExp(nav.expandClass).test(e.target.parentNode.className)){
                return ;
            }
            
            var $this = $(this);
            if ($this.hasClass(nav.expandedClass)) {
                var height = nav.$items.eq(0).height();
                //nav.element.css('height', 15 + height * nav.options.row);
                nav.element.css('height', height * nav.options.row);

                
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
                        $this.removeClass(nav.expandedClass);
                    }, nav.options.time);
                }
                else {
                    $this.html(nav.options.expand);
                    $this.removeClass(nav.expandedClass);
                }
            }
            else {
                var len = nav.$items.length;
                var row = Math.ceil(len / nav.options.column) + (len % nav.options.column ? 0 : 1);
                height = nav.$items.eq(0).height() * row;
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
        var columnNum = ($el[0].className).match(/blend\-nav\-column\-(\d{1})/);
        
        if (columnNum){
            nav.options.column = parseInt(columnNum[1], 10);
        }
        
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
        var option = nav.options;
        var $el = nav.element;
        var len = nav.$items.length;
        var row = Math.ceil(len / nav.options.column);
        var height = nav.$items.eq(0).height() * row ;
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
        nav.element.css('height', height * nav.options.row);
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
        nav.element.off('tap.nav', '.' + nav.expandClass);
    }
});
})(Zepto)
;(function($){

})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * 侧边导航组件
 *
 * @file sidenav.js
 * @author dingquan
 */
$.widget('blend.sidenav', {

    options: {
        limit: 44,
        // type: 1 // 类型，1为连续滚动
    },
	/**
	 * 创建组件
	 * @private
	 */
    _create: function () {
    },
	/**
	 * 初始化组件
	 * @private
	 */
    _init: function () {

        var opts = this.options;

        this.navId = 'wZijePQW';   // 自定义， 用于建立nav和content一一对应关系

        this.$el = this.element;
        this.limit = opts.limit;
        this.type = opts.type;

        this.navs = this.$el.find('.blend-sidenav-nav li');
        this.contents = this.$el.find('.blend-sidenav-content .blend-sidenav-item');

        this._initSidePosition();   // 初始化side位置
        this._initContent();    // 初始化右侧内容

        this._bindEvent();
    },
    /**
     * 初始化左侧side 位置, 只在页面加载时候执行一次
     * @private
     */
    _initSidePosition: function () {
        var doc = document;
        var originScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
        if (originScrollTop > 0) {
            this.$el.find('.blend-sidenav-nav').css('top', 0);
        }
    },
    /**
     * 初始化右侧显示
     * @private
     */
    _initContent: function () {
        var activeIndex;
        var nav;
        for (var i = 0, len = this.navs.length; i < len; i++) {
            nav = this.navs.eq(i);
            if (nav.hasClass('blend-sidenav-active')) {
                activeIndex = i;
            }
            // 建立导航和内容的对应关系
            nav.data(this.navId, i);
            this.contents.eq(i).data(this.navId, i);
        }
        if (!activeIndex) {
            activeIndex = 0;
            this.navs.eq(0).addClass('blend-sidenav-active');
        }
        if (this.type === 1) {
            this.contents.show();
            return;
        }
        this.contents.hide();
        this.contents.eq(activeIndex).show();

    },
    /**
     * 绑定事件
     * @private
     */
    _bindEvent: function () {
        var doc = document;
        var me = this;
        var $side = this.$el.find('.blend-sidenav-nav');
        var flag = false;
        
        var $nav = this.$el.find('.blend-sidenav-nav ul');
        $nav.on('tap', function (e) {
            e.preventDefault();
            $nav.find('li').removeClass('blend-sidenav-active');
            var target = e.target || e.srcElement;
            var nodeName = target.nodeName.toLowerCase();
            var blendId;
            if (nodeName === 'li') {
                blendId = $(target).data(me.navId);
                $(target).addClass('blend-sidenav-active');
                me.contents.hide();
                me.contents.eq(blendId).show();
            }
        });
    }
});

})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * Slider 组件
 * Created by dingquan on 15-02-03
 * @file slider.js
 * @author dingquan
 */
'use strict';
$.widget('blend.slider', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        autoSwipe: true,            // 自动滚动,默认开启
        continuousScroll: true,     // 连续滚动
        axisX: true,                // 滚动方向,默认x轴滚动
        transitionType: 'ease',     // 过渡类型
        // duration: 0.6,
        speed: 2000,                // 切换的时间间隔
        theme: 'd2',
        // needDirection: false,    // 是否需要左右切换的按钮
        ratio: 'normal'     // normal/wide/square/small
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

        var ratioClass = NAMESPACE + 'slider-';
        switch (options.ratio) {
            case 'wide':
            case 'square':
            case 'small':
                ratioClass += options.ratio;
                break;
            default :
                ratioClass += 'normal';
        }
        $el.addClass(ratioClass);
        $el.css("visibility", "visible");

        this.$container = $el;
        this.$ul = $el.find('.' + NAMESPACE + 'slides');
        this.$li = $el.find('.' + NAMESPACE + 'slides li');

        this._liWidth = this.$li.width();
        this._liHeight = this.$li.height();
        this._liLength = this.$li.length;

        this.autoScroll = null;     // 自动播放interval对象
        this._index = 0;            // 当前幻灯片位置

        if (typeof options.theme !== 'string') {
            options.theme = 'default';
        }

        this._addComponents(options.theme);
    },
    /**
     * _init 初始化的时候调用
     * @private
     */
    _init: function () {

        var opts = this.options;
        var that = this;
        var $ul = this.$ul;
        var $li = this.$li;

        // 如果speed是0, 不自动滚动
        if (this.options.speed <= 0) {
            this.options.autoSwipe = false;
        }

        /**
         * 连续滚动，需要复制dom
         */
        if (opts.continuousScroll) {
            $ul.prepend($li.last().clone()).append($li.first().clone());

            var widthOrHeight = opts.axisX ? that._liWidth : that._liHeight;
            that._fnTranslate($ul.children().first(), widthOrHeight * -1);
            that._fnTranslate($ul.children().last(), widthOrHeight * that._liLength);

        }

        // 给初始图片定位
        $li.each(function (i) {
            that._fnTranslate($(this), (opts.axisX ? that._liWidth : that._liHeight) * i);
        });

        that._fnAutoSwipe();
        this._initEvent();
        // this._initView();
    },
    /**
     * 初始化事件绑定
     * @private
     */
    _initEvent: function () {
        var that = this;
        var device = this._device();
        // 绑定触摸
        that.$ul[0].addEventListener(device.startEvt, function (evt){
            that.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
            that.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;

            that.$ul[0].addEventListener(device.moveEvt, moveHandler, false);
            that.$ul[0].addEventListener(device.endEvt, endHandler, false);
        }, false);
        
        function moveHandler (evt){
            if (that.options.autoSwipe) {
                clearInterval(that.autoScroll);
            }

            that.curX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
            that.curY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;

            that.moveX = that.curX - that.startX;
            that.moveY = that.curY - that.startY;

            that._transitionHandle(that.$ul, 0);

            if (that.options.axisX) {
                evt.preventDefault();
                that._fnTranslate(that.$ul, -(that._liWidth * (parseInt(that._index, 10)) - that.moveX));
            }
        };

        function endHandler (evt){
            var opts = that.options;
            var _touchDistance = 50;

            if (opts.axisX) {
                that.moveDistance = that.moveX;
            }
            else {
                that.moveDistance = that.moveY;
            }

            // 距离小
            if (Math.abs(that.moveDistance) <= _touchDistance) {
                that._fnScroll(.3);
            }
            else {
                // 距离大
                // 手指触摸上一屏滚动
                if (that.moveDistance > _touchDistance) {
                    that._fnMovePrev();
                    that._fnAutoSwipe();
                // 手指触摸下一屏滚动
                }
                else if (that.moveDistance < -_touchDistance) {
                    that._fnMoveNext();
                    that._fnAutoSwipe();
                }
            }

            that.moveX = 0;
            that.moveY = 0;

            that.$ul[0].removeEventListener(device.moveEvt, moveHandler, false);
            that.$ul[0].removeEventListener(device.endEvt, endHandler, false);
        };
    },
    /**
     * 根据不同的theme添加组件和初始化样式
     * @private
     * @param {string} theme 幻灯片主题,目前支持有限的几个
     */
    _addComponents: function (theme) {

        var $el = this.$container;

        if (theme === 'a1') {
            $el.addClass(NAMESPACE + 'slider-a1');
            this._initControl();
        }
        if (theme === 'a2') {
            $el.addClass(NAMESPACE + 'slider-a2');
            this._initControl();
        }
        if (theme === 'd1') {
            $el.addClass(NAMESPACE + 'slider-title');
        }
        if (theme === 'd2') {
            $el.addClass(NAMESPACE + 'slider-title');
            this._initControl();
        }
    },
    /**
     * 初始化control控件
     * @private
     */
    _initControl: function () {

        var $el = this.$container;
        var liLength = this._liLength;

        var html = '';
        for (var i = 0; i < liLength; i++) {
            html += (i === 0) ? '<li><a class="' + NAMESPACE + 'slider-active"></a></li>' : '<li><a></a></li>';
        }

        var $ol = $('<ol class="' + NAMESPACE + 'slider-control-nav">' + html + '</ol>');

        $el.append($ol);

        this.$controlOl = $ol;
    },
    /**
     * 初始化title
     * @private
     */
    _initTitle: function () {
        // to do
        // var $el = this.$container;
    },
    /*
     * css 过渡
     * @private
     * @param {Object} dom  zepto object
     * @param {number} num - transition number
     */
    _transitionHandle: function (dom, num) {

        var opts = this.options;
        dom.css({
            '-webkit-transition': 'all ' + num + 's ' + opts.transitionType,
            'transition': 'all ' + num + 's ' + opts.transitionType
        });
    },
    /**
     * css 滚动
     * @private
     * @param  {Object} dom    zepto object
     * @param  {number} result translate number
     */
    _fnTranslate: function (dom, result) {

        var opts = this.options;

        if (opts.axisX) {
            dom.css({
                '-webkit-transform': 'translate3d(' + result + 'px,0,0)',
                'transform': 'translate3d(' + result + 'px,0,0)'
            });
        }
        else {
            dom.css({
                '-webkit-transform': 'translate3d(0,' + result + 'px,0)',
                'transform': 'translate3d(0,' + result + 'px,0)'
            });
        }
    },
    /**
     * 下一屏滚动
     * @private
     */
    _fnMoveNext: function () {
        this._index ++;
        this._fnMove();
        /*if(opts.lazyLoad){
            if(opts.continuousScroll){
                fnLazyLoad(_index+2);
            }else{
                fnLazyLoad(_index+1);
            }
        }*/
    },
    /**
     * 上一屏滚动
     * @private
     */
    _fnMovePrev: function () {
        this._index --;
        this._fnMove();
        // 第一次往右滚动懒加载图片
        /*if(firstMovePrev && opts.lazyLoad){
            var i = _liLength-1;
            for(i; i <= (_liLength+1); i++){
                fnLazyLoad(i);
            }
            firstMovePrev = false;
            return;
        }
        if(!firstMovePrev && opts.lazyLoad){
            fnLazyLoad(_index);
        }*/
    },
    /**
     * 自动滑动
     * @private
     */
    _fnAutoSwipe: function () {
        var that = this;
        var opts = this.options;

        if (opts.autoSwipe) {
            this.autoScroll = setInterval(function () {
                that._fnMoveNext();
            }, opts.speed);
        }
    },
    /**
     * [_fnMove description]
     * @private
     */
    _fnMove: function () {
        var that = this;
        var opts = this.options;
        // var _vars = this._vars;
        // var _liLength = this._liLength;

        if (opts.continuousScroll) {
            if (that._index >= that._liLength) {
                that._fnScroll(.3);
                that._index = 0;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else if (that._index < 0) {
                that._fnScroll(.3);
                that._index = that._liLength - 1;
                setTimeout(function () {
                    that._fnScroll(0);
                }, 300);
            }
            else {
                that._fnScroll(.3);
            }
        }
        else {
            if (that._index >= that._liLength) {
                that._index = 0;
            }
            else if (that._index < 0) {
                that._index = that._liLength - 1;
            }
            that._fnScroll(.3);
        }

        that._setDotActive();

        // callback(_index);
    },
    /**
     * 滑动
     * @private
     * @param  {number} num num
     */
    _fnScroll: function (num) {
        var $ul = this.$ul;
        var _index = this._index;
        var _liWidth = this._liWidth;
        var _liHeight = this._liHeight;
        var opts = this.options;

        this._transitionHandle($ul, num);
        if (opts.axisX) {
            this._fnTranslate($ul, -_index * _liWidth);
        }
        else {
            this._fnTranslate($ul, -_index * _liHeight);
        }
    },
    /**
     * 设置圆点的状态
     * @private
     */
    _setDotActive: function () {
        this.$controlOl.find('li a').removeClass(NAMESPACE + 'slider-active');
        this.$controlOl.find('li').eq(this._index).find('a').addClass(NAMESPACE + 'slider-active');
    },
    /**
     * judge the device
     * @private
     * @return {Object} 事件
     */
    _device: function () {
        var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
        var startEvt = hasTouch ? 'touchstart' : 'mousedown';
        var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        var endEvt = hasTouch ? 'touchend' : 'mouseup';
        return {
            hasTouch: hasTouch,
            startEvt: startEvt,
            moveEvt: moveEvt,
            endEvt: endEvt
        };
    },
    /**
     * 下一张幻灯片
     * @return {Object} 当前Zepto对象
     */
    next: function () {
        this._fnMoveNext();
        return this.$container;
    },
    /**
     * 上一张幻灯片
     * @return {Object} 当前Zepto对象
     */
    prev: function () {
        this._fnMovePrev();
        return this.$container;
    },
    /**
     * 暂停
     * @return {Object} 当前Zepto对象
     */
    paused: function () {
        clearInterval(this.autoScroll);
        return this.$container;
    },
    start: function () {
        clearInterval(this.autoScroll);
        this._fnAutoSwipe();
        return this.$container;
    }

});
})(Zepto)
;(function($){/* globals NAMESPACE */
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
    },
    /**
     * 初始化组件/
     * @private
     */
    _init: function () {
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
        
        this.switches.on('tap', function () {
            if ($(this).hasClass(that.options.classNameActive)) {
                $(this).removeClass(that.options.classNameActive);
            }else {
                $(this).addClass(that.options.classNameActive);
            }
        });
    }
});

})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * @file tab 组件
 * @author wanghongliang02
 */

$.widget('blend.tab', {
    /**
     * 组件的默认选项，可以由多重覆盖关系
     */
    options: {
        start: 0,
        animate: true,
        activeClass: NAMESPACE + 'tab-header-item-active',
        animateClass: NAMESPACE + 'tab-animation'
    },
    /**
     * _create 创建组件时调用一次
     */
    _create: function () {
        var tab = this;
        var $el = this.element;
        tab._itemSelector = '.' + NAMESPACE + 'tab-header-item';
        tab._itemContentSelector = '.' + NAMESPACE + 'tab-content-item';
        tab._itemActiveSelector = '.' + NAMESPACE + 'tab-header-active';
        tab.$headerItem = $el.find(tab._itemSelector);
        tab.$contentItem = $el.find(tab._itemContentSelector);
        tab.$activeEle = $el.find(tab._itemActiveSelector);
        // 计算active宽度和位置
        tab.itemWidth = this.$headerItem.eq(0).width();
        tab.$activeEle.css('width', this.itemWidth);
        tab.itemOffsetX = 0;
        tab.current = 0;
        this._uix = null;
    },
    /**
     * _init 初始化的时候调用
     */
    _init: function () { 
          if (IS_UIX) {
            this._UIXInit();
          } else {
            this._webInit();
          }
    },
    /**
     * uix版的初始化
     * @private
     */
    _UIXInit : function () {
        var me = this;
        if (this._uix !== null) {
            this._uix.destroy();
        }
        $.dynamicLoad (function() {
            require(['src/blend'], function (blend) {
                me._uix = me._initUIXComponent(blend);
            });
        });
    },
    /**
     * 创建UIX的实例
     * @private
     */
     _initUIXComponent : function (blend) {
        var uixTab,
            me = this, 
            $el = this.element,
            $tabItem = $el.find(this._itemSelector);
            /*创建一个UIXtab*/
            uixTab = blend.create('tab', {
                 "id": "tab",
                 "items":[]
            });
            $tabItem.each(me._generateItem(function (item) {
                uixTab.append(item);
                uixTab.render();
            },uixTab));
            return uixTab;
     },
    /**
     * 生成uix的tab的item
     * @private
     */
    _generateItem : function (callback, uixTab) {
        return function (index, _item) {
            var $item = $(_item),
                blendItem,
                itemConf ={
                    text : $item.text(),
                    href : $item.data('href')
                },
                itemTab;
            itemTab = uixTab.create(itemConf);
            callback(itemTab);
        };
    },
   /**
     * web版的初始化
     * @private
     */
    _webInit: function () {
        var tab = this;

        tab._checkStart();
        if (!tab.inited) {
            tab._initEvent();
            tab.inited = true;
        }
        tab._switch(tab.options.start);

        if (tab.options.animate) {
            // 初始化的时候不出动画
            setTimeout(function () {
                tab.element.addClass(tab.options.animateClass);
            }, 0);
        }
        else {
            tab.element.removeClass(tab.options.animateClass);
        }


    },
    /**
     * 验证初始化的start参数
     * @private
     */
    _checkStart: function () {
        var tab = this;
        var lenth = tab.$headerItem.length;
        tab.options.start = parseInt(tab.options.start, 10);
        if (tab.options.start < 0 || tab.options.start >= lenth) {
            tab.options.start = 0;
        }
        tab.current = tab.options.start;
    },

    /**
     *
     * @private
     */
    _initEvent: function () {
        var tab = this;
        tab.$headerItem.on('tap.tab', function (e) {
            var index = $(this).index();
            tab._switch(index);
        });
    },
    /**
     * tab切换
     * @param {number} index 要切换到tab序号。
     * @private
     */
    _switch: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            tab.current = tab.options.start;
        }
        else {
            tab.current = index;
        }

        var left = tab.itemOffsetX + tab.current * tab.itemWidth;
        tab.$activeEle.css('left', left);
        tab.$contentItem.hide();
        tab.$contentItem.eq(tab.current).show();
        tab.$headerItem.removeClass(tab.options.activeClass);
        tab.$headerItem.eq(tab.current).addClass(tab.options.activeClass);
    },
    /**
     * 销毁tab对象
     * @private
     */
    _destroy: function () {
        var tab = this;
        tab.$headerItem.off('tap.tab');
    },

    /**
     * 切换到某个tab,获取当前的tab
     * @param {number=} index 切换的tab序号
     * @return {current|*|number} 当前tab序号或者不返回
     */
    active: function (index) {
        var tab = this;
        if (arguments.length === 0) {
            return tab.current;
        }
        this._switch(index);
    }

});
})(Zepto)
;(function($){/* globals NAMESPACE */
/**
 * @file toast.js
 * @name toast
 * @author wangzhonghua
 * @date 2015.02.05
 */
'use strict';
$.widget('blend.toast', {
    /*配置项*/
    options: {
        toastClass: '',
        toastTpl: '',
        delay: 2500
    },
    /**
     * _create 创建组件时调用一次
     * @private
     */
    _create: function () {
        var options = this.options;
        this.$el = this.element;
        this.$body = $('body');
        this.toastTpl = options.toastTpl || '<div data-' + NAMESPACE + 'widget="toast" class="'
        + (options.toastClass || '') + ' ' + NAMESPACE + 'toast">{%content%}</div>';
    },
    /**
     * 初始化组件调用
     * @private
     */
    _init: function () {
        !this.$el.length && (this.defaultSegment = true);
    },
    /**
     * 设置延时消失
     * @param {number} delay 设置延时的时间
     * @private
     */
    _setDelay: function (delay) {
        var self = this;
        delay = parseInt(delay, 10) || this.options.delay;
        clearTimeout(this.timeout);
        this.timeOut = window.setTimeout(function () {
            self.hide();
        }, delay);
    },
    /**
     * 显示toast
     * @param  {string} content 需要展示的内容
     * @param  {number} delay 延时的时间
     * @return {Object} 当前Zepto对象
     */
    show: function (content, delay) {
        if (!content) {
            return false;
        }
        if (!this.$el.length) {
            (this.$el = $(this.toastTpl.replace(/{%content%}/g, content))).appendTo(this.$body);
        }
        else {
            this.$el.html(content);
        }
        this._setDelay(delay);
        return this.$el.show();
    },
    /**
     * 关闭toast
     * @return {Object} 当前Zepto对象
     */
    hide: function () {
        return this.$el.hide();
    },
    /**
     * 销毁toast
     * @return {[type]}
     */
    destroy: function () {
        if (this.defaultSegment) {
            this.$el.remove();
            this.$el = [];
        }
        return this.$el;
    }
});
})(Zepto)
;(function($){/* globals NAMESPACE */
/* eslint-disable fecs-camelcase */
/**
 * 顶部二级导航
 * @file topnav.js
 * @author dingquan@baidu.com
 */

$.widget('blend.topnav', {
    /**
     * 配置信息
     */
    options: {
        defaultIcon: true
    },
    /**
     * 创建组件
     * @private
     */
    _create: function () {

    },
    /**
     * 初始化组件
     * @private
     */
    _init: function () {
        var opt = this.options;
        this.$el = this.element;

        this.defaultIcon = opt.defaultIcon;

        this._initUI();
        this._bindEvent();
    },
    /**
     * 初始化UI, 增加相应的class
     * @private
     */
    _initUI: function () {
        var contentHTML = this.$el.html();

        // 外层增加wrapper
        var $wrapper = $('<div class="' + NAMESPACE + 'topnav-wrapper"></div>');
        $wrapper.html(contentHTML);

        this.$el.empty().append($wrapper);

        var $items = this.$items = this.$el.find('.' + NAMESPACE + 'topnav-item');

        if (this.defaultIcon) {
            for (var i = 0, len = $items.length; i < len; i++) {
                var item = $items[i];

                if (item.getElementsByTagName('ul').length > 0) {
                    $(item).find('span').addClass(NAMESPACE + 'topnav-arrow')
                    .addClass(NAMESPACE + 'topnav-downarrow');
                }
            }
        }
        /**
         * show 整个nav
         */
        this.$el.show();

    },
    /**
     * 导航相关事件绑定
     * @private
     */
    _bindEvent: function () {

        var $items = this.$items;

        for (var i = 0, len = $items.length; i < len; i++) {
            var $item = $items.eq(i);

            $item.on('tap', function (e) {
                var $this = $(this);
                var $ul = $(this).find('ul');
                var $span = $(this).find('span');
                var isActive = $(this).hasClass(NAMESPACE + 'topnav-active') ? true : false;

                $items.not(i).removeClass(NAMESPACE + 'topnav-active');
                $items.not(i).find('ul').hide();
                $items.not(i).find('span').removeClass(NAMESPACE + 'topnav-uparrow')
                .addClass(NAMESPACE + 'topnav-downarrow');

                if (isActive) {
                    $this.removeClass(NAMESPACE + 'topnav-active');
                    $ul.hide();
                    $span.removeClass(NAMESPACE + 'topnav-uparrow').addClass(NAMESPACE + 'topnav-downarrow');
                }
                else {
                    $this.addClass(NAMESPACE + 'topnav-active');
                    $ul.show();
                    $span.removeClass(NAMESPACE + 'topnav-downarrow').addClass(NAMESPACE + 'topnav-uparrow');
                }

            });
        }
    }

});
})(Zepto)
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


})(window);