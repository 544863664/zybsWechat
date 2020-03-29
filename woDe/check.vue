<template>
    <view class="check">
        <view class="check-box"><view class="check-title">我的投递记录会被其他企业看到吗</view>
        <view class="check-text">
            不会被看到
        </view>
        </view>
       
    </view>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.check {
    height: 100%;
    background-color: #ffffff;
    padding: 0 20rpx;
    box-sizing: border-box;
    .check-box {
        height: 100%;
        background-color: #ffffff;
        .check-title{
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
            height: 100rpx;
            line-height: 100rpx;
            border-bottom: 1rpx solid #f2f2f2;
        }
        .check-text{
            font-size: 26rpx;
            color: #333333;
            line-height: 45rpx;
            margin-top: 20rpx;
            text-indent: 30rpx;
        }
    }
}
</style>
