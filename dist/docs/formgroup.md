#表单组

## 1. 使用演示
<div class="doc-demo">
	<div id="blendForm1" class="blend-form" style="margin: 8px 0;">
	    <div class="blend-formgroup">
	        <label class="blend-formgroup-label">姓名</label>
	        <input type="text" class="blend-formgroup-input" placeholder="姓名"/>
	    </div>
	    <div class="blend-formgroup">
	        <label class="blend-formgroup-label">手机号码</label>
	        <input type="text" class="blend-formgroup-input" placeholder="请输入手机号码,此处有校验"/>
	    </div>
	    <div class="blend-formgroup">
	        <label class="blend-formgroup-label">愿望</label>
	        <input type="text" class="blend-formgroup-input" placeholder="请输入你的愿望"/>
	    </div>
	</div>
</div>

<script type="text/javascript">
	;(function(){
		boost('#blendForm1').find('.blend-formgroup').eq(1).formgroup({
	        validate: true,
	        validateFunction: function (value, $ele) {
	        	var reg = /^\d{11}$/g;
	            if (!reg.test(value)) {
	                return '请输入正确的手机号';
	            }
	        }
	    });
	})();

</script>

## 2. 使用方式

### HTML结构


	<div class="blend-formgroup">
        <label class="blend-formgroup-label">姓名</label>
        <input type="text" class="blend-formgroup-input" placeholder="姓名"/>
    </div>

### 初始化

使用JS来初始化formgroup组件
	
	boost('.blend-formgroup').formgroup({
		validate: true,
		asyn: false,
		validateFunction:function(value, $ele){
			// to do, 此处进行验证相关操作
			return "该字段不能为空"; // 返回需要展示的信息
		}
	});

### 初始化参数说明

	{
		validate: true,		// 是否启用字段验证，默认为false
		asyn: true,			// 是否为异步验证，默认为false
		validateFunction: function(value, $ele, callback){
			/**
			 * value 为当前input的值
			 * $ele 为当前对象实例
			 * callback 为异步验证的回调函数, 如果asyn为false, callback缺省
			 */
			
			$.ajax({
                url: 'http://www.baidu.com/back.php?callback=?',
                data: {
                    value: value
                },
                dataType: 'jsonp',
                success: function (ret) {
                    if (ret.errno == 0) {
                        // your code
                    }
                    else {
                        callback(ret.errMsg);
                    }

                }
            });
			
		}
	}