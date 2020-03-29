<template>
    <view v-if="!hasLogin"><login /></view>
    <view v-else>
        <view class="message">
            <view class="top"></view>
            <view class="head">
                <view class="send" @click="gomysend">
                    <view class="cell"><min-badge count="0" maxCount="99"></min-badge></view>
                    <image class="sendimg" src="../../../static/icon/wdtd.png"></image>
                    <view class="sendmsg">我的投递</view>
                </view>
                <view class="line-box"></view>
                <view class="see" @click="gocheck">
                    <view class="cell"><min-badge :count="ckjlCount" maxCount="99"></min-badge></view>
                    <image class="seeimg" src="../../../static/icon/skgw.png"></image>
                    <view class="seemsg">谁看过我</view>
                </view>
                <view class="line-box"></view>
                <view class="invite" @click="goinvitation">
                    <view class="cell"><min-badge count="0" maxCount="99"></min-badge></view>
                    <image class="inviteimg" src="../../../static/icon/msyy.png"></image>
                    <view class="invitemsg">面试邀约</view>
                </view>
            </view>
        </view>
        <view class="msgDetail" @click="gonotice">
            <image class="msgimg" src="../../../static/icon/hxtz.png"></image>
            <text class="title">会讯通知</text>
            <text class="check">{{ xxmc }}</text>
            <text class="time">今天09:21</text>
        </view>
        <view class="msgDetail" @click="gosurvey">
            <image class="msgimg" src="../../../static/icon/dcwj.png"></image>
            <text class="title">调查问卷</text>
            <text class="check">您有一份关于"企业环境"的问卷调查</text>
            <text class="time">今天08:06</text>
        </view>
        <view class="msgDetail" @click="gonews">
            <image class="msgimg" src="../../../static/icon/xxts.png"></image>
            <text class="title">消息提示</text>
            <text class="check">{{ xtmc }}</text>
            <text class="time">今天7:00</text>
        </view>
        <image class="read" src="../../../static/icon/qbyd.png"></image>
    </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import login from '@/pages/login/login.vue';
import minBadge from '../../../components/min-badge/min-badge.vue';
export default {
    components: { minBadge, login },
    data() {
        return {
            ckjlCount: '', //我的投递数量
            xxmc: '', //会训名称
            xtmc: '' //消息名称
        };
    },
    computed: {
        ...mapState('loginState', {
            hasLogin: state => state.hasLogin
        }),
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    onShow() {
        console.log('success');
    },
    mounted() {
        this.news();
    },
    methods: {
        news() {
            this.$http({
                url: '/qz/qzxxtx/baseInfo',
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code == 0) {
                        this.ckjlCount = data.data.qzXxtx.ckjlCount;
                        this.xxmc = data.data.qzXxtx.hxxx.xxmc;
                        this.xtmc = data.data.qzXxtx.xtxx.xxmc;
                    }
                }
            });
        },
        goinvitation() {
            uni.navigateTo({
                url: '/pages/qiuZhi/xiaoXi/invitation'
            });
        },
        gocheck() {
            uni.navigateTo({
                url: '/pages/qiuZhi/xiaoXi/check'
            });
        },
        gomysend() {
            uni.navigateTo({
                url: '/woDe/mySend'
            });
        },
        gonotice() {
            uni.navigateTo({
                url: '/pages/qiuZhi/xiaoXi/notice'
            });
        },
        gosurvey() {
            uni.navigateTo({
                url: '/pages/qiuZhi/xiaoXi/survey'
            });
        },
        gonews() {
            uni.navigateTo({
                url: '/pages/qiuZhi/xiaoXi/news'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.cell {
    margin: 22rpx;
    position: absolute;
    top: -20rpx;
    left: 80rpx;
}

.page {
    height: 100vh;
}
.message {
    position: relative;
}
.top {
    height: 110rpx;
    background-color: #ff8421;
}
.allImg {
    width: 215rpx;
    height: 70rpx;
    position: absolute;
    /*  top: 20rpx; */
    right: 20rpx;
    top: 670rpx;
}

.msgDetail {
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    position: relative;
    background-color: #fff;
    top: -118rpx;
}
.msgimg {
    width: 100rpx;
    height: 100rpx;
    margin: 20rpx;
    vertical-align: middle;
}
.title {
    font-size: 32rpx;
    font-weight: 600;
    position: absolute;
    top: 33rpx;
    left: 160rpx;
}
.check {
    font-size: 23rpx;
    color: #999999;
    position: absolute;
    top: 82rpx;
    left: 160rpx;
}
.time {
    font-size: 20rpx;
    color: #999999;
    position: absolute;
    top: 38rpx;
    right: 20rpx;
}
.num-box {
    position: absolute;
    top: 20rpx;
}
.head {
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    background-color: #fff;
    border-radius: 12upx;
    overflow: hidden;
    height: 200rpx;
    position: relative;
    top: -120rpx;
    display: flex;
    justify: center;
    justify-content: space-around;
    align-items: center;
}
.send {
    margin-left: 30rpx;
    position: relative;
}
.see,
.invite {
    position: relative;
}
.line-box {
    width: 4rpx;
    height: 70rpx;
    background-color: #e6e6e6;
}
.sendimg,
.seeimg,
.inviteimg {
    width: 100rpx;
    height: 100rpx;
}
.seemsg,
.invitemsg,
.sendmsg {
    font-weight: 600;
    vertical-align: middle;
}

.read {
    position: absolute;
    top: 710rpx;
    right: 20rpx;
    width: 200rpx;
    height: 65rpx;
}
</style>
