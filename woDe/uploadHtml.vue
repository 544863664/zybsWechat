<template>
    <view>
        <view>
            {{fullLink}}
        </view>
        <view>
            <web-view @message="test" :webview-styles="webviewStyles" :src="fullLink"></web-view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex';
    import dateUtil from '@/common/dateUtil.js';
    import {
        getWxfileupload
    } from '@/common/js/baseUrl.js';

    export default {
        computed: {

            ...mapGetters('loginState', {
                token: 'getToken'
            }),

            fullLink() {
                let date = new Date().getTime();
                let url = getWxfileupload()+"/wxfileupload/index.html" + "#/" + this.token+"&date="+date;
                console.log("url = ", url);
                return url;
            }

        }
    };
</script>

<style scoped>
    .top-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 83rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
        font-size: 22rpx;
        color: #999999;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .top-logo {
        width: 12rpx;
        height: 22rpx;
    }

    .image-box {
        width: 397rpx;
        height: 311rpx;
        margin-top: 49rpx;
        margin-left: 163rpx;
    }

    .text-box {
        width: 594rpx;
        height: 73rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 45rpx;
        color: #999999;
        text-align: center;
        margin: 64rpx 0 0 78rpx;
    }

    .computer {
        width: 593rpx;
        height: 80rpx;
        /* background: #ff8a20; */
        border: 3rpx solid #fe9038;
        border-radius: 40rpx;
        margin: 104rpx 0 0 79rpx;
        text-align: center;
        line-height: 80rpx;
        font-size: 32rpx;
        color: #ff8a20;
    }

    .phone {
        width: 593rpx;
        height: 80rpx;
        border: 3rpx solid #fe9038;
        border-radius: 40rpx;
        margin: 33rpx 0 0 79rpx;
        text-align: center;
        line-height: 80rpx;
        font-size: 32rpx;
        color: #ff8a20;
    }

    .instructions {
        /* width:588rpx;
  height:20rpx; */
        font-size: 20rpx;
        font-weight: 400;
        color: #999999;
        line-height: 45px;
        margin: 31rpx 0 0 78rpx;
    }

    .instructions-detail {
        color: #ff8a20;
    }

    .computer:hover {
        background-color: #ff8a20;
        color: #ffffff;
    }

    .phone:hover {
        background-color: #ff8a20;
        color: #ffffff;
    }
</style>
