<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="个人资料"-->
            <!--left-arrow-->
            <!--@click-left="goBack"-->
    <!--/>-->
      <van-cell-group>
          <van-cell :title="item.title" is-link :value="item.name" v-for="(item,index) in listData" @click="goParam(index)"/>
      </van-cell-group>
  </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Field,Button } from 'vant';
    import qs from 'qs'
    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [Field.name]: Field,
            [Button.name]: Button,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                value: "",
                title: "",
                id:0,
                gender:"",
                listData:[
                    {
                        title:"志愿者姓名",
                        name:sessionStorage.realName,
                        zindex:0
                    },
                    {
                        title:"手机号码",
                        name:sessionStorage.phone,
                        zindex:1
                    },
                    {
                        title:"性别",
                        name:sessionStorage.sex,
                        zindex:2
                    },
                    {
                        title:"年龄",
                        name:sessionStorage.age,
                        zindex:3
                    },
                    {
                        title:"证件号",
                        name:sessionStorage.volunteerNo,
                        zindex:4
                    }
                ]
            };
        },
        beforeCreate:function(){
            let msg = this.$route.query
            let duges = sessionStorage.gender
            if (duges == 0){
                this.gender = "男"
            }else if (duges == 1){
                this.gender = "女"
            }
            sessionStorage.sex = this.gender
        },
        methods: {
            goParam:function(index){
                sessionStorage.zindex = this.listData[index].zindex
                this.$router.push({name:'change',query:this.listData[index]})
            }
        }
    };
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
.van{
  &-nav-bar{
    font-size: .4rem;
    height: .92rem;
    line-height: .92rem;
    /deep/ .van-icon{
      color: #666;
    }
    /deep/ .van-nav-bar__title{
      font-size: .4rem;
    }
  }
  /*标题字体*/
  &-nav-bar__title{
    font-size: .4rem;
  }
  &-nav-bar &-icon{
    color: #666;
  }
  &-cell-group{
    margin: .2rem 0;
    .van-cell{
      padding: .3rem .4rem;
    }
  }
  &-set-submit{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      font-size: .24rem;
      color: #898989;
      text-align: center;
    }
    button{
      width: 6.6rem;
      height: .84rem;
      line-height: .84rem;
      background-color: #58BF8A;
      border-color: #58BF8A;
      font-size: .32rem;
      color: #fff;
      margin-top: .32rem;
    }
  }
}
</style>
