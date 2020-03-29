<template>
    <view class="addProject">
        <view class="main">
            <view class="list">
                <view class="title">语种名称</view>
                <view class="content flex">
                    <input class="uni-input" placeholder="请输入" maxlength="50" v-model="yynl.yymc" />
                </view>
            </view>
            <view class="list">
                <view class="title">等级证书</view>
                <view class="content flex">
                    <input class="uni-input" placeholder="请输入" maxlength="50" v-model="yynl.djzs" />
                </view>
            </view>
            <view class="list">
                <view class="title">听说能力</view>
                <picker class="content" @change="hearChange" :value="hearIndex" :range="yynlList" range-key="name">
                    <view class="uni-input middle">{{ tsnl }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">读写能力</view>
                <picker class="content" @change="readChange" :value="readIndex" :range="yynlList" range-key="name">
                    <view class="uni-input middle">{{ dxnl }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
        </view>
        <view class="btn" @click="whetherSave">保存</view>
    </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    data() {
        return {
            judgeVal: 0, // 1查询失败 2查询成功
            yyid: '',
            yynl: {
                qzbsid:"",//求职者编号
                yyid:"",//语言编号
                yymc:"",//语言名称
                djzs:"",//等级证书
                tsnl:"1",//听说能力
                dxnl:"1"//读写能力
            }
        };
    },
    onLoad(options) {
        this.yyid = options.yyid;
    },
    computed: {
        ...mapState({
            yynlList: state => state.yynlList,
            yynlMap: state => state.yynlMap
        }),
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        hearIndex(){
            let index = 0;

            if(this.yynl.tsnl){
                this.yynlList.forEach((item, idx)=>{
                    if(item.id==this.yynl.tsnl){
                        index = idx;
                    }
                });
            }

            return index;
        },
        readIndex(){
            let index = 0;

            if(this.yynl.dxnl){
                this.yynlList.forEach((item, idx)=>{
                    if(item.id==this.yynl.dxnl){
                        index = idx;
                    }
                });
            }

            return index;
        },
        tsnl(){
            if(this.yynl.tsnl){
                return this.yynlMap[this.yynl.tsnl];
            }else{
                return "";
            }
        },
        dxnl(){
            if(this.yynl.dxnl){
                return this.yynlMap[this.yynl.dxnl];
            }else{
                return "";
            }
        }
    },
    onShow() {
        if (this.yyid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 听说能力 */
        hearChange: function(e) {
            this.yynl.tsnl = this.yynlList[e.target.value].id;
        },
        /* 读写能力 */
        readChange: function(e) {
            this.yynl.dxnl = this.yynlList[e.target.value].id;
        },
        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzyynl/save";
                if(this.yyid){
                    url = "/qz/qzyynl/update";
                }
                if(!this.yynl.yymc){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入语言名称"
                    });
                    return
                }
                if(!this.yynl.djzs){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入等级证书"
                    });
                    return
                }
                this.$http({
                    url,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.yynl,
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
                url: `/qz/qzyynl/info/${this.yyid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.yynl = data.data.qzYynl;
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
.addProject {
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
}
</style>
