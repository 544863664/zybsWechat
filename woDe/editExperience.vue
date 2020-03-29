<template>
    <view class="page">
        <view class="experience">
            <view class="frame-wrap">
                <view class="list">
                    <view class="describe">公司名称</view>
                    <view class="detail">
                        <text class="menu">请输入</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
                <view class="list">
                    <view class="describe">职位名称</view>
                    <view class="detail">
                        <text class="menu">请选择</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
            </view>
            <view class="frame-wrap">
                <view class="list">
                    <view class="describe">入职时间</view>
                    <view class="detail">
                        <text class="menu">请选择</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
                <view class="list">
                    <view class="describe">离职时间</view>
                    <view class="detail">
                        <text class="menu">请选择</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
            </view>
            <view class="frame-wrap">
                <view class="list">
                    <view class="describe">所属行业</view>
                    <view class="detail">
                        <text class="menu">请选择</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
                <view class="list">
                    <view class="describe">月薪</view>
                    <view class="detail">
                        <text class="menu">请选择</text>
                        <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
                    </view>
                </view>
            </view>
            <view class="frame-wrap">
                <view class="list">
                    <view class="describe">工作内容</view>
                    <view class="uni-textarea"><textarea placeholder-style="color:#999999" placeholder="请输入" /></view>
                </view>
            </view>
        </view>
        <van-button class="save" type="primary" size="large" color="#ff8421" @click="save">保存</van-button>
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
.page {
    height: 100%;
    background: #ffffff;
}
.experience {
    padding: 20rpx 20rpx 120rpx 20rpx;
}
.frame-wrap {
    border-bottom: 1rpx solid #f2f2f2;
    .list {
        padding: 16rpx 0;
        .describe {
            font-size: 24rpx;
            color: #999999;
            line-height: 50rpx;
        }
        .detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 50rpx;
            .menu {
                font-size: 30rpx;
                color: #cccccc;
            }
            .back-icon {
                width: 13rpx;
                height: 24rpx;
            }
        }
    }
    &:last-child {
        border-bottom: none;
    }
}
.save {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
</style>
