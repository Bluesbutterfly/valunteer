<template>
    <div>
        <div class="item-bg">
            <van-cell-group>
                <van-card
                        :title="goodsName"
                        :desc="'积分：'+price"
                        :num="value"
                        :thumb="picImg"
                />

                <div class="van-buyer">
                    购买人：<span>{{ volName }}</span>
                </div>
                <div class="van-caler-num">
                    共<span>{{ value }}</span>件商品&nbsp;&nbsp;小计：<span class="van-calcu-num">{{ totalPrice }}</span>
                </div>
                <div class="van-saomiao-btn">
                    <van-button type="primary" @click="sureSell">
                        确认卖出
                    </van-button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <van-button type="primary" @click="cancel">
                        取消
                    </van-button>
                </div>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem } from 'vant';
    import $ from 'jquery'
    import moment from 'moment'
    import qs from 'qs'
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
                value:0,
                price:0,
                goodsName:null,
                shopName:null,
                address:null,
                intergral:null,
                goodsObj:null,
                volName:null,
                totalPrice:null,
                picImg:null,
                orderId:0
            };
        },
        mounted:function () {
            // window.location.href = "http://localhost:8080/#/scsave?orderId=50"
            let orderId = window.location.href.split("=")[1]
            this.orderId = orderId
            this.$axios.get("/api/order/orderConfirm?orderId="+orderId).then(res=>{
                let data = res.data.resData
                this.picImg = 'http://47.99.140.207:8081/'+data.picture
                this.value = data.goodsCount
                this.goodsName = data.goodsName
                this.price = data.price
                this.volName = data.volName
                this.totalPrice = data.totalPrice

            })
        },
        methods:{
            sureSell(){
                this.$axios.post("/api/order/orderStatus",qs.stringify({ "orderId":this.orderId })).then(res=>{
                    console.log(res)
                    if (res.data.resCode == -1){
                        alert(res.data.resMessage)
                    }else {
                        res = res.data.resData
                        console.log(res.tradeHour)
                        sessionStorage.resResult = res[0]
                        sessionStorage.resinger = res.ingegral
                        sessionStorage.resrecode = res.tradeWay
                        sessionStorage.goodsName = res.goodsName
                        sessionStorage.orderId = res.orderId
                        sessionStorage.restime = new Date(moment(res.tradeHour)).getFullYear()+"-"+new Date(moment(res.tradeHour)).getMonth()+"-"+new Date(moment(res.tradeHour)).getDate()+" "+new Date(moment(res.tradeHour)).getHours()+":"+new Date(moment(res.tradeHour)).getMinutes()+":"+new Date(moment(res.tradeHour)).getSeconds()
                        // console.log(sessionStorage.restime)
                        this.$router.push({name:'suc',query:res.resData})
                    }
                })
            },
            cancel(){
                this.$router.push({name:'service'})
            }
        }
    }
</script>

<style lang="less" scoped>
    .van{
        /*卡片信息*/
        &-card{
            height: auto;
            padding: .2rem .3rem .2rem 2.3rem;
            box-sizing: content-box;
            font-size: .32rem;
            background-color: #fff;
            /deep/
            .van-card__thumb{
                top: .2rem;
                left: .3rem;
                width: 1.8rem;
                height: 1.8rem;
                border: .02rem solid #ccc;
            }
            /deep/
            .van-card__content{
                position: relative;
                display: flex;
                align-items: self-end;
                height: 1.82rem;
                .van-card__row{
                    color: #666;
                    font-size: .3rem;
                }
                .van-card__row div{
                    line-height: normal;
                    max-height: 5rem;
                }
                .van-card__row:last-child{
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    .van-card__desc{
                        font-size: .3rem;
                        color: #FD4242;
                    }
                    .van-card__num{
                        font-size: .3rem;
                    }
                }
            }
        }
        /*购买人*/
        &-buyer{
            padding: 0 .3rem .24rem;
            font-size: .26rem;
        }
        /*扫描弹框*/
        &-cell-group{
            width: 7.2rem;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        /*商品数目*/
        &-caler-num{
            display: flex;
            justify-content: flex-end;
            font-size: .32rem;
            padding: 0 .3rem;
        }
        &-calcu-num{
            color: #FF0000;
        }
        /*按钮*/
        &-saomiao-btn{
            display: flex;
            justify-content: flex-end;
            padding: 0.58rem .3rem .48rem;
            button{
                font-size: .24rem;
                padding: 0 .24rem;
                height: .5rem;
                line-height: .4rem;
                background-color: #09CE6A;
            }
        }
    }
    .item-bg{
        width: 100vw;
        height: 100vh;
        background: url("../../static/images/saoyisao.jpg") no-repeat;
        background-size: cover;
    }
    .van-card__img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>