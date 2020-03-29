<template>
    <view class="addProject">
        <view class="main">
            <view class="list">
                <ss title="期望地点" :province="qzyx.sjm" :city="qzyx.cjm" @confirm="csConfirm" />
            </view>
            <view class="list">
                <view class="title">公司性质</view>
                <picker class="content" @change="gsxzChange" :value="dwxzIndex" :range="dwxzList" range-key="name">
                    <view class="uni-input middle">{{ dwxzList[dwxzIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <view class="title">工作性质</view>
                <picker class="content" @change="gzxzChange" :value="gzxzIndex" :range="gzxzList" range-key="name">
                    <view class="uni-input middle">{{ gzxzList[gzxzIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list flex" id="hide">
                <view class="describe">是否面议</view>
                <switch :checked="sfmy" color="#FFC321" @change="whetherChange" style="transform:scale(0.6)" />
            </view>     
          
           
           
            <view class="list">
                <view class="title">到岗时间</view>
                <picker class="content" @change="dgsjChange" :value="dgsjIndex" :range="dgsjdmList" range-key="name">
                    <view class="uni-input middle">{{ dgsjdmList[dgsjIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <view class="list">
                <gwlb title="行业类别" :gwlb1="qzyx.zwmo" :gwlb2="qzyx.zwmt" :gwlb3="qzyx.zwm" @confirm="gwlbConfirm" />
            </view>
            <view class="list">
                <view class="title">期望月薪</view>
                <picker class="content" @change="xzdyChange" :value="xzdyIndex" :range="xzdyList" range-key="name">
                    <view class="uni-input middle">{{ xzdyList[xzdyIndex].name }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </picker>
            </view>
            <!-- <view class="list">
                <view class="title">月数</view>
                <view class="content flex">
                    <input type="number" class="uni-input" v-model="qzyx.ys" placeholder="请输入" maxlength="20" />
                </view>
            </view> -->
           
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
    import {
        ss
    } from '@/components/ss-cascader/ss.vue';
    import {
        gwlb
    } from '@/components/gwlb-cascader/gwlb.vue';
    import dateUtil from '@/common/dateUtil.js';

    export default {
        data() {
            return {
                judgeVal: 0, // 1查询失败 2查询成功
                qzyxid: '', // 求职意向id
                qzyx: {
                    qzbsid: "", //求职者编号
                    qzyxid: "", //求职意向编号
                    zwmo: "gw_00", //职位码1
                    zwmt: "gw_0000", //职位码2
                    zwm: "gw_000000", //职位码3
                    gsxzm: "dx_001", //公司性质
                    gzxzm: "gx_001", //工作性质
                    sjm: "110000000000", //期望工作省代码
                    cjm: "110100000000", //期望工作市代码
                    dgsj: "dg_001", //到岗时间
                    hym: "", //行业
                    yxm: "dy_001", //月薪码
                    ys: "12", //月数
                    nx: "", //年薪
                    sfmy: "1", //是否面议
                    yxj: "1" //优先级
                }
            };
        },

        components: {
            ss,
            gwlb
        },

        onLoad(options) {
            this.qzyxid = options.qzyxid;
        },

        computed: {
            ...mapGetters('loginState', {
                token: 'getToken'
            }),
            ...mapState({
                dgsjdmList: state => state.dmList.m_dgsjdm,
                dwxzList: state => state.dmList.m_dwxzdm,
                gzxzList: state => state.dmList.m_gwgzxzdm,
                xzdyList: state => state.dmList.m_xzdydm
            }),
            dgsjIndex() {
                return this.getIndex(this.dgsjdmList, this.qzyx.dgsj);
            },
            dwxzIndex() {
                return this.getIndex(this.dwxzList, this.qzyx.gsxzm);
            },
            gzxzIndex() {
                return this.getIndex(this.gzxzList, this.qzyx.gzxzm);
            },
            xzdyIndex() {
                return this.getIndex(this.xzdyList, this.qzyx.yxm);
            },
            sfmy(){
                return this.qzyx.sfmy=="1";
            }
        },

        onShow() {
            if (this.qzyxid) {
                this.getInfoData();
            }
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
            /* 期望城市 */
            csConfirm(param) {
                console.log('csConfirm = ', param);
                this.qzyx.sjm = param.province;
                this.qzyx.cjm = param.city;
            },
            /* 岗位类别 */
            gwlbConfirm(param) {
                console.log('gwlbConfirm = ', param);
                this.qzyx.zwmo = param.gwlb1;
                this.qzyx.zwmt = param.gwlb2;
                this.qzyx.zwm = param.gwlb3;
            },
            /* 工作性质 */
            gzxzChange(e) {
                this.qzyx.gzxzm = this.gzxzList[e.target.value].dm;
            },
            /* 公司性质 */
            gsxzChange(e) {
                this.qzyx.gsxzm = this.dwxzList[e.target.value].dm;
            },
            /* 到岗时间 */
            dgsjChange(e) {
                this.qzyx.dgsj = this.dgsjdmList[e.target.value].dm;
            },
            /* 期望月薪 */
            xzdyChange(e) {
                this.qzyx.yxm = this.xzdyList[e.target.value].dm;
            },
            /* 是否面议 */
            whetherChange: function(e) {
                let checked = e.detail.value;
                if (checked) {
                    this.qzyx.sfmy = '1';
                } else {
                    this.qzyx.sfmy = '0';
                }
            },
            /* 保存信息 */
            whetherSave() {
                if (this.judgeVal == 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '查询失败,请返回上个页面重新进入'
                    });
                } else {
                    let url = "/qz/qzqzyx/save";
                    if (this.qzyxid) {
                        url = "/qz/qzqzyx/update";
                    }

                    this.$http({
                        url,
                        method: 'POST',
                        header: {
                            token: this.token
                        },
                        data: this.qzyx,
                        success: data => {
                            if (data.data.code === 0) {
                                uni.navigateTo({
                                    url: '/woDe/intention'
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
                    url: `/qz/qzqzyx/info/${this.qzyxid}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.qzyx = data.data.qzQzyx;
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
    }
</script>

<style lang="scss" scoped>
    .addProject {
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

        #hide {
            height: 100rpx;
            line-height: 100rpx;
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
