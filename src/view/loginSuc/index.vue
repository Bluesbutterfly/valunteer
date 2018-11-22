<template>
    <div>
        <div class="van-suc-tips">
            <div class="van-tips-crl">
                <img src="../../static/images/loginsuc.png">
                <p>您已成功{{ this.$route.query.types }}</p>
                <van-button type="primary" @click="sure">知道了</van-button>
            </div>
            <div class="van-close-btn" @click="sure"></div>
        </div>
        <!--背景底板-->
        <div class="van-bot-bg"></div>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem } from 'vant';
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Stepper.name]: Stepper,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                value:1
            };
        },
        methods:{
            sure (){
                let userType = sessionStorage.valunum
                if (userType == -1){
                    this.$router.push({name:'loginss'})
                }else if (userType == -2){
                    this.$router.push({name:'login'})
                }else
                if (userType == 0){
                    this.$router.push({name:'personal'})
                }else if (userType == 1) {
                    this.$router.push({name:'service'})
                }else if (userType == 2) {
                    this.$router.push({name:'station'})
                }else if (userType == 3) {
                    this.$router.push({name:'commodityDetails'})
                }else if (userType == 4) {
                    this.$router.push({name:'act'})
                }else if (userType == 5) {
                    this.$router.push({name:'sign'})
                }else if (userType == 6) {
                    alert("正在审核，请耐心等待")
                }else if (userType == 7) {
                    alert("审核未通过，请重新进行登记")
                    this.$router.push({name:'sign'})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .van{
        &-suc-tips{
            width: 5.4rem;
            height: 6.92rem;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            justify-content: center;
            border-radius: 10px;
            background: url("../../static/images/tips.png") no-repeat;
            background-size: cover;
            z-index: 77;
            .van-tips-crl{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            img{
                width: 1.56rem;
                height: 1.56rem;
                padding-top: 1.32rem;
            }
            p{
                font-size: .36rem;
                margin: .7rem 0 .64rem;
            }
            button{
                width: 4.02rem;
                line-height: .84rem;
                height: .84rem;
                background-color: #58BF8A;
                border-radius: 21px;
                font-size: .32rem;
            }
            /*关闭按钮*/
            .van-close-btn{
                width: .55rem;
                height: .55rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        &-bot-bg{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #000;
            opacity: .7;
            z-index: 70;
        }
    }
</style>