<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">专利名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zl.zlmc" focus placeholder="请输入" maxlength="50" />
                </view>
            </view>
            <view class="list">
                <view class="title">专利编号</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zl.zlbh" placeholder="请输入" maxlength="50" />
                </view>
            </view>
            <view class="list">
                <view class="title">批准日期</view>
                <picker class="content" mode="date" :value="pzrq" :end="endDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ pzrq }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">专利类型</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zl.zllx" placeholder="请输入" maxlength="50" />
                </view>
            </view>
            <view class="list">
                <view class="title">专利完成状态</view>
                <picker class="content" @change="bindType" :value="zl.zlwczt" :range="wcztArray" range-key="name">
                    <view class="uni-input middle">{{ zlwczt }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">参与排名</view>
                <view class="content flex">
                    <input class="uni-input" v-model="zl.brpm" placeholder="请输入" maxlength="50" />
                </view>
            </view>
            <view class="list">
                <view class="title">专利描述</view>
                <view class="gzms flex">
                    <textarea placeholder="请输入内容" v-model="zl.zlms" maxlength="200" />
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
            judgeVal: 0, // 1查询失败 2查询成功
            zlid: '', // 专利id
            zl: {
                zlmc: '', //专利名称
                zlbh: '', //专利编号
                pzrq: '', //批准日期
                zllx: '', //专利类型
                zlwczt: '0', //专利完成状态
                brpm: '', //本人排名
                zlms: '' //专利描述
            }
        };
    },
    components: {},
    onLoad(options) {
        this.zlid = options.zlid;
    },
    computed: {
        endDate() {
            return dateUtil.formatDate3(new Date());
        },
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        ...mapState({
            wcztArray: state => state.wcztArray,
            wcztMap: state => state.wcztMap
        }),
        zlwczt(){
            if(this.zl.zlwczt){
                return this.wcztMap[this.zl.zlwczt];
            }else{
                return this.wcztMap[0];
            }
        },
        pzrq(){
            return dateUtil.formatDate1(this.zl.pzrq);
        }
    },
    onShow() {
        if (this.zlid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 专利完成状态 */
        bindType(e) {
            this.zl.zlwczt = e.target.value;
        },
        /* 开始时间 */
        bindStart(e) {
            this.zl.pzrq = dateUtil.formatDate2(e.target.value);
        },
        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzzlxx/save";
                if(this.zlid){
                    url = "/qz/qzzlxx/update";
                }

                this.$http({
                    url,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.zl,
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
        //查询数据
        getInfoData() {
            this.$http({
                url: `/qz/qzzlxx/info/${this.zlid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.zl = data.data.qzZlxx;
                        this.judgeVal=2;
                    }else{
                        this.judgeVal=1;
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                },
                fail: err => {
                    this.judgeVal=1;
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
