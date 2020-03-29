<template>
    <view class="recall">
        <view class="recall-box">
            <view class="recall-title">
                投出去的简历还能撤回吗?
            </view>
            <view class="recall-text">
                不能
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
    .recall{
        height: 100%;
        background-color: #ffffff;
        padding: 0 20rpx;
        box-sizing: border-box;
        .recall-box{
            height: 100%;
            background-color: #ffffff;
            .recall-title{
                font-weight: bold;
                font-size: 36rpx;
                color: #333333;
                height: 100rpx;
                line-height: 100rpx;
                border-bottom: 1rpx solid #f2f2f2;
            }
            .recall-text{
                font-size: 26rpx;
                color: #333333;
                line-height: 45rpx;
                margin-top: 20rpx;
                text-indent: 30rpx;
            }
        }
    }
</style>
