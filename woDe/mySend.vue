<template>
    <view class="send-page">
        <view class="inv-h-w">
            <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">全部</view>
            <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">被查看</view>
            <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="Inv = 2">不合适</view>
        </view>
        <view class="list-wrap" v-show="Inv == 0">
            <view class="improper" v-if="hasData">
                <view class="send-img"><image class="send-icon" src="../../../static/icon/send-icon.png" mode="aspectFit"></image></view>
                <view class="tips">暂无记录</view>
            </view>
            <navigator :url='"/woDe/sendDetail?bsid="+item.bsid+"&gwlb="+item.gwlb' class="list" v-for="(item, i) in allList" :key="i" v-else>
                <view class="title flex flex-wrap justify-between align-center">
                    <text class="job-title">{{ item.gwmc }}</text>
                    <text class="date">{{ formatItem(item.tdsj) }}</text>
                </view>
                <view class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</view>
                <view class="company-box">
                    <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFill"></image>
                    <view class="limit">
                        <text class="dress">{{ cityMap[item.dwszsf][item.dwszcs] }}</text>
                        <text class="compony-name">{{ cityMap[item.dwszsf][item.dwszcs] }}{{ item.dwmc }}</text>
                    </view>
                    <text class="viewed fr">
                        简历被查看
                        <text class="view-time">{{ item.ckcs }}</text>
                        次
                    </text>
                </view>
            </navigator>
            <view class="delete-btn">
                <image class="icon" src="../static/icon/delete-btn.png" mode="aspectFit"></image>
                <view class="text">删除</view>
            </view>
        </view>
        <view class="list-wrap" v-show="Inv == 1">
            <view class="improper" v-if="hasData">
                <view class="send-img"><image class="send-icon" src="../../../static/icon/send-icon.png" mode="aspectFit"></image></view>
                <view class="tips">暂无记录</view>
            </view>
            <navigator :url='"/woDe/sendDetail?bsid="+item.bsid+"&gwlb="+item.gwlb' class="list" v-for="(item, i) in lookList" :key="i" v-else>
                <view class="title flex flex-wrap justify-between align-center">
                    <text class="job-title">{{ item.gwmc }}</text>
                    <text class="date">{{ formatItem(item.tdsj) }}</text>
                </view>
                <view class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</view>
                <view class="company-box">
                    <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFill"></image>
                    <view class="limit">
                        <text class="dress">{{ cityMap[item.dwszsf][item.dwszcs] }}</text>
                        <text class="compony-name">{{ cityMap[item.dwszsf][item.dwszcs] }}{{ item.dwmc }}</text>
                    </view>
                    <text class="viewed fr">
                        简历被查看
                        <text class="view-time">{{ item.ckcs }}</text>
                        次
                    </text>
                </view>
            </navigator>
        </view>
        <view class="list-wrap" v-show="Inv == 2">
            <view class="improper" v-if="hasData">
                <view class="send-img"><image class="send-icon" src="../../../static/icon/send-icon.png" mode="aspectFit"></image></view>
                <view class="tips">暂无记录</view>
            </view>
            <navigator :url='"/woDe/sendDetail?bsid="+item.bsid+"&gwlb="+item.gwlb' class="list" v-for="(item, i) in improperList" :key="i" v-else>
                <view class="title flex flex-wrap justify-between align-center">
                    <text class="job-title">{{ item.gwmc }}</text>
                    <text class="date">{{ formatItem(item.tdsj) }}</text>
                </view>
                <view class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</view>
                <view class="company-box">
                    <image class="company-icon" src="../../../static/icon/company-icon.png" mode="aspectFill"></image>
                    <view class="limit">
                        <text class="dress">{{ cityMap[item.dwszsf][item.dwszcs] }}</text>
                        <text class="compony-name">{{ cityMap[item.dwszsf][item.dwszcs] }}{{ item.dwmc }}</text>
                    </view>
                    <text class="viewed fr">
                        简历被查看
                        <text class="view-time">{{item.ckcs}}</text>
                        次
                    </text>
                </view>
            </navigator>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            Inv: 0,
            page: 1,
            totalPage: 0,
            limit: 10,
            allList: [], // 全部列表
            hasData: false,
            lookList: [], // 被查看列表
            improperList: [] // 不合适列表
            /* allList: { // 全部
            	page: 1,
            	totalPage: 0,
            	limit: 10,
            	list: []
            },
            lookList: { // 被查看
            	page: 1,
            	totalPage: 0,
            	limit: 10,
            	list: []
            },
            improperList: { // 不合适
            	page: 1,
            	totalPage: 0,
            	limit: 10,
            	list: []
            } */
        };
    },
    components: {},
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        }),
        ...mapState({
            provinceMap: state => state.provinceMap,
            cityMap: state => state.cityMap,
            dmMap: state => state.dmMap
        })
    },
    watch: {
        Inv() {
            this.switchList();
        }
    },
    mounted() {
        this.sendList();
    },
    methods: {
        switchList() {
            switch (this.Inv) {
                case 0:
                    this.sendList();
                    break;
                case 1:
                    this.lookedList();
                    break;
                case 2:
                    this.deniedList();
                    break;
            }
        },
        /* 岗位投递(全部) */
        sendList() {
            this.$http({
                url: `/qz/qyhxrxx/listAll/${this.page}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.allList = data.data.page.gwtdlist;
                        if(this.allList.length == 0){
                            this.hasData = true;
                        }else{
                            this.hasData = false;
                        }
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                },
                fail: err => {
                    uni.showToast({
                        title: '获取失败!'
                    });
                }
            });
        },
        /* 岗位投递(被查看) */
        lookedList() {
            this.$http({
                url: `/qz/qyhxrxx/listLooked/${this.page}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.lookList = data.data.page.gwtdlist;
                        if(this.lookList.length == 0){
                            this.hasData = true;
                        }else{
                            this.hasData = false;
                        }
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                },
                fail: err => {
                    uni.showToast({
                        title: '获取失败!'
                    });
                }
            });
        },
        /* 岗位投递(不合适) */
        deniedList() {
            this.$http({
                url: `/qz/qyhxrxx/listDenied/${this.page}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.improperList = data.data.page.gwtdlist;
                        if(this.improperList.length == 0){
                            this.hasData = true;
                        }else{
                            this.hasData = false;
                        }
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: data.data.msg
                        });
                    }
                },
                fail: err => {
                    uni.showToast({
                        title: '获取失败!'
                    });
                }
            });
        },
        formatItem(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY年MM月DD号');
        }
    }
};
</script>

<style lang="scss" scoped>
.send-page {
    .inv-h-w {
        display: flex;
        border-bottom: 1rpx solid #f2f2f2;
        background: #ff8421;
        font-size: 30rpx;
        color: #ffdd9a;
        height: 80rpx;
    }
    .inv-h {
        flex: 1;
        text-align: center;
        margin: 0 80rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin-top: 10rpx;
    }
    .inv-h-se {
        color: #ffffff;
        border-bottom: 3rpx solid #ffffff;
        font-weight: 600;
    }
    .list-wrap {
        background: #fafafa;
        padding: 20rpx;
        position: relative;
        .list {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            padding: 20rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
            &:last-child {
                margin-bottom: 0;
            }
            .job-title {
                font-weight: 600;
                color: #333333;
                font-size: 30rpx;
            }
            .date {
                color: #b2b2b2;
                font-size: 24rpx;
            }
            .wage {
                color: #ff8421;
                font-size: 26rpx;
                font-weight: 600;
                line-height: 60rpx;
            }
            .company-box {
                height: 34rpx;
                line-height: 34rpx;
                .company-icon {
                    display: inline-block;
                    vertical-align: middle;
                    width: 34rpx;
                    height: 100%;
                }
                .limit {
                    font-size: 24rpx;
                    color: #808080;
                    color: #b2b2b2;
                    display: inline-block;
                    .dress {
                        padding: 0 10rpx;
                        border-right: 1px solid #cccccc;
                    }
                    .compony-name {
                        padding: 0 10rpx;
                    }
                }
                .viewed {
                    color: #b2b2b2;
                    font-size: 22rpx;
                    .view-time {
                        color: #ff8421;
                        padding: 0 5rpx;
                    }
                }
            }
        }
        .delete-btn {
            width: 100rpx;
            height: 100rpx;
            font-size: 20rpx;
            color: #d81e06;
            background: #ffffff;
            position: fixed;
            right: 20rpx;
            bottom: 100rpx;
            border-radius: 50%;
            box-shadow: 0rpx 10rpx 10rpx #d0d0d0;
            .icon {
                width: 38rpx;
                height: 40rpx;
                display: block;
                margin: auto;
                margin-top: 18rpx;
            }
            .text {
                text-align: center;
                line-height: 36rpx;
            }
        }
        .improper {
            text-align: center;
            .send-img {
                width: 350rpx;
                height: 320rpx;
                margin: 0 auto;
                margin-top: 108rpx;
                .send-icon {
                    width: 100%;
                    height: 100%;
                }
            }
            .tips {
                font-size: 24rpx;
                color: #999999;
                margin-top: 50rpx;
            }
        }
    }
}
</style>
