<template>
    <div class="wraper">
        <div class="scroll">
            <div class="tab">
                <img :src="tabImg" width="100%" height="100%">
                <a href="#">刷新可以改变list的数量</a>
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
            tabImg: ''
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
    },
    methods: {
        initBscoll() {
            let scroll = new Bscoll('.wraper')
        },
        getListData() {
            var _this = this; 
            _this.$http.get('../../static/list.json').then(function(res){
                _this.list = res.data.data.topList; 
                _this.$nextTick(function(){
                    _this.initBscoll();
                })  
            }) 
        },
        getImgData() {
            var _this = this; 
            _this.$http.get('../../static/img.json').then((res)=>{
                _this.tabImg = res.data.img;  
            })  
        }
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
    .wraper{
        width: 90%;
        height: 500px; 
        background-color: #eee;
        margin: 0 auto;
        overflow: hidden;
    }
    .tab{
        width: 100%;
        height: 200px;
        margin-bottom: 5px;
        position: relative;
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
</style>
