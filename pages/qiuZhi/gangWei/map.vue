<template>
    <view class="page-body">
        <view class="page-section page-section-gap">
            <map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
        </view>
        <view class="search-line">
            <view class="line-wrap">
                <view class="line-title">珞喻路</view>
                <view class="line-adress">地址: 武汉市洪山区光谷大道139号</view>
                <view class="check-line">
                    <view class="other">
                        <image class="other-icon" src="../../../static/icon/other-icon.png" mode="aspectFit"></image>
                        <text class="other-text">其他导航</text>
                    </view>
                    <van-button class="check-btn" type="primary" size="normal" color="#ff8421">查看路线</van-button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'map',
            latitude: 30.59,
            longitude: 114.3,
            scale: 6,
            // 'show-location': 'true',
            covers: [
                {
                    latitude: 30.59,
                    longitude: 114.3,
                    iconPath: '../../static/start.png'
                }
            ]
        };
    },
    methods: {}
};
</script>

<style scoped>
.page-body,
.page-section.page-section-gap {
    height: 100%;
}
.search-line {
    width: 100%;
    padding: 20rpx;
    position: fixed;
    left: 0;
    bottom: 0;
}
.line-wrap {
    background: #ffffff;
    color: #333333;
    box-shadow: 0 0 10rpx #e9e9e9;
    border-radius: 12rpx;
    padding: 24rpx;
}
.line-title {
    font-size: 28rpx;
    font-weight: 600;
}
.line-adress {
    font-size: 24rpx;
    line-height: 60rpx;
}
.other-icon {
    width: 36rpx;
    height: 40rpx;
}
.check-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rpx 0 10rpx;
}
.other {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 26%;
    height: 44px;
}
.other-text{
    font-size: 20rpx;
}
.check-btn{
    width: 74%;
}
.check-btn /deep/ .van-button.van-button--primary.van-button--normal{
    width: 100%;
    border-radius: 12rpx;
}
</style>
