<template>
    <view class="hr">
        <!-- 头部 -->
           <view class="top">
               <text class="top-title">新华社集团</text>
               <text class="top-detail">秦小姐-招聘专员 | 武汉</text>
               <image class="top-img" src="../../../static/icon/562.png"></image>
           </view>
          <!-- 头部 -->
          <!-- 切换tab -->
        <view>
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">在招职位</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">公司介绍</view>
            </view>
            <view class="" v-show="Inv == 0">
                <navigator v-for="(work, index) in jobList" :key="index"
                >
                    <view class="jobDetail">
                        <checkbox class="_checkbox M0f981aea round orange checked btn" value="C"></checkbox>
                        <view class="jobtitle">{{ work.gwmc }}</view>
                        <view class="jobNum">{{ work.gwyx }}</view>
                        <view class="jobcontent">{{ work.sbcs }}&nbsp;|&nbsp;{{ work.sbxq }}&nbsp;|&nbsp;{{ work.jyyq }}&nbsp;|&nbsp;{{ work.xlyq }}</view>
                        <uni-button data-v-163aca3f="" class="cu-btn" v-for="(item, i) in work.fllist" :key="i">{{ item.name }}</uni-button>
                        <view class="jobday">{{ work.sxsj }}</view>
                        <image class="joblogo" src="../../../static/icon/jkdsj.png"></image>
                    </view>
                </navigator>
            </view>
            <view class="" v-show="Inv == 1">
                <view class="companyDtail">
                    <view class="companytitle">公司介绍</view>
                    <view class="companymian">{{ job.dwjs }}</view>
                    <image
                        class="companyimg"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573028705329&di=e55d8cf80b772cdf93ac5ecfda9ba77c&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131016%2F13429999_154522257132_2.jpg"
                        alt=""
                    ></image>
                    <view class="companyAddr">公司地址</view>
                    <view class="companyAddrMian">{{ job.dwszsf }}{{ job.dwszcs }}{{ job.dwszxq }}{{ job.dwszxxdz }}</view>
                    <view class="map">
                        <view class="page-body">
                            <view class="page-section page-section-gap">
                                <map style="width: 100%; height: 150px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
                            </view>
                        </view>
                    </view>
                    <view class="information">工商信息</view>
                    <view class="informationDetail">公司全称</view>
                    <view class="informationDetail">注册资本</view>
                    <view class="informationDetail">成立时间</view>
                    <view class="informationDetail">法定代表</view>
                </view>
            </view>
        </view>
        <!-- 切换tab -->
        <!-- 底部 -->
        <view class="footer">
            <view class="footerday"><image class="dayimg" src="../../../static/icon/sdff.png"></image></view>
            <view class="footerjoin">立刻投递</view>
        </view>
          <!-- 底部 -->
    </view>
</template>
<script>
export default {
    data() {
        return {
            bsid:'',
            job: {
                dwmc: '',
                dwclsj: '',
                dwxz: '',
                dwsshy: '',
                dwszcs: '',
                dwgm: '',
                dwszsf: '',
                dwszxq: '',
                dwszxxdz: '',
                dwjs: '',
                lglj: ''
            },
            jobList: [],
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
            Inv: 0,
            current: 0
        };
    },
    onLoad(options) {
        console.log(options);
        this.bsid = options.bsid;
    },
    mounted() {
        this.companyDtail(this.bsid);
    },
    methods: {
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
        companyDtail(bsid) {
            this.$http({
                url: "/api/bst/qydwjbxx/info/1",
                method: 'POST',
                success: data => {
                    console.log(data);
                    if (data.data && data.data.code === 0) {
                        this.job.dwmc = data.data.dwxxxqQzVO.dwmc;
                        this.job.dwclsj = data.data.dwxxxqQzVO.dwclsj;
                        this.job.dwxz = data.data.dwxxxqQzVO.dwxz;
                        this.job.dwsshy = data.data.dwxxxqQzVO.dwsshy;
                        this.job.dwszcs = data.data.dwxxxqQzVO.dwszcs;
                        this.job.dwgm = data.data.dwxxxqQzVO.dwgm;
                        this.job.dwszsf = data.data.dwxxxqQzVO.dwszsf;
                        this.job.dwszxq = data.data.dwxxxqQzVO.dwszxq;
                        this.job.dwszxxdz = data.data.dwxxxqQzVO.dwszxxdz;
                        this.job.dwjs = data.data.dwxxxqQzVO.dwjs;
                        this.job.lglj = data.data.dwxxxqQzVO.lglj;
                        this.jobList = data.data.dwxxxqQzVO.gwlist;
                    }
                }
            });
        }
    }
};
</script>


<style scoped>
    .hr{
        padding-bottom: 130rpx;
    }
    .top{
        position: relative;
        background-color: #FFFFFF;
        box-sizing: border-box;
        padding: 20rpx;
        height: 180rpx;
       /* border-bottom: 1rpx solid #F2F2F2; */
    }
    .top-title{
        color:#333333;
        font-size:35rpx;
        font-weight:bold;
        line-height:107rpx;
        margin-left: 15rpx;
    }
.top-detail{
    color:#999999;
    font-weight: 400;
    /* line-height: 63rpx; */
    font-size:22rpx;
    position: absolute;
    top:107rpx;
    left:35rpx;
    padding-bottom: 60rpx;
}
.top-img{
    width: 126rpx;
    height: 126rpx;
    position: absolute;
    right: 32rpx;
    top:30rpx;
}
.inv-h-w {
    background-color: #ffffff;
    height: 70rpx;
    display: flex;
    border-top: #f0f0f0 1rpx solid;
}

.inv-h {
    font-size: 30rpx;
    flex: 1;
    text-align: center;
    color: #c9c9c9;
    height: 70rpx;
    line-height: 70rpx;
    font-weight: bold;
}

.inv-h-se {
    color: #ff8520;
    border-bottom: 4rpx solid #ff9014;
    /* width: 20% !important; */
}

page {
    background-color: #f2f2f2;
}

.jobDetail {
    /* width: 100%; */
    /* height: 170rpx; */
    background-color: #fff;
    box-shadow: 0 0 5rpx #ccc;
    margin: 20rpx;
    border-radius: 12rpx;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 25rpx;
}

.jobtitle {
    font-size: 30rpx;
    font-weight: bold;
    margin-left: 54rpx;
    color:#333333;
}

.jobNum {
    position: absolute;
    top: 31rpx;
    /* left: 600rpx; */
    right: 0;
    margin-right: 20rpx;
    color: #ff8522;
    font-weight: 700;
    font-size: 30rpx;
}

.jobcontent {
    margin-left: 54rpx;
    color: #999999;
    font-size: 20rpx;
    margin-top: 10rpx;
    /* letter-spacing: 1rpx;s */
}

.cu-btn {
    left: 54rpx;
    top: 20rpx;
    height: 40rpx;
    font-size: 22rpx;
    margin-bottom: 20rpx;
    margin-right: 10rpx;
    color: #999999;
    /* border-radius: 62rpx; */
    box-sizing: border-box;
    padding: 0 5px;
}

.jobday {
    font-size: 20rpx;
    color: #999999;
    position: absolute;
    top: 84rpx;
    /* left: 618rpx; */
    right: 0;
    margin-right: 20rpx;
}

.joblogo {
    width: 100rpx;
    height: 46rpx;
    position: absolute;
    top: 127rpx;
    left: 604rpx;
}

.footer {
    width: 100%;
    /* height: 50rpx; */
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

.companyDtail {
    background-color: #fff;
    box-shadow: 0 0 5rpx #ccc;
    margin: 20rpx;
    border-radius: 12rpx;
    box-sizing: border-box;
    padding: 25rpx;
}

.companytitle {
    text-align: center;
    font-size: 30rpx;
    font-weight: 700;
    /* margin-top: 10rpx; */
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

.btn {
    position: absolute !important;
    top: 77rpx !important;
}
</style>
