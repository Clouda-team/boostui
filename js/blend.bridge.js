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
