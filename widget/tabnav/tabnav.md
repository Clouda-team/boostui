# 标签导航

在相应的元素上增加 `.blend-tabnav`, 表明这是一个标签导航组件。在对应的a标签增加`blend-tabnav-item-active` 表明是当前所在链接

<div class='doc-demo'>
	<nav data-blend-widget="tabnav" class="blend-tabnav" style="margin-bottom: 20px;">
	   	<a class="blend-tabnav-item blend-tabnav-item-active" href="#">
	        <span class="blend-tabnav-item-text">链接1</span>
	    </a>
	    <a class="blend-tabnav-item" href="#">
	        <span class="blend-tabnav-item-text">链接2</span>
	    </a>
	    <a class="blend-tabnav-item" href="#">
	        <span class="blend-tabnav-item-text">链接3</span>
	    </a>
	</nav>
</div>


	<nav data-blend-widget="tabnav" class="blend-tabnav">
		<a class="blend-tabnav-item blend-tabnav-item-active" href="#">
			<span class="blend-tabnav-item-text">链接1</span>
		</a>
		<a class="blend-tabnav-item" href="#">
			<span class="blend-tabnav-item-text">链接2</span>
		</a>
		<a class="blend-tabnav-item" href="#">
			<span class="blend-tabnav-item-text">链接3</span>
		</a>
	</nav>

## 分割线

在外层dom增加 `.blend-tabnav-dash`, 使用短横线分割。

<div class='doc-demo'>
	<nav data-blend-widget="tabnav" class="blend-tabnav blend-tabnav-dash" style="margin-bottom: 20px;">
	   	<a class="blend-tabnav-item blend-tabnav-item-active" href="#">
	        <span class="blend-tabnav-item-text">链接1</span>
	    </a>
	    <a class="blend-tabnav-item" href="#">
	        <span class="blend-tabnav-item-text">链接2</span>
	    </a>
	    <a class="blend-tabnav-item" href="#">
	        <span class="blend-tabnav-item-text">链接3</span>
	    </a>
	</nav>
</div>


	<nav data-blend-widget="tabnav" class="blend-tabnav blend-tabnav-dash">
		<a class="blend-tabnav-item blend-tabnav-item-active" href="#">
			<span class="blend-tabnav-item-text">链接1</span>
		</a>
		<a class="blend-tabnav-item" href="#">
			<span class="blend-tabnav-item-text">链接2</span>
		</a>
		<a class="blend-tabnav-item" href="#">
			<span class="blend-tabnav-item-text">链接3</span>
		</a>
	</nav>