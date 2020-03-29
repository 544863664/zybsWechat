<template>
    <view class="selfEvaluate">
        <view class="list">
            <view class="title">论文名称</view>
            <view class="content">
                <input class="uni-input" v-model="main.lwmc" focus placeholder="请输入" maxlength="50" />
            </view>
        </view>
        <view class="list">
            <view class="title">发表刊物</view>
            <view class="content">
                <input class="uni-input" v-model="main.kwmc" placeholder="请输入" maxlength="50" />
            </view>
        </view>
        <view class="list">
            <view class="title">刊物影响因子</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.kwyxyz" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
        <view class="list">
            <view class="title">发布时间</view>
            <picker mode="date" :value="fbrq" :end="endDate" @change="bindDateChange" fields="day">
                <text class="date middle">{{ fbrq }}</text>
            </picker>
        </view>
        <view class="list">
            <view class="title">论文收录情况</view>
            <view class="content flex">
                <input class="uni-input" v-model="main.slqk" placeholder="请输入" maxlength="50" />
                <image class="back-icon" src="../../../static/icon/back.png" mode="aspectFill"></image>
            </view>
        </view>
       
        <view class="list">
            <view class="title">参与排名</view>
            <view class="content">
                <input class="uni-input" v-model="main.cypm" placeholder="请输入" maxlength="50" />
            </view>
        </view>
       <view class="list">
           <view class="title">描述</view>
           <view class="gzms flex">
               <textarea placeholder="请输入内容" v-model="main.lwms" maxlength="200" />
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
                lwid: '',
                main: {
                    lwid: '', //论文编号
                    lwmc: '', //论文名称
                    kwmc: '', //刊物名称
                    fbrq: '', //发表日期
                    slqk: '', //收录情况
                    kwyxyz: '', //刊物影响因子
                    cypm: '' ,//参与排名
                    lwms:''//论文描述
                }
            };
        },
        components: {},
        onLoad(options) {
            this.lwid = options.lwid;
        },
        onShow() {
            if (this.lwid) {
                this.lwmsg(this.lwid);
            }
        },
        computed: {
            endDate() {
                return dateUtil.formatDate3(new Date());
            },
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            fbrq() {
                return dateUtil.formatDate1(this.main.fbrq);
            }
        },
        methods: {
            bindDateChange: function(e) {
                this.main.fbrq = dateUtil.formatDate2(e.target.value);
            },
            //保存按钮
            save() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzlwxx/save";
                    if (this.lwid) {
                        url = "/qz/qzlwxx/update";
                    }
                    if(!this.main.lwmc){
                       uni.showToast({
                           icon: 'none',
                           title: '请输入论文名称'
                       });
                       return
                    }
                    if(!this.main.fbrq){
                       uni.showToast({
                           icon: 'none',
                           title: '请输入发表日期'
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
                                    title: '更新失败!'
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
            lwmsg(lwid) {
                this.$http({
                    url: `/qz/qzlwxx/info/${lwid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.main = data.data.qzLwxx;
                            this.judgeVal = 2;
                        } else {
                            this.judgeVal = 1;
                            uni.showToast({
                                title: '查询失败!'
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
