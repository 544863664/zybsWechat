<template>
    <view class="send">
        <!-- 选项卡 -->
        <view>
            <view class="inv-h-w">
                <view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" @click="Inv = 0">全部</view>
                <view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" @click="Inv = 1">被查看</view>
                <view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" @click="Inv = 2">不合适</view>
            </view>
            <view class="" v-show="Inv == 0">
                <!-- 投递岗位 -->
                <view class="job " v-for="(item, i) in 3" :key="i">
                    <van-swipe-cell >
                        <van-cell-group>
                                <view class="job-box">
                                    <view class="jobtitle">软件开发工程师</view>
                                    <view class="date">2018-12月29号</view>
                                    <view class="jobNum">10-24k</view>
                                    <view class="check">简历被查看8次</view>
                                    <view class="company-box">
                                        <image class="company-icon" src="../../../static/icon/company-icon.png"></image>
                                        <view class="company-name">武汉|武汉中科通达科学技术有限公司</view>
                                    </view>
                                </view>

                        </van-cell-group>
                        <view class="van-swipe-cell__right" @click="del"><view slot="right">删除</view></view>
                    </van-swipe-cell>
                </view>
                <!-- 投递岗位 -->
            </view>
            <view class="" v-show="Inv == 1">
                <view class="job" v-for="(item, i) in 3" :key="i">
                    <view class="jobtitle">硬件工程师</view>
                    <view class="date">2018-12月29号</view>
                    <view class="jobNum">12-20k • 13薪</view>
                    <view class="check">简历被查看18次</view>
                    <view class="company-box">
                        <image class="company-icon" src="../../../static/icon/company-icon.png"></image>
                        <view class="company-name">武汉|武汉中软国际</view>
                    </view>
                </view>
            </view>
            <view class="" v-show="Inv == 2">
                <view class="job" v-for="(item, i) in 3" :key="i">
                    <view class="jobtitle">JAVA工程师</view>
                    <view class="date">2018-12月29号</view>
                    <view class="jobNum">10-24k</view>
                    <view class="check">简历被查看86次</view>
                    <view class="company-box">
                        <image class="company-icon" src="../../../static/icon/company-icon.png"></image>
                        <view class="company-name">武汉|武汉Z展图科技</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 选项卡 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            Inv: 0
        };
    },

    methods: {
        changeTab(Inv) {
            that.navIdx = Inv;
        },
        del(){
            alert(1111)
        }
    }
};
</script>

<style scoped>
.inv-h-w {
    background-color: #ffffff;
    height: 100upx;
    display: flex;
    background-image: linear-gradient(to right, #ff9b3a, #ff704a);
}
.inv-h {
    font-size: 30upx;
    flex: 1;
    text-align: center;
    color: #ffdd9a;
    height: 100upx;
    line-height: 100upx;
    font-weight: 600;
}
.inv-h-se {
    color: #fff;
    border-bottom: 4upx solid #fff;
}
page {
    background-color: #f2f2f2;
}
.job {
    position: relative;
    box-shadow: 0 0 5upx #ccc;
    margin: 20rpx;
    border-radius: 12upx;
    background-color: #fff;
   box-sizing: border-box;
    padding: 20rpx;
}
/* .job-box {
    margin-left: 55rpx;
} */
.jobtitle {
    font-weight: 700;
    font-size: 30rpx;
}
.jobNum {
    font-size: 30rpx;
    color: #ff8421;
    font-weight: 700;
    margin-top: 10rpx;
}
.company-box {
    height: 34upx;
    line-height: 34upx;
    margin-top: 10rpx;
}
.company-box .company-icon {
    display: inline-block;
    vertical-align: middle;
    width: 34upx;
    height: 100%;
}
.company-box .company-name {
    display: inline-block;
    vertical-align: middle;
    margin-left: 16upx;
    font-size: 26upx;
    color: #808080;
}
.date {
    font-size: 20upx;
    color: #b2b2b2;
    position: absolute;
    top: 25rpx;
    right: 20rpx;
}
.check {
    font-size: 20upx;
    color: #b2b2b2;
    position: absolute;
    top: 96rpx;
    right: 20rpx;
}

.van-swipe-cell__right {
    display: inline-block;
    width: 100rpx;
    font-size: 30rpx;
    line-height: 124rpx;
    color: #fff;
    text-align: center;
    background-color: #FF704A;
    position: absolute;
    top: 0;
    border-radius: 10rpx;
    height: 124rpx;
    right: -130rpx;
}
</style>
