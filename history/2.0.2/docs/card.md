#卡片

## 基本使用

使用`blend-card`来标识是一个card组件，主要用来实现图文混排的效果。提供两个主要的内部容器`blend-card-img-view`和`blend-card-content-view`，分别用来放置图片和文字内容。 如果你想让整个卡片变成一个可以点击的链接的话，直接将外层的`blend-card`用a标签实现即可。

<style type="text/css">
    .card-demo .blend-card{width:320px;}
    .card-demo{background-color: #eee}
</style>

<div class="doc-demo card-demo">
    <div class="blend-card ">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <p class="blend-card-text">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要</p>

        </div>
    </div>
</div>

    <div class="blend-card ">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <p class="blend-card-text">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要</p>

        </div>
    </div>

## 改变图片的大小

重写`blend-card-img-view`样式来改变图片大小，右侧`blend-card-content-view`内容横向会自动铺满，但是需要手动修改其max-height等图图片高度，保证内容不会超出显示

<div class="doc-demo card-demo">
    <div class="blend-card ">
        <div class="blend-card-img-view" style="width:108px;height:148px;">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <p class="blend-card-text">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要</p>

        </div>
    </div>
</div>

    <div class="blend-card ">
        <div class="blend-card-img-view" style="width:108px;height:148px;">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <p class="blend-card-text">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要</p>
        </div>
    </div>


## 去掉图片

直接去掉`blend-card-img-view`这个DOM节点，就能得到只有文字形式的卡片。

<div class="doc-demo card-demo">
    <div class="blend-card">
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <p class="blend-card-text">摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要</p>

        </div>
    </div>
</div>


## 去掉默认的箭头

在外层DOM上加上`blend-card-no-icon`可以去掉默认的箭头。

<div class="doc-demo card-demo">
    <div class="blend-card">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>
        </div>
    </div>
</div>

    <div class="blend-card">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>
        </div>
    </div>


## 副标题

`blend-card-sub-title`代表副标题，和`blend-card-small-title`同时使用表示小一号的副标题，可以组合使用。

<div class="doc-demo card-demo">
    <div class="blend-card">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">一级副标题</div>
            <div class="blend-card-sub-title blend-card-small-title">二级副标题</div>
        </div>
    </div>
</div>

    <div class="blend-card">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">一级副标题</div>
            <div class="blend-card-sub-title blend-card-small-title">二级副标题</div>
        </div>
    </div>


## 和BoostUI其他组件组合使用

可以在卡片组件中使用其他组件，如下面两个示例。

- 使用星标组件

<div class="doc-demo card-demo">
    <div class="blend-card blend-card-no-icon">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-row my-card-row">
                <div class="blend-star my-star">
                    <i class="blend-star-item selected"></i>
                    <i class="blend-star-item selected"></i>
                    <i class="blend-star-item selected"></i>
                    <i class="blend-star-item selected"></i>
                    <i class="blend-star-item"></i>
                </div>
            </div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>
        </div>
    </div>
</div>


    <div class="blend-card blend-card-no-icon">
        <div class="blend-card-img-view">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-star my-star">
                <i class="blend-star-item selected"></i>
                <i class="blend-star-item selected"></i>
                <i class="blend-star-item selected"></i>
                <i class="blend-star-item selected"></i>
                <i class="blend-star-item"></i>
            </div>
            <div class="blend-card-sub-title">副标题：文字摘要摘要</div>

        </div>
    </div>


- 使用徽标组件

<style type="text/css">
.blend-card-row .my-price{
    color: #f43b3b;
    font-size: 12px;
}

.blend-card-row .my-price em{
    font-size: 20px;
    line-height: 20px;
    font-style: normal;
}

.blend-card-row.my-card-row {
    -webkit-justify-content:flex-start;
    justify-content:flex-start;
}
</style>

<div class="doc-demo card-demo">
    <div class="blend-card " >
        <div class="blend-card-img-view" style="width:108px;height:108px;">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view" style="max-height:108px;">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">辅助信息</div>
            <div class="blend-card-row my-card-row">
                <span class="blend-badge blend-badge-large">在线支付</span>
                <span class="blend-badge blend-badge-large">随订随用</span>
            </div>
            <div class="blend-card-row">
                <div class='blend-card-row-item my-price'><span>￥<em>8400</em> 起/人</span></div>
                <div class='blend-card-row-item'style="font-size:12px;text-decoration:line-through">12345元</div>
            </div>
        </div>
    </div>
</div>

    <style type="text/css">
    .blend-card-row .my-price{
        color: #f43b3b;
        font-size: 12px;
    }

    .blend-card-row .my-price em{
        font-size: 20px;
        line-height: 20px;
        font-style: normal;
    }

    .blend-card-row.my-card-row {
        -webkit-justify-content:flex-start;
        justify-content:flex-start;
    }
    </style>
    <div class="blend-card " >
        <div class="blend-card-img-view" style="width:108px;height:108px;">
            <img src="http://clouda.baidu.com/assets/blend2/images/demo/fruit.jpg">
        </div>
        <div class="blend-card-content-view" style="max-height:108px;">
            <div class="blend-card-title">
                这里是标题
            </div>
            <div class="blend-card-sub-title">辅助信息</div>
            <div class="blend-card-row my-card-row">
                <span class="blend-badge blend-badge-large">在线支付</span>
                <span class="blend-badge blend-badge-large">随订随用</span>
            </div>
            <div class="blend-card-row">
                <div class='blend-card-row-item my-price'><span>￥<em>8400</em> 起/人</span></div>
                <div class='blend-card-row-item'style="font-size:12px;text-decoration:line-through">12345元</div>
            </div>
        </div>
    </div>


## 其他更多示例可以参考具体 [demo页面](/assets/blend2/demo/card.html)
