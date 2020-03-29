<template>
    <view class="setting">
        <navigator url="/woDe/binding" class="list-wrap">
            <view url="" class="list">
                <view class="title">手机号绑定</view>
                <view class="badge">
                    <text>135****3568</text>
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">修改密码</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">关于我们</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">服务协议</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">隐私政策</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">法律声明</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">营业执照</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
        <navigator class="list-wrap">
            <view url="" class="list">
                <view class="title">账号注销</view>
                <view class="badge">
                    <image class="back-icon" src="../static/icon/back.png" mode="aspectFit"></image>
                </view>
            </view>
        </navigator>
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
.setting {
    // padding: 0 20rpx;
}
.list-wrap {
    padding: 0 20rpx;
    .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 110rpx;
        border-bottom: 1rpx solid #f2f2f2;
        .title {
            font-size: 26rpx;
            color: #333333;
        }
        .badge {
            font-size: 24rpx;
            color: #999999;
            .back-icon {
                width: 13rpx;
                height: 22rpx;
                margin-left: 20rpx;
            }
        }
    }
}
</style>
