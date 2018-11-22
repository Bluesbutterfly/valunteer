<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="订单成功"-->
                <!--right-text="完成"-->
        <!--/>-->
        <van-cell-group class="van-suc-container">
            <div class="van-suc-wel">
                <van-row>
                    <img src="../../static/images/icon_wancheng.png">
                </van-row>
                <van-row>
                    <p>{{ resResult }}</p>
                    <p>感谢您的支持</p>
                </van-row>
                <van-row>
                    系统自动扣除购买人<span>{{ resinger }}</span>积分
                </van-row>
            </div>
        </van-cell-group>
        <van-cell-group class="van-suc-details">
            <van-row>
                <p>商品</p>
                <p>{{ goodsName }}</p>
            </van-row>
            <van-row>
                <p>交易时间</p>
                <p>{{ restime }}</p>
            </van-row>
            <van-row>
                <p>交易方式</p>
                <p>{{ resrecode }}</p>
            </van-row>
            <van-row>
                <p>交易单号</p>
                <p>{{ orderId }}</p>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,List } from 'vant';
    import qs from 'qs'
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                resResult:sessionStorage.resResult,
                resinger:sessionStorage.resinger,
                restime:sessionStorage.restime,
                resrecode:sessionStorage.resrecode,
                goodsName:sessionStorage.goodsName,
                orderId:sessionStorage.orderId
            };
        }
    };
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
        &-nav-bar , &-suc-container{
            background-color: #09CE6A;
            color: #fff;
        }
        /deep/ &-nav-bar__text{
            color: #fff;
        }
        &-nav-bar::after , &-suc-container::after{
            border: none;
            width: 0;
            height: 0;
        }
        &-suc-container{
            position: relative;
            height: 2.7rem;
            img{
                width: .76rem;
                height: .76rem;
            }
            .van-suc-wel{
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: .24rem;
                .van-row{
                    font-size: .28rem;
                    p:first-child{
                        font-size: .36rem;
                    }
                }
                .van-row:first-child{
                    float: left;
                    padding-right: .24rem;
                }
                .van-row:last-child{
                    padding-top: .42rem;
                    font-size: .24rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
        /*交易成功细节*/
        &-suc-details{
            padding: .4rem .2rem;
            margin-top: .2rem;
            p{
                display: inline-block;
                font-size: .28rem;
                color: #666;
                padding-top: .24rem;
            }
            p:last-child{
                float: right;
            }
        }
        &-nav-bar__text{
            color: #fff;
        }
        /*标题字体*/
        &-nav-bar__title{
            font-size: .4rem;
        }
    }
</style>
