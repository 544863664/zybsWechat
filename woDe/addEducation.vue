<template>
    <view class="selfEvaluate">
        <view class="main">
            <view class="list">
                <view class="title">学校名称</view>
                <view class="content flex">
                    <input class="uni-input" v-model="jyjl.xxmc" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">是否统招</view>
                <picker class="content" @change="bindType" :value="typeIndex" :range="typeArray" range-key="name">
                    <view class="uni-input middle">{{ sftz }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">专业</view>
                <view class="content flex">
                    <input class="uni-input" v-model="jyjl.zy" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">学历</view>
                <picker class="content" @change="bindEducation" :value="educationIndex" :range="educationArray" range-key="name">
                    <view class="uni-input middle">{{ edu }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">导师</view>
                <view class="content flex">
                    <input class="uni-input" v-model="jyjl.ds" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="title">入学时间</view>
                <picker class="content" mode="date" :value="rxsj" :end="endDate" @change="bindStart" fields="day">
                    <view class="uni-input middle">{{ rxsj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">毕业时间</view>
                <picker class="content" mode="date" :value="bysj" :end="endDate" @change="bindEnd" fields="day">
                    <view class="uni-input middle">{{ bysj }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
        </view>
        <view class="btn" @click="whetherSave">保存</view>
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
                jyjlid: '', // 培训id
                judgeVal: 0, // 1查询失败 2查询成功
                jyjl: {
                    qzbsid: "",
                    jyjlid: "",
                    xxmc: "",
                    zy: "",
                    sftz: "0",
                    xl: "11",
                    rxsj: "",
                    bysj: "",
                    ds: ""
                }
            };
        },
        components: {},
        onLoad(options) {
            this.jyjlid = options.jyjlid;
        },
        computed: {
            endDate() {
                return dateUtil.formatDate3(new Date());
            },
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState({
                sftzList: state => state.sftzList,
                m_xldmList: state => state.dmList.m_xldm,
                sftzMap: state => state.sftzMap,
                m_xldmMap: state => state.dmMap.m_xldm
            }),

            rxsj() {
                return dateUtil.formatDate3(this.jyjl.rxsj);
            },

            bysj() {
                return dateUtil.formatDate3(this.jyjl.bysj);
            },

            typeIndex() {
                let index = 0;

                if (this.typeArray && this.typeArray.length > 0 && (this.jyjl.sftz == 0 || this.jyjl.sftz == 1)) {
                    this.typeArray.forEach((item, idx) => {
                        if (this.jyjl.sftz == item.id) {
                            index = idx;
                        }
                    });
                }

                return index;
            },

            typeArray() {
                return this.sftzList || [];
            },

            educationIndex() {
                let index = 0;

                if (this.educationArray && this.educationArray.length > 0 && this.jyjl.xl) {
                    this.educationArray.forEach((item, idx) => {
                        if (this.jyjl.xl == item.dm) {
                            index = idx;
                        }
                    });
                }

                return index;
            },

            educationArray() {
                return this.m_xldmList || [];
            },

            sftz() {
                if (this.sftzMap && (this.jyjl.sftz == 0 || this.jyjl.sftz == 1)) {
                    return this.sftzMap[this.jyjl.sftz];
                } else {
                    return "";
                }
            },

            edu() {
                if (this.m_xldmMap && this.jyjl.xl) {
                    return this.m_xldmMap[this.jyjl.xl];
                } else {
                    return "";
                }
            }
        },
        onShow() {
            if (this.jyjlid) {
                this.getInfoData();
            }
        },
        methods: {
            /* 是否统招 */
            bindType(e) {
                this.jyjl.sftz = this.typeArray[e.target.value].id;
            },
            /* 学历 */
            bindEducation(e) {
                this.jyjl.xl = this.educationArray[e.target.value].dm;
            },
            /* 开始时间 */
            bindStart(e) {
                this.jyjl.rxsj = dateUtil.formatDate2(e.target.value);
            },
            /* 结束时间 */
            bindEnd(e) {
                this.jyjl.bysj = dateUtil.formatDate2(e.target.value);
            },
            /* 保存信息 */
            whetherSave() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzjyjl/save";
                    if (this.jyjlid) {
                        url = "/qz/qzjyjl/update";
                    }
                if(!this.jyjl.xxmc){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入学校名称"
                    });
                    return
                }
                if(!this.jyjl.typeIndex){
                    uni.showToast({
                        icon: 'none',
                        title: "是否统招"
                    });
                    return
                }
                if(!this.jyjl.educationIndex){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入专业"
                    });
                    return
                }
                if(!this.jyjl.zy){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入专业"
                    });
                    return
                }

                if(!this.jyjl.rxsj){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入入学时间"
                    });
                    return
                }
                if(!this.jyjl.bysj){
                    uni.showToast({
                        icon: 'none',
                        title: "请输入毕业时间"
                    });
                    return
                }

                    this.$http({
                        url,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: this.jyjl,
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
                    url: `/qz/qzjyjl/info/${this.jyjlid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.jyjl = data.data.qzJyjl;
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
        }
    }
</style>
