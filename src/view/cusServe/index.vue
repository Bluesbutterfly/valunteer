<template>
    <div class="contain">
        <!--<van-nav-bar-->
                <!--title="商户服务"-->
        <!--/>-->
        <van-cell class="van-cell-bg">
            <div class="van-serve-bg">
                <img src="../../static/images/bg_shanghu.png">
                <div>
                    <p>{{ shopName }}</p>
                    <p>{{ shopPhone }}</p>
                    <p>商户端账号</p>
                </div>
            </div>
        </van-cell>
        <van-cell-group>
            <div class="van-cell" v-on:click="sys_click">
                <div class="van-do-img">
                    <img src="../../static/images/icon_shaoma.png" class="van-cell__left-icon">
                </div>
                <div class="van-cell__title"><span>扫码收款</span></div>
                <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            </div>
            <router-link  to="/find/">
                <div class="van-cell">
                    <div class="van-do-img">
                        <img src="../../static/images/icon_chaxun.png" class="van-cell__left-icon">
                    </div>
                    <div class="van-cell__title"><span>兑换查询</span></div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                </div>
            </router-link>
            <!--<van-uploader :after-read="onRead">-->
                <!--<div class="van-cell">-->
                    <!--<div class="van-do-img">-->
                        <!--<img src="../../static/images/icon_zhaopian.png" class="van-cell__left-icon">-->
                    <!--</div>-->
                    <!--<div class="van-cell__title"><span>上传照片</span></div>-->
                    <!--<i class="van-icon van-icon-arrow van-cell__right-icon"></i>-->
                <!--</div>-->
            <!--</van-uploader>-->
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem,Uploader } from 'vant';
    import wx from 'weixin-js-sdk';
    import $ from 'jquery';
    import qs from 'qs';
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Stepper.name]: Stepper,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Uploader.name]: Uploader,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                value:1,
                shopPhone:null,
                shopName:null
            };
        },
        methods:{
            sys_click : function()
            {
                this.$axios.post("/api/shop/token",qs.stringify({ "location":window.location.href.split("#")[0] }))
                    .then(data => {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.data.resData.appId, // 必填，公众号的唯一标识
                            timestamp: data.data.resData.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.data.resData.nonce, // 必填，生成签名的随机串
                            signature: data.data.resData.signature,// 必填，签名，见附录1
                            jsApiList: [
                                'checkJsApi',
                                'startRecord',
                                'stopRecord',
                                'translateVoice',
                                'scanQRCode',// 微信扫一扫接口
                                'openCard'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        })
                        wx.error(function(res) {
                            alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                        });
                        wx.ready(function() {
                            wx.checkJsApi({
                                jsApiList : ['scanQRCode'],
                                success : function(res) {
                                    console.log("接口处理成功验证")
                                }
                            });
                        });
                        wx.scanQRCode({
                            needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType : [ "qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success : function(res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                // alert("扫描结果："+result)
                                window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                            },
                            error : function(){
                                console.log("扫描失败")
                            }
                        });

                    })
            }
        },
        beforeMount:function () {
            let cid = this.$cookies.get("cid"),
                shopName = this.$cookies.get("shopName"),
                shopPhone = this.$cookies.get("shopPhone")
                // busPhone = this.$cookies.get("busPhone")
            this.shopName = shopName
            this.shopPhone = shopPhone
            // alert(cid)
            if (!cid){
                this.$router.push({name:'logins'})
            }else {
                this.$router.push({name:'service'})
            }
            // this.$axios.post("/api/loginStatus/userStatus",qs.stringify({ "userStatus":2,"phone":busPhone })).then(res=>{
            //
            // })
        }
    }
</script>

<style lang="less" scoped>
p{
    margin: 0;
}
.contain{
    min-height: 100vh;
    background-color: #fff;
}
.van{
    /*标题字体*/
    /deep/ &-nav-bar__title{
        font-size: .4rem;
    }
    /deep/  &-nav-bar &-icon{
        color: #666;
    }
    &-cell-bg{
        padding: .4rem;
    }
    &-cell-bg::after{
        border: 0;
    }
    &-cell:not(:last-child)::after{
        border-bottom-width: .02rem;
    }
    &-cell-group{
        .van-cell{
            font-size: .42rem;
            height: 1.7rem;
            line-height: 1.28rem;
            padding: .2rem .8rem;
            overflow: inherit;
            display: -webkit-box;
            .van-do-img{
                width: .94rem;
                height: .88rem;
                margin-top: .2rem;
                margin-right: .6rem;
                img{
                    object-fit: contain;
                }
                img:first-child{
                    width: .92rem;
                    height: .88rem;
                }
                img:nth-child(2){
                    width: .72rem;
                    height: .86rem;
                }
                img:last-child{
                    width: .94rem;
                    height: .74rem;
                }
            }
        }
    }
    &-cell__value {
        display: -webkit-box;
    }
    &-hairline--top-bottom::after{
        border: 0;
    }
    /*标题字体*/
    &-nav-bar__title{
        font-size: .4rem;
    }
    /*商户服务背景*/
    &-serve-bg{
        width: 100%;
        height: 4rem;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        div{
            width: 100%;
            padding: .8rem .4rem;
            position: absolute;
            top: 0;
            color: #fff;
            box-sizing: border-box;
            p{
                font-size: .28rem;
                line-height: normal;
                span{
                    padding-left: .3rem;
                }
            }
            P:nth-child(2){
                font-size: .54rem;
                padding: .8rem 0 .2rem;
            }
        }
    }
    &-cell__right-icon{
        line-height: .48rem;
        font-size: .24rem;
    }
    &-uploader{
        width: 100%;
    }
}
</style>