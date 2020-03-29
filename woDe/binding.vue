<template>
    <view class="binding">
        <view class="current-bind">当前绑定手机号</view>
        <view class="number">136 **** 0632</view>
        <view class="input-wrap">
            <view class="choose middle">
                <text class="middle">+86</text>
                <image class="triangle middle" src="../static/icon/triangle.png" mode="aspectFit"></image>
            </view>
            <view class="ipt-wrap"><input class="ipt middle" type="number" value="" placeholder="请输入新手机号" /></view>
        </view>
        <view class="input-wrap">
            <view class="choose middle"><image class="msg middle" src="../static/icon/msg.png" mode="aspectFit"></image></view>
            <view class="ipt-wrap">
                <input class="ipt middle" type="number" value="" placeholder="验证码" />
                <view class="code">获取验证码</view>
            </view>
        </view>
        <button class="amend" type="primary">确定更改手机号码</button>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    mounted() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.binding {
    height: 100%;
    padding: 100rpx 60rpx;
    .current-bind {
        font-size: 24rpx;
        color: #666666;
        text-align: center;
        line-height: 50rpx;
    }
    .number {
        font-size: 30rpx;
        color: #444444;
        text-align: center;
        line-height: 50rpx;
        padding-bottom: 20rpx;
    }
    .input-wrap {
        width: 100%;
        margin: 30rpx auto;
        box-shadow: 0 0 10rpx #e9e9e9;
        border-radius: 12rpx;
        background: #ffffff;
        margin-bottom: 20rpx;
        padding: 20rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        .choose {
            border-right: 1rpx solid #f2f2f2;
            width: 80rpx;
            text-align: center;
            color: #ff8520;
            .triangle {
                width: 24rpx;
                height: 16rpx;
                padding: 0 6rpx;
                margin-bottom: 3rpx;
            }
            .msg {
                width: 36rpx;
                height: 36rpx;
            }
        }
        .ipt-wrap {
            width: calc(100% - 80rpx);
            display: inline-block;
            position: relative;
            .ipt {
                padding-left: 14rpx;
                width: 100%;
            }
            .code {
                width: 130rpx;
                height: 40rpx;
                line-height: 40rpx;
                text-align: center;
                border: 1rpx solid #ff8520;
                border-radius: 20rpx;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20rpx;
                color: #ff8520;
                z-index: 10;
            }
        }
    }
    .amend {
        background: #ff8520;
        margin-top: 50rpx;
        font-size: 26rpx;
        height: 80rpx;
        line-height: 80rpx;
    }
}
</style>
