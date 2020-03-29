<template>
    <view class="intention">
        <view class="main">
            <picker class="state" :value="qzztIndex" @change="bindState" :range="qzztList" range-key="name">
                <view class="title fl">求职状态</view>
                <view class="popup fr">
                    <view class="pop-text middle">{{ qzztMap[qzzt] }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </view>
            </picker>
            <view class="list-title">求职意向 ({{ qzyxList.length || 0 }}个)</view>
            <navigator :url="'/woDe/addIntention?qzyxid=' + item.qzyxid" class="list" v-for="(item, i) in qzyxList" :key="i" @longpress="intentionDel(item.qzyxid)">
                <view class="top flex">
                    <view class="position middle">{{ gwlb3Map[item.zwmt][item.zwm] }}</view>
                    <image class="back-icon middle" src="../../../static/icon/back.png" mode="aspectFill"></image>
                </view>
                <view class="limit">
                    <text>{{ provinceMap[item.sjm] }}-{{ cityMap[item.sjm][item.cjm] }}</text>
                    <text>{{ xzdyMap[item.yxm] }}</text>
                    <text>{{ gzxzMap[item.gzxzm] }}</text>
                </view>
            </navigator>
        </view>
        <view class="btn" @click="detail">添加求职意向</view>
    </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

export default {
    data() {
        return {
            judgeVal: 0, // 1查询失败 2查询成功
            qzzt:'',
            qzyxList: [] // 求职意向列表
        };
    },
    components: {
        uniList,
        uniListItem
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        ...mapState({
            provinceMap: state => state.provinceMap,
            cityMap: state => state.cityMap,
            xzdyMap: state => state.dmMap.m_xzdydm,
            gzxzMap: state => state.dmMap.m_gwgzxzdm,
            qzztMap: state => state.dmMap.m_qzzt,
            qzztList: state => state.dmList.m_qzzt,
            gwlb3Map: state => state.gwlb3Map
        }),

        qzztIndex(){
            let index = 0;
            if(this.qzzt && this.qzztList){
                this.qzztList.forEach((item, idx)=>{
                    if(this.qzzt==item.dm){
                        index = idx;
                    }
                })
            }
            return index;
        }
    },
    onShow() {
        console.log("provinceMap ", this.provinceMap);
        console.log("cityMap ", this.cityMap);
        console.log("xzdyMap ", this.xzdyMap);
        console.log("gzxzMap ", this.gzxzMap);

        this.getQzzt();
        this.getQzyxList();
    },
    methods: {
        /* 求职意向详情 */
        detail() {
            uni.navigateTo({
                url: '/woDe/addIntention'
            });
        },
        /* 求职状态 */
        bindState(e) {
            let qzzt = this.qzztList[e.target.value].dm;

            if(qzzt){
                this.$http({
                    url: `/qz/qzgrjbxx/updateQzzt/${qzzt}`,
                    method: 'POST',
                    header: {
                        token: this.token
                    },
                    success: data => {
                        if (data.data.code === 0) {
                            this.qzzt = data.data.qzzt;
                            this.judgeVal=2;
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
                            title: '更新失败!'
                        });
                    }
                });
            }
        },
        /* 求职状态 */
        getQzzt() {
            this.$http({
                url: `/qz/qzgrjbxx/qzzt`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.qzzt = data.data.qzzt;
                        this.judgeVal=2;
                    } else if(data.data.code == 201){
                        uni.showToast({
                            title: "请首先完善个人信息",
                            duration: 3000
                        });
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
        },
        /* 求职意向列表 */
        getQzyxList() {
            this.$http({
                url: `/qz/qzqzyx/list`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code == 0) {
                        this.qzyxList = data.data.qzyxList;
                    }else{
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
        },
        /* 长按删除求职意向 */
        intentionDel(qzyxid) {
            uni.showModal({
                title: '提示',
                content: '是否删除这条信息?',
                success: res => {
                    if (res.confirm) {
                        this.deleteItem(qzyxid);
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },
        /* 求职意向删除信息 */
        deleteItem(qzyxid) {
            this.$http({
                url: `/qz/qzqzyx/delete/${qzyxid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.getQzyxList();
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                },
                fail: err => {
                    uni.showToast({
                        title: '删除失败!'
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.intention {
    background: #ffffff;
    height: 100%;
    padding: 0 20rpx 110rpx 20rpx;
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
    .state {
        height: 130rpx;
        line-height: 130rpx;
        border-bottom: 1rpx solid #f2f2f2;
        .title {
            width: 50%;
            font-size: 34rpx;
            font-weight: 600;
        }
        .popup {
            width: 50%;
            text-align: right;
            .pop-text {
                margin-right: 18rpx;
                font-size: 24rpx;
                color: #999999;
            }
        }
    }
    .back-icon {
        width: 13rpx;
        height: 24rpx;
    }
    .list-title {
        font-size: 34rpx;
        font-weight: 600;
        padding-top: 30rpx;
    }
    .list {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f2f2f2;
        .top {
            font-size: 30rpx;
            color: #333333;
            line-height: 50rpx;
        }
        .limit {
            font-size: 24rpx;
            color: #999999;
            line-height: 40rpx;
            text {
                padding: 0 10rpx;
                border-right: 1px solid #dddddd;
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    border-right: none;
                }
            }
        }
    }
}

// .main {
//     .job-title {
//         font-size: 30rpx;
//         color: #333333;
//         line-height: 50rpx;
//         font-weight: 600;
//         padding: 30rpx 0 0 30rpx;
//     }
//     .state /deep/ .uni-list-item__content-title {
//         font-weight: 600;
//     }
//     /deep/ .uni-list-item__content-title {
//         font-size: 30rpx !important;
//         color: #333333 !important;
//     }
//     /deep/ .uni-list-item__content-note {
//         font-size: 24rpx;
//         color: #999999;
//     }
// }
</style>
