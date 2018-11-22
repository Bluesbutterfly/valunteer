<template>
    <div class="all-main-content">
        <!--<van-nav-bar-->
                <!--title="兑换查询"-->
        <!--/>-->
        <van-cell-group>
            <van-cell class="van-search-num">
                <ul>
                    <li v-for="(item,index) in intergral">
                        <p :class="{ 'van-now-num':index==current}">{{ item.exchange }}</p>
                        <p>{{ item.name }}</p>
                    </li>
                </ul>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell class="van-exchance-item">
                <div class="van-date-select">
                    <vue-datepicker-local v-model="range" range-separator="至"></vue-datepicker-local>
                    <!--<span>-->
                        <!--<a href="javascript:;">-->
                            <!--<img src="../../static/images/calder.png">-->
                        <!--</a>-->
                    <!--</span>-->
                </div>
                <div class="van-peo-number">
                    <div>
                        兑换人数：<span>{{ dhNum }}</span>
                    </div>
                    <div>
                        兑换积分：<span>{{ dhcode }}</span>
                    </div>
                </div>
                <van-pull-refresh
                        class="val-loading-contain"
                        v-model="isLoading"
                        @refresh="onRefresh"
                >
                    <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    >
                        <van-cell v-for="(item,index) in list">
                            <div>
                                <img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg">
                            </div>
                            <div>
                                <p>{{ item.volName }}</p>
                                <p>{{ timeList[index]}}</p>
                            </div>
                            <div>
                                <p>{{ item.totalIntegral }}</p>
                            </div>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Stepper,Button,Swipe, SwipeItem,PullRefresh } from 'vant';
    import qs from 'qs'
    import moment from 'moment'
    import VueDatepickerLocal from 'vue-datepicker-local'
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
            [CellGroup.name]: CellGroup,
            VueDatepickerLocal,
            [PullRefresh.name]: PullRefresh
        },
        data() {
            return {
                value:1,
                dhNum:0,//兑换人数
                dhcode:0,//兑换积分
                id:1,
                intergral:[
                    {
                        name:"本月兑换",
                        exchange:0
                    },
                    {
                        name:"上月兑换",
                        exchange:0
                    },
                    {
                        name:"累计兑换",
                        exchange:0
                    }
                ],
                time:new  Date(),
                current:0,
                range: [],
                createTime:null,
                integrals:null,
                list: [],
                loading: false,
                finished: false,
                isLoading: false,   //是否处于下拉刷新状态
                rows:6,//每页显示的个数
                pageNumber: 1,//当前显示页数
                totalPage: 0,
                starTime:null,
                endTime:null,
                timer:0,
                timeList:[]//为解决iOS不兼容时间计算的属性
            };
        },
        mounted:function () {
            let year = new Date().getFullYear();
            let month = new Date().getMonth();//js从0开始取
            let date = new Date().getDate();
            let year1 = new Date().getFullYear();
            let month1 = new Date().getMonth()+1;//js从0开始取
            let date1 = new Date().getDate();
            // let preTime = year+"-"+month+"-"+date
            this.starTime = year+"-"+month+"-"+date
            this.endTime = year1+"-"+month1+"-"+date1
            this.range = [new Date(year+"/"+month+"/"+date),new Date(year1+"/"+month1+"/"+date1)]
        },
        methods: {
            init() {
                let data = {
                    pageNumber: this.pageNumber + 1
                };
                let self = this;
                let cid = this.$cookies.get("cid")
                this.$axios.post("/api/order/exchangeRecord",qs.stringify({ "id":cid,"startTime":this.starTime,"endTime":this.endTime,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                    // let data = JSON.parse(res.request.serviceStation.response)
                    let serve = res.data.resData
                    let datas = serve.orderList;
                    self.list = datas;
                    self.totalPage = res.data.resData.exchangeRecordCountByTime/this.rows;
                    self.isLoading = false; //关闭下拉刷新效果
                })
            },
            //下拉刷新
            onRefresh() {
                let self = this;
                setTimeout(() => {
                    self.totalPage = 0;
                    self.pageNumber = 0;
                    self.init(); //加载数据
                }, 500);
            },
            //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
            onLoad() {
                let self = this;
                let cid = this.$cookies.get("cid")
                setTimeout(() => {
                    let data = {
                        pageNumber: self.pageNumber + 1
                    };
                    this.$axios.post("/api/order/exchangeRecord",qs.stringify({ "id":cid,"startTime":this.starTime,"endTime":this.endTime,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                        console.log(res)
                        let serve = res.data.resData
                        // let data = JSON.parse(res.request.serviceStation.response)

                        let datas = serve.orderList;
                        self.list = self.list.concat(datas);
                        self.totalPage = res.data.resData.exchangeRecordCountByTime/this.rows;
                        for (let i=0;i<this.intergral.length;i++){
                            this.intergral[0].exchange = serve.thisMonthExchangeRecord;
                            this.intergral[1].exchange = serve.lastMonthExchangeRecord;
                            this.intergral[2].exchange = serve.totalExchangeRecord;
                            // if (this.intergral[i].exchange == null || ""){
                            //     this.intergral[i].exchange = 0
                            // }
                        }
                        for (var i=0;i<self.list.length;i++){
                            let createTime = self.list[i].createTime
                            moment().format('YYYY/MM/DD h:mm:ss')
                            let disTime = new Date(moment(createTime)).getMonth()+"-"+new Date(moment(createTime)).getDate()+" "+" "+new Date(moment(createTime)).getHours()+":"+new Date(moment(createTime)).getMinutes()+":"+new Date(moment(createTime)).getSeconds()
                            self.timeList.push(disTime)
                        }
                        //计算出相差天数
                        // let leave1=newDate%(24*3600*1000)
                        // console.log(newDate)
                        self.createTime = 0
                        self.dhNum = res.data.resData.exchangeRecordCountByTime
                        self.dhcode = res.data.resData.exchangeRecordByTime
                        self.loading = false; //关闭下拉刷新效果
                        self.pageNumber++;
                        if (self.pageNumber-1 >= Math.ceil(self.totalPage)) {
                            self.finished = true;
                        }
                        console.log(res)
                    })
                }, 500);
            },
            // 进入购买详情的页面
            details(index) {
                sessionStorage.shopIndexId = this.list[index].id
                this.$router.push({name:'commodityDetails',query:this.list[index].id})
            },
            // 返回顶部
            targetTop() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            }
        },
        watch:{
            range(date){
                // console.log(date)
                this.$emit( 'onLoad', date )
                let self = this;
                self.timer ++
                if (self.timer == 1){
                    return false
                }else {
                    let cid = this.$cookies.get("cid")
                    setTimeout(() => {
                        let data = {
                            pageNumber: self.pageNumber + 1
                        };
                        this.$axios.post("/api/order/exchangeRecord",qs.stringify({ "id":cid,"startTime":this.starTime,"endTime":this.endTime,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                            console.log(res)
                            let serve = res.data.resData
                            // let data = JSON.parse(res.request.serviceStation.response)
                            let datas = serve.orderList;
                            self.list = self.list.concat(datas);
                            self.totalPage = res.data.resData.exchangeRecordCountByTime/this.rows;
                            for (let i=0;i<this.intergral.length;i++){
                                this.intergral[0].exchange = serve.thisMonthExchangeRecord;
                                this.intergral[1].exchange = serve.lastMonthExchangeRecord;
                                this.intergral[2].exchange = serve.totalExchangeRecord;
                                // if (this.intergral[i].exchange == null || ""){
                                //     this.intergral[i].exchange = 0
                                // }
                            }
                            for (var i=0;i<self.list.length;i++){
                                let createTime = self.list[i].createTime
                                moment().format('YYYY/MM/DD h:mm:ss')
                                let disTime = new Date(moment(createTime)).getMonth()+"-"+new Date(moment(createTime)).getDate()+" "+" "+new Date(moment(createTime)).getHours()+":"+new Date(moment(createTime)).getMinutes()+":"+new Date(moment(createTime)).getSeconds()
                                self.timeList.push(disTime)
                            }
                            //计算出相差天数
                            // let leave1=newDate%(24*3600*1000)
                            // console.log(newDate)
                            self.createTime = 0
                            self.dhNum = res.data.resData.exchangeRecordCountByTime
                            self.dhcode = res.data.resData.exchangeRecordByTime
                            self.loading = false; //关闭下拉刷新效果
                            self.pageNumber++;
                            if (self.pageNumber-1 >= Math.ceil(self.totalPage)) {
                                self.finished = true;
                            }
                            console.log(res)
                        })
                    }, 500);
                }

            }
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
    /*兑换数目*/
    &-search-num{
        padding: .7rem;
        margin: .4rem 0 .32rem;
        ul{
            display: flex;
            justify-content: space-between;
            text-align: center;
            li{
                font-size: .24rem;
                color: #799096;
                p:first-child{
                    font-size: .54rem;
                    font-weight: bold;
                    padding-bottom: .1rem;
                    color: #000;
                }
                p:first-child.van-now-num{
                    color: #5CF96B;
                }
            }
        }
    }
    /*兑换项目*/
    &-exchance-item{
        font-size: .24rem;
        color: #799096;
        min-height: 50vh;
        /deep/.van-cell__value--alone{
            >div{
                img{
                    width: .44rem;
                    height: .4rem;
                }
            }
            >div:last-child{
                padding: .9rem 0 0;
            }
            .van-cell{
                padding: .2rem 0;
                .van-cell__value--alone{
                    display: flex;
                    align-items: center;
                    div:first-child{
                        padding-right: .4rem;
                    }
                    div:first-child , div:last-child{
                        display: flex;
                        align-items: center;
                    }
                    div:last-child{
                        padding: 0;
                    }
                    div:nth-child(2){
                        flex: 1;
                        font-size: .24rem;
                        color: #999;
                        line-height: .48rem;
                        p:first-child{
                            font-size: .28rem;
                            color: #000;
                        }
                    }
                    div{
                        font-size: .42rem;
                        color: #000;
                    }
                }
                img{
                    width: .82rem;
                    height: .82rem;
                    border-radius: 50%;
                    box-sizing: border-box;
                }
            }
        }
    }
    &-date-select{
        display: flex;
        justify-content: space-between;
        font-size: .42rem;
        color: #000;
        padding-top: .4rem;
    }
    &-peo-number{
        padding-top: .2rem;
        display: flex;
        div{
            width: 50%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    &-cell{
        line-height: normal;
    }
    /*标题字体*/
    &-nav-bar__title{
        font-size: .4rem;
    }
    /*头部行高*/
    &-nav-bar{
        height: .92rem;
        line-height: .92rem;
    }
}
/*日历*/
.datepicker-range{
    min-width: 100%;
    /deep/input{
        border: 0;
        padding: 0 34px 0 0;
    }
    /deep/.datepicker-popup{
        width: 100%;
        .calendar{
            width: 50%;
            margin-left: 0;
            box-sizing: border-box;
            .calendar-body{
                width: 100%;
            }
        }
    }
}
.datepicker>input{
    border: 0;
}
.all-main-content{
    min-height: 100vh;
}
</style>