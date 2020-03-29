<template>
    <view class="addProject">
        <view class="list">
            <view class="title">附件名称</view>
            <view class="content flex"><input class="uni-input" focus placeholder="如: 我的荣誉证书(最多20个字)" maxlength="20" /></view>
        </view>
        <view class="picture-wrap" @click="openPopup">
            <view class="line across"></view>
            <view class="line erect"></view>
            <uni-popup class="popup" ref="popup" type="bottom">
                <view class="pop-top">
                    <view class="pop-list">拍照</view>
                    <view class="pop-list">从手机相册选择</view>
                </view>
                <view class="cancel-box"><view class="cancel" @click="closePopup">取消</view></view>
            </uni-popup>
        </view>
        <view class="discribe">支持图片类、doc、docx、pdf、格式的文件,每个文件大小不超过10M,最多可上传9个文件</view>
    </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
    data() {
        return {};
    },
    components: {uniPopup},
    mounted() {},
    computed: {},
    methods: {
        openPopup() {
            this.$refs.popup.open();
        },
        closePopup() {
            this.$refs.popup.close();
        }
    }
};
</script>

<style lang="scss" scoped>
.addProject {
    padding: 20rpx;
}
.list {
    padding: 16rpx 0;
    border-bottom: 1rpx solid #f2f2f2;
    .title {
        font-size: 24rpx;
        color: #999999;
        line-height: 50rpx;
    }
    .content {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 30rpx;
        color: #333333;
        .back-icon {
            width: 13rpx;
            height: 24rpx;
        }
        /deep/ .uni-input {
            width: 98%;
        }
    }
}
.popup {
    text-align: center;
    background: #e6e6e6;
    color: #000000;
    .pop-top {
        .pop-list {
            line-height: 100rpx;
            border-bottom: 1rpx solid #e6e6e6;
            &:last-child {
                border-bottom: none;
            }
        }
    }
    .cancel-box {
        background: #e6e6e6;
        padding-top: 20rpx;
        .cancel {
            background: #ffffff;
            line-height: 100rpx;
        }
    }
}
.picture-wrap {
    margin: 20rpx 0;
    width: 200rpx;
    height: 200rpx;
    background: #eeeeee;
    position: relative;
    .line {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #aaaaaa;
    }
    .across {
        width: 80rpx;
        height: 4rpx;
    }
    .erect {
        width: 4rpx;
        height: 80rpx;
    }
}
.discribe {
    font-size: 24rpx;
    color: #999999;
    line-height: 36rpx;
}
</style>
