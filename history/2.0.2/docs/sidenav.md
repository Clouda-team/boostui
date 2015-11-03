#侧栏导航

##基本使用
在要应用策兰导航样式的外层元素上添加样式`blend-sidenav`，在导航元素上添加样式`blend-sidenav-nav`，并在切换内容的元素上添加样式`blend-sidenav-content`。

##使用演示

<div class="doc-demo">
    <div id="sidenav" class="blend-sidenav" style="overflow:hidden;">
        <nav class="blend-sidenav-nav" style="position:static; float:left;">
        	<ul>
            	<li>侧栏导航1</li>
                <li>侧栏导航2</li> 
        	    <li>侧栏导航3</li>
        	    <li>侧栏导航4</li>
        	</ul>
        </nav>
        <section class="blend-sidenav-content">
            <div class="blend-sidenav-item">导航内容1</div>
            <div class="blend-sidenav-item">导航内容2</div>
            <div class="blend-sidenav-item">导航内容3</div>
            <div class="blend-sidenav-item">导航内容4</div>
        </section>
    </div>
</div>
<style type="text/css">
    .blend-sidenav-content{
        margin-left: 0;
        float:left;width: 300px;
        height: 164px;
    }
    .blend-sidenav-item{
        font-size: 24px;
        text-align: center;
        height: 164px;
        line-height:164px;
    }
    .blend-sidenav-item:nth-child(even){
        background: #F7EDDE;
    }
    .blend-sidenav-item:nth-child(odd){
        background: #bbb;
    }
</style>
<script type="text/javascript">
    boost("#sidenav").sidenav({});
</script>

##HTML结构

    <div id="sidenav" class="blend-sidenav">
        <nav class="blend-sidenav-nav">
        	<ul>
            	<li><a href="#">侧栏导航1</a></li>
                <li>侧栏导航2</li> 
        	    <li>侧栏导航3</li>
        	    <li>侧栏导航4</li>
        	</ul>
        </nav>
        <section class="blend-sidenav-content">
            <div class="blend-sidenav-item">导航内容1</div>
            <div class="blend-sidenav-item">导航内容2</div>
            <div class="blend-sidenav-item">导航内容3</div>
            <div class="blend-sidenav-item">导航内容4</div>
        </section>
    </div>
    <script type="text/javascript">
        $("#sidenav").sidenav({});
    </script>