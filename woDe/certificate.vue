<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">证书名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zs.zsmc" focus placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">等级类别</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zs.zslb" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">获得时间</view>
                <picker class="content" mode="date" :value="hdrq" :end="endDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ hdrq }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
        </view>
        <view class="btn" @click="whetherSave">保存</view>
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

    export default {
        data() {
            return {
                judgeVal: 0, // 1查询失败 2查询成功
                zsid: '', // 科研经历id
                zs: {
                    zsmc: "", //项目名称
                    zslb: "", //项目类别
                    hdrq: "" //获得日期
                }
            };
        },
        onLoad(options) {
            this.zsid = options.zsid;
        },
        computed: {
            endDate() {
                return dateUtil.formatDate3(new Date());
            },
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            hdrq() {
                return dateUtil.formatDate1(this.zs.hdrq);
            }
        },
        onShow() {
            if (this.zsid) {
                this.getInfoData();
            }
        },
        methods: {
            /* 获得时间 */
            bindStart(e) {
                this.zs.hdrq = dateUtil.formatDate2(e.target.value);
            },
            /* 保存信息 */
            whetherSave() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzzsxx/save";
                    if (this.zsid) {
                        url = "/qz/qzzsxx/update";
                    }

                    this.$http({
                        url,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: this.zs,
                        success: data => {
                            if (data.data.code === 0) {
                                uni.navigateTo({
                                    url: '/woDe/onlineEdit'
                                });
                            } else {
                                uni.showToast({
                                    icon: 'none',
                                    title: data.data.msg
                                });
                            }
                        },
                        fail: err => {
                            uni.showToast({
                                title: '更新失败!'
                            });
                        }
                    });

                }
            },
            /* 查询数据 */
            getInfoData() {
                this.$http({
                    url: `/qz/qzzsxx/info/${this.zsid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.zs = data.data.qzZsxx;
                            this.judgeVal = 2;
                        } else {
                            this.judgeVal = 1;
                            uni.showToast({
                                icon: 'none',
                                title: data.data.msg
                            });
                        }
                    },
                    fail: err => {
                        this.judgeVal = 1;
                        uni.showToast({
                            title: '查询失败!'
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .selfEvaluate {
        padding: 20rpx 20rpx 110rpx 20rpx;

        .btn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100rpx;
            background-color: #ff8421;
            text-align: center;
            line-height: 100rpx;
            color: #ffffff;
            font-size: 30rpx;
            font-weight: bold;
            z-index: 10;
        }
    }

    .main {
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

                .describe {
                    color: #888888;
                }

                /deep/ .uni-input {
                    width: 90%;
                    margin-right: 8%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
