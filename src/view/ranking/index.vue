<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="积分排行"-->
        <!--/>-->
        <van-cell-group>
            <van-row type="flex" justify="space-around" class="van-sort-who" v-for="(item,index) in forwardList">
                <van-col>
                    <img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg">
                    <div>
                        <img src="../../static/images/icon_yingpai.png">
                    </div>
                    <div>
                        {{ item[1].realName }}
                        <p>积分值:<span>{{ item[1].integral }}</span></p>
                    </div>
                </van-col>
                <van-col>
                    <img src="../../static/images/u=3310243611,2272020729&fm=27&gp=0.jpg">
                    <div>
                        <img src="../../static/images/icon_jinpai.png">
                    </div>
                    <div>
                        {{ item[0].realName }}
                        <p>积分值:<span>{{ item[0].integral }}</span></p>
                    </div>
                </van-col>
                <van-col>
                    <img src="../../static/images/u=456540401,245543726&fm=200&gp=0.jpg">
                    <div>
                        <img src="../../static/images/icon_tongpai.png">
                    </div>
                    <div>
                        {{ item[2].realName }}
                        <p>积分值:<span>{{ item[2].integral }}</span></p>
                    </div>
                </van-col>
            </van-row>
            <div class="van-cell-userlist" v-for="(item,index) in childrenList">
                <van-cell>
                    <div>{{ index+1 }}</div>
                    <div>
                        <img src="../../static/images/u=456540401,245543726&fm=200&gp=0.jpg">
                    </div>
                    <div>
                        {{ item.realName }}
                    </div>
                    <div>
                        <img src="../../static/images/icon_jifen.png">
                        <p>{{ item.integral }}</p>
                    </div>
                </van-cell>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Uploader } from 'vant';
    import { autoTextarea } from 'auto-textarea'
    import qs from 'qs'
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [NavBar.name]: NavBar,
            [Uploader.name]: Uploader,
            [CellGroup.name]: CellGroup,
            autoTextarea
        },
        data() {
            return {
                value:null,
                childrenList:[],
                forwardList:[]
            };
        },

        methods: {
            onRead(file) {
                console.log(file)
            }
        },
        mounted:function () {
            this.$axios.post("/api/volunteer/integralRanking").then(res=>{
                let children = res.data.resData
                this.forwardList.push(children)
                for (var i=0;i<children.length;i++){
                    this.childrenList.push(children[i])
                }
                console.log(this.childrenList)
            }).catch(err=>{
                console.log(err)
            })
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
        &-cell{
            padding: 0 .3rem;
        }
        /deep/ &-nav-bar &-icon{
            color: #666;
        }
        /*排名*/
        &-sort-who{
            padding-top: .86rem;
            align-items: flex-end;
            >div{
                position: relative;
                >img{
                    width: 1.76rem;
                    height: 1.76rem;
                    border-radius: 50%;
                }
                div{
                    img{
                        width: .56rem;
                        height: .42rem;
                        position: absolute;
                        top: -.42rem;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
                div:last-child{
                    text-align: center;
                    padding-top: .16rem;
                    font-size: .28rem;
                    p{
                        font-size: .24rem;
                        color: #58BF8A;
                    }
                }
            }
            >div:first-child{
                >img{
                    width: 1.54rem;
                    height: 1.54rem;
                }
            }
            >div:last-child{
                >img{
                    width: 1.3rem;
                    height: 1.3rem;
                }
            }
        }
        /*积分用户列表*/
        &-cell-userlist{
            margin-top: .66rem;
            /deep/ .van-cell__value{
                height: 1.4rem;
                line-height: 1.4rem;
                display: flex;
                align-items: center;
                font-size: .28rem;
                div{
                    img{
                        width: .8rem;
                        height: .8rem;
                    }
                }
                div:nth-child(2){
                    display: flex;
                    padding: 0 .42rem 0 .62rem;
                }
                div:nth-child(3){
                    flex: 1;
                }
                div:last-child{
                    line-height: .36rem;
                    img{
                        width: .3rem;
                        height: .38rem;
                        display: block;
                        margin: 0 auto;
                    }
                    p{
                        padding-top: .12rem;
                        color: #58BF8A;
                    }
                }
            }
        }
    }
</style>