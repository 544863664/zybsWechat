<template>
    <view class="sendDetail">
        <view class="top">
            <view class="plan">
                <view class="flex">
                    <view class="title-plan">{{ dataInfo.gwmc }}</view>
                    <view class="time">昨天{{ formatItem(dataInfo.tdsj) }}</view>
                </view>
                <view class="adress">
                    <image class="logo middle" src="../../../static/icon/company-icon.png"></image>
                    <view class="detail middle">{{ cityMap[dataInfo.dwszsf][dataInfo.dwszcs] }} | {{ cityMap[dataInfo.dwszsf][dataInfo.dwszcs] }}{{ dataInfo.dwmc }}</view>
                </view>
                <uni-steps :options="options" :active="active" active-color="#FF8421" class="steps"></uni-steps>
            </view>
        </view>
        <view class="list-box">
            <view class="tips cl"><image class="tips-img" src="../../../static/icon/tjgw.png"></image></view>
            <navigator :url="'/pages/qiuZhi/gangWei/detail?bsid=' + item.bsid" class="list" v-for="(item, i) in dataList" :key="i">
                <view class="title flex flex-wrap justify-between align-center">
                    <text class="job-title">{{ item.gwmc }}</text>
                    <text class="wage">{{ dmMap['m_xzdydm'][item.gwyx] }}</text>
                </view>
                <view class="line flex">
                    <view class="limit">
                        <text>{{ cityMap[item.sbsf][item.sbcs] }}</text>
                        <!-- <text>武珞路</text> -->
                        <text>{{ dmMap['m_jyyqdm'][item.jyyq] }}</text>
                        <text>{{ dmMap['m_xldm'][item.xlyq] }}</text>
                    </view>
                    <text class="date">{{ formatItem(item.sxsj) }}</text>
                </view>
                <view class="company-box">
                    <image class="company-icon" src="../../../static/icon/company-icon.png" mode=""></image>
                    <text class="company-name">{{ item.dwmc }}</text>
                </view>
                <view class="press-btn">
                    <van-button type="info" size="small" v-if="item.dwxz && item.dwxz != 'null'">{{ dmMap['m_dwxzdm'][item.dwxz] }}</van-button>
                    <van-button type="info" size="small" v-if="item.dwsshy && item.dwsshy !== 'null'">{{ dmMap['m_dwsshydm'][item.dwsshy] }}</van-button>
                    <van-button type="info" size="small">{{ formatYear(item.dwclsj) }}年注册</van-button>
                    <van-button type="info" size="small" v-if="item.dwgm && item.dwgm !== 'null'">{{ dmMap['m_dwgmdm'][item.dwgm] }}</van-button>
                </view>
            </navigator>
        </view>
        <!-- 推荐岗位 -->
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { uniSteps } from '@/components/uni-steps/uni-steps.vue';
import moment from 'moment';
export default {
    data() {
        return {
            options: [{ title: '已投递' }, { title: '被查看' }, { title: '是否合适' }, { title: '邀面试' }],
            active: '0',
            dataInfo: {},
            dataList: [],
            bsid: '',
            gwlb: ''
        };
    },
    components: { uniSteps },
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
    onLoad(params) {
        console.log(params);
        this.bsid = params.bsid;
        this.gwlb = params.gwlb;
    },
    mounted() {
        this.progressList();
        this.recomendList();
    },
    methods: {
        /* 投递进度详情 */
        progressList() {
            this.$http({
                url: `/qz/qyhxrxx/info/${this.bsid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.dataInfo = data.data.qyHxrxx;
                        var jlzt = this.dataInfo.jlzt;
                        var ckcs = this.dataInfo.ckcs;
                        if (jlzt == 1) {
                            this.active = 0;
                        }
                        if (ckcs > 0) {
                            this.active = 1;
                        }
                        if (jlzt == 3) {
                            this.active = 3;
                        }
                        if (jlzt == 4) {
                            this.options[2].title = '不合适';
                            this.active = 2;
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
        /* 岗位推荐列表 */
        recomendList() {
            this.$http({
                url: '/hr/qydwgwfbxx/findGwtjList?gwlb=' + this.gwlb,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    if (data.data.code === 0) {
                        this.dataList = data.data.page.list;
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
        formatYear(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('YYYY');
        },
        formatItem(date) {
            return moment(date, 'YYYY-MM-DD HH:mm:ss ').format('HH:mm');
        }
    }
};
</script>

<style lang="scss" scoped>
.top {
    height: 200rpx;
    /* background-image: linear-gradient(to right, #ff9b3a, #ff704a); */
    background: #ff8421;
    padding: 20rpx;
    margin-bottom: 150rpx;
}
.plan {
    box-shadow: 0 0 5rpx #ccc;
    padding: 20rpx;
    border-radius: 12rpx;
    background-color: #fff;
}
.adress {
    height: 50rpx;
    line-height: 50rpx;
}
.title-plan {
    color: #333333;
    font-size: 30rpx;
    font-weight: bold;
}
.logo {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
}
.detail {
    font-size: 24rpx;
    font-weight: 400;
    color: #808080;
    margin-left: 10rpx;
}
.time {
    font-size: 22rpx;
    color: #666;
}
.tips {
    margin-bottom: 40rpx;
    position: relative;
    .tips-img {
        width: 340rpx;
        height: 22rpx;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }
}
.press-btn van-button {
    margin-right: 10rpx;
}
.list-box {
    padding: 20rpx;
}
.list {
    width: 100%;
    box-shadow: 0 0 10rpx #e9e9e9;
    border-radius: 12rpx;
    padding: 20rpx;
    background: #ffffff;
    margin-bottom: 20rpx;
}
.title .job-title {
    font-weight: bold;
    color: #333333;
    font-size: 30rpx;
}
.title .wage {
    color: #ff8421;
    font-size: 30rpx;
    font-weight: bold;
}
.line {
    font-size: 24rpx;
    color: #b2b2b2;
    .limit {
        line-height: 60rpx;
        text {
            padding: 0 10rpx;
            border-right: 1px solid #cccccc;
            &:first-child {
                padding-left: 0;
            }
            &:last-child {
                border-right: none;
            }
        }
    }
}
.company-box {
    height: 34rpx;
    line-height: 34rpx;
}
.company-box .company-icon {
    display: inline-block;
    vertical-align: middle;
    width: 34rpx;
    height: 100%;
}
.company-box .company-name {
    display: inline-block;
    vertical-align: middle;
    margin-left: 16rpx;
    font-size: 24rpx;
    color: #808080;
}
.press-btn {
    margin-top: 20rpx;
}

.press-btn uni-button {
    color: #999999;
}
.date {
    font-size: 20rpx;
    color: #b3b3b3;
}
</style>
