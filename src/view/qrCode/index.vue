<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="订单二维码"-->
        <!--/>-->
        <van-cell-group class="van-qr-container">
            <van-row>
                <p>商品兑换码</p>
                <div id="qrcode"></div>
                <p>店内收银员请扫描此码</p>
                <div><router-link to="/order/">查看订单详情</router-link></div>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,List,Button } from 'vant';
    // import VueQArt from 'vue-qart'
    import qs from 'qs'
    import QRCode from 'qrcodejs2'

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [Button.name]: Button,
            [List.name]: List,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                gid:0,
                id:0,
                vid:0,
                uid:0,
            };
        },
        mounted:function () {
            this.qrcode()
        },
        methods:{
            qrcode () {
                let href=window.location.href.split("#")[0]
                let qrcode = new QRCode('qrcode', {
                    // width: 100,
                    // height: 100, // 高度
                    text: href+"#/"+'scsave?orderId='+sessionStorage.resData, // 二维码内容
                    render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                // console.log(href+"#/"+'scsave')
            }
        }
    };
</script>

<style lang="less" scoped>
p{
    margin: 0;
}
.van{
    /*标题字体*/
    &-nav-bar__title{
        font-size: .4rem;
    }
    &-qr-container{
        margin: .4rem;
        padding-bottom: 3.24rem;
        display: flex;
        justify-content: center;
    }
    &-row{
        text-align: center;
        padding-top: 1rem;
        /deep/img{
            width: 4.28rem;
            height: 4.26rem;
            padding: .62rem 0 .32rem 0;
        }
        p{
            font-size: .3rem;
            color: #999;
        }
        p:first-child{
            font-size: .44rem;
            color: #333;
        }
        >div{
            padding-top: .2rem;
            a{
                font-size: .3rem;
                color: #ccc;
            }
        }
    }
}
</style>
