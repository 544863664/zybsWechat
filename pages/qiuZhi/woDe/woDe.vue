<template>
    <view class="control" v-if="!hasLogin">
        <button class="WeChat" type="primary" @click="logon()">
            <image class="middle" src="../../../static/icon/login.png" mode="aspectFit"></image>
            <text class="text middle">登录</text>
        </button>
    </view>
    <view class="mine-page" v-else>
        <view class="top">
            <view class="info-wrap">
                <view class="info-main">
                    <view class="main-top" @click="onlineEdit">
                        <view class="head-img">
                            <image src="../../../static/icon/nan.png" mode="aspectFill"></image>
                        </view>
                        <view class="info-text">
                            <view class="name">
                                <text class="name-text">{{ baseInfo.xm || "完善简历"}}</text>
                                <image class="edit" src="../../../static/icon/edit.png" mode="aspectFill"></image>
                            </view>
                            <view class="nature">
                                <van-button type="info" size="small" v-if="baseInfo.nl&&baseInfo.nl!='null'">{{ baseInfo.nl || "" }}岁</van-button>
                                <van-button type="info" size="small" v-if="baseInfo.gznx&&baseInfo.gznx!='null'">工作{{ baseInfo.gznx || "" }}年</van-button>
                              <van-button type="info" size="small" v-if="baseInfo.dqszs&&baseInfo.dqszs!='null'">
                                   {{provinceMap[baseInfo.dqszs] || ""}}
                               </van-button>
                               <van-button type="info" size="small" v-if="baseInfo.dqszcs&&baseInfo.dqszcs!='null'">
                                   {{cityMap[baseInfo.dqszs][baseInfo.dqszcs] || ""}}
                               </van-button>
                            </view>
                        </view>
                    </view>
                    <view class="main-list flex">
                        <view class="list" @click="resume">
                            <view class="number resume-num">{{ baseInfo.fjjlCount }}</view>
                            <view class="resume">附件简历</view>
                        </view>
                        <view class="list" @click="mysend">
                            <view class="number send-num">{{ baseInfo.tdjlCount }}</view>
                            <view class="resume">我的投递</view>
                        </view>
                        <view class="list" @click="collect">
                            <view class="number collect-num">{{ baseInfo.gwscCount }}</view>
                            <view class="resume">职位收藏</view>
                        </view>
                        <view class="list" @click="attention">
                            <view class="number attention-num">{{ baseInfo.gsscCount }}</view>
                            <view class="resume">关注公司</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="port">
            <uni-list>
                <uni-list-item title="求职意向" :show-badge="true" badge-text="优质岗位自动匹配" thumb="../../static/icon/job-icon.png" @click="intention"></uni-list-item>
                <uni-list-item title="面试邀约" thumb="../../static/icon/interview-icon.png" @click="invitation"></uni-list-item>
                <uni-list-item title="隐私设置" thumb="../../static/icon/privacy-icon.png" @click="goprivacy"></uni-list-item>
                <uni-list-item title="我的订单" thumb="../../static/icon/order-icon.png" @click="myorder"></uni-list-item>
                <uni-list-item title="参会邀约码" thumb="../../static/icon/scan-icon.png" @click="attend"></uni-list-item>
                <uni-list-item title="我的积分" thumb="../../static/icon/integral.png" @click="integral"></uni-list-item>
                <uni-list-item title="用户反馈和帮助" thumb="../../static/icon/feedback-icon.png" @click="gohelp"></uni-list-item>
                <uni-list-item title="设置" thumb="../../static/icon/setting-icon.png" @click="setting"></uni-list-item>
            </uni-list>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex';
    import login from '@/pages/login/login.vue';
    import uniList from '@/components/uni-list/uni-list.vue';
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
    import uniIcons from '@/components/uni-icons/uni-icons.vue';

    export default {
        components: {
            uniList,
            uniListItem,
            uniIcons,
            login
        },
        data() {
            return {
                baseInfo: {

                }
            };
        },
        computed: {
            ...mapState('loginState', {
                hasLogin: state => state.hasLogin
            }),
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState({
                m_xbdm: state => state.dmMap.m_xbdm,
                provinceMap: state => state.provinceMap,
                cityMap: state => state.cityMap,
                districtMap: state => state.districtMap
            }),
            // location() {
            //     if (this.provinceMap && this.cityMap && this.districtMap && this.baseInfo.dqszs && this.baseInfo.dqszcs!='null') {
            //         return this.provinceMap[this.baseInfo.dqszs] + "-" + this.cityMap[this.baseInfo.dqszs][this.baseInfo.dqszcs];
            //     }

            //     return "";
            // }
        },
        onShow() {
            if (this.token) {
                this.getInfo();
            }
        },
        methods: {
            logon() {
                uni.navigateTo({
                    url: '/pages/login/login'
                });
            },
            gohelp() {
                uni.navigateTo({
                    url: '/woDe/help'
                });
            },
            onlineEdit() {
                // 我的在线简历
                uni.navigateTo({
                    url: '/woDe/onlineEdit'
                });
            },
            mysend() {
                // 我的投递
                uni.navigateTo({
                    url: '/woDe/mySend'
                });
            },
            collect() {
                // 职位收藏
                uni.navigateTo({
                    url: '/woDe/collect'
                });
            },
            attention() {
                // 关注公司
                uni.navigateTo({
                    url: '/woDe/attention'
                });
            },
            intention() {
                // 求职意向
                uni.navigateTo({
                    url: '/woDe/intention'
                });
            },
            invitation() {
                // 面试邀约
                uni.navigateTo({
                    url: '/pages/qiuZhi/xiaoXi/invitation'
                });
            },
            myorder() {
                // 求职意向
                uni.navigateTo({
                    url: '/woDe/myorder'
                });
            },
            attend() {
                // 参会邀约码
                uni.navigateTo({
                    url: '/woDe/attend'
                });
            },
            resume() {
                uni.navigateTo({
                    url: '/woDe/resume'
                });
            },
            goprivacy() {
                uni.navigateTo({
                    url: '/woDe/privacy'
                });
            },
            integral() {
                // 我的积分
                uni.navigateTo({
                    url: '/woDe/integral'
                });
            },
            helpFeedback() {
                // 帮助与反馈
                uni.navigateTo({
                    url: '/woDe/helpFeedback'
                });
            },
            setting() {
                // 设置
                uni.navigateTo({
                    url: '/woDe/setting'
                });
            },
            /* 个人信息 */
            getInfo() {
                this.$http({
                    url: `/qz/qzgrjbxx/myBaseInfo`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            if (data.data.qzGrjbxxBase) {
                                this.baseInfo = data.data.qzGrjbxxBase;
                                this.$store.commit('improveDegress', data.data.qzGrjbxxBase.wsd);
                            }
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
    .control {
        width: 80%;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .WeChat {
            background: #ff4d4d;
            height: 80rpx;
            line-height: 80rpx;
        }

        button {
            font-size: 32rpx;
            font-weight: 600;

            image {
                width: 32rpx;
                height: 32rpx;
                margin-right: 16rpx;
            }
        }
    }

    .mine-page {
        padding-bottom: 10rpx;
    }

    .top {
        height: 110rpx;
        // background-image: linear-gradient(to right, #ff9b3a, #ff704a);
        background: #ff8421;
        margin-bottom: 226rpx;

        .info-wrap {
            padding: 30rpx 20rpx 20rpx;
        }

        .info-main {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            background: #fff;
        }

        .main-top {
            display: flex;
            padding: 10rpx;

            .head-img {
                width: 160rpx;
                height: 160rpx;

                image {
                    width: 80%;
                    height: 80%;
                }
            }

            .info-text {
                margin-left: 20rpx;

                .name {
                    color: #333333;
                    font-size: 30rpx;
                    font-weight: 600;
                    line-height: 36rpx;
                    margin-top: 16rpx;

                    .name-text {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 16rpx;
                    }

                    .edit {
                        width: 32rpx;
                        height: 32rpx;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }

                .job {
                    font-size: 24rpx;
                    color: #999999;
                    line-height: 60rpx;

                    .station {
                        margin-right: 20rpx;
                    }
                }

                .nature {
                    margin-top: 16rpx;

                    van-button {
                        margin-right: 10rpx;
                    }
                }
            }
        }

        .main-list {
            .list {
                flex: 1;
                text-align: center;
                padding: 10rpx 0 30rpx 0;

                &:last-child .number {
                    border-right: none;
                }
            }

            .number {
                font-size: 36rpx;
                color: #ff851e;
                border-right: 1rpx solid #f2f2f2;
                margin-bottom: 20rpx;
                font-weight: 600;
            }

            .resume {
                font-size: 26rpx;
                color: #333333;
            }
        }
    }
</style>
