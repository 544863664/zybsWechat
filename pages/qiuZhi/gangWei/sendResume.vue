<template>
    <view class="sendResume">
        <view class="send-top">
            <image class="send-img" src="../../../static/icon/send.png" mode="aspectFit"></image>
            <view class="send-text">投递成功!</view>
        </view>
        <view class="list-wrap">
            <view class="push-tip">投递了该职位的博友还投递了以下职位</view>
            <view class="push-list">
                <view class="list" v-for="(item, i) in 5" :key="i">
                    <view><van-checkbox :value="checked" :checked-color="bgcolor" bind:change="onChange"></van-checkbox></view>
                    <view class="list-main">
                        <view class="title flex flex-wrap justify-between align-center">
                            <text class="job-title">软件开发工程师</text>
                            <text class="wage">12-20k • 13薪</text>
                        </view>
                        <view class="limit">
                            <text>武昌区</text>
                            <text>武珞路</text>
                            <text>经验不限</text>
                            <text>学历不限</text>
                        </view>
                        <view class="company-wrap">
                            <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFit"></image>
                            <text class="company-name">武汉中科通达科学技术有限责任公司</text>
                        </view>
                        <view class="press-btn flex flex-wrap justify-between align-center">
                            <view>
                                <van-button type="info" size="small">武汉</van-button>
                                <van-button type="info" size="small">国企</van-button>
                                <van-button type="info" size="small">互联网金融</van-button>
                                <van-button type="info" size="small">100-1000人</van-button>
                            </view>
                            <text class="date">8月29号</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="send" @click="sendResume">一键投递</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            checked: true,
            bgcolor: '#ffba00'
        };
    },
    methods: {
        onChange(event) {
            this.setData({
                checked: event.detail
            });
        },
        sendResume() {
            uni.navigateTo({
                url: '/pages/qiuZhi/gangWei/map'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.sendResume {
    background: #fafafa;
    .send {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        background-color: #ff8421;
        text-align: center;
        color: #ffffff;
        font-size: 30rpx;
        font-weight: bold;
        z-index: 10;
    }
}
.send-top {
    text-align: center;
    padding: 70rpx 0;
    .send-img {
        height: 320rpx;
        width: 360rpx;
    }
    .send-text {
        color: #ff8421;
        font-size: 30rpx;
        font-weight: 600;
        margin-top: 30rpx;
    }
}
.list-wrap {
    .push-tip {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
    }
    .push-list {
        padding: 20rpx 20rpx 100rpx;
        .list {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            padding: 20rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;
            .list-main {
                padding-left: 30rpx;
                width: 100%;
                .job-title {
                    font-weight: 600;
                    color: #333333;
                    font-size: 30rpx;
                }
                .wage {
                    color: #ff8421;
                    font-size: 28rpx;
                    font-weight: 600;
                }
                .limit {
                    font-size: 20rpx;
                    color: #b2b2b2;
                    overflow: hidden;
                    margin: 18rpx 0;
                    text {
                        padding: 0 10rpx;
                        border-right: 1px solid #cccccc;
                        float: left;
                    }
                    text:first-child {
                        padding-left: 0;
                    }
                    text:last-child {
                        border-right: none;
                    }
                }
                .company-wrap {
                    height: 34rpx;
                    line-height: 34rpx;
                    .company-icon {
                        display: inline-block;
                        vertical-align: middle;
                        width: 34rpx;
                        height: 100%;
                    }
                    .company-name {
                        display: inline-block;
                        vertical-align: middle;
                        margin-left: 16rpx;
                        font-size: 26rpx;
                        color: #808080;
                    }
                }
                .press-btn {
                    margin-top: 20rpx;
                    uni-button {
                        color: #999999;
                    }
                    van-button {
                        margin-right: 10rpx;
                    }
                    .date {
                        font-size: 20rpx;
                        color: #b2b2b2;
                    }
                }
            }
        }
    }
}
</style>
