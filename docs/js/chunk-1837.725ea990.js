(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1837"],{ab97:function(e,a,t){"use strict";t.r(a);var r,s=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"goods"},[r("h2",[e._v("注册志愿者")]),r("van-cell-group",[r("div",{staticClass:"val-task-icon"},[r("img",{attrs:{src:t("c550")}}),e._v("\n      手机\n    ")]),r("van-field",{attrs:{placeholder:"请输入手机号","error-message":e.errorMsg.mobile,error:e.errorSpace.mobile,maxlength:"12"},on:{input:e.inputPhone},model:{value:e.data.phone,callback:function(a){e.$set(e.data,"phone",a)},expression:"data.phone"}}),r("div",{staticClass:"val-task-icon"},[r("img",{attrs:{src:t("facf")}}),e._v("\n      密码\n    ")]),r("van-field",{attrs:{type:"password",placeholder:"请输入密码",maxlength:"18"},model:{value:e.data.pass,callback:function(a){e.$set(e.data,"pass",a)},expression:"data.pass"}})],1),r("div",{staticClass:"van-field__error-message",staticStyle:{"text-align":"center"}},[e._v(e._s(e.errorMsg.subErr))]),r("van-button",{attrs:{size:"normal",type:"primary"},on:{click:e.register}},[e._v("注册")])],1)},n=[],o=t("88d8"),i=(t("8fec"),t("7bd9")),d=(t("66b9"),t("b650")),l=(t("81e6"),t("9ffb")),c=(t("4d48"),t("d1e1")),u=(t("be7f"),t("565f")),p=(t("0653"),t("34e9")),m=(t("cadf"),t("551c"),t("097d"),t("4328")),b=t.n(m);function h(e,a){var t;a=a||200;return function(){var r=this,s=arguments;clearTimeout(t),t=setTimeout(function(){t=null,e.apply(r,s)},a)}}var v={components:(r={},Object(o["a"])(r,p["a"].name,p["a"]),Object(o["a"])(r,u["a"].name,u["a"]),Object(o["a"])(r,c["a"].name,c["a"]),Object(o["a"])(r,l["a"].name,l["a"]),Object(o["a"])(r,d["a"].name,d["a"]),Object(o["a"])(r,i["a"].name,i["a"]),r),data:function(){return{data:{user:"商户",phone:null,pass:null,code:null,btn:"获取验证码",types:"注册",time:"",determine:!1,determines:!1,disabled:!1},errorMsg:{mobile:"",message:"",pass:"",subErr:""},errorSpace:{mobile:!1}}},methods:{inputPhone:h(function(e,a,t){var r=/^((13|14|15|17|18)[0-9]{1}\d{8})$/,s=this.data.phone,n=this;console.log(s),n.data.determine=!1;var o=r.test(s);""==s?(n.errorMsg.mobile="",n.errorSpace.mobile=!0):(n.errorSpace.mobile=!1,o?(n.data.determine=!0,n.errorMsg.mobile=""):n.errorMsg.mobile="手机号格式错误"),console.log(this.data.determine)},2e3),sendPhone:function(){var e=this;e.data.disabled=!0,e.data.time=60;var a=setInterval(function(){e.data.time--,0==e.data.time?(e.data.btn="获取验证码",e.data.disabled=!1,clearInterval(a)):(e.data.btn="重新发送"+e.data.time,e.data.disabled=!0)},1e3)},register:function(){var e=this;0==this.data.determine||void 0==this.data.phone||void 0==this.data.pass?this.errorMsg.subErr="账号密码不能为空":(this.errorMsg.subErr="",this.$axios.post("/api/volunteer/register",b.a.stringify({phone:this.data.phone,password:this.data.pass})).then(function(a){console.log(a),sessionStorage.valunum=-2;e.data.phone;var t=e.data.time,r=a.data.resCode,s=a.data.resMessage;e.errorMsg.subErr=s,e.errorMsg.message=t<0?"验证码已过期，请重新验证":"",console.log(r),1==r&&e.$router.push({name:"loginsuc",query:e.data})}).catch(function(e){console.log(e)}))}}},g=v,f=(t("e53a"),t("2877"));t.d(a,"_debounce",function(){return h});var _=Object(f["a"])(g,s,n,!1,null,"431babe5",null);_.options.__file="index.vue";a["default"]=_.exports},c15b:function(e,a,t){},e53a:function(e,a,t){"use strict";var r=t("c15b"),s=t.n(r);s.a}}]);
//# sourceMappingURL=chunk-1837.725ea990.js.map