(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45d3"],{"0ba6":function(e,a,t){"use strict";t.r(a);var s,r=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"goods"},[s("h2",[e._v("您好，志愿者用户")]),s("van-cell-group",[s("div",{staticClass:"val-task-icon"},[s("img",{attrs:{src:t("c550")}}),e._v("\n      手机\n    ")]),s("van-field",{attrs:{placeholder:"请输入手机号","error-message":e.errorMsg.mobile,error:e.errorSpace.mobile,maxlength:"12"},on:{input:e.inputPhone},model:{value:e.data.phone,callback:function(a){e.$set(e.data,"phone",a)},expression:"data.phone"}}),s("div",{staticClass:"val-task-icon"},[s("img",{attrs:{src:t("facf")}}),e._v("\n      密码\n    ")]),s("van-field",{attrs:{type:"password",placeholder:"请输入密码",maxlength:"18"},model:{value:e.data.pass,callback:function(a){e.$set(e.data,"pass",a)},expression:"data.pass"}})],1),s("div",{staticClass:"van-field__error-message",staticStyle:{"text-align":"center"}},[e._v(e._s(e.errorMsg.subErr))]),s("div",{staticClass:"val-register-href clearfix"},[s("router-link",{attrs:{to:"/register/"}},[e._v("注册")])],1),s("van-button",{attrs:{size:"normal",type:"primary"},on:{click:e.login}},[e._v("登录")])],1)},n=[],o=t("88d8"),i=(t("8fec"),t("7bd9")),u=(t("66b9"),t("b650")),c=(t("81e6"),t("9ffb")),l=(t("4d48"),t("d1e1")),d=(t("be7f"),t("565f")),g=(t("0653"),t("34e9")),p=t("4328"),h=t.n(p);t("0fc4");function m(e,a){var t;a=a||200;return function(){var s=this,r=arguments;clearTimeout(t),t=setTimeout(function(){t=null,e.apply(s,r)},a)}}var v={components:(s={},Object(o["a"])(s,g["a"].name,g["a"]),Object(o["a"])(s,d["a"].name,d["a"]),Object(o["a"])(s,l["a"].name,l["a"]),Object(o["a"])(s,c["a"].name,c["a"]),Object(o["a"])(s,u["a"].name,u["a"]),Object(o["a"])(s,i["a"].name,i["a"]),s),data:function(){return{data:{user:"商户",phone:null,pass:null,code:null,btn:"获取验证码",types:"登录",time:"",disabled:!1},errorMsg:{mobile:"",message:"",pass:"",subErr:""},errorSpace:{mobile:!1}}},methods:{inputPhone:m(function(e,a,t){var s=/^((13|14|15|17|18)[0-9]{1}\d{8})$/,r=this.data.phone,n=this,o=s.test(r);""==r?(n.errorMsg.mobile="",n.errorSpace.mobile=!0):(n.errorSpace.mobile=!1,n.errorMsg.mobile=o?"":"手机号格式错误")},2e3),login:function(){var e=this;null==this.data.phone||null==this.data.pass?this.errorMsg.subErr="账号密码不能为空":(this.errorMsg.subErr="",this.$axios.post("/api/volunteer/login",h.a.stringify({phone:this.data.phone,password:this.data.pass})).then(function(a){if(console.log(a),-1==a.data.resCode)e.errorMsg.subErr="用户名或密码错误";else{sessionStorage.intergral=a.data.resData.intergral,e.$cookies.set("uid",a.data.resData.id,1800);var t=a.data.resData.status;console.log(t),3!=t&&(sessionStorage.duge=5,2==t?sessionStorage.valunum=6:4==t&&(sessionStorage.valunum=7)),0==sessionStorage.duge?sessionStorage.valunum=0:1==sessionStorage.duge?sessionStorage.valunum=4:5==sessionStorage.duge?sessionStorage.valunum=5:sessionStorage.valunum=3,e.$emit("login",a.data.resData.id),e.$router.push({name:"loginsuc",query:e.data})}}).catch(function(e){console.log(e)}))},goBack:function(){window.history.length>1?this.$router.go(-1):this.$router.push("/")}}},f=v,b=(t("9b08"),t("2877"));t.d(a,"_debounce",function(){return m});var S=Object(b["a"])(f,r,n,!1,null,"311f999e",null);S.options.__file="index.vue";a["default"]=S.exports},"0fc4":function(e,a,t){"use strict";t("cadf"),t("551c"),t("097d");var s=t("8ded"),r=t.n(s),n=t("ee7c"),o=t.n(n);r.a.addPlugin(o.a)},"3d89":function(e,a,t){},"9b08":function(e,a,t){"use strict";var s=t("3d89"),r=t.n(s);r.a},ee7c:function(e,a){var t="expire_mixin";function s(){var e=this.createStore(this.storage,null,this._namespacePrefix+t);return{set:a,get:s,remove:r,getExpiration:n,removeExpiredKeys:o};function a(a,s,r,n){return this.hasNamespace(t)||e.set(s,n),a()}function s(e,a){return this.hasNamespace(t)||i.call(this,a),e()}function r(a,s){return this.hasNamespace(t)||e.remove(s),a()}function n(a,t){return e.get(t)}function o(e){var a=[];this.each(function(e,t){a.push(t)});for(var t=0;t<a.length;t++)i.call(this,a[t])}function i(a){var t=e.get(a,Number.MAX_VALUE);t<=(new Date).getTime()&&(this.raw.remove(a),e.remove(a))}}e.exports=s}}]);
//# sourceMappingURL=chunk-45d3.adab63ee.js.map