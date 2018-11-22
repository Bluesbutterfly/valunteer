<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="确认订单"-->
        <!--/>-->
        <van-cell-group class="van-sure-container">
            <div class="van-sure-wel">
                <van-row>
                    <p>商户名称：<span>{{ shopName }}</span></p>
                </van-row>
                <div>
                    <van-row>
                        <img src="../../static/images/icon_dibiao.png" alt="定位地址">
                    </van-row>
                    <van-row>
                        <p>商户地址：<span>{{ address }}</span></p>
                    </van-row>
                </div>
            </div>
        </van-cell-group>
        <van-cell class="van-details-contain">
            <p>兑换商品</p>
            <van-card
                    :title="goodsName"
                    :desc="'积分：'+price"
                    :num="value"
                    :thumb="shopPic"
            />
            <van-cell-group>
                <p>来源<span>积分兑换</span></p>
            </van-cell-group>
            <van-cell-group>
                <div class="van-num-sort">
                    份数
                    <van-stepper v-model="value" integer/>
                </div>
            </van-cell-group>
            <van-cell-group>
                <p>剩余积分<span>{{ intergral }}</span></p>
            </van-cell-group>
            <van-cell-group>
                <div class="van-caler-num">
                    共<span>1</span>件商品&nbsp;&nbsp;小计：<span class="van-calcu-num">{{ value*price }}</span>
                </div>
            </van-cell-group>
        </van-cell>
        <van-cell class="van-sure-primary">
            <van-button size="large" @click="sureBuy">确认兑换</van-button>
        </van-cell>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem } from 'vant';
    import $ from 'jquery'
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
                value:this.$route.query.value,
                price:0,
                goodsName:null,
                shopName:null,
                address:null,
                intergral:null,
                goodsObj:null,
                gid:0,
                shopPic:sessionStorage.shopPic,
                id:sessionStorage.uid
            };
        },
        mounted:function () {
            let objSum = $.parseJSON(sessionStorage.obj)
            this.price=objSum.data.resData.goods.price
            this.goodsName = objSum.data.resData.goods.goodsName
            this.shopName = objSum.data.resData.shop.shopName
            this.address = objSum.data.resData.shop.address
            this.intergral = sessionStorage.intergral
            sessionStorage.number = this.value
            // this.goodsObj = objSum.data.resData.goods
            // console.log(this.goodsObj.id)
            this.gid = objSum.data.resData.goods.id
        },
        methods:{
            sureBuy (){
                let uid = this.$cookies.get("uid")
                this.$axios.post("/api/order/createOrder",qs.stringify({ "gid":this.gid,"num":this.value,"vid":uid })).then(res=>{
                    console.log(res)
                    sessionStorage.resData = res.data.resData
                    this.$router.push({name:'qr'})
                })
            }
        }
    }
</script>

<style lang="less" scoped>
body{
    p{
        margin: 0;
    }
}
.van{
    /*标题字体*/
    /deep/ &-nav-bar__title{
        font-size: .4rem;
    }
    /deep/ &-nav-bar__text{
        color: inherit;
        font-size: .28rem;
    }
    &-cell{
        padding: 0;
    }
    &-nav-bar::after , &-sure-container::after{
        border: none;
        width: 0;
        height: 0;
    }
    /*确认商户地址信息*/
    &-sure-wel{
        padding: .44rem 0 .36rem;
        p{
            font-size: .28rem;
            color: #333;
        }
        >.van-row{
            padding-left: .86rem;
            padding-top: 0;
        }
        img{
            width: .36rem;
            height: .44rem;
            padding-left: .2rem;
        }
        >div{
            padding-top: .2rem;
            >.van-row:first-child{
                float: left;
            }
            >.van-row:last-child{
                padding-left: .86rem;
            }
        }
    }
    /*卡片信息*/
    &-card{
        padding: .2rem .3rem .2rem 2.3rem;
        box-sizing: content-box;
        /deep/
        .van-card__thumb{
            top: .2rem;
            left: .3rem;
        }
        /deep/
        .van-card__content{
            position: relative;
            .van-card__row{
                color: #666;
                font-size: .32rem;
            }
            .van-card__row:last-child{
                position: absolute;
                bottom: .2rem;
                width: 100%;
                .van-card__desc{
                    font-size: .32rem;
                    color: #FD4242;
                }
                .van-card__num{
                    font-size: .32rem;
                }
            }
        }
    }
    &-sure-primary{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1rem;
        line-height: 1rem;
        padding: 0;
        button{
            float: right;
            height: 100%;
            border-radius: 0;
            background-color: #58BF8A;
            border: 1px solid #58BF8A;
            color: #fff;
            padding: 0 .4rem;
            font-size: .36rem;
        }
    }
    /*积分兑换*/
    &-details-contain{
        margin-top: .14rem;
        font-size: .32rem;
        min-height: 9.5rem;
        .van-cell-group{
            padding: 0 .2rem;
            height: .9rem;
            line-height: .9rem;
            p,.van-num-sort{
                display: flex;
                justify-content: space-between;
                span{
                    color: #999;
                }
            }
            .van-caler-num{
                display: flex;
                justify-content: flex-end;
            }
            .van-stepper{
                /deep/
                .van-stepper__minus{
                    width: .74rem;
                    height: .72rem;
                }
                /deep/
                .van-stepper__plus{
                    width: .74rem;
                    height: .72rem;
                }
                /deep/
                .van-stepper__input{
                    height: .72rem;
                    width: .94rem;
                    line-height: .72rem;
                    box-sizing: border-box;
                }
            }
        }
        .van-cell__value--alone>p{
            padding: 0 .2rem;
            font-size: .32rem;
            color: #666;
            padding-top: .3rem;
        }
    }
    &-calcu-num{
        color: #FF0000;
    }
}
</style>