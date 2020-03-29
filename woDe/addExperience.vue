<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">公司名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.dwmc" focus placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">职位名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.zwmc" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">所属行业</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.hy" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">入职时间</view>
                <picker class="content" mode="date" :value="rzsj" :end="endDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ rzsj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">离职时间</view>
                <picker class="content" mode="date" :value="lzsj" :end="endDate" @change="bindEnd" fields="day">
                    <view class="uni-input middle">{{ lzsj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">税前月薪(K)</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.yx" placeholder="K" maxlength="20" />
                </view>
            </view>
           <!-- <view class="list">
                <view class="title">月数</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.ys" placeholder="请输入" maxlength="20" />
                </view>
            </view> -->
           <!-- <view class="list">
                <view class="title">年薪(W)</view>
                <view class="content flex">
                    <input class="uni-input" v-model="gzjl.nx" placeholder="W" maxlength="20" />
                </view>
            </view> -->
            <view class="list flex" id="hide">
                <view class="describe">是否隐藏工资</view>
                <switch :checked="gzjl.sfyc" color="#FFC321" @change="stickChange" style="transform:scale(0.6)" />
            </view>
            <view class="list">
                <view class="title">工作描述</view>
                <view class="gzms flex">
                    <textarea placeholder="请输入内容" v-model="gzjl.gzms" maxlength="200" />
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
            gzjlid:"",
            judgeVal: 0, // 1查询失败 2查询成功
            gzjl:{
                dwid: "",//单位编号
                dwmc: "",//单位名称
                gzjlid: "",//工作经历编号
                gzms: "",//工作描述
                hy: "",//行业
                lzsj: "",//离职时间
                nx: "",//年薪
                qzbsid: "",//求职者编号
                rzsj: "",//入职时间
                sfyc: "1",//是否隐藏薪资
                yx: "",//月薪
                ys: "12",//月数
                zwmc: ""//职位
            }
        };
    },
    components: { },
    computed: {
        endDate() {
            return dateUtil.formatDate3(new Date());
        },
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        rzsj(){
            return dateUtil.formatDate1(this.gzjl.rzsj);
        },
        lzsj(){
            return dateUtil.formatDate1(this.gzjl.lzsj);
        }
    },
    onLoad(options) {
        this.gzjlid = options.gzjlid;
    },
    onShow() {
        if (this.gzjlid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 开始时间 */
        bindStart(e) {
            this.gzjl.rzsj = dateUtil.formatDate2(e.target.value);
        },
        /* 结束时间 */
        bindEnd(e) {
            this.gzjl.lzsj = dateUtil.formatDate2(e.target.value);
        },
        /* 是否隐藏 */
        stickChange(e) {
            let checked = e.detail.value;
            if (checked) {
                this.gzjl.sfyc = '1';
            } else {
                this.gzjl.sfyc = '0';
            }
        },
        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzgzjl/save";
                if (this.gzjlid) {
                     url = "/qz/qzgzjl/update";
                 }
                 if(!this.gzjl.dwmc){
                     uni.showToast({
                         icon: 'none',
                         title:"请输入单位名称"
                     });
                     return
                 }
                 if(!this.gzjl.zwmc){
                     uni.showToast({
                         icon: 'none',
                         title:"请输入职位名称"
                     });
                     return
                 }
                 if(!this.gzjl.rzsj){
                     uni.showToast({
                         icon: 'none',
                         title:"请输入入职时间"
                     });
                     return
                 }
                if(!this.gzjl.lzsj){
                    uni.showToast({
                        icon: 'none',
                        title:"请输入离职时间"
                    });
                    return
                }
                this.$http({
                    url,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.gzjl,
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
                url: `/qz/qzgzjl/info/${this.gzjlid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        if(data.data.qzGzjl){
                            this.gzjl = data.data.qzGzjl;
                            this.judgeVal=2;
                        }
                    } else {
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
    padding: 20rpx 20rpx 120rpx 20rpx;
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
    #hide {
        height: 100rpx;
        line-height: 100rpx;
    }
}
</style>
