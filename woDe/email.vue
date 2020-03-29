<template>
    <view class="email">
        <view class="email-box">
            <view class="email-title">如何修改邮箱</view>
            <view class="email-text">操作方法如下: 点击下方的我的页面 -- 再点击编辑图标到个人信息 -- 再点击编辑图标即可编辑邮箱</view>
            <view class="img-box">
                <image class="email-img" src="../static/icon/45664.png"></image>
                <image class="email-imgtwo" src="../static/icon/sdead.png"></image>
                <image class="email-imgthree" src="../static/icon/xzzxc.png"></image>
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
.email {
    background-color: #ffffff;
    height: 100%;
    padding: 0 20rpx;
    box-sizing: border-box;
    .email-box {
        height: 100%;
        background-color: #ffffff;
        .email-title {
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
            height: 100rpx;
            line-height: 100rpx;
            border-bottom: 1rpx solid #f2f2f2;
        }
        .email-text {
            font-size: 26rpx;
            color: #333333;
            line-height: 45rpx;
            margin-top: 20rpx;
            text-indent: 30rpx;
        }
        .img-box {
            height:100%;
            background-color:#FFFFFF;
            .email-img {
                width: 100%;
                height: 30%;
                margin-top: 10rpx;
            }
            .email-imgtwo {
                width: 100%;
                height: 40%;
                margin-top: 10rpx;
            }
            .email-imgthree {
                width: 100%;
                height: 55%;
                margin-top: 20rpx;
            }
        }
    }
}
</style>
