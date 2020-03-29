<template>
    <view class="hr">
        <view class="head">
            <view class="head-text">
                <view class="head-title">{{job.dwmc}}</view>
                <view class="head-name">{{job.xm}}-{{job.zw}} | {{cityList[cityDetail][job.dwszcs]}}</view>
            </view>
            <view class="head-img"><image class="img" src="../../../static/icon/562.png"></image></view>
        </view>
        <!-- tab切换 -->
        <view class="tab-box">
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">发布职位</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">公司介绍</view>
            </view>
            <view class="" v-show="Inv == 0">
               <view class="list" v-for="(work, index) in hrList" :key="index">
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
                    <view class="companymian">{{job.dwjs}}</view>
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
        <!-- tab切换 -->
        <view class="footer">
            <view class="footerday"><image class="dayimg" src="../../../static/icon/sdff.png"></image></view>
            <view class="footerjoin">立刻投递</view>
        </view>
    </view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import uniFab from '@/components/uni-fab/uni-fab.vue';
import { mapState, mapGetters } from 'vuex';
export default {
    components: {
        WucTab,
        uniFab
    },
    data() {
        return {
            Inv: 0,
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
            hrid:"",
            cityDetail:[],
            jobList:[], //所有码表
            cityList:[], //城市码表
            townList:[],//区县码表
            job:{
                dwmc:"",//单位名称
                xm:"",//姓名
                zw:"", //职位
                dwszcs:"",//单位所在城市
                dwjs:"", //单位介绍
                dwszxxdz:"", //单位地址
                dwclsj:"", //单位成立时间
                },
                  hrList:[],
        };
    },
    onLoad(options) {
        console.log(options);
        this.hrid = options.bsid;
    },
    mounted(){
      this.hrDetail()
      this.city();   /* 地址码表(城市) */
      this.jobDetail();   /* 码表数据 */
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    methods: {
        changeTab(Inv) {
            that.navIdx = Inv;
        },
        hrDetail(){
            this.$http({
                url: `/qz/qyckjljl/hrDetail/${this.hrid}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data && data.data.code === 0) {
                          this.job.dwmc = data.data.hrInfo.dwmc
                          this.job.xm = data.data.hrInfo.xm
                          this.job.zw = data.data.hrInfo.zw
                          this.job.dwszcs = data.data.hrInfo.dwszcs
                          this.cityDetail = data.data.hrInfo.dwszsf
                          this.job.dwjs = data.data.dwInfo.dwjs
                          this.job.dwszxxdz = data.data.dwInfo.dwszxxdz
                          this.job.dwclsj = data.data.dwInfo.dwclsj
                          this.hrList = data.data.dwInfo.gwlist
                          this.hrList.forEach((item,i)=>{
                              this.pid = item.sbcs
                              // console.log("pid1",this.pid)
                          })
                          this.town();
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
    }
};
</script>

<style lang="scss" scoped>
.hr {
    height: 100%;

    .head {
        display: flex;
        justify-content: space-between;
        height: 186rpx;
        border-bottom: 1rpx solid #f2f2f2;
        padding: 52rpx 32rpx 54rpx 35rpx;
        background-color: #ffffff;
        .head-text {
            .head-title {
                color: #333333;
                font-size: 34rpx;
                font-weight: bold;
            }
            .head-name {
                color: #999999;
                font-size: 22rpx;
                margin-top: 20rpx;
            }
        }
        .head-img {
            margin-top: -15rpx;
            .img {
                width: 126rpx;
                height: 126rpx;
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

</style>
