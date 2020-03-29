<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">项目名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="kyjl.kyxmmc" focus placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">项目类别</view>
                <view class="content flex">
                    <input class="uni-input" v-model="kyjl.xmlb" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">开始时间</view>
                <picker class="content" mode="date" :value="ksrq" :start="startDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ ksrq }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">结束时间</view>
                <picker class="content" mode="date" :value="jsrq" :end="endDate" @change="bindEnd" fields="day">
                    <view class="uni-input middle">{{ jsrq }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">个人排名</view>
                <view class="content flex">
                    <input class="uni-input" v-model="kyjl.cypm" placeholder="请输入" maxlength="10" />
                </view>
            </view>
            <view class="list">
                <view class="title">是否结项</view>
                <picker class="content" @change="bindProject" :value="sxjxIndex" :range="sfjxArray" range-key="name">
                    <view class="uni-input middle">{{ sfjx }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">描述</view>
                <view class="gzms flex">
                    <textarea placeholder="请输入内容" v-model="kyjl.xmms" maxlength="200" />
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
            kyjlid: '',  // 科研经历id
            kyjl: {
                qzbsid:"",//求职者编号
                kyxmmc:"",//项目名称
                xmlb:"",//项目类别
                ksrq:"",//开始时间
                jsrq:"",//结束时间
                cypm:"",//参与排名
                sfjx:"",//是否结项
                xmms:""//项目描述
            }
        };
    },
    components:  {},
    onLoad(options) {
        this.kyjlid = options.kyjlid;
    },
    computed: {
        endDate() {
            return dateUtil.formatDate3(new Date());
        },
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        ...mapState({
            sfjxArray: state => state.sfjxArray,
            sfjxMap: state => state.sfjxMap
        }),
        ksrq(){
            return dateUtil.formatDate1(this.kyjl.ksrq);
        },
        jsrq(){
            return dateUtil.formatDate1(this.kyjl.jsrq);
        },
        sfjx(){
            if(this.kyjl.sfjx==1){
                return this.sfjxMap[1];
            }else{
                return this.sfjxMap[0];
            }
        },
        sxjxIndex(){
            if(this.kyjl.sfjx==1){
                return 1;
            }else{
                return 0;
            }
        }
    },
    onShow() {
        if (this.kyjlid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 开始时间 */
        bindStart(e) {
            this.kyjl.ksrq = dateUtil.formatDate2(e.target.value);
        },
        /* 结束时间 */
        bindEnd(e) {
            this.kyjl.jsrq = dateUtil.formatDate2(e.target.value);
        },
        /* 是否结项 */
        bindProject(e) {
            // console.log('picker发送选择改变，携带值为', e.target.value);
            this.kyjl.sfjx = e.target.value;
        },
        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzkyjl/save";
                if(this.kyjlid){
                    url = "/qz/qzkyjl/update";
                }
                if(!this.kyjl.kyxmmc){
                    uni.showToast({
                            icon: 'none',
                            title: "请输入科研项目名称"
                        });
                        return
                    }
                
                if(!this.kyjl.ksrq){
                    uni.showToast({
                            icon: 'none',
                            title: "请输入科研项目开始时间"
                        });
                        return
                    }
                
                if(!this.kyjl.jsrq){
                    uni.showToast({
                            icon: 'none',
                            title: "请输入科研项目结束时间"
                        });
                        return
                    }
                

                this.$http({
                    url: `/qz/qzkyjl/save`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.kyjl,
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
        getInfoData(){
            this.$http({
                url: `/qz/qzkyjl/info/${this.kyjlid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if(data.data.code === 0){
                        this.kyjl = data.data.qzKyjl;
                        this.judgeVal=2;
                    }else{
                        this.judgeVal=1;
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                    this.hasSave = false;
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
