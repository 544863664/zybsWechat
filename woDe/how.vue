<template>
    <view class="how">
         <view class="how-box">
           <view class="how-title">
               我是企业，如何在博士投招人?
           </view>
           <view class="how-text">
                 登录hr端
           </view>
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

<style lang="scss" scoped>
    .how{
        height: 100%;
        background-color: #ffffff;
        padding: 0 20rpx;
        box-sizing: border-box;
        .how-box{
            height: 100%;
            background-color: #ffffff;
            .how-title{
                font-weight: bold;
                font-size: 36rpx;
                color: #333333;
                height: 100rpx;
                line-height: 100rpx;
                border-bottom: 1rpx solid #f2f2f2;
            }
            .how-text{
                font-size: 26rpx;
                color: #333333;
                line-height: 45rpx;
                margin-top: 20rpx;
                text-indent: 30rpx;
            }
        }
    }
</style>
