<template>
    <view class="join">
        <image src="../../../static/icon/hxxx.png" class="titleimg"></image>
        <image src="../../../static/icon/school.png" class="schoolLocal"></image>
        <view class="title">
            <text class="titlelocal">
                {{list.hymc}}
                <text class="city">-{{cityList[cityDetail][list.hycs]}}</text>
            </text>
        </view>

        <!-- 时间地点详情 -->
        <view class="content">
            <view class="num">共有{{list.companycount}}家企业参会 提供{{list.jobcount}}个职位</view>
            <view class="time">
                <view class="timetitle">签到时间</view>
                <image class="icontime" src="../../../static/icon/sign-icon.png"></image>
                <view class="timedetail">{{list.hykssj.substring(0,16)}}至{{list.hyjssj.substring(0,16)}}</view>
            </view>
            <view class="local">
                <view class="localtitle">签到地点</view>
                <image class="iconlocal" src="../../../static/icon/adress.png"></image>
                <view class="localdetail">{{list.hydd}}</view>
            </view>
        </view>
        <!-- 地点时间详情 -->
        <view class="state">
            <view class="head">
                <text>附件简历审核状态：</text>
                <text class="pass">通过</text>
            </view>
            <view class="middle">
                <texe>
                    以下会议二维码有效期是
                    <text class="middle-time">2019年12月23日</text>
                    ，请及时入场参会；可以保存为图片进行分享，邀请更多的同学参加，每个人的邀约码是一个独立不重复的，便于推广。
                </texe>
            </view>
            <view class="send-box"></view>
        </view>
        <text class="instructions">

                                       说明：
           附件简历上传后，系统管理员进行审核，审核完成后，系统会显示该会议已报名，会议开始可以在“我的参会”进行签到。
           如果是博士、以及博士后，上传附件简历审核通过后，可以凭该二维码到现场承办会议单位处领取相应的补贴奖励。

        </text>
        <view class="footer">
            <text class="use">使用附件简历</text>
            <text class="usenew">使用电子简历</text>
        </view>
    </view>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            bsid:1,
            list:{
                hymc:"", //会议名称
                hykssj:"", //会议开始时间
                hyjssj:"", //会议结束时间
                hydd:"", //会议地点
                hycs:"", //会议城市
                companycount:"",//企业数量
                jobcount:'', //职位数量
                },
            cityDetail:[], //省份码表
            jobList:[], //码表所有
            cityList:[],//码表城市
        };
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    onLoad(options) {
        console.log(options);
        this.bsid = options.bsid;
    },
    mounted(){
           this.joinDetail(this.bsid)
           this.jobDetail() //所有码表
           this.city() //城市码表
    },
    methods:{
      joinDetail(bsid){
          this.$http({
              url: `/hr/bshxxx/findHxInfo/${bsid}`,
              method: 'POST',
              header: {
                  token: this.token
              },
              success: data => {
                  console.log(data);
                  if (data.data.code === 0) {
                     this.list.hymc = data.data.bsHxxx.hymc;
                     this.cityDetail = data.data.bsHxxx.hysf;
                     this.list.hycs = data.data.bsHxxx.hycs;
                     this.list.companycount = data.data.companycount;
                     this.list.jobcount = data.data.jobcount;
                     this.list.hykssj = data.data.bsHxxx.hykssj;
                     this.list.hyjssj = data.data.bsHxxx.hyjssj;
                     this.list.hydd = data.data.bsHxxx.hydd;
                  }

              }
          });
      },
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
      }
    }
};
</script>

<style scoped>
.join {
    position: relative;
    height: 100%;
    /* padding-bottom: 200rpx; */
}
.titleimg {
    width: 100%;
    height: 150rpx;
}

.schoolLocal {
    position: absolute;
    top: 65rpx;
    left: 300rpx;
    width: 150rpx;
    height: 150rpx;
}

.title {
    width: 672rpx;
    height: 85rpx;
    position: absolute;
    text-align: center;
    font-weight: bold;
    top: 230rpx;
    font-size: 36rpx;
    margin-left: 40rpx;
}
.titlelocal {
    color: #333333;
}
.city {
    color: #ff8421;
}
.content {
    background-color: #fff;
    box-shadow: 0 0 5rpx #ccc;
    margin: 20rpx;
    border-radius: 12rpx;
    position: relative;
    top: 180rpx;
    overflow: hidden;
}

.num {
    border-bottom: 2rpx solid #f0f0f0;
    font-size: 24rpx;
    margin-left: 10rpx;
    font-weight: bold;
    padding: 20rpx;
}

.icontime {
    width: 23rpx;
    height: 23rpx;
    position: absolute;
    top: 111rpx;
    left: 35rpx;
}

.time {
    border-bottom: 2rpx solid #f0f0f0;
    padding: 20rpx;
}

.timetitle {
    color: #ff8522;
    font-size: 24rpx;
    font-weight: bold;
    margin-left: 45rpx;
    margin-top: 10rpx;
}

.timedetail {
    color: #999999;
    font-size: 24rpx;
    margin-left: 13rpx;
    margin-top: 18rpx;
}

.local {
    padding: 20rpx;
}

.localtitle {
    color: #ff8522;
    font-size: 24rpx;
    font-weight: bold;
    margin-left: 45rpx;
    margin-top: 10rpx;
}

.localdetail {
    color: #999999;
    font-size: 24rpx;
    margin-left: 13rpx;
    margin-top: 18rpx;
}

.iconlocal {
    width: 21rpx;
    height: 24rpx;
    position: absolute;
    top: 245rpx;
    left: 35rpx;
}
.state {
    background-color: #fff;
    box-shadow: 0 0 5rpx #ccc;
    margin: 20rpx;
    border-radius: 12rpx;
    position: absolute;
    top: 698rpx;
    box-sizing: border-box;
    padding: 20rpx;
    width: 708rpx;
    height: 591rpx;
}
.head {
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
    line-height: 68rpx;
    border-bottom: 1rpx solid #f2f2f2;
}
.pass {
    color: #ff8421;
}
.middle {
    /* width:665px;
    height:104px; */
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    margin-top:20rpx;
}
.middle-time {
    color: #ff4c4c;
}
.send-box {
    width: 294rpx;
    height: 294rpx;
    background: #cccccc;
    border-radius: 7rpx;
    margin: 34rpx 0 0 184rpx;
}
.instructions {
    width: 665rpx;
    height: 163rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    line-height: 35rpx;
    margin: 31rpx 0 200rpx 43rpx;
    position: absolute;
    top:1310rpx;
}
.footer{
    position: fixed;
    left:0;
    bottom: 0;
    width: 100%;
    height:103rpx;
    background-color: #FFFFFF;
    box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
    line-height: 103rpx;
    text-align: center;
    color:#FF8421;
    font-size:30rpx;
    font-weight: bold;
}
.use{
    width: 50%;
    height: 103rpx;
    position: absolute;
    bottom: 0;
    left:0;
}
.usenew{
    height: 103rpx;
     width: 50%;
     position: absolute;
     bottom: 0;
     right:0;
}
.use:hover{
    color:#FFFFFF;
    background-color:#FF8421;
    }
.usenew:hover{
    color:#FFFFFF;
    background-color:#FF8421;
    }

</style>
