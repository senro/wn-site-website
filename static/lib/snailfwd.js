
var require,define;

(function(){
    var factoryMap={},
        modulesMap={},
        config,
        hasLoad={};
    Array.prototype.distinct = function(){
        var newArr=[],obj={};
        for(var i=0,len=this.length;i<len;i++){
            if(!obj[typeof(this[i]) + this[i]]){
                newArr.push(this[i]);
                obj[typeof(this[i])+this[i]]='new';
            }
        }
        return newArr;
    };
    function log(str){
        (function() {
            var method;
            var noop = function () {};
            var methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ];
            var length = methods.length;
            var console = (window.console = window.console || {});

            while (length--) {
                method = methods[length];

                // Only stub undefined methods.
                if (!console[method]) {
                    console[method] = noop;
                }
            }
        }());

        console && console.log(str);
    }//console end

    define=function(id,factory){
        //id即可以找到该脚本的标识符，factory即该脚本对应的回调函数，同时该factory有（require,exports,module）三个参数返回，其中exports是module的一个属性
        factoryMap[id]=factory;
    };
    require=function(id){
        if(require.config.alias[id]){
            id=require.config.alias[id];
        }
        if(/\.css/g.test(id)){
            log('find css module:'+id+',ignore it!');
            return false;
        }
        var mod=modulesMap[id];
        if (mod) {
            return mod.exports;
        }
        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            log('Cannot find module `' + id + '`');
        }

        mod = modulesMap[id] = {
            'exports': {}
        };

        var ret = (typeof factory == 'function')
            ? factory.apply(mod, [require, mod.exports, mod])
            : factory;

        if (ret) {
            mod.exports = ret;
        }

        return mod.exports;

    };
    require.config=function(obj){
        require.config=obj;
    };
    require.async=function(names,callbacks){
        if(typeof names =='string'){
            names=[names];
        }
        for(var i=0;i<names.length;i++){
            var name=names[i];
            if(require.config.alias[name]){
                name=require.config.alias[name];
            }
            loadScript(require.config.base+name, callbacks[i]);
        }
    };
    function findDeps(name){
        var deps=[];
        if(require.config.deps[name]){
            deps=deps.concat(require.config.deps[name]);

            for(var i=0;i<deps.length;i++){
                var depName=deps[i];
                if(require.config.alias[depName]){
                    deps=deps.concat(findDeps(require.config.alias[depName]));
                }else{
                    log('can\'t find '+depName+' \' alias!');
                }
            }
        }else{
            return deps;
        }
        return deps;
    }
    function loadScript(url,name,callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback(name);
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function () {
                callback&&callback(name);
            };
        }
        script.src = url;
        document.body.appendChild(script);
    }
})();
