<template>
    <view class="mian">
        <!-- 轮播图 -->
        <view class="swiper">
            <uni-swiper-dot :info="info" :current="current" field="text" :mode="mode">
                <swiper class="swiper-box" @change="change" :autoplay="autoplay" :acceleration="acceleration" :circular="circular">
                    <swiper-item v-for="(item, index) in info" :key="index">
                        <image :src="item.content" mode=""></image>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
        </view>
        <!-- 轮播图 -->
        <!--详细信息 -->
        <view class="head">
            <view class="head-text">
                <view class="text-title">
                    <view class="title-detail">{{job.dwmc}}</view>
                    <image class="text-btn" src="../../../static/icon/jkdsj.png" @click="collect"></image>
                </view>
                <view class="text-local">{{cityList[cityDetail][job.dwszcs]}} | {{jobList['m_dwxzdm'][job.dwxz]}} | {{jobList['m_dwsshydm'][job.sshy]}} | {{job.dwclsj.substring(0,4)}}年注册</view>
                <view class="text-num">{{jobList['m_dwgmdm'][job.dwgm]}}</view>
            </view>
            <view class="head-img"><image class="headimg" :src="(job.lglj)"></image></view>
        </view>
        <!-- 详细信息 -->
        <!-- 切换tab -->
        <view class="tab-box">
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">在招职位</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">公司介绍</view>
            </view>
            <view class="" v-show="Inv == 0">
                <view class="list" v-for="(work, index) in jobsol" :key="index">
                    <view class="check-box"><checkbox class="_checkbox M0f981aea round orange checked" value="C"></checkbox></view>
                    <view class="list-detail">
                        <view class="detail-title">{{work.gwmc}}</view>
                        <view class="detail-local">{{cityList[cityDetail][work.sbcs]}} | {{townList[work.sbxq]}} | {{jobList['m_jyyqdm'][work.jyyq]}} | {{jobList['m_xldm'][work.xlyq]}}</view>
                        <uni-button data-v-163aca3f="" class="cu-btn"  v-for="(item, i) in work.fllist" :key="i">{{jobList['m_gwfldm'][item.dm]}}</uni-button>
                   <!--   <uni-button data-v-163aca3f="" class="cu-btn">年底双薪</uni-button>
                        <uni-button data-v-163aca3f="" class="cu-btn">定期团建</uni-button>
                       -->
                    </view>
                    <view class="list-box">
                        <view class="box-num"> {{jobList['m_xzdydm'][work.gwyx]}}</view>
                        <view class="box-day">{{work.sxsj.substring(5,7)}}月{{work.sxsj.substring(8,10)}}日</view>
                        <view class="box-img"><image class="boximg" src="../../../static/icon/jkdsj.png"></image></view>
                    </view>
                </view>
            </view>
            <view class="" v-show="Inv == 1">
                <view class="companyDtail">
                    <view class="companytitle">公司介绍</view>
                    <view class="companymian">
                       {{job.dwjs}}
                    </view>
                    <image
                        class="companyimg"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028705329&di=e55d8cf80b772cdf93ac5ecfda9ba77c&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131016%2F13429999_154522257132_2.jpg"
                        alt=""
                    ></image>
                    <view class="companyAddr">公司地址</view>
                    <view class="companyAddrMian">{{job.dwszxxdz}}</view>
                    <view class="map">
                        <view class="page-body">
                            <view class="page-section page-section-gap">
                                <map style="width: 100%; height: 150px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
                            </view>
                        </view>
                    </view>
                    <view class="information">工商信息</view>
                    <view class="informationDetail">公司全称:{{job.dwmc}}</view>
                    <view class="informationDetail">成立时间:{{job.dwclsj.substring(0,11)}}</view>

                </view>
            </view>
        </view>
        <!-- 切换tab -->
        <!-- 底部 -->
        <view class="footer">
            <view class="footerday"><image class="dayimg" src="../../../static/icon/sdff.png"></image></view>
            <view class="footerjoin" @click="send">立刻投递</view>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import { uniSwiperDot } from '../../../components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
    data() {
        return {
            autoplay: false,
            acceleration: true,
            circular: true,
            info: [
                {
                    text: '',
                    content:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028641352&di=64cd460fe8364fac6b7d60b307569370&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F01%2F37%2F93536fb30402a62e8ef9a334c1d1f69c.jpg'
                },
                {
                    text: '',
                    content:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028760372&di=9aaf088b6d268d467f8974d74f2ce353&imgtype=0&src=http%3A%2F%2Fpic118.nipic.com%2Ffile%2F20161226%2F12039359_110619518000_2.jpg'
                },
                {
                    text: '',
                    content:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028641352&di=64cd460fe8364fac6b7d60b307569370&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F01%2F37%2F93536fb30402a62e8ef9a334c1d1f69c.jpg'
                }
            ],
            current: 0,
            mode: 'nav', //提示小点的样式
            bsid: '',
            hxid:'',
            text: '1',
            job: {
                dwmc: '', //单位名称
                dwclsj: '',//成立时间
                dwxz: '', //单位性质
                sshy: '',//所属行业
                dwszcs: '',//单位所在城市
                dwgm: '', //单位规模
                dwszxq: '', //单位所在县
                dwszxxdz: '',//公司详细地址
                dwjs: '', //单位介绍
                lglj: '' //图片地址
            },
            cityList:[], //城市码表
            jobList: [], //码表全部
            cityDetail:[],//省份码表
            townList:[], //区县码表
            jobsol:[], //职位列表
            cityDetailtwo:[],
            pid: '',
            title: 'map',
            latitude: 30.499651944,
            longitude: 114.3843903162,
            covers: [
                {
                    latitude: 30.499651944,
                    longitude: 114.3843903162,
                    iconPath: '../../../static/icon/dw.png'
                },
                {
                    latitude: 30.499651944,
                    longitude: 114.3843903162,
                    iconPath: '../../../static/icon/dw.png'
                }
            ],
            background: ['color1', 'color2', 'color3'],
            Inv: 0,
            dwid:"", //单位id
        };
    },
    onLoad(options) {
        console.log(options);
        this.bsid = options.bsid;
    },
    mounted() {
        	this.city();   /* 地址码表(城市) */
        	this.jobDetail();   /* 码表数据 */
            // this.town(); //区县码表
            this.companyDtail();
            this.companyDtailtwo();
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    methods: {
        change(e) {
            this.current = e.detail.current;
        },
        changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots;
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay;
        },
        intervalChange(e) {
            this.interval = e.target.value;
        },
        durationChange(e) {
            this.duration = e.target.value;
        },
        changeTab(Inv) {
            that.navIdx = Inv;
        },
        send(){
           uni.navigateTo({
               url:"/pages/qiuZhi/gangWei/sendResume"
           })
        },
        companyDtail() {
            this.$http({
                url: `/hr/bskhgl/findDwInfo/${this.bsid}?sfxstd=2`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data && data.data.code === 0) {
                        this.job.dwmc = data.data.dwxxxqQzVO.dwmc;
                        this.job.dwclsj = data.data.dwxxxqQzVO.dwclsj;
                        this.job.dwxz = data.data.dwxxxqQzVO.dwxz;
                        this.job.sshy = data.data.dwxxxqQzVO.sshy;
                        this.job.dwszcs = data.data.dwxxxqQzVO.dwszcs;
                        this.job.dwgm = data.data.dwxxxqQzVO.dwgm;
                        this.job.dwszxq = data.data.dwxxxqQzVO.dwszxq;
                        this.job.dwszxxdz = data.data.dwxxxqQzVO.dwszxxdz;
                        this.job.dwjs = data.data.dwxxxqQzVO.dwjs;
                        this.job.lglj = data.data.dwxxxqQzVO.lglj;
                        // console.log(this.job.lglj)
                        this.jobsol = data.data.dwxxxqQzVO.gwlist;
                        this.jobsol.forEach((item,i)=>{
                            this.pid = item.sbcs
                            // console.log("pid1",this.pid)
                        })
                        this.town();
                        this.cityDetail= data.data.dwxxxqQzVO.dwszsf;
                    }
                }
            });
        },
        companyDtailtwo() {
            this.$http({
                url: `/hr/bskhgl/findDwInfo/${this.bsid}?sfxstd=1`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data && data.data.code === 0) {
                        this.job.dwmc = data.data.dwxxxqQzVO.dwmc;
                        this.job.dwclsj = data.data.dwxxxqQzVO.dwclsj;
                        this.job.dwxz = data.data.dwxxxqQzVO.dwxz;
                        this.job.sshy = data.data.dwxxxqQzVO.sshy;
                        this.job.dwszcs = data.data.dwxxxqQzVO.dwszcs;
                        this.job.dwgm = data.data.dwxxxqQzVO.dwgm;
                        this.job.dwszxq = data.data.dwxxxqQzVO.dwszxq;
                        this.job.dwszxxdz = data.data.dwxxxqQzVO.dwszxxdz;
                        this.job.dwjs = data.data.dwxxxqQzVO.dwjs;
                        this.job.lglj = data.data.dwxxxqQzVO.lglj;
                        this.dwid = data.data.dwxxxqQzVO.dwid
                        // console.log(this.job.lglj)
                        this.jobsol = data.data.dwxxxqQzVO.gwlist;
                        this.jobsol.forEach((item,i)=>{
                            this.pid = item.sbcs
                            // console.log("pid1",this.pid)
                        })
                        this.town();
                        this.cityDetail= data.data.dwxxxqQzVO.dwszsf;
                    }
                }
            });
        },
        //收藏公司
        collect(){
            this.$http({
                url: `/qz/qzgssc/sc/${this.dwid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                data:{
                  dwid:this.dwid  
                },
                success: data => {
                    console.log("collect",data);
                    if (data.data.code === 0) {

                    }
                }
            });
        },
        //城市码表
        city() {
            this.$http({
                url: '/hr/dm/findSsMap',
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    // console.log("city",data);
                    if (data.data.code === 0) {
                        this.cityList = data.data.ssMap;
                    }
                }
            });
        },
        //区县码表
        town() {
             // console.log("pid2",this.pid)
            this.$http({
                url: `/hr/dm/findSqMap?pid=${this.pid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    // console.log("town",data);
                    if (data.data.code === 0) {
                        this.townList = data.data.sqMap;
                        // console.log("'!!!!!!",this.industryList);
                    }
                }
            });
        },
        //所有码表
        jobDetail() {
            this.$http({
                url: '/hr/dm/findDmMap',
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    // console.log(data);
                    if (data.data.code === 0) {
                        this.jobList = data.data.dmMap;
                        // console.log("xxxxxxxxxxx",this.jobList);
                    }
                }
            });
        },

    },

    components: { uniSwiperDot }
};
</script>

<style lang="scss" scoped>
.mian {
    padding-bottom: 165rpx;
    .head {
        height: 210rpx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1rpx solid #f2f2f2;
        padding: 40rpx 13rpx 0 20rpx;
        .head-text {
            .text-title {
                display: flex;
                justify-content: space-between;
                .title-detail {
                    font-size: 36rpx;
                    color: #333333;
                    font-weight: bold;
                }
                .text-btn {
                    width: 110rpx;
                    height: 50rpx;
                    // margin-right: 75px;
                    margin-top: 5rpx;
                }
            }
            .text-local {
                color: #999999;
                font-size: 24rpx;
                margin-top: 12rpx;
            }
            .text-num {
                color: #999999;
                font-size: 24rpx;
                margin-top: 10rpx;
            }
        }
        .head-img {
            .headimg {
                width: 125rpx;
                height: 125rpx;
            }
        }
    }
    .tab-box {
        padding-bottom: 100rpx;
        .list {
            // height: 174rpx;
            box-shadow: 0 0 10rpx #e9e9e9;
            border-radius: 12rpx;
            margin: 20rpx;
            padding: 20rpx;
            background: #ffffff;
            margin-bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            .check-box {
                justify: center;
                align-items: center;
                display: flex;
            }
            .list-detail {
                width: 70%;
                margin-left: -40rpx;

                .detail-title {
                    color: #333333;
                    font-size: 30rpx;
                    font-weight: bold;
                }
                .detail-local {
                    color: #b3b3b3;
                    font-size: 20rpx;
                    margin-top: 15rpx;
                }
                .cu-btn {
                    // width: 124rpx;
                    height: 33rpx;
                    margin: 15rpx 15rpx 0 -5rpx;
                    font-size: 22rpx;
                    color: #999999;
                    border-radius: 17rpx;
                }
            }
            .list-box {
                .box-num {
                    color: #ff8421;
                    font-size: 29rpx;
                    font-weight: bold;
                    margin-top: 5rpx;
                }
                .box-day {
                    color: #b3b3b3;
                    font-size: 20rpx;
                    margin: 15rpx 0 0 20rpx;
                }
                .box-img {
                    .boximg {
                        width: 100rpx;
                        height: 48rpx;
                        margin-top: 13rpx;
                    }
                }
            }
        }

        .companyDtail {
            background-color: #fff;
            box-shadow: 0 0 5rpx #ccc;
            border-radius: 12rpx;
            box-sizing: border-box;
            padding: 25rpx;
            margin: 20rpx;
            .companytitle {
                text-align: center;
                font-size: 30rpx;
                font-weight: 700;
            }
            .companymian {
                font-size: 24rpx;
                color: #999999;
                line-height: 38rpx;
                letter-spacing: 2rpx;
                text-indent: 30rpx;
            }
            .companyimg {
                width: 100%;
                height: 350rpx;
            }
            .companyAddr {
                text-align: center;
                font-size: 30rpx;
                font-weight: 700;
                margin-top: 10rpx;
            }

            .companyAddrMian {
                margin-top: 10rpx;
                margin-bottom: 10rpx;
                font-size: 23rpx;
                color: #999999;
                text-indent: 30rpx;
            }
            .information {
                text-align: center;
                font-size: 30rpx;
                font-weight: 700;
                margin-top: 10rpx;
            }

            .informationDetail {
                font-size: 26rpx;
                color: #999999;
            }
        }
    }
}

.swiper {
    width: 100%;
    height: 400rpx;
    .swiper-box {
        width: 100%;
        height: 400rpx;
        image {
            width: 100%;
        }
    }
}

.sw-img {
    width: 100%;
    height: 100%;
}

.inv-h-w {
    background-color: #ffffff;
    height: 100rpx;
    display: flex;
}
.inv-h {
    font-size: 30rpx;
    flex: 1;
    text-align: center;
    color: #c9c9c9;
    height: 100rpx;
    line-height: 100rpx;
    margin: 0 120rpx;
}
.inv-h-se {
    font-size: 28rpx;
    font-weight: bold;
    color: #ff8421;
    border-bottom: 4rpx solid #ff8421;
}

.footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
}

.footerday {
    width: 35%;
    height: 100rpx;
    background-color: #ffffff;
}

.dayimg {
    position: absolute;
    width: 90rpx;
    height: 60rpx;
    top: 25rpx;
    left: 80rpx;
}

.footerjoin {
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
</style>
