<template>
    <view class="selfEvaluate">
        <view class="title">培训课程</view>
        <textarea class="text-wrap" @blur="bindTextAreaBlur" focus="true" auto-height maxlength="500" placeholder="请输入" />
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    mounted() {},
    methods: {
        bindTextAreaBlur: function(e) {
            console.log(e.detail.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.selfEvaluate {
    height: 100%;
    padding: 20rpx;
    .title {
        font-size: 30rpx;
        color: #000000;
        font-weight: 600;
        line-height: 60rpx;
    }
    .text-wrap {

    }
    /deep/ textarea{
        border: 1rpx solid #FAFAFA !important;
        height: 200rpx !important;
        padding: 0 !important;
        margin-top: 20rpx;
        line-height: 40rpx;
    }
}
</style>
