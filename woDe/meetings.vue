<template>
    <view class="meeting">
        <view class="head">
            <view class="head-img"><image class="img" src="../../../static/icon/2.png"></image></view>
            <view class="head-text">
                <view class="title">陕西省高校硕士、博士毕业研究生专场 招聘会（西工大站）</view>
                <view class="word">主办单位：中研博硕英才网</view>
            </view>
        </view>
        <view class="sign">
            <view class="time">
                <image class="time-img" src="../static/icon/sign-icon.png"></image>
                <text class="time-text">签到时间：2019-08-27 14:00至2019-08-27 18:00</text>
            </view>
            <view class="local">
                <image class="local-img" src="../static/icon/adress.png"></image>
               <text class="local-text">签到地点：清华大学 | 北京市海淀区大喇叭村2队250号</text>
            </view>
            
        </view>
        <view class="apply"><text class="apply-text">报名/签到</text></view>
        <view class="check">
            <image class="check-img" src="../../../static/icon/qiandao.png"></image>
            <view class="check-text">请出示签到页面，入场给工作人员查看</view>
            <view class="check-time">23:13:43</view>
        </view>
        <view class="apply"><text class="apply-text">补贴领取信息</text></view>
        <view class="msg">
            <view class="msg-one">附件简历（名称）：</view>
            <view class="msg-two">
                审核通过，待领取补贴
                <text class="num">50</text>
            </view>
            <view class="msg-three">以下是补贴二维码，请勿重复领取补贴，请妥善保存</view>
            <view class="msg-box"><image class="msg-img" src="../../../static/icon/erweima.png"></image></view>
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
.meeting {
    height: 100%;
    background-color: #ffffff;
    padding-bottom: 100rpx;
    .head {
        height: 182rpx;
        border-bottom: 1rpx solid #f2f2f2;
        padding: 27rpx 45rpx 27rpx 35rpx;
        display: flex;
        justify-content: space-between;
        .head-img {
            .img {
                width: 128rpx;
                height: 128rpx;
            }
        }
        .head-text {
            height: 114rpx;
            width: 519rpx;
            .title {
                color: #333333;
                font-weight: bold;
                font-size: 30rpx;
            }
            .word {
                font-size: 24rpx;
                color: #333333;
                margin-top: 20rpx;
            }
        }
    }
    .sign {
        height: 145rpx;
        padding: 33rpx 0 33rpx 38rpx;
        .time {
            .time-img {
                width: 25rpx;
                height: 25rpx;
                vertical-align: middle;
            }
            .time-text {
                font-size: 24rpx;
                color: #999999;
                margin-left: 10rpx;
            }
        }
        .local {
            margin-top: 20rpx;
            .local-img {
                width: 25rpx;
                height: 25rpx;
                vertical-align: middle;
            }
            .local-text {
                font-size: 24rpx;
                color: #999999;
                margin-left: 10rpx;
            }
        }
    }
    .apply {
        height: 60rpx;
        width: 100%;
        background-color: #f2f2f2;
        padding: 14rpx 0 14rpx 39rpx;
        color: #333333;
        font-weight: bold;
    }
    .check {
        width: 100%;
        height: 383rpx;
        padding: 73rpx 110rpx 110rpx 110rpx;
        text-align: center;
        .check-img {
            width: 530rpx;
            height: 112rpx;
        }
        .check-text {
            font-size: 24rpx;
            color: #999999;
        }
        .check-time {
            color: #333333;
            font-size: 30rpx;
            font-weight: bold;
            margin-top: 17rpx;
        }
    }
    .msg {
        padding: 30rpx 0 30rpx 40rpx;
        font-size: 26rpx;
        color: #333333;
        background-color: #ffffff;
        .msg-one {
            font-weight: bold;
            margin-bottom: 15rpx;
        }
        .msg-two {
            margin-bottom: 15rpx;
            .num {
                color: #ff8421;
                font-weight: bold;
            }
        }
        .msg-three {
            margin-bottom: 15rpx;
        }
        .msg-box {
            text-align: center;
            .msg-img {
                width: 368rpx;
                height: 368rpx;
            }
        }
    }
}
</style>
