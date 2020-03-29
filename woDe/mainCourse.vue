<template>
    <view class="selfEvaluate">
        <view class="list">
            <view class="title">研究方向</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.yjfx" focus placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="list">
            <view class="title">主修课程</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.zxkc" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="list">
            <view class="title">博士课题</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.bskt" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
       <view class="list">
           <view class="title">描述</view>
           <view class="gzms flex">
               <textarea placeholder="请输入内容" v-model="main.kcms" maxlength="200" />
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

    export default {
        data() {
            return {
                judgeVal: 0, // 1查询失败 2查询成功
                fxid: "",
                main: {
                    fxid: "", //研究方向编号
                    yjfx: "", //研究方向
                    bskt: "", //博士课题
                    zxkc: "", //主修课程
                    kcms:''//课程描述
                }
            };
        },
        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            })
        },
        components: {},
        onLoad(options) {
            this.fxid = options.fxid;
        },
        onShow() {
            if (this.fxid) {
                this.yjmsg(this.fxid);
            }
        },
        methods: {
            save() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzyjfxzxkc/save";
                    if (this.fxid) {
                        url = "/qz/qzyjfxzxkc/update";
                    }
                    if(!this.main.yjfx){
                        uni.showToast({
                             icon: 'none',
                            title: "请输入研究方向"
                        });
                        return
                    }
                    if(!this.main.bskt){
                        uni.showToast({
                             icon: 'none',
                            title: "请输入研究课题"
                        });
                        return
                    }
                    if(!this.main.zxkc){
                        uni.showToast({
                             icon: 'none',
                            title: "请输入主修课程"
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
                                    title: data.data.msg
                                });
                            }
                        },
                        fail: data => {
                            uni.showToast({
                                title: '更新失败!'
                            });
                        }
                    });
                }
            },
            //回显拿数据
            yjmsg(fxid) {
                this.$http({
                    url: `/qz/qzyjfxzxkc/info/${fxid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.main = data.data.qzYjfxZxkc;
                            this.judgeVal = 2;
                        } else {
                            this.judgeVal = 1;
                            uni.showToast({
                                title: data.data.msg
                            });
                        }
                    },
                    fail: data => {
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
            z-index: 10;
        }
        .gzms {
            padding: 10rpx 0rpx;
            /deep/ textarea {
                border: 1rpx solid #f2f2f2;
                font-size: 30rpx;
                height: 200rpx;
            }
        }
    }
</style>
