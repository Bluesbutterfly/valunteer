<template>
    <div>
        <!--<van-nav-bar-->
                <!--title="发布活动"-->
                <!--left-arrow-->
                <!--right-text="发布"-->
        <!--/>-->
        <van-list class="van-act-list">
            <van-cell>
                <label for="names">活动标题</label>
                <div>
                    <input type="text" placeholder="请输入活动标题" id="names" v-model="title">
                </div>
            </van-cell>
            <!--<van-cell>-->
                <!--<label for="act">活动组织</label>-->
                <!--<div>-->
                    <!--<input type="text" placeholder="请输入活动组织" id="act" v-model="stationName">-->
                <!--</div>-->
            <!--</van-cell>-->
            <van-cell>
                <label for="times">开始时间</label>
                <!--<vue-datepicker-local v-model="startTime" placeholder="请输入开始时间" id="times"></vue-datepicker-local>-->
                <div>
                    <input type="text" placeholder="请输入开始时间" id="times" v-model="start" @focus="openPicker">
                    <mt-datetime-picker
                            ref="picker"
                            type="datetime"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            hour-format="{value}"
                            minute-format="{value}"
                            @confirm="handleConfirm"
                            v-model="startTime">
                    </mt-datetime-picker>
                </div>
            </van-cell>
            <van-cell>
                <label for="etimes">结束时间</label>
                <!--<vue-datepicker-local v-model="endTime" placeholder="请输入结束时间" id="etimes"></vue-datepicker-local>-->
                <div>
                    <input type="text" placeholder="请输入结束时间" id="etimes" v-model="zheng" @focus="openPickers">
                    <mt-datetime-picker
                            ref="pickers"
                            type="datetime"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            hour-format="{value}"
                            minute-format="{value}"
                            @confirm="handleConfirms"
                            v-model="endTime">
                    </mt-datetime-picker>
                </div>
            </van-cell>
            <van-cell>
                <label for="addres">活动地址</label>
                <div>
                    <input type="text" placeholder="请输入活动地址" id="addres" v-model="address">
                </div>
            </van-cell>
            <van-cell>
                <label for="nums">活动人数</label>
                <div>
                    <input type="text" placeholder="请输入活动人数" id="nums" v-model="peopleCount">
                </div>
            </van-cell>
        </van-list>
        <van-cell-group class="van-act-details">
            <div>
                活动详情
            </div>
            <div>
                <textarea name="actContain" placeholder="请输入活动详情" v-model="actDetail"></textarea>
                <!--<autoTextarea :value="value"/>-->
            </div>
        </van-cell-group>
        <van-cell-group class="van-act-details">
            <div>
                请上传照片
            </div>
            <!--<img :src="imgUrls" id="set-img" class="img-images" v-if="imgUrls">-->
            <div class="van-uploader-img">
                <van-uploader :after-read="update">
                    <div class="van-upload-border" v-if="showClick">
                        <div class="subimg">
                            <img src="../../static/images/add.png">
                            <div>点击上传图片</div>
                        </div>
                    </div>
                    <img :src="imgUrls" v-if="imgUrls">
                </van-uploader>
                <!--<input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg,image/jpg" @change="update"/>-->
                <!--<div class="subimg">-->
                    <!--<img src="../../static/images/add.png">-->
                    <!--<div>点击上传图片</div>-->
                <!--</div>-->
            </div>
        </van-cell-group>
        <div class="van-space-wite"></div>
        <van-cell class="van-sure-primary">
            <van-button size="large" @click="sureGift">发布活动</van-button>
        </van-cell>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Uploader,Button } from 'vant';
    import { autoTextarea } from 'auto-textarea'
    import moment from 'moment'
    // import VueDatepickerLocal from 'vue-datepicker-local'
    import qs from 'qs'
    // import Datepicker from 'vue2-date-component';
    import { DatetimePicker } from 'mint-ui';
    import Vue from 'vue'
    import 'mint-ui/lib/style.css';
    Vue.component(DatetimePicker.name, DatetimePicker);
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [Button.name]: Button,
            [NavBar.name]: NavBar,
            [Uploader.name]: Uploader,
            [CellGroup.name]: CellGroup,
            autoTextarea
        },
        data() {
            return {
                actDetail:null,
                value:null,
                imgUrls:null,
                title:null,
                stationName:null,
                startTime:null,
                endTime:null,
                address:null,
                peopleCount:null,
                file:null,
                showClick:true,
                zheng:null,
                start:null,
                pictureId:0,
                imgData: {
                    accept: 'image/gif, image/jpeg, image/png, image/jpg',
                }

            };
        },

        methods: {
            update(e){
                this.showClick = false
                // this.imgUrls = e.content
                let file = e.file;
                let param = new FormData(); //创建form对象
                param.append('file',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                let that = this
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload=function(e){
                    that.imgUrls = this.result
                }
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                this.$axios.post("/api/upload/image",param,config).then(res=>{
                    console.log(res)
                    let picId = res.data.resData.pictureId
                    sessionStorage.pictureId = picId
                })
            },
            sureGift() {
                sessionStorage.stationName = this.stationName
                sessionStorage.presentation = this.actDetail
                let gid = this.$cookies.get("gid")
                this.$axios.post("/api/serviceStation/postActivity",qs.stringify({ "stationId":gid,"title":this.title ,"stringStartTime":this.start ,"stringEndTime":this.zheng ,"address":this.address ,"peopleCount":this.peopleCount,"content":this.actDetail,"pictureId":sessionStorage.pictureId  })).then(res=>{
                    console.log(res)
                    window.history.length>1?this.$router.go(-1):this.$router.push("/")
                }).catch(err=>{
                    console.log(err)
                    alert(err)
                })
            },
            openPicker() {
                document.activeElement.blur();
                this.$refs.picker.open();//设置开始
            },
            openPickers(){
                document.activeElement.blur();
                this.$refs.pickers.open();//设置开始
            },
            formatDate(date) {
                if (date == null || ''){
                    return '2008-01-01 00:00'
                }
                const y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                let h = date.getHours()
                h = h < 10 ? ('0' + h) : h
                let mi = date.getMinutes()
                mi = mi < 10 ? ('0' + mi) : mi
                return y + "-" + m + "-" + d + ' '+h+":"+mi
            },
            handleConfirm(){
                let a = this.startTime
                this.start=this.formatDate(this.$refs.picker.value)
            },
            handleConfirms(){
                let a = this.endTime
                this.zheng=this.formatDate(this.$refs.pickers.value)
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
       /deep/ &-nav-bar__title{
            font-size: .4rem;
        }
        /deep/ &-cell{
            padding: 0 .3rem;
            height: 1rem;
            line-height: 1rem;
            overflow: inherit;
        }
        /deep/ &-nav-bar &-icon{
            color: #666;
        }
        /deep/ &-nav-bar__text{
            color: #666;
        }

        /*活动列表*/
        &-act-list{
            /deep/ .van-cell__value{
                display: flex;
                font-size: .24rem;
                box-sizing: border-box;
                overflow: inherit;
                .calendar-body{
                    width: 3.92rem;
                    height: 3.92rem;
                }
                .calendar-week, .calendar-date{
                    line-height: 14.28%;
                }
                label{
                    font-size: .32rem;
                    min-width: 1.3rem;
                    color: #434343;
                }
                .show-calendars{
                    left: 0;
                }
                div{
                    flex: 1;
                    input{
                        width: 100%;
                        text-align: right;
                        border: 0;
                        line-height: normal;
                        box-sizing: border-box;
                    }
                    .picker-item{
                        padding: 0 .05rem;
                    }
                }
            }
        }
        /*活动细则*/
        &-act-details{
            height: 4.32rem;
            margin-top: .2rem;
            padding: .3rem;
            >div:first-child{
                font-size: .36rem;
            }
            >div:last-child{
                margin-top: .3rem;
                textarea{
                    width: 100%;
                    box-sizing: border-box;
                    font-size: .24rem;
                    height: 3.5rem;
                    border: 0;
                }
            }
            .van-uploader-img{
                display: flex;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%);
                font-size: .24rem;
                color: #999;
            }
        }
        /*上传图片的样式*/
        &-uploader-img{
            width: 1.64rem;
            height: 1.4rem;
            text-align: center;
            .van-upload-border{
                width: 100%;
                height: 100%;
                border: .03rem dashed #ccc;
            }
            .van-uploader{
                /deep/
                img{
                    width: 100%;
                    height: 100%;
                    padding: 0;
                }
            }
            .subimg{
                img{
                    width: .56rem;
                    padding-top: .2rem;
                }
            }
            input{
                width: 100%;
                opacity: 0;
                position: relative;
                z-index: 3;
            }
            .subimg{
                position: absolute;
                width: 100%;
                top: 0;
                z-index: -1;
            }
        }
        &-sure-primary{
            position: fixed;
            bottom: 0;
            left: 0;
            height: 1rem;
            line-height: 1rem;
            padding: 0;
            z-index: 999;
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
        &-space-wite{
            height: 1rem;
            background-color: transparent;
        }
        &-uploader{
            width: 100%;
            height: 100%;
        }
    }
    .img-images{
        width: 50%;
        height: 4rem;
        object-fit: cover;
        display: block;
        margin: 0 auto;
        margin-top: .2rem;
        z-index: 99;
        position: relative;
    }
</style>