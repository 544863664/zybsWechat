<template>
    <view class="selfEvaluate">
        <view class="list">
            <view class="title">荣誉名称</view>
            <view class="content">
                <input class="uni-input" v-model="main.jlmc" focus placeholder="请输入" maxlength="50" />
            </view>
        </view>
        <view class="list">
            <view class="title">奖励单位</view>
            <view class="content">
                <input class="uni-input" v-model="main.jldw" placeholder="请输入" maxlength="50" />
            </view>
        </view>

        <view class="list">
            <view class="title">奖励级别</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.jljb" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="list">
            <view class="title">奖励角色</view>
            <view class="content">
                <input class="uni-input" v-model="main.jljs" placeholder="请输入" maxlength="50" />
            </view>
        </view>
        <view class="list">
            <view class="title">荣誉称号</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.rych" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="list">
            <view class="title">获奖日期</view>
            <picker class="content" mode="date" :value="jlrq" :end="endDate" @change="bindDateChange" fields="day">
                <view class="uni-input middle">{{ jlrq }}</view>
                <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </picker>
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
                ryjlid: "",
                judgeVal: 0, // 1查询失败 2查询成功
                main: {
                    ryjlid: "", //荣誉捡了个ibianhao
                    jlmc: "", //奖励名称
                    jldw: "", //奖励单位
                    jljb: "", //奖励级别
                    jljs: "", //奖励角色
                    jlrq: "", //奖励日期
                    rych: "" //荣誉称号
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
            jlrq() {
                return dateUtil.formatDate1(this.main.jlrq);
            }
        },
        components: {},
        onLoad(options) {
            this.ryjlid = options.ryjlid;
        },
        onShow() {
            if (this.ryjlid) {
                this.jlmsg(this.ryjlid);
            }
        },
        methods: {
            bindDateChange: function(e) {
                this.main.jlrq = dateUtil.formatDate2(e.target.value);
            },

            //保存按钮
            save() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzryjl/save";
                    if (this.ryjlid) {
                        url = "/qz/qzryjl/update";
                    }
                    if(!this.main.jlmc){
                       uni.showToast({
                           icon: 'none',
                           title: "请输入奖励名称"
                       });
                       return
                    }
                    if(!this.main.jlrq){
                       uni.showToast({
                           icon: 'none',
                           title: "请输入奖励时间"
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
                        success: function(data) {
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

            //回显拿数据
            jlmsg(ryjlid) {
                this.$http({
                    url: `/qz/qzryjl/info/${ryjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.main = data.data.ryjl;
                            this.judgeVal = 2; // 1查询失败 2查询成功
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
