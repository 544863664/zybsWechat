<template>
    <view class="invitation">
        <view>
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="tabClick('0')">待确认</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="tabClick('1')">已接受</view>
                <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="tabClick('2')">已拒绝</view>
            </view>
            <view class="main" v-show="inv == 0">
                <view class="invitation-box" v-for="(work, index) in waitList" :key="index">
                    <view class="top">
                        <image class="invitation-icon middle" src="../../../static/icon/company-icon.png"></image>
                        <view class="title middle">武汉中科通达科学技术有限公司</view>
                    </view>
                    <view class="detail">
                        这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
                    </view>
                    <view class="time flex">
                        <view>
                            <text class="time-title middle">面试时间：</text>
                            <text class="time-detail middle">2019-11-11 10:00</text>
                        </view>
                        <view>
                            <text class="time-amend middle">修改面试时间</text>
                            <image class="top-logo middle" src="../../../static/icon/back.png"></image>
                        </view>
                    </view>
                    <view class="accept">
                        <text class="takein">接受</text>
                        <text class="refuse">拒绝</text>
                    </view>
                </view>
            </view>
            <view class="main" v-show="inv == 1">
                <view class="invitation-box" v-for="(work, index) in acceptList" :key="index">
                    <view class="top">
                        <image class="invitation-icon middle" src="../../../static/icon/company-icon.png"></image>
                        <view class="title middle">武汉中科通达科学技术有限公司</view>
                    </view>
                    <view class="detail">
                        这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
                    </view>
                    <view class="time-box">
                        <text class="time-title">面试时间：</text>
                        <text class="time-detail-box">2019-11-11 10:00</text>
                    </view>
                </view>
            </view>
            <view class="main" v-show="inv == 2">
                <view class="invitation-box" v-for="(work, index) in rejectList" :key="index">
                    <view class="top">
                        <image class="invitation-icon middle" src="../../../static/icon/company-icon.png"></image>
                        <view class="title middle">武汉中科通达科学技术有限公司</view>
                    </view>
                    <view class="detail">
                        这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
                    </view>
                    <view class="time-box">
                        <text class="time-title">面试时间：</text>
                        <text class="time-detail-box">2019-11-11 10:00</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                inv: 0,
                waitList: [],
                acceptList: [],
                rejectList: []
            };
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            })
        },
        onShow() {
            this.switchList();
        },
        methods: {
            tabClick(inv){
                this.inv = inv;
                this.switchList();
            },
            switchList() {
                switch (this.inv) {
                    case 0:
                        this.getWaitList();
                        break;
                    case 1:
                        this.getAcceptList();
                        break;
                    case 2:
                        this.getRejectList();
                        break;
                }
            },
            /* 面试邀约(待确认) */
            getWaitList() {
                this.$http({
                    url: '/qz/qymyxx/listWait',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.waitList = data.data.listWait;
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            /* 面试邀约(已接受) */
            getAcceptList() {
                this.$http({
                    url: '/qz/qymyxx/listAccepted',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.acceptList = data.data.listAccepted;
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            },
            /* 面试邀约(已拒绝) */
            getRejectList() {
                this.$http({
                    url: '/qz/qymyxx/listDenied',
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.rejectList = data.data.listDenied;
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        uni.showToast({
                            title: '获取失败!'
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .invitation {
        height: 100%;
        white-space: normal !important;
    }

    .swiper {
        height: 100%;
    }

    .nav {
        height: 100%;
    }

    .main {
        padding: 20rpx;
    }

    .invitation-box {
        position: relative;
        box-shadow: 0 0 5rpx #ccc;
        border-radius: 12rpx;
        background-color: #fff;
        margin-bottom: 20rpx;
    }

    .invitation-box:last-child {
        margin-bottom: none;
    }

    .top {
        /* overflow: hidden; */
        border-bottom: 1rpx solid #f2f2f2;
        height: 70rpx;
        line-height: 70rpx;
        padding: 0 20rpx;
    }

    .title {
        // float: left;
        font-size: 26rpx;
        color: #999999;
        margin-left: 10rpx;
    }

    .invitation-icon {
        width: 34rpx;
        height: 34rpx;
        margin-right: 10rpx;
        // float: left;
    }

    .detail {
        color: #999999;
        font-size: 26rpx;
        border-bottom: 1rpx solid #f2f2f2;
        line-height: 40rpx;
        text-indent: 2rem;
        padding: 20rpx;
    }

    .time {
        border-bottom: 1rpx solid #f2f2f2;
        height: 70rpx;
        line-height: 70rpx;
        padding: 0 20rpx;
    }

    .time-title {
        font-size: 26rpx;
        margin-right: 10rpx;
    }

    .time-detail {
        color: #999999;
        font-size: 24rpx;
    }

    .time-amend {
        color: #999999;
        font-size: 26rpx;
        margin-right: 10rpx;
    }

    .line {
        width: 3rpx;
        height: 62rpx;
        position: absolute;
        /*   top: 206rpx; */
        left: 340rpx;
        bottom: 37rpx;
    }

    .accept {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30rpx;
        font-weight: 600;
        text-align: center;
        line-height: 80rpx;
    }

    .accept text {
        flex: 1;
    }

    .takein {
        border-right: 1rpx solid #f2f2f2;
    }

    .takein:hover {
        color: #fe9038;
    }

    .refuse:hover {
        color: #fe9038;
    }

    .time-box {
        line-height: 70rpx;
        padding: 0 20rpx;
    }

    .top-logo {
        width: 12rpx;
        height: 22rpx;
    }

    .time-detail-box {
        color: #999999;
        font-size: 23rpx;
    }

    .inv-h-w {
        display: flex;
        border-bottom: 1rpx solid #f2f2f2;
        background: #ff8421;
        font-size: 30rpx;
        color: #ffdd9a;
        height: 80rpx;
    }

    .inv-h {
        flex: 1;
        text-align: center;
        margin: 0 80rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin-top: 10rpx;
    }

    .inv-h-se {
        color: #ffffff;
        border-bottom: 3rpx solid #ffffff;
        font-weight: 600;
    }
</style>
