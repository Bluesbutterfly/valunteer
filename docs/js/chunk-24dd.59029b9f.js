(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24dd"],{"023d":function(t,e,i){"use strict";var n=i("a142");e["a"]={getScrollEventTarget:function(t,e){void 0===e&&(e=window);var i=t;while(i&&"HTML"!==i.tagName&&"BODY"!==i.tagName&&1===i.nodeType&&i!==e){var n=this.getComputedStyle(i).overflowY;if("scroll"===n||"auto"===n)return i;i=i.parentNode}return e},getScrollTop:function(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset},setScrollTop:function(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)},getElementTop:function(t){return(t===window?0:t.getBoundingClientRect().top)+this.getScrollTop(window)},getVisibleHeight:function(t){return t===window?t.innerHeight:t.getBoundingClientRect().height},getComputedStyle:!n["e"]&&document.defaultView.getComputedStyle.bind(document.defaultView)}},"092f":function(t,e,i){},"1bd8":function(t,e,i){},"20fb":function(t,e,i){"use strict";var n=i("fe7e");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[i("button",{class:t.b("minus",{disabled:t.minusDisabled}),on:{click:function(e){t.onChange("minus")}}}),i("input",{class:t.b("input"),attrs:{type:"number",disabled:t.disabled||t.disableInput},domProps:{value:t.currentValue},on:{input:t.onInput,blur:t.onBlur}}),i("button",{class:t.b("plus",{disabled:t.plusDisabled}),on:{click:function(e){t.onChange("plus")}}})])},name:"stepper",props:{value:null,integer:Boolean,disabled:Boolean,disableInput:Boolean,min:{type:[String,Number],default:1},max:{type:[String,Number],default:1/0},step:{type:[String,Number],default:1},defaultValue:{type:[String,Number],default:1}},data:function(){var t=this.range(this.isDef(this.value)?this.value:this.defaultValue);return t!==+this.value&&this.$emit("input",t),{currentValue:t}},computed:{minusDisabled:function(){return this.disabled||this.currentValue<=this.min},plusDisabled:function(){return this.disabled||this.currentValue>=this.max}},watch:{value:function(t){t!==this.currentValue&&(this.currentValue=this.format(t))},currentValue:function(t){this.$emit("input",t),this.$emit("change",t)}},methods:{format:function(t){return t=String(t).replace(/[^0-9\.-]/g,""),""===t?0:this.integer?Math.floor(t):+t},range:function(t){return Math.max(Math.min(this.max,this.format(t)),this.min)},onInput:function(t){var e=t.target.value,i=this.format(e);+e!==i&&(t.target.value=i),this.currentValue=i},onChange:function(t){if(this[t+"Disabled"])this.$emit("overlimit",t);else{var e="minus"===t?-this.step:+this.step,i=Math.round(100*(this.currentValue+e))/100;this.currentValue=this.range(i),this.$emit(t)}},onBlur:function(t){this.currentValue=this.range(this.currentValue),this.$emit("blur",t)}}})},"214f":function(t,e,i){"use strict";var n=i("32e9"),s=i("2aba"),a=i("79e5"),o=i("be13"),r=i("2b4c");t.exports=function(t,e,i){var c=r(t),u=i(o,c,""[t]),l=u[0],h=u[1];a(function(){var e={};return e[c]=function(){return 7},7!=""[t](e)})&&(s(String.prototype,t,l),n(RegExp.prototype,c,2==e?function(t,e){return h.call(t,this,e)}:function(t){return h.call(t,this)}))}},"28a5":function(t,e,i){i("214f")("split",2,function(t,e,n){"use strict";var s=i("aae3"),a=n,o=[].push,r="split",c="length",u="lastIndex";if("c"=="abbc"[r](/(b)*/)[1]||4!="test"[r](/(?:)/,-1)[c]||2!="ab"[r](/(?:ab)*/)[c]||4!="."[r](/(.?)(.?)/)[c]||"."[r](/()()/)[c]>1||""[r](/.?/)[c]){var l=void 0===/()??/.exec("")[1];n=function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!s(t))return a.call(i,t,e);var n,r,h,d,f,p=[],v=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,b=void 0===e?4294967295:e>>>0,g=new RegExp(t.source,v+"g");l||(n=new RegExp("^"+g.source+"$(?!\\s)",v));while(r=g.exec(i)){if(h=r.index+r[0][c],h>m&&(p.push(i.slice(m,r.index)),!l&&r[c]>1&&r[0].replace(n,function(){for(f=1;f<arguments[c]-2;f++)void 0===arguments[f]&&(r[f]=void 0)}),r[c]>1&&r.index<i[c]&&o.apply(p,r.slice(1)),d=r[0][c],m=h,p[c]>=b))break;g[u]===r.index&&g[u]++}return m===i[c]?!d&&g.test("")||p.push(""):p.push(i.slice(m)),p[c]>b?p.slice(0,b):p}}else"0"[r](void 0,0)[c]&&(n=function(t,e){return void 0===t&&0===e?[]:a.call(this,t,e)});return[function(i,s){var a=t(this),o=void 0==i?void 0:i[e];return void 0!==o?o.call(i,a,s):n.call(String(a),i,s)},n]})},2994:function(t,e,i){"use strict";i("5548"),i("f6ab"),i("1bd8")},"2bb1":function(t,e,i){"use strict";var n=i("fe7e");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b(),style:t.style},[t._t("default")],2)},name:"swipe-item",data:function(){return{offset:0}},computed:{style:function(){var t=this.$parent,e=t.vertical,i=t.computedWidth,n=t.computedHeight;return{width:i+"px",height:e?n+"px":"100%",transform:"translate"+(e?"Y":"X")+"("+this.offset+"px)"}}},beforeCreate:function(){this.$parent.swipes.push(this)},destroyed:function(){this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)}})},"2bdd":function(t,e,i){"use strict";var n=i("fe7e"),s=i("023d"),a=i("db78");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[t._t("default"),i("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],class:t.b("loading")},[t._t("loading",[i("loading"),i("span",{class:t.b("loading-text")},[t._v(t._s(t.loadingText||t.$t("loadingTip")))])])],2)],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300},loadingText:String},mounted:function(){this.scroller=s["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var t=this.$el,e=this.scroller,i=s["a"].getVisibleHeight(e);if(i&&"none"!==s["a"].getComputedStyle(t).display&&null!==t.offsetParent){var n=s["a"].getScrollTop(e),a=n+i,o=!1;if(t===e)o=e.scrollHeight-a<this.offset;else{var r=s["a"].getElementTop(t)-s["a"].getElementTop(e)+s["a"].getVisibleHeight(t);o=r-i<this.offset}o&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(t){this.binded!==t&&(this.binded=t,(t?a["b"]:a["a"])(this.scroller,"scroll",this.check))}}})},3875:function(t,e,i){"use strict";e["a"]={methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var e=t.touches[0];this.deltaX=e.clientX-this.startX,this.deltaY=e.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.offsetX>this.offsetY?"horizontal":this.offsetX<this.offsetY?"vertical":""},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0}}}},"4b0a":function(t,e,i){"use strict";i("5548"),i("f6ab")},5246:function(t,e,i){"use strict";i("5548"),i("f6ab"),i("7d36")},5596:function(t,e,i){"use strict";var n=i("fe7e"),s=i("3875"),a=i("db78");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[i("div",{class:t.b("track"),style:t.trackStyle,on:{touchstart:t.onTouchStart,touchmove:t.onTouchMove,touchend:t.onTouchEnd,touchcancel:t.onTouchEnd,transitionend:function(e){t.$emit("change",t.activeIndicator)}}},[t._t("default")],2),t.showIndicators&&t.count>1?i("div",{class:t.b("indicators",{vertical:t.vertical})},t._l(t.count,function(e){return i("i",{class:t.b("indicator",{active:e-1===t.activeIndicator})})})):t._e()])},name:"swipe",mixins:[s["a"]],props:{autoplay:Number,vertical:Boolean,width:{type:Number,default:0},height:{type:Number,default:0},loop:{type:Boolean,default:!0},touchable:{type:Boolean,default:!0},initialSwipe:{type:Number,default:0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{computedWidth:0,computedHeight:0,offset:0,active:0,deltaX:0,deltaY:0,swipes:[],swiping:!1}},mounted:function(){this.initialize(),this.$isServer||Object(a["b"])(window,"resize",this.onResize,!0)},destroyed:function(){this.clear(),this.$isServer||Object(a["a"])(window,"resize",this.onResize,!0)},watch:{swipes:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t?this.autoPlay():this.clear()}},computed:{count:function(){return this.swipes.length},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},trackStyle:function(){var t;return t={},t[this.vertical?"height":"width"]=this.trackSize+"px",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t}},methods:{initialize:function(t){if(void 0===t&&(t=this.initialSwipe),clearTimeout(this.timer),this.$el){var e=this.$el.getBoundingClientRect();this.computedWidth=this.width||e.width,this.computedHeight=this.height||e.height}this.swiping=!0,this.active=t,this.offset=this.count>1?-this.size*this.active:0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onResize:function(){this.initialize(this.activeIndicator)},onTouchStart:function(t){this.touchable&&(this.clear(),this.swiping=!0,this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&(this.touchMove(t),(this.vertical&&"vertical"===this.direction||"horizontal"===this.direction)&&(t.preventDefault(),t.stopPropagation(),this.move(0,Math.min(Math.max(this.delta,-this.size),this.size))))},onTouchEnd:function(){if(this.touchable){if(this.delta){var t=this.vertical?this.offsetY:this.offsetX;this.move(t>50?this.delta>0?-1:1:0),this.swiping=!1}this.autoPlay()}},move:function(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var i=this.delta,n=this.active,s=this.count,a=this.swipes,o=this.trackSize,r=0===n,c=n===s-1,u=!this.loop&&(r&&(e>0||t<0)||c&&(e<0||t>0));u||s<=1||(a[0].offset=c&&(i<0||t>0)?o:0,a[s-1].offset=r&&(i>0||t<0)?-o:0,t&&n+t>=-1&&n+t<=s&&(this.active+=t),this.offset=e-this.active*this.size)},swipeTo:function(t){var e=this;this.swiping=!0,this.correctPosition(),setTimeout(function(){e.swiping=!1,e.move(t%e.count-e.active)},30)},correctPosition:function(){this.active<=-1&&this.move(this.count),this.active>=this.count&&this.move(-this.count)},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,e=this.autoplay;e&&this.count>1&&(this.clear(),this.timer=setTimeout(function(){t.swiping=!0,t.resetTouchStatus(),t.correctPosition(),setTimeout(function(){t.swiping=!1,t.move(1),t.autoPlay()},30)},e))}}})},"55ff":function(t,e,i){},"64a6":function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"item-bg"},[i("van-cell-group",[i("van-card",{attrs:{title:t.goodsName,desc:"积分："+t.price,num:t.value,thumb:t.picImg}}),i("div",{staticClass:"van-buyer"},[t._v("\n                购买人："),i("span",[t._v(t._s(t.volName))])]),i("div",{staticClass:"van-caler-num"},[t._v("\n                共"),i("span",[t._v(t._s(t.value))]),t._v("件商品  小计："),i("span",{staticClass:"van-calcu-num"},[t._v(t._s(t.totalPrice))])]),i("div",{staticClass:"van-saomiao-btn"},[i("van-button",{attrs:{type:"primary"},on:{click:t.sureSell}},[t._v("\n                    确认卖出\n                ")]),t._v("    \n                "),i("van-button",{attrs:{type:"primary"},on:{click:t.cancel}},[t._v("\n                    取消\n                ")])],1)],1)],1)])},a=[],o=(i("28a5"),i("88d8")),r=(i("0653"),i("34e9")),c=(i("5246"),i("6b41")),u=(i("9cb7"),i("66fd")),l=(i("2994"),i("2bdd")),h=(i("c194"),i("7744")),d=(i("4b0a"),i("2bb1")),f=(i("7844"),i("5596")),p=(i("66b9"),i("b650")),v=(i("c3a6"),i("ad06")),m=(i("f06a"),i("20fb")),b=(i("81e6"),i("9ffb")),g=(i("4d48"),i("d1e1")),w=(i("cadf"),i("551c"),i("097d"),i("1157"),i("c1df")),_=i.n(w),y=i("4328"),S=i.n(y),x={components:(n={},Object(o["a"])(n,g["a"].name,g["a"]),Object(o["a"])(n,b["a"].name,b["a"]),Object(o["a"])(n,m["a"].name,m["a"]),Object(o["a"])(n,v["a"].name,v["a"]),Object(o["a"])(n,p["a"].name,p["a"]),Object(o["a"])(n,f["a"].name,f["a"]),Object(o["a"])(n,d["a"].name,d["a"]),Object(o["a"])(n,h["a"].name,h["a"]),Object(o["a"])(n,l["a"].name,l["a"]),Object(o["a"])(n,u["a"].name,u["a"]),Object(o["a"])(n,c["a"].name,c["a"]),Object(o["a"])(n,r["a"].name,r["a"]),n),data:function(){return{value:0,price:0,goodsName:null,shopName:null,address:null,intergral:null,goodsObj:null,volName:null,totalPrice:null,picImg:null,orderId:0}},mounted:function(){var t=this,e=window.location.href.split("=")[1];this.orderId=e,this.$axios.get("/api/order/orderConfirm?orderId="+e).then(function(e){var i=e.data.resData;t.picImg="http://47.99.140.207:8081/"+i.picture,t.value=i.goodsCount,t.goodsName=i.goodsName,t.price=i.price,t.volName=i.volName,t.totalPrice=i.totalPrice})},methods:{sureSell:function(){var t=this;this.$axios.post("/api/order/orderStatus",S.a.stringify({orderId:this.orderId})).then(function(e){console.log(e),-1==e.data.resCode?alert(e.data.resMessage):(e=e.data.resData,console.log(e.tradeHour),sessionStorage.resResult=e[0],sessionStorage.resinger=e.ingegral,sessionStorage.resrecode=e.tradeWay,sessionStorage.goodsName=e.goodsName,sessionStorage.orderId=e.orderId,sessionStorage.restime=new Date(_()(e.tradeHour)).getFullYear()+"-"+new Date(_()(e.tradeHour)).getMonth()+"-"+new Date(_()(e.tradeHour)).getDate()+" "+new Date(_()(e.tradeHour)).getHours()+":"+new Date(_()(e.tradeHour)).getMinutes()+":"+new Date(_()(e.tradeHour)).getSeconds(),t.$router.push({name:"suc",query:e.resData}))})},cancel:function(){this.$router.push({name:"service"})}}},T=x,$=(i("c778"),i("2877")),k=Object($["a"])(T,s,a,!1,null,"ff96e852",null);k.options.__file="index.vue";e["default"]=k.exports},"66fd":function(t,e,i){"use strict";var n=i("fe7e");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b({center:t.centered})},[i("div",{class:t.b("thumb")},[t._t("thumb",[i("img",{class:t.b("img"),attrs:{src:t.thumb}})])],2),i("div",{class:t.b("content")},[t._t("title",[t.title||t.isDef(t.price)?i("div",{class:t.b("row")},[t.title?i("div",{class:t.b("title")},[t._v(t._s(t.title))]):t._e(),t.isDef(t.price)?i("div",{class:t.b("price")},[t._v(t._s(t.currency)+" "+t._s(t.price))]):t._e()]):t._e()]),t._t("desc",[t.desc||t.isDef(t.num)?i("div",{class:t.b("row")},[t.desc?i("div",{class:t.b("desc")},[t._v(t._s(t.desc))]):t._e(),t.isDef(t.num)?i("div",{class:t.b("num")},[t._v("x "+t._s(t.num))]):t._e()]):t._e()]),t._t("tags")],2),t.$slots.footer?i("div",{class:t.b("footer")},[t._t("footer")],2):t._e()])},name:"card",props:{thumb:String,title:String,desc:String,centered:Boolean,num:[Number,String],price:[Number,String],currency:{type:String,default:"¥"}}})},"6b41":function(t,e,i){"use strict";var n=i("fe7e");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"van-hairline--bottom",class:t.b({fixed:t.fixed}),style:t.style},[i("div",{class:t.b("left"),on:{click:function(e){t.$emit("click-left")}}},[t._t("left",[t.leftArrow?i("icon",{class:t.b("arrow"),attrs:{name:"arrow"}}):t._e(),t.leftText?i("span",{class:t.b("text"),domProps:{textContent:t._s(t.leftText)}}):t._e()])],2),i("div",{staticClass:"van-ellipsis",class:t.b("title")},[t._t("title",[t._v(t._s(t.title))])],2),i("div",{class:t.b("right"),on:{click:function(e){t.$emit("click-right")}}},[t._t("right",[t.rightText?i("span",{class:t.b("text"),domProps:{textContent:t._s(t.rightText)}}):t._e()])],2)])},name:"nav-bar",props:{title:String,leftText:String,rightText:String,leftArrow:Boolean,fixed:Boolean,zIndex:{type:Number,default:1}},computed:{style:function(){return{zIndex:this.zIndex}}}})},7844:function(t,e,i){"use strict";i("5548"),i("f6ab"),i("55ff")},"7d36":function(t,e,i){},8285:function(t,e,i){},"9cb7":function(t,e,i){"use strict";i("5548"),i("f6ab"),i("8285")},aae3:function(t,e,i){var n=i("d3f4"),s=i("2d95"),a=i("2b4c")("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==s(t))}},b441:function(t,e,i){},c194:function(t,e,i){"use strict";i("5548"),i("f6ab")},c778:function(t,e,i){"use strict";var n=i("092f"),s=i.n(n);s.a},db78:function(t,e,i){"use strict";i.d(e,"b",function(){return o}),i.d(e,"a",function(){return r});var n=i("a142"),s=!1;if(!n["e"])try{var a={};Object.defineProperty(a,"passive",{get:function(){s=!0}}),window.addEventListener("test-passive",null,a)}catch(t){}function o(t,e,i,a){void 0===a&&(a=!1),!n["e"]&&t.addEventListener(e,i,!!s&&{capture:!1,passive:a})}function r(t,e,i){!n["e"]&&t.removeEventListener(e,i)}},f06a:function(t,e,i){"use strict";i("5548"),i("f6ab"),i("b441")}}]);
//# sourceMappingURL=chunk-24dd.59029b9f.js.map