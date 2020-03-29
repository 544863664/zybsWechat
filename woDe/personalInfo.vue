<template>
    <view class="personal-page">
        <view class="photo-wrap" ref="popup" @click="openPopup">
            <image class="photo" src="../../../static/icon/nan.png" mode="aspectFill"></image>
            <view class="modify">修改头像</view>
            <uni-popup class="popup" ref="popup" type="bottom">
                <view class="pop-top">
                    <view class="pop-list">拍照</view>
                    <view class="pop-list">从手机相册选择</view>
                </view>
                <view class="cancel-box">
                    <view class="cancel" @click="closePopup">取消</view>
                </view>
            </uni-popup>
        </view>
        <view class="content">
            <view class="list">
                <view class="describe">
                    姓名
                    <text class="star"></text>
                </view>
                <view class="detail">
                    <input class="uni-input middle" v-model="grjbxx.xm" focus placeholder="请输入" maxlength="10"></input>
                </view>
            </view>
            <view class="list">
                <view class="describe">
                    性别
                    <text class="star"></text>
                </view>
                <picker class="detail" @change="bindSex" :value="sexIndex" :range="sexArray" range-key="name">
                    <view class="uni-input middle">{{ sexArray[sexIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
           <view class="list">
                <view class="describe">
                    身高
                    <text class="star"></text>
                </view>
                <view class="detail">
                    <input class="uni-input middle" v-model="grjbxx.sg" placeholder="请输入" maxlength="3"></input>
                </view>
            </view>
            <view class="list">
                 <view class="describe">
                         身份证号
                     <text class="star"></text>
                 </view>
                 <view class="detail">
                     <input class="uni-input middle" v-model="grjbxx.sfzjh" placeholder="请输入" maxlength="18"></input>
                 </view>
             </view>
            <view class="list">
                <view class="describe">
                    电子邮箱
                    <text class="star"></text>
                </view>
                <view class="detail">
                    <input class="uni-input middle" v-model="grjbxx.yx" placeholder="请输入" maxlength="20" />
                </view>
            </view>
            <view class="list">
                <view class="describe">出生年月</view>
                <picker class="detail" mode="date" :value="csrq" :end="endDate" @change="bindDateChange" fields="day">
                    <view class="uni-input middle">{{ csrq }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <ss title="籍贯" :province="grjbxx.jgdms" :city="grjbxx.jgdmcs" @confirm="nativeConfirm" />
            </view>
            <view class="list">
                <ss title='现居城市' :province="grjbxx.dqszs" :city="grjbxx.dqszcs"  @confirm="locationConfirm" />
            </view>
            <view class="list">
                <view class="describe">民族</view>
                <picker class="detail" :value="nationIndex" @change="bindNation" :range="nationArray" range-key="name">
                    <view class="uni-input middle">{{ nationArray[nationIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">政治面貌</view>
                <picker class="detail" :value="politicsIndex" @change="bindPolitics" :range="politicsArray" range-key="name">
                    <view class="uni-input middle">{{ politicsArray[politicsIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">婚姻状况</view>
                <picker class="detail" :value="maritalIndex" @change="bindMarital" :range="maritalArray" range-key="name">
                    <view class="uni-input middle">{{ maritalArray[maritalIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">是否学生</view>
                <picker class="detail" :value="statusIndex" @change="bindStatus" :range="statusArray" range-key="name">
                    <view class="uni-input middle">{{ statusArray[statusIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">最高学位</view>
                <picker class="detail" :value="degreeIndex" @change="bindDegree" :range="degreeArray" range-key="name">
                    <view class="uni-input middle">{{ degreeArray[degreeIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">最后毕业院校</view>
                <view class="detail">
                    <input class="uni-input middle" v-model="grjbxx.zgxx" placeholder="请输入" maxlength="20"></input>
                </view>
            </view>
            <view class="list">
                <view class="describe">最高学历专业</view>
                <view class="detail">
                    <input class="uni-input middle" v-model="grjbxx.zgzy" placeholder="请输入" maxlength="20"></input>
                </view>
            </view>
            <view class="list">
                <view class="describe">工作时间</view>
                <picker class="detail" mode="date" :value="workDate" :end="endDate" @change="bindWork" fields="day">
                    <view class="uni-input middle">{{ workDate }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="describe">自我评价</view>
                <view class="zwpj">
                    <textarea placeholder="请输入内容" v-model="grjbxx.zwpj" maxlength="200"></textarea>
                </view>
            </view>
        </view>
        <van-button class="save" type="primary" size="large" color="#ff8421" @click="save">保存</van-button>
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
    import uniPopup from '@/components/uni-popup/uni-popup.vue';
    import {
        ssq
    } from '@/components/ssq-cascader/ssq.vue';
    import {
        ss
    } from '@/components/ss-cascader/ss.vue';

    export default {
        data() {
            return {
                judgeVal: 0, // 1查询失败 2有个人数据 3没有个人数据
                grjbxx: { //个人基本信息
                    qzbsid: "",
                    x: "",
                    xm: "",
                    xbm: "xb_001",
                    csrq: "",
                    nl: "",
                    sj: "",
                    sfzjh: "",
                    dqszs: "110000000000",
                    dqszcs: "110100000000",
                    // dqszxq: "110101000000",
                    jgdms: "110000000000",
                    jgdmcs: "110100000000",
                    cjgzny: "",
                    gznx: "",
                    qzzt: "zt_001",
                    hyzk: "hy_001",
                    mzdm: "mz_001",
                    zzmm: "zz_001",
                    sfxs: "1",
                    sg: "",
                    sjzt: "",
                    yx: "",
                    yxzt: "",
                    tdcs: "",
                    txid: "",
                    wsd: "",
                    zgxl: "11",
                    zgxw: "",
                    zgxx: "",
                    zgzy: "",
                    zjgsmc: "",
                    zjgwmc: "",
                    zwpj: ""
                }
            };
        },
        components: {
            uniPopup,
            ssq,
            ss
        },
        computed: {
            ...mapState({
                dmList: 'dmList'
            }),
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            endDate() {
                return dateUtil.formatDate3(new Date());
            },
            csrq() {
                return dateUtil.formatDate1(this.grjbxx.csrq);
            },
            workDate() {
                return dateUtil.formatDate1(this.grjbxx.cjgzny);
            },
            //性别
            sexIndex() {
                return this.getIndex(this.dmList.m_xbdm,this.grjbxx.xbm);
            },
            sexArray() {
                let value = [];
                if (this.dmList.m_xbdm && this.dmList.m_xbdm.length > 0) {
                    value = this.dmList.m_xbdm;
                }
                return value;
            },
            //民族
            nationIndex() {
                return this.getIndex(this.dmList.m_mzdm,this.grjbxx.mzdm);
            },
            nationArray() {
                let value = [];
                if (this.dmList.m_mzdm && this.dmList.m_mzdm.length > 0) {
                    value = this.dmList.m_mzdm;
                }
                return value;
            },
            // 政治面貌
            politicsIndex() {
                return this.getIndex(this.dmList.m_zzmm,this.grjbxx.zzmm);
            },
            politicsArray() {
                let value = [];
                if (this.dmList.m_zzmm && this.dmList.m_zzmm.length > 0) {
                    value = this.dmList.m_zzmm;
                }
                return value;
            },
            //婚姻状态 m_hyzkdm
            maritalIndex() {
                return this.getIndex(this.dmList.m_hyzkdm,this.grjbxx.hyzk);
            },
            maritalArray() {
                let value = [];
                if (this.dmList.m_hyzkdm && this.dmList.m_hyzkdm.length > 0) {
                    value = this.dmList.m_hyzkdm;
                }
                return value;
            },
            //是否学生
            statusIndex() {
                return this.grjbxx.sfxs=="1"?"1":"0";
            },
            statusArray() {
                let value = [{
                    id: '0',
                    name: '非学生'
                }, {
                    id: '1',
                    name: '学生'
                }];
                return value;
            },
            // 最高学历
            degreeIndex() {
                return this.getIndex(this.dmList.m_xldm,this.grjbxx.zgxl);
            },
            degreeArray() {
                let value = [];
                if (this.dmList.m_xldm && this.dmList.m_xldm.length > 0) {
                    value = this.dmList.m_xldm;
                }
                return value;
            }
        },
        onShow() {
            this.getGrjbxxInfo();
        },
        methods: {
            getIndex(list, dm) {
                let index = null;
                if (dm && list && list.length > 0) {
                    list.forEach((item, idx) => {
                        if (dm == item.dm) {
                            index = idx;
                        }
                    });
                }
                return index;
            },

            openPopup() {
                this.$refs.popup.open();
            },
            closePopup() {
                this.$refs.popup.close();
            },
            /* 性别 */
            bindSex(e) {
                this.grjbxx.xbm = this.sexArray[e.detail.value].dm;
            },
            /* 出生日期 */
            bindDateChange(e) {
                this.grjbxx.csrq = dateUtil.formatDate2(e.target.value);
            },
            /* 籍贯 */
            nativeConfirm(param) {
                console.log('nativeConfirm = ', param);
                this.grjbxx.jgdms = param.province;
                this.grjbxx.jgdmcs = param.city;
            },
            /* 所在城市 */
            locationConfirm(param) {
                console.log('locationConfirm param = ', param);
                if(this.grjbxx.dqszs&&this.grjbxx.dqszs!='null'){
                     this.grjbxx.dqszs = param.province;
                }
               if(this.grjbxx.dqszcs&&this.grjbxx.dqszcs!='null'){
                     this.grjbxx.dqszcs = param.city;
               }
                // this.grjbxx.dqszxq = param.district;
            },
            /* 民族 */
            bindNation(e) {
                this.grjbxx.mzdm = this.nationArray[e.detail.value].dm;
            },
            /* 政治面貌 */
            bindPolitics(e) {
                this.grjbxx.zzmm = this.politicsArray[e.detail.value].dm;
            },
            /* 婚姻 */
            bindMarital(e) {
                this.grjbxx.hyzk = this.maritalArray[e.detail.value].dm;
            },
            /* 是否学生 */
            bindStatus(e) {
                this.grjbxx.sfxs = e.target.value;
            },
            /* 最高学历 */
            bindDegree(e) {
                this.grjbxx.zgxl = this.degreeArray[e.detail.value].dm;
            },
            /* 参加工作时间 */
            bindWork(e) {
                this.grjbxx.cjgzny = dateUtil.formatDate2(e.target.value);
            },
            /* 查询数据 */
            getGrjbxxInfo() {
                this.$http({
                    url: `/qz/qzgrjbxx/info`,
                    method: 'GET',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        console.log(data)
                        if (data.data.code == 0) {
                            if (data.data.qzGrjbxx) {
                                console.log(data.data.qzGrjbxx)
                                this.grjbxx = data.data.qzGrjbxx;
                                // 1查询失败 2有个人数据 3没有个人数据
                                this.judgeVal = 2;
                            } else {
                                this.judgeVal = 3;
                            }
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
            },

            /* 保存 */
            save() {
                // 1查询失败 2有个人数据 3没有个人数据
                let url = '/qz/qzgrjbxx/save';
                if (this.judgeVal == 2) {
                    url = '/qz/qzgrjbxx/update';
                }
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询个人信息失败 请返回上个页面重新进入!'
                    });
                } else {
                    if (!this.grjbxx.xm) {
                        uni.showToast({
                            icon: 'none',
                            title: '请输入姓名!'
                        });
                        return;
                    }
                    // if (!/^1[3456789]\d{9}$/.test(this.grjbxx.sj)) {
                    //     uni.showToast({
                    //         icon: 'none',
                    //         title: '请输入正确的手机号!'
                    //     });
                    //     return false;
                    // }
                    // if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.grjbxx.yx)) {
                    //     uni.showToast({
                    //         icon: 'none',
                    //         title: '请输入正确的邮箱!'
                    //     });
                    //     return false;
                    // }
                  // if (!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(this.grjbxx.sfzjh)) {
                  //             uni.showToast({
                  //                 icon: 'none',
                  //                 title: '身份证格式不正确!'
                  //             });
                  //             return false;
                  //      }
                    this.$http({
                        url,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: this.grjbxx,
                        success: data => {
                            if (data.data.code == 0) {
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
                                title: '查询失败!'
                            });
                        }
                    });
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        padding: 10px;
    }

    #editor {
        width: 100%;
        height: 300px;
        background-color: #CCCCCC;
    }

    .personal-page {
        padding: 0 20rpx 120rpx 20rpx;

        .save {
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

    .photo-wrap {
        text-align: center;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #f2f2f2;

        .photo {
            width: 150rpx;
            height: 150rpx;
        }

        .modify {
            font-size: 26rpx;
            color: #999999;
        }
    }

    .content {
        .list {
            padding: 16rpx 0;
            border-bottom: 1rpx solid #f2f2f2;

            .describe {
                font-size: 24rpx;
                color: #999999;
                line-height: 50rpx;

                .star {
                    color: #ff8520;
                    margin-left: 5rpx;
                }
            }

            .detail {
                height: 50rpx;
                line-height: 50rpx;

                .menu {
                    font-size: 30rpx;
                    color: #333333;
                }

                .back-icon {
                    width: 13rpx;
                    height: 24rpx;
                }

                /deep/ .uni-input {
                    width: 90%;
                    margin-right: 8%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .zwpj {
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
