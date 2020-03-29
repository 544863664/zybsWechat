<template>
    <view class="enterprise">
         <view class="yetbox">
             <text class="yet">已屏蔽企业（2个）</text>
         </view>
         <view class="yet-company" v-for="(item,i) in 3" :key="i">
             <text class="company-name">武汉天丰科技有限公司</text>
             <image class="compayn-btn" src="../../../static/icon/pbdw.png"></image>
         </view>
    </view>
</template>

<script>
    export default{
        data(){
            return{ 

            }
        }
    }
</script>

<style scopt>
    .yetbox{
        background-color: #FFFFFF;
        border-bottom: 1rpx solid #F2F2F2;
        position: relative;
        width: 100%;
        height: 127rpx;
    }
    .yet{
        color:#333333;
        font-size: 30rpx;
        font-weight: bold;
        position: absolute;
        top:48rpx;
        left:31rpx;
    }
    .yet-company{
        background-color: #FFFFFF;
        border-bottom: 1rpx solid #F2F2F2;
        position: relative;
        width: 100%;
        height: 127rpx;
    }
    .company-name{
        color: #333333;
        font-size: 30rpx;
        position: absolute;
        top:45rpx;
        left:31rpx;
    }
    .compayn-btn{
        width: 150rpx;
        height: 48rpx;
        position: absolute;
        top:42rpx;
        right: 31rpx;
    }
</style>
