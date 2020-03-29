<template>
    <view class="mian">
        <view class="top">
            <image class="top-img" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/hxxx.png"></image>
            <image class="top-logo" src="../../../static/icon/send.png"></image>
        </view>
        <view class="mian-title">
            <text v-if="bsHxxx.hymc">{{ bsHxxx.hymc }}</text>
            <text class="title-local" v-if="bsHxxx.hysf">-{{cityMap[bsHxxx.hysf][bsHxxx.hycs]}}</text>
        </view>
        <view class="mian-detail">
            <view class="detail-title">
                <text>
                    共有
                    <text class="title-num">{{ companycount }}</text>
                    家企业参会 提供
                    <text class="title-num">{{ jobcount }}</text>
                    个职位
                </text>
            </view>
            <view class="detail-time">
                <view class="time-logo">
                    <image class="logo-img" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/sign-icon.png"></image>
                    <view class="logo-title">会议时间</view>
                </view>
                <view class="time-detail">{{ bsHxxx.hykssj.substring(0, 16) }}至{{ bsHxxx.hyjssj.substring(0, 16) }}</view>
            </view>
            <view class="head-local">
                <view class="local-logo">
                    <image class="local-img" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/adress.png"></image>
                    <view class="local-title">会议地点</view>
                </view>
                <view class="local-detail">{{ bsHxxx.hydd }}</view>
            </view>
        </view>
        <!-- taber 切换 -->
        <view class="tab">
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">线上直投</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">现场直投</view>
            </view>
            <view class="list-wrap" v-show="Inv == 0">
                <navigator class="list" :url="'/pages/qiuZhi/shouYe/company?bsid=' + item.bsid" v-for="(item, i) in offlinesol" :key="i" @click="company">
                    <view class="detail-top">
                        <view class="middle"><image class="img-wrap" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/send.png" mode="aspectFit"></image></view>
                        <view class="info-wrap middle">
                            <view class="info-name">{{item.dwmc}}</view>
                            <view>
                                <van-button type="info" size="small">{{cityMap[cityDetail][item.dwszcs]}}</van-button>
                                <van-button type="info" size="small">{{jobList['m_dwxzdm'][item.dwxz]}}</van-button>
                                <van-button type="info" size="small">{{jobList['m_dwsshydm'][item.dwsshy]}}</van-button>
                                <van-button type="info" size="small">{{item.dwclsj.substring(0,4)}}年注册</van-button>
                            </view>
                        </view>
                    </view>
                    <view class="company-wrap">
                        <image class="address-icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/fire.png" mode="aspectFit"></image>
                        <view class="adress-name">热招：{{item.gwmc}}</view>
                        <text class="lg text-gray cuIcon-right fr"></text>
                    </view>
                </navigator>
            </view>
            <view class="list-wrap" v-show="Inv == 1">
                <navigator class="list" :url="'/pages/qiuZhi/shouYe/company?bsid=' + item.bsid" v-for="(item, i) in sceneList" :key="i" >
                    <view class="detail-top">
                        <view class="middle"><image class="img-wrap" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/school.png" mode="aspectFit"></image></view>
                        <view class="info-wrap middle">
                            <view class="info-name">{{ item.dwmc }}
                            </view>
                            <view>
                                <van-button type="info" size="small">{{cityMap[cityDetail][item.dwszcs]}}</van-button>
                                <van-button type="info" size="small">{{jobList['m_dwxzdm'][item.dwxz]}}</van-button>
                                <van-button type="info" size="small">{{jobList['m_dwsshydm'][item.dwsshy]}}</van-button>
                                <van-button type="info" size="small">{{item.dwclsj.substring(0,4)}}年注册</van-button>
                            </view>
                        </view>
                    </view>
                    <view class="company-wrap">
                        <image class="address-icon" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/fire.png" mode="aspectFit"></image>
                        <view class="adress-name">热招：{{item.gwmc}}</view>
                        <text class="lg text-gray cuIcon-right fr"></text>
                    </view>
                </navigator>
            </view>
        </view>
        <view class="footer">
            <view class="day">
                <view class="day-img"><image class="dayimg" src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/wxImage/icon/day.png"></image></view>
                <view class="day-text">添加到日历</view>
            </view>
            <navigator class="join" :url="'/pages/qiuZhi/shouYe/join?bsid=' + list.bsid">立即参会</navigator>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            Inv: 0,
            bsid: "",
			bsHxxx: {},
			companycount: 0,
			jobcount: 0,
            offlinesol: [] ,//线上直投
            sceneList:[],//现场直投
            hxid:''//会训id
        };
    },
    onLoad(options) {
        this.bsid = options.bsid;
		this.offlineDetail()
    },
    mounted() {},
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
    methods: {
        //上半部分详情
        offlineDetail() {
            this.$http({
                method: 'POST',
                url: `/hr/bshxxx/findHxInfo?hxid=`+this.bsid,
                header: {
					"content-type": "application/json"
                    // token: this.token
                },
                success: res => {
                    if (res && res.data && res.data.code == 0) {
						let data = res.data;
						this.bsHxxx = data.bsHxxx;
						this.jobcount = data.jobcount;
						this.companycount = data.companycount;
                    }
                    // this.offlineList();
                    // this.scene()
                }
            });
        },
        //线上列表
        offlineList(hxid) {
            this.$http({
                url: '/hr/bskhgl/findDwListQzHx',
                method: 'GET',
                header: {
                    token: this.token
                },
                data:{
                  sfxstd:2,
                  hxid:this.hxid,
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.offlinesol = data.data.page.list;
                    }
                }
            });
        },
        //现场列表
        scene(hxid) {
            this.$http({
                url: '/hr/bskhgl/findDwListQzHx',
                method: 'GET',
                header: {
                    token: this.token
                },
                data:{
                  sfxstd:1,
                  hxid:this.hxid,
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.sceneList = data.data.page.list;
                    }
                }
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.mian {
    padding-bottom: 100rpx;
    .top {
        text-align: center;
        .top-img {
            width: 100%;
            height: 120rpx;
        }
        .top-logo {
            width: 170rpx;
            height: 170rpx;
            margin-top: -124rpx;
        }
    }
    .mian-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        padding: 18rpx 60rpx 48rpx 60rpx;
        .title-local {
            color: #ff8421;
        }
    }
    .mian-detail {
        height: 334rpx;
        margin: 0rpx 20rpx 28rpx 20rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
        border-radius: 7rpx;
        .detail-title {
            height: 80rpx;
            color: #333333;
            font-size: 26rpx;
            line-height: 80rpx;
            border-bottom: 1rpx solid #f2f2f2;
            padding-left: 20rpx;
            .title-num {
                color: #ff8421;
            }
        }
        .detail-time {
            padding: 20rpx;
            height: 124rpx;
            border-bottom: 1rpx solid #f2f2f2;
            .time-logo {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .logo-img {
                    width: 23rpx;
                    height: 23rpx;
                }
                .logo-title {
                    margin-left: 6rpx;
                    font-weight: bold;
                    color: #ff8421;
                    font-size: 24rpx;
                }
            }
            .time-detail {
                margin-top: 10rpx;
                color: #999999;
                font-size: 24rpx;
            }
        }
        .head-local {
            padding: 20rpx;
            .local-logo {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                // margin-top: 15rpx;
                .local-img {
                    width: 21rpx;
                    height: 24rpx;
                }
                .local-title {
                    margin-left: 6rpx;
                    font-weight: bold;
                    color: #ff8421;
                    font-size: 24rpx;
                }
            }
            .local-detail {
                margin-top: 10rpx;
                color: #999999;
                font-size: 24rpx;
            }
        }
    }
    .tab {
        margin: 20rpx;
        .inv-h-w {
            background-color: #ffffff;
            height: 68rpx;
            display: flex;
            box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.15);
            border-radius: 7rpx;
            .inv-h {
                font-size: 30rpx;
                flex: 1;
                text-align: center;
                color: #c9c9c9;
                height: 68rpx;
                line-height: 68rpx;
                margin: 0 110rpx;
            }
            .inv-h-se {
                font-size: 28rpx;
                font-weight: bold;
                color: #ff8421;
                border-bottom: 4rpx solid #ff8421;
            }
        }
        .list-wrap {
            background: #fafafa;
            padding-top: 20rpx;
        }
        .list {
            width: 100%;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
        }
        .detail-top {
            border-bottom: 1px solid #f2f2f2;
            padding: 20rpx;
            .img-wrap {
                width: 90rpx;
                height: 90rpx;
                border-radius: 50%;
            }
            .info-wrap {
                margin-left: 20rpx;
            }
            .info-name {
                font-size: 30rpx;
                color: #333333;
                font-weight: 600;
                line-height: 50rpx;
            }
            van-button {
                margin-right: 10rpx;
            }
        }
        .company-wrap {
            line-height: 74rpx;
            padding: 0 20rpx;
            .address-icon {
                width: 28rpx;
                height: 33rpx;
                display: inline-block;
                vertical-align: middle;
            }
            .adress-name {
                color: #808080;
                font-size: 24rpx;
                margin-left: 10rpx;
                display: inline-block;
                vertical-align: middle;
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .footer {
        width: 100%;
        /* height: 50rpx; */
        position: fixed;
        left: 0;
        bottom: 0;
        .day {
            width: 35%;
            height: 100rpx;
            background-color: #ffffff;
            text-align: center;
            line-height: 34rpx;
            .day-text {
                color: #999999;
                font-size: 22rpx;
            }
            .day-img {
                padding-top: 20rpx;

                .dayimg {
                    width: 29rpx;
                    height: 28rpx;
                }
            }
        }
        .join {
            width: 65%;
            height: 100rpx;
            background-color: #ff9014;
            position: absolute;
            bottom: 0;
            right: 0;
            text-align: center;
            line-height: 100rpx;
            color: #ffffff;
            font-weight: 700;
        }
    }
}
</style>
