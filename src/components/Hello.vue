<template>
    <div class="root"> 
        <div class="wraper">
            <div class="scroll">
                <div class="tab"> 
                    <el-carousel :interval="5000" 
                                arrow="never"  
                                height="200px">
                        <el-carousel-item v-for="(item,index) in tabImg" :key="index"> 
                            <img :src="item.img" width="100%" height="100%"> 
                        </el-carousel-item>
                    </el-carousel> 
                </div>
                <ul class="content">
                    <li v-for="item in list1">
                        <div class="img">
                            <img :src="item.picUrl" width="100%" height="100%">
                        </div>
                        <div class="desc">
                            <p>
                                {{item.topTitle}}
                            </p>
                        </div>
                    </li> 
                </ul>
            </div> 
        </div>  
        <div class="wraper2">
            <ul class="h">
                <li v-for="item in list1" class="hLi">
                    <img :src="item.picUrl" width="100%" height="100%">
                </li>
            </ul>
        </div>
        <div class="loadTest"> 
            <!-- <loading></loading> -->
            <myTem v-show="loadingShow"></myTem>
        </div>
    </div>
    
</template>

<script>
/**
 * 说明如下
 * 1 new出来的Bscroll有一个要求，就是要在能获取高度的前提下才不会出错
 * 2 由于tab选项卡的高度是固定的，是估计定下来的，所以默认就一定是可以正确获取到的
 * 3 而list列表的高度取决于数据，故需要等到数据回来并且dom更新后再初始化scroll
 * 4 如果数据更新后，需要手动的调用scroll方法来刷新，重新获取dom的高度
 * 5 list1的数据是依赖于list数据，所以list数变，list1才会变，然后才会dom更新
 */
import Bscoll from 'better-scroll' 
export default {
    data() {
        return {
            list: [],
            tabImg: [],
            loadingShow: true
        }
    },
    computed: { 
        list1() {
            let rondom = Math.floor(Math.random()*(15-7+1)+7);
            return this.list.slice(1, rondom);
        }
    },
    mounted() { 
        this.getListData();
        this.getImgData();
        // this.loadPoxy();
    },
    methods: {
        initBscoll() {
            let scroll = new Bscoll('.wraper', {
                scrollY: true,
                click: true
            }); 
        },
        /**
         * 横向的滚动，需要等数据加载回来并且dom更新之后，再去获取ul的宽度
         * ul如果宽度不会，就不能滑动
         */
        initHscroll() {
            let liNum = document.getElementsByClassName('hLi');
            let liWidth = liNum[0].offsetWidth;
            let ul = document.getElementsByClassName('h');
            let gasDis = liNum.length*2;
            let ulWidth = gasDis + liNum.length*liWidth; 
            ul[0].style.width = ulWidth + 'px'; 
            let Hscroll = new Bscoll('.wraper2', {
                scrollX: true
            });
        },
        getListData() {
            var _this = this; 
            setTimeout(function(){
                _this.$http.get('../../static/list.json').then(function(res){
                    _this.list = res.data.data.topList; 
                    _this.loadingShow = false;
                    _this.$nextTick(function(){
                        _this.initBscoll();
                        _this.initHscroll();
                    })  
                })
            },2000)
             
        },
        getImgData() {
            var _this = this; 
            setTimeout(function(){
                _this.$http.get('../../static/img.json').then((res)=>{
                    _this.tabImg = res.data.data;
                    _this.loadingShow = false;  
                }) 
            },2000)
             
        }
        /*loadPoxy() {
            this.$http.get('/api/product/list.do?keyword=手机').then(function(res){
                console.log(res)
            })
        }*/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    body{
        background-color: #999;
    }
    .wraper{
        width: 90%;
        height: 400px;  
        margin: 0 auto;
        overflow: hidden;
    } 
    .tab{
        width: 100%;
        height: 200px;
        margin-bottom: 2px;
        position: relative;
    }
    .Carousel{
        width: 100%;
        height: 200px;
    }
    .tab a{
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #fff; 
        text-decoration: none;
    }
    .content{
        text-align: center;
    }
    .content li{
        height: 80px; 
        background-color: green;
        margin-bottom: 2px;
        display: flex;
    }
    .img{
        flex: 0 0 80px;
        background-color: red;
    }
    .desc{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wraper2{
        width: 90%;
        height: 80px; 
        margin: 10px auto;
        overflow: hidden; 
    }
    .h{
        /*width: 1350px;*/
        height: 80px; 
        overflow: hidden;
        display: flex;
    } 
    .h li{
        flex: 0 0 88px; 
        height: 80px; 
        margin-right: 2px;
    }
</style>
