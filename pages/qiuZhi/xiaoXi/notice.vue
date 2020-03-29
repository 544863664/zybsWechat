<template>
    <view class="notice">
        <view class="detail" v-for="(item, i) in noticeList" :key="i"  @longpress="longpress(item.xxid)">
            <view class="top">
                <image class="logo" src="../../../static/icon/2.png"></image>
                <view class="school">{{ item.xxmc }}</view>
            </view>
            <view class="bottom">
                <view class="company">{{ item.xxnr }}</view>
                <!--   <view class="company">共有120家企业参会，提供720个职位</view>
              <image class="icotime" src="../../../static/icon/sign-icon.png"></image>
               <view class="time">2019-9-12 08:30至2019-9-15 16:30</view>
               <image class="iconlocal" src="../../../static/icon/adress.png"></image>
               <view class="local"> 北京市海定区中关大道12号北京大学3号教学楼211室</view> -->
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
            xxid:"",
            currPage: '1', //当前页面
            limit: '7', //当前页面显示的数量
            xxlx: 'xx_001',
            totalCount: 0, //总数量
            totalPage: 0, //总页数
            noticeList: [],
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
    mounted() {
        this.notice();
    },
    methods: {
        notice() {
            this.loadingType = 0;
            uni.showNavigationBarLoading(); //在当前页面显示导航条加载动画
            this.$http({
                url: `/qz/qzxxtx/list/${this.xxlx}/${this.currPage}/${this.limit}`,
                method: 'POST',
                header: {
                    token: this.token
                },
                success: data => {
                    console.log(data);
                    if (data.data.code === 0) {
                        this.noticeList = data.data.page.list;
                        this.currPage = data.data.page.currPage; //当前页数
                        this.totalCount = data.data.page.totalCount; //总数量
                        this.totalPage = data.data.page.totalPage; //总页数
                        if (this.noticeList.length == data.data.page.totalCount) {
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
            setTimeout(() => {
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
                url: `/qz/qzxxtx/list/${this.xxlx}/${currPage}/${this.limit}`,
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
                        this.noticeList = this.noticeList.concat(data.data.page.list); //将数据拼接在一起
                        console.log(this.cPage);
                        if (this.noticeList.length == data.data.page.totalCount) {
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
        //长按删除
        longpress(xxid) {
            uni.showModal({
                title: '提示',
                content: '是否删除这条信息?',
                success: function(res) {
                    if (res.confirm) {
                        this.noticeDelete(xxid);
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }.bind(this)
            });
        },
        noticeDelete(xxid) {
            this.$http({
                url: `/qz/qzxxtx/deleteBatch`,
                method: 'POST',
                header: {
                    token: this.token
                },
                data:[
                  xxid  
                ],
                success: data => {
                    if (data.data.code === 0) {
                          this.currPage =1
                    }
                    this.notice();
                }
            });
        },
    }
};
</script>

<style scoped>
.detail {
    position: relative;
    box-shadow: 0 0 5upx #ccc;
    margin: 20upx;
    border-radius: 12upx;
    background-color: #fff;
}
.loading {
    text-align: center;
    margin-bottom: 20rpx;
    color: #cccccc;
}
.top {
    border-bottom: 1rpx solid #f0f0f0;
}
.logo {
    width: 43rpx;
    height: 43rpx;
    margin: 20rpx;
    vertical-align: middle;
}
.school {
    font-size: 30rpx;
    font-weight: 700;
    position: absolute;
    top: 20rpx;
    left: 75rpx;
}
.bottom {
    box-sizing: border-box;
    padding: 20rpx;
}
.company {
    font-weight: 600;
    font-size: 25rpx;
}
.icotime {
    width: 25rpx;
    height: 25rpx;
    position: absolute;
    margin-top: 16rpx;
}
.iconlocal {
    width: 25rpx;
    height: 25rpx;
    position: absolute;
    margin-top: 16rpx;
}
.time {
    color: #999999;
    font-size: 25rpx;
    margin-top: 10rpx;
    margin-left: 33rpx;
}
.local {
    color: #999999;
    font-size: 25rpx;
    margin-top: 10rpx;
    margin-left: 33rpx;
}
</style>
