#顶部导航

在相应的元素上增加 `.blend-topnav`, 表明这是一个分级导航组件。在导航外层元素上添加`.blend-topnav-item`,下边的ul是该元素的子导航。

<div class='doc-demo' style="position:relative; z-index:2;">
    <nav id="topnav" class="blend-topnav" style="display: block;">
        <div class="blend-topnav-item">
            <span>一级导航1</span>
            <ul>
                <li><a href="#">二级导航1</a></li>
                <li><a href="#">二级导航2</a></li>
                <li><a href="#">二级导航3</a></li>
            </ul>
        </div>
        <div class="blend-topnav-item">
            <span>一级导航2</span>
        </div>
        <div class="blend-topnav-item">
            <span>一级导航3</span>
            <ul>
                <li><a href="#">二级导航1</a></li>
                <li><a href="#">二级导航2</a></li>
            </ul>
        </div>
    </nav>
</div>
<script type="text/javascript">
    ;(function(){
        boost("#topnav").topnav({
        });
    })();
</script>

##HTML结构

	<nav id="topnav" class="blend-topnav">
        <div class="blend-topnav-item">
            <span>一级导航1</span>
            <ul>
                <li><a href="#">二级导航1</a></li>
                <li><a href="#">二级导航2</a></li>
                <li><a href="#">二级导航3</a></li>
            </ul>
        </div>
        <div class="blend-topnav-item">
            <span>一级导航2</span>
        </div>
        <div class="blend-topnav-item">
            <span>一级导航3</span>
            <ul>
                <li><a href="#">二级导航1</a></li>
                <li><a href="#">二级导航2</a></li>
            </ul>
        </div>
    </nav>
    <br>
    <script type="text/javascript">
        $("#topnav").topnav({
			defaultIcon: true
		}); 
    </script>

###初始化参数说明

	{
       defaultIcon: true //true表示显示三角的icon，false表示不显示。默认为true
    }