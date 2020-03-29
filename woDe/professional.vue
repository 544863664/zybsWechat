<template>
    <view class="addProject">
        <view class="main">
            <view class="list">
                <view class="title">技能名称</view>
                <view class="content flex">
                    <input class="uni-input" placeholder="技能名称" maxlength="50" v-model="jn.jnmc" />
                </view>
            </view>
            <view class="list">
                <view class="title">使用时长(月)</view>
                <view class="content flex">
                    <input class="uni-input" type="text" placeholder="月" maxlength="10" v-model="jn.sysc" />
                </view>
            </view>
            <view class="list">
                <view class="title">掌握程度</view>
                <picker class="content" @change="degreeChange" :value="index" :range="yynlList" range-key="name">
                    <view class="uni-input middle">{{ slcd }}</view>
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
            jnid: '', // 技能信息id
            jn:{
                qzbsid:"",//求职者编号
                jnid:"",//技能编号
                jnmc:"",//技能名称
                sysc:"",//使用时长
                slcd:"1"//熟练程度
            }
        };
    },
    onLoad(options) {
        this.jnid = options.jnid;
    },
    computed: {
        ...mapState({
            yynlList: state => state.yynlList,
            yynlMap: state => state.yynlMap
        }),
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        index(){
            let index = 0;

            if(this.jn.slcd){
                this.yynlList.forEach((item, idx)=>{
                    if(item.id==this.jn.slcd){
                        index = idx;
                    }
                });
            }

            return index;
        },
        slcd(){
            if(this.jn.slcd){
                return this.yynlMap[this.jn.slcd];
            }else{
                return "";
            }
        }
    },
    onShow() {
        if (this.jnid) {
            this.getInfoData();
        }
    },
    methods: {
        /* 掌握程度 */
        degreeChange: function(e) {
            console.log("this.yynlList[e.target.value].id = ",this.yynlList[e.target.value].id);
            this.jn.slcd = this.yynlList[e.target.value].id;
        },

        /* 保存信息 */
        whetherSave() {
            if(this.judgeVal==1){
                uni.showToast({
                    icon: 'none',
                    title: '查询失败,请返回上个页面重新进入'
                });
            }else{
                let url = "/qz/qzzyjn/save";
                if(this.jnid){
                    url = "/qz/qzzyjn/update";
                }
                 if(!this.jn.jnmc){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入技能名称"
                    });
                     return
                 }
                this.$http({
                    url,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    data: this.jn,
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
                            title: '新增失败!'
                        });
                    }
                });
            }
        },
        /* 查询数据 */
        getInfoData() {
            this.$http({
                url: `/qz/qzzyjn/info/${this.jnid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.jn = data.data.qzZyjn;
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
