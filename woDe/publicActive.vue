<template>
    <view class="selfEvaluate">
        <view class="list">
            <view class="title">活动名称</view>
            <view class="content">
                <input class="uni-input" v-model="main.hdmc" focus placeholder="请输入" maxlength="50" />
            </view>
        </view>
        <view class="list">
            <view class="title">活动时间</view>
            <picker class="content" mode="date" :value="hdsj" :end="endDate" @change="bindDateChange" fields="day">
                <view class="uni-input middle">{{ hdsj }}</view>
                <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </picker>
        </view>
        <view class="list">
            <view class="title">活动内容</view>
            <view class="zwpj">
                <textarea placeholder="请输入内容" v-model="main.hdnr" maxlength="200"></textarea>
            </view>
        </view>
        <view class="list">
            <view class="title">活动成果</view>
            <view class="zwpj">
                <textarea placeholder="请输入内容" v-model="main.hdcg" maxlength="200"></textarea>
            </view>
        </view>
        <view class="btn" @click="save">保存</view>
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
                hdid: "",
                main: {
                    hdid: "",
                    hdmc: "", //活动名称
                    hdsj: "", //活动时间
                    hdnr: "", //活动内容
                    hdcg: "" //活动成果
                }
            };
        },
        computed: {
            endDate() {
                return dateUtil.formatDate3(new Date());
            },
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            hdsj() {
                return dateUtil.formatDate1(this.main.hdsj);
            }
        },
        components: {},
        onLoad(options) {
            this.hdid = options.hdid;
        },
        onShow() {
            if (this.hdid) {
                this.hdmsg(this.hdid);
            }
        },
        methods: {
            bindDateChange: function(e) {
                this.main.hdsj = dateUtil.formatDate2(e.target.value);
            },

            save() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzshhd/save";
                    if (this.hdid) {
                        url = "/qz/qzshhd/update";
                    }
                    if(!this.main.hdmc){
                        uni.showToast({
                            icon: 'none',
                            title: "请输入活动名称"
                        });
                        return
                    }
                    if(!this.main.hdsj){
                        uni.showToast({
                            icon: 'none',
                            title: "请输入活动时间"
                        });
                        return
                    }
                    if(!this.main.hdnr){
                        uni.showToast({
                            icon: 'none',
                            title: "请输入活动内容"
                        });
                        return
                    }

                    this.$http({
                        url,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: this.main,
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
                        }
                    });
                }
            },
            //回显拿数据
            hdmsg(hdid) {
                this.$http({
                    url: `/qz/qzshhd/info/${hdid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.main = data.data.shhd;
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
        padding: 20rpx;

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
            }

            .date {
                text-align: center;
            }

            .zwpj {
                padding: 10rpx 0rpx;

                /deep/ textarea {
                    border: 1rpx solid #f2f2f2;
                    font-size: 30rpx;
                    height: 200rpx;
                }
            }
        }

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
        }
    }
</style>
