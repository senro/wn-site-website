/*组件别名自动生成，本地模块：用【模块名】(即模块的目录名)做别名；安装模块：用【模块名@版本号】做别名*/
require.config({
	 alias:
	  __COMPONENTS_ALIAS__ 
});

/*组件初始化标签根据情况也可不写*/
__COMPONENTS_INIT__

/*自定义的js，遵循commonjs规范，即像写nodejs一样即可*/
var $=require('jquery@1.8.3');

console.log($('.bg').length);