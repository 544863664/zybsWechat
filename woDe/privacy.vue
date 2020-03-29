<template>
    <view class="privacy">
        <view class="name" v-for="(item, i) in 2" :key="i">
            <image class="head" src="../../../static/icon/nan.png"></image>
            <text class="namedetail">雷玉洁</text>
            <text class="nametrue">(使用实名展示)</text>
            <checkbox class="_checkbox M0f981aea round orange checked btn" value="C"></checkbox>
        </view>
        <view class="company">
            <view class="company-hidden">
                <view class="hidden">隐藏在线简历</view>
                <switch bind change="handleProxy" class="_switch M0f981aea orange checked choose" data-comkey="0" data-eventid="0f981aea-6"></switch>
            </view>
            <view class="shielding" @click="goenterprise">
                <view class="shielding-title">屏蔽企业</view>
                <image class="shielding-img" src="../../../static/icon/back.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },

    methods: {
        goenterprise(){
            uni.navigateTo({
                url:"/woDe/enterprise"
            })
        }
    }
};
</script>

<style>
.name {
    height: 200rpx;
    width: 100%;
    background-color: #ffffff;
    border-bottom: 1rpx solid #f2f2f2;
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
}
.head {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    position: absolute;
    top: 55rpx;
    left: 50rpx;
}
.namedetail {
    position: absolute;
    top: 86rpx;
    left: 179rpx;
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
}
.nametrue {
    position: absolute;
    top: 90rpx;
    left: 278rpx;
    font-size: 24rpx;
    font-weight: 400;
}
.btn {
    position: absolute;
    right: 54rpx;
    top: 87rpx;
}
.company {
    width: 100%;
    height: 776rpx;
    margin-top: 30rpx;
    background-color: #ffffff;
}
.company-hidden {
    width: 100%;
    height: 128rpx;
    border-bottom: 1rpx solid #f2f2f2;
    background-color: #ffffff;
}
.hidden {
    position: absolute;
    top: 474rpx;
    left: 50rpx;
}
.choose {
    position: absolute;
    top: 480rpx;
    right: 48rpx;
}
.shielding {
    width: 100%;
    height: 128rpx;
    border-bottom: 1rpx solid #f2f2f2;
    background-color: #ffffff;
}
.shielding-title {
    position: absolute;
    top: 600rpx;
    left: 50rpx;
    color: #333333;
}
.shielding-img{
    width: 13rpx;
    height: 22rpx;
    position: absolute;
    top:613rpx;
    right: 48rpx;
}
.shielding-title{
    color:#999999;
    font-size: 24rpx;
}
</style>
