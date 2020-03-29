<template>
    <view class="survey">
        <view class="detail">
            <view class="title">大学生就业满意度调查</view>
            <view class="imgbox">
                <image
                    class="detailimg"
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028694485&di=e90ac55efaaf43cecf702eccaf4da96b&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F80%2F81%2F22bOOOPICe4_1024.jpg"
                ></image>
            </view>
            <view class="num">共18题，一共9095个人参与</view>
			<image class="logo" src="../../../static/icon/back.png"></image>
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

<style scoped>
.detail {
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    background-color: #fff;
    position: relative;
}
.title {
    font-size: 23rpx;
    padding-top: 20rpx;
    margin-left: 20rpx;
}
.imgbox {
    margin: 0 auto;
    text-align: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
}
.detailimg {
    width: 670rpx;
    height: 360rpx;
}
.num {
    font-size: 23rpx;
    padding: 20rpx;
}
.logo{
	width: 12rpx;
	height: 22rpx;
    position: absolute;
    top:480rpx;
    right: 20rpx;
}
</style>
