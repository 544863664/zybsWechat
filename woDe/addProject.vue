<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">项目名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="xmjy.xmmc" focus placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">开始时间</view>
                <picker class="content" mode="date" :value="kssj" :end="endDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ kssj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">结束时间</view>
                <picker class="content" mode="date" :value="jssj" :end="endDate" @change="bindEnd" fields="day">
                    <view class="uni-input middle">{{ jssj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">公司名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="xmjy.gsmc" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">担任角色</view>
                <view class="content flex">
                    <input class="uni-input" v-model="xmjy.zw" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">责任描述</view>
                <view class="gzms flex">
                    <textarea placeholder="请输入内容" v-model="xmjy.zrms" maxlength="200" />
                </view>
            </view>
            <view class="list">
                <view class="title">项目描述</view>
                <view class="gzms flex">
                    <textarea placeholder="请输入内容" v-model="xmjy.xmms" maxlength="200" />
                </view>
            </view>
        </view>
        <view class="btn" @click="whetherSave">保存</view>
    </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import dateUtil from '@/common/dateUtil.js';

export default {
    data() {
        return {
            xmjyid:"", //项目经验id
            judgeVal: 0, // 1查询失败 2查询成功
            xmjy:{
                gsmc: "",//公司名称
                jssj: "",//结束时间
                kssj: "",//开始时间
                qzbsid: "",//求职者编号
                xmjyid: "",//项目经验编号
                xmmc: "",//项目名称
                xmms: "",//项目描述
                zrms: "",//责任描述
                zw: ""//职位
            }
        };
    },
    components: { },
    onLoad(options) {
        this.xmjyid = options.xmjyid;
    },
    computed: {
        endDate() {
            return dateUtil.formatDate3(new Date());
        },
        ...mapGetters('loginState', {
            token: 'getToken'
        }),

        kssj(){
            return dateUtil.formatDate1(this.xmjy.kssj);
        },

        jssj(){
            return dateUtil.formatDate1(this.xmjy.jssj);
        },
    },
    onShow() {
        if (this.xmjyid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 开始时间 */
        bindStart(e) {
            this.xmjy.kssj = dateUtil.formatDate2(e.target.value);
        },
        /* 结束时间 */
        bindEnd(e) {
            this.xmjy.jssj = dateUtil.formatDate2(e.target.value);
        },
        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzxmjy/save";
                if(this.xmjyid){
                    url = "/qz/qzxmjy/update";
                }

                if(!this.xmjy.xmmc){
                  uni.showToast({
                      icon: 'none',
                      title: "请输入项目名称"
                  });
                    return
                }
                if(!this.xmjy.kssj){
                  uni.showToast({
                      icon: 'none',
                      title: "请输入开始时间"
                  });
                    return
                }
                if(!this.xmjy.jssj){
                  uni.showToast({
                      icon: 'none',
                      title: "请输入结束时间"
                  });
                    return
                }

                this.$http({
                    url,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.xmjy,
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
                url: `/qz/qzxmjy/info/${this.xmjyid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.xmjy = data.data.qzXmjy;
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

        .gzms {
            padding: 10rpx 0rpx;
            /deep/ textarea {
                border: 1rpx solid #f2f2f2;
                font-size: 30rpx;
                height: 200rpx;
            }
        }
    }
}
</style>
