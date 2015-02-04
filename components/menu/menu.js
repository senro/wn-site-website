/*定义本地组件的模块代码，遵循commonjs规范*/
var $=require('jquery@1.8.3');
var menuItemLength=$('.menu').find('a').length;

module.exports={ length: menuItemLength, name:'menu' };


