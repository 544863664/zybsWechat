<template>
    <view class="attention">
        <view class="list" v-for="(item, i) in collectionList" :key="i">
            <view class="list-top">
                <image class="logo" src="../../../static/icon/company-big-icon.png" mode="aspectFit"></image>
                <view class="title">
                    <view class="name">{{ item.dwmc }}</view>
                    <view class="nature">
                        <van-button type="info" size="small">{{ cityList[cityDetail][item.dwszcs] }}</van-button>
                        <van-button type="info" size="small">{{ jobList['m_dwxzdm'][item.dwxz] }}</van-button>
                        <van-button type="info" size="small">{{ jobList['m_dwsshydm'][item.sshy] }}</van-button>
                        <van-button type="info" size="small">{{ item.dwclsj.substring(0, 4) }}年注册</van-button>
                    </view>
                </view>
                <text class="cancel-btn fr">取消关注</text>
            </view>
            <view class="company-wrap">
                <text class="adress-name">有新岗位发布</text>
                <text class="lg text-gray cuIcon-right fr"></text>
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
            cityList: [], //城市码表
            cityDetail: '', // 城市码表省
            jobList: [], //码表所有
            collectionList: [],
            loadingType: 0,
            contentText: {
                contentdown: '上拉显示更多',
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了'
            }
        };
    },
    computed: {
        ...mapGetters('loginState', {
            token: 'getToken'
        })
    },
    components: {},
    onload() {},
    mounted() {
        // _self = this;
        this.city();
        this.jobDetail();
        this.collection();
    },
    methods: {
      
        //加载收藏公司列表
        collection() {
            this.loadingType = 0;
            uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画
            this.$http({
                url: `/qz/qzgssc/list/${this.currPage}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.collectionList = data.data.page.list;
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        data.data.page.list.forEach((item, i) => {
                            this.cityDetail = item.dwszsf;
                        });
                        if (this.collectionList.length == data.data.page.totalCount) {
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
                url: `/qz/qzgssc/list/${currPage}/${this.limit}`,
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
                        this.collectionList = this.collectionList.concat(data.data.page.list); //将数据拼接在一起
                        console.log(this.cPage);
                        if (this.collectionList.length == data.data.page.totalCount) {
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
.attention {
    height: 100%;
    padding: 20rpx;
    background: #fafafa;
    .loading {
        text-align: center;
        margin-bottom: 20rpx;
        color: #cccccc;
    }
}
.list {
    width: 100%;
    box-shadow: 0 0 10rpx #e9e9e9;
    border-radius: 12rpx;
    background: #ffffff;
    margin-bottom: 20rpx;
    .list-top {
        padding: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
        width: 100%;
        .logo {
            width: 90rpx;
            height: 90rpx;
            vertical-align: middle;
        }
        .title {
            margin-left: 20rpx;
            width: 64%;
            .name {
                font-size: 30rpx;
                color: #333333;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .nature {
                margin-top: 18rpx;
                van-button {
                    margin-right: 10rpx;
                    /deep/.van-button--small {
                        margin-bottom: 10rpx !important;
                    }
                }
            }
        }
        .cancel-btn {
            padding: 10rpx 20rpx;
            border: 1rpx solid #cccccc;
            border-radius: 30rpx;
            background: #e6e6e6;
            font-size: 22rpx;
            color: #999999;
        }
    }
    .company-wrap {
        height: 60rpx;
        line-height: 60rpx;
        padding: 0 20rpx;
        .adress-name {
            color: #999999;
            font-size: 24rpx;
        }
    }
}
</style>
