<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="商品详情"-->
                <!--left-arrow-->
        <!--/>-->
        <div class="van-detailt-titleimg">
            <van-swipe>
                <van-swipe-item v-for="item in picList">
                    <img :src="'http://47.99.140.207:8081/'+item.pictureAddress">
                </van-swipe-item>
            </van-swipe>
            <div class="van-bg-imglist"></div>
        </div>
        <van-cell class="van-details-contain">
            <p>{{ shopName }}</p>
            <div>
                <p>{{ goodsName }}</p>
                <van-stepper v-model="value" integer/>
            </div>
            <div>
                <p>积分：<span>{{ price }}</span></p>
                <p>剩余：<span>{{ inventory }}</span></p>
            </div>
        </van-cell>
        <van-cell class="van-shoping-intro">
            <p>商品介绍</p>
            <div>
                {{ presentation }}
                <!--<p>商品名称：<span>惠而浦慢榨机WJU-HS201J</span></p>-->
                <!--<p>品牌：<span>惠而浦(Whirlpool) </span></p>-->
                <!--<p>档位：<span>2档</span></p>-->
                <!--<p>果汁杯容量：<span>550毫升</span></p>-->
            </div>
        </van-cell>
        <div class="van-msg-spance"></div>
        <van-cell class="van-sure-primary">
            <p>积分：<span>{{ value*price }}</span></p>
            <van-button type="primary" @click="getCode">立即兑换</van-button>
        </van-cell>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem } from 'vant';
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
                value:1,
                id:sessionStorage.shopIndexId,
                goodsName:null,
                inventory:null,
                price:null,
                pictureAddress:null,
                presentation:null,
                shopName:null,
                obj:null,
                picList:[]
            };
        },
        methods:{
            getCode: function(){
                let uid = this.$cookies.get("uid")
                sessionStorage.targets = 1
                    // loginName = this.$cookies.get("loginName")
                if (!uid){
                    this.$router.push({name:'login'})
                }else {
                    this.$router.push({name:'commodityDetails'})
                    this.$router.push({name:'smenu',query:{value:this.value}})
                    this.obj = JSON.stringify(this.obj)
                    sessionStorage.obj = this.obj
                }
            }
        },
        created:function () {
            this.$axios.post("/api/goods/goodsDetail",qs.stringify({ "id":this.id })).then(res=>{
                console.log(res)
                this.obj = res
                this.presentation = res.data.resData.goods.presentation
                this.goodsName = res.data.resData.goods.goodsName
                this.price = res.data.resData.goods.price
                this.inventory = res.data.resData.goods.inventory
                this.shopName = res.data.resData.shop.shopName
                this.picList = res.data.resData.goods.pictureList
                // this.pictureAddress = res.data.resData.goods.pictureList[0].pictureAddress
            })
        }
    }
</script>

<style lang="less" scoped>
p{
    margin: 0;
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
    /*返回图标*/
    /deep/ &-nav-bar &-icon{
        color: #09CE6A;
    }
    &-cell{
        padding: 0 15px;
    }
    &-cell:not(:last-child)::after{
        border-bottom-width: 0;
    }
    /*商品展示*/
    &-detailt-titleimg{
        position: relative;
        img{
            width: 100%;
            height: 5.7rem;
            object-fit: cover;
        }
    }
    /*轮播样式调整*/
    /deep/ &-swipe__indicators{
        z-index: 99;
    }
    /deep/ &-swipe__indicator--active{
        background-color: #09CE6A;
    }
    &-bg-imglist{
        width: 100%;
        height: 1.62rem;
        position: absolute;
        bottom: 0;
        background-color: #fff;
        opacity: 0.639;
    }
    &-details-contain{
        font-size: .32rem;
        color: #666;
        padding-bottom: .48rem;
        /deep/.van-cell__value--alone{
            >p{
                font-size: .36rem;
                color: #333;
                padding: .2rem 0 .1rem;
            }
            >div{
                p{
                    display: inline-block;
                }
                p:last-child{
                    float: right;
                    font-size: .2rem;
                    color: #999;
                }
                div{
                    float: right;
                }
            }
            >div:last-child{
                p:first-child{
                    font-size: .32rem;
                    color: #FD4242;
                }
                padding-top: .26rem;
            }
        }
    }
    /*商品介绍*/
    &-shoping-intro{
        color: #666;
        >div{
            >p{
                font-size: .32rem;
                padding: .32rem 0 .45rem;
            }
            >div{
                line-height: .6rem;
            }
        }
    }
    &-stepper{
        /deep/.van-stepper__minus{
            width: .46rem;
            height: .46rem;
        }
        /deep/.van-stepper__plus{
            width: .46rem;
            height: .46rem;
        }
        /deep/ .van-stepper__input{
            width: .53rem;
            height: .36rem;
            line-height: .36rem;
        }
    }
    /*留白*/
    &-msg-spance{
        height: 1rem;
    }
    /*立即兑换按钮*/
    &-sure-primary{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1rem;
        line-height: 1rem;
        border-top:1px solid #C9C9C9;
        padding: 0;
        box-sizing: content-box;
        /deep/div{
            padding: 0 0 0 .3rem;
        }
        p{
            display: inline-block;
            color: #FD4242;
            font-size: .32rem;
            margin: 0;
        }
        button{
            float: right;
            height: 100%;
            border-radius: 0;
            background-color: #58BF8A;
            border: 1px solid #58BF8A;
            padding: 0 .4rem;
            font-size: .36rem;
        }
    }
}
</style>