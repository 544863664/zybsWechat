<template>
    <view class="shield">
        <view class="shied-box">
            <view class="shied-title">如何让某些企业无法搜索到我的简历?</view>
            <view class="shied-text">操作方法如下: 点击下方的我的【隐私设置】-【在线隐藏简历】--- 【添加屏蔽企业】,添加的企业也无法查看您的在线简历。</view>
            <image class="shied-img" src="../static/icon/liucheng.png"></image>
            <image class="shied-imgtwo" src="../static/icon/liucheng2.png"></image>
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
.shield {
    height: 100%;
    background-color: #ffffff;
    padding: 0 20rpx;
    box-sizing: border-box;
    .shied-box {
        height: 100%;
        background-color: #ffffff;
        .shied-title {
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
            height: 100rpx;
            line-height: 100rpx;
            border-bottom: 1rpx solid #f2f2f2;
        }
        .shied-text {
            font-size: 26rpx;
            color: #333333;
            line-height: 45rpx;
            margin-top: 20rpx;
            text-indent: 30rpx;
        }
        .shied-img {
            width: 100%;
            height: 95%;
            margin-top: 10rpx;
        }
        .shied-imgtwo {
            width: 100%;
            height: 60%;
            margin-top: 30rpx;
        }
    }
}
</style>
