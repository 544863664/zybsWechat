<template>
    <view class="collect">
        <view class="most">最多30条收藏</view>
        <view class="list" v-for="(item, i) in collectList" :key="i">
            <navigator url="../pages/qiuZhi/gangWei/detail" class="jump">
                <view class="list-top">
                    <view class="title flex flex-wrap justify-between align-center">
                        <text class="job-title">{{item.gwmc}}</text>
                        <text class="wage"> {{jobList['m_xzdydm'][item.gwyx]}}</text>
                    </view>
                    <view class="limit">
                        <text>武昌区</text>
                        <text>武珞路</text>
                        <text>{{jobList['m_jyyqdm'][item.jyyq]}}</text>
                        <text>{{jobList['m_xldm'][item.xlyq]}}</text>
                    </view>
                    <view class="company-box">
                        <image class="company-icon middle" src="../../../static/icon/company-icon.png" mode=""></image>
                        <text class="company-name middle">{{item.dwmc}}</text>
                    </view>
                    <view class="press-btn flex flex-wrap justify-between align-center">
                        <view>
                            <van-button type="info" size="small">{{ cityList[cityDetail][item.dwszcs]}}</van-button>
                            <van-button type="info" size="small">{{jobList['m_dwxzdm'][item.dwxz]}}</van-button>
                            <van-button type="info" size="small">互联网金融</van-button>
                            <van-button type="info" size="small">{{ jobList['m_dwgmdm'][item.dwgm] }}</van-button>
                        </view>
                        <text class="date">{{item.sxsj.substring(5,7)}}月{{item.sxsj.substring(8,10)}}日</text>
                    </view>
                </view>
            </navigator>
            <view class="list-bot">
                <text class="switch switch-bor">投递简历</text>
                <text class="switch">取消收藏</text>
            </view>
        </view>
        <view class="loading">
            <text class="loading-text">{{ loadingType === 0 ? contentText.contentdown : loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore }}</text>
        </view>
    </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            currPage: '1', //当前页面
            limit: '5', //当前页面显示的数量
            totalCount: 0, //总数量
            totalPage: 0, //总页数
            collectList:[],
            cityList: [], //城市码表
            cityDetail: '', // 城市码表省
            jobList: [], //码表所有
            loadingType: 0,
            contentText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            }
        };
    },
    components: {},
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    mounted() {
        this.collect();
        this.jobDetail();
        this.city();
    },
    methods: {
        collect(){
            this.loadingType = 0;
            uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画
           this.$http({
               url: `/qz/qzgwsc/list/${this.currPage}/${this.limit}`,
               method: 'POST',
               header: {
                   token: this.token
               },
               success: data => {
                   console.log(data);
                   if (data.data.code === 0) {
                     this.collectList = data.data.page.list;
                     this.currPage = data.data.page.currPage; //当前页数
                     this.totalCount = data.data.page.totalCount; //总数量
                     this.totalPage = data.data.page.totalPage; //总页数
                     data.data.page.list.forEach((item, i) => {
                         this.cityDetail = item.dwszsf;
                     });
                     if (this.collectList.length == data.data.page.totalCount) {
                         this.loadingType = 2;
                         uni.hideNavigationBarLoading(); //关闭加载动画
                         return false;
                     }
                   }
               }
           });
        },
        //上拉加载
        onReachBottom() {
          setTimeout(()=>{
                this.getNewList();
            }, 1000);

        },
        getNewList() {
            let currPage = this.currPage + 1;
            if (currPage > this.totalPage) {
                return false;
            }
            if (this.loadingType != 0) {
                //loadingType!=0;直接返回
                return false;
            }
            this.loadingType = 1;
            uni.showNavigationBarLoading(); //显示加载动画
            this.$http({
                url: `/qz/qzgwsc/list/${currPage}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        this.collectList = this.collectList.concat(data.data.page.list); //将数据拼接在一起
                        console.log(this.cPage);
                        if (this.collectList.length == data.data.page.totalCount) {
                            this.loadingType = 2;
                            uni.hideNavigationBarLoading(); //关闭加载动画
                            return false;
                        }
                        this.loadingType = 0; //将loadingType归0重置
                        uni.hideNavigationBarLoading(); //关闭加载动画
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

<style lang="scss" scoped>
.collect {
    padding: 20rpx;
    .loading {
        text-align: center;
        margin-bottom: 20rpx;
        color: #cccccc;
    }
    .most {
        text-align: center;
        font-size: 24rpx;
        color: #808080;
        line-height: 40rpx;
        padding-bottom: 20rpx;
    }
}
.list {
    width: 100%;
    box-shadow: 0 0 10rpx #e9e9e9;
    border-radius: 12rpx;
    background: #ffffff;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #f2f2f2;
    .jump {
        padding: 20rpx;
        border-bottom: 1rpx solid #f2f2f2;
    }
    .list-top {
        .title {
            .job-title {
                font-weight: 600;
                color: #333333;
                font-size: 30rpx;
            }
            .wage {
                color: #ff8421;
                font-size: 28rpx;
                font-weight: 600;
            }
        }
        .limit {
            font-size: 20rpx;
            color: #b2b2b2;
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
        .company-box {
            height: 34rpx;
            line-height: 34rpx;
            .company-icon {
                width: 34rpx;
                height: 100%;
            }
            .company-name {
                margin-left: 16rpx;
                font-size: 26rpx;
                color: #808080;
            }
        }
        .press-btn {
            margin-top: 20rpx;
            van-button {
                margin-right: 10upx;
            }
            .date {
                font-size: 20rpx;
                color: #b2b2b2;
            }
        }
    }
    .list-bot {
        padding: 20rpx 0;
        .switch {
            display: inline-block;
            width: 50%;
            text-align: center;
            line-height: 50rpx;
            font-size: 30rpx;
            color: #b2b2b2;
            font-weight: 600;
        }
        .switch-bor {
            border-right: 1rpx solid #f2f2f2;
        }
    }
}
</style>
